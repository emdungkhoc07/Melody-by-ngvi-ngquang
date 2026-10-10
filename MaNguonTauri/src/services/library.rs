use crate::models::{AppConfig, LibraryData, PlaybackState, Playlist, PlaylistsData, Track};
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::RwLock;

#[allow(dead_code)]
pub struct LibraryService {
    data_dir: PathBuf,
    covers_dir: PathBuf,
    config_dir: PathBuf,
    library_dir: PathBuf,
    cache_dir: PathBuf,
    downloads_dir: PathBuf,
    config_file: PathBuf,
    playback_file: PathBuf,
    library_file: PathBuf,
    playlists_file: PathBuf,
    history_file: PathBuf,
    continue_file: PathBuf,
    custom_bg_file: PathBuf,
    home_cache_file: PathBuf,
    tracks_cache: RwLock<Vec<Track>>,
    playlists_cache: RwLock<Vec<Playlist>>,
    config_cache: RwLock<AppConfig>,
    playback_cache: RwLock<PlaybackState>,
    history_cache: RwLock<Vec<serde_json::Value>>,
    continue_cache: RwLock<Vec<serde_json::Value>>,
    custom_bg_cache: RwLock<serde_json::Value>,
    home_cache: RwLock<serde_json::Value>,
}

impl LibraryService {
    // XU LI KHOI TAO VA DI CU DU LIEU THU VIEN
    pub fn new<P: AsRef<Path>>(data_dir: P) -> Self {
        let data_dir = data_dir.as_ref().to_path_buf();
        let covers_dir = data_dir.join("covers");
        let config_dir = data_dir.join("config");
        let library_dir = data_dir.join("library");
        let cache_dir = data_dir.join("cache");
        let downloads_dir = data_dir.join("downloads");

        let _ = fs::create_dir_all(&data_dir);
        let _ = fs::create_dir_all(&covers_dir);
        let _ = fs::create_dir_all(&config_dir);
        let _ = fs::create_dir_all(&library_dir);
        let _ = fs::create_dir_all(&cache_dir);
        let _ = fs::create_dir_all(&downloads_dir);

        let config_file = config_dir.join("config.json");
        let playback_file = config_dir.join("playback.json");
        let library_file = library_dir.join("library.json");
        let playlists_file = library_dir.join("playlists.json");
        let history_file = library_dir.join("history.json");
        let continue_file = library_dir.join("continue_listening.json");
        let custom_bg_file = config_dir.join("custom_backgrounds.json");
        let home_cache_file = cache_dir.join("home_cache.json");

        Self::migrate_if_needed(&data_dir, &covers_dir, &config_file, &library_file);

        let initial_tracks = if library_file.exists() {
            fs::read_to_string(&library_file)
                .ok()
                .and_then(|content| serde_json::from_str::<LibraryData>(&content).ok())
                .map(|d| d.tracks)
                .unwrap_or_default()
        } else {
            let empty = LibraryData { tracks: Vec::new() };
            if let Ok(json) = serde_json::to_string_pretty(&empty) {
                let _ = fs::write(&library_file, json);
            }
            Vec::new()
        };

        let initial_playlists = if playlists_file.exists() {
            fs::read_to_string(&playlists_file)
                .ok()
                .and_then(|content| serde_json::from_str::<PlaylistsData>(&content).ok())
                .map(|d| d.playlists)
                .unwrap_or_default()
        } else {
            let empty = PlaylistsData { playlists: Vec::new() };
            if let Ok(json) = serde_json::to_string_pretty(&empty) {
                let _ = fs::write(&playlists_file, json);
            }
            Vec::new()
        };

        let initial_config = if config_file.exists() {
            fs::read_to_string(&config_file)
                .ok()
                .and_then(|content| serde_json::from_str::<AppConfig>(&content).ok())
                .unwrap_or_default()
        } else {
            let default_cfg = AppConfig::default();
            if let Ok(json) = serde_json::to_string_pretty(&default_cfg) {
                let _ = fs::write(&config_file, json);
            }
            default_cfg
        };

        let initial_playback = if playback_file.exists() {
            fs::read_to_string(&playback_file)
                .ok()
                .and_then(|content| serde_json::from_str::<PlaybackState>(&content).ok())
                .unwrap_or_default()
        } else {
            let default_pb = PlaybackState::default();
            if let Ok(json) = serde_json::to_string_pretty(&default_pb) {
                let _ = fs::write(&playback_file, json);
            }
            default_pb
        };

        let initial_history = if history_file.exists() {
            fs::read_to_string(&history_file)
                .ok()
                .and_then(|content| serde_json::from_str::<Vec<serde_json::Value>>(&content).ok())
                .unwrap_or_default()
        } else {
            Vec::new()
        };

        let initial_continue = if continue_file.exists() {
            fs::read_to_string(&continue_file)
                .ok()
                .and_then(|content| serde_json::from_str::<Vec<serde_json::Value>>(&content).ok())
                .unwrap_or_default()
        } else {
            Vec::new()
        };

        let initial_custom_bg = if custom_bg_file.exists() {
            fs::read_to_string(&custom_bg_file)
                .ok()
                .and_then(|content| serde_json::from_str::<serde_json::Value>(&content).ok())
                .unwrap_or_else(|| serde_json::json!({}))
        } else {
            serde_json::json!({})
        };

        let initial_home_cache = if home_cache_file.exists() {
            fs::read_to_string(&home_cache_file)
                .ok()
                .and_then(|content| serde_json::from_str::<serde_json::Value>(&content).ok())
                .unwrap_or_else(|| serde_json::json!({}))
        } else {
            serde_json::json!({})
        };

        Self {
            data_dir,
            covers_dir,
            config_dir,
            library_dir,
            cache_dir,
            downloads_dir,
            config_file,
            playback_file,
            library_file,
            playlists_file,
            history_file,
            continue_file,
            custom_bg_file,
            home_cache_file,
            tracks_cache: RwLock::new(initial_tracks),
            playlists_cache: RwLock::new(initial_playlists),
            config_cache: RwLock::new(initial_config),
            playback_cache: RwLock::new(initial_playback),
            history_cache: RwLock::new(initial_history),
            continue_cache: RwLock::new(initial_continue),
            custom_bg_cache: RwLock::new(initial_custom_bg),
            home_cache: RwLock::new(initial_home_cache),
        }
    }

