use crate::models::{StreamResult, Track};
use regex::Regex;
use reqwest::Client;
use serde_json::{json, Value};
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::RwLock;
use std::time::{Duration, Instant};
use tokio::process::Command;

struct CacheItem {
    result: StreamResult,
    created: Instant,
}

// KHOI DICH VU TIM KIEM VA PHAT NHAC YOUTUBE
pub struct YouTubeService {
    client: Client,
    ytdlp_path: PathBuf,
    cache: RwLock<HashMap<String, CacheItem>>,
}

impl YouTubeService {
    pub fn new() -> Self {
        let client = Client::builder()
            .timeout(Duration::from_secs(10))
            .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
            .build()
            .unwrap_or_else(|_| Client::new());

        Self {
            client,
            ytdlp_path: find_ytdlp(),
            cache: RwLock::new(HashMap::new()),
        }
    }

    // XU LI TIM KIEM VIDEO VA BAI HAT TREN YOUTUBE
    pub async fn search(&self, query: &str, limit: usize) -> Result<Vec<Track>, String> {
        if let Ok(tracks) = self.search_innertube(query, limit).await {
            if !tracks.is_empty() {
                return Ok(tracks);
            }
        }
        self.search_scrape(query, limit).await
    }

    // XU LI TIM KIEM QUA INNERTUBE API CUA YOUTUBE
    async fn search_innertube(&self, query: &str, limit: usize) -> Result<Vec<Track>, String> {
        let payload = json!({
            "context": {
                "client": {
                    "clientName": "WEB",
                    "clientVersion": "2.20240101.00.00",
                    "hl": "vi",
                    "gl": "VN"
                }
            },
            "query": query
        });

        let resp = self
            .client
            .post("https://www.youtube.com/youtubei/v1/search?prettyPrint=false")
            .header("Content-Type", "application/json")
            .json(&payload)
            .send()
            .await
            .map_err(|e| format!("Network error: {}", e))?;

        let body: Value = resp
            .json()
            .await
            .map_err(|e| format!("JSON error: {}", e))?;

        let contents = body
            .pointer("/contents/twoColumnSearchResultsRenderer/primaryContents/sectionListRenderer/contents")
            .and_then(|v| v.as_array());

        Ok(parse_tracks_from_contents(contents, limit))
    }

