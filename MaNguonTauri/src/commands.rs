use crate::models::{AppConfig, PlaybackState, Playlist, StreamResult, Track};
use crate::services::discord::DiscordService;
use crate::services::image_uploader::ImageUploader;
use crate::services::library::LibraryService;
use crate::services::soundcloud::SoundCloudService;
use crate::services::spotify::SpotifyService;
use crate::services::stream_server::StreamServer;
use crate::services::youtube::YouTubeService;
use std::sync::Arc;
use tauri::{State, Window};

// KHOI KHOI TAO APP STATE CHUNG CHO TOAN BO UNG DUNG
pub struct AppState {
    pub youtube: Arc<YouTubeService>,
    pub spotify: Arc<SpotifyService>,
    pub soundcloud: Arc<SoundCloudService>,
    pub stream_server: Arc<StreamServer>,
    pub library: Arc<LibraryService>,
    pub discord: Arc<DiscordService>,
    pub image_uploader: Arc<ImageUploader>,
}

// XU LI TIM KIEM TONG HOP MOI NGUON (YOUTUBE, SPOTIFY, SOUNDCLOUD)
#[tauri::command]
pub async fn search_all(query: String, state: State<'_, AppState>) -> Result<Vec<Track>, String> {
    let q = query.trim();
    if q.is_empty() {
        return Ok(Vec::new());
    }

    let yt_fut = state.youtube.search(q, 30);
    let sc_fut = state.soundcloud.search(q, 30);
    let sp_fut = state.spotify.search(q, 30);

    let (yt_res, sc_res, sp_res) = tokio::join!(yt_fut, sc_fut, sp_fut);

    let yt_tracks = yt_res.unwrap_or_default();
    let sc_tracks = sc_res.unwrap_or_default();
    let sp_tracks = sp_res.unwrap_or_default();

    let mut merged = Vec::new();
    let max_len = yt_tracks.len().max(sc_tracks.len()).max(sp_tracks.len());

    for i in 0..max_len {
        if let Some(t) = sp_tracks.get(i) {
            merged.push(t.clone());
        }
        if let Some(t) = yt_tracks.get(i) {
            merged.push(t.clone());
        }
        if let Some(t) = sc_tracks.get(i) {
            merged.push(t.clone());
        }
    }

    Ok(merged)
}

// XU LI TIM KIEM BAI HAT THEO TUNG NGUON CU THE
#[tauri::command]
pub async fn search_source(
    source: String,
    query: String,
    state: State<'_, AppState>,
) -> Result<Vec<Track>, String> {
    let q = query.trim();
    if q.is_empty() {
        return Ok(Vec::new());
    }

    match source.as_str() {
        "youtube" => state.youtube.search(q, 50).await,
        "spotify" => state.spotify.search(q, 50).await,
        "soundcloud" => state.soundcloud.search(q, 50).await,
        _ => Ok(Vec::new()),
    }
}

// XU LI LAY URL STREAM VA PHUC VU PROXY CACHE AM THANH
#[tauri::command]
pub async fn get_stream_url(track: Track, state: State<'_, AppState>) -> Result<StreamResult, String> {
    if state.stream_server.is_cached(&track.source, &track.id) {
        let content_type = state.stream_server.get_cached_content_type(&track.source, &track.id);
        let proxy_url = state
            .stream_server
            .get_cached_stream_url(&track.id, &track.source, &content_type);
        return Ok(StreamResult {
            stream_url: proxy_url,
            content_type,
        });
    }

    let direct_result = match track.source.as_str() {
        "youtube" => state.youtube.get_stream_url(&track.id).await?,
        "spotify" => state.spotify.resolve_playback(&track).await?,
        "soundcloud" => state.soundcloud.get_stream_url(&track.url).await?,
        _ => return Err("Unsupported track source".to_string()),
    };

    state.stream_server.start_background_cache(
        &track.id,
        &track.source,
        &direct_result.stream_url,
        &direct_result.content_type,
    );

    let proxy_url = state.stream_server.get_stream_url_with_meta(
        &track.id,
        &track.source,
        &direct_result.stream_url,
        &direct_result.content_type,
    );

    Ok(StreamResult {
        stream_url: proxy_url,
        content_type: direct_result.content_type,
    })
}