    fn migrate_if_needed(
        data_dir: &Path,
        covers_dir: &Path,
        config_file: &Path,
        library_file: &Path,
    ) {
        let legacy_config = data_dir.join("config.json");
        if legacy_config.exists() && !config_file.exists() {
            let _ = fs::copy(&legacy_config, config_file);
        }
        let legacy_library = data_dir.join("library.json");
        if legacy_library.exists() && (!library_file.exists() || fs::metadata(library_file).map(|m| m.len()).unwrap_or(0) < 10) {
            let _ = fs::copy(&legacy_library, library_file);
        }

        if let Ok(app_data_env) = std::env::var("APPDATA") {
            let appdata_dir = PathBuf::from(app_data_env).join("com.omnimusic.player").join("data");
            if appdata_dir.exists() {
                let appdata_lib = appdata_dir.join("library.json");
                if appdata_lib.exists() && (!library_file.exists() || fs::metadata(library_file).map(|m| m.len()).unwrap_or(0) < 10) {
                    let _ = fs::copy(&appdata_lib, library_file);
                }

                let appdata_cfg = appdata_dir.join("config.json");
                if appdata_cfg.exists() && !config_file.exists() {
                    let _ = fs::copy(&appdata_cfg, config_file);
                }

                let appdata_covers = appdata_dir.join("covers");
                if appdata_covers.exists() {
                    if let Ok(entries) = fs::read_dir(appdata_covers) {
                        for entry in entries.flatten() {
                            let target = covers_dir.join(entry.file_name());
                            if !target.exists() {
                                let _ = fs::copy(entry.path(), target);
                            }
                        }
                    }
                }

                let appdata_audio_cache = appdata_dir.join("cache").join("audio");
                let local_audio_cache = data_dir.join("cache").join("audio");
                let _ = fs::create_dir_all(&local_audio_cache);
                if appdata_audio_cache.exists() {
                    if let Ok(entries) = fs::read_dir(appdata_audio_cache) {
                        for entry in entries.flatten() {
                            let target = local_audio_cache.join(entry.file_name());
                            if !target.exists() {
                                let _ = fs::copy(entry.path(), target);
                            }
                        }
                    }
                }
            }
        }
    }

