use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// MO HINH DU LIEU BAI HAT (TRACK)
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Track {
    pub id: String,
    pub source: String,
    pub title: String,
    pub artist: String,
    #[serde(default)]
    pub album: Option<String>,
    #[serde(default)]
    pub duration: u64,
    #[serde(default)]
    pub duration_formatted: Option<String>,
    #[serde(default)]
    pub cover: String,
    #[serde(default)]
    pub url: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub views: Option<u64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub views_formatted: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub uploaded_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub original_title: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub original_artist: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub original_cover: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub local_cover_path: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub discord_cover_url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub added_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updated_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub color_wave_a: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub color_wave_b: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub color_wave_c: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub color_wave_d: Option<String>,
}

// MO HINH KET QUA STREAM AM THANH (STREAM RESULT)
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StreamResult {
    pub stream_url: String,
    pub content_type: String,
}

// MO HINH CAU HINH HE THONG UNG DUNG (APP CONFIG)
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AppConfig {
    pub discord_rpc_enabled: bool,
    pub discord_client_id: String,
    pub volume: f32,
    pub repeat_mode: String,
    pub shuffle: bool,
    #[serde(default = "default_theme")]
    pub theme: String,
    #[serde(default = "default_accent")]
    pub accent_color: String,
    #[serde(default = "default_sidebar")]
    pub sidebar_expanded: bool,
    #[serde(default = "default_show_source_badges")]
    pub show_source_badges: bool,
    #[serde(default = "default_crossfade_enabled")]
    pub crossfade_enabled: bool,
    #[serde(default = "default_crossfade_duration")]
    pub crossfade_duration: f32,
    #[serde(default = "default_crossfade_overlap")]
    pub crossfade_overlap: f32,
    #[serde(default = "default_crossfade_dur")]
    pub crossfade_dur_a: f32,
    #[serde(default = "default_crossfade_dur")]
    pub crossfade_dur_b: f32,
    #[serde(default = "default_crossfade_curve")]
    pub crossfade_curve_a: f32,
    #[serde(default = "default_crossfade_curve")]
    pub crossfade_curve_b: f32,
    #[serde(default)]
    pub sidebar_topnav_collapsed: bool,
    #[serde(default)]
    pub track_page_compact: bool,
    #[serde(default = "default_layout_mode")]
    pub layout_mode: String,
    #[serde(default = "default_continuous_wave_swap")]
    pub continuous_wave_swap: bool,
    #[serde(default)]
    pub shortcuts: Option<HashMap<String, String>>,
}

fn default_continuous_wave_swap() -> bool {
    true
}

fn default_layout_mode() -> String {
    "grid".to_string()
}

fn default_theme() -> String {
    "dark".to_string()
}

fn default_accent() -> String {
    "#1db954".to_string()
}

fn default_sidebar() -> bool {
    false
}

fn default_show_source_badges() -> bool {
    true
}

fn default_crossfade_enabled() -> bool {
    false
}

fn default_crossfade_duration() -> f32 {
    5.0
}

fn default_crossfade_overlap() -> f32 {
    -3.0
}

fn default_crossfade_dur() -> f32 {
    3.0
}

fn default_crossfade_curve() -> f32 {
    0.0
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            discord_rpc_enabled: true,
            discord_client_id: String::new(),
            volume: 0.8,
            repeat_mode: "off".to_string(),
            shuffle: false,
            theme: "dark".to_string(),
            accent_color: "#1db954".to_string(),
            sidebar_expanded: false,
            show_source_badges: true,
            crossfade_enabled: false,
            crossfade_duration: 5.0,
            crossfade_overlap: -3.0,
            crossfade_dur_a: 3.0,
            crossfade_dur_b: 3.0,
            crossfade_curve_a: 0.0,
            crossfade_curve_b: 0.0,
            sidebar_topnav_collapsed: false,
            track_page_compact: false,
            layout_mode: "grid".to_string(),
            continuous_wave_swap: true,
            shortcuts: None,
        }
    }
}

// MO HINH DOAN LAP A-B (AB SEGMENT)
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct AbSegment {
    pub start: Option<f64>,
    pub end: Option<f64>,
}

// MO HINH TRANG THAI PHAT NHAC (PLAYBACK STATE)
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct PlaybackState {
    pub current_track: Option<Track>,
    pub current_time: f64,
    pub is_playing: bool,
    pub queue: Vec<Track>,
    pub queue_index: i32,
    pub ab_segments: HashMap<String, AbSegment>,
}

// MO HINH DANH SACH PHAT (PLAYLIST)
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Playlist {
    pub id: String,
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub cover: Option<String>,
    pub tracks: Vec<Track>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updated_at: Option<String>,
}

// MO HINH LUU TRU PLAYLISTS (PLAYLISTS DATA)
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct PlaylistsData {
    pub playlists: Vec<Playlist>,
}

// MO HINH LUU TRU THU VIEN (LIBRARY DATA)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryData {
    pub tracks: Vec<Track>,
}