// XU LI LAY DANH SACH BAI HAT TRONG THU VIEN
#[tauri::command]
pub fn get_library(state: State<'_, AppState>) -> Vec<Track> {
    state.library.get_tracks()
}

// XU LI LUU BAI HAT VAO THU VIEN CA NHAN
#[tauri::command]
pub fn save_track(track: Track, state: State<'_, AppState>) -> Track {
    state.library.save_track(track)
}

// XU LI CHINH SUA THONG TIN BAI HAT VA MAU SAC SONG NHAC RIENG BIET
#[tauri::command]
pub async fn edit_track(
    track_id: String,
    source: String,
    title: Option<String>,
    artist: Option<String>,
    cover: Option<String>,
    color_wave_a: Option<String>,
    color_wave_b: Option<String>,
    color_wave_c: Option<String>,
    color_wave_d: Option<String>,
    reset: Option<bool>,
    state: State<'_, AppState>,
) -> Result<Track, String> {
    let mut discord_cover_url = None;
    if let Some(ref c) = cover {
        if c.starts_with("http://") || c.starts_with("https://") {
            discord_cover_url = Some(c.clone());
        }
    }

    state.library.edit_track_with_discord_url(
        &track_id,
        &source,
        title,
        artist,
        cover,
        discord_cover_url,
        color_wave_a,
        color_wave_b,
        color_wave_c,
        color_wave_d,
        reset.unwrap_or(false),
    )
}

// XU LI XOA BAI HAT KHOI THU VIEN
#[tauri::command]
pub fn delete_track(track_id: String, source: String, state: State<'_, AppState>) -> bool {
    state.library.delete_track(&track_id, &source)
}

// XU LI LAY DANH SACH TAT CA PLAYLIST
#[tauri::command]
pub fn get_playlists(state: State<'_, AppState>) -> Vec<Playlist> {
    state.library.get_playlists()
}

// XU LI TAO PLAYLIST MOI
#[tauri::command]
pub fn create_playlist(name: String, description: Option<String>, state: State<'_, AppState>) -> Playlist {
    state.library.create_playlist(name, description)
}

// XU LI CAP NHAT THONG TIN PLAYLIST
#[tauri::command]
pub fn update_playlist(
    id: String,
    name: Option<String>,
    description: Option<String>,
    cover: Option<String>,
    state: State<'_, AppState>,
) -> Result<Playlist, String> {
    state.library.update_playlist(&id, name, description, cover)
}

// XU LI XOA PLAYLIST
#[tauri::command]
pub fn delete_playlist(id: String, state: State<'_, AppState>) -> bool {
    state.library.delete_playlist(&id)
}

// XU LI THEM BAI HAT VAO PLAYLIST
#[tauri::command]
pub fn add_to_playlist(playlist_id: String, track: Track, state: State<'_, AppState>) -> Result<Playlist, String> {
    state.library.add_to_playlist(&playlist_id, track)
}

// XU LI XOA BAI HAT KHOI PLAYLIST
#[tauri::command]
pub fn remove_from_playlist(
    playlist_id: String,
    track_id: String,
    source: String,
    state: State<'_, AppState>,
) -> Result<Playlist, String> {
    state.library.remove_from_playlist(&playlist_id, &track_id, &source)
}

// XU LI SAP XEP THU TU BAI HAT TRONG PLAYLIST
#[tauri::command]
pub fn reorder_playlist_tracks(
    playlist_id: String,
    tracks: Vec<Track>,
    state: State<'_, AppState>,
) -> Result<Playlist, String> {
    state.library.reorder_playlist_tracks(&playlist_id, tracks)
}

// XU LI DOC CAU HINH HE THONG UNG DUNG
#[tauri::command]
pub fn get_config(state: State<'_, AppState>) -> AppConfig {
    state.library.get_config()
}

