use reqwest::header::{HeaderMap, HeaderValue, RANGE};
use reqwest::Client;
use std::collections::{HashMap, HashSet};
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use tokio::io::{AsyncReadExt, AsyncSeekExt, AsyncWriteExt};
use tokio::net::{TcpListener, TcpStream};

// KHOI DICH VU PROXY STREAM AM THANH NOI BO VA CACHE AM THANH
#[allow(dead_code)]
pub struct StreamServer {
    port: u16,
    client: Client,
    cache_dir: PathBuf,
    active_downloads: Arc<Mutex<HashSet<String>>>,
}

#[allow(dead_code)]
impl StreamServer {
    // XU LI KHOI DONG SERVER STREAM AM THANH NOI BO (LOCAL STREAM PROXY)
    pub async fn start<P: AsRef<Path>>(root_dir: P) -> Result<Arc<Self>, String> {
        let listener = TcpListener::bind("127.0.0.1:0")
            .await
            .map_err(|e| format!("Failed to bind stream server: {}", e))?;

        let port = listener
            .local_addr()
            .map_err(|e| format!("Failed to get local port: {}", e))?
            .port();

        let client = Client::builder()
            .timeout(std::time::Duration::from_secs(60))
            .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
            .build()
            .unwrap_or_else(|_| Client::new());

        let root = root_dir.as_ref();
        let data_dir = if root.join("cache").join("audio").exists() {
            root.to_path_buf()
        } else if root.join("data").join("cache").join("audio").exists() {
            root.join("data")
        } else if Path::new("data").join("cache").join("audio").exists() {
            PathBuf::from("data")
        } else if root.join("data").exists() {
            root.join("data")
        } else {
            root.to_path_buf()
        };
        let cache_dir = data_dir.join("cache").join("audio");
        let _ = std::fs::create_dir_all(&cache_dir);

        let server = Arc::new(Self {
            port,
            client,
            cache_dir,
            active_downloads: Arc::new(Mutex::new(HashSet::new())),
        });
        let server_clone = server.clone();

        tokio::spawn(async move {
            loop {
                if let Ok((socket, _)) = listener.accept().await {
                    let server_ref = server_clone.clone();
                    tokio::spawn(async move {
                        let _ = server_ref.handle_connection(socket).await;
                    });
                }
            }
        });

        Ok(server)
    }

    pub fn cache_dir(&self) -> &PathBuf {
        &self.cache_dir
    }

    // XU LI TAO KHOA VA KIEM TRA BO NHO DEM AM THANH
    pub fn cache_key(source: &str, id: &str) -> String {
        let clean_id = id
            .chars()
            .map(|c| if c.is_alphanumeric() || c == '_' || c == '-' { c } else { '_' })
            .collect::<String>();
        format!("{}_{}", source, clean_id)
    }

    pub fn is_cached(&self, source: &str, id: &str) -> bool {
        let key = Self::cache_key(source, id);
        let cache_file = self.cache_dir.join(format!("{}.cache", key));
        if cache_file.exists() {
            if let Ok(meta) = std::fs::metadata(&cache_file) {
                return meta.len() > 10240;
            }
        }
        false
    }

    pub fn get_cached_content_type(&self, source: &str, id: &str) -> String {
        let key = Self::cache_key(source, id);
        let meta_file = self.cache_dir.join(format!("{}.meta", key));
        if let Ok(content) = std::fs::read_to_string(&meta_file) {
            let trimmed = content.trim();
            if !trimmed.is_empty() {
                return trimmed.to_string();
            }
        }
        match source {
            "soundcloud" => "audio/mpeg".to_string(),
            _ => "audio/webm".to_string(),
        }
    }

    pub fn get_stream_url(&self, direct_url: &str, content_type: &str) -> String {
        format!(
            "http://127.0.0.1:{}/stream?url={}&type={}",
            self.port,
            url::form_urlencoded::byte_serialize(direct_url.as_bytes()).collect::<String>(),
            url::form_urlencoded::byte_serialize(content_type.as_bytes()).collect::<String>()
        )
    }

    pub fn get_stream_url_with_meta(
        &self,
        id: &str,
        source: &str,
        direct_url: &str,
        content_type: &str,
    ) -> String {
        format!(
            "http://127.0.0.1:{}/stream?id={}&source={}&url={}&type={}",
            self.port,
            url::form_urlencoded::byte_serialize(id.as_bytes()).collect::<String>(),
            url::form_urlencoded::byte_serialize(source.as_bytes()).collect::<String>(),
            url::form_urlencoded::byte_serialize(direct_url.as_bytes()).collect::<String>(),
            url::form_urlencoded::byte_serialize(content_type.as_bytes()).collect::<String>()
        )
    }