    // XU LI TIM KIEM QUA SCRAPE HTML DU PHONG
    async fn search_scrape(&self, query: &str, limit: usize) -> Result<Vec<Track>, String> {
        let url = format!(
            "https://www.youtube.com/results?search_query={}",
            url::form_urlencoded::byte_serialize(query.as_bytes()).collect::<String>()
        );

        let resp = self
            .client
            .get(&url)
            .send()
            .await
            .map_err(|e| format!("Scrape search request failed: {}", e))?;

        let html = resp
            .text()
            .await
            .map_err(|e| format!("Failed to read HTML: {}", e))?;

        let re = Regex::new(r#"var ytInitialData = (\{.*?\});</script>"#)
            .map_err(|e| e.to_string())?;

        let captures = re.captures(&html).ok_or_else(|| "No ytInitialData found in search results".to_string())?;
        let json_str = captures.get(1).map(|m| m.as_str()).unwrap_or("{}");

        let body: Value = serde_json::from_str(json_str)
            .map_err(|e| format!("Failed to parse ytInitialData JSON: {}", e))?;

        let contents = body
            .pointer("/contents/twoColumnSearchResultsRenderer/primaryContents/sectionListRenderer/contents")
            .and_then(|v| v.as_array());

        Ok(parse_tracks_from_contents(contents, limit))
    }

    // XU LI LAY STREAM URL CHO BAI HAT YOUTUBE
    pub async fn get_stream_url(&self, video_id: &str) -> Result<StreamResult, String> {
        let clean_id = if video_id.contains("watch?v=") {
            video_id
                .split("watch?v=")
                .nth(1)
                .unwrap_or(video_id)
                .split('&')
                .next()
                .unwrap_or(video_id)
        } else if video_id.starts_with("https://youtu.be/") {
            video_id
                .trim_start_matches("https://youtu.be/")
                .split('?')
                .next()
                .unwrap_or(video_id)
        } else {
            video_id
        };

        if let Ok(guard) = self.cache.read() {
            if let Some(item) = guard.get(clean_id) {
                if item.created.elapsed() < Duration::from_secs(5 * 3600) {
                    return Ok(item.result.clone());
                }
            }
        }

        self.extract_ytdlp(clean_id).await
    }

    // XU LI TRICH XUAT STREAM URL TU YT-DLP CHO YOUTUBE
    async fn extract_ytdlp(&self, clean_id: &str) -> Result<StreamResult, String> {
        let watch_url = format!("https://www.youtube.com/watch?v={}", clean_id);

        let mut cmd = Command::new(&self.ytdlp_path);
        cmd.args(["-g", "-f", "ba/b", "--no-playlist", &watch_url]);
        #[cfg(target_os = "windows")]
        cmd.creation_flags(0x08000000);

        let output = cmd
            .output()
            .await
            .map_err(|e| format!("Failed to spawn yt-dlp: {}", e))?;

        if !output.status.success() {
            let err_msg = String::from_utf8_lossy(&output.stderr);
            return Err(format!("yt-dlp extraction failed: {}", err_msg.trim()));
        }

        let stdout = String::from_utf8_lossy(&output.stdout);
        let stream_url = stdout
            .lines()
            .map(|l| l.trim().to_string())
            .filter(|l| l.starts_with("http"))
            .last()
            .ok_or_else(|| "yt-dlp returned no valid stream URL".to_string())?;

        let result = StreamResult {
            stream_url,
            content_type: "audio/webm".to_string(),
        };

        if let Ok(mut guard) = self.cache.write() {
            guard.insert(
                clean_id.to_string(),
                CacheItem {
                    result: result.clone(),
                    created: Instant::now(),
                },
            );
        }

        Ok(result)
    }
}

// XU LI PHAN TICH DU LIEU BAI HAT TU KET QUA YOUTUBE
fn parse_tracks_from_contents(contents: Option<&Vec<Value>>, limit: usize) -> Vec<Track> {
    let mut tracks = Vec::new();
    let Some(sections) = contents else { return tracks };

    for section in sections {
        let items = section
            .pointer("/itemSectionRenderer/contents")
            .and_then(|v| v.as_array());

        let Some(video_items) = items else { continue };

        for item in video_items {
            let Some(vr) = item.get("videoRenderer") else { continue };
            let id = vr.get("videoId").and_then(|v| v.as_str()).unwrap_or("");
            if id.is_empty() {
                continue;
            }

            let title = vr
                .pointer("/title/runs/0/text")
                .and_then(|v| v.as_str())
                .unwrap_or("Unknown Title")
                .to_string();

            let artist = vr
                .pointer("/ownerText/runs/0/text")
                .and_then(|v| v.as_str())
                .unwrap_or("YouTube Artist")
                .to_string();

            let duration_str = vr
                .pointer("/lengthText/simpleText")
                .or_else(|| vr.pointer("/lengthText/runs/0/text"))
                .and_then(|v| v.as_str())
                .unwrap_or("0:00");
            let duration = parse_time_str(duration_str);

            let cover = vr
                .pointer("/thumbnail/thumbnails")
                .and_then(|v| v.as_array())
                .and_then(|arr| arr.last())
                .and_then(|t| t.get("url"))
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();

            let views_formatted = vr
                .pointer("/shortViewCountText/simpleText")
                .or_else(|| vr.pointer("/viewCountText/simpleText"))
                .or_else(|| vr.pointer("/shortViewCountText/runs/0/text"))
                .or_else(|| vr.pointer("/viewCountText/runs/0/text"))
                .and_then(|v| v.as_str())
                .map(clean_youtube_views);

            let uploaded_at = vr
                .pointer("/publishedTimeText/simpleText")
                .or_else(|| vr.pointer("/publishedTimeText/runs/0/text"))
                .and_then(|v| v.as_str())
                .map(|s| s.to_string());

            tracks.push(Track {
                id: id.to_string(),
                source: "youtube".to_string(),
                title: title.clone(),
                artist: artist.clone(),
                album: None,
                duration,
                duration_formatted: Some(format_duration(duration)),
                cover: cover.clone(),
                url: format!("https://www.youtube.com/watch?v={}", id),
                views: None,
                views_formatted,
                uploaded_at,
                original_title: Some(title),
                original_artist: Some(artist),
                original_cover: Some(cover),
                local_cover_path: None,
                discord_cover_url: None,
                added_at: None,
                updated_at: None,
                color_wave_a: None,
                color_wave_b: None,
                color_wave_c: None,
                color_wave_d: None,
            });

            if tracks.len() >= limit {
                return tracks;
            }
        }
    }
    tracks
}

fn clean_youtube_views(raw: &str) -> String {
    let s = raw.trim();
    if s.is_empty() {
        return String::new();
    }
    let s = s.strip_suffix(" lượt xem").unwrap_or(s);
    let s = s.strip_suffix(" views").unwrap_or(s);
    let s = s.strip_suffix(" view").unwrap_or(s);
    s.trim().to_string()
}

fn parse_time_str(s: &str) -> u64 {
    let mut total = 0;
    for part in s.split(':') {
        if let Ok(num) = part.parse::<u64>() {
            total = total * 60 + num;
        }
    }
    total
}

fn format_duration(seconds: u64) -> String {
    let hours = seconds / 3600;
    let minutes = (seconds % 3600) / 60;
    let secs = seconds % 60;
    if hours > 0 {
        format!("{}:{:02}:{:02}", hours, minutes, secs)
    } else {
        format!("{}:{:02}", minutes, secs)
    }
}

// XU LI TIM KIEM DUONG DAN YT-DLP TRONG HE THONG
fn find_ytdlp() -> PathBuf {
    let candidates = [
        PathBuf::from("data/bin/yt-dlp.exe"),
        PathBuf::from("../data/bin/yt-dlp.exe"),
        PathBuf::from("UngDungChaySan/data/bin/yt-dlp.exe"),
        PathBuf::from("../UngDungChaySan/data/bin/yt-dlp.exe"),
    ];
    for c in &candidates {
        if c.exists() {
            return c.canonicalize().unwrap_or_else(|_| c.clone());
        }
    }
    if let Ok(exe) = std::env::current_exe() {
        if let Some(parent) = exe.parent() {
            for dir in [parent, parent.parent().unwrap_or(parent)] {
                for sub in [Path::new("data/bin/yt-dlp.exe"), Path::new("UngDungChaySan/data/bin/yt-dlp.exe")] {
                    let p = dir.join(sub);
                    if p.exists() {
                        return p.canonicalize().unwrap_or_else(|_| p);
                    }
                }
            }
        }
    }
    PathBuf::from("yt-dlp")
}