// XU LI LUU CAU HINH HE THONG UNG DUNG
#[tauri::command]
pub fn save_config(config: AppConfig, state: State<'_, AppState>) -> AppConfig {
    state.library.save_config(config)
}

// XU LI DOC TRANG THAI PHAT NHAC (PLAYBACK STATE)
#[tauri::command]
pub fn get_playback_state(state: State<'_, AppState>) -> PlaybackState {
    state.library.get_playback_state()
}

// XU LI LUU TRANG THAI PHAT NHAC (PLAYBACK STATE)
#[tauri::command]
pub fn save_playback_state(playback_state: PlaybackState, state: State<'_, AppState>) -> PlaybackState {
    state.library.save_playback_state(playback_state)
}

// XU LI DOC LICH SU PHAT NHAC
#[tauri::command]
pub fn get_history(state: State<'_, AppState>) -> Vec<serde_json::Value> {
    state.library.get_history()
}

// XU LI LUU LICH SU PHAT NHAC
#[tauri::command]
pub fn save_history(items: Vec<serde_json::Value>, state: State<'_, AppState>) -> Vec<serde_json::Value> {
    state.library.save_history(items)
}

// XU LI DOC DANH SACH TIEP TUC NGHE
#[tauri::command]
pub fn get_continue_listening(state: State<'_, AppState>) -> Vec<serde_json::Value> {
    state.library.get_continue_listening()
}

// XU LI LUU DANH SACH TIEP TUC NGHE
#[tauri::command]
pub fn save_continue_listening(items: Vec<serde_json::Value>, state: State<'_, AppState>) -> Vec<serde_json::Value> {
    state.library.save_continue_listening(items)
}

// XU LI DOC DANH SACH HINH NEN TUY CHINH
#[tauri::command]
pub fn get_custom_backgrounds(state: State<'_, AppState>) -> serde_json::Value {
    state.library.get_custom_backgrounds()
}

// XU LI LUU DANH SACH HINH NEN TUY CHINH
#[tauri::command]
pub fn save_custom_backgrounds(data: serde_json::Value, state: State<'_, AppState>) -> serde_json::Value {
    state.library.save_custom_backgrounds(data)
}

// XU LI DOC BO NHO DEM TRANG CHU (HOME CACHE)
#[tauri::command]
pub fn get_home_cache(state: State<'_, AppState>) -> serde_json::Value {
    state.library.get_home_cache()
}

// XU LI LUU BO NHO DEM TRANG CHU (HOME CACHE)
#[tauri::command]
pub fn save_home_cache(data: serde_json::Value, state: State<'_, AppState>) -> serde_json::Value {
    state.library.save_home_cache(data)
}

// XU LI CAP NHAT HOAT DONG DISCORD RPC
#[tauri::command]
pub async fn update_discord_activity(
    title: String,
    artist: String,
    cover_url: Option<String>,
    current_time: u64,
    duration: u64,
    is_playing: bool,
    album: Option<String>,
    track_id: Option<String>,
    source: Option<String>,
    state: State<'_, AppState>,
) -> Result<(), String> {
    let mut resolved_cover = cover_url;

    let needs_upload = if let Some(ref c) = resolved_cover {
        c.contains("kn3fi8") || c.contains("sxcu.net") || c.starts_with("data:image/") || (!c.starts_with("http://") && !c.starts_with("https://"))
    } else {
        false
    };

    if needs_upload {
        let base64_data = resolved_cover
            .as_ref()
            .filter(|c| c.starts_with("data:image/"))
            .cloned()
            .or_else(|| {
                let tracks = state.library.get_tracks();
                let found = if let (Some(ref tid), Some(ref src)) = (&track_id, &source) {
                    tracks.iter().find(|t| &t.id == tid && &t.source == src)
                } else {
                    tracks.iter().find(|t| t.title.trim().eq_ignore_ascii_case(title.trim()))
                };
                found.and_then(|t| {
                    if t.cover.starts_with("data:image/") {
                        Some(t.cover.clone())
                    } else {
                        None
                    }
                })
            });

        if let Some(b64) = base64_data {
            if let Some(cached_url) = state.image_uploader.get_cached(&b64) {
                resolved_cover = Some(cached_url);
            } else if let Some(public_url) = state.image_uploader.upload_base64(&b64).await {
                let tid_ref = track_id.as_deref();
                let src_ref = source.as_deref();
                if let (Some(t), Some(s)) = (tid_ref, src_ref) {
                    state.library.update_track_discord_cover_url(t, s, &public_url);
                } else {
                    let tracks = state.library.get_tracks();
                    if let Some(t) = tracks.iter().find(|t| t.title.trim().eq_ignore_ascii_case(title.trim())) {
                        state.library.update_track_discord_cover_url(&t.id, &t.source, &public_url);
                    }
                }
                resolved_cover = Some(public_url);
            } else {
                resolved_cover = None;
            }
        } else {
            resolved_cover = None;
        }
    }
    state.discord.set_activity(
        &title,
        &artist,
        resolved_cover.as_deref(),
        current_time,
        duration,
        is_playing,
        album.as_deref(),
    );

    Ok(())
}

