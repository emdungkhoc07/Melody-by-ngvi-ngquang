use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};
use std::sync::Mutex;
use std::time::{SystemTime, UNIX_EPOCH};

// KHOI DICH VU DONG BO TRANG THAI HOAT DONG DISCORD RPC
pub struct DiscordService {
    client: Mutex<Option<DiscordIpcClient>>,
    client_id: Mutex<String>,
}

impl DiscordService {
    pub fn new() -> Self {
        Self {
            client: Mutex::new(None),
            client_id: Mutex::new("1555324643756347413".to_string()),
        }
    }

    // XU LI KHOI TAO KET NOI DISCORD IPC CLIENT
    pub fn init(&self, custom_client_id: Option<String>) {
        let cid = custom_client_id
            .filter(|s| s.trim().len() > 10)
            .unwrap_or_else(|| "1555324643756347413".to_string());

        {
            let mut id_guard = self.client_id.lock().unwrap();
            *id_guard = cid.clone();
        }

        let mut client_guard = self.client.lock().unwrap();
        *client_guard = None;

        if let Ok(mut new_client) = DiscordIpcClient::new(&cid) {
            if new_client.connect().is_ok() {
                eprintln!("[Discord RPC] Connected successfully to client {}", cid);
                *client_guard = Some(new_client);
            } else {
                eprintln!("[Discord RPC] Could not connect during init");
            }
        }
    }

    fn ensure_client(&self, client_guard: &mut Option<DiscordIpcClient>) -> bool {
        if client_guard.is_some() {
            return true;
        }
        let cid = {
            let id_guard = self.client_id.lock().unwrap();
            id_guard.clone()
        };
        if let Ok(mut new_client) = DiscordIpcClient::new(&cid) {
            if new_client.connect().is_ok() {
                eprintln!("[Discord RPC] Connected to Discord pipe");
                *client_guard = Some(new_client);
                return true;
            }
        }
        false
    }

    // XU LI CAP NHAT TRANG THAI HOAT DONG DISCORD RICH PRESENCE
    pub fn set_activity(
        &self,
        title: &str,
        artist: &str,
        cover_url: Option<&str>,
        current_time: u64,
        duration: u64,
        is_playing: bool,
        album: Option<&str>,
    ) {
        let mut client_guard = self.client.lock().unwrap();
        if !self.ensure_client(&mut client_guard) {
            return;
        }

        fn truncate_str(s: &str, max_len: usize) -> String {
            if s.chars().count() <= max_len {
                s.to_string()
            } else {
                let mut trunc = s.chars().take(max_len - 3).collect::<String>();
                trunc.push_str("...");
                trunc
            }
        }

        let state_str = if artist.is_empty() {
            "Unknown Artist".to_string()
        } else {
            truncate_str(artist, 128)
        };

        let details_str = if is_playing {
            truncate_str(title, 128)
        } else {
            truncate_str(&format!("⏸ {}", title), 128)
        };

        let large_image = cover_url
            .filter(|u| u.starts_with("http"))
            .unwrap_or("https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500");

        let clean_alb = album.filter(|a| !a.is_empty()).map(|a| truncate_str(a, 128));

        let mut assets = activity::Assets::new().large_image(large_image);
        if let Some(ref alb_str) = clean_alb {
            assets = assets.large_text(alb_str);
        }

        let mut act = activity::Activity::new()
            .activity_type(activity::ActivityType::Listening)
            .state(&state_str)
            .details(&details_str)
            .assets(assets);

        if is_playing {
            let now = SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .unwrap_or_default()
                .as_secs();

            let start_ts = if now >= current_time {
                (now - current_time) as i64
            } else {
                now as i64
            };

            let mut timestamps = activity::Timestamps::new().start(start_ts);
            if duration > current_time {
                let end_ts = start_ts + (duration as i64);
                timestamps = timestamps.end(end_ts);
            }
            act = act.timestamps(timestamps);
        }

        let mut needs_reconnect = false;
        if let Some(client) = client_guard.as_mut() {
            if let Err(e) = client.set_activity(act.clone()) {
                eprintln!("[Discord RPC] Failed to set activity: {:?}. Will reconnect.", e);
                needs_reconnect = true;
            }
        } else {
            needs_reconnect = true;
        }

        if needs_reconnect {
            *client_guard = None;
            let cid = {
                let id_guard = self.client_id.lock().unwrap();
                id_guard.clone()
            };
            if let Ok(mut new_client) = DiscordIpcClient::new(&cid) {
                if new_client.connect().is_ok() {
                    let _ = new_client.set_activity(act);
                    *client_guard = Some(new_client);
                    eprintln!("[Discord RPC] Reconnected and sent activity");
                }
            }
        }
    }

    // XU LI XOA TRANG THAI HOAT DONG DISCORD
    pub fn clear_activity(&self) {
        let mut client_guard = self.client.lock().unwrap();
        if let Some(client) = client_guard.as_mut() {
            let _ = client.clear_activity();
        }
    }
}