    // XU LI LAY DANH SACH BAI HAT TRONG THU VIEN
    pub fn get_tracks(&self) -> Vec<Track> {
        self.tracks_cache.read().unwrap().clone()
    }

    // XU LI LUU BAI HAT VAO THU VIEN
    pub fn save_track(&self, mut track: Track) -> Track {
        let mut guard = self.tracks_cache.write().unwrap();
        if track.original_title.is_none() {
            track.original_title = Some(track.title.clone());
        }
        if track.original_artist.is_none() {
            track.original_artist = Some(track.artist.clone());
        }
        if track.original_cover.is_none() {
            track.original_cover = Some(track.cover.clone());
        }

        if let Some(pos) = guard
            .iter()
            .position(|t| t.id == track.id && t.source == track.source)
        {
            guard[pos] = track.clone();
        } else {
            guard.insert(0, track.clone());
        }

        self.persist_tracks(&guard);
        track
    }

    // XU LI CHINH SUA THONG TIN BAI HAT VA MAU SAC SONG NHAC RIENG BIET
    pub fn edit_track_with_discord_url(
        &self,
        track_id: &str,
        source: &str,
        title: Option<String>,
        artist: Option<String>,
        cover: Option<String>,
        discord_cover_url: Option<String>,
        color_wave_a: Option<String>,
        color_wave_b: Option<String>,
        color_wave_c: Option<String>,
        color_wave_d: Option<String>,
        reset: bool,
    ) -> Result<Track, String> {
        let mut guard = self.tracks_cache.write().unwrap();
        let track_index = guard
            .iter()
            .position(|t| {
                let id_match = t.id.trim() == track_id.trim()
                    || t.id.trim().trim_start_matches("sc_") == track_id.trim().trim_start_matches("sc_")
                    || t.id.trim().trim_start_matches("sp_") == track_id.trim().trim_start_matches("sp_")
                    || t.id.trim().trim_start_matches("yt_") == track_id.trim().trim_start_matches("yt_");
                let src_match = t.source.trim().eq_ignore_ascii_case(source.trim());
                id_match && src_match
            });

        let idx = match track_index {
            Some(i) => i,
            None => {
                let new_t = Track {
                    id: track_id.to_string(),
                    source: source.to_string(),
                    title: title.clone().unwrap_or_else(|| "Unknown Title".to_string()),
                    artist: artist.clone().unwrap_or_else(|| "Unknown Artist".to_string()),
                    album: None,
                    duration: 0,
                    duration_formatted: None,
                    cover: cover.clone().unwrap_or_default(),
                    url: String::new(),
                    views: None,
                    views_formatted: None,
                    uploaded_at: None,
                    original_title: title.clone(),
                    original_artist: artist.clone(),
                    original_cover: cover.clone(),
                    local_cover_path: None,
                    discord_cover_url: discord_cover_url.clone(),
                    added_at: None,
                    updated_at: None,
                    color_wave_a: color_wave_a.clone(),
                    color_wave_b: color_wave_b.clone(),
                    color_wave_c: color_wave_c.clone(),
                    color_wave_d: color_wave_d.clone(),
                };
                guard.insert(0, new_t);
                0
            }
        };

        let track = &mut guard[idx];

        if reset {
            if let Some(ref orig_t) = track.original_title {
                track.title = orig_t.clone();
            }
            if let Some(ref orig_a) = track.original_artist {
                track.artist = orig_a.clone();
            }
            if let Some(ref orig_c) = track.original_cover {
                track.cover = orig_c.clone();
            }
            track.local_cover_path = None;
            track.discord_cover_url = None;
            track.color_wave_a = None;
            track.color_wave_b = None;
            track.color_wave_c = None;
            track.color_wave_d = None;
        } else {
            if track.original_title.is_none() {
                track.original_title = Some(track.title.clone());
            }
            if track.original_artist.is_none() {
                track.original_artist = Some(track.artist.clone());
            }
            if track.original_cover.is_none() {
                track.original_cover = Some(track.cover.clone());
            }

            if let Some(ref t) = title {
                if !t.trim().is_empty() {
                    track.title = t.trim().to_string();
                }
            }
            if let Some(ref a) = artist {
                if !a.trim().is_empty() {
                    track.artist = a.trim().to_string();
                }
            }
            if let Some(ref c) = cover {
                if !c.trim().is_empty() {
                    track.cover = c.trim().to_string();
                    track.discord_cover_url = None;
                }
            }
            if let Some(ref dc) = discord_cover_url {
                track.discord_cover_url = Some(dc.clone());
            }
            if color_wave_a.is_some() {
                track.color_wave_a = color_wave_a.clone();
            }
            if color_wave_b.is_some() {
                track.color_wave_b = color_wave_b.clone();
            }
            if color_wave_c.is_some() {
                track.color_wave_c = color_wave_c.clone();
            }
            if color_wave_d.is_some() {
                track.color_wave_d = color_wave_d.clone();
            }
        }

        let updated = track.clone();
        self.persist_tracks(&guard);

        {
            let mut pl_guard = self.playlists_cache.write().unwrap();
            let mut pl_changed = false;
            for pl in pl_guard.iter_mut() {
                for pt in pl.tracks.iter_mut() {
                    let id_match = pt.id.trim() == track_id.trim()
                        || pt.id.trim().trim_start_matches("sc_") == track_id.trim().trim_start_matches("sc_")
                        || pt.id.trim().trim_start_matches("sp_") == track_id.trim().trim_start_matches("sp_")
                        || pt.id.trim().trim_start_matches("yt_") == track_id.trim().trim_start_matches("yt_");
                    let src_match = pt.source.trim().eq_ignore_ascii_case(source.trim());
                    if id_match && src_match {
                        if reset {
                            if let Some(ref orig_t) = pt.original_title {
                                pt.title = orig_t.clone();
                            }
                            if let Some(ref orig_a) = pt.original_artist {
                                pt.artist = orig_a.clone();
                            }
                            if let Some(ref orig_c) = pt.original_cover {
                                pt.cover = orig_c.clone();
                            }
                            pt.local_cover_path = None;
                            pt.discord_cover_url = None;
                            pt.color_wave_a = None;
                            pt.color_wave_b = None;
                            pt.color_wave_c = None;
                            pt.color_wave_d = None;
                        } else {
                            if pt.original_title.is_none() {
                                pt.original_title = Some(pt.title.clone());
                            }
                            if pt.original_artist.is_none() {
                                pt.original_artist = Some(pt.artist.clone());
                            }
                            if pt.original_cover.is_none() {
                                pt.original_cover = Some(pt.cover.clone());
                            }

                            if let Some(ref t) = title {
                                if !t.trim().is_empty() {
                                    pt.title = t.trim().to_string();
                                }
                            }
                            if let Some(ref a) = artist {
                                if !a.trim().is_empty() {
                                    pt.artist = a.trim().to_string();
                                }
                            }
                            if let Some(ref c) = cover {
                                if !c.trim().is_empty() {
                                    pt.cover = c.trim().to_string();
                                    pt.discord_cover_url = None;
                                }
                            }
                            if let Some(ref dc) = discord_cover_url {
                                pt.discord_cover_url = Some(dc.clone());
                            }
                            if color_wave_a.is_some() {
                                pt.color_wave_a = color_wave_a.clone();
                            }
                            if color_wave_b.is_some() {
                                pt.color_wave_b = color_wave_b.clone();
                            }
                            if color_wave_c.is_some() {
                                pt.color_wave_c = color_wave_c.clone();
                            }
                            if color_wave_d.is_some() {
                                pt.color_wave_d = color_wave_d.clone();
                            }
                        }
                        pl_changed = true;
                    }
                }
            }
            if pl_changed {
                self.persist_playlists(&pl_guard);
            }
        }

        Ok(updated)
    }