// XU LI XOA HOAT DONG DISCORD RPC
#[tauri::command]
pub fn clear_discord_activity(state: State<'_, AppState>) {
    state.discord.clear_activity();
}

// XU LI THU NHO CUA SO UNG DUNG
#[tauri::command]
pub fn minimize_window(window: Window) -> Result<(), String> {
    window.minimize().map_err(|e| e.to_string())
}

// XU LI PHONG TO HOAC KHOI PHUC KICH THUOC CUA SO
#[tauri::command]
pub fn toggle_maximize_window(window: Window) -> Result<bool, String> {
    let is_max = window.is_maximized().unwrap_or(false);
    if is_max {
        window.unmaximize().map_err(|e| e.to_string())?;
        Ok(false)
    } else {
        window.maximize().map_err(|e| e.to_string())?;
        Ok(true)
    }
}

// XU LI KIEM TRA TRANG THAI PHONG TO CUA SO
#[tauri::command]
pub fn is_window_maximized(window: Window) -> bool {
    window.is_maximized().unwrap_or(false)
}

// XU LI DONG CUA SO UNG DUNG
#[tauri::command]
pub fn close_window(window: Window) -> Result<(), String> {
    window.close().map_err(|e| e.to_string())
}

// XU LI CAI DAT CHE DO TOAN MAN HINH
#[tauri::command]
pub fn set_fullscreen(window: Window, fullscreen: bool) -> Result<bool, String> {
    if fullscreen {
        if window.is_maximized().unwrap_or(false) {
            let _ = window.unmaximize();
        }
        window.set_fullscreen(true).map_err(|e| e.to_string())?;
        let _ = window.set_always_on_top(true);
    } else {
        let _ = window.set_always_on_top(false);
        window.set_fullscreen(false).map_err(|e| e.to_string())?;
    }
    Ok(fullscreen)
}

// XU LI BAT TAT CHE DO TOAN MAN HINH
#[tauri::command]
pub fn toggle_fullscreen(window: Window) -> Result<bool, String> {
    let is_fullscreen = window.is_fullscreen().unwrap_or(false);
    set_fullscreen(window, !is_fullscreen)
}

