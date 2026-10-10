use base64::engine::general_purpose::STANDARD as BASE64;
use base64::Engine;
use reqwest::multipart::{Form, Part};
use reqwest::Client;
use std::collections::HashMap;
use std::sync::RwLock;
use std::time::Duration;

const DISCORD_MAX_KICH_THUOC: u32 = 800;
const DISCORD_CHAT_LUONG_JPEG: u8 = 80;

// KHOI DICH VU TAI ANH BIA LEN MAY CHU ANH DISCORD
pub struct ImageUploader {
    client: Client,
    cache: RwLock<HashMap<String, String>>,
}

impl ImageUploader {
    pub fn new() -> Self {
        let client = Client::builder()
            .timeout(Duration::from_secs(15))
            .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0")
            .build()
            .unwrap_or_else(|_| Client::new());

        Self {
            client,
            cache: RwLock::new(HashMap::new()),
        }
    }

    fn lay_cache_key(base64_data: &str) -> Option<String> {
        let raw_data = if let Some(idx) = base64_data.find(";base64,") {
            &base64_data[idx + 8..]
        } else {
            base64_data.trim()
        };

        let clean: String = raw_data.chars().filter(|c| !c.is_whitespace()).collect();
        if clean.is_empty() {
            return None;
        }

        if clean.len() > 64 {
            Some(format!("{}_{}", clean.len(), &clean[..64]))
        } else {
            Some(clean)
        }
    }

    // XU LI KIEM TRA BO NHO DEM ANH BIA DISCORD
    pub fn get_cached(&self, base64_data: &str) -> Option<String> {
        let key = Self::lay_cache_key(base64_data)?;
        let guard = self.cache.read().unwrap();
        guard.get(&key).filter(|u| !u.contains("sxcu.net")).cloned()
    }

    // XU LI NEN ANH BIA CHO PHU HOP VOI DISCORD
    fn nen_anh_cho_discord(raw_bytes: &[u8]) -> Vec<u8> {
        let img = match image::load_from_memory(raw_bytes) {
            Ok(i) => i,
            Err(_) => return raw_bytes.to_vec(),
        };

        let (w, h) = (img.width(), img.height());
        let resized = if w > DISCORD_MAX_KICH_THUOC || h > DISCORD_MAX_KICH_THUOC {
            img.resize(
                DISCORD_MAX_KICH_THUOC,
                DISCORD_MAX_KICH_THUOC,
                image::imageops::FilterType::Lanczos3,
            )
        } else {
            img
        };

        let rgb_img = resized.to_rgb8();
        let mut buf = std::io::Cursor::new(Vec::new());
        let encoder = image::codecs::jpeg::JpegEncoder::new_with_quality(
            &mut buf,
            DISCORD_CHAT_LUONG_JPEG,
        );
        if rgb_img.write_with_encoder(encoder).is_ok() {
            let result = buf.into_inner();
            if !result.is_empty() {
                return result;
            }
        }

        raw_bytes.to_vec()
    }

    // XU LI TAI ANH BIA BASE64 LEN MAY CHU ANH DISCORD
    pub async fn upload_base64(&self, base64_data: &str) -> Option<String> {
        let raw_data = if let Some(idx) = base64_data.find(";base64,") {
            &base64_data[idx + 8..]
        } else {
            base64_data.trim()
        };

        let clean_base64: String = raw_data.chars().filter(|c| !c.is_whitespace()).collect();

        if clean_base64.is_empty() {
            return None;
        }

        let cache_key = if clean_base64.len() > 64 {
            format!("{}_{}", clean_base64.len(), &clean_base64[..64])
        } else {
            clean_base64.clone()
        };

        {
            let guard = self.cache.read().unwrap();
            if let Some(url) = guard.get(&cache_key) {
                if !url.contains("sxcu.net") {
                    return Some(url.clone());
                }
            }
        }

        if let Ok(bytes) = BASE64.decode(&clean_base64) {
            let compressed = Self::nen_anh_cho_discord(&bytes);
            let mime = "image/jpeg";
            let filename = "cover.jpg".to_string();

            // 1. Uu tien freeimage.host: khong bi ISP block, tra ve link anh truc tiep tren iili.io
            let form_freeimage = Form::new()
                .text("key", "6d207e02198a847aa98d0a2a901485a5")
                .text("action", "upload")
                .text("format", "json")
                .part("source", Part::bytes(compressed.clone()).file_name(filename.clone()).mime_str(mime).unwrap());

            if let Ok(resp) = self.client.post("https://freeimage.host/api/1/upload")
                .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
                .multipart(form_freeimage)
                .send()
                .await
            {
                if resp.status().is_success() {
                    if let Ok(json) = resp.json::<serde_json::Value>().await {
                        if let Some(url) = json.pointer("/image/url").and_then(|v| v.as_str()) {
                            let url_str = url.to_string();
                            let mut guard = self.cache.write().unwrap();
                            guard.insert(cache_key.clone(), url_str.clone());
                            return Some(url_str);
                        }
                    }
                }
            }

            // 2. Du phong Uguu.se: Tra ve link anh truc tiep https://a.uguu.se/...
            let form_uguu = Form::new()
                .part("files[]", Part::bytes(compressed.clone()).file_name(filename.clone()).mime_str(mime).unwrap());

            if let Ok(resp) = self.client.post("https://uguu.se/upload.php")
                .header("User-Agent", "OmniMusicPlayer/2.0")
                .multipart(form_uguu)
                .send()
                .await
            {
                if resp.status().is_success() {
                    if let Ok(json) = resp.json::<serde_json::Value>().await {
                        if let Some(url) = json.pointer("/files/0/url").and_then(|v| v.as_str()) {
                            let url_str = url.to_string();
                            let mut guard = self.cache.write().unwrap();
                            guard.insert(cache_key.clone(), url_str.clone());
                            return Some(url_str);
                        }
                    }
                }
            }

            // 3. Du phong SXCU.net: Phai dung duoi .jpeg vi sxcu luu anh jpeg duoi dang .jpeg
            let form_sxcu = Form::new()
                .part("file", Part::bytes(compressed).file_name(filename).mime_str(mime).unwrap());

            if let Ok(resp) = self.client.post("https://sxcu.net/api/files/create")
                .header("User-Agent", "OmniMusicPlayer/2.0")
                .multipart(form_sxcu)
                .send()
                .await
            {
                if resp.status().is_success() {
                    if let Ok(json) = resp.json::<serde_json::Value>().await {
                        if let Some(url) = json.get("url").and_then(|v| v.as_str()) {
                            let direct_url = format!("{url}.jpeg");
                            let mut guard = self.cache.write().unwrap();
                            guard.insert(cache_key, direct_url.clone());
                            return Some(direct_url);
                        }
                    }
                }
            }
        }

        None
    }
}