    // XU LI CAP NHAT URL ANH BIA DISCORD CHO BAI HAT
    pub fn update_track_discord_cover_url(&self, track_id: &str, source: &str, url: &str) {
        {
            let mut guard = self.tracks_cache.write().unwrap();
            let track_found = guard.iter_mut().find(|t| {
                let id_match = t.id.trim() == track_id.trim()
                    || t.id.trim().trim_start_matches("sc_") == track_id.trim().trim_start_matches("sc_")
                    || t.id.trim().trim_start_matches("sp_") == track_id.trim().trim_start_matches("sp_")
                    || t.id.trim().trim_start_matches("yt_") == track_id.trim().trim_start_matches("yt_");
                let src_match = t.source.trim().eq_ignore_ascii_case(source.trim());
                id_match && src_match
            });
            if let Some(track) = track_found {
                track.discord_cover_url = Some(url.to_string());
                self.persist_tracks(&guard);
            }
        }
        {
            let mut pl_guard = self.playlists_cache.write().unwrap();
            let mut pl_changed = false;
            for pl in pl_guard.iter_mut() {
                for pt in pl.tracks.iter_mut() {
                    let id_match = pt.id.trim() == track_id.trim()
                        || pt.id.trim().trim_start_matches("sc_") == track_id.trim().trim_start_matches("sc_")
                        || pt.id.trim().trim_start_matches("sp_") == track_id.trim().trim_start_matches("sp_")
                        || pt.id.trim().trim_start_matches("yt_") == track_id.trim().trim_start_matches("yt_");
                    let src_match = pt.source.trim().eq_ignore_ascii_case(source.trim());
                    if id_match && src_match {
                        pt.discord_cover_url = Some(url.to_string());
                        pl_changed = true;
                    }
                }
            }
            if pl_changed {
                self.persist_playlists(&pl_guard);
            }
        }
    }

