@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "WEBVIEW2_USER_DATA_FOLDER=%~dp0UngDungChaySan\data\webview"
if exist "%~dp0UngDungChaySan\OmniMusicPlayer.exe" (
    cd /d "%~dp0UngDungChaySan"
    start "" "OmniMusicPlayer.exe"
    exit
)
where cargo >nul 2>nul
if %errorlevel% neq 0 (
    powershell -Command "Start-Process 'https://win.rustup.rs/x86_64'"
    exit /b 1
)
cd /d "%~dp0MaNguonTauri"
cargo run --release