// XU LI TAI VA LUU ANH BIA XUONG MAY TINH
#[tauri::command]
pub async fn save_image_to_disk(
    image_url: String,
    default_name: String,
) -> Result<String, String> {
    let clean_name = default_name
        .chars()
        .map(|c| if c.is_alphanumeric() || c == '_' || c == '-' { c } else { '_' })
        .collect::<String>();

    let user_profile = std::env::var("USERPROFILE").unwrap_or_else(|_| ".".to_string());
    let downloads = std::path::PathBuf::from(user_profile).join("Downloads");
    let target_dir = if downloads.exists() {
        downloads
    } else {
        std::path::PathBuf::from(".")
    };

    let mut bytes_data = Vec::new();
    let mut ext = "png".to_string();

    if image_url.starts_with("data:image/") {
        if let Some(comma_pos) = image_url.find(',') {
            let meta = &image_url[..comma_pos];
            let b64 = &image_url[comma_pos + 1..];
            if meta.contains("jpeg") || meta.contains("jpg") {
                ext = "jpg".to_string();
            } else if meta.contains("webp") {
                ext = "webp".to_string();
            }
            use base64::Engine;
            bytes_data = base64::engine::general_purpose::STANDARD
                .decode(b64)
                .map_err(|e| e.to_string())?;
        }
    } else if image_url.starts_with("http://") || image_url.starts_with("https://") {
        if image_url.contains(".jpg") || image_url.contains(".jpeg") {
            ext = "jpg".to_string();
        } else if image_url.contains(".webp") {
            ext = "webp".to_string();
        }
        let resp = reqwest::get(&image_url).await.map_err(|e| e.to_string())?;
        let bytes = resp.bytes().await.map_err(|e| e.to_string())?;
        bytes_data = bytes.to_vec();
    } else {
        let mut path_candidate = std::path::PathBuf::from(&image_url);
        if image_url.starts_with("local-cover://") {
            let clean = image_url.trim_start_matches("local-cover://");
            path_candidate = std::path::PathBuf::from("data").join("covers").join(clean);
        }
        if let Ok(data) = std::fs::read(&path_candidate) {
            if let Some(e) = path_candidate.extension() {
                ext = e.to_string_lossy().to_string();
            }
            bytes_data = data;
        }
    }

    if bytes_data.is_empty() {
        return Err("Không có dữ liệu ảnh".to_string());
    }

    let timestamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs();
    let file_path = target_dir.join(format!("{}_{}.{}", clean_name, timestamp, ext));
    std::fs::write(&file_path, bytes_data).map_err(|e| e.to_string())?;

    #[cfg(target_os = "windows")]
    {
        let _ = std::process::Command::new("explorer")
            .arg(format!("/select,\"{}\"", file_path.to_string_lossy()))
            .spawn();
    }

    Ok(file_path.to_string_lossy().to_string())
}

// XU LI LAY DANH SACH GIF DONG CO SAN TRONG UNG DUNG
#[tauri::command]
pub async fn get_available_gifs() -> Result<Vec<String>, String> {
    let mut gifs = Vec::new();
    let mut candidates = vec![
        std::path::PathBuf::from("GiaoDien/Gif"),
        std::path::PathBuf::from("../GiaoDien/Gif"),
        std::path::PathBuf::from("UngDungChaySan/Gif"),
        std::path::PathBuf::from("Gif"),
    ];
    if let Ok(exe) = std::env::current_exe() {
        if let Some(parent) = exe.parent() {
            candidates.push(parent.join("Gif"));
            candidates.push(parent.join("../GiaoDien/Gif"));
            candidates.push(parent.join("GiaoDien/Gif"));
        }
    }
    for dir in &candidates {
        if let Ok(entries) = std::fs::read_dir(dir) {
            for entry in entries.flatten() {
                let path = entry.path();
                if path
                    .extension()
                    .and_then(|e| e.to_str())
                    .map(|e| e.eq_ignore_ascii_case("gif"))
                    .unwrap_or(false)
                {
                    if let Some(file_name) = path.file_name().and_then(|f| f.to_str()) {
                        let rel = format!("Gif/{}", file_name);
                        if !gifs.contains(&rel) {
                            gifs.push(rel);
                        }
                    }
                }
            }
        }
    }
    if gifs.is_empty() {
        gifs = vec![
            "Gif/duck.gif".to_string(),
            "Gif/gojo.gif".to_string(),
            "Gif/iloveyou.gif".to_string(),
            "Gif/lonely.gif".to_string(),
            "Gif/teddy.gif".to_string(),
            "Gif/usagyuuun.gif".to_string(),
        ];
    }
    Ok(gifs)
}