    // XU LI XOA BAI HAT KHOI THU VIEN
    pub fn delete_track(&self, track_id: &str, source: &str) -> bool {
        let mut guard = self.tracks_cache.write().unwrap();
        let initial_len = guard.len();
        guard.retain(|t| {
            let id_match = t.id.trim() == track_id.trim()
                || t.id.trim().trim_start_matches("sc_") == track_id.trim().trim_start_matches("sc_")
                || t.id.trim().trim_start_matches("sp_") == track_id.trim().trim_start_matches("sp_")
                || t.id.trim().trim_start_matches("yt_") == track_id.trim().trim_start_matches("yt_");
            let src_match = t.source.trim().eq_ignore_ascii_case(source.trim());
            !(id_match && src_match)
        });
        let changed = guard.len() != initial_len;
        if changed {
            self.persist_tracks(&guard);
        }
        changed
    }

    // XU LI CAU HINH HE THONG VA TRANG THAI PHAT NHAC
    pub fn get_config(&self) -> AppConfig {
        self.config_cache.read().unwrap().clone()
    }

    pub fn save_config(&self, new_config: AppConfig) -> AppConfig {
        let mut guard = self.config_cache.write().unwrap();
        *guard = new_config.clone();
        if let Ok(json) = serde_json::to_string_pretty(&new_config) {
            let _ = fs::write(&self.config_file, json);
        }
        new_config
    }