    pub fn get_cached_stream_url(&self, id: &str, source: &str, content_type: &str) -> String {
        format!(
            "http://127.0.0.1:{}/stream?id={}&source={}&type={}&cached=1",
            self.port,
            url::form_urlencoded::byte_serialize(id.as_bytes()).collect::<String>(),
            url::form_urlencoded::byte_serialize(source.as_bytes()).collect::<String>(),
            url::form_urlencoded::byte_serialize(content_type.as_bytes()).collect::<String>()
        )
    }

    // XU LI KHOI DONG TIEN TRINH TAI VA GHI CACHE AM THANH TRONG NEN
    pub fn start_background_cache(
        &self,
        id: &str,
        source: &str,
        direct_url: &str,
        content_type: &str,
    ) {
        let key = Self::cache_key(source, id);
        let cache_file = self.cache_dir.join(format!("{}.cache", key));
        let part_file = self.cache_dir.join(format!("{}.part", key));
        let meta_file = self.cache_dir.join(format!("{}.meta", key));

        if cache_file.exists() {
            return;
        }

        {
            let mut active = self.active_downloads.lock().unwrap();
            if active.contains(&key) {
                return;
            }
            active.insert(key.clone());
        }

        let client = self.client.clone();
        let url = direct_url.to_string();
        let ctype = content_type.to_string();
        let active_downloads = self.active_downloads.clone();
        let key_clone = key.clone();

        tokio::spawn(async move {
            let res: Result<(), Box<dyn std::error::Error + Send + Sync>> = async {
                let resp = client
                    .get(&url)
                    .header(
                        "User-Agent",
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    )
                    .send()
                    .await?;

                if !resp.status().is_success() {
                    return Err(format!("Upstream returned status {}", resp.status()).into());
                }

                let mut file = tokio::fs::File::create(&part_file).await?;
                let mut stream = resp;

                while let Some(chunk) = stream.chunk().await? {
                    file.write_all(&chunk).await?;
                }
                file.flush().await?;
                drop(file);

                let _ = tokio::fs::write(&meta_file, ctype.as_bytes()).await;
                tokio::fs::rename(&part_file, &cache_file).await?;
                Ok(())
            }
            .await;

            if res.is_err() {
                let _ = tokio::fs::remove_file(&part_file).await;
            }

            let mut active = active_downloads.lock().unwrap();
            active.remove(&key_clone);
        });
    }

    // XU LI KET NOI CLIENT VA PHUC VU STREAMING RANGE REQUEST
    async fn handle_connection(
        &self,
        mut socket: TcpStream,
    ) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
        let mut buffer = [0u8; 4096];
        let n = socket.read(&mut buffer).await?;
        if n == 0 {
            return Ok(());
        }

        let request_str = String::from_utf8_lossy(&buffer[..n]);
        let mut lines = request_str.lines();
        let request_line = match lines.next() {
            Some(l) => l,
            None => return Ok(()),
        };

        let mut parts = request_line.split_whitespace();
        let method = parts.next().unwrap_or("GET");
        let path_and_query = parts.next().unwrap_or("/");

        if method != "GET" && method != "HEAD" {
            let res = "HTTP/1.1 405 Method Not Allowed\r\nContent-Length: 0\r\n\r\n";
            socket.write_all(res.as_bytes()).await?;
            return Ok(());
        }

        let mut range_header: Option<String> = None;
        for line in lines {
            if line.is_empty() {
                break;
            }
            if let Some(pos) = line.find(':') {
                let name = line[..pos].trim();
                let val = line[pos + 1..].trim();
                if name.eq_ignore_ascii_case("range") {
                    range_header = Some(val.to_string());
                }
            }
        }

        let parsed_url = match url::Url::parse(&format!("http://127.0.0.1{}", path_and_query)) {
            Ok(u) => u,
            Err(_) => {
                let res = "HTTP/1.1 400 Bad Request\r\nContent-Length: 0\r\n\r\n";
                socket.write_all(res.as_bytes()).await?;
                return Ok(());
            }
        };

        if parsed_url.path() != "/stream" {
            let res = "HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n";
            socket.write_all(res.as_bytes()).await?;
            return Ok(());
        }

        let query_pairs: HashMap<String, String> = parsed_url.query_pairs().into_owned().collect();
        let track_id = query_pairs.get("id").map(|s| s.as_str()).unwrap_or("");
        let source = query_pairs.get("source").map(|s| s.as_str()).unwrap_or("");
        let content_type = query_pairs
            .get("type")
            .map(|s| s.as_str())
            .unwrap_or("audio/webm");

