mod commands;
mod models;
mod services;

use commands::*;
use services::discord::DiscordService;
use services::image_uploader::ImageUploader;
use services::library::LibraryService;
use services::soundcloud::SoundCloudService;
use services::spotify::SpotifyService;
use services::stream_server::StreamServer;
use services::youtube::YouTubeService;
use std::path::PathBuf;
use std::sync::Arc;
use tauri::Manager;

// XU LI XAC DINH THU MUC DU LIEU DI DONG (PORTABLE DATA DIR)
fn resolve_data_dir() -> PathBuf {
    // 1. Uu tien hang dau (Chuan Portable): Thu muc "data" nam ngay canh file thuc thi EXE (UngDungChaySan\data)
    if let Ok(exe) = std::env::current_exe() {
        if let Some(parent) = exe.parent() {
            let is_target = parent.ends_with("release") || parent.ends_with("debug");
            if !is_target {
                let portable_data = parent.join("data");
                let _ = std::fs::create_dir_all(&portable_data);
                return portable_data;
            }
        }
    }

    // 2. Neu dang chay trong moi truong dev (cargo run tu MaNguonTauri): tim UngDungChaySan/data
    if let Ok(cwd) = std::env::current_dir() {
        let mut curr = Some(cwd);
        while let Some(dir) = curr {
            let target_data = dir.join("UngDungChaySan").join("data");
            if target_data.is_dir() {
                return target_data;
            }
            curr = dir.parent().map(|p| p.to_path_buf());
        }
    }

    // 3. Fallback
    if let Ok(exe) = std::env::current_exe() {
        if let Some(parent) = exe.parent() {
            let data = parent.join("data");
            let _ = std::fs::create_dir_all(&data);
            return data;
        }
    }

    let fallback = PathBuf::from("UngDungChaySan/data");
    let _ = std::fs::create_dir_all(&fallback);
    fallback
}

// XU LI KHOI DONG UNG DUNG TAURI VA KHOI TAO HE THONG DICH VU
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::panic::set_hook(Box::new(|info| {
        let msg = format!("PANIC: {:?}\n", info);
        let _ = std::fs::write("app_crash.log", msg);
    }));

    let data_dir = resolve_data_dir();
    let webview_dir = data_dir.join("webview");
    let _ = std::fs::create_dir_all(&webview_dir);
    #[cfg(target_os = "windows")]
    {
        std::env::set_var("WEBVIEW2_USER_DATA_FOLDER", &webview_dir);
    }

    tauri::Builder::default()
        .setup(|app| {
            let data_dir = resolve_data_dir();

            let yt_service = Arc::new(YouTubeService::new());
            let sp_service = Arc::new(SpotifyService::new(yt_service.clone()));
            let sc_service = Arc::new(SoundCloudService::new());
            let lib_service = Arc::new(LibraryService::new(&data_dir));
            let discord_service = Arc::new(DiscordService::new());
            let image_uploader = Arc::new(ImageUploader::new());

            let cfg = lib_service.get_config();
            if cfg.discord_rpc_enabled {
                let custom_id = if cfg.discord_client_id.trim().len() > 10 {
                    Some(cfg.discord_client_id.trim().to_string())
                } else {
                    None
                };
                discord_service.init(custom_id);
            }

            let stream_server = tauri::async_runtime::block_on(async {
                StreamServer::start(&data_dir)
                    .await
                    .expect("Failed to start local stream server")
            });

            let state = AppState {
                youtube: yt_service,
                spotify: sp_service,
                soundcloud: sc_service,
                stream_server,
                library: lib_service,
                discord: discord_service,
                image_uploader,
            };

            app.manage(state);

            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
                let _ = window.set_focus();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            search_all,
            search_source,
            get_stream_url,
            get_library,
            save_track,
            edit_track,
            delete_track,
            get_playlists,
            create_playlist,
            update_playlist,
            delete_playlist,
            add_to_playlist,
            remove_from_playlist,
            reorder_playlist_tracks,
            get_config,
            save_config,
            get_playback_state,
            save_playback_state,
            get_history,
            save_history,
            get_continue_listening,
            save_continue_listening,
            get_custom_backgrounds,
            save_custom_backgrounds,
            get_home_cache,
            save_home_cache,
            update_discord_activity,
            clear_discord_activity,
            minimize_window,
            toggle_maximize_window,
            is_window_maximized,
            close_window,
            toggle_fullscreen,
            set_fullscreen,
            save_image_to_disk,
            get_available_gifs
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}