    pub fn get_playback_state(&self) -> PlaybackState {
        self.playback_cache.read().unwrap().clone()
    }

    pub fn save_playback_state(&self, new_state: PlaybackState) -> PlaybackState {
        let mut guard = self.playback_cache.write().unwrap();
        *guard = new_state.clone();
        if let Ok(json) = serde_json::to_string_pretty(&new_state) {
            let _ = fs::write(&self.playback_file, json);
        }
        new_state
    }

    // XU LI LICH SU PHAT NHAC VA DANH SACH TIEP TUC NGHE
    pub fn get_history(&self) -> Vec<serde_json::Value> {
        self.history_cache.read().unwrap().clone()
    }

    pub fn save_history(&self, items: Vec<serde_json::Value>) -> Vec<serde_json::Value> {
        let mut guard = self.history_cache.write().unwrap();
        *guard = items.clone();
        if let Ok(json) = serde_json::to_string_pretty(&items) {
            let _ = fs::write(&self.history_file, json);
        }
        items
    }

    pub fn get_continue_listening(&self) -> Vec<serde_json::Value> {
        self.continue_cache.read().unwrap().clone()
    }

    pub fn save_continue_listening(&self, items: Vec<serde_json::Value>) -> Vec<serde_json::Value> {
        let mut guard = self.continue_cache.write().unwrap();
        *guard = items.clone();
        if let Ok(json) = serde_json::to_string_pretty(&items) {
            let _ = fs::write(&self.continue_file, json);
        }
        items
    }

    // XU LI HINH NEN TUY CHINH VA BO NHO DEM TRANG CHU
    pub fn get_custom_backgrounds(&self) -> serde_json::Value {
        self.custom_bg_cache.read().unwrap().clone()
    }

    pub fn save_custom_backgrounds(&self, data: serde_json::Value) -> serde_json::Value {
        let mut guard = self.custom_bg_cache.write().unwrap();
        *guard = data.clone();
        if let Ok(json) = serde_json::to_string_pretty(&data) {
            let _ = fs::write(&self.custom_bg_file, json);
        }
        data
    }

    pub fn get_home_cache(&self) -> serde_json::Value {
        self.home_cache.read().unwrap().clone()
    }

    pub fn save_home_cache(&self, data: serde_json::Value) -> serde_json::Value {
        let mut guard = self.home_cache.write().unwrap();
        *guard = data.clone();
        if let Ok(json) = serde_json::to_string_pretty(&data) {
            let _ = fs::write(&self.home_cache_file, json);
        }
        data
    }

    // XU LI QUAN LY PLAYLIST (TAO, SUA, XOA, THEM BAI, XOA BAI, SAP XEP)
    pub fn get_playlists(&self) -> Vec<Playlist> {
        self.playlists_cache.read().unwrap().clone()
    }

    pub fn create_playlist(&self, name: String, description: Option<String>) -> Playlist {
        let mut guard = self.playlists_cache.write().unwrap();
        let now = current_iso_timestamp();
        let id = format!("pl_{}", std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_millis())
            .unwrap_or(0));

        let playlist = Playlist {
            id,
            name: if name.trim().is_empty() { "Playlist mới".to_string() } else { name.trim().to_string() },
            description,
            cover: None,
            tracks: Vec::new(),
            created_at: Some(now.clone()),
            updated_at: Some(now),
        };