        if !track_id.is_empty() && !source.is_empty() {
            let key = Self::cache_key(source, track_id);
            let cache_file = self.cache_dir.join(format!("{}.cache", key));

            if cache_file.exists() {
                if let Ok(meta) = tokio::fs::metadata(&cache_file).await {
                    let file_len = meta.len();
                    if file_len > 10240 {
                        return self
                            .serve_local_file(
                                socket,
                                &cache_file,
                                file_len,
                                content_type,
                                range_header.as_deref(),
                                method == "HEAD",
                            )
                            .await;
                    }
                }
            }
        }

        let direct_url = match query_pairs.get("url") {
            Some(u) if !u.is_empty() => u,
            _ => {
                let res = "HTTP/1.1 400 Missing URL\r\nContent-Length: 0\r\n\r\n";
                socket.write_all(res.as_bytes()).await?;
                return Ok(());
            }
        };

        if !track_id.is_empty() && !source.is_empty() {
            self.start_background_cache(track_id, source, direct_url, content_type);
        }

        let mut req_builder = self
            .client
            .get(direct_url)
            .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

        if let Some(ref r) = range_header {
            if let Ok(val) = HeaderValue::from_str(r) {
                req_builder = req_builder.header(RANGE, val);
            }
        }

        let mut upstream_resp = match req_builder.send().await {
            Ok(r) => r,
            Err(_) => {
                let res = "HTTP/1.1 502 Bad Gateway\r\nContent-Length: 0\r\n\r\n";
                socket.write_all(res.as_bytes()).await?;
                return Ok(());
            }
        };

        let status = upstream_resp.status();
        let headers: &HeaderMap = upstream_resp.headers();

        let mut response_header = format!(
            "HTTP/1.1 {}\r\nContent-Type: {}\r\nAccept-Ranges: bytes\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Headers: Range\r\nCache-Control: no-cache\r\n",
            if status.as_u16() == 206 { "206 Partial Content" } else { "200 OK" },
            content_type
        );

        if let Some(cl) = headers.get("content-length") {
            if let Ok(val) = cl.to_str() {
                response_header.push_str(&format!("Content-Length: {}\r\n", val));
            }
        }

        if let Some(cr) = headers.get("content-range") {
            if let Ok(val) = cr.to_str() {
                response_header.push_str(&format!("Content-Range: {}\r\n", val));
            }
        }

        response_header.push_str("\r\n");
        socket.write_all(response_header.as_bytes()).await?;

        if method == "HEAD" {
            return Ok(());
        }

        while let Some(chunk) = upstream_resp.chunk().await? {
            if socket.write_all(&chunk).await.is_err() {
                break;
            }
        }

        Ok(())
    }

    async fn serve_local_file(
        &self,
        mut socket: TcpStream,
        file_path: &Path,
        file_len: u64,
        content_type: &str,
        range_header: Option<&str>,
        is_head: bool,
    ) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
        let mut file = tokio::fs::File::open(file_path).await?;

        let (status_line, start, end, chunk_len) = if let Some(range_str) = range_header {
            if let Some(range_spec) = range_str.strip_prefix("bytes=") {
                let parts: Vec<&str> = range_spec.split('-').collect();
                let start = parts[0].parse::<u64>().unwrap_or(0);
                let end = if parts.len() > 1 && !parts[1].is_empty() {
                    parts[1].parse::<u64>().unwrap_or(file_len - 1).min(file_len - 1)
                } else {
                    file_len - 1
                };
                let chunk_len = if end >= start { end - start + 1 } else { 0 };
                ("HTTP/1.1 206 Partial Content", start, end, chunk_len)
            } else {
                ("HTTP/1.1 200 OK", 0, file_len - 1, file_len)
            }
        } else {
            ("HTTP/1.1 200 OK", 0, file_len - 1, file_len)
        };

        let mut headers = format!(
            "{}\r\nContent-Type: {}\r\nAccept-Ranges: bytes\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Headers: Range\r\nCache-Control: public, max-age=31536000\r\nContent-Length: {}\r\n",
            status_line, content_type, chunk_len
        );

        if status_line.contains("206") {
            headers.push_str(&format!(
                "Content-Range: bytes {}-{}/{}\r\n",
                start, end, file_len
            ));
        }

        headers.push_str("\r\n");
        socket.write_all(headers.as_bytes()).await?;

        if is_head || chunk_len == 0 {
            return Ok(());
        }

        file.seek(std::io::SeekFrom::Start(start)).await?;

        let mut remaining = chunk_len;
        let mut buf = [0u8; 65536];

        while remaining > 0 {
            let to_read = (remaining as usize).min(buf.len());
            let n = file.read(&mut buf[..to_read]).await?;
            if n == 0 {
                break;
            }
            if socket.write_all(&buf[..n]).await.is_err() {
                break;
            }
            remaining -= n as u64;
        }

        Ok(())
    }
}