        guard.push(playlist.clone());
        self.persist_playlists(&guard);
        playlist
    }

    pub fn update_playlist(
        &self,
        id: &str,
        name: Option<String>,
        description: Option<String>,
        cover: Option<String>,
    ) -> Result<Playlist, String> {
        let mut guard = self.playlists_cache.write().unwrap();
        let playlist = guard
            .iter_mut()
            .find(|p| p.id == id)
            .ok_or_else(|| "Playlist not found".to_string())?;

        if let Some(n) = name {
            if !n.trim().is_empty() {
                playlist.name = n.trim().to_string();
            }
        }
        if let Some(d) = description {
            playlist.description = Some(d.trim().to_string());
        }
        if let Some(c) = cover {
            let trimmed = c.trim();
            if trimmed.is_empty() || trimmed == "__REMOVE__" || trimmed == "RESET" {
                playlist.cover = None;
            } else {
                playlist.cover = Some(trimmed.to_string());
            }
        }
        playlist.updated_at = Some(current_iso_timestamp());

        let updated = playlist.clone();
        self.persist_playlists(&guard);
        Ok(updated)
    }

    pub fn delete_playlist(&self, id: &str) -> bool {
        let mut guard = self.playlists_cache.write().unwrap();
        let initial_len = guard.len();
        guard.retain(|p| p.id != id);
        let changed = guard.len() != initial_len;
        if changed {
            self.persist_playlists(&guard);
        }
        changed
    }

    pub fn add_to_playlist(&self, playlist_id: &str, track: Track) -> Result<Playlist, String> {
        let mut guard = self.playlists_cache.write().unwrap();
        let playlist = guard
            .iter_mut()
            .find(|p| p.id == playlist_id)
            .ok_or_else(|| "Playlist not found".to_string())?;

        if !playlist.tracks.iter().any(|t| t.id == track.id && t.source == track.source) {
            playlist.tracks.push(track);
            playlist.updated_at = Some(current_iso_timestamp());
        }

        let updated = playlist.clone();
        self.persist_playlists(&guard);
        Ok(updated)
    }

    pub fn remove_from_playlist(&self, playlist_id: &str, track_id: &str, source: &str) -> Result<Playlist, String> {
        let mut guard = self.playlists_cache.write().unwrap();
        let playlist = guard
            .iter_mut()
            .find(|p| p.id == playlist_id)
            .ok_or_else(|| "Playlist not found".to_string())?;

        let initial_len = playlist.tracks.len();
        playlist.tracks.retain(|t| !(t.id == track_id && t.source == source));
        if playlist.tracks.len() != initial_len {
            playlist.updated_at = Some(current_iso_timestamp());
        }

        let updated = playlist.clone();
        self.persist_playlists(&guard);
        Ok(updated)
    }

    pub fn reorder_playlist_tracks(&self, playlist_id: &str, tracks: Vec<Track>) -> Result<Playlist, String> {
        let mut guard = self.playlists_cache.write().unwrap();
        let playlist = guard
            .iter_mut()
            .find(|p| p.id == playlist_id)
            .ok_or_else(|| "Playlist not found".to_string())?;

        playlist.tracks = tracks;
        playlist.updated_at = Some(current_iso_timestamp());

        let updated = playlist.clone();
        self.persist_playlists(&guard);
        Ok(updated)
    }

    fn persist_playlists(&self, playlists: &[Playlist]) {
        let data = PlaylistsData {
            playlists: playlists.to_vec(),
        };
        if let Ok(json) = serde_json::to_string_pretty(&data) {
            let _ = fs::write(&self.playlists_file, json);
        }
    }

    #[allow(dead_code)]
    pub fn covers_dir(&self) -> &PathBuf {
        &self.covers_dir
    }

    #[allow(dead_code)]
    pub fn downloads_dir(&self) -> &PathBuf {
        &self.downloads_dir
    }

    fn persist_tracks(&self, tracks: &[Track]) {
        let data = LibraryData {
            tracks: tracks.to_vec(),
        };
        if let Ok(json) = serde_json::to_string_pretty(&data) {
            let _ = fs::write(&self.library_file, json);
        }
    }
}

fn current_iso_timestamp() -> String {
    let now = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0);
    format!("{}", now)
}