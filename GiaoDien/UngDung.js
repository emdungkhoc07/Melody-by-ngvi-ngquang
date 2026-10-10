// Global error loggers to catch any unexpected issues

window.addEventListener('error', (e) => {

  console.error('[Global JS Error]', e.message, e.filename, e.lineno, e.error);

});

window.addEventListener('unhandledrejection', (e) => {

  console.error('[Global Unhandled Rejection]', e.reason);

});



// Disable default window dialogs completely

window.alert = () => {};

window.confirm = () => true;

window.prompt = () => null;



const ICONS = {

  play: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="transform: translateX(1px);"><path d="M7.5 4.3c-.8-.5-1.5-.1-1.5.9v13.6c0 1 .7 1.4 1.5.9l11.8-6.8c.8-.5.8-1.3 0-1.8L7.5 4.3z"/></svg>',

  pause: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="5.5" y="4" width="4" height="16" rx="2"/><rect x="14.5" y="4" width="4" height="16" rx="2"/></svg>',

  loading: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>',

  heartOutline: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',

  heartSolid: '<svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" stroke-width="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',

  volHigh: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>',

  volLow: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>',

  volMute: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><line x1="17" y1="9" x2="23" y2="15"/><line x1="23" y1="9" x2="17" y2="15"/></svg>',

  shuffleOff: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.6-8.6c.8-1.1 2-1.7 3.3-1.7H21"/><path d="M17 2l4 4-4 4"/><path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l1.8 2.3"/><path d="M13.5 14l1.8 2.3c.8 1.1 2 1.7 3.3 1.7H21"/><path d="M17 14l4 4-4 4"/></svg>',

  shuffleOn: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.6-8.6c.8-1.1 2-1.7 3.3-1.7H21"/><path d="M17 2l4 4-4 4"/><path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l1.8 2.3"/><path d="M13.5 14l1.8 2.3c.8 1.1 2 1.7 3.3 1.7H21"/><path d="M17 14l4 4-4 4"/></svg>',

  repeatOff: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',

  repeatAll: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',

  repeatOne: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/><text x="12" y="14" font-size="8.5" font-weight="800" text-anchor="middle" fill="var(--accent)" stroke="none" font-family="system-ui, sans-serif">1</text></svg>',

  download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',

  success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',

  error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',

  edit: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',

  trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',

  plus: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',

  playlist: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',

  dragHandle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="5" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="5" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="19" r="1.5"/></svg>',

  check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',

  eye: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',

  calendar: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',

  playlistPlay: '<svg width="22" height="22" viewBox="0 0 24 24"><polygon points="8,5.5 18,12 8,18.5" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>',

  playlistPause: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="2"/><rect x="14" y="5" width="4" height="14" rx="2"/></svg>',

  musicNote: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',

  copy: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',

  link: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',

  typeText: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',

  dotsHorizontal: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'

};



const COLOR_NAMES = {

  '#1db954': 'Xanh lá (Spotify)',

  '#3b82f6': 'Xanh dương',

  '#a855f7': 'Tím Neon',

  '#ef4444': 'Đỏ Ruby',

  '#f59e0b': 'Vàng Cam',

  '#06b6d4': 'Xanh Cyan',

  '#ec4899': 'Hồng Rose'

};



// XU LI TIEN ICH DINH DANG DU LIEU VA THOI GIAN
function formatError(err) {

  if (!err) return 'Lỗi không xác định';

  if (typeof err === 'string') return err;

  return err.message || err.toString() || JSON.stringify(err);

}



function parseDurationSec(duration, durationFormatted) {

  if (typeof duration === 'number' && !isNaN(duration) && duration > 0) {

    return duration;

  }

  if (typeof durationFormatted === 'string' && durationFormatted.trim()) {

    const parts = durationFormatted.trim().split(':').map(Number);

    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {

      return parts[0] * 60 + parts[1];

    }

    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {

      return parts[0] * 3600 + parts[1] * 60 + parts[2];

    }

  }

  return 0;

}



function formatTime(sec, forceHours = false) {

  if (!sec || isNaN(sec) || !isFinite(sec)) return forceHours ? '0:00:00' : '0:00';

  const s = Math.floor(Math.max(0, sec));

  const hours = Math.floor(s / 3600);

  const minutes = Math.floor((s % 3600) / 60);

  const seconds = s % 60;



  if (hours > 0 || forceHours) {

    const hStr = String(hours);

    const mStr = String(minutes).padStart(2, '0');

    const sStr = String(seconds).padStart(2, '0');

    return `${hStr}:${mStr}:${sStr}`;

  }

  const mStr = String(minutes);

  const sStr = String(seconds).padStart(2, '0');

  return `${mStr}:${sStr}`;

}



function formatTrackDuration(track) {

  if (!track) return '0:00';

  const sec = parseDurationSec(track.duration, track.durationFormatted);

  return formatTime(sec);

}



function escapeHtml(str) {

  if (!str) return '';

  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

}



function cleanViewCount(str) {

  if (!str || typeof str !== 'string') return '';

  return str.replace(/lượt xem|lượt nghe|views?|watching/gi, '').trim();

}



function getShortSource(source) {

  if (!source) return '';

  const s = source.toLowerCase();

  if (s.includes('spot')) return 'SP';

  if (s.includes('sound')) return 'SC';

  if (s.includes('you')) return 'YT';

  return s.substring(0, 2).toUpperCase();

}



// XU LI SAO CHEP VA CHIA SE LIEN KET BAI HAT
async function SaoChepVaoBoNhoTam(vanBan) {

  if (vanBan === null || vanBan === undefined) return false;

  const chuoiCanChep = String(vanBan);

  if (!chuoiCanChep) return false;



  if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {

    try {

      await navigator.clipboard.writeText(chuoiCanChep);

      return true;

    } catch (err) {

      console.warn('Loi navigator.clipboard.writeText, thu dung fallback:', err);

    }

  }



  try {

    const theTam = document.createElement('textarea');

    theTam.value = chuoiCanChep;

    theTam.setAttribute('readonly', '');

    theTam.style.position = 'fixed';

    theTam.style.top = '0';

    theTam.style.left = '0';

    theTam.style.width = '2em';

    theTam.style.height = '2em';

    theTam.style.padding = '0';

    theTam.style.border = 'none';

    theTam.style.outline = 'none';

    theTam.style.boxShadow = 'none';

    theTam.style.background = 'transparent';

    theTam.style.opacity = '0.01';

    theTam.style.zIndex = '-9999';

    document.body.appendChild(theTam);

    theTam.focus();

    theTam.select();

    theTam.setSelectionRange(0, chuoiCanChep.length);

    const thanhCong = document.execCommand('copy');

    document.body.removeChild(theTam);

    if (thanhCong) return true;

  } catch (err) {

    console.warn('Loi document.execCommand copy:', err);

  }



  return false;

}



function copyToClipboard(text) {

  return SaoChepVaoBoNhoTam(text);

}



function LayLienKetChiaSe(baiHat) {

  if (!baiHat) return '';

  const nguon = (baiHat.source || '').toLowerCase();

  const duongDan = (baiHat.url || '').trim();



  if (duongDan.startsWith('http://') || duongDan.startsWith('https://')) {

    return duongDan;

  }



  if (nguon === 'youtube') {

    const maYt = baiHat.id ? String(baiHat.id).replace(/^yt_/, '') : '';

    return maYt ? `https://www.youtube.com/watch?v=${maYt}` : duongDan;

  }



  if (nguon === 'spotify') {

    const maSp = baiHat.id ? String(baiHat.id).replace(/^sp_/, '') : '';

    return maSp ? `https://open.spotify.com/track/${maSp}` : duongDan;

  }



  if (nguon === 'soundcloud') {

    return duongDan || (baiHat.id ? `https://soundcloud.com/${baiHat.id}` : '');

  }



  return duongDan || '';

}



function getPlatformShareUrl(track) {

  return LayLienKetChiaSe(track);

}



// XU LI TOI UU HOA VA LUU TRU ANH NEN BAI HAT TRONG INDEXEDDB
function optimizeCoverImage(fileOrDataUrl) {

  return new Promise((resolve) => {

    if (!fileOrDataUrl) { resolve(''); return; }



    // If file is under 5MB, read directly as data URL to preserve 100% original quality and aspect ratio

    if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {

      if (fileOrDataUrl.size <= 5 * 1024 * 1024) {

        const reader = new FileReader();

        reader.onload = (e) => resolve(e.target.result || '');

        reader.onerror = () => resolve('');

        reader.readAsDataURL(fileOrDataUrl);

        return;

      }

    }



    if (typeof fileOrDataUrl === 'string') {

      if (fileOrDataUrl.startsWith('data:image/') && fileOrDataUrl.length <= 5 * 1024 * 1024) {

        resolve(fileOrDataUrl);

        return;

      }

    }



    const img = new Image();

    img.crossOrigin = 'anonymous';

    img.onload = () => {

      try {

        const maxDim = 800;

        let w = img.naturalWidth || img.width;

        let h = img.naturalHeight || img.height;

        if (w > maxDim || h > maxDim) {

          if (w > h) {

            h = Math.round((h * maxDim) / w);

            w = maxDim;

          } else {

            w = Math.round((w * maxDim) / h);

            h = maxDim;

          }

        }

        const canvas = document.createElement('canvas');

        canvas.width = w;

        canvas.height = h;

        const ctx = canvas.getContext('2d');

        if (!ctx) { resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : ''); return; }

        ctx.imageSmoothingEnabled = true;

        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, 0, 0, w, h);

        const optimized = canvas.toDataURL('image/jpeg', 0.92);

        resolve(optimized);

      } catch (e) {

        resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');

      }

    };

    img.onerror = () => resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');



    if (typeof fileOrDataUrl === 'string') {

      img.src = fileOrDataUrl;

    } else if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {

      const reader = new FileReader();

      reader.onload = (e) => { img.src = e.target.result; };

      reader.onerror = () => resolve('');

      reader.readAsDataURL(fileOrDataUrl);

    } else {

      resolve('');

    }

  });

}



let coSoDuLieuAnhNen = null;
const boNhoAnhNen = new Map();
let daTaiAnhNenTuTauri = false;

async function KhoiTaoBoNhoAnhNen() {
  if (daTaiAnhNenTuTauri) return;
  try {
    const data = await api.getCustomBackgrounds();
    if (data && typeof data === 'object') {
      for (const [k, v] of Object.entries(data)) {
        boNhoAnhNen.set(k, v);
      }
    }
    daTaiAnhNenTuTauri = true;
  } catch (err) {
    console.warn('Loi tai anh nen tu file:', err);
  }
}

async function LuuCaiDatAnhNenBaiHat(khoaBaiHat, caiDat) {
  try {
    boNhoAnhNen.set(khoaBaiHat, caiDat);
    const obj = {};
    for (const [k, v] of boNhoAnhNen.entries()) {
      obj[k] = v;
    }
    await api.saveCustomBackgrounds(obj);
    return true;
  } catch (err) {
    console.warn('Loi luu anh nen:', err);
    return false;
  }
}

async function LayCaiDatAnhNenBaiHat(khoaBaiHat) {
  if (!daTaiAnhNenTuTauri) {
    await KhoiTaoBoNhoAnhNen();
  }
  return boNhoAnhNen.get(khoaBaiHat) || null;
}

async function XoaCaiDatAnhNenBaiHat(khoaBaiHat) {
  try {
    boNhoAnhNen.delete(khoaBaiHat);
    const obj = {};
    for (const [k, v] of boNhoAnhNen.entries()) {
      obj[k] = v;
    }
    await api.saveCustomBackgrounds(obj);
    return true;
  } catch (err) {
    return false;
  }
}



function ToiUuHoaAnhNen(tepHoacUrl) {

  return new Promise((resolve) => {

    if (!tepHoacUrl) { resolve(''); return; }



    function XuLiAnh(imgSrc) {

      const img = new Image();

      img.onload = () => {

        try {

          const maxW = 1920;

          const maxH = 1080;

          let w = img.naturalWidth || img.width;

          let h = img.naturalHeight || img.height;



          if (w > maxW || h > maxH) {

            const tiLe = Math.min(maxW / w, maxH / h);

            w = Math.round(w * tiLe);

            h = Math.round(h * tiLe);

          }



          const canvas = document.createElement('canvas');

          canvas.width = w;

          canvas.height = h;

          const ctx = canvas.getContext('2d');

          if (!ctx) { resolve(imgSrc); return; }

          ctx.imageSmoothingEnabled = true;

          ctx.imageSmoothingQuality = 'high';

          ctx.drawImage(img, 0, 0, w, h);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.84);

          resolve(dataUrl);

        } catch (err) {

          resolve(imgSrc);

        }

      };

      img.onerror = () => resolve(imgSrc);

      img.src = imgSrc;

    }



    if (tepHoacUrl instanceof Blob || tepHoacUrl instanceof File) {

      const reader = new FileReader();

      reader.onload = (e) => XuLiAnh(e.target.result);

      reader.onerror = () => resolve('');

      reader.readAsDataURL(tepHoacUrl);

    } else if (typeof tepHoacUrl === 'string') {

      XuLiAnh(tepHoacUrl);

    } else {

      resolve('');

    }

  });

}



// XU LI TRICH XUAT ANH BIA VA SO SANH TRUNG BAI HAT
function resolveCoverUrl(track, size = 300) {

  if (!track) return '';

  if (track.customCoverBase64 && typeof track.customCoverBase64 === 'string') {

    const cc = track.customCoverBase64.trim();

    if (cc.startsWith('data:image/') || cc.startsWith('http://') || cc.startsWith('https://') || cc.startsWith('blob:')) {

      return cc;

    }

  }

  if (track.cover && typeof track.cover === 'string') {

    const c = track.cover.trim();

    if (c.startsWith('data:image/') || c.startsWith('http://') || c.startsWith('https://') || c.startsWith('blob:') || c.startsWith('local-cover://')) {

      return c;

    }

  }

  if (track.discordCoverUrl && typeof track.discordCoverUrl === 'string') {

    const d = track.discordCoverUrl.trim();

    if (d.startsWith('http://') || d.startsWith('https://')) return d;

  }

  if (track.originalCover && typeof track.originalCover === 'string') {

    const o = track.originalCover.trim();

    if (o.startsWith('data:image/') || o.startsWith('http://') || o.startsWith('https://') || o.startsWith('blob:')) return o;

  }

  return '';

}



function SoSanhTrungBaiHat(idA, srcA, idB, srcB) {

  if (idA === undefined || idA === null || idB === undefined || idB === null) return false;

  const sA = String(srcA ?? '').trim().toLowerCase();

  const sB = String(srcB ?? '').trim().toLowerCase();

  if (sA && sB && sA !== sB) return false;

  const strA = String(idA).trim();

  const strB = String(idB).trim();

  if (!strA || !strB) return false;

  if (strA === strB) return true;

  const rawA = strA.replace(/^(sc_|sp_|yt_)/i, '');

  const rawB = strB.replace(/^(sc_|sp_|yt_)/i, '');

  return rawA === rawB;

}



// XU LI KHOI TAO TOAN BO UNG DUNG CHINH
function initApp() {



  const oriErr = console.error;

  console.error = function(...args) {

    if (window.__TAURI_INVOKE__) {

      window.__TAURI_INVOKE__("plugin:fs|write_text_file", { path: "C:/Users/nguyenthevi/Downloads/1/done_10_3/err.log", contents: args.join(' ') });

    }

    oriErr.apply(console, args);

  };



  // Remove and suppress any native OS/browser tooltips completely

  try {

    document.querySelectorAll('[title]').forEach(el => el.removeAttribute('title'));



    document.addEventListener('mouseover', (e) => {

      let el = e.target;

      while (el && el !== document) {

        if (el.hasAttribute && el.hasAttribute('title')) {

          el.removeAttribute('title');

        }

        el = el.parentElement;

      }

    }, true);



    new MutationObserver((mutations) => {

      for (const m of mutations) {

        if (m.type === 'attributes' && m.attributeName === 'title' && m.target?.removeAttribute) {

          m.target.removeAttribute('title');

        } else if (m.type === 'childList') {

          for (const node of m.addedNodes) {

            if (node.nodeType === 1) {

              if (node.hasAttribute('title')) node.removeAttribute('title');

              node.querySelectorAll?.('[title]').forEach(el => el.removeAttribute('title'));

            }

          }

        }

      }

    }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['title'] });

  } catch (e) {}



  function getInvoke() {

    return window.__TAURI__?.core?.invoke 

        || window.__TAURI__?.invoke 

        || (window.api && window.api.invoke);

  }



  const api = {

    searchAll: async (query) => {

      const inv = getInvoke();

      if (inv) return inv('search_all', { query });

      if (window.api?.searchAll) return window.api.searchAll(query);

      return [];

    },

    searchSource: async (source, query) => {

      const inv = getInvoke();

      if (inv) return inv('search_source', { source, query });

      if (window.api?.searchSource) return window.api.searchSource(source, query);

      return [];

    },

    getStreamUrl: async (track) => {

      const inv = getInvoke();

      if (inv) {

        const safeTrack = {

          ...track,

          duration: Math.round(Number(track.duration) || 0)

        };

        return inv('get_stream_url', { track: safeTrack });

      }

      if (window.api?.getStreamUrl) return window.api.getStreamUrl(track);

      throw new Error('API không khả dụng');

    },

    getLibrary: async () => {

      const inv = getInvoke();

      if (inv) return inv('get_library');

      if (window.api?.getLibrary) return window.api.getLibrary();

      return [];

    },

    saveTrack: async (track) => {

      const inv = getInvoke();

      if (inv) {

        const safeTrack = {

          id: String(track.id ?? ''),

          source: String(track.source ?? ''),

          title: String(track.title || 'Unknown Title'),

          artist: String(track.artist || 'Unknown Artist'),

          album: track.album ? String(track.album) : null,

          duration: Math.round(Number(track.duration) || 0),

          durationFormatted: track.durationFormatted ? String(track.durationFormatted) : null,

          cover: String(track.cover || ''),

          url: String(track.url || ''),

          views: (typeof track.views === 'number' && !isNaN(track.views) && track.views >= 0) ? Math.round(track.views) : null,

          viewsFormatted: track.viewsFormatted ? String(track.viewsFormatted) : null,

          uploadedAt: track.uploadedAt ? String(track.uploadedAt) : null,

          originalTitle: track.originalTitle ? String(track.originalTitle) : null,

          originalArtist: track.originalArtist ? String(track.originalArtist) : null,

          originalCover: track.originalCover ? String(track.originalCover) : null,

        };

        return inv('save_track', { track: safeTrack });

      }

      if (window.api?.saveTrack) return window.api.saveTrack(track);

      return track;

    },

    editTrack: async (trackId, source, metadata) => {

      const inv = getInvoke();

      const coverVal = metadata.cover || metadata.customCoverBase64 || null;

      if (inv) {

        return inv('edit_track', {

          trackId: String(trackId ?? ''),

          source: String(source ?? ''),

          title: metadata.title || null,

          artist: metadata.artist || null,

          cover: coverVal,

          colorWaveA: metadata.colorWaveA || null,

          colorWaveB: metadata.colorWaveB || null,

          colorWaveC: metadata.colorWaveC || null,

          colorWaveD: metadata.colorWaveD || null,

          reset: metadata.reset || false

        });

      }

      if (window.api?.editTrack) return window.api.editTrack(trackId, source, metadata);

      throw new Error('API không khả dụng');

    },

    deleteTrack: async (trackId, source) => {

      const inv = getInvoke();

      if (inv) return inv('delete_track', { trackId: String(trackId ?? ''), source: String(source ?? '') });

      if (window.api?.deleteTrack) return window.api.deleteTrack(trackId, source);

      return true;

    },

    getPlaylists: async () => {

      const inv = getInvoke();

      if (inv) return inv('get_playlists');

      return [];

    },

    createPlaylist: async (name, description = null) => {

      const inv = getInvoke();

      if (inv) return inv('create_playlist', { name, description });

      return null;

    },

    updatePlaylist: async (id, name = null, description = null, cover = null) => {

      const inv = getInvoke();

      if (inv) return inv('update_playlist', { id, name, description, cover });

      return null;

    },

    deletePlaylist: async (id) => {

      const inv = getInvoke();

      if (inv) return inv('delete_playlist', { id });

      return true;

    },

    addToPlaylist: async (playlistId, track) => {

      const inv = getInvoke();

      if (inv) {

        const safeTrack = {

          ...track,

          duration: Math.round(Number(track.duration) || 0)

        };

        return inv('add_to_playlist', { playlistId, track: safeTrack });

      }

      return null;

    },

    removeFromPlaylist: async (playlistId, trackId, source) => {

      const inv = getInvoke();

      if (inv) return inv('remove_from_playlist', { playlistId, trackId, source });

      return null;

    },

    reorderPlaylistTracks: async (playlistId, tracks) => {

      const inv = getInvoke();

      if (inv) {

        const safeTracks = (tracks || []).map(t => ({

          ...t,

          duration: Math.round(Number(t.duration) || 0)

        }));

        return inv('reorder_playlist_tracks', { playlistId, tracks: safeTracks });

      }

      return null;

    },

    getConfig: async () => {

      const inv = getInvoke();

      if (inv) return inv('get_config');

      if (window.api?.getConfig) return window.api.getConfig();

      return {};

    },

    saveConfig: async (config) => {

      const inv = getInvoke();

      if (inv) return inv('save_config', { config });

      if (window.api?.saveConfig) return window.api.saveConfig(config);

      return config;

    },

    getPlaybackState: async () => {

      const inv = getInvoke();

      if (inv) return inv('get_playback_state');

      return null;

    },

    savePlaybackState: async (playbackState) => {
      const inv = getInvoke();
      if (inv) return inv('save_playback_state', { playbackState });
      return playbackState;
    },
    getHistory: async () => {
      const inv = getInvoke();
      if (inv) return inv('get_history');
      return [];
    },
    saveHistory: async (items) => {
      const inv = getInvoke();
      if (inv) return inv('save_history', { items });
      return items;
    },
    getContinueListening: async () => {
      const inv = getInvoke();
      if (inv) return inv('get_continue_listening');
      return [];
    },
    saveContinueListening: async (items) => {
      const inv = getInvoke();
      if (inv) return inv('save_continue_listening', { items });
      return items;
    },
    getCustomBackgrounds: async () => {
      const inv = getInvoke();
      if (inv) return inv('get_custom_backgrounds');
      return {};
    },
    saveCustomBackgrounds: async (data) => {
      const inv = getInvoke();
      if (inv) return inv('save_custom_backgrounds', { data });
      return data;
    },
    getAvailableGifs: async () => {
      const inv = getInvoke();
      if (inv) return inv('get_available_gifs');
      return ['Gif/duck.gif', 'Gif/gojo.gif', 'Gif/iloveyou.gif', 'Gif/lonely.gif', 'Gif/teddy.gif', 'Gif/usagyuuun.gif'];
    },
    getHomeCache: async () => {
      const inv = getInvoke();
      if (inv) return inv('get_home_cache');
      return {};
    },
    saveHomeCache: async (data) => {
      const inv = getInvoke();
      if (inv) return inv('save_home_cache', { data });
      return data;
    },

    selectImageFile: async () => {

      if (window.api?.selectImageFile) return window.api.selectImageFile();

      return null;

    },

    updateDiscordActivity: (track, currentTime, isPlaying) => {

      const inv = getInvoke();

      const distinctAlbum = (track.album && track.album.trim() && track.album.trim() !== track.title.trim())

        ? track.album.trim()

        : null;

      if (inv) {

        let coverToSend = null;

        const saved = libraryTracks.find(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

        const isValidDiscordUrl = (u) => u && typeof u === 'string' && u.startsWith('http') && !u.includes('kn3fi8') && !u.includes('sxcu.net');

        const resolvedDiscordUrl = isValidDiscordUrl(track.discordCoverUrl)

          ? track.discordCoverUrl

          : isValidDiscordUrl(saved?.discordCoverUrl)

            ? saved.discordCoverUrl

            : null;



        if (resolvedDiscordUrl) {

          coverToSend = resolvedDiscordUrl.trim();

        } else if (track.cover && typeof track.cover === 'string' && track.cover.trim()) {

          coverToSend = track.cover.trim();

        } else if (saved?.cover && typeof saved.cover === 'string' && saved.cover.trim()) {

          coverToSend = saved.cover.trim();

        } else if (track.originalCover && typeof track.originalCover === 'string' && track.originalCover.trim()) {

          coverToSend = track.originalCover.trim();

        }



        return inv('update_discord_activity', {

          title: track.title,

          artist: track.artist,

          coverUrl: coverToSend,

          currentTime: Math.round(Number(currentTime) || 0),

          duration: Math.round(Number(track.duration) || 0),

          isPlaying,

          album: distinctAlbum,

          trackId: track.id,

          source: track.source

        });

      }

      if (window.api?.updateDiscordActivity) return window.api.updateDiscordActivity(track, currentTime, isPlaying);

    },

    clearDiscordActivity: () => {

      const inv = getInvoke();

      if (inv) return inv('clear_discord_activity');

      if (window.api?.clearDiscordActivity) return window.api.clearDiscordActivity();

    },

    minimizeWindow: () => {

      const inv = getInvoke();

      if (inv) return inv('minimize_window');

      if (window.api?.minimizeWindow) return window.api.minimizeWindow();

    },

    toggleMaximizeWindow: () => {

      const inv = getInvoke();

      if (inv) return inv('toggle_maximize_window');

      if (window.api?.maximizeWindow) return window.api.maximizeWindow();

    },

    isWindowMaximized: () => {

      const inv = getInvoke();

      if (inv) return inv('is_window_maximized');

      return Promise.resolve(false);

    },

    closeWindow: () => {

      const inv = getInvoke();

      if (inv) return inv('close_window');

      if (window.api?.closeWindow) return window.api.closeWindow();

    },

    toggleFullscreen: () => {

      const inv = getInvoke();

      if (inv) return inv('toggle_fullscreen');

      return Promise.resolve(false);

    },

    setFullscreen: (fullscreen) => {

      const inv = getInvoke();

      if (inv) return inv('set_fullscreen', { fullscreen });

      return Promise.resolve(fullscreen);

    },

    saveImageToDisk: (imageUrl, defaultName) => {

      const inv = getInvoke();

      if (inv) return inv('save_image_to_disk', { imageUrl, defaultName });

      return Promise.reject(new Error('Tauri not available'));

    }

  };



  // DOM Elements

  let audio = document.getElementById('audio-engine');

  let secondaryAudio = document.getElementById('audio-engine-secondary');

  const mainContent = document.querySelector('.main-content');

  const topHeader = document.querySelector('.top-header');

  const navItems = document.querySelectorAll('.nav-item:not(.btn-create-playlist)');

  const viewHome = document.getElementById('view-home');

  const homeSectionContinue = document.getElementById('home-section-continue');

  const homeContinueGrid = document.getElementById('home-continue-grid');

  const homeHotGrid = document.getElementById('home-hot-grid');

  const homeForyouGrid = document.getElementById('home-foryou-grid');

  const homeHistoryGrid = document.getElementById('home-history-grid');

  const homeDiscoveryGrid = document.getElementById('home-discovery-grid');

  const btnRefreshHot = document.getElementById('btn-refresh-hot');

  const btnRefreshForyou = document.getElementById('btn-refresh-foryou');

  const btnClearHistory = document.getElementById('btn-clear-history');

  const btnRefreshDiscovery = document.getElementById('btn-refresh-discovery');

  const foryouSubtitle = document.getElementById('foryou-subtitle');

  const viewExplore = document.getElementById('view-explore');

  const viewLibrary = document.getElementById('view-library');

  const viewPlaylist = document.getElementById('view-playlist');

  const viewTrackDetail = document.getElementById('view-track-detail');

  const btnTrackPageBack = document.getElementById('btn-track-page-back');

  const nutThuGonTrangChiTiet = document.getElementById('btn-track-page-toggle-compact');

  const nutMoRongTrangChiTiet = document.getElementById('btn-track-page-expand');

  const trackPageAmbient = document.getElementById('track-page-ambient');

  const trackPageCustomBg = document.getElementById('track-page-custom-bg');

  const trackPageCustomDim = document.getElementById('track-page-custom-dim');

  const trackPageBadge = document.getElementById('track-page-badge');

  const trackPageArtworkWrap = document.getElementById('track-page-artwork-wrap');

  const trackPageCover = document.getElementById('track-page-cover');

  const trackPageVinylCarrier = document.getElementById('track-page-vinyl-carrier');

  const trackPageVinylDisc = document.getElementById('track-page-vinyl-disc');

  const trackPageVinylLabelImg = document.getElementById('track-page-vinyl-label-img');

  const trackPageBtnExpandCover = document.getElementById('track-page-btn-expand-cover');

  let henGioThuDiaThan = null;

  let dangGiuDiaThanNhoRa = false;

  const khungTieuDeBaiHat = document.getElementById('track-page-title-wrap');

  const hangTieuDeBaiHat = document.getElementById('track-page-title-track');

  const trackPageTitle = document.getElementById('track-page-title');

  const trackPageTitleDuplicate = document.getElementById('track-page-title-duplicate');

  const trackPageArtist = document.getElementById('track-page-artist');

  const trackPageTimeCurrent = document.getElementById('track-page-time-current');

  const trackPageTimeTotal = document.getElementById('track-page-time-total');

  const trackPageSeekSlider = document.getElementById('track-page-seek-slider');

  const trackPageProgressFill = document.getElementById('track-page-progress-fill');

  const nutTuyChonTrangChiTiet = document.getElementById('track-page-btn-more');

  const menuTuyChonTrangChiTiet = document.getElementById('track-page-more-menu');

  const nutThichMenuChiTiet = document.getElementById('track-page-menu-fav');

  const iconThichMenuChiTiet = document.getElementById('track-page-menu-fav-icon');

  const chuThichMenuChiTiet = document.getElementById('track-page-menu-fav-text');

  const nutThemPlaylistMenuChiTiet = document.getElementById('track-page-menu-add-playlist');

  const nutSuaMenuChiTiet = document.getElementById('track-page-menu-edit');

  const nutTaiMenuChiTiet = document.getElementById('track-page-menu-download');

  const nutSaoChepUrlChiTiet = document.getElementById('track-page-menu-copy-url');

  const nutSaoChepTenChiTiet = document.getElementById('track-page-menu-copy-title');

  const trackPageBtnFav = nutThichMenuChiTiet;

  const trackPageBtnShuffle = document.getElementById('track-page-btn-shuffle');

  const trackPageBtnPrev = document.getElementById('track-page-btn-prev');

  const trackPageBtnPlayPause = document.getElementById('track-page-btn-play-pause');

  const trackPagePlayIcon = document.getElementById('track-page-play-icon');

  const trackPageBtnNext = document.getElementById('track-page-btn-next');

  const trackPageBtnRepeat = document.getElementById('track-page-btn-repeat');

  const trackPageBtnMute = document.getElementById('track-page-btn-mute');

  const trackPageVolumeSlider = document.getElementById('track-page-volume-slider');

  const trackPageVolumeFill = document.getElementById('track-page-volume-fill');

  const libraryCountBadge = document.getElementById('library-count-badge');

  const libraryTotalTracks = document.getElementById('library-total-tracks');

  const searchInput = document.getElementById('search-input');

  const searchClearBtn = document.getElementById('search-clear-btn');

  const searchSubmitBtn = document.getElementById('search-submit-btn');

  const filterPills = document.querySelectorAll('.filter-pill');

  const searchLoader = document.getElementById('search-loader');

  const emptyState = document.getElementById('empty-state');

  const tracksContainer = document.getElementById('tracks-container');

  const libraryContainer = document.getElementById('library-container');

  const libraryEmpty = document.getElementById('library-empty');

  const resultsMeta = document.getElementById('results-meta');

  const resultsCount = document.getElementById('results-count');

  const exploreTitle = document.getElementById('explore-title');

  const exploreSubtitle = document.getElementById('explore-subtitle');

  const playerCover = document.getElementById('player-cover');

  const playerTitle = document.getElementById('player-title');

  const playerArtist = document.getElementById('player-artist');

  const playerBtnFav = document.getElementById('player-btn-fav');

  const playerBtnDownload = document.getElementById('player-btn-download');

  const playerLeft = document.querySelector('.player-left');

  const playerBtnEdit = document.getElementById('player-btn-edit');

  const playerBtnAddPlaylist = document.getElementById('player-btn-add-playlist');

  const playerBtnCopy = document.getElementById('player-btn-copy');

  const playerCopyMenu = document.getElementById('player-copy-menu');

  const btnCopyUrl = document.getElementById('btn-copy-url');

  const btnCopyTitle = document.getElementById('btn-copy-title');

  const playerBtnMore = document.getElementById('player-btn-more');

  const playerMoreMenu = document.getElementById('player-more-menu');

  const playerMenuFav = document.getElementById('player-menu-fav');

  const playerMenuFavIcon = document.getElementById('player-menu-fav-icon');

  const playerMenuFavText = document.getElementById('player-menu-fav-text');

  const playerMenuAddPlaylist = document.getElementById('player-menu-add-playlist');

  const playerMenuEdit = document.getElementById('player-menu-edit');

  const playerMenuDownload = document.getElementById('player-menu-download');

  const playerMenuCopyUrl = document.getElementById('player-menu-copy-url');

  const playerMenuCopyTitle = document.getElementById('player-menu-copy-title');



  const trackFloatingMenu = document.getElementById('track-floating-menu');

  const trackMenuFav = document.getElementById('track-menu-fav');

  const trackMenuFavIcon = document.getElementById('track-menu-fav-icon');

  const trackMenuFavText = document.getElementById('track-menu-fav-text');

  const trackMenuAddPlaylist = document.getElementById('track-menu-add-playlist');

  const trackMenuEdit = document.getElementById('track-menu-edit');

  const trackMenuCopyUrl = document.getElementById('track-menu-copy-url');

  const trackMenuCopyTitle = document.getElementById('track-menu-copy-title');

  const trackMenuDelete = document.getElementById('track-menu-delete');

  const titlebarNowPlaying = document.getElementById('titlebar-now-playing');

  const btnPlayPause = document.getElementById('btn-play-pause');

  const playIcon = document.getElementById('play-icon');

  const btnPrev = document.getElementById('btn-prev');

  const btnNext = document.getElementById('btn-next');

  const btnShuffle = document.getElementById('btn-shuffle');

  const btnRepeat = document.getElementById('btn-repeat');

  const seekSlider = document.getElementById('seek-slider');

  const progressFill = document.getElementById('progress-fill');

  const timeCurrent = document.getElementById('time-current');

  const timeTotal = document.getElementById('time-total');

  const btnMute = document.getElementById('btn-mute');

  const volumeSlider = document.getElementById('volume-slider');

  const volumeFill = document.getElementById('volume-fill');

  const visualizer = document.getElementById('audio-visualizer');

  const btnQueueToggle = document.getElementById('btn-queue-toggle');

  const btnQueueClose = document.getElementById('btn-queue-close');

  const queueDrawer = document.getElementById('queue-drawer');

  const queueList = document.getElementById('queue-list');

  const queueCountBadge = document.getElementById('queue-count-badge');

  const btnQueueClear = document.getElementById('btn-queue-clear');

  const editModal = document.getElementById('edit-modal');

  const btnModalClose = document.getElementById('btn-modal-close');

  const btnModalCancel = document.getElementById('btn-modal-cancel');

  const btnModalSave = document.getElementById('btn-modal-save');

  const btnModalReset = document.getElementById('btn-modal-reset');

  const btnChooseFile = document.getElementById('btn-choose-file');

  const modalFileInput = document.getElementById('modal-file-input');

  const modalCoverPreview = document.getElementById('modal-cover-preview');

  const modalCoverUrl = document.getElementById('modal-cover-url');

  const modalTrackTitle = document.getElementById('modal-track-title');

  const modalTrackArtist = document.getElementById('modal-track-artist');

  const modalTrackSource = document.getElementById('modal-track-source');

  const modalTrackDuration = document.getElementById('modal-track-duration');

  const btnModalChooseBg = document.getElementById('btn-modal-choose-bg');

  const modalBgFileInput = document.getElementById('modal-bg-file-input');

  const btnModalRemoveBg = document.getElementById('btn-modal-remove-bg');

  const modalBgPreview = document.getElementById('modal-bg-preview');

  const modalBgPlaceholder = document.getElementById('modal-bg-placeholder');

  const modalBgPreviewDim = document.getElementById('modal-bg-preview-dim');

  const sliderBgDarkness = document.getElementById('slider-bg-darkness');

  const sliderBgBlur = document.getElementById('slider-bg-blur');

  const sliderBgOpacity = document.getElementById('slider-bg-opacity');

  const labelBgDarkness = document.getElementById('label-bg-darkness');

  const labelBgBlur = document.getElementById('label-bg-blur');

  const labelBgOpacity = document.getElementById('label-bg-opacity');

  const toggleArtworkDrift = document.getElementById('toggle-artwork-drift');

  const toggleCornerC = document.getElementById('toggle-corner-c');

  const toggleWaveSwapEdit = document.getElementById('toggle-wave-swap-edit');

  const waveSwapToggleInput = document.getElementById('wave-swap-toggle-input');

  const waveSwapStatusDesc = document.getElementById('wave-swap-status-desc');

  const inputColorWaveA = document.getElementById('color-wave-a');

  const inputColorWaveB = document.getElementById('color-wave-b');

  const inputColorWaveC = document.getElementById('color-wave-c');

  const inputColorWaveD = document.getElementById('color-wave-d');

  const labelColorWaveA = document.getElementById('label-color-wave-a');

  const labelColorWaveB = document.getElementById('label-color-wave-b');

  const labelColorWaveC = document.getElementById('label-color-wave-c');

  const labelColorWaveD = document.getElementById('label-color-wave-d');

  const trackPageStickersLayer = document.getElementById('track-page-stickers-layer');
  const editStickersGrid = document.getElementById('edit-stickers-grid');
  const editStickersActiveContainer = document.getElementById('edit-stickers-active-container');
  const editStickersActiveList = document.getElementById('edit-stickers-active-list');
  const btnClearAllStickers = document.getElementById('btn-clear-all-stickers');

  const toastEl = document.getElementById('toast-notification');



  // Playlist Elements

  const btnSidebarCreatePlaylist = document.getElementById('btn-sidebar-create-playlist');

  const sidebarPlaylistsList = document.getElementById('sidebar-playlists-list');

  const playlistCoverArt = document.getElementById('playlist-cover-art');

  const btnPlaylistCoverView = document.getElementById('btn-playlist-cover-view') || document.getElementById('btn-change-playlist-cover');

  const playlistTitleDisplay = document.getElementById('playlist-title-display');

  const playlistTitleInput = document.getElementById('playlist-title-input');

  const playlistDescriptionDisplay = document.getElementById('playlist-description-display');

  const playlistMetaInfo = document.getElementById('playlist-meta-info');

  const btnPlayPlaylist = document.getElementById('btn-play-playlist');

  const btnEditPlaylistModalOpen = document.getElementById('btn-edit-playlist-modal-open');

  const btnDeleteCurrentPlaylist = document.getElementById('btn-delete-current-playlist');

  const playlistTracksContainer = document.getElementById('playlist-tracks-container');

  const playlistEmpty = document.getElementById('playlist-empty');



  // Lightbox Image Viewer Elements

  const imageViewerModal = document.getElementById('image-viewer-modal');

  const btnCloseImageViewer = document.getElementById('btn-close-image-viewer');

  const imageViewerBackdrop = document.getElementById('image-viewer-backdrop');

  const imageViewerContainer = document.getElementById('image-viewer-container');

  const imageViewerImg = document.getElementById('image-viewer-img');

  const imageViewerContextMenu = document.getElementById('image-viewer-context-menu');

  const btnImageSave = document.getElementById('btn-image-save');

  const btnImageCopy = document.getElementById('btn-image-copy');

  let currentViewerImageUrl = null;

  let currentViewerImageTitle = '';

  let isImageViewerZoomed = false;



  // Edit Playlist Modal Elements

  const editPlaylistModal = document.getElementById('edit-playlist-modal');

  const btnEditPlaylistModalClose = document.getElementById('btn-edit-playlist-modal-close');

  const btnEditPlaylistCancel = document.getElementById('btn-edit-playlist-cancel');

  const btnEditPlaylistSave = document.getElementById('btn-edit-playlist-save');

  const modalPlaylistCoverWrapper = document.getElementById('modal-playlist-cover-wrapper');

  const modalPlaylistCoverPreview = document.getElementById('modal-playlist-cover-preview');

  const modalPlaylistCoverPlaceholder = document.getElementById('modal-playlist-cover-placeholder');

  const modalPlaylistFileInput = document.getElementById('modal-playlist-file-input');

  const btnPlaylistChooseFile = document.getElementById('btn-playlist-choose-file');

  const btnPlaylistRemoveCover = document.getElementById('btn-playlist-remove-cover');

  const modalPlaylistName = document.getElementById('modal-playlist-name');

  const modalPlaylistDesc = document.getElementById('modal-playlist-desc');

  const modalPlaylistCoverUrl = document.getElementById('modal-playlist-cover-url');



  // Add To Playlist Modal Elements

  const addToPlaylistModal = document.getElementById('add-to-playlist-modal');



  // Confirm Delete Playlist Modal Elements

  const confirmDeletePlaylistModal = document.getElementById('confirm-delete-playlist-modal');

  const confirmDeletePlaylistDesc = document.getElementById('confirm-delete-playlist-desc');

  const btnConfirmDeleteCancel = document.getElementById('btn-confirm-delete-cancel');

  const btnConfirmDeleteOk = document.getElementById('btn-confirm-delete-ok');

  let pendingDeletePlaylistId = null;

  const btnAddPlaylistModalClose = document.getElementById('btn-add-playlist-modal-close');

  const btnAddPlaylistCancel = document.getElementById('btn-add-playlist-cancel');

  const btnAddPlaylistConfirm = document.getElementById('btn-add-playlist-confirm');

  const newPlaylistQuickInput = document.getElementById('new-playlist-quick-input');

  const btnCreatePlaylistQuick = document.getElementById('btn-create-playlist-quick');

  const modalPlaylistsList = document.getElementById('modal-playlists-list');



  // Layout Mode Switcher Elements

  const btnLayoutCompact = document.getElementById('btn-layout-compact');

  const btnLayoutGrid = document.getElementById('btn-layout-grid');

  const btnLibraryLayoutCompact = document.getElementById('btn-library-layout-compact');

  const btnLibraryLayoutGrid = document.getElementById('btn-library-layout-grid');

  const btnHomeLayoutCompact = document.getElementById('btn-home-layout-compact');

  const btnHomeLayoutGrid = document.getElementById('btn-home-layout-grid');



  // A-B Segment Loop Context Elements

  const progressBarWrapper = document.querySelector('.progress-bar-wrapper');

  const abLoopPopup = document.getElementById('ab-loop-popup');

  const abTimeInput = document.getElementById('ab-time-input');

  const btnAbSetPoint = document.getElementById('btn-ab-set-point');

  const abSetPointText = document.getElementById('ab-set-point-text');

  const btnAbClear = document.getElementById('btn-ab-clear');

  const btnAbPopupClose = document.getElementById('btn-ab-popup-close');

  const abPopupInfo = document.getElementById('ab-popup-info');

  const abMarkerStart = document.getElementById('ab-marker-start');

  const abMarkerEnd = document.getElementById('ab-marker-end');

  const abSegmentHighlight = document.getElementById('ab-segment-highlight');



  // Settings & Theme elements

  const btnOpenSettings = document.getElementById('btn-open-settings');

  const settingsModal = document.getElementById('settings-modal');

  const btnSettingsClose = document.getElementById('btn-settings-close');

  const btnSettingsDone = document.getElementById('btn-settings-done');

  const themeToggleInput = document.getElementById('theme-toggle-input');

  const themeStatusDesc = document.getElementById('theme-status-desc');

  const badgeToggleInput = document.getElementById('badge-toggle-input');

  const sourceBadgeStatusDesc = document.getElementById('source-badge-status-desc');



  // Crossfade DOM elements

  const crossfadeToggleInput = document.getElementById('crossfade-toggle-input');

  const crossfadeStatusDesc = document.getElementById('crossfade-status-desc');

  const crossfadeDiagramWrapper = document.getElementById('crossfade-diagram-wrapper');

  const crossfadeDisplaySeconds = document.getElementById('crossfade-display-seconds');

  const crossfadeOverlapSlider = document.getElementById('crossfade-overlap-slider');

  const crossfadeDurASlider = document.getElementById('crossfade-dur-a-slider');

  const crossfadeDurBSlider = document.getElementById('crossfade-dur-b-slider');

  const crossfadeOverlapTag = document.getElementById('crossfade-overlap-tag');

  const crossfadeDurATag = document.getElementById('crossfade-dur-a-tag');

  const crossfadeDurBTag = document.getElementById('crossfade-dur-b-tag');

  

  

  const sliderCurveA = document.getElementById('slider-curve-a');

  const sliderCurveB = document.getElementById('slider-curve-b');

  const btnCrossfadeTest = document.getElementById('btn-crossfade-test');

  const btnCrossfadeTestText = document.getElementById('btn-crossfade-test-text');

  const crossfadeStage = document.getElementById('crossfade-stage');

  const trackARect = document.getElementById('track-a-rect');

  const trackBRect = document.getElementById('track-b-rect');

  const crossfadeOverlapZone = document.getElementById('crossfade-overlap-zone');

  const overlapResizerPill = document.getElementById('overlap-resizer-pill');

  const resizerTimeText = document.getElementById('resizer-time-text');

  const handleCurveA = document.getElementById('handle-curve-a');

  const handleCurveB = document.getElementById('handle-curve-b');

  const pathCurveA = document.getElementById('path-curve-a');

  const pathCurveB = document.getElementById('path-curve-b');

  const areaCurveA = document.getElementById('area-curve-a');

  const areaCurveB = document.getElementById('area-curve-b');

  const lineAPre = document.getElementById('line-a-pre');

  const lineBPost = document.getElementById('line-b-post');

  const crossfadeGapZone = document.getElementById('crossfade-gap-zone');

  const gapResizerPill = document.getElementById('gap-resizer-pill');

  const gapTimeText = document.getElementById('gap-time-text');

  const laneA = document.getElementById('lane-a');

  const laneB = document.getElementById('lane-b');

  const crossfadePresetChips = document.querySelectorAll('.crossfade-preset-chip');



  const accentColorInput = document.getElementById('accent-color-input');

  const customColorPreview = document.getElementById('custom-color-preview');

  const customColorBtn = document.querySelector('.custom-color-picker-btn');

  const accentStatusDesc = document.getElementById('accent-status-desc');

  const colorDots = document.querySelectorAll('.color-dot');



  // Sidebar elements

  const appSidebar = document.getElementById('app-sidebar');

  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');

  const topNavGroup = document.getElementById('sidebar-top-nav-group');

  const btnCollapseTopNav = document.getElementById('btn-collapse-top-nav');

  const collapseTopNavIcon = document.getElementById('collapse-top-nav-icon');



  // Disable spellcheck globally on all input/textarea elements

  document.querySelectorAll('input, textarea').forEach(el => {

    el.spellcheck = false;

    el.setAttribute('spellcheck', 'false');

    el.setAttribute('autocorrect', 'off');

    el.setAttribute('autocapitalize', 'off');

  });



  // App State

  let currentTrack = null;

  let queue = [];

  let queueIndex = -1;

  let isPlaying = false;

  let isShuffle = false;

  let repeatMode = 'off';

  let libraryTracks = [];

  function TimBaiHatTrongThuVien(track) {

    if (!track) return null;

    return libraryTracks.find(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source)) || null;

  }

  let userPlaylists = [];

  let currentPlaylistId = null;

  let currentPlayingPlaylistId = null;

  let pendingAddToPlaylistTrack = null;

  let searchResults = [];

  let activeFilter = 'all';

  let activeView = 'home';

  let isTrackPageOpen = false;

  let previousView = 'home';

  let isTrackPageSeeking = false;

  let listeningHistory = [];
  let continueListeningList = [];



  let homeHotTracks = [];

  let homeForyouTracks = [];

  let homeDiscoveryTracks = [];

  let lastContinueUpdate = 0;

  let editingTrackData = null;

  let daChonDatLaiMacDinh = false;

  let selectedCoverBase64 = null;

  let isSeeking = false;

  let currentVolume = 0.8;

  let currentTheme = 'dark';

  let currentAccentColor = '#1db954';

  let isSidebarExpanded = false;

  let lastDiscordSync = 0;

  let activePlayRequestId = 0;

  let abSegmentsMap = {};

  let restoredPlaybackTime = null;

  let showSourceBadges = true;

  let crossfadeEnabled = false;

  let crossfadeOverlap = -3.0;

  let crossfadeDuration = 3.0;

  let crossfadeDurA = 3.0;

  let crossfadeDurB = 3.0;

  let crossfadeCurveA = 0.0;

  let crossfadeCurveB = 0.0;

  let isCrossfading = false;

  let crossfadeCancelToken = 0;

  let gapTimeoutId = null;

  let crossfadeTimer = null;

  let previewAudioA = null;

  let previewAudioB = null;

  let isTestingCrossfade = false;

  let testAnimFrame = null;



  let toastTimer = null;

  // XU LI HIEN THI THONG BAO TOAST NHO TREN MAN HINH
  function showToast(contentHtml, type = 'info', duration = 1800) {

    if (!toastEl) {

      console.log(`[Toast] ${type}: ${contentHtml}`);

      return;

    }

    if (toastTimer) clearTimeout(toastTimer);

    toastEl.innerHTML = contentHtml;

    toastEl.className = `toast-notification show ${type}`;

    toastTimer = setTimeout(() => {

      toastEl.className = 'toast-notification';

    }, duration);

  }



  // --- Debounced State Persistence to data/config/ ---
  let configSaveTimeout = null;

  // XU LI PHIM TAT DIEU KHIEN VA BANG CAI DAT PHIM (KEYBINDINGS)
  const CAC_PHIM_TAT_MAC_DINH = {
    playPause: 'Space',
    toggleFavorite: 'KeyL',
    cycleRepeat: 'KeyR',
    nextTrack: 'KeyN',
    prevTrack: 'KeyP',
    seekForward5s: 'ArrowRight',
    seekBackward5s: 'ArrowLeft'
  };
  let danhSachPhimTat = { ...CAC_PHIM_TAT_MAC_DINH };
  let hanhDongDangDoiPhim = null; // Tên action đang ở trạng thái gán phím mới

  // XU LI LUU TRU CAU HINH NGUOI DUNG VA TRANG THAI PHAT NHAC
  function persistUserConfig() {
    if (configSaveTimeout) clearTimeout(configSaveTimeout);
    configSaveTimeout = setTimeout(() => {
      const cfg = {
        discordRpcEnabled: true,
        discordClientId: '',
        volume: currentVolume,
        repeatMode: repeatMode,
        shuffle: isShuffle,
        theme: currentTheme,
        accentColor: currentAccentColor,
        sidebarExpanded: isSidebarExpanded,
        showSourceBadges: showSourceBadges,
        crossfadeEnabled: crossfadeEnabled,
        crossfadeOverlap: crossfadeOverlap,
        crossfadeDurA: crossfadeDurA,
        crossfadeDurB: crossfadeDurB,
        crossfadeCurveA: crossfadeCurveA,
        crossfadeCurveB: crossfadeCurveB,
        sidebarTopnavCollapsed: isTopNavCollapsed,
        trackPageCompact: cheDoThuGonTrangPhat,
        layoutMode: currentLayoutMode,
        continuousWaveSwap: daoViTriSongToanCuc,
        shortcuts: danhSachPhimTat
      };
      api.saveConfig(cfg).catch((e) => console.warn('Save config error:', e));
    }, 400);
  }

  let playbackSaveTimeout = null;
  function persistPlaybackState() {
    if (playbackSaveTimeout) clearTimeout(playbackSaveTimeout);
    playbackSaveTimeout = setTimeout(() => {
      const pb = {
        currentTrack: currentTrack,
        currentTime: audio ? audio.currentTime : 0,
        isPlaying: isPlaying,
        queue: queue,
        queueIndex: queueIndex,
        currentPlayingPlaylistId: currentPlayingPlaylistId,
        abSegments: abSegmentsMap
      };
      api.savePlaybackState(pb).catch((e) => console.warn('Save playback error:', e));
    }, 600);
  }

  // --- Sidebar Logic ---
  // XU LI THANH BEN SIDEBAR VA DIEU HUONG TOPNAV
  function setSidebarExpanded(expanded) {
    isSidebarExpanded = !!expanded;
    if (!appSidebar) return;
    if (isSidebarExpanded) {
      appSidebar.classList.add('expanded');
    } else {
      appSidebar.classList.remove('expanded');
    }
  }

  btnToggleSidebar?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isNowExpanded = !appSidebar?.classList.contains('expanded');
    setSidebarExpanded(isNowExpanded);
    persistUserConfig();
  });

  // --- Sidebar Top Nav Collapse Logic ---
  const CHEVRON_UP_SVG = '<polyline points="18 15 12 9 6 15"/>';
  const CHEVRON_DOWN_SVG = '<polyline points="6 9 12 15 18 9"/>';

  let isTopNavCollapsed = false;

  function applyTopNavCollapseState(collapsed) {
    isTopNavCollapsed = !!collapsed;
    if (topNavGroup) {
      topNavGroup.classList.toggle('collapsed', isTopNavCollapsed);
    }
    if (collapseTopNavIcon) {
      collapseTopNavIcon.innerHTML = isTopNavCollapsed ? CHEVRON_DOWN_SVG : CHEVRON_UP_SVG;
    }
    persistUserConfig();
  }

  btnCollapseTopNav?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    applyTopNavCollapseState(!isTopNavCollapsed);

  });



  applyTopNavCollapseState(isTopNavCollapsed);



  // --- Theme & Accent Color Logic ---

  // XU LI GIAO DIEN CHU DE VA MAU SAC DIEM NHAN (THEME & ACCENT)
  function applyAccentColor(hexColor, name = null) {

    if (!hexColor) return;

    const cleanHex = hexColor.trim();

    currentAccentColor = cleanHex;

    document.documentElement.style.setProperty('--accent', cleanHex, 'important');

    document.documentElement.style.setProperty('--accent-sp', cleanHex, 'important');

    if (document.body) {

      document.body.style.setProperty('--accent', cleanHex, 'important');

      document.body.style.setProperty('--accent-sp', cleanHex, 'important');

    }



    if (accentColorInput) accentColorInput.value = cleanHex;

    if (customColorPreview) customColorPreview.style.backgroundColor = cleanHex;



    const labelName = name || COLOR_NAMES[cleanHex.toLowerCase()] || `Tùy chỉnh (${cleanHex.toUpperCase()})`;

    if (accentStatusDesc) accentStatusDesc.textContent = labelName;



    let matchedPreset = false;

    colorDots.forEach(dot => {

      const dotColor = dot.getAttribute('data-color')?.toLowerCase();

      if (dotColor === cleanHex.toLowerCase()) {

        dot.classList.add('active');

        matchedPreset = true;

      } else {

        dot.classList.remove('active');

      }

    });



    if (customColorBtn) {

      customColorBtn.classList.toggle('active', !matchedPreset);

    }

  }



  function applyTheme(theme) {

    currentTheme = theme === 'light' ? 'light' : 'dark';

    if (currentTheme === 'light') {

      document.documentElement.setAttribute('data-theme', 'light');

      document.body.classList.add('light-theme');

      if (themeToggleInput) themeToggleInput.checked = true;

      if (themeStatusDesc) themeStatusDesc.textContent = 'Giao diện Sáng';

    } else {

      document.documentElement.setAttribute('data-theme', 'dark');

      document.body.classList.remove('light-theme');

      if (themeToggleInput) themeToggleInput.checked = false;

      if (themeStatusDesc) themeStatusDesc.textContent = 'Giao diện Tối (Mặc định)';

    }

    applyAccentColor(currentAccentColor);

  }



  colorDots.forEach(dot => {

    dot.addEventListener('click', (e) => {

      e.preventDefault();

      const color = dot.getAttribute('data-color');

      const name = dot.getAttribute('data-name');

      applyAccentColor(color, name);

      persistUserConfig();

      showToast(`${ICONS.success} <span>Đã chọn màu: <b>${name}</b></span>`, 'success', 1500);

    });

  });



  accentColorInput?.addEventListener('input', (e) => {

    const color = e.target.value;

    applyAccentColor(color);

  });



  accentColorInput?.addEventListener('change', (e) => {

    const color = e.target.value;

    applyAccentColor(color);

    persistUserConfig();

    showToast(`${ICONS.success} <span>Đã áp dụng màu tùy chỉnh: <b>${color.toUpperCase()}</b></span>`, 'success', 1500);

  });



  themeToggleInput?.addEventListener('change', (e) => {

    const isLight = e.target.checked;

    applyTheme(isLight ? 'light' : 'dark');

    persistUserConfig();

    showToast(`<span>Đã đổi sang giao diện ${isLight ? 'Sáng' : 'Tối'}</span>`, 'success', 1800);

  });



  function applySourceBadges(show) {

    showSourceBadges = show !== false;

    if (showSourceBadges) {

      document.body.classList.remove('hide-source-badges');

      if (badgeToggleInput) badgeToggleInput.checked = true;

      if (sourceBadgeStatusDesc) sourceBadgeStatusDesc.textContent = 'Đang hiển thị nhãn (Spotify, YouTube, SoundCloud)';

    } else {

      document.body.classList.add('hide-source-badges');

      if (badgeToggleInput) badgeToggleInput.checked = false;

      if (sourceBadgeStatusDesc) sourceBadgeStatusDesc.textContent = 'Đã tắt hiển thị tất cả nhãn nguồn bài hát';

    }

  }



  badgeToggleInput?.addEventListener('change', (e) => {

    const show = e.target.checked;

    applySourceBadges(show);

    persistUserConfig();

    showToast(`<span>${show ? 'Đã bật' : 'Đã tắt'} hiển thị nhãn nguồn bài hát</span>`, 'success', 1800);

  });



  // --- Crossfade Transition Engine & Interactive Diagram ---

  // Đường cong Cosine S-curve chuẩn DSP: Đạo hàm triệt tiêu tại 2 đầu (dV/dt = 0 ở cả t=0 và t=1),

  // TUYỆT ĐỐI KHÔNG BỊ GÃY KHÚC ở bất kỳ đoạn nào, tiếp xúc mượt mà với sàn 0% và trần 100%.

  // XU LI BO CHUYEN BAI MUOT MA (CROSSFADE TRANSITION & INTERACTIVE DIAGRAM)
  function calculateCrossfadeVolume(t, type, curvature) {

    const normT = Math.max(0, Math.min(1, t));

    const k = Math.max(-1, Math.min(1, curvature || 0));



    if (type === 'out') {

      // Fade Out: Giảm dần từ 1.0 về 0.0

      const base = (1 + Math.cos(Math.PI * normT)) / 2;

      if (Math.abs(k) < 0.01) return base;

      if (k > 0) {

        // Giảm nhanh hơn ban đầu, lượn êm về 0 (đạo hàm tại t=1 luôn bằng 0, không gãy)

        return Math.pow(base, 1 + 2.2 * k);

      } else {

        // Giữ âm lượng cao lâu hơn rồi mới hạ êm về 0 (đạo hàm tại t=0 luôn bằng 0, không gãy)

        const absK = Math.abs(k);

        return 1 - Math.pow(1 - base, 1 + 2.2 * absK);

      }

    } else {

      // Fade In: Tăng dần từ 0.0 lên 1.0

      const base = (1 - Math.cos(Math.PI * normT)) / 2;

      if (Math.abs(k) < 0.01) return base;

      if (k > 0) {

        // Tăng chậm ban đầu, bứt phá về cuối rồi tiếp cận êm 100%

        return Math.pow(base, 1 + 2.2 * k);

      } else {

        // Tăng nhanh ban đầu, bo tròn êm ái khi đạt đỉnh 100%

        const absK = Math.abs(k);

        return 1 - Math.pow(1 - base, 1 + 2.2 * absK);

      }

    }

  }



  function updateCrossfadeDiagram() {

    if (!crossfadeStage) return;



    // 1. Đồng bộ giá trị sliders

    if (crossfadeOverlapSlider) crossfadeOverlapSlider.value = crossfadeOverlap;

    if (crossfadeDurASlider) crossfadeDurASlider.value = crossfadeDurA;

    if (crossfadeDurBSlider) crossfadeDurBSlider.value = crossfadeDurB;

    if (sliderCurveA) sliderCurveA.value = crossfadeCurveA;

    if (sliderCurveB) sliderCurveB.value = crossfadeCurveB;



    // 2. Định dạng chữ hiển thị thời điểm chuyển tiếp

    let timingText = '';

    if (crossfadeOverlap < 0) {

      timingText = `Đan xen ${Math.abs(crossfadeOverlap).toFixed(1)}s`;

    } else if (crossfadeOverlap === 0) {

      timingText = 'Liền mạch 0.0s';

    } else {

      timingText = `Khoảng nghỉ ${crossfadeOverlap.toFixed(1)}s`;

    }



    if (crossfadeOverlapTag) crossfadeOverlapTag.textContent = timingText;

    if (crossfadeDisplaySeconds) crossfadeDisplaySeconds.textContent = timingText;

    if (resizerTimeText) resizerTimeText.textContent = timingText;

    if (gapTimeText) gapTimeText.textContent = timingText;

    if (crossfadeDurATag) {

      crossfadeDurATag.textContent = crossfadeDurA <= 0 ? '0.0s (Thẳng 100%)' : `${crossfadeDurA.toFixed(1)}s`;

    }

    if (crossfadeDurBTag) {

      crossfadeDurBTag.textContent = crossfadeDurB <= 0 ? '0.0s (Thẳng 100%)' : `${crossfadeDurB.toFixed(1)}s`;

    }



    if (crossfadePresetChips) {

      crossfadePresetChips.forEach(chip => {

        const p = chip.getAttribute('data-preset');

        if (crossfadeDurA <= 0 && crossfadeDurB <= 0) {

          chip.classList.toggle('active', p === 'straight');

        } else if (p === 'straight') {

          chip.classList.remove('active');

        }

      });

    }



    // 3. Tọa độ hóa biểu đồ theo dòng thời gian chuẩn (Timeline-based stage coordinate)

    const stageWidth = laneA ? (laneA.clientWidth || 480) : (crossfadeStage.clientWidth - 24 || 480);

    const W = Math.max(340, stageWidth);



    // Mốc thời gian: Bài A kết thúc ở t = 0

    // Bài A hiển thị đoạn phát trước fade + đoạn fade-out (crossfadeDurA)

    const durShowA = Math.max(3.0, crossfadeDurA + 2.0);

    const durShowB = Math.max(3.0, crossfadeDurB + 2.0);

    const tStartA = Math.min(-durShowA, crossfadeOverlap - 2.0);

    const tEndA = 0;

    // Bài B bắt đầu ở t = crossfadeOverlap (nếu > 0: cách sau một khoảng nghỉ; nếu < 0: đan xen trước khi A hết)

    const tStartB = crossfadeOverlap;

    const tEndB = Math.max(crossfadeOverlap + durShowB, 2.0);



    const tMin = Math.min(tStartA, tStartB) - 0.5;

    const tMax = Math.max(tEndA, tEndB) + 0.5;

    const tSpan = tMax - tMin;



    function timeToPx(t) {

      return ((t - tMin) / tSpan) * W;

    }



    const pxStartA = timeToPx(tStartA);

    const pxEndA = timeToPx(tEndA);

    const widthA = Math.max(90, pxEndA - pxStartA);



    const pxStartB = timeToPx(tStartB);

    const pxEndB = timeToPx(tEndB);

    const widthB = Math.max(90, pxEndB - pxStartB);



    // Định vị thẻ Bài A (ở làn trên)

    if (trackARect) {

      trackARect.style.left = `${pxStartA.toFixed(1)}px`;

      trackARect.style.width = `${widthA.toFixed(1)}px`;

    }



    // Định vị thẻ Bài B (ở làn dưới)

    if (trackBRect) {

      trackBRect.style.left = `${pxStartB.toFixed(1)}px`;

      trackBRect.style.width = `${widthB.toFixed(1)}px`;

    }



    // 4. Vùng hiển thị trực quan: Khoảng nghỉ vs Đan xen

    if (crossfadeOverlap > 0) {

      // KHOẢNG NGHỈ: 2 thanh bài tách biệt rõ ràng, không chạm nhau, có khoảng trống ở giữa!

      if (crossfadeGapZone) {

        crossfadeGapZone.style.display = 'flex';

        crossfadeGapZone.style.left = `${pxEndA.toFixed(1)}px`;

        crossfadeGapZone.style.width = `${Math.max(24, pxStartB - pxEndA).toFixed(1)}px`;

      }

      if (crossfadeOverlapZone) {

        crossfadeOverlapZone.style.display = 'none';

      }

    } else if (crossfadeOverlap < 0) {

      // ĐAN XEN: Bài B bắt đầu trước khi Bài A kết thúc, 2 thanh bài gối lên nhau trên 2 làn

      if (crossfadeGapZone) {

        crossfadeGapZone.style.display = 'none';

      }

      if (crossfadeOverlapZone) {

        crossfadeOverlapZone.style.display = 'flex';

        crossfadeOverlapZone.style.left = `${pxStartB.toFixed(1)}px`;

        crossfadeOverlapZone.style.width = `${Math.max(24, pxEndA - pxStartB).toFixed(1)}px`;

      }

    } else {

      // LIỀN MẠCH: Ranh giới chạm nhau tại 0.0s

      if (crossfadeGapZone) {

        crossfadeGapZone.style.display = 'none';

      }

      if (crossfadeOverlapZone) {

        crossfadeOverlapZone.style.display = 'flex';

        crossfadeOverlapZone.style.left = `${(pxEndA - 15).toFixed(1)}px`;

        crossfadeOverlapZone.style.width = '30px';

      }

    }



    // 5. Vẽ đồ thị sóng âm Bài A (Fade Out hoặc Đường thẳng 100% âm lượng)

    const Y_TOP = 8;

    const Y_BASE = 50;

    const H_VOL = 42;



    if (pathCurveA && areaCurveA && lineAPre) {

      const svgA = document.getElementById('svg-track-a');

      if (svgA) svgA.setAttribute('viewBox', `0 0 ${widthA.toFixed(1)} 56`);



      const statusA = document.querySelector('.track-a-rect .track-rect-status');



      if (crossfadeDurA <= 0) {

        // ĐƯỜNG THẲNG HOÀN TOÀN: Giữ nguyên 100% âm lượng, không giảm

        lineAPre.setAttribute('x1', '0');

        lineAPre.setAttribute('y1', String(Y_TOP));

        lineAPre.setAttribute('x2', widthA.toFixed(1));

        lineAPre.setAttribute('y2', String(Y_TOP));



        pathCurveA.setAttribute('d', `M 0 ${Y_TOP} L ${widthA.toFixed(1)} ${Y_TOP}`);

        areaCurveA.setAttribute('d', `M 0 ${Y_BASE} L 0 ${Y_TOP} L ${widthA.toFixed(1)} ${Y_TOP} L ${widthA.toFixed(1)} ${Y_BASE} Z`);



        if (statusA) statusA.textContent = 'Giữ nguyên 100%';



        if (handleCurveA) {

          handleCurveA.style.left = `${(widthA - 14).toFixed(1)}px`;

          handleCurveA.style.top = `${Y_TOP}px`;

          handleCurveA.title = 'Đang là đường thẳng (100% âm lượng). Kéo xuống hoặc sang trái để tạo đoạn giảm âm lượng';

        }

      } else {

        if (statusA) statusA.textContent = 'Giảm âm lượng';



        const pxFadeA = timeToPx(0) - timeToPx(-crossfadeDurA);

        const wFadeA = Math.min(widthA - 20, Math.max(24, pxFadeA));

        const xFadeAStart = widthA - wFadeA;



        lineAPre.setAttribute('x1', '0');

        lineAPre.setAttribute('y1', String(Y_TOP));

        lineAPre.setAttribute('x2', xFadeAStart.toFixed(1));

        lineAPre.setAttribute('y2', String(Y_TOP));



        let dA = `M ${xFadeAStart.toFixed(1)} ${Y_TOP}`;

        const steps = 40;

        for (let i = 1; i <= steps; i++) {

          const t = i / steps;

          const x = xFadeAStart + t * wFadeA;

          const vol = calculateCrossfadeVolume(t, 'out', crossfadeCurveA);

          const y = Y_BASE - vol * H_VOL;

          dA += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;

        }

        pathCurveA.setAttribute('d', dA);

        areaCurveA.setAttribute('d', `M 0 ${Y_BASE} L 0 ${Y_TOP} L ${xFadeAStart.toFixed(1)} ${Y_TOP} ` + dA.substring(dA.indexOf('L')) + ` L ${widthA.toFixed(1)} ${Y_BASE} Z`);



        if (handleCurveA) {

          const midVol = calculateCrossfadeVolume(0.5, 'out', crossfadeCurveA);

          const midX = xFadeAStart + 0.5 * wFadeA;

          const midY = Y_BASE - midVol * H_VOL;

          handleCurveA.style.left = `${midX.toFixed(1)}px`;

          handleCurveA.style.top = `${midY.toFixed(1)}px`;

          handleCurveA.title = 'Kéo lên đỉnh để tạo đường thẳng (100% âm lượng) hoặc kéo chỉnh độ dốc';

        }

      }

    }



    // 6. Vẽ đồ thị sóng âm Bài B (Fade In hoặc Đường thẳng 100% âm lượng)

    if (pathCurveB && areaCurveB && lineBPost) {

      const svgB = document.getElementById('svg-track-b');

      if (svgB) svgB.setAttribute('viewBox', `0 0 ${widthB.toFixed(1)} 56`);



      const statusB = document.querySelector('.track-b-rect .track-rect-status');



      if (crossfadeDurB <= 0) {

        // ĐƯỜNG THẲNG HOÀN TOÀN: Giữ nguyên 100% âm lượng, không tăng dần

        lineBPost.setAttribute('x1', '0');

        lineBPost.setAttribute('y1', String(Y_TOP));

        lineBPost.setAttribute('x2', widthB.toFixed(1));

        lineBPost.setAttribute('y2', String(Y_TOP));



        pathCurveB.setAttribute('d', `M 0 ${Y_TOP} L ${widthB.toFixed(1)} ${Y_TOP}`);

        areaCurveB.setAttribute('d', `M 0 ${Y_BASE} L 0 ${Y_TOP} L ${widthB.toFixed(1)} ${Y_TOP} L ${widthB.toFixed(1)} ${Y_BASE} Z`);



        if (statusB) statusB.textContent = 'Giữ nguyên 100%';



        if (handleCurveB) {

          handleCurveB.style.left = '14px';

          handleCurveB.style.top = `${Y_TOP}px`;

          handleCurveB.title = 'Đang là đường thẳng (100% âm lượng). Kéo xuống hoặc sang phải để tạo đoạn tăng âm lượng';

        }

      } else {

        if (statusB) statusB.textContent = 'Tăng âm lượng';



        const pxFadeB = timeToPx(tStartB + crossfadeDurB) - timeToPx(tStartB);

        const wFadeB = Math.min(widthB - 20, Math.max(24, pxFadeB));



        let dB = `M 0 ${Y_BASE}`;

        const steps = 40;

        for (let i = 1; i <= steps; i++) {

          const t = i / steps;

          const x = t * wFadeB;

          const vol = calculateCrossfadeVolume(t, 'in', crossfadeCurveB);

          const y = Y_BASE - vol * H_VOL;

          dB += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;

        }

        dB += ` L ${widthB.toFixed(1)} ${Y_TOP}`;

        pathCurveB.setAttribute('d', dB);

        areaCurveB.setAttribute('d', `${dB} L ${widthB.toFixed(1)} ${Y_BASE} L 0 ${Y_BASE} Z`);



        lineBPost.setAttribute('x1', wFadeB.toFixed(1));

        lineBPost.setAttribute('y1', String(Y_TOP));

        lineBPost.setAttribute('x2', widthB.toFixed(1));

        lineBPost.setAttribute('y2', String(Y_TOP));



        if (handleCurveB) {

          const midVol = calculateCrossfadeVolume(0.5, 'in', crossfadeCurveB);

          const midX = 0.5 * wFadeB;

          const midY = Y_BASE - midVol * H_VOL;

          handleCurveB.style.left = `${midX.toFixed(1)}px`;

          handleCurveB.style.top = `${midY.toFixed(1)}px`;

          handleCurveB.title = 'Kéo lên đỉnh để tạo đường thẳng (100% âm lượng) hoặc kéo chỉnh độ dốc';

        }

      }

    }

  }



  function applyCrossfadeSettings() {

    if (crossfadeToggleInput) crossfadeToggleInput.checked = crossfadeEnabled;

    if (crossfadeStatusDesc) {

      let descText = 'Tắt (kết thúc giây cuối cùng của bài trước mới chuyển bài)';

      if (crossfadeEnabled) {

        const descA = crossfadeDurA <= 0 ? 'giữ nguyên 100%' : `giảm ${crossfadeDurA.toFixed(1)}s`;

        const descB = crossfadeDurB <= 0 ? 'giữ nguyên 100%' : `tăng ${crossfadeDurB.toFixed(1)}s`;

        if (crossfadeOverlap < 0) {

          descText = `Bật (đan xen ${Math.abs(crossfadeOverlap).toFixed(1)}s, bài trước ${descA}, bài sau ${descB})`;

        } else if (crossfadeOverlap === 0) {

          descText = `Bật (liền mạch 0.0s, bài trước ${descA}, bài sau ${descB})`;

        } else {

          descText = `Bật (khoảng nghỉ ${crossfadeOverlap.toFixed(1)}s, bài trước ${descA}, bài sau ${descB})`;

        }

      }

      crossfadeStatusDesc.textContent = descText;

    }

    if (crossfadeDiagramWrapper) {

      crossfadeDiagramWrapper.style.display = crossfadeEnabled ? 'block' : 'none';

    }

    if (crossfadeEnabled) {

      requestAnimationFrame(() => updateCrossfadeDiagram());

    }

  }



  // --- Kéo thả trực tiếp trên 2 Thẻ Bài Hát A và B để điều chỉnh khoảng cách (Đan xen / Khoảng nghỉ) ---

  // XU LI KEO THA THE BAI HAT TRONG BIEU DO CROSSFADE
  function setupTrackCardDragging() {

    function getTimelineScale() {

      const stageWidth = laneA ? (laneA.clientWidth || 480) : (crossfadeStage.clientWidth - 24 || 480);

      const W = Math.max(340, stageWidth);

      const durShowA = Math.max(3.0, crossfadeDurA + 2.0);

      const durShowB = Math.max(3.0, crossfadeDurB + 2.0);

      const tStartA = Math.min(-durShowA, crossfadeOverlap - 2.0);

      const tEndA = 0;

      const tStartB = crossfadeOverlap;

      const tEndB = Math.max(crossfadeOverlap + durShowB, 2.0);

      const tMin = Math.min(tStartA, tStartB) - 0.5;

      const tMax = Math.max(tEndA, tEndB) + 0.5;

      const tSpan = tMax - tMin;

      return { W, tSpan, pxPerSec: W / tSpan };

    }



    // Kéo Bài B sang trái/phải: kéo sang phải -> tăng khoảng nghỉ; kéo sang trái -> tăng đan xen

    if (trackBRect) {

      trackBRect.addEventListener('pointerdown', (e) => {

        if (e.target.closest('#handle-curve-b')) return; // Không can thiệp nếu đang kéo chấm chỉnh độ dốc

        e.preventDefault();

        e.stopPropagation();

        try { trackBRect.setPointerCapture(e.pointerId); } catch(err) {}



        const startX = e.clientX;

        const startOverlap = crossfadeOverlap;

        const { pxPerSec } = getTimelineScale();

        trackBRect.classList.add('is-dragging');



        const onPointerMove = (me) => {

          const dx = me.clientX - startX;

          const dt = dx / pxPerSec;

          const newOverlap = Math.max(-10.0, Math.min(10.0, Math.round((startOverlap + dt) * 2) / 2));

          if (newOverlap !== crossfadeOverlap) {

            crossfadeOverlap = newOverlap;

            updateCrossfadeDiagram();

            applyCrossfadeSettings();

          }

        };



        const onPointerUp = (ue) => {

          trackBRect.classList.remove('is-dragging');

          trackBRect.removeEventListener('pointermove', onPointerMove);

          trackBRect.removeEventListener('pointerup', onPointerUp);

          trackBRect.removeEventListener('pointercancel', onPointerUp);

          try { trackBRect.releasePointerCapture(ue.pointerId); } catch(err) {}

          persistUserConfig();

        };



        trackBRect.addEventListener('pointermove', onPointerMove);

        trackBRect.addEventListener('pointerup', onPointerUp);

        trackBRect.addEventListener('pointercancel', onPointerUp);

      });

    }



    // Kéo Bài A sang trái/phải: kéo sang trái -> tăng khoảng nghỉ; kéo sang phải -> tăng đan xen

    if (trackARect) {

      trackARect.addEventListener('pointerdown', (e) => {

        if (e.target.closest('#handle-curve-a')) return;

        e.preventDefault();

        e.stopPropagation();

        try { trackARect.setPointerCapture(e.pointerId); } catch(err) {}



        const startX = e.clientX;

        const startOverlap = crossfadeOverlap;

        const { pxPerSec } = getTimelineScale();

        trackARect.classList.add('is-dragging');



        const onPointerMove = (me) => {

          const dx = me.clientX - startX;

          const dt = dx / pxPerSec;

          const newOverlap = Math.max(-10.0, Math.min(10.0, Math.round((startOverlap - dt) * 2) / 2));

          if (newOverlap !== crossfadeOverlap) {

            crossfadeOverlap = newOverlap;

            updateCrossfadeDiagram();

            applyCrossfadeSettings();

          }

        };



        const onPointerUp = (ue) => {

          trackARect.classList.remove('is-dragging');

          trackARect.removeEventListener('pointermove', onPointerMove);

          trackARect.removeEventListener('pointerup', onPointerUp);

          trackARect.removeEventListener('pointercancel', onPointerUp);

          try { trackARect.releasePointerCapture(ue.pointerId); } catch(err) {}

          persistUserConfig();

        };



        trackARect.addEventListener('pointermove', onPointerMove);

        trackARect.addEventListener('pointerup', onPointerUp);

        trackARect.addEventListener('pointercancel', onPointerUp);

      });

    }



    // Hỗ trợ kéo pill khoảng nghỉ hoặc pill đan xen nếu người dùng bấm vào

    const pills = [overlapResizerPill, gapResizerPill].filter(Boolean);

    pills.forEach(pill => {

      pill.addEventListener('pointerdown', (e) => {

        e.preventDefault();

        e.stopPropagation();

        try { pill.setPointerCapture(e.pointerId); } catch(err) {}



        const startX = e.clientX;

        const startOverlap = crossfadeOverlap;

        const { pxPerSec } = getTimelineScale();

        pill.classList.add('dragging');



        const onPointerMove = (me) => {

          const dx = me.clientX - startX;

          const dt = dx / pxPerSec;

          const newOverlap = Math.max(-10.0, Math.min(10.0, Math.round((startOverlap + dt) * 2) / 2));

          if (newOverlap !== crossfadeOverlap) {

            crossfadeOverlap = newOverlap;

            updateCrossfadeDiagram();

            applyCrossfadeSettings();

          }

        };



        const onPointerUp = (ue) => {

          pill.classList.remove('dragging');

          pill.removeEventListener('pointermove', onPointerMove);

          pill.removeEventListener('pointerup', onPointerUp);

          pill.removeEventListener('pointercancel', onPointerUp);

          try { pill.releasePointerCapture(ue.pointerId); } catch(err) {}

          persistUserConfig();

        };



        pill.addEventListener('pointermove', onPointerMove);

        pill.addEventListener('pointerup', onPointerUp);

        pill.addEventListener('pointercancel', onPointerUp);

      });

    });

  }

  setupTrackCardDragging();



  // Kéo handle chỉnh độ dốc / đường thẳng Bài A (Fade Out / 100% âm lượng)

  if (handleCurveA) {

    handleCurveA.addEventListener('pointerdown', (e) => {

      e.preventDefault();

      e.stopPropagation();

      try { handleCurveA.setPointerCapture(e.pointerId); } catch(err) {}



      const startX = e.clientX;

      const startY = e.clientY;

      const startCurve = crossfadeCurveA;

      const startDurA = crossfadeDurA;

      handleCurveA.classList.add('dragging');



      const onPointerMove = (me) => {

        const dx = me.clientX - startX;

        const dy = me.clientY - startY;



        if (startDurA <= 0) {

          // Đang là đường thẳng 100%: Kéo xuống (dy > 8) hoặc kéo sang trái (dx < -10) -> tạo đoạn giảm âm lượng

          if (dy > 8 || dx < -10) {

            const pullDist = Math.max(dy / 8, -dx / 15);

            crossfadeDurA = Math.max(0.5, Math.min(10.0, Math.round(pullDist * 2) / 2));

            crossfadeCurveA = 0;

            updateCrossfadeDiagram();

            applyCrossfadeSettings();

          }

        } else {

          // Đang có đường cong:

          // Nếu kéo lên sát đỉnh (dy < -16) hoặc kéo sang phải về đuôi bài (dx > 30): Biến thành ĐƯỜNG THẲNG 100%!

          if (dy < -16 || dx > 30) {

            if (crossfadeDurA !== 0) {

              crossfadeDurA = 0;

              updateCrossfadeDiagram();

              applyCrossfadeSettings();

            }

          } else {

            // Kéo ngang điều chỉnh độ dài thời gian giảm âm lượng

            if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 10) {

              const newDur = Math.max(0, Math.min(10.0, Math.round((startDurA - dx / 20) * 2) / 2));

              if (newDur !== crossfadeDurA) {

                crossfadeDurA = newDur;

                updateCrossfadeDiagram();

                applyCrossfadeSettings();

              }

            } else {

              // Kéo dọc điều chỉnh độ cong S-curve

              const newCurve = Math.max(-1.0, Math.min(1.0, Math.round((startCurve + dy / 25) * 20) / 20));

              if (newCurve !== crossfadeCurveA) {

                crossfadeCurveA = newCurve;

                updateCrossfadeDiagram();

              }

            }

          }

        }

      };



      const onPointerUp = (ue) => {

        handleCurveA.classList.remove('dragging');

        handleCurveA.removeEventListener('pointermove', onPointerMove);

        handleCurveA.removeEventListener('pointerup', onPointerUp);

        handleCurveA.removeEventListener('pointercancel', onPointerUp);

        try { handleCurveA.releasePointerCapture(ue.pointerId); } catch(err) {}

        persistUserConfig();

      };



      handleCurveA.addEventListener('pointermove', onPointerMove);

      handleCurveA.addEventListener('pointerup', onPointerUp);

      handleCurveA.addEventListener('pointercancel', onPointerUp);

    });



    handleCurveA.addEventListener('dblclick', (e) => {

      e.preventDefault();

      e.stopPropagation();

      crossfadeDurA = crossfadeDurA > 0 ? 0 : 3.0;

      updateCrossfadeDiagram();

      applyCrossfadeSettings();

      persistUserConfig();

    });

  }



  // Kéo handle chỉnh độ dốc / đường thẳng Bài B (Fade In / 100% âm lượng)

  if (handleCurveB) {

    handleCurveB.addEventListener('pointerdown', (e) => {

      e.preventDefault();

      e.stopPropagation();

      try { handleCurveB.setPointerCapture(e.pointerId); } catch(err) {}



      const startX = e.clientX;

      const startY = e.clientY;

      const startCurve = crossfadeCurveB;

      const startDurB = crossfadeDurB;

      handleCurveB.classList.add('dragging');



      const onPointerMove = (me) => {

        const dx = me.clientX - startX;

        const dy = me.clientY - startY;



        if (startDurB <= 0) {

          // Đang là đường thẳng 100%: Kéo xuống (dy > 8) hoặc kéo sang phải (dx > 10) -> tạo đoạn tăng âm lượng

          if (dy > 8 || dx > 10) {

            const pullDist = Math.max(dy / 8, dx / 15);

            crossfadeDurB = Math.max(0.5, Math.min(10.0, Math.round(pullDist * 2) / 2));

            crossfadeCurveB = 0;

            updateCrossfadeDiagram();

            applyCrossfadeSettings();

          }

        } else {

          // Đang có đường cong:

          // Nếu kéo lên sát đỉnh (dy < -16) hoặc kéo sang trái về đầu bài (dx < -30): Biến thành ĐƯỜNG THẲNG 100%!

          if (dy < -16 || dx < -30) {

            if (crossfadeDurB !== 0) {

              crossfadeDurB = 0;

              updateCrossfadeDiagram();

              applyCrossfadeSettings();

            }

          } else {

            // Kéo ngang điều chỉnh độ dài thời gian tăng âm lượng

            if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 10) {

              const newDur = Math.max(0, Math.min(10.0, Math.round((startDurB + dx / 20) * 2) / 2));

              if (newDur !== crossfadeDurB) {

                crossfadeDurB = newDur;

                updateCrossfadeDiagram();

                applyCrossfadeSettings();

              }

            } else {

              // Kéo dọc điều chỉnh độ cong S-curve

              const newCurve = Math.max(-1.0, Math.min(1.0, Math.round((startCurve - dy / 25) * 20) / 20));

              if (newCurve !== crossfadeCurveB) {

                crossfadeCurveB = newCurve;

                updateCrossfadeDiagram();

              }

            }

          }

        }

      };



      const onPointerUp = (ue) => {

        handleCurveB.classList.remove('dragging');

        handleCurveB.removeEventListener('pointermove', onPointerMove);

        handleCurveB.removeEventListener('pointerup', onPointerUp);

        handleCurveB.removeEventListener('pointercancel', onPointerUp);

        try { handleCurveB.releasePointerCapture(ue.pointerId); } catch(err) {}

        persistUserConfig();

      };



      handleCurveB.addEventListener('pointermove', onPointerMove);

      handleCurveB.addEventListener('pointerup', onPointerUp);

      handleCurveB.addEventListener('pointercancel', onPointerUp);

    });



    handleCurveB.addEventListener('dblclick', (e) => {

      e.preventDefault();

      e.stopPropagation();

      crossfadeDurB = crossfadeDurB > 0 ? 0 : 3.0;

      updateCrossfadeDiagram();

      applyCrossfadeSettings();

      persistUserConfig();

    });

  }



  crossfadeOverlapSlider?.addEventListener('input', (e) => {

    crossfadeOverlap = parseFloat(e.target.value);

    updateCrossfadeDiagram();

    applyCrossfadeSettings();

  });

  crossfadeOverlapSlider?.addEventListener('change', () => persistUserConfig());



  crossfadeDurASlider?.addEventListener('input', (e) => {

    crossfadeDurA = parseFloat(e.target.value);

    updateCrossfadeDiagram();

    applyCrossfadeSettings();

  });

  crossfadeDurASlider?.addEventListener('change', () => persistUserConfig());



  crossfadeDurBSlider?.addEventListener('input', (e) => {

    crossfadeDurB = parseFloat(e.target.value);

    updateCrossfadeDiagram();

    applyCrossfadeSettings();

  });

  crossfadeDurBSlider?.addEventListener('change', () => persistUserConfig());



  sliderCurveA?.addEventListener('input', (e) => {

    crossfadeCurveA = parseFloat(e.target.value);

    updateCrossfadeDiagram();

  });

  sliderCurveA?.addEventListener('change', () => persistUserConfig());



  sliderCurveB?.addEventListener('input', (e) => {

    crossfadeCurveB = parseFloat(e.target.value);

    updateCrossfadeDiagram();

  });

  sliderCurveB?.addEventListener('change', () => persistUserConfig());



  crossfadePresetChips?.forEach(chip => {

    chip.addEventListener('click', () => {

      crossfadePresetChips.forEach(c => c.classList.remove('active'));

      chip.classList.add('active');

      const preset = chip.getAttribute('data-preset');

      if (preset === 'straight') {

        crossfadeDurA = 0;

        crossfadeDurB = 0;

        crossfadeCurveA = 0;

        crossfadeCurveB = 0;

      } else if (preset === 'linear') {

        if (crossfadeDurA <= 0) crossfadeDurA = 3.0;

        if (crossfadeDurB <= 0) crossfadeDurB = 3.0;

        crossfadeCurveA = 0;

        crossfadeCurveB = 0;

      } else if (preset === 'smooth') {

        if (crossfadeDurA <= 0) crossfadeDurA = 3.0;

        if (crossfadeDurB <= 0) crossfadeDurB = 3.0;

        crossfadeCurveA = -0.5;

        crossfadeCurveB = -0.5;

      } else if (preset === 'quick') {

        if (crossfadeDurA <= 0) crossfadeDurA = 3.0;

        if (crossfadeDurB <= 0) crossfadeDurB = 3.0;

        crossfadeCurveA = 0.6;

        crossfadeCurveB = 0.6;

      }

      updateCrossfadeDiagram();

      applyCrossfadeSettings();

      persistUserConfig();

    });

  });



  crossfadeToggleInput?.addEventListener('change', (e) => {

    crossfadeEnabled = e.target.checked;

    applyCrossfadeSettings();

    persistUserConfig();

    showToast(`<span>${crossfadeEnabled ? 'Đã bật' : 'Đã tắt'} chuyển bài nối tiếp mượt mà</span>`, 'success', 1800);

  });



  // --- Nghe Thử Chuyển Tiếp Với 2 Bài Hát Remix Nổi Tiếng Hàng Triệu View Thực Tế ---

  // XU LI NGHE THU CHUYEN BAI CROSSFADE
  function stopCrossfadeTest() {

    isTestingCrossfade = false;

    if (testAnimFrame) {

      cancelAnimationFrame(testAnimFrame);

      testAnimFrame = null;

    }

    if (previewAudioA) {

      try {

        previewAudioA.pause();

        previewAudioA.currentTime = 0;

      } catch(e) {}

    }

    if (previewAudioB) {

      try {

        previewAudioB.pause();

        previewAudioB.currentTime = 0;

      } catch(e) {}

    }

    if (btnCrossfadeTestText) btnCrossfadeTestText.textContent = 'Nghe thử chuyển tiếp';

    const existingIndicator = document.getElementById('crossfade-test-indicator');

    if (existingIndicator) existingIndicator.remove();

  }



  function loadPreviewAudio(audioEl, src) {

    return new Promise((resolve) => {

      let isDone = false;

      const finish = () => {

        if (!isDone) {

          isDone = true;

          audioEl.removeEventListener('canplay', finish);

          audioEl.removeEventListener('error', finish);

          resolve();

        }

      };

      audioEl.addEventListener('canplay', finish);

      audioEl.addEventListener('error', finish);

      audioEl.src = src;

      audioEl.load();

      if (audioEl.readyState >= 2) {

        finish();

      } else {

        setTimeout(finish, 1200);

      }

    });

  }



  async function runCrossfadeTest() {

    if (isTestingCrossfade) {

      stopCrossfadeTest();

      return;

    }

    isTestingCrossfade = true;

    if (btnCrossfadeTestText) btnCrossfadeTestText.textContent = 'Đang phát thử nghiệm...';



    try {

      if (!previewAudioA) previewAudioA = new Audio();

      if (!previewAudioB) previewAudioB = new Audio();



      // Tạm dừng bài hát chính nếu đang phát

      if (audio && !audio.paused) {

        audio.pause();

      }



      // Hai bài hát remix triệu view được nhúng trực tiếp sẵn trong ứng dụng:

      // Bài A: NHƯ MỘT NGƯỜI DƯNG - YANG REMIX (2.4M view)

      // Bài B: Trả Cho Anh - TikTok Remix (1.6M view)

      const srcA = 'AmThanh/remix_demo_a.mp3';

      const srcB = 'AmThanh/remix_demo_b.mp3';



      await Promise.all([

        loadPreviewAudio(previewAudioA, srcA),

        loadPreviewAudio(previewAudioB, srcB)

      ]);



      // Thiết lập dòng thời gian chuyển tiếp mô phỏng:

      let tFadeAStart, tEndA, tStartB;



      if (crossfadeOverlap < 0) {

        // ĐAN XEN: Bài B bắt đầu sớm trước khi Bài A kết thúc |crossfadeOverlap| giây

        const tLeadBeforeB = 1.5; // Bài A phát một mình 1.5s trước khi Bài B vào

        tStartB = tLeadBeforeB;

        tEndA = tStartB + Math.abs(crossfadeOverlap); // Bài A kết thúc đúng sau khoảng đan xen

        tFadeAStart = Math.max(0, tEndA - (crossfadeDurA > 0 ? crossfadeDurA : 0));

      } else {

        // KHOẢNG NGHỈ HOẶC LIỀN MẠCH: Bài A kết thúc trước, sau đó nghỉ, rồi Bài B mới vào

        tFadeAStart = 1.5;

        tEndA = tFadeAStart + (crossfadeDurA > 0 ? crossfadeDurA : 2.0);

        tStartB = tEndA + crossfadeOverlap;

      }



      const tFadeBEnd = tStartB + crossfadeDurB;

      const totalPreviewSec = Math.max(tEndA + 2.0, tFadeBEnd + 2.0);



      // Chuẩn hóa điểm xuất phát:

      // - Bài A (bài trước): Phải kết thúc đúng tại tEndA (chạm nốt outro cuối cùng của bài).

      //   Do đó xuất phát tại (durationA - tEndA) để khi tEndA trôi qua, bài A chạm đúng điểm kết thúc tự nhiên!

      // - Bài B (bài sau): Bắt đầu từ 00:00 (intro mở đầu của bài) khi đến thời điểm tStartB.

      const durA = (previewAudioA.duration && !isNaN(previewAudioA.duration)) ? previewAudioA.duration : 25.0;

      const startOffsetA = Math.max(0, durA - tEndA);



      try {

        previewAudioA.currentTime = startOffsetA;

        previewAudioB.currentTime = 0;

      } catch(e) {}



      previewAudioA.volume = currentVolume;

      previewAudioB.volume = 0;



      const playPromiseA = previewAudioA.play();

      if (playPromiseA !== undefined) {

        await playPromiseA;

      }



      try {

        if (Math.abs(previewAudioA.currentTime - startOffsetA) > 0.8) {

          previewAudioA.currentTime = startOffsetA;

        }

      } catch(e) {}



      if (!isTestingCrossfade) {

        previewAudioA.pause();

        return;

      }



      if (btnCrossfadeTestText) btnCrossfadeTestText.textContent = 'Dừng thử nghiệm';



      let testIndicator = document.getElementById('crossfade-test-indicator');

      if (!testIndicator && crossfadeStage) {

        testIndicator = document.createElement('div');

        testIndicator.id = 'crossfade-test-indicator';

        testIndicator.className = 'crossfade-test-indicator';

        crossfadeStage.appendChild(testIndicator);

      }



      let hasStartedB = false;

      const testStartTime = performance.now();



      function stepPreview(now) {

        if (!isTestingCrossfade) return;

        const elapsedSec = (now - testStartTime) / 1000;



        // 1. Âm lượng Bài A: Giảm dần Fade Out hoặc Giữ nguyên 100% (Đường thẳng)

        let vA = 1.0;

        if (crossfadeDurA > 0) {

          if (elapsedSec < tFadeAStart) {

            vA = 1.0;

          } else if (elapsedSec <= tEndA) {

            const progA = (elapsedSec - tFadeAStart) / crossfadeDurA;

            vA = calculateCrossfadeVolume(progA, 'out', crossfadeCurveA);

          } else {

            vA = 0.0;

            if (!previewAudioA.paused) {

              try { previewAudioA.pause(); } catch(e) {}

            }

          }

        } else {

          // KHÔNG GIẢM ÂM LƯỢNG: Giữ nguyên 100% âm lượng tới hết tEndA

          if (elapsedSec <= tEndA) {

            vA = 1.0;

          } else {

            vA = 0.0;

            if (!previewAudioA.paused) {

              try { previewAudioA.pause(); } catch(e) {}

            }

          }

        }

        if (!previewAudioA.paused) {

          previewAudioA.volume = Math.max(0, Math.min(1, vA)) * currentVolume;

        }



        // 2. Âm lượng Bài B: Bắt đầu theo khoảng nghỉ hoặc đan xen, tăng dần Fade In hoặc Giữ nguyên 100% (Đường thẳng)

        let vB = 0.0;

        if (elapsedSec < tStartB) {

          vB = 0.0;

        } else {

          if (!hasStartedB) {

            hasStartedB = true;

            try { previewAudioB.currentTime = 0; } catch(e) {}

            previewAudioB.volume = (crossfadeDurB > 0 ? 0 : currentVolume);

            const playPromiseB = previewAudioB.play();

            if (playPromiseB !== undefined) {

              playPromiseB.catch(e => console.warn('Preview B play err:', e));

            }

          }

          if (crossfadeDurB > 0) {

            if (elapsedSec <= tFadeBEnd) {

              const progB = (elapsedSec - tStartB) / crossfadeDurB;

              vB = calculateCrossfadeVolume(progB, 'in', crossfadeCurveB);

            } else {

              vB = 1.0;

            }

          } else {

            // KHÔNG TĂNG ÂM LƯỢNG: Giữ nguyên 100% âm lượng ngay từ khi bắt đầu

            vB = 1.0;

          }

          if (!previewAudioB.paused) {

            previewAudioB.volume = Math.max(0, Math.min(1, vB)) * currentVolume;

          }

        }



        // 3. Di chuyển thanh chạy timeline chuẩn xác qua bài A, khoảng nghỉ/đan xen và bài B

        if (crossfadeStage && testIndicator) {

          const stageWidth = laneA ? (laneA.clientWidth || 480) : (crossfadeStage.clientWidth - 24 || 480);

          const W = Math.max(340, stageWidth);

          const durShowA = Math.max(3.0, crossfadeDurA + 2.0);

          const durShowB = Math.max(3.0, crossfadeDurB + 2.0);

          const tStartTimelineA = Math.min(-durShowA, crossfadeOverlap - 2.0);

          const tEndTimelineB = Math.max(crossfadeOverlap + durShowB, 2.0);

          const tMin = Math.min(tStartTimelineA, crossfadeOverlap) - 0.5;

          const tMax = Math.max(0, tEndTimelineB) + 0.5;

          const tSpan = tMax - tMin;



          const simTime = elapsedSec - tEndA;

          const pxX = ((simTime - tMin) / tSpan) * W + 12;

          testIndicator.style.left = `${pxX.toFixed(1)}px`;

        }



        if (elapsedSec < totalPreviewSec) {

          testAnimFrame = requestAnimationFrame(stepPreview);

        } else {

          stopCrossfadeTest();

        }

      }



      testAnimFrame = requestAnimationFrame(stepPreview);



    } catch(e) {

      console.error('Preview crossfade error:', e);

      showToast(`<span>Lỗi nghe thử chuyển tiếp: ${e.message}</span>`, 'error', 2500);

      stopCrossfadeTest();

    }

  }



  btnCrossfadeTest?.addEventListener('click', () => {

    runCrossfadeTest();

  });



  window.addEventListener('resize', () => {

    if (crossfadeEnabled && settingsModal && settingsModal.style.display !== 'none') {

      updateCrossfadeDiagram();

    }

  });



  // --- Titlebar controls & Drag protection ---

  const titlebarRight = document.querySelector('.titlebar-right');

  if (titlebarRight) {

    titlebarRight.addEventListener('mousedown', (e) => e.stopPropagation());

    titlebarRight.addEventListener('pointerdown', (e) => e.stopPropagation());

  }



  const btnMin = document.getElementById('btn-min');

  const btnMax = document.getElementById('btn-max');

  const btnClose = document.getElementById('btn-close');

  const maxIcon = document.getElementById('max-icon');



  // XU LI THANH TIEU DE VA DIEU KHIEN CUA SO UNG DUNG
  function updateMaxIcon(isMax) {

    if (!maxIcon || !btnMax) return;

    if (isMax) {

      maxIcon.innerHTML = `

        <path d="M4 2.5h5.5v5.5" stroke="currentColor" stroke-width="1.2" fill="none"/>

        <rect x="2" y="4" width="6" height="6" stroke="currentColor" stroke-width="1.2" fill="none"/>

      `;

    } else {

      maxIcon.innerHTML = `

        <rect x="2" y="2" width="8" height="8" stroke="currentColor" stroke-width="1.5" fill="none"/>

      `;

    }

  }



  btnMin?.addEventListener('click', (e) => {

    e.stopPropagation();

    e.preventDefault();

    api.minimizeWindow();

  });



  btnMax?.addEventListener('click', async (e) => {

    e.stopPropagation();

    e.preventDefault();

    try {

      const isMax = await api.toggleMaximizeWindow();

      updateMaxIcon(isMax);

    } catch (err) {

      console.warn('Toggle maximize error:', err);

    }

  });



  btnClose?.addEventListener('click', (e) => {

    e.stopPropagation();

    e.preventDefault();

    api.closeWindow();

  });



  document.querySelector('.titlebar-drag-area')?.addEventListener('dblclick', async (e) => {

    try {

      const isMax = await api.toggleMaximizeWindow();

      updateMaxIcon(isMax);

    } catch (err) {}

  });



  window.addEventListener('resize', async () => {

    try {

      const isMax = await api.isWindowMaximized();

      updateMaxIcon(isMax);

    } catch (err) {}

  });



  api.isWindowMaximized().then((isMax) => updateMaxIcon(isMax)).catch(() => {});



  // --- A-B Segment Loop Management ---

  // XU LI LAP DOAN A-B CHO TUNG BAI HAT
  function getTrackKey(track) {

    if (!track) return null;

    return `${track.source || 'track'}_${track.id || track.url || track.title}`;

  }



  function getCurrentAbSegment() {

    if (!currentTrack) return null;

    const key = getTrackKey(currentTrack);

    return abSegmentsMap[key] || null;

  }



  function updateAbMarkersUI() {

    if (!abMarkerStart || !abMarkerEnd || !abSegmentHighlight) return;

    if (!currentTrack) {

      abMarkerStart.style.display = 'none';

      abMarkerEnd.style.display = 'none';

      abSegmentHighlight.style.display = 'none';

      return;

    }



    const duration = (audio && audio.duration && isFinite(audio.duration) && audio.duration > 0)

      ? audio.duration

      : parseDurationSec(currentTrack?.duration, currentTrack?.durationFormatted);



    if (!duration || duration <= 0) {

      abMarkerStart.style.display = 'none';

      abMarkerEnd.style.display = 'none';

      abSegmentHighlight.style.display = 'none';

      return;

    }



    const seg = getCurrentAbSegment();

    if (!seg || seg.start == null) {

      abMarkerStart.style.display = 'none';

      abMarkerEnd.style.display = 'none';

      abSegmentHighlight.style.display = 'none';

      return;

    }



    const startPercent = Math.max(0, Math.min(100, (seg.start / duration) * 100));

    abMarkerStart.style.left = `${startPercent}%`;

    abMarkerStart.style.display = 'block';



    if (seg.end != null && seg.end > seg.start) {

      const endPercent = Math.max(0, Math.min(100, (seg.end / duration) * 100));

      abMarkerEnd.style.left = `${endPercent}%`;

      abMarkerEnd.style.display = 'block';



      abSegmentHighlight.style.left = `${startPercent}%`;

      abSegmentHighlight.style.width = `${Math.max(0, endPercent - startPercent)}%`;

      abSegmentHighlight.style.display = 'block';

    } else {

      abMarkerEnd.style.display = 'none';

      abSegmentHighlight.style.display = 'none';

    }



    const coPhanDoanAB = seg && seg.start != null && seg.end != null && seg.end > seg.start;

    const canLapNative = (repeatMode === 'one' && !coPhanDoanAB);

    if (audio) audio.loop = canLapNative;

    if (secondaryAudio) secondaryAudio.loop = canLapNative;

  }



  function parseUserTimeInput(str, fallbackSec = 0) {

    if (!str || typeof str !== 'string' || !str.trim()) return fallbackSec;

    const trimmed = str.trim();

    if (/^\d+(\.\d+)?$/.test(trimmed)) {

      return parseFloat(trimmed);

    }

    const parts = trimmed.split(':').map(Number);

    if (parts.some(p => isNaN(p))) return fallbackSec;

    if (parts.length === 1) return parts[0];

    if (parts.length === 2) return parts[0] * 60 + parts[1];

    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];

    return fallbackSec;

  }



  let lastClickedTimelineSec = 0;



  function openAbPopup(clientX, clientY, targetSec) {

    if (!abLoopPopup || !currentTrack) return;



    lastClickedTimelineSec = targetSec;

    if (abTimeInput) {

      abTimeInput.value = formatTime(targetSec, targetSec >= 3600);

    }



    updateAbPopupState();



    abLoopPopup.style.display = 'block';

    const popupWidth = 220;

    const popupHeight = 150;

    let left = clientX - popupWidth / 2;

    let top = clientY - popupHeight - 16;



    if (left < 10) left = 10;

    if (left + popupWidth > window.innerWidth - 10) left = window.innerWidth - popupWidth - 10;

    if (top < 10) top = clientY + 20;



    abLoopPopup.style.left = `${left}px`;

    abLoopPopup.style.top = `${top}px`;

  }



  function updateAbPopupState() {

    const seg = getCurrentAbSegment();

    if (!seg || seg.start == null) {

      if (abSetPointText) abSetPointText.textContent = 'Đặt Start';

      if (abPopupInfo) abPopupInfo.textContent = 'Chưa có mốc đoạn';

    } else if (seg.end == null) {

      if (abSetPointText) abSetPointText.textContent = 'Đặt End';

      if (abPopupInfo) abPopupInfo.textContent = `Start: ${formatTime(seg.start)} | End: Chưa đặt`;

    } else {

      if (abSetPointText) abSetPointText.textContent = 'Đặt Start';

      const durSec = Math.max(0, seg.end - seg.start);

      if (abPopupInfo) abPopupInfo.textContent = `Đoạn: ${formatTime(seg.start)} → ${formatTime(seg.end)} (${formatTime(durSec)})`;

    }

  }



  progressBarWrapper?.addEventListener('contextmenu', (e) => {

    e.preventDefault();

    if (!currentTrack) {

      showToast('<span>Chưa có bài hát đang phát</span>', 'info', 1800);

      return;

    }



    const rect = progressBarWrapper.getBoundingClientRect();

    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    const duration = (audio && audio.duration && isFinite(audio.duration) && audio.duration > 0)

      ? audio.duration

      : parseDurationSec(currentTrack?.duration, currentTrack?.durationFormatted);



    const clickedSec = duration ? ratio * duration : 0;

    openAbPopup(e.clientX, e.clientY, clickedSec);

  });



  btnAbSetPoint?.addEventListener('click', () => {

    if (!currentTrack) return;

    const duration = (audio && audio.duration && isFinite(audio.duration) && audio.duration > 0)

      ? audio.duration

      : parseDurationSec(currentTrack?.duration, currentTrack?.durationFormatted);



    const inputVal = abTimeInput ? abTimeInput.value : '';

    let chosenSec = parseUserTimeInput(inputVal, lastClickedTimelineSec);

    if (duration > 0) {

      chosenSec = Math.max(0, Math.min(duration, chosenSec));

    }



    const key = getTrackKey(currentTrack);

    let seg = abSegmentsMap[key] || null;



    if (!seg || seg.start == null || (seg.start != null && seg.end != null)) {

      abSegmentsMap[key] = { start: chosenSec, end: null };

      persistPlaybackState();

      updateAbMarkersUI();

      updateAbPopupState();

      showToast(`<span>Đã đặt Start: <b>${formatTime(chosenSec)}</b></span>`, 'info', 1800);

    } else {

      if (chosenSec <= seg.start) {

        abSegmentsMap[key] = { start: chosenSec, end: null };

        persistPlaybackState();

        updateAbMarkersUI();

        updateAbPopupState();

        showToast(`<span>Đã đổi Start: <b>${formatTime(chosenSec)}</b></span>`, 'info', 1800);

      } else {

        seg.end = chosenSec;

        abSegmentsMap[key] = seg;

        persistPlaybackState();

        updateAbMarkersUI();

        updateAbPopupState();

        showToast(`<span>Đã chọn đoạn: <b>${formatTime(seg.start)} → ${formatTime(seg.end)}</b></span>`, 'success', 2200);



        if (audio) {

          if (audio.currentTime < seg.start || audio.currentTime >= seg.end) {

            audio.currentTime = seg.start;

          }

        }

        if (abLoopPopup) abLoopPopup.style.display = 'none';

      }

    }

  });



  btnAbClear?.addEventListener('click', () => {

    if (!currentTrack) return;

    const key = getTrackKey(currentTrack);

    if (abSegmentsMap[key]) {

      delete abSegmentsMap[key];

      persistPlaybackState();

      updateAbMarkersUI();

      updateAbPopupState();

      showToast('<span>Đã xóa mốc đoạn bài hát</span>', 'info', 1800);

    }

    if (abLoopPopup) abLoopPopup.style.display = 'none';

  });



  btnAbPopupClose?.addEventListener('click', () => {

    if (abLoopPopup) abLoopPopup.style.display = 'none';

  });



  document.addEventListener('click', (e) => {

    if (abLoopPopup && abLoopPopup.style.display !== 'none') {

      if (!abLoopPopup.contains(e.target) && !e.target.closest('.progress-bar-wrapper')) {

        abLoopPopup.style.display = 'none';

      }

    }

  });



  let fullscreenHintTimer = null;

  // XU LI CHE DO TOAN MAN HINH (FULLSCREEN)
  function showFullscreenHint() {

    const hint = document.getElementById('fullscreen-exit-hint');

    if (!hint) return;

    hint.classList.add('show');

    if (fullscreenHintTimer) clearTimeout(fullscreenHintTimer);

    fullscreenHintTimer = setTimeout(() => {

      hint.classList.remove('show');

    }, 2500);

  }



  async function toggleFullScreen(explicitState = null) {

    const currentlyFullscreen = document.body.classList.contains('is-fullscreen');

    const shouldBeFullscreen = explicitState !== null ? explicitState : !currentlyFullscreen;



    try {

      const res = await api.setFullscreen(shouldBeFullscreen);

      if (res) {

        document.body.classList.add('is-fullscreen');

        showFullscreenHint();

      } else {

        document.body.classList.remove('is-fullscreen');

        const hint = document.getElementById('fullscreen-exit-hint');

        if (hint) hint.classList.remove('show');

      }

    } catch (e) {

      console.warn('Lỗi toàn màn hình:', e);

    }

  }



  document.addEventListener('keydown', (e) => {

    if (e.key === 'F11') {

      e.preventDefault();

      toggleFullScreen();

    } else if (e.key === 'Escape') {

      if (document.body.classList.contains('is-fullscreen')) {

        e.preventDefault();

        toggleFullScreen(false);

      } else if (abLoopPopup && abLoopPopup.style.display !== 'none') {

        abLoopPopup.style.display = 'none';

      }

    }

  });



  // XU LI TAI VA HIEN THI THU VIEN BAI HAT
  async function loadLibrary() {

    try {

      libraryTracks = await api.getLibrary() || [];

      updateLibraryUI();



      // Background repair: auto-upload and optimize custom covers that lack a working discordCoverUrl

      setTimeout(() => {

        libraryTracks.forEach(async (t) => {

          if (t.cover && t.cover.startsWith('data:image/') && (!t.discordCoverUrl || !t.discordCoverUrl.startsWith('http') || t.discordCoverUrl.includes('kn3fi8'))) {

            try {

              const optimized = await optimizeCoverImage(t.cover);

              const updated = await api.editTrack(t.id, t.source, { cover: optimized });

              if (updated?.discordCoverUrl) {

                t.discordCoverUrl = updated.discordCoverUrl;

                t.cover = updated.cover;

                if (currentTrack && currentTrack.id === t.id && currentTrack.source === t.source) {

                  currentTrack.discordCoverUrl = updated.discordCoverUrl;

                  if (isPlaying && audio) {

                    api.updateDiscordActivity(currentTrack, audio.currentTime, true);

                  }

                }

              }

            } catch (err) {}

          }

        });

      }, 1000);

    } catch (e) {

      console.error('Library load failed:', e);

    }

  }



  function updateLibraryUI() {

    if (libraryCountBadge) libraryCountBadge.textContent = libraryTracks.length;

    if (libraryTotalTracks) libraryTotalTracks.textContent = `${libraryTracks.length} bài hát đã lưu`;

    if (libraryTracks.length === 0) {

      if (libraryContainer) libraryContainer.innerHTML = '';

      if (libraryEmpty) libraryEmpty.style.display = 'flex';

    } else {

      if (libraryEmpty) libraryEmpty.style.display = 'none';

      if (libraryContainer) renderTracks(libraryTracks, libraryContainer, true);

    }

  }



  // --- Bo Xu Li Audio Spectrum & Beat Bounce Engine ---

  let boBoiAmThanh = null;

  let boPhanTichAmThanh = null;

  let nguonAmThanhChinh = null;

  let nguonAmThanhPhu = null;

  let duLieuTanSo = null;

  let khungHinhNhip = null;

  let nangLuongKickTB = 0;

  let doLechKickTB = 0.04;

  let nangLuongKickKhungTruoc = 0;

  let thoiGianNhipTruoc = 0;

  let mucZoomHienTai = 1.0;

  let dangChaySpectrum = false;

  let hieuUngTroiSoTam = true;

  let hieuUngTroiTamDangChon = true;

  let doMoAnhNenHienTai = 0;



  // --- Bo Xu Li 2 Luong Song Nhac Hinh Sin Duoi Day ---

  let canvasSongNhac = null;

  let nguCanhSongNhac = null;

  const danhSachTiLeViTri = [

    { trai: 1 / 8, phai: 7 / 8 },

    { trai: 1 / 7, phai: 6 / 7 },

    { trai: 1 / 6, phai: 5 / 6 },

    { trai: 1 / 5, phai: 4 / 5 },

    { trai: 1 / 4, phai: 3 / 4 },

    { trai: 2 / 7, phai: 5 / 7 },

    { trai: 1 / 3, phai: 2 / 3 },

    { trai: 3 / 8, phai: 5 / 8 },

    { trai: 1 / 8, phai: 3 / 4 },

    { trai: 1 / 7, phai: 2 / 3 },

    { trai: 1 / 6, phai: 4 / 5 },

    { trai: 1 / 5, phai: 5 / 6 },

    { trai: 1 / 4, phai: 7 / 8 },

    { trai: 2 / 7, phai: 6 / 7 }

  ];

  let chiSoTiLeViTri = 0;

  let daHoanDoiSong = false;

  let viTriHienTaiA = 2 / 3;

  let viTriHienTaiB = 1 / 3;

  let viTriMoiSongA = 2 / 3;

  let viTriMoiSongB = 1 / 3;

  let doCaoHienTaiA = 0;

  let doCaoHienTaiB = 0;

  // Sóng C (Mid / Snare / Clap)
  let viTriHienTaiC = 2 / 10;

  let viTriMoiSongC = 2 / 10;

  let doCaoHienTaiC = 0;

  let doCaoSongDichC = 0;

  let doCaoDinhC = 0;

  let dangTrongChuKyC = false;

  let dangNhayLenC = false;

  let soKhungHinhC = 0;

  let nangLuongSnareKhungTruoc = 0;

  let nangLuongSnareTB = 0;

  let doLechSnareTB = 0;

  let thoiGianNhipSnareTruoc = 0;

  // Sóng D (High / Hi-Hat / Shaker / Percussion)
  let viTriHienTaiD = 8 / 10;

  let viTriMoiSongD = 8 / 10;

  let doCaoHienTaiD = 0;

  let doCaoSongDichD = 0;

  let doCaoDinhD = 0;

  let dangTrongChuKyD = false;

  let dangNhayLenD = false;

  let soKhungHinhD = 0;

  let nangLuongHiHatKhungTruoc = 0;

  let nangLuongHiHatTB = 0;

  let doLechHiHatTB = 0;

  let thoiGianNhipHiHatTruoc = 0;

  // Danh sach cap vi tri: 70% thoi gian o 2 ben doi xung (2/10 va 8/10), dao vi tri cho nhau
  const danhSachCapViTriCD = [
    { c: 2 / 10, d: 8 / 10 },
    { c: 8 / 10, d: 2 / 10 },
    { c: 0.19,   d: 0.81 },
    { c: 0.81,   d: 0.19 },
    { c: 2 / 10, d: 8 / 10 },
    { c: 8 / 10, d: 2 / 10 },
    { c: 0.21,   d: 0.79 },
    { c: 0.28,   d: 0.72 },
    { c: 0.72,   d: 0.28 },
    { c: 0.35,   d: 0.65 }
  ];

  let chiSoCapCD = 0;

  // Cai dat doi vi tri song nhac: Bat = Lien tuc theo nhip (logic cu), Tat = Han che theo bien doi tan so am thanh (logic moi)
  let daoViTriSongToanCuc = false;
  let daoViTriSongLienTuc = false;

  function applyWaveSwapSettings() {
    if (waveSwapToggleInput) waveSwapToggleInput.checked = daoViTriSongToanCuc;
    if (toggleWaveSwapEdit) toggleWaveSwapEdit.checked = daoViTriSongLienTuc;
    if (waveSwapStatusDesc) {
      waveSwapStatusDesc.textContent = daoViTriSongToanCuc
        ? 'Bật (Đổi vị trí sóng liên tục theo từng nhịp trống)'
        : 'Tắt (Hạn chế đổi vị trí, chỉ đổi khi âm thanh chuyển đoạn)';
    }
  }

  // Bien kiem soat doi vi tri song theo tan so rieng biet (chua dung o 4 song nhac)
  let thoiGianDoiViTriTruoc = 0;
  let soNhipKeTuLanDoiViTri = 0;
  let tiLeBassMelodyTruoc = 0;
  let nangLuongLeadTB = 0;
  let doLechLeadTB = 0;

  let dangTrongChuKyNhip = false;

  let dangNhayLen = false;

  let soKhungHinhNhip = 0;

  let mucZoomDich = 1.0;

  let mucZoomDinh = 1.0;

  let doCaoSongDichA = 0;

  let doCaoSongDichB = 0;

  let doCaoDinhA = 0;

  let doCaoDinhB = 0;

  // XU LI MAU SAC MAC DINH SONG NHAC (SOUNDWAVE COLORS: SONG A VA D: #FFFFFF, SONG B VA C: #37FF00)
  const MAU_SONG_MAC_DINH_A = '#FFFFFF';
  const MAU_SONG_MAC_DINH_B = '#37FF00';
  const MAU_SONG_MAC_DINH_C = '#37FF00';
  const MAU_SONG_MAC_DINH_D = '#FFFFFF';

  let mauSongHienTaiA = MAU_SONG_MAC_DINH_A;

  let mauSongHienTaiB = MAU_SONG_MAC_DINH_B;

  let mauSongHienTaiC = MAU_SONG_MAC_DINH_C;

  let mauSongHienTaiD = MAU_SONG_MAC_DINH_D;

  let mauSongDangChonA = MAU_SONG_MAC_DINH_A;

  let mauSongDangChonB = MAU_SONG_MAC_DINH_B;

  let mauSongDangChonC = MAU_SONG_MAC_DINH_C;

  let mauSongDangChonD = MAU_SONG_MAC_DINH_D;



  // XU LI VE SONG NHAC CANVAS DONG (SOUNDWAVE VISUALIZER)
  function KhoiTaoCanvasSongNhac() {

    if (!canvasSongNhac) {

      canvasSongNhac = document.getElementById('track-page-wave-canvas');

      if (canvasSongNhac) {

        nguCanhSongNhac = canvasSongNhac.getContext('2d');

      }

    }

    CapNhatKichThuocCanvasSong();

  }



  function CapNhatKichThuocCanvasSong() {

    if (!canvasSongNhac) return;

    const rect = canvasSongNhac.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    const chieuRong = Math.round(rect.width || window.innerWidth || 1200);

    const chieuCao = Math.round(rect.height || 220);

    if (chieuRong > 0 && chieuCao > 0) {

      if (canvasSongNhac.width !== chieuRong * dpr || canvasSongNhac.height !== chieuCao * dpr) {

        canvasSongNhac.width = chieuRong * dpr;

        canvasSongNhac.height = chieuCao * dpr;

        if (nguCanhSongNhac) {

          nguCanhSongNhac.setTransform(dpr, 0, 0, dpr, 0, 0);

        }

      }

    }

  }



  window.addEventListener('resize', CapNhatKichThuocCanvasSong);



  function VeMotLuongSong(ctx, viTriX, chieuCao, mauSac, chieuRongCanvas, chieuCaoCanvas, heSoBanKinh = 0.30, doDayVien = 3.5) {

    if (chieuCao <= 0.5) return;



    const banKinhDoi = chieuRongCanvas * heSoBanKinh;

    const mucDay = chieuCaoCanvas - 4;



    function TinhDoCaoTaiX(x) {

      const khoangCach = Math.abs(x - viTriX);

      if (khoangCach >= banKinhDoi) return 0;

      const goc = (khoangCach / banKinhDoi) * (Math.PI / 2);

      const heSoCos = Math.cos(goc);

      return chieuCao * (heSoCos * heSoCos);

    }



    ctx.beginPath();

    ctx.moveTo(0, chieuCaoCanvas + 20);

    ctx.lineTo(0, mucDay - TinhDoCaoTaiX(0));



    const buoc = 4;

    for (let x = 0; x <= chieuRongCanvas; x += buoc) {

      ctx.lineTo(x, mucDay - TinhDoCaoTaiX(x));

    }

    ctx.lineTo(chieuRongCanvas, mucDay - TinhDoCaoTaiX(chieuRongCanvas));

    ctx.lineTo(chieuRongCanvas, chieuCaoCanvas + 20);

    ctx.closePath();



    ctx.fillStyle = mauSac;

    ctx.fill();



    ctx.beginPath();

    ctx.moveTo(0, mucDay - TinhDoCaoTaiX(0));

    for (let x = 0; x <= chieuRongCanvas; x += buoc) {

      ctx.lineTo(x, mucDay - TinhDoCaoTaiX(x));

    }

    ctx.lineTo(chieuRongCanvas, mucDay - TinhDoCaoTaiX(chieuRongCanvas));

    ctx.strokeStyle = mauSac;

    ctx.lineWidth = doDayVien;

    ctx.stroke();

  }



  function VeHaiLuongSongNhac() {

    if (!canvasSongNhac || !nguCanhSongNhac) return;

    const dpr = window.devicePixelRatio || 1;

    const chieuRong = canvasSongNhac.width / dpr;

    const chieuCao = canvasSongNhac.height / dpr;



    nguCanhSongNhac.clearRect(0, 0, chieuRong, chieuCao);



    if (doCaoHienTaiA <= 0.5 && doCaoHienTaiB <= 0.5 && doCaoHienTaiC <= 0.5 && doCaoHienTaiD <= 0.5) return;



    nguCanhSongNhac.save();

    nguCanhSongNhac.globalCompositeOperation = 'source-over';



    // 1. Song Bass A (Buoc song rong 0.30)
    if (doCaoHienTaiA > 0.5) {

      VeMotLuongSong(

        nguCanhSongNhac,

        chieuRong * viTriHienTaiA,

        doCaoHienTaiA,

        mauSongHienTaiA,

        chieuRong,

        chieuCao,

        0.30,

        3.5

      );

    }



    // 2. Song Bass B (Buoc song rong 0.30)
    if (doCaoHienTaiB > 0.5) {

      VeMotLuongSong(

        nguCanhSongNhac,

        chieuRong * viTriHienTaiB,

        doCaoHienTaiB,

        mauSongHienTaiB,

        chieuRong,

        chieuCao,

        0.30,

        3.5

      );

    }



    // 3. Song Mid C (Snare / Clap / Rimshot - Buoc song hep hon 0.17)
    if (doCaoHienTaiC > 0.5) {

      VeMotLuongSong(

        nguCanhSongNhac,

        chieuRong * viTriHienTaiC,

        doCaoHienTaiC,

        mauSongHienTaiC,

        chieuRong,

        chieuCao,

        0.17,

        2.8

      );

    }



    // 4. Song High D (Hi-Hat / Shaker / Cymbal - Buoc song rat hep 0.11, nhon va sac)
    if (doCaoHienTaiD > 0.5) {

      VeMotLuongSong(

        nguCanhSongNhac,

        chieuRong * viTriHienTaiD,

        doCaoHienTaiD,

        mauSongHienTaiD,

        chieuRong,

        chieuCao,

        0.11,

        2.2

      );

    }



    nguCanhSongNhac.restore();

  }



  // --- Bo Xu Li 2 Duong Sang Neon Hinh Chu C Om 2 Ben Vien Anh ---

  let canvasGocChuL = null;

  let nguCanhGocChuL = null;

  let danhSachChuL = [];

  const demCanhGocChuL = 28;

  let hieuUngVienChuC = true;



  // XU LI VE HOAT ANH KHUNG GOC CHU L VA CHU C
  function KhoiTaoCanvasGocChuL() {

    if (!canvasGocChuL) {

      canvasGocChuL = document.getElementById('track-page-corner-canvas');

      if (canvasGocChuL) {

        nguCanhGocChuL = canvasGocChuL.getContext('2d');

      }

    }

    CapNhatKichThuocCanvasGoc();

  }



  function CapNhatKichThuocCanvasGoc() {

    if (!canvasGocChuL || !trackPageArtworkWrap) return;

    const dpr = window.devicePixelRatio || 1;

    const chieuRongAnh = Math.round(trackPageArtworkWrap.offsetWidth || 400);

    const chieuCaoAnh = Math.round(trackPageArtworkWrap.offsetHeight || 400);

    if (chieuRongAnh > 0 && chieuCaoAnh > 0) {

      const chieuRongCanvas = chieuRongAnh + demCanhGocChuL * 2;

      const chieuCaoCanvas = chieuCaoAnh + demCanhGocChuL * 2;

      if (canvasGocChuL.width !== chieuRongCanvas * dpr || canvasGocChuL.height !== chieuCaoCanvas * dpr) {

        canvasGocChuL.width = chieuRongCanvas * dpr;

        canvasGocChuL.height = chieuCaoCanvas * dpr;

        if (nguCanhGocChuL) {

          nguCanhGocChuL.setTransform(dpr, 0, 0, dpr, 0, 0);

        }

      }

    }

  }



  window.addEventListener('resize', CapNhatKichThuocCanvasGoc);



  function KichHoatHieuUngChuL(cuongDo = 1.0) {

    if (!hieuUngVienChuC) return;

    danhSachChuL.push({

      thoiGianBatDau: performance.now(),

      thoiLuong: 240,

      cuongDo: Math.min(1.0, Math.max(0.4, cuongDo))

    });

    if (danhSachChuL.length > 2) {

      danhSachChuL.shift();

    }

  }

  const KichHoatHieuUngChuC = KichHoatHieuUngChuL;



  function TaoDuongDanChuC(ctx, kieuBen, pad, W, H, banKinh, offset, kheHo) {

    ctx.beginPath();

    const banKinhCong = banKinh + offset;

    const midX = pad + W / 2;

    if (kieuBen === 'benTrai') {

      const xDau = midX - kheHo / 2;

      const cxTren = pad + banKinh;

      const cyTren = pad + banKinh;

      const cxDuoi = pad + banKinh;

      const cyDuoi = pad + H - banKinh;

      ctx.moveTo(xDau, pad - offset);

      ctx.lineTo(cxTren, pad - offset);

      ctx.arc(cxTren, cyTren, banKinhCong, -Math.PI / 2, -Math.PI, true);

      ctx.lineTo(pad - offset, cyDuoi);

      ctx.arc(cxDuoi, cyDuoi, banKinhCong, Math.PI, Math.PI / 2, true);

      ctx.lineTo(xDau, pad + H + offset);

    } else {

      const xDau = midX + kheHo / 2;

      const cxTren = pad + W - banKinh;

      const cyTren = pad + banKinh;

      const cxDuoi = pad + W - banKinh;

      const cyDuoi = pad + H - banKinh;

      ctx.moveTo(xDau, pad - offset);

      ctx.lineTo(cxTren, pad - offset);

      ctx.arc(cxTren, cyTren, banKinhCong, -Math.PI / 2, 0, false);

      ctx.lineTo(pad + W + offset, cyDuoi);

      ctx.arc(cxDuoi, cyDuoi, banKinhCong, 0, Math.PI / 2, false);

      ctx.lineTo(xDau, pad + H + offset);

    }

  }



  function VeMotKhungChuC(ctx, kieuBen, pad, W, H, banKinh, offset, kheHo, mauSac, alpha) {

    if (alpha <= 0.005) return;



    // Lớp 1: Vầng hào quang phát sáng mềm mại xung quanh (Soft glow)

    ctx.save();

    ctx.lineCap = 'butt';

    ctx.lineJoin = 'round';

    ctx.strokeStyle = mauSac;

    ctx.lineWidth = 8;

    ctx.shadowColor = mauSac;

    ctx.shadowBlur = 20;

    ctx.globalAlpha = alpha * 0.75;

    TaoDuongDanChuC(ctx, kieuBen, pad, W, H, banKinh, offset, kheHo);

    ctx.stroke();

    ctx.restore();



    // Lớp 2: Thân viền neon chính sắc nét

    ctx.save();

    ctx.lineCap = 'butt';

    ctx.lineJoin = 'round';

    ctx.strokeStyle = mauSac;

    ctx.lineWidth = 3.6;

    ctx.shadowColor = mauSac;

    ctx.shadowBlur = 10;

    ctx.globalAlpha = alpha * 0.95;

    TaoDuongDanChuC(ctx, kieuBen, pad, W, H, banKinh, offset, kheHo);

    ctx.stroke();

    ctx.restore();



    // Lớp 3: Lõi sáng trắng trung tâm thanh thoát (Highlight)

    ctx.save();

    ctx.lineCap = 'butt';

    ctx.lineJoin = 'round';

    ctx.strokeStyle = '#ffffff';

    ctx.lineWidth = 1.6;

    ctx.shadowColor = '#ffffff';

    ctx.shadowBlur = 4;

    ctx.globalAlpha = alpha;

    TaoDuongDanChuC(ctx, kieuBen, pad, W, H, banKinh, offset, kheHo);

    ctx.stroke();

    ctx.restore();

  }



  function VeHaiDuongSangChuL() {

    if (!canvasGocChuL || !nguCanhGocChuL) return;

    if (canvasGocChuL.width === 0 || canvasGocChuL.height === 0) {

      CapNhatKichThuocCanvasGoc();

    }

    const dpr = window.devicePixelRatio || 1;

    const tongRong = canvasGocChuL.width / dpr;

    const tongCao = canvasGocChuL.height / dpr;

    if (tongRong <= 0 || tongCao <= 0) return;



    nguCanhGocChuL.clearRect(0, 0, tongRong, tongCao);

    if (!hieuUngVienChuC) return;

    if (danhSachChuL.length === 0) return;



    const pad = demCanhGocChuL;

    const W = tongRong - pad * 2;

    const H = tongCao - pad * 2;

    if (W <= 0 || H <= 0) return;



    const banKinh = 20;

    const offset = 1.5;

    const kheHo = 28;

    const thoiGian = performance.now();



    for (let i = danhSachChuL.length - 1; i >= 0; i--) {

      const p = danhSachChuL[i];

      const u = (thoiGian - p.thoiGianBatDau) / p.thoiLuong;

      if (u >= 1.0) {

        danhSachChuL.splice(i, 1);

        continue;

      }

      if (u < 0) continue;



      let alpha = (u < 0.12) ? (u / 0.12) : Math.pow((1.0 - u) / 0.88, 2.4);

      alpha = Math.max(0, Math.min(1.0, alpha)) * p.cuongDo;

      if (alpha <= 0.005) continue;



      VeMotKhungChuC(nguCanhGocChuL, 'benTrai', pad, W, H, banKinh, offset, kheHo, mauSongHienTaiA, alpha);

      VeMotKhungChuC(nguCanhGocChuL, 'benPhai', pad, W, H, banKinh, offset, kheHo, mauSongHienTaiB, alpha);

    }

  }

  const VeHaiDuongSangChuC = VeHaiDuongSangChuL;



  // XU LI PHAN TICH AM THANH THEO THOI GIAN THUC (WEB AUDIO API)
  function KhoiTaoBoPhanTichAmThanh() {

    try {

      if (!boBoiAmThanh) {

        const TrinhTaoAmThanh = window.AudioContext || window.webkitAudioContext;

        if (!TrinhTaoAmThanh) return null;

        boBoiAmThanh = new TrinhTaoAmThanh();

      }

      if (boBoiAmThanh.state === 'suspended') {

        boBoiAmThanh.resume().catch(() => {});

      }

      if (!boPhanTichAmThanh) {

        boPhanTichAmThanh = boBoiAmThanh.createAnalyser();

        boPhanTichAmThanh.fftSize = 1024;

        boPhanTichAmThanh.smoothingTimeConstant = 0.30;

        boPhanTichAmThanh.minDecibels = -90;

        boPhanTichAmThanh.maxDecibels = -10;

        boPhanTichAmThanh.connect(boBoiAmThanh.destination);

        duLieuTanSo = new Uint8Array(boPhanTichAmThanh.frequencyBinCount);

      }

      if (audio && !nguonAmThanhChinh) {

        audio.crossOrigin = 'anonymous';

        nguonAmThanhChinh = boBoiAmThanh.createMediaElementSource(audio);

        nguonAmThanhChinh.connect(boPhanTichAmThanh);

      }

      if (secondaryAudio && !nguonAmThanhPhu) {

        secondaryAudio.crossOrigin = 'anonymous';

        nguonAmThanhPhu = boBoiAmThanh.createMediaElementSource(secondaryAudio);

        nguonAmThanhPhu.connect(boPhanTichAmThanh);

      }

      return boPhanTichAmThanh;

    } catch (err) {

      console.warn('Loi khoi tao bo phan tich am thanh:', err);

      return null;

    }

  }



  function DungPhanTichNhip() {

    dangChaySpectrum = false;

    if (khungHinhNhip) {

      cancelAnimationFrame(khungHinhNhip);

      khungHinhNhip = null;

    }

    dangTrongChuKyNhip = false;

    dangNhayLen = false;

    soKhungHinhNhip = 0;

    mucZoomHienTai = 1.0;

    mucZoomDich = 1.0;

    mucZoomDinh = 1.0;

    nangLuongKickKhungTruoc = 0;

    thoiGianNhipTruoc = 0;

    doCaoHienTaiA = 0;

    doCaoHienTaiB = 0;

    doCaoHienTaiC = 0;

    doCaoHienTaiD = 0;

    doCaoSongDichA = 0;

    doCaoSongDichB = 0;

    doCaoSongDichC = 0;

    doCaoSongDichD = 0;

    doCaoDinhA = 0;

    doCaoDinhB = 0;

    doCaoDinhC = 0;

    doCaoDinhD = 0;

    dangTrongChuKyC = false;

    dangTrongChuKyD = false;

    dangNhayLenC = false;

    dangNhayLenD = false;

    soKhungHinhC = 0;

    soKhungHinhD = 0;

    nangLuongSnareKhungTruoc = 0;

    nangLuongHiHatKhungTruoc = 0;

    thoiGianNhipSnareTruoc = 0;

    thoiGianNhipHiHatTruoc = 0;

    thoiGianDoiViTriTruoc = 0;

    soNhipKeTuLanDoiViTri = 0;

    tiLeBassMelodyTruoc = 0;

    nangLuongLeadTB = 0;

    doLechLeadTB = 0;

    if (trackPageArtworkWrap) {

      trackPageArtworkWrap.style.transform = '';

      trackPageArtworkWrap.style.boxShadow = '';

    }

    if (trackPageCustomBg) {

      trackPageCustomBg.style.transform = '';

    }

    if (trackPageAmbient) {

      trackPageAmbient.style.transform = '';

    }

    if (nguCanhSongNhac && canvasSongNhac) {

      const dpr = window.devicePixelRatio || 1;

      nguCanhSongNhac.clearRect(0, 0, canvasSongNhac.width / dpr, canvasSongNhac.height / dpr);

    }

    danhSachChuL = [];

    if (nguCanhGocChuL && canvasGocChuL) {

      const dpr = window.devicePixelRatio || 1;

      nguCanhGocChuL.clearRect(0, 0, canvasGocChuL.width / dpr, canvasGocChuL.height / dpr);

    }

  }



  function CapNhatChuyenDongNenSoTam(thoiGian) {

    const coAnhTuyChon = trackPageCustomBg && trackPageCustomBg.style.display !== 'none';

    const phanTuNen = coAnhTuyChon ? trackPageCustomBg : trackPageAmbient;

    const phanTuAn = coAnhTuyChon ? trackPageAmbient : trackPageCustomBg;

    if (phanTuAn && phanTuAn.style.transform !== '') {

      phanTuAn.style.transform = '';

    }

    if (!phanTuNen) return;



    const tiLeScale = (doMoAnhNenHienTai > 0 || !coAnhTuyChon) ? 1.10 : 1.08;



    if (hieuUngTroiSoTam) {

      const chuKy = 16000;

      const theta = (thoiGian % chuKy) / chuKy * 2 * Math.PI;

      const toaDoX = 45.0 * Math.sin(theta);

      const toaDoY = 22.0 * Math.sin(2 * theta);

      const gocNghieng = 4.2 * Math.sin(theta) + 1.6 * Math.sin(2 * theta);

      phanTuNen.style.transform = `translate3d(${toaDoX.toFixed(2)}px, ${toaDoY.toFixed(2)}px, 0) rotate(${gocNghieng.toFixed(2)}deg) scale(${tiLeScale.toFixed(3)})`;

    } else {

      const bienDoi = tiLeScale > 1.001 ? `scale(${tiLeScale.toFixed(3)})` : '';

      if (phanTuNen.style.transform !== bienDoi) {

        phanTuNen.style.transform = bienDoi;

      }

    }

  }



  function BatDauPhanTichNhip() {

    if (!isTrackPageOpen) return;

    KhoiTaoBoPhanTichAmThanh();

    KhoiTaoCanvasSongNhac();

    KhoiTaoCanvasGocChuL();

    if (boBoiAmThanh && boBoiAmThanh.state === 'suspended') {

      boBoiAmThanh.resume().catch(() => {});

    }

    if (dangChaySpectrum) return;

    dangChaySpectrum = true;



    function XuLiKhungHinh() {

      if (!dangChaySpectrum || !isTrackPageOpen) {

        DungPhanTichNhip();

        return;

      }



      if (boPhanTichAmThanh && duLieuTanSo && isPlaying && audio && !audio.paused) {

        boPhanTichAmThanh.getByteFrequencyData(duLieuTanSo);



        const kickTram = duLieuTanSo[1] / 255;

        const kickChinh = duLieuTanSo[2] / 255;

        const kickCao = duLieuTanSo[3] / 255;

        const nangLuongKickRemix = kickTram * 0.45 + kickChinh * 0.45 + kickCao * 0.10;



        let tongNangLuongLoiHat = 0;

        for (let i = 8; i <= 38; i++) {

          tongNangLuongLoiHat += duLieuTanSo[i];

        }

        const nangLuongLoiHatGiaiDieu = tongNangLuongLoiHat / (31 * 255);



        if (nangLuongKickTB === 0) {

          nangLuongKickTB = nangLuongKickRemix;

          doLechKickTB = 0.04;

        } else {

          nangLuongKickTB = nangLuongKickTB * 0.95 + nangLuongKickRemix * 0.05;

          const doLech = Math.abs(nangLuongKickRemix - nangLuongKickTB);

          doLechKickTB = doLechKickTB * 0.95 + doLech * 0.05;

        }



        // Tinh nang luong dai Mid / Snare / Clap (Bins 14 den 42 ~ 600Hz - 1800Hz)
        let tongSnare = 0;

        for (let i = 14; i <= 42; i++) {

          tongSnare += duLieuTanSo[i];

        }

        const nangLuongSnare = tongSnare / (29 * 255);

        if (nangLuongSnareTB === 0) {

          nangLuongSnareTB = nangLuongSnare;

          doLechSnareTB = 0.03;

        } else {

          nangLuongSnareTB = nangLuongSnareTB * 0.94 + nangLuongSnare * 0.06;

          const doLechC = Math.abs(nangLuongSnare - nangLuongSnareTB);

          doLechSnareTB = doLechSnareTB * 0.94 + doLechC * 0.06;

        }



        // Tinh nang luong dai High / Hi-Hat / Shaker / Cymbal (Bins 70 den 170 ~ 3000Hz - 7300Hz)
        let tongHiHat = 0;

        for (let i = 70; i <= 170; i++) {

          tongHiHat += duLieuTanSo[i];

        }

        const nangLuongHiHat = tongHiHat / (101 * 255);

        if (nangLuongHiHatTB === 0) {

          nangLuongHiHatTB = nangLuongHiHat;

          doLechHiHatTB = 0.015;

        } else {

          nangLuongHiHatTB = nangLuongHiHatTB * 0.92 + nangLuongHiHat * 0.08;

          const doLechD = Math.abs(nangLuongHiHat - nangLuongHiHatTB);

          doLechHiHatTB = doLechHiHatTB * 0.92 + doLechD * 0.08;

        }



        const thoiGianHienTai = performance.now();

        const cachNhipTruoc = thoiGianHienTai - thoiGianNhipTruoc;

        const nguongKick = nangLuongKickTB + Math.max(0.045, doLechKickTB * 1.35);

        const dotBienXungKich = nangLuongKickRemix - nangLuongKickKhungTruoc;



        const laBassRemixApDao = nangLuongKickRemix > nangLuongLoiHatGiaiDieu * 0.88 + 0.08;



        const doThuHoiZoom = (mucZoomDinh > 1.002) ? (1 - (mucZoomHienTai - 1.0) / (mucZoomDinh - 1.0)) : 1.0;

        const doThuHoiSong = (doCaoDinhA > 5) ? (1 - doCaoHienTaiA / doCaoDinhA) : 1.0;

        const daThuLaiDuoc40PhanTram = !dangNhayLen && (doThuHoiZoom >= 0.40 || doThuHoiSong >= 0.40);

        const choPhepNhanNhipTiepTheo = !dangTrongChuKyNhip || daThuLaiDuoc40PhanTram;



        const laNhipRemixManh = choPhepNhanNhipTiepTheo &&

          cachNhipTruoc > 160 &&

          nangLuongKickRemix > nguongKick &&

          dotBienXungKich > 0.025 &&

          nangLuongKickRemix > 0.22 &&

          laBassRemixApDao;



        if (laNhipRemixManh) {

          thoiGianNhipTruoc = thoiGianHienTai;

          dangTrongChuKyNhip = true;

          dangNhayLen = true;

          soKhungHinhNhip = 0;



          const cuongDoNhip = Math.min(1.0, Math.max(0.2, (nangLuongKickRemix - nguongKick) / Math.max(0.04, doLechKickTB * 2.0)));

          mucZoomDich = 1.0 + 0.038 + cuongDoNhip * 0.052;

          mucZoomDinh = Math.max(mucZoomDich, mucZoomHienTai + 0.025);



          const dpr = window.devicePixelRatio || 1;

          const chieuCaoCanvas = canvasSongNhac ? (canvasSongNhac.height / dpr) : 240;

          const doCaoNhipSong = 65 + cuongDoNhip * (chieuCaoCanvas * 0.68 - 65);

          doCaoSongDichA = doCaoNhipSong;

          doCaoSongDichB = doCaoNhipSong;

          doCaoDinhA = Math.max(doCaoSongDichA, doCaoHienTaiA);

          doCaoDinhB = Math.max(doCaoSongDichB, doCaoHienTaiB);



          if (daoViTriSongLienTuc) {
            chiSoTiLeViTri = (chiSoTiLeViTri + 1) % danhSachTiLeViTri.length;
            daHoanDoiSong = !daHoanDoiSong;
            const tiLe = danhSachTiLeViTri[chiSoTiLeViTri];
            if (!daHoanDoiSong) {
              viTriMoiSongA = tiLe.phai;
              viTriMoiSongB = tiLe.trai;
            } else {
              viTriMoiSongA = tiLe.trai;
              viTriMoiSongB = tiLe.phai;
            }
          } else {
            soNhipKeTuLanDoiViTri++;
          }

          KichHoatHieuUngChuL(cuongDoNhip);

        }

        nangLuongKickKhungTruoc = nangLuongKickRemix;



        // --- Cam am va kich hoat Song C (Mid / Snare / Clap / Rimshot) ---
        // Chi cam nhan tieng Snare/Clap/Rimshot, khong chay theo tieng Kick Bass
        const doThuHoiSongC = (doCaoDinhC > 5) ? (1 - doCaoHienTaiC / doCaoDinhC) : 1.0;
        const daThuLaiDuoc40PhanTramC = !dangNhayLenC && doThuHoiSongC >= 0.40;
        const choPhepNhanNhipC = (!dangTrongChuKyC && doCaoHienTaiC <= 2) || daThuLaiDuoc40PhanTramC;

        const cachNhipSnare = thoiGianHienTai - thoiGianNhipSnareTruoc;
        const nguongSnare = nangLuongSnareTB + Math.max(0.035, doLechSnareTB * 1.30);
        const dotBienSnare = nangLuongSnare - nangLuongSnareKhungTruoc;

        const laNhipSnare = choPhepNhanNhipC &&
          cachNhipSnare > 200 &&
          nangLuongSnare > nguongSnare &&
          dotBienSnare > 0.026 &&
          nangLuongSnare > 0.16 &&
          (dotBienSnare > dotBienXungKich * 0.35 || nangLuongSnare > nangLuongKickRemix * 0.65);

        if (laNhipSnare) {
          thoiGianNhipSnareTruoc = thoiGianHienTai;
          dangTrongChuKyC = true;
          dangNhayLenC = true;
          soKhungHinhC = 0;
          const cuongDoSnare = Math.min(1.0, Math.max(0.25, (nangLuongSnare - nguongSnare) / Math.max(0.035, doLechSnareTB * 2.0)));
          const dpr = window.devicePixelRatio || 1;
          const chieuCaoCanvas = canvasSongNhac ? (canvasSongNhac.height / dpr) : 240;
          const doCaoNhipC = 50 + cuongDoSnare * (chieuCaoCanvas * 0.58 - 50);
          doCaoSongDichC = Math.max(doCaoNhipC, doCaoHienTaiC + 20);
          doCaoDinhC = Math.max(doCaoSongDichC, doCaoHienTaiC);

          if (daoViTriSongLienTuc) {
            chiSoCapCD = (chiSoCapCD + 1) % danhSachCapViTriCD.length;
            viTriMoiSongC = danhSachCapViTriCD[chiSoCapCD].c;
            viTriMoiSongD = danhSachCapViTriCD[chiSoCapCD].d;
          } else {
            soNhipKeTuLanDoiViTri++;
          }
        }

        nangLuongSnareKhungTruoc = nangLuongSnare;

        // --- Cam am va kich hoat Song D (High / Hi-Hat / Shaker / Cymbal) ---
        // Chi cam nhan am cao thanh thoat xap xe cua hi-hat/shaker, cuc nhay voi nhịp 1/8 va 1/16
        const doThuHoiSongD = (doCaoDinhD > 5) ? (1 - doCaoHienTaiD / doCaoDinhD) : 1.0;
        const daThuLaiDuoc40PhanTramD = !dangNhayLenD && doThuHoiSongD >= 0.40;
        const choPhepNhanNhipD = (!dangTrongChuKyD && doCaoHienTaiD <= 2) || daThuLaiDuoc40PhanTramD;

        const cachNhipHiHat = thoiGianHienTai - thoiGianNhipHiHatTruoc;
        const nguongHiHat = nangLuongHiHatTB + Math.max(0.015, doLechHiHatTB * 1.25);
        const dotBienHiHat = nangLuongHiHat - nangLuongHiHatKhungTruoc;

        const laNhipHiHat = choPhepNhanNhipD &&
          cachNhipHiHat > 180 &&
          nangLuongHiHat > nguongHiHat &&
          dotBienHiHat > 0.016 &&
          nangLuongHiHat > 0.06;

        if (laNhipHiHat) {
          thoiGianNhipHiHatTruoc = thoiGianHienTai;
          dangTrongChuKyD = true;
          dangNhayLenD = true;
          soKhungHinhD = 0;
          const cuongDoHiHat = Math.min(1.0, Math.max(0.30, (nangLuongHiHat - nguongHiHat) / Math.max(0.02, doLechHiHatTB * 2.0)));
          const dpr = window.devicePixelRatio || 1;
          const chieuCaoCanvas = canvasSongNhac ? (canvasSongNhac.height / dpr) : 240;
          const doCaoNhipD = 35 + cuongDoHiHat * (chieuCaoCanvas * 0.46 - 35);
          doCaoSongDichD = Math.max(doCaoNhipD, doCaoHienTaiD + 15);
          doCaoDinhD = Math.max(doCaoSongDichD, doCaoHienTaiD);

          if (daoViTriSongLienTuc) {
            chiSoCapCD = (chiSoCapCD + 1) % danhSachCapViTriCD.length;
            viTriMoiSongD = danhSachCapViTriCD[chiSoCapCD].d;
            viTriMoiSongC = danhSachCapViTriCD[chiSoCapCD].c;
          } else {
            soNhipKeTuLanDoiViTri++;
          }
        }

        nangLuongHiHatKhungTruoc = nangLuongHiHat;

        // --- Neu Tat doi vi tri lien tuc: Phan tich dai tan so rieng biet (CHUA TUNG DUNG O 4 SONG NHAC) de kiem soat doi vi tri ---
        if (!daoViTriSongLienTuc) {
          // Dai 1: Low-Mid / Bass Chord Root (Bins 4 den 7 ~ 170Hz - 300Hz): Cam bien chuyen not tram / hop am bassline
          const nangLuongBassTram = (duLieuTanSo[4] + duLieuTanSo[5]) / (2 * 255);
          const nangLuongBassBong = (duLieuTanSo[6] + duLieuTanSo[7]) / (2 * 255);
          const tongNLBassMelody = nangLuongBassTram + nangLuongBassBong;
          const tiLeBassMelody = (nangLuongBassTram - nangLuongBassBong) / (tongNLBassMelody + 0.05);
          const doLechBassMelody = Math.abs(tiLeBassMelody - tiLeBassMelodyTruoc);
          tiLeBassMelodyTruoc = tiLeBassMelodyTruoc * 0.92 + tiLeBassMelody * 0.08;

          // Dai 2: Upper-Mid / Melodic Lead Synth & Vocal Formant (Bins 46 den 66 ~ 1950Hz - 2800Hz): Chuyen cau giai dieu Lead
          let tongLead = 0;
          for (let i = 46; i <= 66; i++) {
            tongLead += duLieuTanSo[i];
          }
          const nangLuongLead = tongLead / (21 * 255);
          const dotBienLead = Math.abs(nangLuongLead - nangLuongLeadTB);
          if (nangLuongLeadTB === 0) {
            nangLuongLeadTB = nangLuongLead;
            doLechLeadTB = 0.02;
          } else {
            nangLuongLeadTB = nangLuongLeadTB * 0.94 + nangLuongLead * 0.06;
            doLechLeadTB = doLechLeadTB * 0.94 + dotBienLead * 0.06;
          }

          const coChuyenHopAmBass = (tongNLBassMelody > 0.12 && doLechBassMelody > 0.28);
          const coChuyenCauLead = (nangLuongLead > 0.14 && dotBienLead > Math.max(0.040, doLechLeadTB * 2.2));
          const coThayDoiTanSoChuyenDoan = coChuyenHopAmBass || coChuyenCauLead;

          // Gioi han thoi gian va so nhip: khong cho phep doi cho bua bai, cach nhau toi thieu ~2.8s va it nhat 8 nhip nhac
          const daQuaThoiGianCho = (thoiGianHienTai - thoiGianDoiViTriTruoc) >= 2800;
          const daDuSoNhip = soNhipKeTuLanDoiViTri >= 8;
          const daQuaLauChuaDoi = (thoiGianHienTai - thoiGianDoiViTriTruoc) >= 7500 && soNhipKeTuLanDoiViTri >= 16;
          const choPhepDoiViTri = (daQuaThoiGianCho && daDuSoNhip && coThayDoiTanSoChuyenDoan) || (daQuaLauChuaDoi && (laNhipRemixManh || laNhipSnare || laNhipHiHat));

          if (choPhepDoiViTri) {
            thoiGianDoiViTriTruoc = thoiGianHienTai;
            soNhipKeTuLanDoiViTri = 0;

            // Hoan doi vi tri doi xung song A va B
            chiSoTiLeViTri = (chiSoTiLeViTri + 1) % danhSachTiLeViTri.length;
            daHoanDoiSong = !daHoanDoiSong;
            const tiLe = danhSachTiLeViTri[chiSoTiLeViTri];
            if (!daHoanDoiSong) {
              viTriMoiSongA = tiLe.phai;
              viTriMoiSongB = tiLe.trai;
            } else {
              viTriMoiSongA = tiLe.trai;
              viTriMoiSongB = tiLe.phai;
            }

            // Hoan doi / dich chuyen vi tri doi xung song C va D
            chiSoCapCD = (chiSoCapCD + 1) % danhSachCapViTriCD.length;
            viTriMoiSongC = danhSachCapViTriCD[chiSoCapCD].c;
            viTriMoiSongD = danhSachCapViTriCD[chiSoCapCD].d;
          }
        }



        if (dangTrongChuKyNhip) {

          soKhungHinhNhip++;

          if (dangNhayLen) {

            mucZoomHienTai += (mucZoomDich - mucZoomHienTai) * 0.25;

            doCaoHienTaiA += (doCaoSongDichA - doCaoHienTaiA) * 0.25;

            doCaoHienTaiB += (doCaoSongDichB - doCaoHienTaiB) * 0.25;



            if (soKhungHinhNhip >= 9 || (mucZoomHienTai >= mucZoomDich - 0.003 && doCaoHienTaiA >= doCaoSongDichA - 3)) {

              dangNhayLen = false;

              mucZoomDinh = mucZoomHienTai;

              doCaoDinhA = doCaoHienTaiA;

              doCaoDinhB = doCaoHienTaiB;

            }

          } else {

            mucZoomHienTai = 1.0 + (mucZoomHienTai - 1.0) * 0.935;

            doCaoHienTaiA = Math.max(0, doCaoHienTaiA * 0.935);

            doCaoHienTaiB = Math.max(0, doCaoHienTaiB * 0.935);



            const daThuXongZoom = Math.abs(mucZoomHienTai - 1.0) <= 0.003;

            const daThuXongSong = doCaoHienTaiA <= 2 && doCaoHienTaiB <= 2;

            if ((daThuXongZoom && daThuXongSong) || soKhungHinhNhip >= 60) {

              mucZoomHienTai = 1.0;

              doCaoHienTaiA = 0;

              doCaoHienTaiB = 0;

              dangTrongChuKyNhip = false;

              dangNhayLen = false;

              soKhungHinhNhip = 0;

            }

          }

        } else {

          if (mucZoomHienTai > 1.0) {

            mucZoomHienTai = 1.0 + (mucZoomHienTai - 1.0) * 0.90;

            if (mucZoomHienTai <= 1.002) mucZoomHienTai = 1.0;

          }

          if (doCaoHienTaiA > 0) doCaoHienTaiA = Math.max(0, doCaoHienTaiA * 0.90);

          if (doCaoHienTaiB > 0) doCaoHienTaiB = Math.max(0, doCaoHienTaiB * 0.90);

        }



        const tongZoom = Math.min(1.10, mucZoomHienTai);



        if (trackPageArtworkWrap) {

          if (tongZoom > 1.001) {

            trackPageArtworkWrap.style.transform = `scale(${tongZoom.toFixed(4)})`;

          } else if (trackPageArtworkWrap.style.transform !== '') {

            trackPageArtworkWrap.style.transform = '';

          }

          const doLech = tongZoom - 1.0;

          if (doLech > 0.002) {

            const doNhoe = 24 + doLech * 170;

            const doLan = doLech * 40;

            const doTrong = Math.min(0.42, doLech * 3.8);

            trackPageArtworkWrap.style.boxShadow = `0 18px ${doNhoe.toFixed(1)}px rgba(0, 0, 0, 0.75), 0 4px 16px rgba(0, 0, 0, 0.50), 0 0 ${doLan.toFixed(1)}px rgba(var(--accent-rgb, 139, 92, 246), ${doTrong.toFixed(3)})`;

          } else {

            trackPageArtworkWrap.style.boxShadow = '';

          }

        }



        CapNhatChuyenDongNenSoTam(performance.now());



        // Chuyen dong va thu hoi uyen chuyen, cham rai cua Song C (Snare / Clap)
        if (dangTrongChuKyC) {
          soKhungHinhC++;
          if (dangNhayLenC) {
            doCaoHienTaiC += (doCaoSongDichC - doCaoHienTaiC) * 0.12;
            if (soKhungHinhC >= 10 || doCaoHienTaiC >= doCaoSongDichC - 2.5) {
              dangNhayLenC = false;
              doCaoDinhC = doCaoHienTaiC;
            }
          } else {
            doCaoHienTaiC = Math.max(0, doCaoHienTaiC * 0.94);
            if (doCaoHienTaiC <= 2 || soKhungHinhC >= 60) {
              doCaoHienTaiC = 0;
              dangTrongChuKyC = false;
              dangNhayLenC = false;
              soKhungHinhC = 0;
            }
          }
        } else {
          if (doCaoHienTaiC > 0) {
            doCaoHienTaiC = Math.max(0, doCaoHienTaiC * 0.90);
            if (doCaoHienTaiC <= 0.5) doCaoHienTaiC = 0;
          }
        }

        // Chuyen dong va thu hoi uyen chuyen, cham rai cua Song D (Hi-Hat / Shaker)
        if (dangTrongChuKyD) {
          soKhungHinhD++;
          if (dangNhayLenD) {
            doCaoHienTaiD += (doCaoSongDichD - doCaoHienTaiD) * 0.12;
            if (soKhungHinhD >= 10 || doCaoHienTaiD >= doCaoSongDichD - 2.5) {
              dangNhayLenD = false;
              doCaoDinhD = doCaoHienTaiD;
            }
          } else {
            doCaoHienTaiD = Math.max(0, doCaoHienTaiD * 0.94);
            if (doCaoHienTaiD <= 2 || soKhungHinhD >= 60) {
              doCaoHienTaiD = 0;
              dangTrongChuKyD = false;
              dangNhayLenD = false;
              soKhungHinhD = 0;
            }
          }
        } else {
          if (doCaoHienTaiD > 0) {
            doCaoHienTaiD = Math.max(0, doCaoHienTaiD * 0.90);
            if (doCaoHienTaiD <= 0.5) doCaoHienTaiD = 0;
          }
        }

        viTriHienTaiA += (viTriMoiSongA - viTriHienTaiA) * 0.08;
        viTriHienTaiB += (viTriMoiSongB - viTriHienTaiB) * 0.08;
        viTriHienTaiC += (viTriMoiSongC - viTriHienTaiC) * 0.06;
        viTriHienTaiD += (viTriMoiSongD - viTriHienTaiD) * 0.06;

        VeHaiLuongSongNhac();
        VeHaiDuongSangChuL();
      } else {
        dangTrongChuKyNhip = false;
        dangNhayLen = false;
        soKhungHinhNhip = 0;
        dangTrongChuKyC = false;
        dangTrongChuKyD = false;
        dangNhayLenC = false;
        dangNhayLenD = false;
        soKhungHinhC = 0;
        soKhungHinhD = 0;

        if (mucZoomHienTai > 1.001) {

          mucZoomHienTai = 1.0 + (mucZoomHienTai - 1.0) * 0.88;

        } else {

          mucZoomHienTai = 1.0;

        }



        if (trackPageArtworkWrap) {

          if (mucZoomHienTai > 1.001) {

            trackPageArtworkWrap.style.transform = `scale(${mucZoomHienTai.toFixed(4)})`;

          } else if (trackPageArtworkWrap.style.transform !== '') {

            trackPageArtworkWrap.style.transform = '';

          }

          trackPageArtworkWrap.style.boxShadow = '';

        }



        CapNhatChuyenDongNenSoTam(performance.now());



        doCaoHienTaiA = Math.max(0, doCaoHienTaiA * 0.85);

        doCaoHienTaiB = Math.max(0, doCaoHienTaiB * 0.85);

        doCaoHienTaiC = Math.max(0, doCaoHienTaiC * 0.85);

        doCaoHienTaiD = Math.max(0, doCaoHienTaiD * 0.85);

        VeHaiLuongSongNhac();

        VeHaiDuongSangChuL();

      }



      khungHinhNhip = requestAnimationFrame(XuLiKhungHinh);

    }



    khungHinhNhip = requestAnimationFrame(XuLiKhungHinh);

  }



  // --- View Switching ---

  // XU LI CHUYEN DOI GIAO DIEN VA DONG MO TRANG CHI TIET BAI HAT
  function switchView(targetView, playlistId = null) {

    if (targetView !== 'track-detail' && isTrackPageOpen) {

      DongMenuChiTiet();

      DungPhanTichNhip();

      isTrackPageOpen = false;

      document.body.classList.remove('in-track-page');

    }



    activeView = targetView;

    navItems.forEach(i => i.classList.remove('active'));

    document.querySelectorAll('.sidebar-playlist-item').forEach(i => i.classList.remove('active'));



    if (mainContent) mainContent.setAttribute('data-active-view', targetView);

    if (topHeader) topHeader.style.display = targetView === 'explore' ? 'flex' : 'none';



    if (viewHome) viewHome.style.display = targetView === 'home' ? 'flex' : 'none';

    if (viewExplore) viewExplore.style.display = targetView === 'explore' ? 'flex' : 'none';

    if (viewLibrary) viewLibrary.style.display = targetView === 'library' ? 'flex' : 'none';

    if (viewPlaylist) viewPlaylist.style.display = targetView === 'playlist' ? 'flex' : 'none';

    if (viewTrackDetail) viewTrackDetail.style.display = targetView === 'track-detail' ? 'flex' : 'none';



    if (targetView === 'home') {

      document.querySelector('.nav-item[data-view="home"]')?.classList.add('active');

      renderHomeScreen();

    } else if (targetView === 'explore') {

      document.querySelector('.nav-item[data-view="explore"]')?.classList.add('active');

    } else if (targetView === 'library') {

      document.querySelector('.nav-item[data-view="library"]')?.classList.add('active');

      updateLibraryUI();

    } else if (targetView === 'playlist' && playlistId) {

      const activeSidebarItem = document.querySelector(`.sidebar-playlist-item[data-id="${playlistId}"]`);

      if (activeSidebarItem) activeSidebarItem.classList.add('active');

      renderPlaylistView(playlistId);

    } else if (targetView === 'track-detail') {

      isTrackPageOpen = true;

      document.body.classList.add('in-track-page');

      if (currentTrack) updateTrackPageUI(currentTrack);

      KhoiTaoCanvasSongNhac();

      KhoiTaoCanvasGocChuL();

      BatDauPhanTichNhip();

    }

  }



  function openTrackPage(trackToOpen = null, context = null, index = 0) {

    const target = trackToOpen || currentTrack;

    if (!target) return;



    if (activeView !== 'track-detail') {

      previousView = activeView || 'home';

    }



    const isDifferentTrack = !currentTrack || currentTrack.id !== target.id || currentTrack.source !== target.source;



    isTrackPageOpen = true;

    document.body.classList.add('in-track-page');

    switchView('track-detail');

    CapNhatGiaoDienThuGon(cheDoThuGonTrangPhat);

    updateTrackPageUI(target);

    BatDauPhanTichNhip();

    KichHoatHoatAnhDiaThanTuDong();



    if (isDifferentTrack) {

      playTrack(target, context, index);

    }

  }



  function closeTrackPage() {

    DongMenuChiTiet();

    DungPhanTichNhip();

    ThuDiaThanVao(true);

    if (!isTrackPageOpen && activeView !== 'track-detail') return;

    isTrackPageOpen = false;

    document.body.classList.remove('in-track-page');

    switchView(previousView || 'home', currentPlaylistId);

  }



  // ========================================================
  // QUẢN LÝ GIF STICKER TRÊN NỀN SÓNG NHẠC (THEO TỪNG BÀI HÁT)
  // ========================================================
  let danhSachStickerHienTai = []; // Sticker của bài hát đang phát
  let danhSachStickerModal = [];   // Sticker đang chỉnh sửa trong popup
  const boNhoDemGocGif = new Map();     // url -> ArrayBuffer (dữ liệu file gốc)
  const boNhoBlobGifTocDo = new Map();  // `${url}@${spd}` -> Blob URL đã chỉnh tốc độ

  // XU LI HIEN THI VA AN THANH CONG CU GIF (3 CHAMS)
  // Lắng nghe bấm chuột ra ngoài hoặc bấm vào gif (ngoài nút 3 chấm và toolbar) để ẩn thanh công cụ
  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.gif-sticker-toolbar') && !e.target.closest('.gif-sticker-more-btn')) {
      trackPageStickersLayer?.querySelectorAll('.gif-sticker-item.toolbar-open, .gif-sticker-item.is-active').forEach(item => {
        item.classList.remove('toolbar-open');
        item.classList.remove('is-active');
      });
    }
  });

  // Tải buffer nguyên bản của file GIF
  // XU LI HIEN THI STICKER (GIF) VA DONG BO KHUNG HINH
  async function LayBufferGocGif(url) {
    if (boNhoDemGocGif.has(url)) return boNhoDemGocGif.get(url);
    try {
      const resp = await fetch(url);
      if (!resp.ok) return null;
      const buf = await resp.arrayBuffer();
      boNhoDemGocGif.set(url, buf);
      return buf;
    } catch (err) {
      console.warn('Lỗi đọc GIF buffer:', err);
      return null;
    }
  }

  // Tạo URL Blob cho file GIF đã điều chỉnh tốc độ khung hình (sửa Graphic Control Extension 0x21 0xF9 0x04)
  async function LayUrlGifTheoTocDo(url, tocDo = 1.0) {
    const spd = Math.max(0.2, Math.min(parseFloat(tocDo) || 1.0, 3.5));
    const spdKey = spd.toFixed(1);
    if (spdKey === '1.0') {
      return url; // Tốc độ gốc 1.0x dùng trực tiếp url
    }

    const cacheKey = `${url}@${spdKey}`;
    if (boNhoBlobGifTocDo.has(cacheKey)) {
      return boNhoBlobGifTocDo.get(cacheKey);
    }

    const origBuffer = await LayBufferGocGif(url);
    if (!origBuffer) return url;

    // Nhân bản mảng byte để điều chỉnh delay time của các frame
    const bytes = new Uint8Array(origBuffer.slice(0));
    const len = bytes.length;

    for (let i = 0; i < len - 7; i++) {
      if (bytes[i] === 0x21 && bytes[i + 1] === 0xF9 && bytes[i + 2] === 0x04) {
        let origDelay = bytes[i + 4] | (bytes[i + 5] << 8);
        if (origDelay <= 1) origDelay = 10; // Chuẩn hóa delay 0 hoặc 1 thành 10 (100ms)

        let newDelay = Math.round(origDelay / spd);
        if (newDelay < 2) newDelay = 2; // Giới hạn tối thiểu 20ms (trình duyệt không hỗ trợ < 2)
        if (newDelay > 65535) newDelay = 65535;

        bytes[i + 4] = newDelay & 0xFF;
        bytes[i + 5] = (newDelay >> 8) & 0xFF;
        i += 7;
      }
    }

    const blob = new Blob([bytes], { type: 'image/gif' });
    const blobUrl = URL.createObjectURL(blob);
    boNhoBlobGifTocDo.set(cacheKey, blobUrl);
    return blobUrl;
  }

  // Tự động lưu vị trí / kích thước / tốc độ sticker của bài hát đang phát
  async function LuuTuDongStickerBaiHatHienTai() {
    if (!currentTrack) return;
    const maBaiHat = String(currentTrack.id || '');
    const nguonBaiHat = (currentTrack.source || '').toLowerCase();
    const khoa = `${nguonBaiHat}:${maBaiHat}`;
    const khoaKhongTienTo = `${nguonBaiHat}:${maBaiHat.replace(/^(sc_|sp_|yt_)/, '')}`;

    let caiDat = boNhoAnhNen.get(khoa) || boNhoAnhNen.get(khoaKhongTienTo) || {};
    caiDat = {
      ...caiDat,
      gifs: JSON.parse(JSON.stringify(danhSachStickerHienTai))
    };
    await LuuCaiDatAnhNenBaiHat(khoa, caiDat);
    boNhoAnhNen.set(khoa, caiDat);
    boNhoAnhNen.set(khoaKhongTienTo, caiDat);
  }

  // Đồng bộ khung hình (frame sync) cho tất cả các GIF cùng loại (cùng src)
  function DongBoKhungHinhTatCaGif() {
    if (!trackPageStickersLayer) return;
    const groupsBySrc = new Map();
    trackPageStickersLayer.querySelectorAll('.gif-sticker-img').forEach(img => {
      const rawSrc = img.src;
      if (!groupsBySrc.has(rawSrc)) {
        groupsBySrc.set(rawSrc, []);
      }
      groupsBySrc.get(rawSrc).push(img);
    });

    groupsBySrc.forEach((imgs, srcUrl) => {
      if (imgs.length > 1) {
        requestAnimationFrame(() => {
          imgs.forEach(img => {
            img.src = srcUrl;
          });
        });
      }
    });
  }

  // Cập nhật danh sách sticker hiển thị trên cửa sổ sóng nhạc (hỗ trợ nhiều GIF độc lập)
  let phienCapNhatSticker = 0;
  async function CapNhatStickerTrangPhat(stickers = []) {
    if (!trackPageStickersLayer) return;

    const currentToken = ++phienCapNhatSticker;
    danhSachStickerHienTai = Array.isArray(stickers) ? JSON.parse(JSON.stringify(stickers)) : [];

    if (!danhSachStickerHienTai.length) {
      trackPageStickersLayer.innerHTML = '';
      return;
    }

    // Đồng bộ tốc độ cho các sticker có cùng src (những gif giống nhau sẽ có cùng nhịp tốc độ)
    const speedMapBySrc = {};
    for (const s of danhSachStickerHienTai) {
      const spd = parseFloat(s.speed) || 1.0;
      if (speedMapBySrc[s.src] === undefined) {
        speedMapBySrc[s.src] = spd;
      }
    }
    for (const s of danhSachStickerHienTai) {
      s.speed = speedMapBySrc[s.src];
    }

    // Tải trước blob URLs cho tất cả các cặp (src, speed)
    const urlMap = new Map();
    for (const s of danhSachStickerHienTai) {
      const spd = parseFloat(s.speed) || 1.0;
      const key = `${s.src}@${spd.toFixed(1)}`;
      if (!urlMap.has(key)) {
        const u = await LayUrlGifTheoTocDo(s.src, spd);
        urlMap.set(key, u);
      }
    }

    // Nếu đã có phiên render mới hơn thì dừng phiên cũ
    if (currentToken !== phienCapNhatSticker) return;

    trackPageStickersLayer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (const sticker of danhSachStickerHienTai) {
      const spd = parseFloat(sticker.speed) || 1.0;
      const key = `${sticker.src}@${spd.toFixed(1)}`;
      const resolvedUrl = urlMap.get(key) || sticker.src;

      const el = TaoPhanTuStickerTrenTrang(sticker, resolvedUrl);
      fragment.appendChild(el);
    }

    trackPageStickersLayer.appendChild(fragment);

    // Kích hoạt đồng bộ khung hình cho tất cả các ảnh GIF cùng src
    DongBoKhungHinhTatCaGif();
  }

  // Tạo một phần tử sticker trên layer trang chi tiết
  function TaoPhanTuStickerTrenTrang(sticker, initialUrl) {
    const el = document.createElement('div');
    el.className = 'gif-sticker-item';
    el.dataset.id = sticker.id;
    el.style.left = `${Math.max(0, Math.min(sticker.x ?? 50, 85))}%`;
    el.style.top = `${Math.max(8, Math.min(sticker.y ?? 50, 85))}%`;
    el.style.width = `${sticker.size || 120}px`;

    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'gif-sticker-media';

    const currentSpeed = parseFloat(sticker.speed) || 1.0;

    const img = document.createElement('img');
    img.src = initialUrl;
    img.alt = '';
    img.className = 'gif-sticker-img';
    mediaWrap.appendChild(img);
    el.appendChild(mediaWrap);

    // Floating toolbar nhanh trên màn hình
    const toolbar = document.createElement('div');
    toolbar.className = 'gif-sticker-toolbar';

    // Ngăn chặn sự kiện chuột/pointer nổi bọt lên phần tử cha (el)
    ['pointerdown', 'mousedown', 'touchstart', 'pointerup', 'mouseup', 'click'].forEach(evtName => {
      toolbar.addEventListener(evtName, (e) => {
        e.stopPropagation();
      });
    });

    // Nút 3 chấm trên từng GIF để bật/tắt thanh tùy chỉnh
    const btnMore = document.createElement('button');
    btnMore.type = 'button';
    btnMore.className = 'gif-sticker-more-btn';
    btnMore.title = 'Tùy chỉnh GIF này';
    btnMore.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2.2"></circle><circle cx="12" cy="12" r="2.2"></circle><circle cx="12" cy="19" r="2.2"></circle></svg>';

    ['pointerdown', 'mousedown', 'touchstart'].forEach(evt => {
      btnMore.addEventListener(evt, (e) => e.stopPropagation());
    });

    btnMore.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const wasOpen = el.classList.contains('toolbar-open');
      trackPageStickersLayer?.querySelectorAll('.gif-sticker-item.toolbar-open').forEach(other => {
        other.classList.remove('toolbar-open');
      });
      if (!wasOpen) {
        el.classList.add('toolbar-open');
      }
    });
    el.appendChild(btnMore);

    // Hàm cập nhật tốc độ phát (đồng bộ cho tất cả các GIF cùng loại)
    const capNhatTocDo = async (newSpd) => {
      let spd = Math.max(0.2, Math.min(parseFloat(newSpd) || 1.0, 3.5));
      spd = Math.round(spd * 10) / 10;

      // Cập nhật tốc độ mới cho file GIF
      const newUrl = await LayUrlGifTheoTocDo(sticker.src, spd);

      // Đồng bộ toàn bộ các GIF cùng loại (cùng src) trên màn hình sóng nhạc
      danhSachStickerHienTai.forEach(s => {
        if (s.src === sticker.src) {
          s.speed = spd;
          const targetEl = trackPageStickersLayer?.querySelector(`.gif-sticker-item[data-id="${s.id}"]`);
          if (targetEl) {
            const targetImg = targetEl.querySelector('.gif-sticker-img');
            if (targetImg) targetImg.src = newUrl;
            const targetSpeedText = targetEl.querySelector('.gif-tool-speed-text');
            if (targetSpeedText) targetSpeedText.textContent = `${spd.toFixed(1)}x`;
            const targetSlider = targetEl.querySelector('.gif-tool-speed-slider-wrap input');
            if (targetSlider) targetSlider.value = spd.toFixed(1);
          }
        }
      });

      // Đồng bộ vào popup nếu đang mở
      danhSachStickerModal.forEach(s => {
        if (s.src === sticker.src) s.speed = spd;
      });
      if (editStickersActiveList) {
        editStickersActiveList.querySelectorAll('.active-sticker-row').forEach(row => {
          const rId = row.dataset.id;
          const rSticker = danhSachStickerModal.find(s => s.id === rId);
          if (rSticker && rSticker.src === sticker.src) {
            const modalSlider = row.querySelector('.active-sticker-speed-slider');
            const modalBadge = row.querySelector('.active-sticker-speed-badge');
            if (modalSlider) modalSlider.value = spd.toFixed(1);
            if (modalBadge) modalBadge.textContent = `${spd.toFixed(1)}x`;
          }
        });
      }

      DongBoKhungHinhTatCaGif();
      LuuTuDongStickerBaiHatHienTai();
    };

    // Nút giảm tốc độ
    const btnSpeedDec = document.createElement('button');
    btnSpeedDec.type = 'button';
    btnSpeedDec.className = 'gif-tool-btn';
    btnSpeedDec.title = 'Giảm tốc độ phát (đồng bộ các GIF cùng loại)';
    btnSpeedDec.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
    btnSpeedDec.addEventListener('click', (e) => {
      e.stopPropagation();
      capNhatTocDo((parseFloat(sticker.speed) || 1.0) - 0.2);
    });

    // Nhãn hiển thị tốc độ
    const speedWrap = document.createElement('div');
    speedWrap.className = 'gif-tool-speed-badge-wrap';
    speedWrap.title = 'Bấm để đổi nhanh các mốc tốc độ';
    const speedIcon = document.createElement('span');
    speedIcon.className = 'gif-tool-speed-icon';
    speedIcon.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';

    const speedText = document.createElement('span');
    speedText.className = 'gif-tool-speed-text';
    speedText.textContent = `${currentSpeed.toFixed(1)}x`;

    const CAC_MOC_TOC_DO = [0.5, 1.0, 1.5, 2.0, 2.5];
    speedWrap.addEventListener('click', (e) => {
      e.stopPropagation();
      const cur = parseFloat(sticker.speed) || 1.0;
      const idx = CAC_MOC_TOC_DO.findIndex(v => Math.abs(v - cur) < 0.1);
      const nextSpd = CAC_MOC_TOC_DO[(idx + 1) % CAC_MOC_TOC_DO.length];
      capNhatTocDo(nextSpd);
    });
    speedWrap.appendChild(speedIcon);
    speedWrap.appendChild(speedText);

    // Nút tăng tốc độ
    const btnSpeedInc = document.createElement('button');
    btnSpeedInc.type = 'button';
    btnSpeedInc.className = 'gif-tool-btn';
    btnSpeedInc.title = 'Tăng tốc độ phát (đồng bộ các GIF cùng loại)';
    btnSpeedInc.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
    btnSpeedInc.addEventListener('click', (e) => {
      e.stopPropagation();
      capNhatTocDo((parseFloat(sticker.speed) || 1.0) + 0.2);
    });

    // Thanh trượt tốc độ phát
    const speedSliderWrap = document.createElement('div');
    speedSliderWrap.className = 'gif-tool-speed-slider-wrap';
    speedSliderWrap.title = 'Kéo để chỉnh tốc độ phát (0.2x - 3.0x)';
    const speedSlider = document.createElement('input');
    speedSlider.type = 'range';
    speedSlider.min = '0.2';
    speedSlider.max = '3.0';
    speedSlider.step = '0.1';
    speedSlider.value = currentSpeed.toFixed(1);
    speedSlider.addEventListener('input', (e) => {
      e.stopPropagation();
      capNhatTocDo(parseFloat(e.target.value));
    });
    speedSliderWrap.appendChild(speedSlider);

    // Phân cách 1
    const divider1 = document.createElement('div');
    divider1.className = 'gif-tool-divider';

    // Nút thu nhỏ kích thước (độc lập cho riêng GIF này)
    const btnSizeDec = document.createElement('button');
    btnSizeDec.type = 'button';
    btnSizeDec.className = 'gif-tool-btn';
    btnSizeDec.title = 'Thu nhỏ kích thước GIF này';
    btnSizeDec.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
    btnSizeDec.addEventListener('click', (e) => {
      e.stopPropagation();
      let sz = Math.max(50, (parseInt(sticker.size, 10) || 120) - 20);
      sticker.size = sz;
      el.style.width = `${sz}px`;
      sizeText.textContent = `${sz}px`;
      LuuTuDongStickerBaiHatHienTai();
    });

    // Nhãn kích thước
    const sizeText = document.createElement('span');
    sizeText.className = 'gif-tool-size-text';
    sizeText.textContent = `${sticker.size || 120}px`;

    // Nút phóng to kích thước (độc lập cho riêng GIF này)
    const btnSizeInc = document.createElement('button');
    btnSizeInc.type = 'button';
    btnSizeInc.className = 'gif-tool-btn';
    btnSizeInc.title = 'Phóng to kích thước GIF này';
    btnSizeInc.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
    btnSizeInc.addEventListener('click', (e) => {
      e.stopPropagation();
      let sz = Math.min(400, (parseInt(sticker.size, 10) || 120) + 20);
      sticker.size = sz;
      el.style.width = `${sz}px`;
      sizeText.textContent = `${sz}px`;
      LuuTuDongStickerBaiHatHienTai();
    });

    // Phân cách 2
    const divider2 = document.createElement('div');
    divider2.className = 'gif-tool-divider';

    // Nút xóa (chỉ xóa duy nhất GIF này)
    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'gif-tool-delete-btn';
    delBtn.title = 'Xóa riêng GIF này';
    delBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      danhSachStickerHienTai = danhSachStickerHienTai.filter(s => s.id !== sticker.id);
      el.remove();
      LuuTuDongStickerBaiHatHienTai();

      danhSachStickerModal = danhSachStickerModal.filter(s => s.id !== sticker.id);
      CapNhatDanhSachStickerModal();
      KhoiTaoGridStickerModal();
      showToast('<span>Đã xóa GIF</span>', 'info', 1200);
    });

    toolbar.appendChild(btnSpeedDec);
    toolbar.appendChild(speedWrap);
    toolbar.appendChild(btnSpeedInc);
    toolbar.appendChild(speedSliderWrap);
    toolbar.appendChild(divider1);
    toolbar.appendChild(btnSizeDec);
    toolbar.appendChild(sizeText);
    toolbar.appendChild(btnSizeInc);
    toolbar.appendChild(divider2);
    toolbar.appendChild(delBtn);
    el.appendChild(toolbar);

    // Nút kéo góc để zoom kích thước GIF trực tiếp ("kéo zoom gif to ra")
    const resizer = document.createElement('div');
    resizer.className = 'gif-sticker-resizer';
    resizer.title = 'Kéo góc để phóng to / thu nhỏ GIF';
    resizer.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>';
    el.appendChild(resizer);

    // Xử lý kéo góc zoom GIF trực tiếp trên màn hình (độc lập)
    let dangZoom = false;
    let startZoomX = 0;
    let startWidth = 0;

    resizer.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      dangZoom = true;
      resizer.setPointerCapture(e.pointerId);
      el.classList.add('is-active');
      startZoomX = e.clientX;
      startWidth = el.offsetWidth;
    });

    resizer.addEventListener('pointermove', (e) => {
      if (!dangZoom) return;
      e.stopPropagation();
      e.preventDefault();
      const dx = e.clientX - startZoomX;
      let newSz = Math.round(startWidth + dx);
      newSz = Math.max(50, Math.min(newSz, 400));
      sticker.size = newSz;
      el.style.width = `${newSz}px`;
      sizeText.textContent = `${newSz}px`;
    });

    const ketThucZoom = (e) => {
      if (!dangZoom) return;
      dangZoom = false;
      try { resizer.releasePointerCapture(e.pointerId); } catch (_) {}
      LuuTuDongStickerBaiHatHienTai();
    };

    resizer.addEventListener('pointerup', ketThucZoom);
    resizer.addEventListener('pointercancel', ketThucZoom);

    // Kéo thả vị trí tự do (Pointer Events - độc lập cho từng GIF)
    let dangKeo = false;
    let startX = 0;
    let startY = 0;
    let initialLeftPx = 0;
    let initialTopPx = 0;

    el.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.gif-sticker-toolbar') || e.target.closest('.gif-sticker-resizer')) return;
      dangKeo = true;
      el.classList.add('is-dragging');
      el.classList.add('is-active');
      el.setPointerCapture(e.pointerId);

      const parentRect = (viewTrackDetail || trackPageStickersLayer).getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      initialLeftPx = elRect.left - parentRect.left;
      initialTopPx = elRect.top - parentRect.top;
      e.preventDefault();
      e.stopPropagation();
    });

    el.addEventListener('pointermove', (e) => {
      if (!dangKeo) return;
      const parentRect = (viewTrackDetail || trackPageStickersLayer).getBoundingClientRect();
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let curLeftPx = initialLeftPx + dx;
      let curTopPx = initialTopPx + dy;

      curLeftPx = Math.max(0, Math.min(curLeftPx, parentRect.width - el.offsetWidth));
      curTopPx = Math.max(45, Math.min(curTopPx, parentRect.height - el.offsetHeight));

      const leftPct = (curLeftPx / parentRect.width) * 100;
      const topPct = (curTopPx / parentRect.height) * 100;

      el.style.left = `${leftPct.toFixed(2)}%`;
      el.style.top = `${topPct.toFixed(2)}%`;
      sticker.x = parseFloat(leftPct.toFixed(2));
      sticker.y = parseFloat(topPct.toFixed(2));
      e.preventDefault();
      e.stopPropagation();
    });

    const ketThucKeo = (e) => {
      if (!dangKeo) return;
      dangKeo = false;
      el.classList.remove('is-dragging');
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}
      LuuTuDongStickerBaiHatHienTai();
    };

    el.addEventListener('pointerup', ketThucKeo);
    el.addEventListener('pointercancel', ketThucKeo);

    return el;
  }

  // Danh sách GIF có thể chọn trong popup edit bài hát
  let danhSachGifsKhaDung = null;
  async function KhoiTaoGridStickerModal() {
    if (!editStickersGrid) return;
    if (!danhSachGifsKhaDung) {
      try {
        danhSachGifsKhaDung = await api.getAvailableGifs();
      } catch (err) {
        console.warn('Lỗi lấy danh sách GIF:', err);
        danhSachGifsKhaDung = ['Gif/duck.gif', 'Gif/gojo.gif', 'Gif/iloveyou.gif', 'Gif/lonely.gif', 'Gif/teddy.gif', 'Gif/usagyuuun.gif'];
      }
    }

    editStickersGrid.innerHTML = '';

    (danhSachGifsKhaDung || []).forEach((gifPath) => {
      const card = document.createElement('div');
      card.className = 'sticker-thumb-card';
      card.dataset.src = gifPath;
      card.title = 'Bấm để thêm GIF này vào bài hát (có thể thêm nhiều GIF độc lập)';

      const count = (danhSachStickerModal || []).filter(s => s.src === gifPath).length;
      if (count > 0) {
        card.classList.add('is-selected');
        const badge = document.createElement('span');
        badge.className = 'sticker-thumb-count-badge';
        badge.textContent = count;
        card.appendChild(badge);
      }

      const img = document.createElement('img');
      img.src = gifPath;
      img.alt = '';
      card.appendChild(img);

      card.addEventListener('click', async () => {
        // Thêm một GIF mới độc lập
        const total = (danhSachStickerModal || []).length;
        const offset = (total % 6) * 10;
        // Nếu đã có GIF cùng loại, dùng chung tốc độ để đồng bộ nhịp chuyển động
        const sameSrc = (danhSachStickerModal || []).find(s => s.src === gifPath);
        const initSpeed = sameSrc ? (parseFloat(sameSrc.speed) || 1.0) : 1.0;

        const newSticker = {
          id: `gif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          src: gifPath,
          x: Math.min(75, 20 + offset),
          y: Math.min(70, 25 + offset),
          size: 130,
          speed: initSpeed
        };

        danhSachStickerModal.push(newSticker);
        KhoiTaoGridStickerModal();
        CapNhatDanhSachStickerModal();

        // Đồng bộ thêm ngay lập tức lên màn hình ngoài giao diện nếu đang sửa bài đang phát
        const laBaiDangPhat = currentTrack && editingTrackData && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, editingTrackData.id, editingTrackData.source);
        if (laBaiDangPhat) {
          danhSachStickerHienTai.push(newSticker);
          if (trackPageStickersLayer) {
            const resolvedUrl = (initSpeed === 1.0) ? newSticker.src : await LayUrlGifTheoTocDo(newSticker.src, initSpeed);
            const stickerEl = TaoPhanTuStickerTrenTrang(newSticker, resolvedUrl);
            trackPageStickersLayer.appendChild(stickerEl);
            DongBoKhungHinhTatCaGif();
          }
          await LuuTuDongStickerBaiHatHienTai();
        } else if (editingTrackData) {
          const maBaiHat = String(editingTrackData.id || '');
          const nguonBaiHat = (editingTrackData.source || '').toLowerCase();
          const khoa = `${nguonBaiHat}:${maBaiHat}`;
          const khoaKhongTienTo = `${nguonBaiHat}:${maBaiHat.replace(/^(sc_|sp_|yt_)/, '')}`;
          let caiDat = boNhoAnhNen.get(khoa) || boNhoAnhNen.get(khoaKhongTienTo) || {};
          caiDat = { ...caiDat, gifs: JSON.parse(JSON.stringify(danhSachStickerModal)) };
          boNhoAnhNen.set(khoa, caiDat);
          boNhoAnhNen.set(khoaKhongTienTo, caiDat);
          await LuuCaiDatAnhNenBaiHat(khoa, caiDat);
        }

        showToast(`<span>Đã thêm GIF (${danhSachStickerModal.length} GIF)</span>`, 'success', 1200);
      });

      editStickersGrid.appendChild(card);
    });
  }

  function CapNhatDanhSachStickerModal() {
    if (!editStickersActiveContainer || !editStickersActiveList) return;
    if (!danhSachStickerModal || danhSachStickerModal.length === 0) {
      editStickersActiveContainer.style.display = 'none';
      editStickersActiveList.innerHTML = '';
      editStickersGrid?.querySelectorAll('.sticker-thumb-card').forEach(c => {
        c.classList.remove('is-selected');
        c.querySelector('.sticker-thumb-count-badge')?.remove();
      });
      return;
    }

    editStickersActiveContainer.style.display = 'block';
    editStickersActiveList.innerHTML = '';

    // Cập nhật số lượng trên các thẻ grid
    editStickersGrid?.querySelectorAll('.sticker-thumb-card').forEach(c => {
      const src = c.dataset.src;
      const count = danhSachStickerModal.filter(s => s.src === src).length;
      let badge = c.querySelector('.sticker-thumb-count-badge');
      if (count > 0) {
        c.classList.add('is-selected');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'sticker-thumb-count-badge';
          c.appendChild(badge);
        }
        badge.textContent = count;
      } else {
        c.classList.remove('is-selected');
        badge?.remove();
      }
    });

    danhSachStickerModal.forEach((sticker, index) => {
      const row = document.createElement('div');
      row.className = 'active-sticker-row';
      row.dataset.id = sticker.id;

      const img = document.createElement('img');
      img.src = sticker.src;
      img.alt = '';
      img.className = 'active-sticker-img';

      const infoWrap = document.createElement('div');
      infoWrap.className = 'active-sticker-info-wrap';
      infoWrap.style.display = 'flex';
      infoWrap.style.flexDirection = 'column';
      infoWrap.style.gap = '2px';
      infoWrap.style.minWidth = '60px';

      const nameText = document.createElement('span');
      nameText.style.fontSize = '11px';
      nameText.style.fontWeight = '600';
      nameText.style.color = '#ddd';
      const fileName = sticker.src.split('/').pop().replace('.gif', '');
      nameText.textContent = `#${index + 1} ${fileName}`;
      infoWrap.appendChild(nameText);

      const speedWrap = document.createElement('div');
      speedWrap.className = 'active-sticker-speed-wrap';

      const speedLbl = document.createElement('span');
      speedLbl.className = 'active-sticker-speed-label';
      speedLbl.textContent = 'Tốc độ:';

      const speedSlider = document.createElement('input');
      speedSlider.type = 'range';
      speedSlider.min = '0.2';
      speedSlider.max = '3.0';
      speedSlider.step = '0.1';
      const curSpeed = parseFloat(sticker.speed) || 1.0;
      speedSlider.value = curSpeed.toFixed(1);
      speedSlider.className = 'active-sticker-speed-slider';

      const speedBadge = document.createElement('span');
      speedBadge.className = 'active-sticker-speed-badge';
      speedBadge.textContent = `${curSpeed.toFixed(1)}x`;

      // Khi điều chỉnh tốc độ, đồng bộ tốc độ cho tất cả các GIF cùng loại (cùng src)
      speedSlider.addEventListener('input', async (e) => {
        const val = parseFloat(e.target.value) || 1.0;
        danhSachStickerModal.forEach(s => {
          if (s.src === sticker.src) {
            s.speed = val;
          }
        });
        editStickersActiveList.querySelectorAll('.active-sticker-row').forEach(r => {
          const rId = r.dataset.id;
          const rSticker = danhSachStickerModal.find(s => s.id === rId);
          if (rSticker && rSticker.src === sticker.src) {
            const sl = r.querySelector('.active-sticker-speed-slider');
            const bg = r.querySelector('.active-sticker-speed-badge');
            if (sl) sl.value = val.toFixed(1);
            if (bg) bg.textContent = `${val.toFixed(1)}x`;
          }
        });

        // Đồng bộ tốc độ ra ngoài màn hình ngay lập tức nếu là bài đang phát
        const laBaiDangPhat = currentTrack && editingTrackData && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, editingTrackData.id, editingTrackData.source);
        if (laBaiDangPhat) {
          const newUrl = await LayUrlGifTheoTocDo(sticker.src, val);
          danhSachStickerHienTai.forEach(s => {
            if (s.src === sticker.src) {
              s.speed = val;
              const targetEl = trackPageStickersLayer?.querySelector(`.gif-sticker-item[data-id="${s.id}"]`);
              if (targetEl) {
                const targetImg = targetEl.querySelector('.gif-sticker-img');
                if (targetImg) targetImg.src = newUrl;
                const targetSpeedText = targetEl.querySelector('.gif-tool-speed-text');
                if (targetSpeedText) targetSpeedText.textContent = `${val.toFixed(1)}x`;
                const targetSlider = targetEl.querySelector('.gif-tool-speed-slider-wrap input');
                if (targetSlider) targetSlider.value = val.toFixed(1);
              }
            }
          });
          DongBoKhungHinhTatCaGif();
          await LuuTuDongStickerBaiHatHienTai();
        } else if (editingTrackData) {
          const maBaiHat = String(editingTrackData.id || '');
          const nguonBaiHat = (editingTrackData.source || '').toLowerCase();
          const khoa = `${nguonBaiHat}:${maBaiHat}`;
          const khoaKhongTienTo = `${nguonBaiHat}:${maBaiHat.replace(/^(sc_|sp_|yt_)/, '')}`;
          let caiDat = boNhoAnhNen.get(khoa) || boNhoAnhNen.get(khoaKhongTienTo) || {};
          caiDat = { ...caiDat, gifs: JSON.parse(JSON.stringify(danhSachStickerModal)) };
          boNhoAnhNen.set(khoa, caiDat);
          boNhoAnhNen.set(khoaKhongTienTo, caiDat);
          await LuuCaiDatAnhNenBaiHat(khoa, caiDat);
        }
      });

      speedWrap.appendChild(speedLbl);
      speedWrap.appendChild(speedSlider);
      speedWrap.appendChild(speedBadge);

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'active-sticker-del-btn';
      delBtn.title = 'Xóa GIF này';
      delBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

      delBtn.addEventListener('click', async () => {
        const deletedId = sticker.id;
        danhSachStickerModal = danhSachStickerModal.filter(s => s.id !== deletedId);
        CapNhatDanhSachStickerModal();
        KhoiTaoGridStickerModal();

        // Đồng bộ xóa ngay trên màn hình ngoài nếu đang là bài hát đang phát
        const laBaiDangPhat = currentTrack && editingTrackData && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, editingTrackData.id, editingTrackData.source);
        if (laBaiDangPhat) {
          danhSachStickerHienTai = danhSachStickerHienTai.filter(s => s.id !== deletedId);
          const elTrenManHinh = trackPageStickersLayer?.querySelector(`.gif-sticker-item[data-id="${deletedId}"]`);
          if (elTrenManHinh) {
            elTrenManHinh.remove();
          }
          await LuuTuDongStickerBaiHatHienTai();
        } else if (editingTrackData) {
          const maBaiHat = String(editingTrackData.id || '');
          const nguonBaiHat = (editingTrackData.source || '').toLowerCase();
          const khoa = `${nguonBaiHat}:${maBaiHat}`;
          const khoaKhongTienTo = `${nguonBaiHat}:${maBaiHat.replace(/^(sc_|sp_|yt_)/, '')}`;
          let caiDat = boNhoAnhNen.get(khoa) || boNhoAnhNen.get(khoaKhongTienTo) || {};
          caiDat = { ...caiDat, gifs: JSON.parse(JSON.stringify(danhSachStickerModal)) };
          boNhoAnhNen.set(khoa, caiDat);
          boNhoAnhNen.set(khoaKhongTienTo, caiDat);
          await LuuCaiDatAnhNenBaiHat(khoa, caiDat);
        }

        showToast('<span>Đã xóa GIF</span>', 'info', 1200);
      });

      row.appendChild(img);
      row.appendChild(infoWrap);
      row.appendChild(speedWrap);
      row.appendChild(delBtn);
      editStickersActiveList.appendChild(row);
    });
  }

  btnClearAllStickers?.addEventListener('click', async () => {
    danhSachStickerModal = [];
    CapNhatDanhSachStickerModal();
    KhoiTaoGridStickerModal();

    const laBaiDangPhat = currentTrack && editingTrackData && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, editingTrackData.id, editingTrackData.source);
    if (laBaiDangPhat) {
      danhSachStickerHienTai = [];
      if (trackPageStickersLayer) {
        trackPageStickersLayer.innerHTML = '';
      }
      await LuuTuDongStickerBaiHatHienTai();
    } else if (editingTrackData) {
      const maBaiHat = String(editingTrackData.id || '');
      const nguonBaiHat = (editingTrackData.source || '').toLowerCase();
      const khoa = `${nguonBaiHat}:${maBaiHat}`;
      const khoaKhongTienTo = `${nguonBaiHat}:${maBaiHat.replace(/^(sc_|sp_|yt_)/, '')}`;
      let caiDat = boNhoAnhNen.get(khoa) || boNhoAnhNen.get(khoaKhongTienTo) || {};
      caiDat = { ...caiDat, gifs: [] };
      boNhoAnhNen.set(khoa, caiDat);
      boNhoAnhNen.set(khoaKhongTienTo, caiDat);
      await LuuCaiDatAnhNenBaiHat(khoa, caiDat);
    }

    showToast('<span>Đã xóa tất cả GIF</span>', 'info', 1400);
  });

  // XU LI GIAO DIEN TRANG CHI TIET BAI HAT (NOW PLAYING)
  async function CapNhatAnhNenTrangChiTiet(track) {

    if (!track) return;

    const curId = currentTrack?.id ? String(currentTrack.id) : '';

    const trackId = track.id ? String(track.id) : '';

    const curSource = (currentTrack?.source || '').toLowerCase();

    const trackSource = (track.source || '').toLowerCase();



    const isSameTrack = !currentTrack || SoSanhTrungBaiHat(curId, curSource, trackId, trackSource);

    if (!isSameTrack) return;



    const maBaiHat = String(track.id || '');

    const nguonBaiHat = (track.source || '').toLowerCase();

    const khoa = `${nguonBaiHat}:${maBaiHat}`;

    const khoaKhongTienTo = `${nguonBaiHat}:${maBaiHat.replace(/^(sc_|sp_|yt_)/, '')}`;



    let caiDat = boNhoAnhNen.get(khoa) || boNhoAnhNen.get(khoaKhongTienTo);

    if (!caiDat) {

      caiDat = await LayCaiDatAnhNenBaiHat(khoa);

      if (!caiDat && khoaKhongTienTo !== khoa) {

        caiDat = await LayCaiDatAnhNenBaiHat(khoaKhongTienTo);

      }

      if (caiDat) {

        boNhoAnhNen.set(khoa, caiDat);

        boNhoAnhNen.set(khoaKhongTienTo, caiDat);

      }

    }



    hieuUngTroiSoTam = (caiDat && caiDat.drift !== undefined) ? !!caiDat.drift : true;

    hieuUngVienChuC = (caiDat && caiDat.cornerNeon !== undefined) ? !!caiDat.cornerNeon : true;

    mauSongHienTaiA = (caiDat && caiDat.colorWaveA) ? caiDat.colorWaveA : (track?.colorWaveA || MAU_SONG_MAC_DINH_A);

    mauSongHienTaiB = (caiDat && caiDat.colorWaveB) ? caiDat.colorWaveB : (track?.colorWaveB || MAU_SONG_MAC_DINH_B);

    mauSongHienTaiC = (caiDat && caiDat.colorWaveC) ? caiDat.colorWaveC : (track?.colorWaveC || MAU_SONG_MAC_DINH_C);

    mauSongHienTaiD = (caiDat && caiDat.colorWaveD) ? caiDat.colorWaveD : (track?.colorWaveD || MAU_SONG_MAC_DINH_D);

    if (caiDat && caiDat.continuousWaveSwap !== undefined) {
      daoViTriSongLienTuc = !!caiDat.continuousWaveSwap;
    } else {
      daoViTriSongLienTuc = daoViTriSongToanCuc;
    }
    applyWaveSwapSettings();

    CapNhatStickerTrangPhat(caiDat?.gifs || []);

    if (!hieuUngVienChuC && nguCanhGocChuL && canvasGocChuL) {

      const dpr = window.devicePixelRatio || 1;

      nguCanhGocChuL.clearRect(0, 0, canvasGocChuL.width / dpr, canvasGocChuL.height / dpr);

    }



    const coAnhNenTuyChon = caiDat && caiDat.image;

    if (viewTrackDetail) {

      viewTrackDetail.classList.toggle('has-custom-bg', !!coAnhNenTuyChon);

    }



    if (coAnhNenTuyChon) {

      if (trackPageAmbient) trackPageAmbient.style.display = 'none';

      if (trackPageCustomBg) {

        trackPageCustomBg.style.display = 'block';

        trackPageCustomBg.style.backgroundImage = `url("${caiDat.image}")`;

        const doMo = caiDat.blur !== undefined ? caiDat.blur : 0;

        doMoAnhNenHienTai = doMo;

        const doTrongSuot = caiDat.opacity !== undefined ? caiDat.opacity / 100 : 1.0;

        trackPageCustomBg.style.filter = doMo > 0 ? `blur(${doMo}px)` : 'none';

        trackPageCustomBg.style.opacity = `${doTrongSuot}`;

      }

      if (trackPageCustomDim) {

        trackPageCustomDim.style.display = 'block';

        const doToi = caiDat.darkness !== undefined ? caiDat.darkness / 100 : 0.40;

        trackPageCustomDim.style.backgroundColor = `rgba(0, 0, 0, ${doToi})`;

      }

    } else {

      doMoAnhNenHienTai = 0;

      if (trackPageCustomBg) {

        trackPageCustomBg.style.display = 'none';

        trackPageCustomBg.style.backgroundImage = 'none';

        trackPageCustomBg.style.transform = '';

      }

      if (trackPageCustomDim) {

        trackPageCustomDim.style.display = 'none';

      }

      if (trackPageAmbient) {

        trackPageAmbient.style.display = 'block';

      }

    }

  }



  function updateTrackPageUI(track) {

    if (!track) return;

    const coverUrl = resolveCoverUrl(track);



    CapNhatAnhNenTrangChiTiet(track);



    if (trackPageAmbient) {

      if (coverUrl) {

        trackPageAmbient.style.backgroundImage = `url("${coverUrl}")`;

      } else {

        trackPageAmbient.style.backgroundImage = 'none';

      }

    }



    if (trackPageCover) {

      trackPageCover.onerror = () => {

        trackPageCover.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23888" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';

      };

      if (coverUrl) {

        trackPageCover.src = coverUrl;

      } else {

        trackPageCover.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23888" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';

      }

    }



    if (trackPageVinylLabelImg) {

      trackPageVinylLabelImg.onerror = () => {

        trackPageVinylLabelImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23888" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>';

      };

      if (coverUrl) {

        trackPageVinylLabelImg.src = coverUrl;

      } else {

        trackPageVinylLabelImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23888" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>';

      }

    }



    let tieuDeBaiHat = track.title || 'Untitled';

    if (tieuDeBaiHat.length > 50) {

      tieuDeBaiHat = tieuDeBaiHat.substring(0, 50) + '...';

    }

    if (trackPageTitle) {

      trackPageTitle.textContent = tieuDeBaiHat;

    }

    if (trackPageTitleDuplicate) {

      trackPageTitleDuplicate.textContent = tieuDeBaiHat;

    }

    CapNhatHieuUngChayChu(tieuDeBaiHat);



    if (trackPageArtist) {

      trackPageArtist.textContent = track.artist || 'Unknown';

    }

    if (trackPageBadge) {

      trackPageBadge.textContent = (track.source || 'OMNI').toUpperCase();

    }



    CapNhatMenuChiTiet(track);



    if (trackPagePlayIcon) {

      trackPagePlayIcon.innerHTML = isPlaying ? ICONS.pause : ICONS.play;

    }



    if (trackPageBtnShuffle) {

      trackPageBtnShuffle.classList.toggle('active', isShuffle);

      trackPageBtnShuffle.innerHTML = isShuffle ? ICONS.shuffleOn : ICONS.shuffleOff;

    }



    CapNhatGiaoDienLapLai();



    const trackSec = parseDurationSec(track.duration, track.durationFormatted);

    if (trackSec > 0 && trackPageTimeTotal) {

      const hasHours = trackSec >= 3600;

      trackPageTimeTotal.textContent = formatTime(trackSec, hasHours);

    }

  }



  let cheDoThuGonTrangPhat = false;



  function CapNhatHieuUngChayChu(tieuDe = '') {

    if (!hangTieuDeBaiHat || !khungTieuDeBaiHat) return;

    if (!cheDoThuGonTrangPhat) {

      hangTieuDeBaiHat.classList.remove('marquee-running');

      khungTieuDeBaiHat.classList.remove('is-scrolling');

      if (trackPageTitleDuplicate) {

        trackPageTitleDuplicate.style.setProperty('display', 'none', 'important');

      }

      return;

    }

    const ten = (tieuDe || (currentTrack ? currentTrack.title : '') || '').trim();

    if (ten.length > 50) {

      if (trackPageTitleDuplicate) {

        trackPageTitleDuplicate.style.setProperty('display', 'inline-block', 'important');

      }

      hangTieuDeBaiHat.classList.add('marquee-running');

      khungTieuDeBaiHat.classList.add('is-scrolling');

    } else {

      if (trackPageTitleDuplicate) {

        trackPageTitleDuplicate.style.setProperty('display', 'none', 'important');

      }

      hangTieuDeBaiHat.classList.remove('marquee-running');

      khungTieuDeBaiHat.classList.remove('is-scrolling');

    }

  }



  function CapNhatGiaoDienThuGon(coHieuLuc = cheDoThuGonTrangPhat) {

    cheDoThuGonTrangPhat = !!coHieuLuc;

    if (viewTrackDetail) {

      viewTrackDetail.classList.toggle('compact-mode', cheDoThuGonTrangPhat);

    }

    if (nutThuGonTrangChiTiet) {

      nutThuGonTrangChiTiet.title = cheDoThuGonTrangPhat ? 'Hiện lại thanh công cụ' : 'Ẩn thanh công cụ';

      nutThuGonTrangChiTiet.setAttribute('aria-label', nutThuGonTrangChiTiet.title);

    }

    if (nutMoRongTrangChiTiet) {

      nutMoRongTrangChiTiet.style.display = cheDoThuGonTrangPhat ? 'inline-flex' : 'none';

    }

    if (khungTieuDeBaiHat) {

      if (cheDoThuGonTrangPhat) {

        khungTieuDeBaiHat.setAttribute('title', 'Bấm để hiện lại thanh công cụ');

      } else {

        khungTieuDeBaiHat.removeAttribute('title');

      }

    }

    CapNhatHieuUngChayChu(currentTrack ? currentTrack.title : '');
    persistUserConfig();
  }



  function BatTatCheDoThuGon() {

    CapNhatGiaoDienThuGon(!cheDoThuGonTrangPhat);

  }



  nutThuGonTrangChiTiet?.addEventListener('click', (e) => {

    e.preventDefault();

    BatTatCheDoThuGon();

  });



  nutMoRongTrangChiTiet?.addEventListener('click', (e) => {

    e.preventDefault();

    BatTatCheDoThuGon();

  });



  khungTieuDeBaiHat?.addEventListener('click', () => {

    if (cheDoThuGonTrangPhat) {

      BatTatCheDoThuGon();

    }

  });



  btnTrackPageBack?.addEventListener('click', (e) => {

    e.preventDefault();

    closeTrackPage();

  });



  // --- Bo Dieu Khien Hoat Anh Dia Than Vinyl ---

  // XU LI HOAT ANH DIA THAN VINYL TRANG CHI TIET
  function RutDiaThanRa(giuMaiMai = false) {

    if (!trackPageVinylCarrier) return;

    if (henGioThuDiaThan) {

      clearTimeout(henGioThuDiaThan);

      henGioThuDiaThan = null;

    }

    dangGiuDiaThanNhoRa = !!giuMaiMai;

    trackPageVinylCarrier.classList.add('is-out');



    if (!giuMaiMai) {

      // Hoat anh 3s tu dong: 0.5s nho ra -> 2.0s giu nguyen vi tri va xoay -> 0.5s cuoi thu vao

      henGioThuDiaThan = setTimeout(() => {

        ThuDiaThanVao(false);

      }, 2500);

    }

  }



  function ThuDiaThanVao(ngayLapTuc = false) {

    if (!trackPageVinylCarrier) return;

    if (henGioThuDiaThan) {

      clearTimeout(henGioThuDiaThan);

      henGioThuDiaThan = null;

    }

    dangGiuDiaThanNhoRa = false;

    if (ngayLapTuc) {

      const transitionCu = trackPageVinylCarrier.style.transition;

      trackPageVinylCarrier.style.transition = 'none';

      trackPageVinylCarrier.classList.remove('is-out');

      void trackPageVinylCarrier.offsetWidth;

      trackPageVinylCarrier.style.transition = transitionCu;

    } else {

      trackPageVinylCarrier.classList.remove('is-out');

    }

  }



  function ChuyenDoiTrangThaiDiaThan() {

    if (!trackPageVinylCarrier) return;

    if (henGioThuDiaThan) {

      clearTimeout(henGioThuDiaThan);

      henGioThuDiaThan = null;

    }

    // Neu dia dang nho ra (du la dang chay 3s hay dang giu) -> thu vao

    if (trackPageVinylCarrier.classList.contains('is-out')) {

      ThuDiaThanVao(false);

    } else {

      // Rut dia ra va giu mai mai (an lai moi thu vao)

      RutDiaThanRa(true);

    }

  }



  function KichHoatHoatAnhDiaThanTuDong() {

    if (!trackPageVinylCarrier) return;

    // Neu nguoi dung chua chu dong click giu dia ra, kich hoat hoat anh 3s tu dong

    if (!dangGiuDiaThanNhoRa) {

      ThuDiaThanVao(true);

      setTimeout(() => {

        RutDiaThanRa(false);

      }, 80);

    }

  }



  // Nut mo xem anh bia to tren goc anh vuong
  trackPageBtnExpandCover?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    const target = currentTrack;

    if (!target) return;

    const coverUrl = resolveCoverUrl(target);

    if (coverUrl) {

      openImageViewer(coverUrl, target.title || 'Ảnh bài hát');

    }

  });



  // An vao anh vuong de rut dia / thu dia than
  trackPageArtworkWrap?.addEventListener('click', (e) => {

    e.preventDefault();

    ChuyenDoiTrangThaiDiaThan();

  });



  trackPageBtnPlayPause?.addEventListener('click', (e) => {

    e.preventDefault();

    btnPlayPause?.click();

  });



  trackPageBtnNext?.addEventListener('click', (e) => {

    e.preventDefault();

    playNextTrack();

  });



  trackPageBtnPrev?.addEventListener('click', (e) => {

    e.preventDefault();

    playPrevTrack();

  });



  trackPageBtnShuffle?.addEventListener('click', (e) => {

    e.preventDefault();

    btnShuffle?.click();

    if (trackPageBtnShuffle) {

      trackPageBtnShuffle.classList.toggle('active', isShuffle);

      trackPageBtnShuffle.innerHTML = isShuffle ? ICONS.shuffleOn : ICONS.shuffleOff;

    }

  });



  trackPageBtnRepeat?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    ChuyenCheDoLapLai();

  });



  // XU LI MENU 3 CHAM TRANG CHI TIET BAI HAT
  function DongMenuChiTiet() {

    if (menuTuyChonTrangChiTiet) {

      menuTuyChonTrangChiTiet.classList.add('hidden');

      menuTuyChonTrangChiTiet.style.display = 'none';

    }

  }



  function CapNhatMenuChiTiet(baiHat) {

    if (!baiHat) return;

    const isSaved = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, baiHat.id, baiHat.source));

    if (iconThichMenuChiTiet) {

      iconThichMenuChiTiet.innerHTML = isSaved ? ICONS.heartSolid : ICONS.heartOutline;

    }

    if (chuThichMenuChiTiet) {

      chuThichMenuChiTiet.textContent = isSaved ? 'Đã thích' : 'Yêu thích';

    }

    if (nutThichMenuChiTiet) {

      nutThichMenuChiTiet.classList.toggle('active', isSaved);

    }

  }



  nutTuyChonTrangChiTiet?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!currentTrack) {

      showToast('<span>Chưa có bài hát nào đang phát</span>', 'info', 1800);

      return;

    }

    closePlayerMoreMenu();

    closeTrackFloatingMenu();

    if (menuTuyChonTrangChiTiet) {
      const isClosed = menuTuyChonTrangChiTiet.classList.contains('hidden') || menuTuyChonTrangChiTiet.style.display === 'none';
      if (isClosed) {
        CapNhatMenuChiTiet(currentTrack);
        if (menuTuyChonTrangChiTiet.parentElement !== document.body) {
          document.body.appendChild(menuTuyChonTrangChiTiet);
        }
        menuTuyChonTrangChiTiet.style.visibility = 'hidden';
        menuTuyChonTrangChiTiet.style.display = 'flex';
        menuTuyChonTrangChiTiet.classList.remove('hidden');

        const rect = nutTuyChonTrangChiTiet.getBoundingClientRect();
        const menuWidth = menuTuyChonTrangChiTiet.offsetWidth || 210;
        const menuHeight = menuTuyChonTrangChiTiet.offsetHeight || 220;

        let left = rect.left;
        if (left + menuWidth > window.innerWidth - 10) {
          left = window.innerWidth - menuWidth - 10;
        }
        if (left < 10) left = 10;

        let top = rect.top - menuHeight - 8;
        if (top < 10) {
          top = rect.bottom + 8;
        }

        menuTuyChonTrangChiTiet.style.top = `${top}px`;
        menuTuyChonTrangChiTiet.style.left = `${left}px`;
        menuTuyChonTrangChiTiet.style.bottom = 'auto';
        menuTuyChonTrangChiTiet.style.right = 'auto';
        menuTuyChonTrangChiTiet.style.visibility = 'visible';
      } else {
        DongMenuChiTiet();
      }
    }

  });



  nutThichMenuChiTiet?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    DongMenuChiTiet();

    if (!currentTrack) return;

    await toggleSaveTrack(currentTrack);

    CapNhatMenuChiTiet(currentTrack);

  });



  nutThemPlaylistMenuChiTiet?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    DongMenuChiTiet();

    if (currentTrack) openAddToPlaylistModal(currentTrack);

  });



  nutSuaMenuChiTiet?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    DongMenuChiTiet();

    if (currentTrack) openEditModal(currentTrack);

  });



  nutTaiMenuChiTiet?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    DongMenuChiTiet();

    if (currentTrack) playerBtnDownload?.click();

  });



  nutSaoChepUrlChiTiet?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    DongMenuChiTiet();

    if (!currentTrack) return;

    const lienKetChiaSe = getPlatformShareUrl(currentTrack);

    if (!lienKetChiaSe) {

      showToast('<span>Không tìm thấy liên kết bài hát</span>', 'error', 2000);

      return;

    }

    const ketQua = await copyToClipboard(lienKetChiaSe);

    if (ketQua) {

      showToast(`${ICONS.link} <span>Đã sao chép liên kết</span>`, 'success', 2000);

    } else {

      showToast('<span>Không thể sao chép liên kết</span>', 'error', 2000);

    }

  });



  nutSaoChepTenChiTiet?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    DongMenuChiTiet();

    if (!currentTrack) return;

    const tenBaiHat = (currentTrack.title || '').trim();

    if (!tenBaiHat) return;

    const ketQua = await copyToClipboard(tenBaiHat);

    if (ketQua) {

      showToast(`${ICONS.copy} <span>Đã sao chép: <b>${escapeHtml(tenBaiHat)}</b></span>`, 'success', 2000);

    } else {

      showToast('<span>Không thể sao chép tên bài hát</span>', 'error', 2000);

    }

  });



  trackPageVolumeSlider?.addEventListener('input', () => {

    currentVolume = trackPageVolumeSlider.value / 100;

    if (audio) audio.volume = currentVolume;

    if (volumeSlider) volumeSlider.value = trackPageVolumeSlider.value;

    if (volumeFill) volumeFill.style.width = trackPageVolumeSlider.value + '%';

    if (trackPageVolumeFill) trackPageVolumeFill.style.width = trackPageVolumeSlider.value + '%';

    updateVolumeIcon(currentVolume);

  });



  trackPageBtnMute?.addEventListener('click', (e) => {

    e.preventDefault();

    btnMute?.click();

    const vol = audio ? audio.volume * 100 : 80;

    if (trackPageVolumeSlider) trackPageVolumeSlider.value = vol;

    if (trackPageVolumeFill) trackPageVolumeFill.style.width = vol + '%';

  });



  trackPageSeekSlider?.addEventListener('input', () => {

    isTrackPageSeeking = true;

    const duration = (audio && audio.duration && isFinite(audio.duration)) ? audio.duration : currentTrack?.duration;

    if (duration && trackPageTimeCurrent) {

      const hasHours = duration >= 3600;

      trackPageTimeCurrent.textContent = formatTime((trackPageSeekSlider.value / 100) * duration, hasHours);

      if (trackPageProgressFill) trackPageProgressFill.style.width = trackPageSeekSlider.value + '%';

    }

  });



  trackPageSeekSlider?.addEventListener('change', () => {

    const duration = (audio && audio.duration && isFinite(audio.duration)) ? audio.duration : currentTrack?.duration;

    if (duration && audio) {

      audio.currentTime = (trackPageSeekSlider.value / 100) * duration;

      if (currentTrack && isPlaying) {

        api.updateDiscordActivity(currentTrack, audio.currentTime, true);

      }

    }

    isTrackPageSeeking = false;

  });



  playerTitle?.addEventListener('click', (e) => {

    e.stopPropagation();

    if (currentTrack) {

      openTrackPage(currentTrack);

    }

  });



  // --- Navigation ---

  navItems.forEach(item => {

    item.addEventListener('click', () => {

      const target = item.getAttribute('data-view');

      if (!target) return;

      currentPlaylistId = null;

      switchView(target);

    });

  });



  document.getElementById('btn-open-downloads')?.addEventListener('click', () => api.openDownloads());

  document.getElementById('btn-go-search')?.addEventListener('click', () => {

    switchView('explore');

    searchInput?.focus();

  });



  // --- Search & Filters ---

  filterPills.forEach(pill => {

    pill.addEventListener('click', () => {

      filterPills.forEach(p => p.classList.remove('active'));

      pill.classList.add('active');

      activeFilter = pill.getAttribute('data-filter');

      applyFilter();

    });

  });



  // XU LI TIM KIEM BAI HAT VA HIEN THI THE BAI HAT (TRACK CARDS)
  function applyFilter() {

    if (!searchResults.length) return;

    const filtered = activeFilter === 'all'

      ? searchResults

      : searchResults.filter(t => t.source === activeFilter);

    if (resultsCount) resultsCount.textContent = `${filtered.length} kết quả`;

    if (tracksContainer) renderTracks(filtered, tracksContainer, false);

  }



  // --- Layout Mode (Grid 4-col vs Compact 1:4) ---
  let currentLayoutMode = 'grid';

  function setLayoutMode(mode) {
    currentLayoutMode = mode === 'compact' ? 'compact' : 'grid';
    persistUserConfig();



    const isCompact = currentLayoutMode === 'compact';

    if (tracksContainer) tracksContainer.classList.toggle('compact-mode', isCompact);

    if (libraryContainer) libraryContainer.classList.toggle('compact-mode', isCompact);

    if (viewHome) viewHome.classList.toggle('compact-mode', isCompact);



    document.querySelectorAll('.home-carousel-track').forEach(el => {

      el.classList.toggle('compact-mode', isCompact);

    });



    btnLayoutCompact?.classList.toggle('active', isCompact);

    btnLayoutGrid?.classList.toggle('active', !isCompact);

    btnLibraryLayoutCompact?.classList.toggle('active', isCompact);

    btnLibraryLayoutGrid?.classList.toggle('active', !isCompact);

    btnHomeLayoutCompact?.classList.toggle('active', isCompact);

    btnHomeLayoutGrid?.classList.toggle('active', !isCompact);

  }



  btnLayoutCompact?.addEventListener('click', () => setLayoutMode('compact'));

  btnLayoutGrid?.addEventListener('click', () => setLayoutMode('grid'));

  btnLibraryLayoutCompact?.addEventListener('click', () => setLayoutMode('compact'));

  btnLibraryLayoutGrid?.addEventListener('click', () => setLayoutMode('grid'));

  btnHomeLayoutCompact?.addEventListener('click', () => setLayoutMode('compact'));

  btnHomeLayoutGrid?.addEventListener('click', () => setLayoutMode('grid'));



  setLayoutMode(currentLayoutMode);



  document.querySelectorAll('.chip').forEach(chip => {

    chip.addEventListener('click', () => {

      const q = chip.getAttribute('data-query');

      if (searchInput) {

        searchInput.value = q;

        performSearch(q);

      }

    });

  });



  async function performSearch(query) {

    if (!query?.trim()) return;

    const q = query.trim();

    if (emptyState) emptyState.style.display = 'none';

    if (tracksContainer) tracksContainer.innerHTML = '';

    if (searchLoader) searchLoader.style.display = 'flex';

    if (resultsMeta) resultsMeta.style.display = 'none';

    if (exploreTitle) exploreTitle.textContent = `Kết quả: "${q}"`;

    if (exploreSubtitle) exploreSubtitle.textContent = 'Tổng hợp từ YouTube, SoundCloud và Spotify';



    try {

      searchResults = activeFilter === 'all'

        ? await api.searchAll(q)

        : await api.searchSource(activeFilter, q);

      if (searchLoader) searchLoader.style.display = 'none';

      if (resultsMeta) resultsMeta.style.display = 'flex';

      applyFilter();

    } catch (err) {

      if (searchLoader) searchLoader.style.display = 'none';

      if (tracksContainer) tracksContainer.innerHTML = `<div class="empty-placeholder" style="grid-column:1/-1"><p style="color:#ef4444">Lỗi: ${formatError(err)}</p></div>`;

    }

  }



  searchSubmitBtn?.addEventListener('click', () => performSearch(searchInput?.value));

  searchInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') performSearch(searchInput?.value); });

  searchInput?.addEventListener('input', () => {

    if (searchClearBtn) searchClearBtn.style.display = searchInput.value ? 'block' : 'none';

  });

  searchClearBtn?.addEventListener('click', () => {

    if (searchInput) {

      searchInput.value = '';

      if (searchClearBtn) searchClearBtn.style.display = 'none';

      searchInput.focus();

    }

  });



  // Marquee helper for smooth, seamless continuous left-scrolling titles (no blinking, no jumping)

  function attachMarqueeHover(containerEl, titleSelector) {

    if (!containerEl) return;

    const titleEl = containerEl.querySelector(titleSelector);

    if (!titleEl) return;



    const measureAndApplyMarquee = () => {

      let firstSpan = titleEl.querySelector('.title-text:not(.title-duplicate)');

      if (!firstSpan) {

        firstSpan = titleEl.querySelector('.title-text');

      }

      if (!firstSpan) return;



      const rawText = firstSpan.getAttribute('data-text') || firstSpan.textContent.trim();

      firstSpan.setAttribute('data-text', rawText);



      const clientW = titleEl.clientWidth;

      if (clientW === 0) return; // not rendered or in hidden view



      let textWidth = parseFloat(firstSpan.dataset.textWidth);

      if (!textWidth) {

        const clone = firstSpan.cloneNode(true);

        clone.className = 'title-text';

        clone.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;padding:0;width:auto;display:inline-block;';

        document.body.appendChild(clone);

        textWidth = Math.ceil(clone.getBoundingClientRect().width);

        clone.remove();

        firstSpan.dataset.textWidth = textWidth;

      }



      const diff = textWidth - clientW;



      if (diff > 4) {

        if (!titleEl.classList.contains('has-overflow')) {

          titleEl.classList.add('has-overflow');

        }



        // Ensure wrapper .marquee-track exists

        let trackWrapper = titleEl.querySelector('.marquee-track');

        if (!trackWrapper) {

          trackWrapper = document.createElement('div');

          trackWrapper.className = 'marquee-track';

          titleEl.innerHTML = '';

          trackWrapper.appendChild(firstSpan);

          titleEl.appendChild(trackWrapper);

        }



        // Add duplicate span for seamless infinite loop if not present

        if (!trackWrapper.querySelector('.title-duplicate')) {

          const duplicateSpan = document.createElement('span');

          duplicateSpan.className = 'title-text title-duplicate';

          duplicateSpan.setAttribute('aria-hidden', 'true');

          duplicateSpan.textContent = rawText;

          trackWrapper.appendChild(duplicateSpan);

        }



        // Constant pleasant scrolling speed (~32px per second)

        const blockWidth = textWidth + 48;

        const duration = Math.max(5, Number((blockWidth / 32).toFixed(1)));

        titleEl.style.setProperty('--marquee-duration', `${duration}s`);

      } else {

        if (titleEl.classList.contains('has-overflow')) {

          titleEl.classList.remove('has-overflow');

          const dup = titleEl.querySelector('.title-duplicate');

          if (dup) dup.remove();

        }

      }

    };



    // Calculate after current frame layout

    requestAnimationFrame(measureAndApplyMarquee);

    setTimeout(measureAndApplyMarquee, 300);



    // Refresh on hover only if not yet set up

    containerEl.addEventListener('mouseenter', () => {

      const firstSpan = titleEl.querySelector('.title-text:not(.title-duplicate)') || titleEl.querySelector('.title-text');

      if (!firstSpan?.dataset?.textWidth || !titleEl.querySelector('.title-duplicate')) {

        measureAndApplyMarquee();

      }

    });

  }



  // --- Track Rendering in Explore / Library ---

  function renderTracks(trackList, container, isLibraryView = false) {

    container.innerHTML = '';

    if (!trackList?.length) {

      container.innerHTML = '<div class="empty-placeholder" style="grid-column:1/-1"><p>Không có kết quả.</p></div>';

      return;

    }



    trackList.forEach((rawTrack, index) => {

      const card = document.createElement('div');

      card.className = 'track-card';

      card.setAttribute('draggable', 'true');

      card.setAttribute('data-id', rawTrack.id);

      card.setAttribute('data-source', rawTrack.source);

      const saved = TimBaiHatTrongThuVien(rawTrack);

      const track = saved ? { ...rawTrack, ...saved } : rawTrack;

      const isSaved = !!saved;

      const isCurrent = currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, track.id, track.source);

      if (isCurrent) card.classList.add('playing-now');



      const coverUrl = resolveCoverUrl(track);



      card.innerHTML = `

        <div class="card-cover-container">

          <div class="card-cover-placeholder">${ICONS.musicNote}</div>

          <img src="${coverUrl || ''}" alt="" class="card-cover-img" onerror="this.style.display='none'">

          <div class="card-badge ${track.source}">

            <span class="badge-full">${track.source}</span>

            <span class="badge-short">${getShortSource(track.source)}</span>

          </div>

          <div class="card-duration">${formatTrackDuration(track)}</div>

          <div class="card-play-overlay">

            <button class="overlay-play-btn" type="button" draggable="false">${isCurrent && isPlaying ? ICONS.pause : ICONS.play}</button>

          </div>

        </div>

        <div class="card-body">

          <div class="card-title"><span class="title-text">${escapeHtml(track.title)}</span></div>

          <div class="card-artist">${escapeHtml(track.artist)}</div>

          ${(track.viewsFormatted || track.uploadedAt) ? `

            <div class="card-meta-info">

              ${track.viewsFormatted ? `<span class="meta-item meta-views"><span>${escapeHtml(cleanViewCount(track.viewsFormatted))}</span></span>` : ''}

              ${(track.viewsFormatted && track.uploadedAt) ? `<span class="meta-dot">•</span>` : ''}

              ${track.uploadedAt ? `<span class="meta-item meta-date"><span>${escapeHtml(track.uploadedAt)}</span></span>` : ''}

            </div>

          ` : ''}

        </div>

        <span class="card-compact-duration">${formatTrackDuration(track)}</span>

        <div class="card-actions-row">

          <button class="card-action-btn btn-add-playlist">${ICONS.plus}</button>

          <button class="card-action-btn btn-toggle-fav ${isSaved ? 'btn-saved' : ''}">${isSaved ? ICONS.heartSolid : ICONS.heartOutline}</button>

          <button class="card-action-btn btn-edit-track">${ICONS.edit}</button>

          ${isLibraryView ? `<button class="card-action-btn btn-delete-track">${ICONS.trash}</button>` : ''}

          <button class="card-action-btn btn-card-menu" aria-label="Tùy chọn">${ICONS.dotsHorizontal}</button>

        </div>

      `;



      // Title marquee on hover for long titles

      attachMarqueeHover(card, '.card-title');



      // Drag & Drop event on card - only drag when not clicking buttons or play button in middle

      card.addEventListener('dragstart', (e) => {

        if (e.target.closest('.overlay-play-btn') || e.target.closest('.card-actions-row') || e.target.closest('button')) {

          e.preventDefault();

          return false;

        }

        try {

          e.dataTransfer.effectAllowed = 'copyMove';

          e.dataTransfer.setData('application/json', JSON.stringify(track));

          e.dataTransfer.setData('text/plain', JSON.stringify(track));

          card.classList.add('dragging');

          window.__draggedTrack = track;

        } catch (err) {}

      });



      card.addEventListener('dragend', () => {

        card.classList.remove('dragging');

        window.__draggedTrack = null;

      });



      card.addEventListener('click', (e) => {

        if (e.target.closest('.card-actions-row') || e.target.closest('.overlay-play-btn')) return;

        currentPlayingPlaylistId = null;

        playTrack(track, trackList, index);

      });



      card.querySelector('.card-title')?.addEventListener('click', (e) => {

        e.stopPropagation();

        e.preventDefault();

        openTrackPage(track, trackList, index);

      });



      const overlayBtn = card.querySelector('.overlay-play-btn');

      overlayBtn?.addEventListener('click', (e) => {

        e.stopPropagation();

        e.preventDefault();

        if (currentTrack?.id === track.id && currentTrack?.source === track.source) {

          if (isPlaying) {

            if (audio) audio.pause();

            isPlaying = false;

            if (playIcon) playIcon.innerHTML = ICONS.play;

            if (visualizer) visualizer.classList.remove('playing');

            api.updateDiscordActivity(currentTrack, audio ? audio.currentTime : 0, false);

            persistPlaybackState();

            updateTrackCardsPlayState();

          } else {

            resumeOrPlayTrack(track);

          }

        } else {

          currentPlayingPlaylistId = null;

          playTrack(track, trackList, index);

        }

      });



      card.querySelector('.btn-add-playlist')?.addEventListener('click', (e) => {

        e.stopPropagation();

        openAddToPlaylistModal(track);

      });



      card.querySelector('.btn-toggle-fav')?.addEventListener('click', (e) => {

        e.stopPropagation();

        toggleSaveTrack(track);

      });



      card.querySelector('.btn-edit-track')?.addEventListener('click', (e) => {

        e.stopPropagation();

        openEditModal(track);

      });



      if (isLibraryView) {

        card.querySelector('.btn-delete-track')?.addEventListener('click', async (e) => {

          e.stopPropagation();

          await api.deleteTrack(track.id, track.source);

          showToast(`${ICONS.trash} <span>Đã xóa khỏi thư viện</span>`, 'info', 1800);

          await loadLibrary();

        });

      }



      card.querySelector('.btn-card-menu')?.addEventListener('click', (e) => {

        e.stopPropagation();

        e.preventDefault();

        openTrackFloatingMenu(track, e.currentTarget, isLibraryView);

      });



      container.appendChild(card);

    });

  }



  async function toggleSaveTrack(track) {

    if (!track) return;

    const isSaved = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

    const newSaved = !isSaved;



    // Instantly update all matching heart buttons in the visible DOM without re-rendering cards

    document.querySelectorAll('.track-card').forEach(cardEl => {

      const cId = cardEl.getAttribute('data-id');

      const cSrc = cardEl.getAttribute('data-source');

      if (SoSanhTrungBaiHat(cId, cSrc, track.id, track.source)) {

        const favBtn = cardEl.querySelector('.btn-toggle-fav');

        if (favBtn) {

          favBtn.classList.toggle('btn-saved', newSaved);

          favBtn.innerHTML = newSaved ? ICONS.heartSolid : ICONS.heartOutline;

        }

      }

    });



    if (currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, track.id, track.source)) {

      if (playerBtnFav) {

        playerBtnFav.classList.toggle('active', newSaved);

        playerBtnFav.innerHTML = newSaved ? ICONS.heartSolid : ICONS.heartOutline;

      }

      if (playerMenuFavIcon) {

        playerMenuFavIcon.innerHTML = newSaved ? ICONS.heartSolid : ICONS.heartOutline;

      }

      if (playerMenuFavText) {

        playerMenuFavText.textContent = newSaved ? 'Đã thích' : 'Yêu thích';

      }

      if (chuThichMenuChiTiet) {

        chuThichMenuChiTiet.textContent = newSaved ? 'Đã thích' : 'Yêu thích';

      }

      if (iconThichMenuChiTiet) {

        iconThichMenuChiTiet.innerHTML = newSaved ? ICONS.heartSolid : ICONS.heartOutline;

      }

      if (nutThichMenuChiTiet) {

        nutThichMenuChiTiet.classList.toggle('active', newSaved);

      }

    }



    try {

      if (isSaved) {

        await api.deleteTrack(track.id, track.source);

        libraryTracks = libraryTracks.filter(t => !SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

        showToast(`${ICONS.heartOutline} <span>Bỏ yêu thích !</span>`, 'info', 1800);

      } else {

        await api.saveTrack(track);

        if (!libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source))) {

          libraryTracks.unshift(track);

        }

        showToast(`${ICONS.heartSolid} <span>Yêu thích !</span>`, 'success', 1800);

      }



      if (libraryCountBadge) libraryCountBadge.textContent = libraryTracks.length;

      if (libraryTotalTracks) libraryTotalTracks.textContent = `${libraryTracks.length} bài hát`;



      if (activeView === 'library') {

        updateLibraryUI();

      }

    } catch (err) {

      console.error('toggleSaveTrack error:', err);

      // Rollback on failure

      document.querySelectorAll('.track-card').forEach(cardEl => {

        const cId = cardEl.getAttribute('data-id');

        const cSrc = cardEl.getAttribute('data-source');

        if (SoSanhTrungBaiHat(cId, cSrc, track.id, track.source)) {

          const favBtn = cardEl.querySelector('.btn-toggle-fav');

          if (favBtn) {

            favBtn.classList.toggle('btn-saved', isSaved);

            favBtn.innerHTML = isSaved ? ICONS.heartSolid : ICONS.heartOutline;

          }

        }

      });

      if (currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, track.id, track.source)) {

        if (playerBtnFav) {

          playerBtnFav.classList.toggle('active', isSaved);

          playerBtnFav.innerHTML = isSaved ? ICONS.heartSolid : ICONS.heartOutline;

        }

        if (playerMenuFavIcon) {

          playerMenuFavIcon.innerHTML = isSaved ? ICONS.heartSolid : ICONS.heartOutline;

        }

        if (playerMenuFavText) {

          playerMenuFavText.textContent = isSaved ? 'Đã thích' : 'Yêu thích';

        }

      }

    }

  }



  // --- Home Screen Logic & Rendering ---

  function renderSkeletonCards(container, count = 6) {

    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < count; i++) {

      const sk = document.createElement('div');

      sk.className = 'skeleton-card';

      sk.innerHTML = `

        <div class="skeleton-cover"></div>

        <div class="skeleton-line"></div>

        <div class="skeleton-line short"></div>

      `;

      container.appendChild(sk);

    }

  }



  function renderHomeTrackCards(trackList, container, options = {}) {

    if (!container) return;

    container.innerHTML = '';

    if (!trackList?.length) {

      if (options.emptyText) {

        container.innerHTML = `<div class="home-empty-hint">${options.emptyText}</div>`;

      }

      return;

    }



    const isContinue = !!options.isContinue;



    trackList.forEach((item, index) => {

      const rawTrack = isContinue ? item.track : item;

      if (!rawTrack) return;



      const card = document.createElement('div');

      card.className = 'track-card';

      card.setAttribute('draggable', 'true');

      card.setAttribute('data-id', rawTrack.id);

      card.setAttribute('data-source', rawTrack.source);



      const saved = TimBaiHatTrongThuVien(rawTrack);

      const track = saved ? { ...rawTrack, ...saved } : rawTrack;

      const isSaved = !!saved;

      const isCurrent = currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, track.id, track.source);

      if (isCurrent) card.classList.add('playing-now');



      const coverUrl = resolveCoverUrl(track);



      card.innerHTML = `

        <div class="card-cover-container">

          <div class="card-cover-placeholder">${ICONS.musicNote}</div>

          <img src="${coverUrl || ''}" alt="" class="card-cover-img" onerror="this.style.display='none'">

          <div class="card-badge ${track.source}">

            <span class="badge-full">${track.source}</span>

            <span class="badge-short">${getShortSource(track.source)}</span>

          </div>

          <div class="card-duration">${formatTrackDuration(track)}</div>

          ${isContinue ? `

            <button class="continue-dismiss-btn" type="button" aria-label="Xóa">

              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>

            </button>

          ` : ''}

          <div class="card-play-overlay">

            <button class="overlay-play-btn" type="button" draggable="false">${isCurrent && isPlaying ? ICONS.pause : ICONS.play}</button>

          </div>

        </div>

        <div class="card-body">

          <div class="card-title"><span class="title-text">${escapeHtml(track.title)}</span></div>

          <div class="card-artist">${escapeHtml(track.artist)}</div>

          ${isContinue ? `

            <div class="continue-progress-wrap">

              <div class="continue-progress-fill" style="width: ${item.percentage || 0}%;"></div>

            </div>

            <div class="continue-time-info">

              <span>Đã nghe ${item.percentage || 0}%</span>

              <span>${formatTime(item.savedTime || 0)}</span>

            </div>

          ` : (track.viewsFormatted || track.uploadedAt) ? `

            <div class="card-meta-info">

              ${track.viewsFormatted ? `<span class="meta-item meta-views"><span>${escapeHtml(cleanViewCount(track.viewsFormatted))}</span></span>` : ''}

              ${(track.viewsFormatted && track.uploadedAt) ? `<span class="meta-dot">•</span>` : ''}

              ${track.uploadedAt ? `<span class="meta-item meta-date"><span>${escapeHtml(track.uploadedAt)}</span></span>` : ''}

            </div>

          ` : ''}

        </div>

        <span class="card-compact-duration">${formatTrackDuration(track)}</span>

        <div class="card-actions-row">

          <button class="card-action-btn btn-add-playlist">${ICONS.plus}</button>

          <button class="card-action-btn btn-toggle-fav ${isSaved ? 'btn-saved' : ''}">${isSaved ? ICONS.heartSolid : ICONS.heartOutline}</button>

          <button class="card-action-btn btn-edit-track">${ICONS.edit}</button>

          <button class="card-action-btn btn-card-menu" aria-label="Tùy chọn">${ICONS.dotsHorizontal}</button>

        </div>

      `;



      attachMarqueeHover(card, '.card-title');



      card.addEventListener('dragstart', (e) => {

        if (e.target.closest('.overlay-play-btn') || e.target.closest('.card-actions-row') || e.target.closest('button')) {

          e.preventDefault();

          return false;

        }

        try {

          e.dataTransfer.effectAllowed = 'copyMove';

          e.dataTransfer.setData('application/json', JSON.stringify(track));

          e.dataTransfer.setData('text/plain', JSON.stringify(track));

          card.classList.add('dragging');

          window.__draggedTrack = track;

        } catch (err) {}

      });



      card.addEventListener('dragend', () => {

        card.classList.remove('dragging');

        window.__draggedTrack = null;

      });



      card.addEventListener('click', (e) => {

        if (e.target.closest('.card-actions-row') || e.target.closest('.overlay-play-btn') || e.target.closest('.continue-dismiss-btn')) return;

        currentPlayingPlaylistId = null;

        if (isContinue) {

          playTrack(track, null, 0, item.savedTime || 0);

        } else {

          playTrack(track, trackList, index);

        }

      });



      card.querySelector('.card-title')?.addEventListener('click', (e) => {

        e.stopPropagation();

        e.preventDefault();

        openTrackPage(track, isContinue ? null : trackList, index);

      });



      const overlayBtn = card.querySelector('.overlay-play-btn');

      overlayBtn?.addEventListener('click', (e) => {

        e.stopPropagation();

        e.preventDefault();

        if (currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, track.id, track.source)) {

          if (isPlaying) {

            if (audio) audio.pause();

            isPlaying = false;

            if (playIcon) playIcon.innerHTML = ICONS.play;

            if (visualizer) visualizer.classList.remove('playing');

            api.updateDiscordActivity(currentTrack, audio ? audio.currentTime : 0, false);

            persistPlaybackState();

            updateTrackCardsPlayState();

          } else {

            resumeOrPlayTrack(track);

          }

        } else {

          currentPlayingPlaylistId = null;

          if (isContinue) {

            playTrack(track, null, 0, item.savedTime || 0);

          } else {

            playTrack(track, trackList, index);

          }

        }

      });



      if (isContinue) {

        card.querySelector('.continue-dismiss-btn')?.addEventListener('click', (e) => {

          e.stopPropagation();

          e.preventDefault();

          removeContinueListening(track);

        });

      }



      card.querySelector('.btn-add-playlist')?.addEventListener('click', (e) => {

        e.stopPropagation();

        openAddToPlaylistModal(track);

      });



      card.querySelector('.btn-toggle-fav')?.addEventListener('click', (e) => {

        e.stopPropagation();

        toggleSaveTrack(track);

      });



      card.querySelector('.btn-edit-track')?.addEventListener('click', (e) => {

        e.stopPropagation();

        openEditModal(track);

      });



      card.querySelector('.btn-card-menu')?.addEventListener('click', (e) => {

        e.stopPropagation();

        e.preventDefault();

        openTrackFloatingMenu(track, e.currentTarget, false);

      });



      container.appendChild(card);

    });

  }



  function renderHomeContinue() {

    if (!homeContinueGrid || !homeSectionContinue) return;

    if (!continueListeningList || continueListeningList.length === 0) {

      homeSectionContinue.style.display = 'none';

      homeContinueGrid.innerHTML = '';

      return;

    }

    homeSectionContinue.style.display = 'block';

    renderHomeTrackCards(continueListeningList, homeContinueGrid, { isContinue: true });

  }



  function renderHomeHistory() {

    if (!homeHistoryGrid) return;

    renderHomeTrackCards(listeningHistory, homeHistoryGrid, {

      emptyText: 'Chưa có bài hát nào trong lịch sử nghe. Hãy chọn và thưởng thức một bản nhạc nhé!'

    });

  }



  let boNhoDemTrangChu = null;
  async function LayBoNhoDemTrangChu() {
    if (!boNhoDemTrangChu) {
      try {
        boNhoDemTrangChu = await api.getHomeCache();
      } catch (e) {
        boNhoDemTrangChu = {};
      }
    }
    return boNhoDemTrangChu || {};
  }
  async function LuuBoNhoDemTrangChu(khoa, duLieu) {
    if (!boNhoDemTrangChu) boNhoDemTrangChu = {};
    boNhoDemTrangChu[khoa] = duLieu;
    try {
      await api.saveHomeCache(boNhoDemTrangChu);
    } catch (e) {}
  }

  // XU LI GIAO DIEN TRANG CHU (HOME SCREEN)
  async function loadHomeHot(force = false) {
    if (!homeHotGrid) return;
    if (!force && homeHotTracks.length > 0) {
      renderHomeTrackCards(homeHotTracks, homeHotGrid);
      return;
    }
    if (!force) {
      try {
        const cacheObj = await LayBoNhoDemTrangChu();
        const cached = cacheObj.hot;
        if (cached && Date.now() - cached.timestamp < 1800000 && Array.isArray(cached.tracks) && cached.tracks.length > 0) {
          homeHotTracks = cached.tracks;
          renderHomeTrackCards(homeHotTracks, homeHotGrid);
          return;
        }
      } catch (e) {}
    }

    renderSkeletonCards(homeHotGrid, 6);
    try {
      const results = await api.searchSource('youtube', 'bài hát hot mới nhất triệu view thịnh hành');
      if (results && results.length) {
        homeHotTracks = results.filter(t => t.duration > 30).slice(0, 20);
        LuuBoNhoDemTrangChu('hot', { timestamp: Date.now(), tracks: homeHotTracks });
        renderHomeTrackCards(homeHotTracks, homeHotGrid);
      } else {
        homeHotGrid.innerHTML = '<div class="home-empty-hint">Không tải được bài hát hot. Vui lòng bấm "Làm mới".</div>';
      }
    } catch (err) {
      console.warn('loadHomeHot error:', err);
      homeHotGrid.innerHTML = '<div class="home-empty-hint">Lỗi kết nối. Vui lòng thử lại sau.</div>';
    }
  }

  async function loadHomeForyou(force = false) {
    if (!homeForyouGrid) return;
    if (!force && homeForyouTracks.length > 0) {
      renderHomeTrackCards(homeForyouTracks, homeForyouGrid);
      return;
    }
    if (!force) {
      try {
        const cacheObj = await LayBoNhoDemTrangChu();
        const cached = cacheObj.foryou;
        if (cached && Date.now() - cached.timestamp < 1800000 && Array.isArray(cached.tracks) && cached.tracks.length > 0) {
          homeForyouTracks = cached.tracks;
          if (foryouSubtitle && cached.subtitle) foryouSubtitle.textContent = cached.subtitle;
          renderHomeTrackCards(homeForyouTracks, homeForyouGrid);
          return;
        }
      } catch (e) {}
    }

    renderSkeletonCards(homeForyouGrid, 6);

    const artistMap = {};
    listeningHistory.forEach(h => {
      const a = (h.artist || '').split(/[,&x+ft.]/)[0].trim();
      if (a && a.length > 1 && !a.toLowerCase().includes('unknown')) {
        artistMap[a] = (artistMap[a] || 0) + 2;
      }
    });
    libraryTracks.forEach(t => {
      const a = (t.artist || '').split(/[,&x+ft.]/)[0].trim();
      if (a && a.length > 1 && !a.toLowerCase().includes('unknown')) {
        artistMap[a] = (artistMap[a] || 0) + 1;
      }
    });

    const sorted = Object.keys(artistMap).sort((a, b) => artistMap[b] - artistMap[a]);
    let query = 'nhạc acoustic chill thư giãn hay nhất';
    let subtitle = 'Các bài hát đề xuất cùng gu âm nhạc dựa trên lịch sử nghe của bạn';

    if (sorted.length > 0) {
      const pickIdx = force ? Math.floor(Math.random() * Math.min(sorted.length, 4)) : 0;
      const pickedArtist = sorted[pickIdx];
      query = `${pickedArtist} những bài hát hay nhất`;
      subtitle = `Dựa trên sở thích bạn thường nghe nhạc của "${pickedArtist}"`;
    }
    if (foryouSubtitle) foryouSubtitle.textContent = subtitle;

    try {
      const results = await api.searchAll(query);
      if (results && results.length) {
        const histSet = new Set(listeningHistory.map(h => `${h.id}_${h.source}`));
        let filtered = results.filter(t => !histSet.has(`${t.id}_${t.source}`));
        if (filtered.length < 5) filtered = results;
        homeForyouTracks = filtered.slice(0, 20);
        LuuBoNhoDemTrangChu('foryou', {
          timestamp: Date.now(),
          tracks: homeForyouTracks,
          subtitle
        });
        renderHomeTrackCards(homeForyouTracks, homeForyouGrid);
      } else {
        homeForyouGrid.innerHTML = '<div class="home-empty-hint">Không tìm thấy bài hát phù hợp.</div>';
      }
    } catch (err) {
      console.warn('loadHomeForyou error:', err);
      homeForyouGrid.innerHTML = '<div class="home-empty-hint">Lỗi kết nối gợi ý.</div>';
    }
  }

  async function loadHomeDiscovery(force = false) {
    if (!homeDiscoveryGrid) return;
    if (!force && homeDiscoveryTracks.length > 0) {
      renderHomeTrackCards(homeDiscoveryTracks, homeDiscoveryGrid);
      return;
    }
    if (!force) {
      try {
        const cacheObj = await LayBoNhoDemTrangChu();
        const cached = cacheObj.discovery;
        if (cached && Date.now() - cached.timestamp < 1800000 && Array.isArray(cached.tracks) && cached.tracks.length > 0) {
          homeDiscoveryTracks = cached.tracks;
          renderHomeTrackCards(homeDiscoveryTracks, homeDiscoveryGrid);
          return;
        }
      } catch (e) {}
    }

    renderSkeletonCards(homeDiscoveryGrid, 6);
    try {
      const results = await api.searchSource('youtube', 'bài hát tỷ view có lượt xem cao nhất mọi thời đại');
      if (results && results.length) {
        homeDiscoveryTracks = results.filter(t => t.duration > 30).slice(0, 20);
        LuuBoNhoDemTrangChu('discovery', { timestamp: Date.now(), tracks: homeDiscoveryTracks });
        renderHomeTrackCards(homeDiscoveryTracks, homeDiscoveryGrid);
      } else {
        homeDiscoveryGrid.innerHTML = '<div class="home-empty-hint">Không tải được bài hát khám phá.</div>';
      }
    } catch (err) {
      console.warn('loadHomeDiscovery error:', err);
      homeDiscoveryGrid.innerHTML = '<div class="home-empty-hint">Lỗi kết nối.</div>';
    }
  }



  function renderHomeScreen() {

    renderHomeContinue();

    renderHomeHistory();

    loadHomeHot();

    loadHomeForyou();

    loadHomeDiscovery();

  }



  function removeContinueListening(track) {
    if (!track) return;
    continueListeningList = continueListeningList.filter(x => !(x.track.id === track.id && x.track.source === track.source));
    api.saveContinueListening(continueListeningList).catch(e => console.warn('Save continue error:', e));
    renderHomeContinue();
  }

  let historySaveTimeout = null;
  function persistHistory() {
    if (historySaveTimeout) clearTimeout(historySaveTimeout);
    historySaveTimeout = setTimeout(() => {
      api.saveHistory(listeningHistory).catch(e => console.warn('Save history error:', e));
    }, 400);
  }

  function addToHistory(track) {
    if (!track || !track.id) return;
    listeningHistory = listeningHistory.filter(t => !(t.id === track.id && t.source === track.source));
    listeningHistory.unshift({ ...track, listenedAt: Date.now() });
    if (listeningHistory.length > 50) listeningHistory.pop();
    persistHistory();
    if (activeView === 'home') renderHomeHistory();
  }



  let continueSaveTimeout = null;
  function persistContinueListening() {
    if (continueSaveTimeout) clearTimeout(continueSaveTimeout);
    continueSaveTimeout = setTimeout(() => {
      api.saveContinueListening(continueListeningList).catch(e => console.warn('Save continue error:', e));
    }, 500);
  }

  function updateContinueListening(track, currentTime, duration) {
    if (!track || !duration || duration < 30) return;
    if (currentTime < 8 || currentTime > duration - 8) return;
    const now = Date.now();
    if (now - lastContinueUpdate < 4000) return;
    lastContinueUpdate = now;

    const idx = continueListeningList.findIndex(x => x.track.id === track.id && x.track.source === track.source);
    const entry = {
      track: { ...track },
      savedTime: Math.floor(currentTime),
      duration: Math.floor(duration),
      percentage: Math.min(99, Math.max(1, Math.round((currentTime / duration) * 100))),
      updatedAt: now
    };

    if (idx >= 0) {
      continueListeningList[idx] = entry;
    } else {
      continueListeningList.unshift(entry);
    }
    if (continueListeningList.length > 30) continueListeningList.pop();

    persistContinueListening();
    if (activeView === 'home') renderHomeContinue();
  }



  btnRefreshHot?.addEventListener('click', () => loadHomeHot(true));

  btnRefreshForyou?.addEventListener('click', () => loadHomeForyou(true));

  btnRefreshDiscovery?.addEventListener('click', () => loadHomeDiscovery(true));

  btnClearHistory?.addEventListener('click', () => {
    listeningHistory = [];
    api.saveHistory([]).catch(() => {});
    renderHomeHistory();
    showToast(`${ICONS.trash} <span>Đã xóa lịch sử đã nghe</span>`, 'info', 1800);
  });



  document.querySelectorAll('.home-scroll-btn').forEach(btn => {

    btn.addEventListener('click', () => {

      const targetId = btn.getAttribute('data-target');

      const trackEl = document.getElementById(targetId);

      if (!trackEl) return;

      const isLeft = btn.classList.contains('btn-scroll-left');

      const scrollAmount = Math.max(300, trackEl.clientWidth * 0.75);

      trackEl.scrollBy({ left: isLeft ? -scrollAmount : scrollAmount, behavior: 'smooth' });

    });

  });



  // XU LI DANH SACH PLAYLIST VA GIAO DIEN PLAYLIST
  async function loadPlaylists() {

    try {

      userPlaylists = await api.getPlaylists() || [];

      renderSidebarPlaylists();

      if (activeView === 'playlist' && currentPlaylistId) {

        renderPlaylistView(currentPlaylistId);

      }

    } catch (err) {

      console.error('Failed to load playlists:', err);

    }

  }



  function getPlaylistCoverUrl(pl) {

    if (!pl) return '';

    if (pl.cover && typeof pl.cover === 'string' && pl.cover.trim()) {

      const c = pl.cover.trim();

      if (c.startsWith('data:image/') || c.startsWith('http://') || c.startsWith('https://') || c.startsWith('blob:') || c.startsWith('local-cover://')) {

        return c;

      }

    }

    const firstTrackWithCover = (pl.tracks || []).find(t => resolveCoverUrl(t));

    if (firstTrackWithCover) {

      return resolveCoverUrl(firstTrackWithCover);

    }

    return '';

  }



  function renderSidebarPlaylists() {

    if (!sidebarPlaylistsList) return;

    sidebarPlaylistsList.innerHTML = '';



    userPlaylists.forEach(pl => {

      const item = document.createElement('div');

      item.className = `sidebar-playlist-item ${pl.id === currentPlaylistId ? 'active' : ''}`;

      item.setAttribute('data-id', pl.id);



      const coverUrl = getPlaylistCoverUrl(pl);



      item.innerHTML = `

        <div class="sidebar-playlist-thumb" style="overflow:hidden !important;flex-shrink:0;">

          ${coverUrl ? `<img src="${coverUrl}" alt="" style="position:absolute !important;inset:0 !important;width:100% !important;height:100% !important;object-fit:cover !important;object-position:center !important;display:block !important;z-index:2 !important;" onerror="this.parentElement.innerHTML='${ICONS.playlist.replace(/'/g, "\\'")}'">` : ICONS.playlist}

        </div>

        <span class="sidebar-playlist-name">${escapeHtml(pl.name)}</span>

        <span class="sidebar-playlist-count">${pl.tracks ? pl.tracks.length : 0}</span>

      `;



      item.addEventListener('click', (e) => {

        e.preventDefault();

        openPlaylist(pl.id);

      });



      // Drag over target to drop song onto playlist

      item.addEventListener('dragover', (e) => {

        e.preventDefault();

        e.dataTransfer.dropEffect = 'copy';

        item.classList.add('drag-over');

      });



      item.addEventListener('dragleave', (e) => {

        if (!item.contains(e.relatedTarget)) {

          item.classList.remove('drag-over');

        }

      });



      item.addEventListener('drop', async (e) => {

        e.preventDefault();

        item.classList.remove('drag-over');

        let droppedTrack = null;

        try {

          const rawJson = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain');

          if (rawJson) {

            droppedTrack = JSON.parse(rawJson);

          }

        } catch (err) {}

        if (!droppedTrack && window.__draggedTrack) {

          droppedTrack = window.__draggedTrack;

        }

        if (droppedTrack && (droppedTrack.id || droppedTrack.title)) {

          try {

            await api.addToPlaylist(pl.id, droppedTrack);

            showToast(`${ICONS.success} <span>Đã thêm <b>${escapeHtml(droppedTrack.title || 'bài hát')}</b> vào <b>${escapeHtml(pl.name)}</b></span>`, 'success', 2000);

            await loadPlaylists();

            if (activeView === 'playlist' && currentPlaylistId === pl.id) {

              renderPlaylistView(pl.id);

            }

          } catch (err) {

            console.warn('Drop track error:', err);

          }

        }

      });



      sidebarPlaylistsList.appendChild(item);

    });

  }



  function openPlaylist(playlistId) {

    currentPlaylistId = playlistId;

    switchView('playlist', playlistId);

  }



  function renderPlaylistView(playlistId) {

    if (!viewPlaylist) return;

    if (topHeader) topHeader.style.display = 'none';

    if (mainContent) mainContent.setAttribute('data-active-view', 'playlist');

    const pl = userPlaylists.find(p => p.id === playlistId);

    if (!pl) {

      switchView('library');

      return;

    }



    if (playlistTitleDisplay) {

      playlistTitleDisplay.textContent = pl.name;

      playlistTitleDisplay.classList.remove('hidden');

    }

    if (playlistTitleInput) {

      playlistTitleInput.value = pl.name;

      playlistTitleInput.classList.add('hidden');

    }



    if (playlistDescriptionDisplay) {

      if (pl.description && pl.description.trim()) {

        playlistDescriptionDisplay.textContent = pl.description.trim();

        playlistDescriptionDisplay.style.display = 'block';

      } else {

        playlistDescriptionDisplay.textContent = '';

        playlistDescriptionDisplay.style.display = 'none';

      }

    }



    // Cover art calculation

    if (playlistCoverArt) {

      const coverUrl = getPlaylistCoverUrl(pl);

      if (coverUrl) {

        playlistCoverArt.innerHTML = `<img src="${coverUrl}" alt="" style="position:absolute !important;inset:0 !important;width:100% !important;height:100% !important;object-fit:cover !important;object-position:center !important;display:block !important;z-index:2 !important;" onerror="this.parentElement.innerHTML='${ICONS.playlist.replace(/'/g, "\\'")}'">`;

      } else {

        playlistCoverArt.innerHTML = ICONS.playlist;

      }

    }



    // Total duration & track count

    const trackCount = pl.tracks ? pl.tracks.length : 0;

    let totalSec = 0;

    if (pl.tracks) {

      pl.tracks.forEach(t => {

        totalSec += parseDurationSec(t.duration, t.durationFormatted);

      });

    }

    if (playlistMetaInfo) {

      const durStr = totalSec > 0 ? ` • ${formatTime(totalSec, totalSec >= 3600)}` : '';

      playlistMetaInfo.textContent = `${trackCount} bài hát${durStr}`;

    }



    updatePlaylistPlayBtnState();



    if (!pl.tracks || pl.tracks.length === 0) {

      if (playlistTracksContainer) playlistTracksContainer.innerHTML = '';

      if (playlistEmpty) playlistEmpty.style.display = 'flex';

      return;

    }



    if (playlistEmpty) playlistEmpty.style.display = 'none';

    if (!playlistTracksContainer) return;

    playlistTracksContainer.innerHTML = '';



    let draggedRowIndex = null;



    pl.tracks.forEach((track, idx) => {

      const row = document.createElement('div');

      row.className = 'playlist-track-row';

      row.setAttribute('draggable', 'true');

      row.setAttribute('data-index', idx);

      row.setAttribute('data-id', track.id || '');

      row.setAttribute('data-source', track.source || '');

      row.setAttribute('data-title', track.title || '');

      row.setAttribute('data-artist', track.artist || '');



      const coverUrl = resolveCoverUrl(track);



      row.innerHTML = `

        <span class="playlist-drag-handle">${ICONS.dragHandle}</span>

        <span class="playlist-track-index">${idx + 1}</span>

        <div class="playlist-track-thumb">

          <div class="card-cover-placeholder">${ICONS.musicNote}</div>

          <img src="${coverUrl || ''}" alt="" onerror="this.style.display='none'">

          <div class="card-badge ${track.source}">

            <span class="badge-full">${track.source}</span>

            <span class="badge-short">${getShortSource(track.source)}</span>

          </div>

        </div>

        <div class="playlist-track-info">

          <div class="playlist-track-title"><span class="title-text">${escapeHtml(track.title)}</span></div>

          <div class="playlist-track-subtitle">

            <span class="playlist-track-artist">${escapeHtml(track.artist)}</span>

            ${track.viewsFormatted ? `<span class="meta-dot">•</span><span class="playlist-meta-sub"><span>${escapeHtml(cleanViewCount(track.viewsFormatted))}</span></span>` : ''}

            ${track.uploadedAt ? `<span class="meta-dot">•</span><span class="playlist-meta-sub"><span>${escapeHtml(track.uploadedAt)}</span></span>` : ''}

          </div>

        </div>

        <span class="playlist-track-duration">${formatTrackDuration(track)}</span>

        <div class="playlist-track-actions">

          <button class="playlist-track-action-btn btn-edit-track">${ICONS.edit}</button>

          <button class="playlist-track-action-btn danger btn-remove-track">${ICONS.trash}</button>

        </div>

      `;



      // Title marquee on hover for long playlist track titles

      attachMarqueeHover(row, '.playlist-track-title');



      // Play row on click

      row.addEventListener('click', (e) => {

        if (e.target.closest('.playlist-track-actions') || e.target.closest('.playlist-drag-handle')) return;

        currentPlayingPlaylistId = pl.id;

        playTrack(track, pl.tracks, idx);

      });



      row.querySelector('.playlist-track-title')?.addEventListener('click', (e) => {

        e.stopPropagation();

        e.preventDefault();

        currentPlayingPlaylistId = pl.id;

        openTrackPage(track, pl.tracks, idx);

      });



      // Edit track button (customize cover, title, artist)

      row.querySelector('.btn-edit-track')?.addEventListener('click', (e) => {

        e.stopPropagation();

        openEditModal(track);

      });



      // Remove button

      row.querySelector('.btn-remove-track')?.addEventListener('click', async (e) => {

        e.stopPropagation();

        await api.removeFromPlaylist(pl.id, track.id, track.source);

        showToast(`${ICONS.trash} <span>Đã xóa khỏi playlist</span>`, 'info', 1800);

        await loadPlaylists();

      });



      // Intra-playlist reorder drag events & drag to sidebar playlists

      row.addEventListener('dragstart', (e) => {

        draggedRowIndex = idx;

        row.classList.add('dragging');

        e.dataTransfer.effectAllowed = 'copyMove';

        e.dataTransfer.setData('text/playlist-index', String(idx));

        try {

          e.dataTransfer.setData('application/json', JSON.stringify(track));

          e.dataTransfer.setData('text/plain', JSON.stringify(track));

        } catch (err) {}

        window.__draggedTrack = track;

      });



      row.addEventListener('dragend', () => {

        row.classList.remove('dragging');

        window.__draggedTrack = null;

        document.querySelectorAll('.playlist-track-row').forEach(r => {

          r.classList.remove('drag-over-top', 'drag-over-bottom');

        });

      });



      row.addEventListener('dragover', (e) => {

        e.preventDefault();

        e.dataTransfer.dropEffect = 'move';

        const rect = row.getBoundingClientRect();

        const isBottom = (e.clientY - rect.top) > (rect.height / 2);

        row.classList.toggle('drag-over-top', !isBottom);

        row.classList.toggle('drag-over-bottom', isBottom);

      });



      row.addEventListener('dragleave', () => {

        row.classList.remove('drag-over-top', 'drag-over-bottom');

      });



      row.addEventListener('drop', async (e) => {

        e.preventDefault();

        row.classList.remove('drag-over-top', 'drag-over-bottom');



        const fromIndexStr = e.dataTransfer.getData('text/playlist-index');

        if (fromIndexStr !== '') {

          const fromIndex = parseInt(fromIndexStr, 10);

          const rect = row.getBoundingClientRect();

          const isBottom = (e.clientY - rect.top) > (rect.height / 2);

          let toIndex = isBottom ? idx + 1 : idx;

          if (fromIndex < toIndex) toIndex--;



          if (fromIndex !== toIndex && fromIndex >= 0 && fromIndex < pl.tracks.length) {

            const reordered = [...pl.tracks];

            const [moved] = reordered.splice(fromIndex, 1);

            reordered.splice(toIndex, 0, moved);

            await api.reorderPlaylistTracks(pl.id, reordered);

            await loadPlaylists();

          }

        } else {

          // External track dropped into list

          const rawJson = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain');

          if (rawJson) {

            try {

              const droppedTrack = JSON.parse(rawJson);

              if (droppedTrack && droppedTrack.id) {

                await api.addToPlaylist(pl.id, droppedTrack);

                showToast(`${ICONS.success} <span>Đã thêm vào playlist</span>`, 'success', 1800);

                await loadPlaylists();

              }

            } catch (err) {}

          }

        }

      });



      playlistTracksContainer.appendChild(row);

    });



    updatePlaylistTracksPlayState();

  }



  // Playlist Header Actions

  btnSidebarCreatePlaylist?.addEventListener('click', async (e) => {

    e.preventDefault();

    const count = userPlaylists.length + 1;

    const name = `Playlist của tôi #${count}`;

    try {

      const newPl = await api.createPlaylist(name);

      await loadPlaylists();

      if (newPl) {

        openPlaylist(newPl.id);

        showToast(`${ICONS.plus} <span>Đã tạo <b>${escapeHtml(name)}</b></span>`, 'success', 1800);

        // Trigger rename mode immediately

        setTimeout(() => {

          startRenamePlaylist();

        }, 100);

      }

    } catch (err) {

      showToast('<span>Lỗi tạo playlist</span>', 'error');

    }

  });



  function startRenamePlaylist() {

    if (!playlistTitleDisplay || !playlistTitleInput || !currentPlaylistId) return;

    playlistTitleDisplay.classList.add('hidden');

    playlistTitleInput.classList.remove('hidden');

    playlistTitleInput.focus();

    playlistTitleInput.select();

  }



  async function saveRenamePlaylist() {

    if (!playlistTitleInput || !currentPlaylistId) return;

    const newName = playlistTitleInput.value.trim();

    const pl = userPlaylists.find(p => p.id === currentPlaylistId);

    playlistTitleInput.classList.add('hidden');

    if (playlistTitleDisplay) playlistTitleDisplay.classList.remove('hidden');



    if (newName && pl && newName !== pl.name) {

      try {

        await api.updatePlaylist(currentPlaylistId, newName);

        if (playlistTitleDisplay) playlistTitleDisplay.textContent = newName;

        showToast(`${ICONS.success} <span>Đã đổi tên thành <b>${escapeHtml(newName)}</b></span>`, 'success', 1800);

        await loadPlaylists();

      } catch (err) {

        showToast('<span>Lỗi đổi tên playlist</span>', 'error');

      }

    }

  }



  playlistTitleDisplay?.addEventListener('dblclick', () => {

    startRenamePlaylist();

  });



  playlistTitleInput?.addEventListener('blur', () => {

    saveRenamePlaylist();

  });



  playlistTitleInput?.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {

      playlistTitleInput.blur();

    } else if (e.key === 'Escape') {

      playlistTitleInput.classList.add('hidden');

      if (playlistTitleDisplay) playlistTitleDisplay.classList.remove('hidden');

    }

  });



  function updatePlaylistPlayBtnState() {

    if (!btnPlayPlaylist) return;

    const pl = currentPlaylistId ? userPlaylists.find(p => p.id === currentPlaylistId) : null;

    const isThisPlaylistCurrent = isPlaying && pl && currentTrack && (

      (currentPlayingPlaylistId && currentPlayingPlaylistId === pl.id) ||

      (pl.tracks && pl.tracks.some(t => (

        (t.id && currentTrack.id && String(t.id) === String(currentTrack.id) && (!t.source || !currentTrack.source || t.source === currentTrack.source)) ||

        (t.title && currentTrack.title && t.title.trim().toLowerCase() === currentTrack.title.trim().toLowerCase())

      )))

    );



    if (isThisPlaylistCurrent) {

      btnPlayPlaylist.innerHTML = ICONS.playlistPause;

    } else {

      btnPlayPlaylist.innerHTML = ICONS.playlistPlay;

    }

  }



  btnPlayPlaylist?.addEventListener('click', () => {

    if (!currentPlaylistId) return;

    const pl = userPlaylists.find(p => p.id === currentPlaylistId);

    if (!pl || !pl.tracks || pl.tracks.length === 0) {

      showToast('<span>Playlist chưa có bài hát</span>', 'info', 1800);

      return;

    }



    const isThisPlaylistCurrent = (currentPlayingPlaylistId === pl.id) ||

      (currentTrack && pl.tracks.some(t => (

        (t.id && currentTrack.id && String(t.id) === String(currentTrack.id) && (!t.source || !currentTrack.source || t.source === currentTrack.source)) ||

        (t.title && currentTrack.title && t.title.trim().toLowerCase() === currentTrack.title.trim().toLowerCase())

      )));



    if (isThisPlaylistCurrent) {

      if (isPlaying) {

        if (audio) audio.pause();

        isPlaying = false;

        if (playIcon) playIcon.innerHTML = ICONS.play;

        if (visualizer) visualizer.classList.remove('playing');

        api.updateDiscordActivity(currentTrack, audio ? audio.currentTime : 0, false);

        updateTrackCardsPlayState();

      } else {

        resumeOrPlayTrack(currentTrack);

      }

    } else {

      currentPlayingPlaylistId = pl.id;

      playTrack(pl.tracks[0], pl.tracks, 0);

    }

  });



  function openConfirmDeleteModal(playlist) {

    if (!confirmDeletePlaylistModal) return;

    pendingDeletePlaylistId = playlist.id;

    if (confirmDeletePlaylistDesc) {

      const count = playlist.tracks?.length || 0;

      confirmDeletePlaylistDesc.textContent = `Playlist "${playlist.name}" đang có ${count} bài hát. Hành động này không thể hoàn tác.`;

    }

    confirmDeletePlaylistModal.style.display = 'flex';

    confirmDeletePlaylistModal.classList.add('open');

    confirmDeletePlaylistModal.classList.remove('hidden');

  }



  function closeConfirmDeleteModal() {

    if (confirmDeletePlaylistModal) {

      confirmDeletePlaylistModal.style.display = 'none';

      confirmDeletePlaylistModal.classList.remove('open');

      confirmDeletePlaylistModal.classList.add('hidden');

    }

    pendingDeletePlaylistId = null;

  }



  closeConfirmDeleteModal();



  btnConfirmDeleteCancel?.addEventListener('click', (e) => {

    e.preventDefault();

    closeConfirmDeleteModal();

  });



  confirmDeletePlaylistModal?.addEventListener('click', (e) => {

    if (e.target === confirmDeletePlaylistModal) {

      closeConfirmDeleteModal();

    }

  });



  btnConfirmDeleteOk?.addEventListener('click', async (e) => {

    e.preventDefault();

    if (!pendingDeletePlaylistId) return;

    const pl = userPlaylists.find(p => p.id === pendingDeletePlaylistId);

    const name = pl ? pl.name : 'playlist';

    const idToDelete = pendingDeletePlaylistId;

    closeConfirmDeleteModal();

    try {

      await api.deletePlaylist(idToDelete);

      showToast(`${ICONS.trash} <span>Đã xóa <b>${escapeHtml(name)}</b></span>`, 'info', 1800);

      if (currentPlaylistId === idToDelete) {

        currentPlaylistId = null;

        switchView('library');

      }

      await loadPlaylists();

    } catch (err) {

      showToast('<span>Lỗi xóa playlist</span>', 'error');

    }

  });



  btnDeleteCurrentPlaylist?.addEventListener('click', async (e) => {

    e?.preventDefault?.();

    e?.stopPropagation?.();

    if (!currentPlaylistId) return;

    const pl = userPlaylists.find(p => p.id === currentPlaylistId);

    if (!pl) return;

    // Nếu playlist đã có bài hát, hiển thị popup xác nhận: "Bạn chắc chứ ?", "Xóa luôn", "Thôi"

    if (pl.tracks && pl.tracks.length > 0) {

      openConfirmDeleteModal(pl);

      return;

    }

    // Nếu playlist rỗng (0 bài), xóa trực tiếp

    const name = pl.name || 'playlist';

    try {

      await api.deletePlaylist(currentPlaylistId);

      showToast(`${ICONS.trash} <span>Đã xóa <b>${escapeHtml(name)}</b></span>`, 'info', 1800);

      currentPlaylistId = null;

      await loadPlaylists();

      switchView('library');

    } catch (err) {

      showToast('<span>Lỗi xóa playlist</span>', 'error');

    }

  });



  // Drop target for dropping external song cards anywhere inside Playlist View

  viewPlaylist?.addEventListener('dragover', (e) => {

    e.preventDefault();

  });



  viewPlaylist?.addEventListener('drop', async (e) => {

    if (e.target.closest('.playlist-track-row')) return; // Handled by row drop

    e.preventDefault();

    if (!currentPlaylistId) return;

    const rawJson = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain');

    if (!rawJson) return;

    try {

      const droppedTrack = JSON.parse(rawJson);

      if (droppedTrack && droppedTrack.id) {

        await api.addToPlaylist(currentPlaylistId, droppedTrack);

        showToast(`${ICONS.success} <span>Đã thêm bài hát vào playlist</span>`, 'success', 1800);

        await loadPlaylists();

      }

    } catch (err) {}

  });



  // --- Add To Playlist Modal Logic ---

  let isLikedSelected = false;

  let isQueueSelected = false;

  let selectedPlaylistIds = new Set();



  // XU LI MODAL THEM BAI HAT VAO PLAYLIST
  function renderAddToPlaylistModalList() {

    if (!modalPlaylistsList || !pendingAddToPlaylistTrack) return;

    modalPlaylistsList.innerHTML = '';



    const track = pendingAddToPlaylistTrack;



    // 1. Special "Đã thích" Item (always present)

    const likedItem = document.createElement('div');

    likedItem.className = `modal-playlist-item ${isLikedSelected ? 'selected' : ''}`;

    likedItem.setAttribute('data-special', 'liked');

    likedItem.innerHTML = `

      <div style="display:flex;align-items:center;gap:14px;min-width:0;flex:1;">

        <div class="sidebar-playlist-thumb liked-special-thumb" style="width:48px;height:48px;border-radius:8px;background:var(--bg-surface-hover);display:flex;align-items:center;justify-content:center;color:var(--accent);flex-shrink:0;">

          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>

        </div>

        <div style="display:flex;flex-direction:column;min-width:0;flex:1;">

          <span class="modal-playlist-item-name" style="font-weight:700;font-size:14px;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Đã thích</span>

          <span class="modal-playlist-item-count" style="font-size:12px;color:var(--text-secondary);">${libraryTracks.length} bài</span>

        </div>

      </div>

      <div class="modal-playlist-check-wrap">

        <div class="modal-playlist-checkbox-custom">

          ${ICONS.check}

        </div>

      </div>

    `;



    likedItem.addEventListener('click', (e) => {

      e.preventDefault();

      isLikedSelected = !isLikedSelected;

      likedItem.classList.toggle('selected', isLikedSelected);

    });



    modalPlaylistsList.appendChild(likedItem);



    // 2. Special "Danh sách chờ" Item (always present)

    const queueItem = document.createElement('div');

    queueItem.className = `modal-playlist-item ${isQueueSelected ? 'selected' : ''}`;

    queueItem.setAttribute('data-special', 'queue');

    queueItem.innerHTML = `

      <div style="display:flex;align-items:center;gap:14px;min-width:0;flex:1;">

        <div class="sidebar-playlist-thumb queue-special-thumb" style="width:48px;height:48px;border-radius:8px;background:var(--bg-surface-hover);display:flex;align-items:center;justify-content:center;color:var(--accent);flex-shrink:0;">

          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>

            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>

          </svg>

        </div>

        <div style="display:flex;flex-direction:column;min-width:0;flex:1;">

          <span class="modal-playlist-item-name" style="font-weight:700;font-size:14px;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Danh sách chờ</span>

          <span class="modal-playlist-item-count" style="font-size:12px;color:var(--text-secondary);">${queue.length} bài</span>

        </div>

      </div>

      <div class="modal-playlist-check-wrap">

        <div class="modal-playlist-checkbox-custom">

          ${ICONS.check}

        </div>

      </div>

    `;



    queueItem.addEventListener('click', (e) => {

      e.preventDefault();

      isQueueSelected = !isQueueSelected;

      queueItem.classList.toggle('selected', isQueueSelected);

    });



    modalPlaylistsList.appendChild(queueItem);



    // 3. User Playlists

    userPlaylists.forEach(pl => {

      const isSelected = selectedPlaylistIds.has(pl.id);

      const item = document.createElement('div');

      item.className = `modal-playlist-item ${isSelected ? 'selected' : ''}`;

      item.setAttribute('data-id', pl.id);

      const coverUrl = getPlaylistCoverUrl(pl);



      item.innerHTML = `

        <div style="display:flex;align-items:center;gap:14px;min-width:0;flex:1;">

          <div class="sidebar-playlist-thumb" style="width:48px;height:48px;border-radius:8px;overflow:hidden !important;flex-shrink:0;position:relative;">

            ${coverUrl ? `<img src="${coverUrl}" alt="" style="position:absolute !important;inset:0 !important;width:100% !important;height:100% !important;object-fit:cover !important;object-position:center !important;display:block !important;z-index:2 !important;" onerror="this.parentElement.innerHTML='<svg width=\\'22\\' height=\\'22\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><path d=\\'M9 18V5l12-2v13\\'/><circle cx=\\'6\\' cy=\\'18\\' r=\\'3\\'/><circle cx=\\'18\\' cy=\\'16\\' r=\\'3\\'/></svg>'">` : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`}

          </div>

          <div style="display:flex;flex-direction:column;min-width:0;flex:1;">

            <span class="modal-playlist-item-name" style="font-weight:600;font-size:14px;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(pl.name)}</span>

            <span class="modal-playlist-item-count" style="font-size:12px;color:var(--text-secondary);">${pl.tracks ? pl.tracks.length : 0} bài</span>

          </div>

        </div>

        <div class="modal-playlist-check-wrap">

          <div class="modal-playlist-checkbox-custom">

            ${ICONS.check}

          </div>

        </div>

      `;



      item.addEventListener('click', (e) => {

        e.preventDefault();

        if (selectedPlaylistIds.has(pl.id)) {

          selectedPlaylistIds.delete(pl.id);

          item.classList.remove('selected');

        } else {

          selectedPlaylistIds.add(pl.id);

          item.classList.add('selected');

        }

      });



      modalPlaylistsList.appendChild(item);

    });

  }



  function openAddToPlaylistModal(track) {

    if (!addToPlaylistModal || !track) return;

    pendingAddToPlaylistTrack = track;

    if (newPlaylistQuickInput) newPlaylistQuickInput.value = '';



    // Pre-check if track is in liked songs, in queue, or in each playlist

    isLikedSelected = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

    isQueueSelected = queue.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

    selectedPlaylistIds = new Set();

    userPlaylists.forEach(pl => {

      if (pl.tracks && pl.tracks.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source))) {

        selectedPlaylistIds.add(pl.id);

      }

    });



    renderAddToPlaylistModalList();



    addToPlaylistModal.style.display = 'flex';

    addToPlaylistModal.classList.add('open');

    addToPlaylistModal.classList.remove('hidden');

    setTimeout(() => { newPlaylistQuickInput?.focus(); }, 50);

  }



  function closeAddToPlaylistModal() {

    if (addToPlaylistModal) {

      addToPlaylistModal.style.display = 'none';

      addToPlaylistModal.classList.remove('open');

      addToPlaylistModal.classList.add('hidden');

    }

    pendingAddToPlaylistTrack = null;

    selectedPlaylistIds.clear();

    isLikedSelected = false;

    isQueueSelected = false;

  }



  closeAddToPlaylistModal();



  btnAddPlaylistModalClose?.addEventListener('click', (e) => {

    e.preventDefault();

    closeAddToPlaylistModal();

  });



  btnAddPlaylistCancel?.addEventListener('click', (e) => {

    e.preventDefault();

    closeAddToPlaylistModal();

  });



  addToPlaylistModal?.addEventListener('click', (e) => {

    if (e.target === addToPlaylistModal) {

      closeAddToPlaylistModal();

    }

  });



  // Confirm ("Chốt") action

  btnAddPlaylistConfirm?.addEventListener('click', async (e) => {

    e.preventDefault();

    if (!pendingAddToPlaylistTrack) {

      closeAddToPlaylistModal();

      return;

    }



    const track = pendingAddToPlaylistTrack;



    try {

      // 1. Sync "Đã thích"

      const initialLiked = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

      if (isLikedSelected && !initialLiked) {

        await api.saveTrack(track);

      } else if (!isLikedSelected && initialLiked) {

        await api.deleteTrack(track.id, track.source);

      }



      // 2. Sync "Danh sách chờ"

      const initialInQueue = queue.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

      if (isQueueSelected && !initialInQueue) {

        addTrackToQueue(track, null, false);

      } else if (!isQueueSelected && initialInQueue) {

        for (let i = queue.length - 1; i >= 0; i--) {

          if (SoSanhTrungBaiHat(queue[i].id, queue[i].source, track.id, track.source)) {

            removeTrackFromQueue(i, false);

          }

        }

      }



      // 3. Sync user playlists

      for (const pl of userPlaylists) {

        const initialInPl = pl.tracks && pl.tracks.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

        const nowInPl = selectedPlaylistIds.has(pl.id);

        if (nowInPl && !initialInPl) {

          await api.addToPlaylist(pl.id, track);

        } else if (!nowInPl && initialInPl) {

          await api.removeFromPlaylist(pl.id, track.id, track.source);

        }

      }



      closeAddToPlaylistModal();

      showToast(`${ICONS.success} <span>Đã cập nhật danh sách phát</span>`, 'success', 2000);



      await loadLibrary();

      await loadPlaylists();



      if (activeView === 'playlist' && currentPlaylistId) {

        renderPlaylistView(currentPlaylistId);

      }

      if (activeView === 'explore') {

        applyFilter();

      }

      if (currentTrack && currentTrack.id === track.id && currentTrack.source === track.source) {

        updatePlayerBarUI(currentTrack);

      }

    } catch (err) {

      console.error('Error syncing playlists:', err);

      showToast('<span>Lỗi cập nhật playlist</span>', 'error', 2200);

    }

  });



  async function handleQuickCreatePlaylist() {

    if (!newPlaylistQuickInput) return;

    const name = newPlaylistQuickInput.value.trim();

    if (!name) return;

    try {

      const newPl = await api.createPlaylist(name);

      if (newPl) {

        // Automatically check new playlist

        selectedPlaylistIds.add(newPl.id);

        await loadPlaylists();

        renderAddToPlaylistModalList();

        newPlaylistQuickInput.value = '';

        showToast(`${ICONS.plus} <span>Đã tạo <b>${escapeHtml(name)}</b></span>`, 'success', 1800);

      }

    } catch (err) {

      showToast('<span>Lỗi tạo playlist</span>', 'error');

    }

  }



  btnCreatePlaylistQuick?.addEventListener('click', (e) => {

    e.preventDefault();

    handleQuickCreatePlaylist();

  });



  newPlaylistQuickInput?.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {

      e.preventDefault();

      handleQuickCreatePlaylist();

    }

  });



  // --- Crossfade Audio Engine Transitions ---

  let freshTrackPlayStartTime = null;

  let crossfadeTriggeredForCurrent = false;



  // XU LI DONG CO PHAT NHAC (AUDIO ENGINE) VA DIEU KHIEN PHAT
  function cancelCrossfade() {

    crossfadeCancelToken++;

    if (gapTimeoutId) {

      clearTimeout(gapTimeoutId);

      gapTimeoutId = null;

    }

    crossfadeTriggeredForCurrent = false;

    freshTrackPlayStartTime = null;

    if (crossfadeTimer) {

      clearInterval(crossfadeTimer);

      crossfadeTimer = null;

    }

    if (isCrossfading) {

      if (secondaryAudio) {

        try {

          secondaryAudio.pause();

          secondaryAudio.src = '';

        } catch (e) {}

      }

      if (audio) {

        audio.volume = currentVolume;

      }

      isCrossfading = false;

    }

  }



  function updateAudioVolumes() {

    if (!crossfadeEnabled) {

      if (audio) audio.volume = currentVolume;

      if (secondaryAudio) secondaryAudio.volume = currentVolume;

      return;

    }

    const currentVol = currentVolume;



    // 1. Âm lượng Bài A (Audio chính)

    if (audio && !audio.paused && audio.duration) {

      let volA = 1.0;

      // Fade out độc lập theo thời lượng crossfadeDurA và độ cong crossfadeCurveA

      if (crossfadeDurA > 0) {

        const timeLeft = audio.duration - audio.currentTime;

        if (timeLeft <= crossfadeDurA && timeLeft >= 0) {

          const prog = 1.0 - (timeLeft / crossfadeDurA);

          volA = calculateCrossfadeVolume(prog, 'out', crossfadeCurveA);

        }

      }

      // Fade in của Bài A nếu bài vừa bắt đầu mới

      if (freshTrackPlayStartTime && crossfadeDurB > 0) {

        const elapsed = (Date.now() - freshTrackPlayStartTime) / 1000;

        if (elapsed <= crossfadeDurB) {

          const prog = elapsed / crossfadeDurB;

          const volIn = calculateCrossfadeVolume(prog, 'in', crossfadeCurveB);

          volA = Math.min(volA, volIn);

        } else {

          freshTrackPlayStartTime = null;

        }

      }

      audio.volume = Math.max(0, Math.min(1, volA)) * currentVol;

    }



    // 2. Âm lượng Bài B (Audio phụ - đang phát trong lúc đan xen overlap)

    if (secondaryAudio && !secondaryAudio.paused && secondaryAudio.duration) {

      let volB = 1.0;

      if (crossfadeDurB > 0) {

        const elapsed = secondaryAudio.currentTime;

        if (elapsed <= crossfadeDurB) {

          const prog = elapsed / crossfadeDurB;

          volB = calculateCrossfadeVolume(prog, 'in', crossfadeCurveB);

        }

      }

      secondaryAudio.volume = Math.max(0, Math.min(1, volB)) * currentVol;

    }

  }

  

  setInterval(updateAudioVolumes, 40);



  async function startCrossfadeToNext(nextTrack, nextIdx) {

    if (isCrossfading || !secondaryAudio || !audio) return;

    isCrossfading = true;

    

    let resolvedUrl = nextTrack.streamUrl;

    if (nextTrack.source === 'youtube') {

      try {

        const res = await window.__TAURI__.invoke('get_youtube_stream', { videoId: nextTrack.id });

        resolvedUrl = res.url;

      } catch (e) {

        isCrossfading = false;

        crossfadeTriggeredForCurrent = false;

        return;

      }

    } else if (!resolvedUrl) {

      try {

        const streamInfo = await api.getStreamUrl(nextTrack);

        resolvedUrl = streamInfo?.streamUrl;

      } catch (e) {

        isCrossfading = false;

        crossfadeTriggeredForCurrent = false;

        return;

      }

    }

    if (!resolvedUrl) {

      isCrossfading = false;

      crossfadeTriggeredForCurrent = false;

      return;

    }



    secondaryAudio.src = resolvedUrl;

    secondaryAudio.volume = 0;

    

    const playPromise = secondaryAudio.play();

    if (playPromise !== undefined) {

      playPromise.catch(err => {

        console.warn('Cannot overlap:', err);

        isCrossfading = false;

        crossfadeTriggeredForCurrent = false;

      });

    }

    

    currentTrack = nextTrack;

    queueIndex = nextIdx;

    updatePlayerBarUI(nextTrack);

    if (titlebarNowPlaying) titlebarNowPlaying.textContent = nextTrack.title + ' - ' + nextTrack.artist;

    renderQueue();

    updateAbMarkersUI();

    updateTrackCardsPlayState();

    persistPlaybackState();

    api.updateDiscordActivity(nextTrack, 0, true);

  }



  // --- Playback Engine ---

  async function playTrack(rawTrack, playlistContext = null, indexInPlaylist = 0, startTime = null) {

    if (!rawTrack) return;

    cancelCrossfade();

    if (gapTimeoutId) { clearTimeout(gapTimeoutId); gapTimeoutId = null; }

    const requestId = ++activePlayRequestId;



    if (playlistContext) {

      queue = [...playlistContext];

      queueIndex = indexInPlaylist;

    }



    const saved = TimBaiHatTrongThuVien(rawTrack);

    const track = saved ? { ...rawTrack, ...saved } : rawTrack;



    currentTrack = track;

    updatePlayerBarUI(track);

    updateAbMarkersUI();

    if (titlebarNowPlaying) titlebarNowPlaying.textContent = `${track.title} - ${track.artist}`;

    if (playIcon) playIcon.innerHTML = ICONS.loading;



    const trackSec = parseDurationSec(track.duration, track.durationFormatted);

    if (trackSec > 0 && timeTotal) {

      const hasHours = trackSec >= 3600;

      timeTotal.textContent = formatTime(trackSec, hasHours);

      if (timeCurrent) timeCurrent.textContent = formatTime(startTime || 0, hasHours);

      if (typeof startTime === 'number' && startTime > 0) {

        const progress = (startTime / trackSec) * 100;

        if (seekSlider) seekSlider.value = progress;

        if (progressFill) progressFill.style.width = `${progress}%`;

      }

    }



    persistPlaybackState();



    try {

      const streamInfo = await api.getStreamUrl(track);

      if (requestId !== activePlayRequestId) return; 



      if (!streamInfo?.streamUrl) throw new Error('Không có luồng âm thanh khả dụng');



      if (audio) {

        audio.src = streamInfo.streamUrl;

        audio.volume = (crossfadeEnabled && crossfadeDurB > 0 && (!startTime || startTime <= 0.1)) ? 0 : currentVolume;

        const seg = getCurrentAbSegment();

        const coPhanDoanAB = seg && seg.start != null && seg.end != null && seg.end > seg.start;

        audio.loop = (repeatMode === 'one' && !coPhanDoanAB);

        const targetTime = (seg && seg.start != null && seg.end != null && seg.end > seg.start)

          ? seg.start

          : (typeof startTime === 'number' && startTime > 0 ? startTime : 0);



        if (targetTime > 0) {

          const onLoadedMetadata = () => {

            try { audio.currentTime = targetTime; } catch (e) {}

          };

          audio.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });

          try { audio.currentTime = targetTime; } catch (e) {}

        }

        await audio.play().catch(() => {});

      }



      if (requestId !== activePlayRequestId) return;



      isPlaying = true;

      crossfadeTriggeredForCurrent = false;

      if (crossfadeEnabled && crossfadeDurB > 0 && (!startTime || startTime <= 0.1)) {

        freshTrackPlayStartTime = Date.now();

      } else {

        freshTrackPlayStartTime = null;

        if (audio) audio.volume = currentVolume;

      }

      addToHistory(track);

      if (playIcon) playIcon.innerHTML = ICONS.pause;

      if (visualizer) visualizer.classList.add('playing');

      renderQueue();

      updateAbMarkersUI();

      updateTrackCardsPlayState();

      persistPlaybackState();



      api.updateDiscordActivity(track, audio ? audio.currentTime : (startTime || 0), true);

    } catch (err) {

      if (requestId !== activePlayRequestId) return;

      console.error('[Player] Error:', err);

      showToast('<span>Không thể phát bài này</span>', 'error', 2200);

      if (playIcon) playIcon.innerHTML = ICONS.play;

      isPlaying = false;

      if (visualizer) visualizer.classList.remove('playing');

      updateTrackCardsPlayState();

    }

  }



  function resumeOrPlayTrack(trackToPlay = null, context = null, index = 0, resumeTime = null) {

    const target = trackToPlay || currentTrack;

    if (!target) {

      if (queue.length) playTrack(queue[0], queue, 0);

      return;

    }



    const hasValidSrc = audio && audio.src && audio.src !== '' && audio.src !== window.location.href && !audio.error;

    const isSameTrack = currentTrack && target && currentTrack.id === target.id && currentTrack.source === target.source;



    if (hasValidSrc && isSameTrack && audio.readyState >= 2) {

      const seg = getCurrentAbSegment();

      const coPhanDoanAB = seg && seg.start != null && seg.end != null && seg.end > seg.start;

      audio.loop = (repeatMode === 'one' && !coPhanDoanAB);

      audio.play().then(() => {

        isPlaying = true;

        if (playIcon) playIcon.innerHTML = ICONS.pause;

        if (visualizer) visualizer.classList.add('playing');

        api.updateDiscordActivity(currentTrack, audio ? audio.currentTime : 0, true);

        updateTrackCardsPlayState();

        persistPlaybackState();

      }).catch((err) => {

        console.warn('Direct audio.play() failed, re-fetching stream with playTrack:', err);

        const timeToResume = typeof resumeTime === 'number' ? resumeTime : (audio.currentTime || 0);

        playTrack(target, context || (queue.length ? queue : null), index, timeToResume);

      });

      return;

    }



    const timeToResume = (typeof resumeTime === 'number')

      ? resumeTime

      : ((typeof restoredPlaybackTime === 'number' && restoredPlaybackTime > 0) ? restoredPlaybackTime : (audio && audio.currentTime > 0 ? audio.currentTime : 0));

    restoredPlaybackTime = null;



    playTrack(target, context || (queue.length ? queue : null), index, timeToResume);

  }



  function updateTrackCardsPlayState() {

    document.querySelectorAll('.track-card').forEach(c => {

      const btn = c.querySelector('.overlay-play-btn');

      if (!btn) return;

      const isCurrentCard = c.classList.contains('playing-now');

      if (isCurrentCard && isPlaying) {

        btn.innerHTML = ICONS.pause;

      } else {

        btn.innerHTML = ICONS.play;

      }

    });



    updatePlaylistPlayBtnState();

    updateQueuePlayState();

    updatePlaylistTracksPlayState();



    if (trackPagePlayIcon) {

      trackPagePlayIcon.innerHTML = isPlaying ? ICONS.pause : ICONS.play;

    }

  }



  function updateQueuePlayState() {

    if (!queueList) return;

    const items = queueList.querySelectorAll('.queue-item');

    items.forEach((item) => {

      const idx = parseInt(item.getAttribute('data-queue-idx'), 10);

      const isCurrent = idx === queueIndex;

      item.classList.toggle('active', isCurrent);

      const indicator = item.querySelector('.queue-playing-indicator');

      if (indicator) {

        if (isCurrent) {

          indicator.innerHTML = isPlaying ? ICONS.pause : ICONS.play;

          indicator.setAttribute('aria-label', isPlaying ? 'Tạm dừng' : 'Tiếp tục');

        } else {

          indicator.innerHTML = ICONS.play;

          indicator.setAttribute('aria-label', 'Phát');

        }

      }

    });

  }



  function updatePlaylistTracksPlayState() {

    if (!playlistTracksContainer) return;

    const rows = playlistTracksContainer.querySelectorAll('.playlist-track-row');

    if (!rows.length) return;



    const pl = currentPlaylistId ? userPlaylists.find(p => p.id === currentPlaylistId) : null;

    const isPlayingThisPlaylist = !!(

      pl && (

        (currentPlayingPlaylistId && currentPlayingPlaylistId === pl.id) ||

        (queue && pl.tracks && queue.length === pl.tracks.length && queueIndex >= 0 && queueIndex < rows.length)

      )

    );



    rows.forEach((row, idx) => {

      let isCurrent = false;



      if (isPlayingThisPlaylist && queueIndex >= 0) {

        isCurrent = (idx === queueIndex);

      } else if (currentTrack) {

        const rowId = row.getAttribute('data-id');

        const rowSource = row.getAttribute('data-source');

        const rowTitle = row.getAttribute('data-title') || row.querySelector('.playlist-track-title .title-text')?.textContent || '';

        const rowArtist = row.getAttribute('data-artist') || row.querySelector('.playlist-track-artist')?.textContent || '';



        const curId = currentTrack.id ? String(currentTrack.id) : '';

        const curSource = currentTrack.source || '';

        const curTitle = (currentTrack.title || '').trim().toLowerCase();

        const curArtist = (currentTrack.artist || '').trim().toLowerCase();



        const idMatch = !!(curId && rowId && curId === String(rowId) && (!curSource || !rowSource || curSource === rowSource));

        const titleMatch = !!(curTitle && rowTitle && curTitle === rowTitle.trim().toLowerCase() &&

          (!curArtist || !rowArtist || curArtist === rowArtist.trim().toLowerCase()));



        isCurrent = idMatch || titleMatch;

      }



      row.classList.toggle('playing-now', !!isCurrent);

    });



    updatePlaylistPlayBtnState();

  }



  function updatePlayerBarUI(track) {

    const coverUrl = resolveCoverUrl(track);

    if (playerCover) {

      playerCover.onerror = () => { playerCover.style.display = 'none'; };

      if (coverUrl) {

        playerCover.style.display = '';

        playerCover.src = coverUrl;

      } else {

        playerCover.style.display = 'none';

      }

    }

    if (playerTitle) {

      playerTitle.removeAttribute('title');

      playerTitle.innerHTML = `<span class="title-text">${escapeHtml(track.title || '')}</span>`;

      attachMarqueeHover(playerTitle.closest('.player-left') || playerTitle.parentElement || playerTitle, '.track-title');

    }

    if (playerArtist) playerArtist.textContent = track.artist;

    const isSaved = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

    if (playerBtnFav) {

      playerBtnFav.innerHTML = isSaved ? ICONS.heartSolid : ICONS.heartOutline;

    }

    if (playerMenuFavIcon) {

      playerMenuFavIcon.innerHTML = isSaved ? ICONS.heartSolid : ICONS.heartOutline;

    }

    if (playerMenuFavText) {

      playerMenuFavText.textContent = isSaved ? 'Đã thích' : 'Yêu thích';

    }

    document.querySelectorAll('.track-card').forEach(c => {

      const isCurrent = currentTrack && (

        SoSanhTrungBaiHat(c.getAttribute('data-id'), c.getAttribute('data-source'), currentTrack.id, currentTrack.source) ||

        c.querySelector('.title-text')?.textContent === currentTrack.title

      );

      c.classList.toggle('playing-now', !!isCurrent);

    });

    updateTrackCardsPlayState();

    if (isTrackPageOpen) {

      updateTrackPageUI(track);

    }

  }



  btnPlayPause?.addEventListener('click', () => {

    if (!currentTrack) {

      if (queue.length) playTrack(queue[0], queue, 0);

      return;

    }

    if (isPlaying) {

      cancelCrossfade();

    if (gapTimeoutId) { clearTimeout(gapTimeoutId); gapTimeoutId = null; }

      if (audio) audio.pause();

      isPlaying = false;

      if (playIcon) playIcon.innerHTML = ICONS.play;

      if (visualizer) visualizer.classList.remove('playing');

      api.updateDiscordActivity(currentTrack, audio ? audio.currentTime : 0, false);

      updateTrackCardsPlayState();

      persistPlaybackState();

    } else {

      resumeOrPlayTrack(currentTrack);

    }

  });



  btnNext?.addEventListener('click', () => playNextTrack());

  btnPrev?.addEventListener('click', () => playPrevTrack());



  function playNextTrack() {

    cancelCrossfade();

    if (gapTimeoutId) { clearTimeout(gapTimeoutId); gapTimeoutId = null; }

    if (!queue.length) return;

    if (isShuffle) {

      let next;

      do { next = Math.floor(Math.random() * queue.length); } while (next === queueIndex && queue.length > 1);

      queueIndex = next;

    } else {

      queueIndex = (queueIndex + 1) % queue.length;

    }

    playTrack(queue[queueIndex]);

  }



  function playPrevTrack() {

    cancelCrossfade();

    if (gapTimeoutId) { clearTimeout(gapTimeoutId); gapTimeoutId = null; }

    if (!queue.length) return;

    if (audio && audio.currentTime > 3) { audio.currentTime = 0; return; }

    queueIndex = (queueIndex - 1 + queue.length) % queue.length;

    playTrack(queue[queueIndex]);

  }



  btnShuffle?.addEventListener('click', () => {

    isShuffle = !isShuffle;

    btnShuffle.classList.toggle('active', isShuffle);

    btnShuffle.innerHTML = isShuffle ? ICONS.shuffleOn : ICONS.shuffleOff;

    if (trackPageBtnShuffle) {

      trackPageBtnShuffle.classList.toggle('active', isShuffle);

      trackPageBtnShuffle.innerHTML = isShuffle ? ICONS.shuffleOn : ICONS.shuffleOff;

    }

    persistUserConfig();

  });



  function CapNhatGiaoDienLapLai() {

    const laLapMotBai = repeatMode === 'one';

    const laLapDanhSach = repeatMode === 'all';

    const dangBat = repeatMode !== 'off';



    const tieuDeMoTa = laLapMotBai 

      ? 'Đang lặp 1 bài (Bấm để lặp toàn bộ danh sách)' 

      : (laLapDanhSach ? 'Đang lặp toàn bộ danh sách (Bấm để tắt lặp lại)' : 'Lặp lại (Tắt - Bấm để lặp 1 bài)');



    if (btnRepeat) {

      btnRepeat.classList.toggle('active', dangBat);

      btnRepeat.innerHTML = laLapMotBai ? ICONS.repeatOne : (laLapDanhSach ? ICONS.repeatAll : ICONS.repeatOff);

      btnRepeat.title = tieuDeMoTa;

    }

    if (trackPageBtnRepeat) {

      trackPageBtnRepeat.classList.toggle('active', dangBat);

      trackPageBtnRepeat.innerHTML = laLapMotBai ? ICONS.repeatOne : (laLapDanhSach ? ICONS.repeatAll : ICONS.repeatOff);

      trackPageBtnRepeat.title = tieuDeMoTa;

    }



    const seg = getCurrentAbSegment();

    const coPhanDoanAB = seg && seg.start != null && seg.end != null && seg.end > seg.start;

    const canLapNative = (laLapMotBai && !coPhanDoanAB);

    if (audio) audio.loop = canLapNative;

    if (secondaryAudio) secondaryAudio.loop = canLapNative;

  }



  function ChuyenCheDoLapLai() {

    if (repeatMode === 'off') {

      repeatMode = 'one';

      showToast(`${ICONS.repeatOne} <span>Lặp lại 1 bài</span>`, 'info', 1600);

    } else if (repeatMode === 'one') {

      repeatMode = 'all';

      showToast(`${ICONS.repeatAll} <span>Lặp lại toàn bộ danh sách</span>`, 'info', 1600);

    } else {

      repeatMode = 'off';

      showToast(`${ICONS.repeatOff} <span>Tắt lặp lại</span>`, 'info', 1600);

    }

    CapNhatGiaoDienLapLai();

    persistUserConfig();

  }



  btnRepeat?.addEventListener('click', () => {

    ChuyenCheDoLapLai();

  });



  function setupAudioEngineEvents(audioEl) {

    if (!audioEl) return;



    audioEl.addEventListener('timeupdate', () => {

      if (audioEl !== audio) return;

      if (isSeeking) return;

      const duration = (audio.duration && isFinite(audio.duration)) ? audio.duration : parseDurationSec(currentTrack?.duration, currentTrack?.durationFormatted);

      if (!duration) return;



      // Check A-B Segment loop boundary

      const seg = getCurrentAbSegment();

      if (seg && seg.start != null && seg.end != null && seg.end > seg.start) {

        if (audio.currentTime >= seg.end) {

          if (repeatMode === 'one') {

            audio.currentTime = seg.start;

            audio.play().catch(() => {});

          } else if (repeatMode === 'all' || queueIndex < queue.length - 1) {

            playNextTrack();

          } else {

            audio.currentTime = seg.start;

            audio.pause();

            isPlaying = false;

            if (playIcon) playIcon.innerHTML = ICONS.play;

            if (visualizer) visualizer.classList.remove('playing');

            api.clearDiscordActivity();

            updateTrackCardsPlayState();

            persistPlaybackState();

          }

          return;

        }

      }



      // Check crossfade trigger condition (Overlap mode: crossfadeOverlap < 0)

      if (crossfadeEnabled && repeatMode !== 'one' && !isCrossfading && isPlaying && queue.length > 0) {

        const hasNext = (repeatMode === 'all') || (queueIndex < queue.length - 1);

        if (hasNext && duration > 4) {

          const timeLeft = duration - audio.currentTime;

          if (crossfadeOverlap < 0) {

            const overlapSec = Math.abs(crossfadeOverlap);

            if (timeLeft <= overlapSec && timeLeft > 0.3 && !crossfadeTriggeredForCurrent) {

              crossfadeTriggeredForCurrent = true;

              let nextIdx = queueIndex;

              if (isShuffle && queue.length > 1) {

                let randIdx;

                do {

                  randIdx = Math.floor(Math.random() * queue.length);

                } while (randIdx === queueIndex);

                nextIdx = randIdx;

              } else {

                nextIdx = (queueIndex + 1) % queue.length;

              }

              const nextTrack = queue[nextIdx];

              if (nextTrack) {

                startCrossfadeToNext(nextTrack, nextIdx);

              }

            }

          }

        }

      }



      const hasHours = duration >= 3600;

      const progress = (audio.currentTime / duration) * 100;

      if (seekSlider) seekSlider.value = progress;

      if (progressFill) progressFill.style.width = `${progress}%`;

      if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime, audio.currentTime >= 3600);

      if (timeTotal) timeTotal.textContent = formatTime(duration, hasHours);



      if (isTrackPageOpen && !isTrackPageSeeking) {

        if (trackPageSeekSlider) trackPageSeekSlider.value = progress;

        if (trackPageProgressFill) trackPageProgressFill.style.width = `${progress}%`;

        if (trackPageTimeCurrent) trackPageTimeCurrent.textContent = formatTime(audio.currentTime, audio.currentTime >= 3600);

        if (trackPageTimeTotal) trackPageTimeTotal.textContent = formatTime(duration, hasHours);

      }



      const now = Date.now();

      if (now - lastDiscordSync > 15000 && isPlaying && currentTrack) {

        lastDiscordSync = now;

        api.updateDiscordActivity(currentTrack, audio.currentTime, true);

        persistPlaybackState();

      }



      if (isPlaying && currentTrack) {

        updateContinueListening(currentTrack, audio.currentTime, duration);

      }

    });



    audioEl.addEventListener('ended', () => {

      if (audioEl !== audio) return;

      if (currentTrack) {

        removeContinueListening(currentTrack);

      }

      crossfadeTriggeredForCurrent = false;



      if (isCrossfading) {

        // Hoán đổi audio để secondaryAudio trở thành audio chính

        const temp = audio;

        audio = secondaryAudio;

        secondaryAudio = temp;

        

        secondaryAudio.pause();

        secondaryAudio.src = '';

        

        isCrossfading = false;

        isPlaying = true;

        

        if (playIcon) playIcon.innerHTML = ICONS.pause;

        if (visualizer) visualizer.classList.add('playing');

        return;

      }

      if (repeatMode === 'one') {

        const seg = getCurrentAbSegment();

        const targetTime = (seg && seg.start != null && seg.end != null && seg.end > seg.start) ? seg.start : 0;

        audio.currentTime = targetTime;

        const playPromise = audio.play();

        if (playPromise !== undefined) {

          playPromise.catch((err) => {

            console.warn('Lặp lại bài hát thất bại, tải lại luồng:', err);

            if (currentTrack) {

              playTrack(currentTrack, queue.length ? queue : null, queueIndex, targetTime);

            }

          });

        }

        return;

      }

      if (repeatMode === 'all' || queueIndex < queue.length - 1) {

        if (crossfadeEnabled && crossfadeOverlap > 0) {

          // KHOẢNG NGHỈ (GAP): Nghỉ crossfadeOverlap giây (tối đa 5s) trong im lặng rồi mới phát bài tiếp theo!

          isPlaying = false;

          if (playIcon) playIcon.innerHTML = ICONS.play;

          if (visualizer) visualizer.classList.remove('playing');

          if (gapTimeoutId) clearTimeout(gapTimeoutId);

          gapTimeoutId = setTimeout(() => {

            gapTimeoutId = null;

            playNextTrack();

          }, crossfadeOverlap * 1000);

        } else {

          // Liền mạch ngay lập tức (Gapless)

          playNextTrack();

        }

      } else {

        isPlaying = false;

        if (playIcon) playIcon.innerHTML = ICONS.play;

        if (visualizer) visualizer.classList.remove('playing');

        api.clearDiscordActivity();

      }

      updateTrackCardsPlayState();

      persistPlaybackState();

    });



    audioEl.addEventListener('play', () => {

      if (audioEl === audio && isTrackPageOpen) {

        BatDauPhanTichNhip();

      }

    });



    audioEl.addEventListener('pause', () => {

      if (audioEl === audio) {

        if (!isTrackPageOpen) {

          DungPhanTichNhip();

        }

      }

    });



    audioEl.addEventListener('loadedmetadata', () => {

      if (audioEl !== audio) return;

      updateAbMarkersUI();

    });

  }



  document.addEventListener('click', () => {

    if (boBoiAmThanh && boBoiAmThanh.state === 'suspended') {

      boBoiAmThanh.resume().catch(() => {});

    }

  }, { passive: true });



  setupAudioEngineEvents(audio);

  setupAudioEngineEvents(secondaryAudio);



  seekSlider?.addEventListener('input', () => {

    cancelCrossfade();

    if (gapTimeoutId) { clearTimeout(gapTimeoutId); gapTimeoutId = null; }

    isSeeking = true;

    if (progressFill) progressFill.style.width = `${seekSlider.value}%`;

    const duration = (audio && audio.duration && isFinite(audio.duration)) ? audio.duration : parseDurationSec(currentTrack?.duration, currentTrack?.durationFormatted);

    if (duration && timeCurrent) {

      const seekSec = (seekSlider.value / 100) * duration;

      timeCurrent.textContent = formatTime(seekSec, seekSec >= 3600);

    }

  });



  seekSlider?.addEventListener('change', () => {

    if (progressFill) progressFill.style.width = `${seekSlider.value}%`;

    const duration = (audio && audio.duration && isFinite(audio.duration)) ? audio.duration : parseDurationSec(currentTrack?.duration, currentTrack?.durationFormatted);

    if (duration && audio) {

      const seekSec = (seekSlider.value / 100) * duration;

      if (!audio.src || audio.src === '' || audio.src === window.location.href) {

        restoredPlaybackTime = seekSec;

      }

      const seg = getCurrentAbSegment();

      if (seg && seg.start != null && seg.end != null && seg.end > seg.start) {

        if (seekSec < seg.start || seekSec >= seg.end) {

          audio.currentTime = seg.start;

        } else {

          audio.currentTime = seekSec;

        }

      } else {

        try { audio.currentTime = seekSec; } catch (e) {}

      }

      if (currentTrack && isPlaying) {

        api.updateDiscordActivity(currentTrack, audio.currentTime, true);

      }

      persistPlaybackState();

    }

    isSeeking = false;

  });



  volumeSlider?.addEventListener('input', () => {

    currentVolume = volumeSlider.value / 100;

    if (audio) audio.volume = currentVolume;

    if (secondaryAudio && isCrossfading) secondaryAudio.volume = currentVolume;

    if (volumeFill) volumeFill.style.width = `${volumeSlider.value}%`;

    if (trackPageVolumeSlider) trackPageVolumeSlider.value = volumeSlider.value;

    if (trackPageVolumeFill) trackPageVolumeFill.style.width = `${volumeSlider.value}%`;

    updateVolumeIcon(currentVolume);

    persistUserConfig();

  });



  btnMute?.addEventListener('click', () => {

    if (!audio) return;

    if (audio.volume > 0) {

      audio.dataset.prevVolume = audio.volume;

      audio.volume = 0;

      if (volumeSlider) volumeSlider.value = 0;

      if (volumeFill) volumeFill.style.width = '0%';

      if (trackPageVolumeSlider) trackPageVolumeSlider.value = 0;

      if (trackPageVolumeFill) trackPageVolumeFill.style.width = '0%';

      updateVolumeIcon(0);

    } else {

      const restore = parseFloat(audio.dataset.prevVolume) || 0.8;

      audio.volume = restore;

      if (volumeSlider) volumeSlider.value = restore * 100;

      if (volumeFill) volumeFill.style.width = `${restore * 100}%`;

      if (trackPageVolumeSlider) trackPageVolumeSlider.value = restore * 100;

      if (trackPageVolumeFill) trackPageVolumeFill.style.width = `${restore * 100}%`;

      updateVolumeIcon(restore);

    }

    currentVolume = audio.volume;

    persistUserConfig();

  });



  // XU LI THANH PHAT NHAC DUOI CUNG (MASTER PLAYER BAR) VA MENU FLOATING
  function updateVolumeIcon(vol) {

    const icon = vol === 0 ? ICONS.volMute : vol < 0.5 ? ICONS.volLow : ICONS.volHigh;

    if (btnMute) btnMute.innerHTML = icon;

    if (trackPageBtnMute) trackPageBtnMute.innerHTML = icon;

  }



  playerBtnFav?.addEventListener('click', async () => {

    if (!currentTrack) return;

    await toggleSaveTrack(currentTrack);

    playerBtnFav.innerHTML = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, currentTrack.id, currentTrack.source)) ? ICONS.heartSolid : ICONS.heartOutline;

  });



  playerBtnDownload?.addEventListener('click', async () => {

    if (!currentTrack) { showToast('<span>Chọn bài hát để tải</span>', 'info', 1800); return; }

    playerBtnDownload.innerHTML = ICONS.loading;

    try {

      const res = await api.downloadTrack(currentTrack);

      playerBtnDownload.innerHTML = ICONS.success;

      showToast(`${ICONS.download} <span>Đã tải xong !</span>`, 'success', 2200);

      setTimeout(() => { playerBtnDownload.innerHTML = ICONS.download; }, 3000);

    } catch (err) {

      playerBtnDownload.innerHTML = ICONS.error;

      showToast(`<span>Lỗi tải nhạc</span>`, 'error', 2200);

      setTimeout(() => { playerBtnDownload.innerHTML = ICONS.download; }, 3000);

    }

  });



  // --- Bottom Player Bar Extra Actions ---

  // 1. Drag & Drop currently playing track from playerLeft

  playerLeft?.addEventListener('dragstart', (e) => {

    if (!currentTrack) {

      e.preventDefault();

      return false;

    }

    if (e.target.closest('button') || e.target.closest('.player-more-dropdown-container')) {

      e.preventDefault();

      return false;

    }

    try {

      e.dataTransfer.effectAllowed = 'copyMove';

      e.dataTransfer.setData('application/json', JSON.stringify(currentTrack));

      e.dataTransfer.setData('text/plain', JSON.stringify(currentTrack));

      playerLeft.classList.add('dragging');

      window.__draggedTrack = currentTrack;

    } catch (err) {}

  });



  playerLeft?.addEventListener('dragend', () => {

    playerLeft.classList.remove('dragging');

    window.__draggedTrack = null;

  });



  // --- Bottom Player Bar 3-Dots Menu & Global Track Floating Menu ---

  function closePlayerMoreMenu() {

    if (playerMoreMenu) {

      playerMoreMenu.classList.add('hidden');

      playerMoreMenu.style.display = 'none';

    }

  }



  playerBtnMore?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!currentTrack) {

      showToast('<span>Chưa có bài hát nào đang phát</span>', 'info', 1800);

      return;

    }

    closeTrackFloatingMenu();

    if (playerMoreMenu) {

      const isClosed = playerMoreMenu.classList.contains('hidden') || playerMoreMenu.style.display === 'none';

      if (isClosed) {

        const isSaved = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, currentTrack.id, currentTrack.source));

        if (playerMenuFavIcon) playerMenuFavIcon.innerHTML = isSaved ? ICONS.heartSolid : ICONS.heartOutline;

        if (playerMenuFavText) playerMenuFavText.textContent = isSaved ? 'Đã thích' : 'Yêu thích';

        playerMoreMenu.classList.remove('hidden');

        playerMoreMenu.style.display = 'flex';

      } else {

        closePlayerMoreMenu();

      }

    }

  });



  playerMenuFav?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!currentTrack) return;

    await toggleSaveTrack(currentTrack);

    const isSaved = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, currentTrack.id, currentTrack.source));

    if (playerMenuFavIcon) playerMenuFavIcon.innerHTML = isSaved ? ICONS.heartSolid : ICONS.heartOutline;

    if (playerMenuFavText) playerMenuFavText.textContent = isSaved ? 'Đã thích' : 'Yêu thích';

    closePlayerMoreMenu();

  });



  playerMenuAddPlaylist?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    closePlayerMoreMenu();

    if (!currentTrack) return;

    openAddToPlaylistModal(currentTrack);

  });



  playerMenuEdit?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    closePlayerMoreMenu();

    if (!currentTrack) return;

    openEditModal(currentTrack);

  });



  playerMenuDownload?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    closePlayerMoreMenu();

    if (!currentTrack) return;

    showToast(`${ICONS.download} <span>Đang chuẩn bị tải...</span>`, 'info', 1800);

    try {

      const res = await api.downloadTrack(currentTrack);

      showToast(`${ICONS.download} <span>Đã tải xong: ${escapeHtml(res?.filename || currentTrack.title)}</span>`, 'success', 2500);

    } catch (err) {

      showToast(`<span>Lỗi tải nhạc: ${formatError(err)}</span>`, 'error', 2500);

    }

  });



  playerMenuCopyUrl?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    closePlayerMoreMenu();

    if (!currentTrack) return;

    const shareUrl = getPlatformShareUrl(currentTrack);

    if (!shareUrl) {

      showToast('<span>Không tìm thấy liên kết bài hát</span>', 'error', 2000);

      return;

    }

    const ok = await copyToClipboard(shareUrl);

    if (ok) {

      showToast(`${ICONS.link} <span>Đã sao chép liên kết</span>`, 'success', 2000);

    }

  });



  playerMenuCopyTitle?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    closePlayerMoreMenu();

    if (!currentTrack) return;

    const titleToCopy = (currentTrack.title || playerTitle?.textContent || '').trim();

    if (!titleToCopy) return;

    const ok = await copyToClipboard(titleToCopy);

    if (ok) {

      showToast(`${ICONS.copy} <span>Đã sao chép: <b>${escapeHtml(titleToCopy)}</b></span>`, 'success', 2000);

    }

  });



  // --- Global Track Floating 3-Dots Menu (for Horizontal Cards) ---

  let activeMenuTrack = null;

  let activeMenuAnchorCard = null;



  function closeTrackFloatingMenu() {

    if (trackFloatingMenu) {

      trackFloatingMenu.classList.add('hidden');

      trackFloatingMenu.style.display = 'none';

    }

    if (activeMenuAnchorCard) {

      activeMenuAnchorCard.classList.remove('menu-open');

      activeMenuAnchorCard = null;

    }

    activeMenuTrack = null;

  }



  function openTrackFloatingMenu(track, anchorEl, isLibraryView = false) {

    if (!trackFloatingMenu || !anchorEl || !track) return;



    if (activeMenuTrack && SoSanhTrungBaiHat(activeMenuTrack.id, activeMenuTrack.source, track.id, track.source) && !trackFloatingMenu.classList.contains('hidden')) {

      closeTrackFloatingMenu();

      return;

    }



    closePlayerMoreMenu();

    closeTrackFloatingMenu();



    activeMenuTrack = track;

    activeMenuAnchorCard = anchorEl.closest('.track-card');

    if (activeMenuAnchorCard) {

      activeMenuAnchorCard.classList.add('menu-open');

    }



    const isSaved = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, track.id, track.source));

    if (trackMenuFavIcon) trackMenuFavIcon.innerHTML = isSaved ? ICONS.heartSolid : ICONS.heartOutline;

    if (trackMenuFavText) trackMenuFavText.textContent = isSaved ? 'Đã thích' : 'Yêu thích';



    if (trackMenuDelete) {

      trackMenuDelete.style.display = (isLibraryView || isSaved) ? 'flex' : 'none';

      const label = trackMenuDelete.querySelector('span:last-child');

      if (label) label.textContent = isLibraryView ? 'Xóa khỏi thư viện' : 'Bỏ lưu khỏi thư viện';

    }



    trackFloatingMenu.style.visibility = 'hidden';

    trackFloatingMenu.style.display = 'flex';

    trackFloatingMenu.classList.remove('hidden');



    const rect = anchorEl.getBoundingClientRect();

    const menuWidth = trackFloatingMenu.offsetWidth || 210;

    const menuHeight = trackFloatingMenu.offsetHeight || 220;



    let top = rect.bottom + 6;

    let left = rect.right - menuWidth;



    if (top + menuHeight > window.innerHeight - 10) {

      top = rect.top - menuHeight - 6;

    }

    if (left < 10) left = 10;

    if (left + menuWidth > window.innerWidth - 10) {

      left = window.innerWidth - menuWidth - 10;

    }



    trackFloatingMenu.style.top = `${Math.round(top)}px`;

    trackFloatingMenu.style.left = `${Math.round(left)}px`;

    trackFloatingMenu.style.visibility = 'visible';

  }



  trackMenuFav?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!activeMenuTrack) return;

    const track = activeMenuTrack;

    await toggleSaveTrack(track);

    closeTrackFloatingMenu();

  });



  trackMenuAddPlaylist?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!activeMenuTrack) return;

    const track = activeMenuTrack;

    closeTrackFloatingMenu();

    openAddToPlaylistModal(track);

  });



  trackMenuEdit?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!activeMenuTrack) return;

    const track = activeMenuTrack;

    closeTrackFloatingMenu();

    openEditModal(track);

  });



  trackMenuCopyUrl?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!activeMenuTrack) return;

    const track = activeMenuTrack;

    closeTrackFloatingMenu();

    const shareUrl = getPlatformShareUrl(track) || track.url;

    if (shareUrl) {

      const ok = await copyToClipboard(shareUrl);

      if (ok) showToast(`${ICONS.link} <span>Đã sao chép liên kết</span>`, 'success', 1800);

    }

  });



  trackMenuCopyTitle?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!activeMenuTrack) return;

    const track = activeMenuTrack;

    closeTrackFloatingMenu();

    const titleToCopy = (track.title || '').trim();

    if (titleToCopy) {

      const ok = await copyToClipboard(titleToCopy);

      if (ok) showToast(`${ICONS.copy} <span>Đã sao chép tên bài hát</span>`, 'success', 1800);

    }

  });



  trackMenuDelete?.addEventListener('click', async (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!activeMenuTrack) return;

    const track = activeMenuTrack;

    closeTrackFloatingMenu();

    await api.deleteTrack(track.id, track.source);

    showToast(`${ICONS.trash} <span>Đã xóa khỏi thư viện</span>`, 'info', 1800);

    await loadLibrary();

  });



  document.addEventListener('click', (e) => {

    if (trackFloatingMenu && !trackFloatingMenu.contains(e.target) && !e.target.closest('.btn-card-menu')) {

      closeTrackFloatingMenu();

    }

    if (playerMoreMenu && !playerMoreMenu.contains(e.target) && e.target !== playerBtnMore && !playerBtnMore?.contains(e.target)) {

      closePlayerMoreMenu();

    }

    if (menuTuyChonTrangChiTiet && !menuTuyChonTrangChiTiet.contains(e.target) && e.target !== nutTuyChonTrangChiTiet && !nutTuyChonTrangChiTiet?.contains(e.target)) {

      DongMenuChiTiet();

    }

  });



  window.addEventListener('resize', () => {

    closeTrackFloatingMenu();

    closePlayerMoreMenu();

    DongMenuChiTiet();

  });

  document.addEventListener('scroll', () => {

    closeTrackFloatingMenu();

    DongMenuChiTiet();

  }, true);



  // --- Global Dragover Protection for Windows/Tauri ---

  document.addEventListener('dragover', (e) => {

    // Keep default prevented so the OS doesn't flash the forbidden icon

    e.preventDefault();

  });



  // Helper to extract dropped track data from drag event or global reference

  function getDroppedTrack(e) {

    let dropped = null;

    try {

      const rawJson = e.dataTransfer?.getData('application/json') || e.dataTransfer?.getData('text/plain');

      if (rawJson) dropped = JSON.parse(rawJson);

    } catch (err) {}

    if (!dropped && window.__draggedTrack) dropped = window.__draggedTrack;

    return dropped;

  }



  // --- Queue Drawer Logic ---

  let draggedQueueIndex = null;



  btnQueueToggle?.addEventListener('click', () => queueDrawer?.classList.toggle('open'));

  btnQueueClose?.addEventListener('click', () => queueDrawer?.classList.remove('open'));



  // Allow dropping tracks onto player bar queue toggle button directly

  btnQueueToggle?.addEventListener('dragover', (e) => {

    e.preventDefault();

    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';

  });

  btnQueueToggle?.addEventListener('drop', (e) => {

    e.preventDefault();

    e.stopPropagation();

    const dropped = getDroppedTrack(e);

    if (dropped) {

      addTrackToQueue(dropped);

      queueDrawer?.classList.add('open');

    }

  });



  // XU LI HANG DOI PHAT NHAC (PLAYBACK QUEUE)
  function addTrackToQueue(track, targetIndex = null, showFeedback = true) {

    if (!track || (!track.id && !track.title)) return;

    const safeTrack = { ...track };



    if (targetIndex !== null && targetIndex >= 0 && targetIndex <= queue.length) {

      queue.splice(targetIndex, 0, safeTrack);

      if (queueIndex >= 0 && targetIndex <= queueIndex) {

        queueIndex++;

      }

    } else {

      queue.push(safeTrack);

    }



    if (!currentTrack && queue.length === 1) {

      queueIndex = 0;

      playTrack(safeTrack, queue, 0);

    }



    renderQueue();

    if (showFeedback) {

      showToast(`${ICONS.success} <span>Đã thêm <b>${escapeHtml(safeTrack.title || 'bài hát')}</b> vào danh sách chờ</span>`, 'success', 1800);

    }

  }



  function removeTrackFromQueue(indexToRemove, showFeedback = true) {

    if (indexToRemove < 0 || indexToRemove >= queue.length) return;

    const removedTrack = queue[indexToRemove];

    queue.splice(indexToRemove, 1);



    if (indexToRemove < queueIndex) {

      queueIndex--;

    } else if (indexToRemove === queueIndex) {

      if (queue.length === 0) {

        queueIndex = -1;

        currentTrack = null;

        if (audio) { audio.pause(); audio.src = ''; }

        isPlaying = false;

        if (playIcon) playIcon.innerHTML = ICONS.play;

        if (visualizer) visualizer.classList.remove('playing');

        api.clearDiscordActivity();

        if (playerTitle) playerTitle.textContent = 'OmniMusic';

        if (playerArtist) playerArtist.textContent = 'Sẵn sàng phát nhạc';

        if (playerCover) playerCover.style.display = 'none';

        updateTrackCardsPlayState();

        persistPlaybackState();

      } else {

        if (queueIndex >= queue.length) queueIndex = 0;

        playTrack(queue[queueIndex]);

      }

    }



    renderQueue();

    if (showFeedback) {

      showToast(`<span>Đã xóa <b>${escapeHtml(removedTrack?.title || 'bài hát')}</b> khỏi danh sách chờ</span>`, 'info', 1600);

    }

  }



  function moveQueueItem(fromIdx, toIdx) {

    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= queue.length || toIdx >= queue.length) return;

    const [moved] = queue.splice(fromIdx, 1);

    queue.splice(toIdx, 0, moved);



    if (queueIndex === fromIdx) {

      queueIndex = toIdx;

    } else if (fromIdx < queueIndex && toIdx >= queueIndex) {

      queueIndex--;

    } else if (fromIdx > queueIndex && toIdx <= queueIndex) {

      queueIndex++;

    }



    renderQueue();

  }



  btnQueueClear?.addEventListener('click', () => {

    if (!queue.length) return;

    if (currentTrack) {

      queue = [currentTrack];

      queueIndex = 0;

    } else {

      queue = [];

      queueIndex = -1;

    }

    renderQueue();

    showToast('<span>Đã dọn sạch danh sách chờ</span>', 'info', 1600);

  });



  // Drop target for entire queue drawer and list

  queueDrawer?.addEventListener('dragover', (e) => {

    e.preventDefault();

    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';

    queueDrawer.classList.add('drag-over');

  });



  queueDrawer?.addEventListener('dragleave', (e) => {

    if (!queueDrawer.contains(e.relatedTarget)) {

      queueDrawer.classList.remove('drag-over');

    }

  });



  queueDrawer?.addEventListener('drop', (e) => {

    queueDrawer.classList.remove('drag-over');

    if (e.target.closest('.queue-item') || e.target.closest('.queue-empty-box')) return;

    e.preventDefault();

    const dropped = getDroppedTrack(e);

    if (dropped) {

      addTrackToQueue(dropped);

    }

  });



  function renderQueue() {

    if (!queueList) return;

    if (queueCountBadge) queueCountBadge.textContent = queue.length;

    queueList.innerHTML = '';



    if (!queue.length) {

      const emptyBox = document.createElement('div');

      emptyBox.className = 'queue-empty-box';

      emptyBox.innerHTML = `

        <div class="queue-empty-icon">${ICONS.playlist}</div>

        <div class="queue-empty-title">Danh sách chờ trống</div>

        <div class="queue-empty-desc">Kéo và thả bài hát bất kỳ vào đây để thêm vào hàng đợi</div>

      `;

      emptyBox.addEventListener('dragover', (e) => {

        e.preventDefault();

        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';

        emptyBox.classList.add('drag-over');

      });

      emptyBox.addEventListener('dragleave', (e) => {

        if (!emptyBox.contains(e.relatedTarget)) {

          emptyBox.classList.remove('drag-over');

        }

      });

      emptyBox.addEventListener('drop', (e) => {

        e.preventDefault();

        emptyBox.classList.remove('drag-over');

        const dropped = getDroppedTrack(e);

        if (dropped) addTrackToQueue(dropped);

      });

      queueList.appendChild(emptyBox);

      return;

    }



    queue.forEach((track, idx) => {

      const coverUrl = resolveCoverUrl(track);

      const isCurrent = idx === queueIndex;

      const item = document.createElement('div');

      item.className = `queue-item ${isCurrent ? 'active' : ''}`;

      item.setAttribute('draggable', 'true');

      item.setAttribute('data-queue-idx', String(idx));



      item.innerHTML = `

        <div class="queue-drag-handle" aria-label="Kéo để sắp xếp">${ICONS.dragHandle}</div>

        <div class="queue-thumb-wrap">

          <img src="${coverUrl || ''}" class="queue-thumb" onerror="this.style.display='none'">

          <div class="queue-playing-indicator" aria-label="${isCurrent ? (isPlaying ? 'Tạm dừng' : 'Tiếp tục') : 'Phát'}">${isCurrent ? (isPlaying ? ICONS.pause : ICONS.play) : ICONS.play}</div>

        </div>

        <div class="queue-info">

          <div class="queue-title">${escapeHtml(track.title || 'Untitled')}</div>

          <div class="queue-artist">${escapeHtml(track.artist || 'Unknown')} • ${escapeHtml(track.source || '')}</div>

        </div>

        <button class="btn-remove-queue" aria-label="Xóa khỏi danh sách chờ" type="button">

          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>

        </button>

      `;



      item.querySelector('.queue-title')?.addEventListener('click', (e) => {

        e.stopPropagation();

        e.preventDefault();

        openTrackPage(track);

      });



      item.addEventListener('click', (e) => {

        if (e.target.closest('.btn-remove-queue') || e.target.closest('.queue-drag-handle')) return;



        if (idx === queueIndex && currentTrack) {

          if (isPlaying) {

            cancelCrossfade();

    if (gapTimeoutId) { clearTimeout(gapTimeoutId); gapTimeoutId = null; }

            if (audio) audio.pause();

            isPlaying = false;

            if (playIcon) playIcon.innerHTML = ICONS.play;

            if (visualizer) visualizer.classList.remove('playing');

            api.updateDiscordActivity(currentTrack, audio ? audio.currentTime : 0, false);

            updateTrackCardsPlayState();

            persistPlaybackState();

          } else {

            resumeOrPlayTrack(currentTrack);

          }

          return;

        }



        queueIndex = idx;

        playTrack(track);

      });



      const btnRemove = item.querySelector('.btn-remove-queue');

      btnRemove?.addEventListener('click', (e) => {

        e.preventDefault();

        e.stopPropagation();

        removeTrackFromQueue(idx);

      });



      item.addEventListener('dragstart', (e) => {

        if (e.target.closest('.btn-remove-queue')) {

          e.preventDefault();

          return false;

        }

        draggedQueueIndex = idx;

        item.classList.add('dragging');

        if (e.dataTransfer) {

          e.dataTransfer.effectAllowed = 'copyMove';

          e.dataTransfer.setData('text/queue-index', String(idx));

          try {

            e.dataTransfer.setData('application/json', JSON.stringify(track));

            e.dataTransfer.setData('text/plain', JSON.stringify(track));

          } catch (err) {}

        }

        window.__draggedTrack = track;

      });



      item.addEventListener('dragend', () => {

        item.classList.remove('dragging');

        draggedQueueIndex = null;

        window.__draggedTrack = null;

        document.querySelectorAll('.queue-item').forEach(el => {

          el.classList.remove('drag-over-top', 'drag-over-bottom');

        });

      });



      item.addEventListener('dragover', (e) => {

        e.preventDefault();

        if (e.dataTransfer) e.dataTransfer.dropEffect = draggedQueueIndex !== null ? 'move' : 'copy';

        const rect = item.getBoundingClientRect();

        const isBottom = (e.clientY - rect.top) > (rect.height / 2);

        item.classList.toggle('drag-over-top', !isBottom);

        item.classList.toggle('drag-over-bottom', isBottom);

      });



      item.addEventListener('dragleave', (e) => {

        if (!item.contains(e.relatedTarget)) {

          item.classList.remove('drag-over-top', 'drag-over-bottom');

        }

      });



      item.addEventListener('drop', (e) => {

        e.preventDefault();

        e.stopPropagation();

        item.classList.remove('drag-over-top', 'drag-over-bottom');



        const rect = item.getBoundingClientRect();

        const isBottom = (e.clientY - rect.top) > (rect.height / 2);

        const targetDropIndex = isBottom ? idx + 1 : idx;



        const fromQueueStr = e.dataTransfer?.getData('text/queue-index');

        if (fromQueueStr && !isNaN(parseInt(fromQueueStr, 10))) {

          const fromIdx = parseInt(fromQueueStr, 10);

          let adjustedTarget = targetDropIndex;

          if (fromIdx < adjustedTarget) adjustedTarget--;

          moveQueueItem(fromIdx, adjustedTarget);

        } else {

          const dropped = getDroppedTrack(e);

          if (dropped) {

            addTrackToQueue(dropped, targetDropIndex);

          }

        }

      });



      queueList.appendChild(item);

    });

  }



  // --- Modal Logic ---

  let selectedBgBase64 = null;

  let daChonXoaAnhNen = false;

  let mucDoToiNen = 40;

  let mucDoMoNen = 0;

  let mucTrongSuotNen = 100;



  function CapNhatGiaoDienXemTruocAnhNen() {

    const coAnh = !!selectedBgBase64;

    if (modalBgPreview) {

      if (coAnh) {

        modalBgPreview.src = selectedBgBase64;

        modalBgPreview.style.display = 'block';

        const doMoXemTruoc = Math.round(mucDoMoNen * 0.25);

        modalBgPreview.style.filter = doMoXemTruoc > 0 ? `blur(${doMoXemTruoc}px)` : 'none';

        modalBgPreview.style.opacity = `${mucTrongSuotNen / 100}`;

      } else {

        modalBgPreview.style.display = 'none';

        modalBgPreview.src = '';

      }

    }

    if (modalBgPlaceholder) {

      modalBgPlaceholder.style.display = coAnh ? 'none' : 'flex';

    }

    if (modalBgPreviewDim) {

      if (coAnh) {

        modalBgPreviewDim.style.display = 'block';

        modalBgPreviewDim.style.backgroundColor = `rgba(0, 0, 0, ${mucDoToiNen / 100})`;

      } else {

        modalBgPreviewDim.style.display = 'none';

      }

    }

    if (btnModalRemoveBg) {

      btnModalRemoveBg.style.display = coAnh ? 'inline-flex' : 'none';

    }

    if (sliderBgDarkness) sliderBgDarkness.value = mucDoToiNen;

    if (labelBgDarkness) labelBgDarkness.textContent = `${mucDoToiNen}%`;

    if (sliderBgBlur) sliderBgBlur.value = mucDoMoNen;

    if (labelBgBlur) labelBgBlur.textContent = `${mucDoMoNen}px`;

    if (sliderBgOpacity) sliderBgOpacity.value = mucTrongSuotNen;

    if (labelBgOpacity) labelBgOpacity.textContent = `${mucTrongSuotNen}%`;

  }



  function CapNhatTheBaiHatTrongDOM(baiHatMoi) {

    if (!baiHatMoi) return;

    const maBaiHat = String(baiHatMoi.id ?? '');

    const nguonBaiHat = String(baiHatMoi.source ?? '').toLowerCase();

    const coverUrl = resolveCoverUrl(baiHatMoi);



    document.querySelectorAll('.track-card').forEach(card => {

      const cId = card.getAttribute('data-id');

      const cSrc = card.getAttribute('data-source');

      if (SoSanhTrungBaiHat(cId, cSrc, maBaiHat, nguonBaiHat)) {

        const img = card.querySelector('.card-cover-img');

        if (img) {

          if (coverUrl) {

            img.src = coverUrl;

            img.style.display = 'block';

          } else {

            img.style.display = 'none';

          }

        }



        const titleText = card.querySelector('.title-text');

        if (titleText) {

          titleText.textContent = baiHatMoi.title || '';

          titleText.setAttribute('data-text', baiHatMoi.title || '');

          delete titleText.dataset.textWidth;

        }



        const titleDup = card.querySelector('.title-duplicate');

        if (titleDup) {

          titleDup.textContent = baiHatMoi.title || '';

        }



        const cardTitle = card.querySelector('.card-title');

        if (cardTitle) {

          cardTitle.classList.remove('has-overflow');

        }



        const artistEl = card.querySelector('.card-artist');

        if (artistEl) {

          artistEl.textContent = baiHatMoi.artist || '';

        }

      }

    });



    document.querySelectorAll('.playlist-track-row').forEach(row => {

      const rId = row.getAttribute('data-id') || row.getAttribute('data-track-id');

      const rSrc = row.getAttribute('data-source') || row.getAttribute('data-track-source');

      if (SoSanhTrungBaiHat(rId, rSrc, maBaiHat, nguonBaiHat)) {

        const img = row.querySelector('.playlist-track-thumb img');

        if (img) {

          if (coverUrl) {

            img.src = coverUrl;

            img.style.display = 'block';

          } else {

            img.style.display = 'none';

          }

        }



        const titleText = row.querySelector('.playlist-track-title .title-text');

        if (titleText) {

          titleText.textContent = baiHatMoi.title || '';

          titleText.setAttribute('data-text', baiHatMoi.title || '');

          delete titleText.dataset.textWidth;

        }



        const titleDup = row.querySelector('.playlist-track-title .title-duplicate');

        if (titleDup) {

          titleDup.textContent = baiHatMoi.title || '';

        }



        const titleWrapper = row.querySelector('.playlist-track-title');

        if (titleWrapper) {

          titleWrapper.classList.remove('has-overflow');

        }



        const artistEl = row.querySelector('.playlist-track-artist');

        if (artistEl) {

          artistEl.textContent = baiHatMoi.artist || '';

        }



        row.setAttribute('data-title', baiHatMoi.title || '');

        row.setAttribute('data-artist', baiHatMoi.artist || '');

      }

    });



    if (currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, maBaiHat, nguonBaiHat)) {

      currentTrack = { ...currentTrack, ...baiHatMoi };

      updatePlayerBarUI(currentTrack);

      if (titlebarNowPlaying) {

        titlebarNowPlaying.textContent = `${currentTrack.title} - ${currentTrack.artist}`;

      }

    }



    if (isTrackPageOpen || activeView === 'track-detail') {

      if (currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, maBaiHat, nguonBaiHat)) {

        updateTrackPageUI(currentTrack);

      }

    }

  }



  // XU LI MODAL CHINH SUA BAI HAT VA CAU HINH SONG NHAC RIENG BIET
  function openEditModal(track) {

    if (!editModal) return;

    const saved = TimBaiHatTrongThuVien(track);

    let thongTinMoiNhat = saved ? { ...track, ...saved } : { ...track };

    if (currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, track.id, track.source)) {

      thongTinMoiNhat = { ...thongTinMoiNhat, ...currentTrack };

    }

    editingTrackData = { ...thongTinMoiNhat };

    selectedCoverBase64 = null;

    daChonDatLaiMacDinh = false;

    if (modalTrackTitle) modalTrackTitle.value = editingTrackData.title || '';

    if (modalTrackArtist) modalTrackArtist.value = editingTrackData.artist || '';

    if (modalCoverUrl) modalCoverUrl.value = (editingTrackData.cover && (editingTrackData.cover.startsWith('http://') || editingTrackData.cover.startsWith('https://'))) ? editingTrackData.cover : '';

    if (modalFileInput) modalFileInput.value = '';



    const coverUrl = resolveCoverUrl(editingTrackData);

    if (modalCoverPreview) {

      modalCoverPreview.onerror = () => { modalCoverPreview.style.display = 'none'; };

      modalCoverPreview.style.display = '';

      modalCoverPreview.src = coverUrl || '';

    }



    if (modalTrackSource) modalTrackSource.textContent = editingTrackData.source?.toUpperCase();

    if (modalTrackDuration) modalTrackDuration.textContent = formatTrackDuration(editingTrackData);



    selectedBgBase64 = null;

    daChonXoaAnhNen = false;

    mucDoToiNen = 40;

    mucDoMoNen = 0;

    mucTrongSuotNen = 100;



    const maBaiHat = String(track.id || '');

    const nguonBaiHat = (track.source || '').toLowerCase();

    const khoaBaiHat = `${nguonBaiHat}:${maBaiHat}`;

    const khoaKhongTienTo = `${nguonBaiHat}:${maBaiHat.replace(/^(sc_|sp_|yt_)/, '')}`;

    const caiDatSan = boNhoAnhNen.get(khoaBaiHat) || boNhoAnhNen.get(khoaKhongTienTo);

    let driftHienTai = true;

    if (caiDatSan && caiDatSan.drift !== undefined) {

      driftHienTai = !!caiDatSan.drift;

    }

    hieuUngTroiTamDangChon = driftHienTai;

    if (toggleArtworkDrift) toggleArtworkDrift.checked = driftHienTai;



    let vienCHienTai = true;

    if (caiDatSan && caiDatSan.cornerNeon !== undefined) {

      vienCHienTai = !!caiDatSan.cornerNeon;

    }

    vienChuCDangChon = vienCHienTai;

    if (caiDatSan && caiDatSan.continuousWaveSwap !== undefined) {
      daoViTriSongDangChon = !!caiDatSan.continuousWaveSwap;
    } else {
      daoViTriSongDangChon = daoViTriSongToanCuc;
    }
    if (toggleWaveSwapEdit) toggleWaveSwapEdit.checked = daoViTriSongDangChon;

    // Nạp toàn bộ danh sách sticker của bài hát này
    if (caiDatSan && Array.isArray(caiDatSan.gifs)) {
      danhSachStickerModal = JSON.parse(JSON.stringify(caiDatSan.gifs));
    } else if (currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, track.id, track.source) && Array.isArray(danhSachStickerHienTai) && danhSachStickerHienTai.length > 0) {
      danhSachStickerModal = JSON.parse(JSON.stringify(danhSachStickerHienTai));
    } else {
      danhSachStickerModal = [];
    }
    CapNhatDanhSachStickerModal();
    KhoiTaoGridStickerModal();



    mauSongDangChonA = (caiDatSan && caiDatSan.colorWaveA) ? caiDatSan.colorWaveA : (track.colorWaveA || MAU_SONG_MAC_DINH_A);

    mauSongDangChonB = (caiDatSan && caiDatSan.colorWaveB) ? caiDatSan.colorWaveB : (track.colorWaveB || MAU_SONG_MAC_DINH_B);

    mauSongDangChonC = (caiDatSan && caiDatSan.colorWaveC) ? caiDatSan.colorWaveC : (track.colorWaveC || MAU_SONG_MAC_DINH_C);

    mauSongDangChonD = (caiDatSan && caiDatSan.colorWaveD) ? caiDatSan.colorWaveD : (track.colorWaveD || MAU_SONG_MAC_DINH_D);

    if (inputColorWaveA) inputColorWaveA.value = mauSongDangChonA;

    if (labelColorWaveA) labelColorWaveA.textContent = mauSongDangChonA.toUpperCase();

    if (inputColorWaveB) inputColorWaveB.value = mauSongDangChonB;

    if (labelColorWaveB) labelColorWaveB.textContent = mauSongDangChonB.toUpperCase();

    if (inputColorWaveC) inputColorWaveC.value = mauSongDangChonC;

    if (labelColorWaveC) labelColorWaveC.textContent = mauSongDangChonC.toUpperCase();

    if (inputColorWaveD) inputColorWaveD.value = mauSongDangChonD;

    if (labelColorWaveD) labelColorWaveD.textContent = mauSongDangChonD.toUpperCase();



    if (caiDatSan && caiDatSan.image) {

      selectedBgBase64 = caiDatSan.image;

      mucDoToiNen = caiDatSan.darkness !== undefined ? caiDatSan.darkness : 40;

      mucDoMoNen = caiDatSan.blur !== undefined ? caiDatSan.blur : 0;

      mucTrongSuotNen = caiDatSan.opacity !== undefined ? caiDatSan.opacity : 100;

      CapNhatGiaoDienXemTruocAnhNen();

    } else {

      CapNhatGiaoDienXemTruocAnhNen();

      LayCaiDatAnhNenBaiHat(khoaBaiHat).then(async (caiDat) => {

        if (!caiDat && khoaKhongTienTo !== khoaBaiHat) {

          caiDat = await LayCaiDatAnhNenBaiHat(khoaKhongTienTo);

        }

        if (caiDat) {

          boNhoAnhNen.set(khoaBaiHat, caiDat);

          boNhoAnhNen.set(khoaKhongTienTo, caiDat);

          if (caiDat.drift !== undefined && toggleArtworkDrift) {

            hieuUngTroiTamDangChon = !!caiDat.drift;

            toggleArtworkDrift.checked = hieuUngTroiTamDangChon;

          }

          if (caiDat.cornerNeon !== undefined && toggleCornerC) {

            vienChuCDangChon = !!caiDat.cornerNeon;

            toggleCornerC.checked = vienChuCDangChon;

          }

          if (caiDat.colorWaveA && inputColorWaveA) {

            mauSongDangChonA = caiDat.colorWaveA;

            inputColorWaveA.value = mauSongDangChonA;

            if (labelColorWaveA) labelColorWaveA.textContent = mauSongDangChonA.toUpperCase();

          }

          if (caiDat.colorWaveB && inputColorWaveB) {

            mauSongDangChonB = caiDat.colorWaveB;

            inputColorWaveB.value = mauSongDangChonB;

            if (labelColorWaveB) labelColorWaveB.textContent = mauSongDangChonB.toUpperCase();

          }

          if (caiDat.colorWaveC && inputColorWaveC) {

            mauSongDangChonC = caiDat.colorWaveC;

            inputColorWaveC.value = mauSongDangChonC;

            if (labelColorWaveC) labelColorWaveC.textContent = mauSongDangChonC.toUpperCase();

          }

          if (caiDat.colorWaveD && inputColorWaveD) {

            mauSongDangChonD = caiDat.colorWaveD;

            inputColorWaveD.value = mauSongDangChonD;

            if (labelColorWaveD) labelColorWaveD.textContent = mauSongDangChonD.toUpperCase();

          }

          if (caiDat.continuousWaveSwap !== undefined && toggleWaveSwapEdit) {
            daoViTriSongDangChon = !!caiDat.continuousWaveSwap;
            toggleWaveSwapEdit.checked = daoViTriSongDangChon;
          }

          if (!caiDatSan && Array.isArray(caiDat.gifs)) {
            danhSachStickerModal = JSON.parse(JSON.stringify(caiDat.gifs));
            CapNhatDanhSachStickerModal();
            KhoiTaoGridStickerModal();
          }

          if (caiDat.image && !daChonXoaAnhNen) {

            selectedBgBase64 = caiDat.image;

            mucDoToiNen = caiDat.darkness !== undefined ? caiDat.darkness : 40;

            mucDoMoNen = caiDat.blur !== undefined ? caiDat.blur : 0;

            mucTrongSuotNen = caiDat.opacity !== undefined ? caiDat.opacity : 100;

            CapNhatGiaoDienXemTruocAnhNen();

          }

        }

      });

    }



    editModal.style.display = 'flex';

    editModal.classList.add('open');

    editModal.classList.remove('hidden');

  }



  function closeEditModal() {

    if (editModal) {

      editModal.style.display = 'none';

      editModal.classList.remove('open');

      editModal.classList.add('hidden');

    }

    editingTrackData = null;

    selectedCoverBase64 = null;

    daChonDatLaiMacDinh = false;

    selectedBgBase64 = null;

    daChonXoaAnhNen = false;

    mucDoToiNen = 40;

    mucDoMoNen = 0;

    mucTrongSuotNen = 100;

    hieuUngTroiTamDangChon = true;

    mauSongDangChonA = MAU_SONG_MAC_DINH_A;

    mauSongDangChonB = MAU_SONG_MAC_DINH_B;

    mauSongDangChonC = MAU_SONG_MAC_DINH_C;

    mauSongDangChonD = MAU_SONG_MAC_DINH_D;

    daoViTriSongDangChon = false;

    danhSachStickerModal = [];

    if (editStickersActiveContainer) editStickersActiveContainer.style.display = 'none';

    if (editStickersActiveList) editStickersActiveList.innerHTML = '';

  }



  closeEditModal();



  // XU LI MODAL CAI DAT UNG DUNG (SETTINGS)
  function openSettingsModal() {
    if (settingsModal) {
      settingsModal.style.display = 'flex';
      settingsModal.classList.remove('hidden');
      settingsModal.classList.add('open');
      applyWaveSwapSettings();
      CapNhatGiaoDienPhimTat();
      if (crossfadeEnabled) {
        requestAnimationFrame(() => updateCrossfadeDiagram());
      }
    }
  }

  function closeSettingsModal() {
    if (settingsModal) {
      if (hanhDongDangDoiPhim) {
        const activeBtn = document.querySelector(`.keycap-btn[data-action="${hanhDongDangDoiPhim}"]`);
        if (activeBtn) activeBtn.classList.remove('is-recording');
        hanhDongDangDoiPhim = null;
      }
      settingsModal.classList.remove('open');
      settingsModal.classList.add('hidden');
      settingsModal.style.display = 'none';
      stopCrossfadeTest();
    }
  }



  closeSettingsModal();



  btnOpenSettings?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    openSettingsModal();

  });



  btnSettingsClose?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    closeSettingsModal();

  });



  btnSettingsDone?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    closeSettingsModal();

  });



  settingsModal?.addEventListener('click', (e) => {

    if (e.target === settingsModal) {

      closeSettingsModal();

    }

  });



  btnModalClose?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    closeEditModal();

  });



  btnModalCancel?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    closeEditModal();

  });



  editModal?.addEventListener('click', (e) => {

    if (e.target === editModal) {

      closeEditModal();

    }

  });



  // ========================================================
  // XU LI PHIM TAT DIEU KHIEN VA BANG CAI DAT PHIM (KEYBINDINGS)
  // ========================================================

  // Định dạng tên phím thân thiện cho người dùng
  function DinhDangTenPhim(code) {
    if (!code) return 'Chưa gán';
    if (code === 'Space') return 'Space';
    if (code === 'ArrowRight') return '→';
    if (code === 'ArrowLeft') return '←';
    if (code === 'ArrowUp') return '↑';
    if (code === 'ArrowDown') return '↓';
    if (code.startsWith('Key')) return code.slice(3).toUpperCase();
    if (code.startsWith('Digit')) return code.slice(5);
    if (code.startsWith('Numpad')) return 'Num ' + code.slice(6);
    return code;
  }

  // Xử lý tua nhanh +5 giây
  function TuaTien5Giay() {
    if (!audio || isNaN(audio.duration) || audio.duration <= 0) return;
    const target = Math.min(audio.duration, (audio.currentTime || 0) + 5);
    audio.currentTime = target;
    if (trackPageSeekSlider) trackPageSeekSlider.value = (target / audio.duration) * 100;
    if (seekSlider) seekSlider.value = (target / audio.duration) * 100;
    showToast('<span>Tua tiếp +5s</span>', 'info', 800);
  }

  // Xử lý tua lùi -5 giây
  function TuaLui5Giay() {
    if (!audio || isNaN(audio.duration) || audio.duration <= 0) return;
    const target = Math.max(0, (audio.currentTime || 0) - 5);
    audio.currentTime = target;
    if (trackPageSeekSlider) trackPageSeekSlider.value = (target / audio.duration) * 100;
    if (seekSlider) seekSlider.value = (target / audio.duration) * 100;
    showToast('<span>Tua lùi -5s</span>', 'info', 800);
  }

  // Cập nhật giao diện keycap trong cài đặt
  function CapNhatGiaoDienPhimTat() {
    Object.keys(danhSachPhimTat).forEach(actionKey => {
      const badge = document.getElementById(`keycap-${actionKey}`);
      if (badge) {
        badge.textContent = DinhDangTenPhim(danhSachPhimTat[actionKey]);
      }
    });
  }

  // Lưu cấu hình phím tắt vào config
  function LuuCauHinhPhimTat() {
    persistUserConfig();
  }

  // Khởi tạo hệ thống phím tắt và gắn sự kiện tương tác
  let daKhoiTaoPhimTat = false;
  function KhoiTaoHeThongPhimTat() {
    CapNhatGiaoDienPhimTat();
    if (daKhoiTaoPhimTat) return;
    daKhoiTaoPhimTat = true;

    // 1. Gán sự kiện cho các nút keycap trong Settings modal
    const keycapButtons = document.querySelectorAll('.keycap-btn');
    keycapButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const action = btn.dataset.action;
        if (!action) return;

        // Nếu bấm lại vào nút đang ghi âm, hủy ghi âm
        if (hanhDongDangDoiPhim === action) {
          btn.classList.remove('is-recording');
          const badge = btn.querySelector('.keycap-badge');
          if (badge) badge.textContent = DinhDangTenPhim(danhSachPhimTat[action]);
          hanhDongDangDoiPhim = null;
          return;
        }

        // Hủy bất kỳ nút nào đang ghi trước đó
        keycapButtons.forEach(otherBtn => {
          otherBtn.classList.remove('is-recording');
          const otherAction = otherBtn.dataset.action;
          const otherBadge = otherBtn.querySelector('.keycap-badge');
          if (otherAction && otherBadge) {
            otherBadge.textContent = DinhDangTenPhim(danhSachPhimTat[otherAction]);
          }
        });

        hanhDongDangDoiPhim = action;
        btn.classList.add('is-recording');
        const badge = btn.querySelector('.keycap-badge');
        if (badge) badge.textContent = 'Nhấn phím...';
      });
    });

    // 2. Nút đặt lại phím mặc định
    const btnResetKeys = document.getElementById('btn-reset-keybindings');
    btnResetKeys?.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      danhSachPhimTat = { ...CAC_PHIM_TAT_MAC_DINH };
      if (hanhDongDangDoiPhim) {
        keycapButtons.forEach(b => b.classList.remove('is-recording'));
        hanhDongDangDoiPhim = null;
      }
      LuuCauHinhPhimTat();
      CapNhatGiaoDienPhimTat();
      showToast('<span>Đã khôi phục phím tắt mặc định</span>', 'info', 1500);
    });

    // 3. Lắng nghe phím toàn cục cho các phím tắt media & ghi phím
    document.addEventListener('keydown', (e) => {
      // Đang trong chế độ gán phím mới
      if (hanhDongDangDoiPhim) {
        e.preventDefault();
        e.stopPropagation();

        if (e.key === 'Escape') {
          const activeBtn = document.querySelector(`.keycap-btn[data-action="${hanhDongDangDoiPhim}"]`);
          if (activeBtn) {
            activeBtn.classList.remove('is-recording');
            const badge = activeBtn.querySelector('.keycap-badge');
            if (badge) badge.textContent = DinhDangTenPhim(danhSachPhimTat[hanhDongDangDoiPhim]);
          }
          hanhDongDangDoiPhim = null;
          showToast('<span>Đã hủy đổi phím</span>', 'info', 1000);
          return;
        }

        const newCode = e.code;
        const targetAction = hanhDongDangDoiPhim;
        danhSachPhimTat[targetAction] = newCode;
        hanhDongDangDoiPhim = null;

        const activeBtn = document.querySelector(`.keycap-btn[data-action="${targetAction}"]`);
        if (activeBtn) {
          activeBtn.classList.remove('is-recording');
        }

        LuuCauHinhPhimTat();
        CapNhatGiaoDienPhimTat();
        showToast(`<span>Đã gán phím [${DinhDangTenPhim(newCode)}]</span>`, 'success', 1500);
        return;
      }

      // Bỏ qua nếu đang gõ trong input, textarea, select hoặc ô soạn thảo
      const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select' || e.target?.isContentEditable) {
        return;
      }

      // Bỏ qua nếu đang mở các modal nhập liệu chỉnh sửa
      if (editModal && editModal.style.display !== 'none') return;
      if (editPlaylistModal && editPlaylistModal.style.display !== 'none') return;

      const code = e.code;

      if (code === danhSachPhimTat.playPause) {
        e.preventDefault();
        btnPlayPause?.click();
      } else if (code === danhSachPhimTat.toggleFavorite) {
        e.preventDefault();
        if (currentTrack) {
          toggleSaveTrack(currentTrack);
        } else {
          showToast('<span>Chưa có bài hát đang phát</span>', 'info', 1200);
        }
      } else if (code === danhSachPhimTat.cycleRepeat) {
        e.preventDefault();
        ChuyenCheDoLapLai();
      } else if (code === danhSachPhimTat.nextTrack) {
        e.preventDefault();
        playNextTrack();
      } else if (code === danhSachPhimTat.prevTrack) {
        e.preventDefault();
        playPrevTrack();
      } else if (code === danhSachPhimTat.seekForward5s) {
        e.preventDefault();
        TuaTien5Giay();
      } else if (code === danhSachPhimTat.seekBackward5s) {
        e.preventDefault();
        TuaLui5Giay();
      }
    });
  }

  document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

      closePlayerCopyMenu();

      if (confirmDeletePlaylistModal && confirmDeletePlaylistModal.style.display !== 'none') closeConfirmDeleteModal();

      if (editModal && editModal.style.display !== 'none') closeEditModal();

      if (editPlaylistModal && editPlaylistModal.style.display !== 'none') closeEditPlaylistModal();

      if (settingsModal && settingsModal.style.display !== 'none') closeSettingsModal();

      if (addToPlaylistModal && addToPlaylistModal.style.display !== 'none') closeAddToPlaylistModal();

    }

  });



  btnModalReset?.addEventListener('click', (e) => {

    e.preventDefault();

    if (!editingTrackData) return;

    const origTitle = editingTrackData.originalTitle || editingTrackData.title;

    const origArtist = editingTrackData.originalArtist || editingTrackData.artist;

    const origCover = editingTrackData.originalCover || editingTrackData.cover;



    if (modalTrackTitle) modalTrackTitle.value = origTitle || '';

    if (modalTrackArtist) modalTrackArtist.value = origArtist || '';

    if (modalCoverUrl) modalCoverUrl.value = origCover && (origCover.startsWith('http://') || origCover.startsWith('https://')) ? origCover : '';

    if (modalCoverPreview) {

      modalCoverPreview.style.display = '';

      modalCoverPreview.src = origCover || '';

    }

    selectedCoverBase64 = null;

    if (modalFileInput) modalFileInput.value = '';



    selectedBgBase64 = null;

    daChonXoaAnhNen = true;

    mucDoToiNen = 40;

    mucDoMoNen = 0;

    mucTrongSuotNen = 100;

    if (toggleArtworkDrift) toggleArtworkDrift.checked = true;

    hieuUngTroiTamDangChon = true;

    if (toggleCornerC) toggleCornerC.checked = true;

    vienChuCDangChon = true;

    daoViTriSongDangChon = daoViTriSongToanCuc;

    if (toggleWaveSwapEdit) toggleWaveSwapEdit.checked = daoViTriSongDangChon;

    danhSachStickerModal = [];

    CapNhatDanhSachStickerModal();

    if (currentTrack && editingTrackData && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, editingTrackData.id, editingTrackData.source)) {
      CapNhatStickerTrangPhat([]);
    }

    mauSongDangChonA = MAU_SONG_MAC_DINH_A;

    mauSongDangChonB = MAU_SONG_MAC_DINH_B;

    mauSongDangChonC = MAU_SONG_MAC_DINH_C;

    mauSongDangChonD = MAU_SONG_MAC_DINH_D;

    if (inputColorWaveA) inputColorWaveA.value = MAU_SONG_MAC_DINH_A;

    if (labelColorWaveA) labelColorWaveA.textContent = MAU_SONG_MAC_DINH_A.toUpperCase();

    if (inputColorWaveB) inputColorWaveB.value = MAU_SONG_MAC_DINH_B;

    if (labelColorWaveB) labelColorWaveB.textContent = MAU_SONG_MAC_DINH_B.toUpperCase();

    if (inputColorWaveC) inputColorWaveC.value = MAU_SONG_MAC_DINH_C;

    if (labelColorWaveC) labelColorWaveC.textContent = MAU_SONG_MAC_DINH_C.toUpperCase();

    if (inputColorWaveD) inputColorWaveD.value = MAU_SONG_MAC_DINH_D;

    if (labelColorWaveD) labelColorWaveD.textContent = MAU_SONG_MAC_DINH_D.toUpperCase();

    CapNhatGiaoDienXemTruocAnhNen();



    daChonDatLaiMacDinh = true;

    showToast('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> <span>Đã khôi phục thông tin mặc định. Hãy nhấn "Lưu" để hoàn tất</span>', 'info', 2200);

  });



  btnChooseFile?.addEventListener('click', (e) => {

    e.preventDefault();

    if (modalFileInput) {

      modalFileInput.value = '';

      modalFileInput.click();

    } else {

      api.selectImageFile().then(async (result) => {

        if (result?.base64) {

          const optimized = await optimizeCoverImage(result.base64);

          selectedCoverBase64 = optimized;

          if (modalCoverPreview) {

            modalCoverPreview.style.display = '';

            modalCoverPreview.src = optimized;

          }

          if (modalCoverUrl) modalCoverUrl.value = '';

        }

      });

    }

  });



  modalFileInput?.addEventListener('change', async (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const optimized = await optimizeCoverImage(file);

    selectedCoverBase64 = optimized;

    if (modalCoverPreview) {

      modalCoverPreview.style.display = '';

      modalCoverPreview.src = optimized;

    }

    if (modalCoverUrl) modalCoverUrl.value = '';

  });



  modalCoverUrl?.addEventListener('input', () => {

    const val = modalCoverUrl.value.trim();

    if (val) {

      selectedCoverBase64 = null;

      if (modalCoverPreview) {

        modalCoverPreview.style.display = '';

        modalCoverPreview.src = val;

      }

    }

  });



  btnModalChooseBg?.addEventListener('click', (e) => {

    e.preventDefault();

    if (modalBgFileInput) {

      modalBgFileInput.value = '';

      modalBgFileInput.click();

    }

  });



  modalBgFileInput?.addEventListener('change', async (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const optimized = await ToiUuHoaAnhNen(file);

    if (optimized) {

      selectedBgBase64 = optimized;

      daChonXoaAnhNen = false;

      CapNhatGiaoDienXemTruocAnhNen();

    }

  });



  btnModalRemoveBg?.addEventListener('click', (e) => {

    e.preventDefault();

    selectedBgBase64 = null;

    daChonXoaAnhNen = true;

    CapNhatGiaoDienXemTruocAnhNen();

  });



  sliderBgDarkness?.addEventListener('input', () => {

    mucDoToiNen = parseInt(sliderBgDarkness.value, 10);

    if (labelBgDarkness) labelBgDarkness.textContent = `${mucDoToiNen}%`;

    if (modalBgPreviewDim && selectedBgBase64) {

      modalBgPreviewDim.style.backgroundColor = `rgba(0, 0, 0, ${mucDoToiNen / 100})`;

    }

  });



  sliderBgBlur?.addEventListener('input', () => {

    mucDoMoNen = parseInt(sliderBgBlur.value, 10);

    if (labelBgBlur) labelBgBlur.textContent = `${mucDoMoNen}px`;

    if (modalBgPreview && selectedBgBase64) {

      const doMoXemTruoc = Math.round(mucDoMoNen * 0.25);

      modalBgPreview.style.filter = doMoXemTruoc > 0 ? `blur(${doMoXemTruoc}px)` : 'none';

    }

  });



  sliderBgOpacity?.addEventListener('input', () => {

    mucTrongSuotNen = parseInt(sliderBgOpacity.value, 10);

    if (labelBgOpacity) labelBgOpacity.textContent = `${mucTrongSuotNen}%`;

    if (modalBgPreview && selectedBgBase64) {

      modalBgPreview.style.opacity = `${mucTrongSuotNen / 100}`;

    }

  });



  toggleArtworkDrift?.addEventListener('change', () => {

    hieuUngTroiTamDangChon = toggleArtworkDrift.checked;

  });



  toggleCornerC?.addEventListener('change', () => {

    vienChuCDangChon = toggleCornerC.checked;

  });

  toggleWaveSwapEdit?.addEventListener('change', () => {
    daoViTriSongDangChon = toggleWaveSwapEdit.checked;
  });

  waveSwapToggleInput?.addEventListener('change', (e) => {
    daoViTriSongToanCuc = e.target.checked;
    const curKhoa = currentTrack ? `${(currentTrack.source || '').toLowerCase()}:${currentTrack.id}` : '';
    const curCaiDat = curKhoa ? boNhoAnhNen.get(curKhoa) : null;
    if (!curCaiDat || curCaiDat.continuousWaveSwap === undefined) {
      daoViTriSongLienTuc = daoViTriSongToanCuc;
    }
    applyWaveSwapSettings();
    persistUserConfig();
    showToast(`<span>${daoViTriSongToanCuc ? 'Đã bật' : 'Đã tắt'} đổi vị trí sóng liên tục (Mặc định)</span>`, 'success', 1800);
  });



  inputColorWaveA?.addEventListener('input', () => {

    mauSongDangChonA = inputColorWaveA.value;

    if (labelColorWaveA) labelColorWaveA.textContent = mauSongDangChonA.toUpperCase();

  });



  inputColorWaveB?.addEventListener('input', () => {

    mauSongDangChonB = inputColorWaveB.value;

    if (labelColorWaveB) labelColorWaveB.textContent = mauSongDangChonB.toUpperCase();

  });



  inputColorWaveC?.addEventListener('input', () => {

    mauSongDangChonC = inputColorWaveC.value;

    if (labelColorWaveC) labelColorWaveC.textContent = mauSongDangChonC.toUpperCase();

  });



  inputColorWaveD?.addEventListener('input', () => {

    mauSongDangChonD = inputColorWaveD.value;

    if (labelColorWaveD) labelColorWaveD.textContent = mauSongDangChonD.toUpperCase();

  });



  btnModalSave?.addEventListener('click', async (e) => {

    e.preventDefault();

    if (!editingTrackData) return;



    try {

      const newTitle = modalTrackTitle ? modalTrackTitle.value.trim() || editingTrackData.title : editingTrackData.title;

      const newArtist = modalTrackArtist ? modalTrackArtist.value.trim() || editingTrackData.artist : editingTrackData.artist;

      const newCoverUrl = modalCoverUrl ? modalCoverUrl.value.trim() : '';



      const maHienTai = String(editingTrackData.id ?? '');

      const nguonHienTai = String(editingTrackData.source ?? '').toLowerCase();



      const alreadySaved = libraryTracks.some(t => SoSanhTrungBaiHat(t.id, t.source, maHienTai, nguonHienTai));



      if (!alreadySaved) {

        try {

          await api.saveTrack(editingTrackData);

        } catch (saveErr) {

          console.warn('saveTrack warning:', saveErr);

        }

      }



      const payload = {
        title: newTitle,
        artist: newArtist,
        colorWaveA: mauSongDangChonA,
        colorWaveB: mauSongDangChonB,
        colorWaveC: mauSongDangChonC,
        colorWaveD: mauSongDangChonD
      };

      if (selectedCoverBase64) {
        payload.cover = selectedCoverBase64;
        payload.customCoverBase64 = selectedCoverBase64;
      } else if (newCoverUrl) {
        payload.cover = newCoverUrl;
      }

      const daDatLai = daChonDatLaiMacDinh;
      if (daDatLai) {
        const origTitle = editingTrackData.originalTitle || editingTrackData.title;
        const origArtist = editingTrackData.originalArtist || editingTrackData.artist;
        const origCover = editingTrackData.originalCover || editingTrackData.cover;
        const chuaThayDoiThem = newTitle === origTitle &&
          newArtist === origArtist &&
          !selectedCoverBase64 &&
          (!newCoverUrl || newCoverUrl === origCover);
        if (chuaThayDoiThem) {
          payload.reset = true;
        }
      }

      const updated = await api.editTrack(editingTrackData.id, editingTrackData.source, payload);
      daChonDatLaiMacDinh = false;

      const khoaBaiHat = `${nguonHienTai}:${maHienTai}`;
      const khoaKhongTienTo = `${nguonHienTai}:${maHienTai.replace(/^(sc_|sp_|yt_)/, '')}`;
      const caiDatCu = boNhoAnhNen.get(khoaBaiHat) || boNhoAnhNen.get(khoaKhongTienTo) || {};

      let caiDatMoi = null;
      if (daDatLai) {
        await XoaCaiDatAnhNenBaiHat(khoaBaiHat);
        await XoaCaiDatAnhNenBaiHat(khoaKhongTienTo);
        boNhoAnhNen.delete(khoaBaiHat);
        boNhoAnhNen.delete(khoaKhongTienTo);
        delete editingTrackData.backgroundImage;
        delete editingTrackData.backgroundDarkness;
        delete editingTrackData.backgroundBlur;
        delete editingTrackData.backgroundOpacity;
      } else {
        caiDatMoi = {
          ...(caiDatCu || {}),
          drift: hieuUngTroiTamDangChon,
          cornerNeon: vienChuCDangChon,
          continuousWaveSwap: daoViTriSongDangChon,
          colorWaveA: mauSongDangChonA,
          colorWaveB: mauSongDangChonB,
          colorWaveC: mauSongDangChonC,
          colorWaveD: mauSongDangChonD,
          gifs: (danhSachStickerModal && danhSachStickerModal.length > 0)
            ? JSON.parse(JSON.stringify(danhSachStickerModal))
            : []
        };

        if (daChonXoaAnhNen) {
          delete caiDatMoi.image;
          delete caiDatMoi.darkness;
          delete caiDatMoi.blur;
          delete caiDatMoi.opacity;
          delete editingTrackData.backgroundImage;
          delete editingTrackData.backgroundDarkness;
          delete editingTrackData.backgroundBlur;
          delete editingTrackData.backgroundOpacity;
        } else if (selectedBgBase64) {
          caiDatMoi.image = selectedBgBase64;
          caiDatMoi.darkness = mucDoToiNen;
          caiDatMoi.blur = mucDoMoNen;
          caiDatMoi.opacity = mucTrongSuotNen;
          editingTrackData.backgroundImage = selectedBgBase64;
          editingTrackData.backgroundDarkness = mucDoToiNen;
          editingTrackData.backgroundBlur = mucDoMoNen;
          editingTrackData.backgroundOpacity = mucTrongSuotNen;
        } else if (caiDatCu && caiDatCu.image) {
          caiDatMoi.darkness = mucDoToiNen;
          caiDatMoi.blur = mucDoMoNen;
          caiDatMoi.opacity = mucTrongSuotNen;
          editingTrackData.backgroundImage = caiDatCu.image;
          editingTrackData.backgroundDarkness = mucDoToiNen;
          editingTrackData.backgroundBlur = mucDoMoNen;
          editingTrackData.backgroundOpacity = mucTrongSuotNen;
        }

        await LuuCaiDatAnhNenBaiHat(khoaBaiHat, caiDatMoi);
        boNhoAnhNen.set(khoaBaiHat, caiDatMoi);
        boNhoAnhNen.set(khoaKhongTienTo, caiDatMoi);
      }

      editingTrackData.drift = hieuUngTroiTamDangChon;

      editingTrackData.cornerNeon = vienChuCDangChon;

      editingTrackData.colorWaveA = mauSongDangChonA;

      editingTrackData.colorWaveB = mauSongDangChonB;

      editingTrackData.colorWaveC = mauSongDangChonC;

      editingTrackData.colorWaveD = mauSongDangChonD;



      const tieuDeMoi = (updated && updated.title) ? updated.title : (payload.reset ? (editingTrackData.originalTitle || editingTrackData.title) : newTitle);

      const ngheSiMoi = (updated && updated.artist) ? updated.artist : (payload.reset ? (editingTrackData.originalArtist || editingTrackData.artist) : newArtist);

      let anhBiaMoi = (updated && updated.cover) ? updated.cover : (payload.reset ? (editingTrackData.originalCover || editingTrackData.cover) : (selectedCoverBase64 || newCoverUrl || editingTrackData.cover));



      const baiHatDaCapNhat = {

        ...editingTrackData,

        ...(updated || {}),

        title: tieuDeMoi,

        artist: ngheSiMoi,

        cover: anhBiaMoi,

        customCoverBase64: payload.reset ? null : (selectedCoverBase64 || (updated && updated.customCoverBase64) || editingTrackData.customCoverBase64),

        drift: hieuUngTroiTamDangChon,

        cornerNeon: vienChuCDangChon,

        colorWaveA: mauSongDangChonA,

        colorWaveB: mauSongDangChonB,

        colorWaveC: mauSongDangChonC,

        colorWaveD: mauSongDangChonD,

      };



      if (caiDatMoi && caiDatMoi.image) {

        baiHatDaCapNhat.backgroundImage = caiDatMoi.image;

        baiHatDaCapNhat.backgroundDarkness = caiDatMoi.darkness;

        baiHatDaCapNhat.backgroundBlur = caiDatMoi.blur;

        baiHatDaCapNhat.backgroundOpacity = caiDatMoi.opacity;

      } else if (daChonXoaAnhNen) {

        delete baiHatDaCapNhat.backgroundImage;

        delete baiHatDaCapNhat.backgroundDarkness;

        delete baiHatDaCapNhat.backgroundBlur;

        delete baiHatDaCapNhat.backgroundOpacity;

      }



      // 1. Cap nhat truc tiep DOM ngay lap tuc

      CapNhatTheBaiHatTrongDOM(baiHatDaCapNhat);



      // 2. Cap nhat bai hat dang phat neu trung

      const laBaiDangPhat = currentTrack && SoSanhTrungBaiHat(currentTrack.id, currentTrack.source, maHienTai, nguonHienTai);

      if (laBaiDangPhat) {

        currentTrack = { ...currentTrack, ...baiHatDaCapNhat };

        hieuUngTroiSoTam = hieuUngTroiTamDangChon;

        hieuUngVienChuC = vienChuCDangChon;

        daoViTriSongLienTuc = daoViTriSongDangChon;

        mauSongHienTaiA = mauSongDangChonA;

        mauSongHienTaiB = mauSongDangChonB;

        mauSongHienTaiC = mauSongDangChonC;

        mauSongHienTaiD = mauSongDangChonD;

        applyWaveSwapSettings();

        CapNhatStickerTrangPhat(danhSachStickerModal);

        if (!hieuUngVienChuC && nguCanhGocChuL && canvasGocChuL) {

          const dpr = window.devicePixelRatio || 1;

          nguCanhGocChuL.clearRect(0, 0, canvasGocChuL.width / dpr, canvasGocChuL.height / dpr);

        }

        updatePlayerBarUI(currentTrack);

        if (titlebarNowPlaying) titlebarNowPlaying.textContent = `${currentTrack.title} - ${currentTrack.artist}`;

        if (isPlaying && audio) api.updateDiscordActivity(currentTrack, audio.currentTime, true);

        if (isTrackPageOpen || activeView === 'track-detail') updateTrackPageUI(currentTrack);

      }



      // 3. Cap nhat queue

      queue.forEach((t, i) => {

        if (SoSanhTrungBaiHat(t.id, t.source, maHienTai, nguonHienTai)) {

          queue[i] = { ...t, ...baiHatDaCapNhat };

        }

      });

      renderQueue();



      // 4. Cap nhat searchResults

      searchResults.forEach((t, i) => {

        if (SoSanhTrungBaiHat(t.id, t.source, maHienTai, nguonHienTai)) {

          searchResults[i] = { ...t, ...baiHatDaCapNhat };

        }

      });



      // 5. Cap nhat userPlaylists

      userPlaylists.forEach(p => {

        if (p.tracks) {

          p.tracks.forEach((pt, i) => {

            if (SoSanhTrungBaiHat(pt.id, pt.source, maHienTai, nguonHienTai)) {

              p.tracks[i] = { ...pt, ...baiHatDaCapNhat };

            }

          });

        }

      });



      // 6. Cap nhat libraryTracks

      const libIdx = libraryTracks.findIndex(t => SoSanhTrungBaiHat(t.id, t.source, maHienTai, nguonHienTai));

      if (libIdx >= 0) {

        libraryTracks[libIdx] = { ...libraryTracks[libIdx], ...baiHatDaCapNhat };

      } else {

        libraryTracks.unshift({ ...baiHatDaCapNhat });

      }



      // 7. Cap nhat continueListeningList
      continueListeningList.forEach(entry => {
        if (entry && entry.track && SoSanhTrungBaiHat(entry.track.id, entry.track.source, maHienTai, nguonHienTai)) {
          entry.track = { ...entry.track, ...baiHatDaCapNhat };
        }
      });
      api.saveContinueListening(continueListeningList).catch(() => {});

      // 8. Cap nhat listeningHistory
      listeningHistory.forEach((h, i) => {
        if (SoSanhTrungBaiHat(h.id, h.source, maHienTai, nguonHienTai)) {
          listeningHistory[i] = { ...h, ...baiHatDaCapNhat };
        }
      });
      api.saveHistory(listeningHistory).catch(() => {});

      // 9. Cap nhat cac danh sach tren trang chu
      homeHotTracks.forEach((t, i) => {
        if (SoSanhTrungBaiHat(t.id, t.source, maHienTai, nguonHienTai)) {
          homeHotTracks[i] = { ...t, ...baiHatDaCapNhat };
        }
      });
      LuuBoNhoDemTrangChu('hot', { timestamp: Date.now(), tracks: homeHotTracks });

      homeForyouTracks.forEach((t, i) => {
        if (SoSanhTrungBaiHat(t.id, t.source, maHienTai, nguonHienTai)) {
          homeForyouTracks[i] = { ...t, ...baiHatDaCapNhat };
        }
      });
      LuuBoNhoDemTrangChu('foryou', { timestamp: Date.now(), tracks: homeForyouTracks });

      homeDiscoveryTracks.forEach((t, i) => {
        if (SoSanhTrungBaiHat(t.id, t.source, maHienTai, nguonHienTai)) {
          homeDiscoveryTracks[i] = { ...t, ...baiHatDaCapNhat };
        }
      });
      LuuBoNhoDemTrangChu('discovery', { timestamp: Date.now(), tracks: homeDiscoveryTracks });



      // 10. Lam moi giao dien theo view hien tai

      updateLibraryUI();

      await loadPlaylists();



      if (activeView === 'home') {

        renderHomeContinue();

        renderHomeHistory();

        if (homeHotTracks.length > 0 && homeHotGrid) renderHomeTrackCards(homeHotTracks, homeHotGrid);

        if (homeForyouTracks.length > 0 && homeForyouGrid) renderHomeTrackCards(homeForyouTracks, homeForyouGrid);

        if (homeDiscoveryTracks.length > 0 && homeDiscoveryGrid) renderHomeTrackCards(homeDiscoveryTracks, homeDiscoveryGrid);

      } else if (activeView === 'playlist' && currentPlaylistId) {

        renderPlaylistView(currentPlaylistId);

      } else if (activeView === 'explore') {

        applyFilter();

      }



      closeEditModal();

      persistPlaybackState();

      showToast(`${ICONS.success} <span>Đã lưu thông tin</span>`, 'success', 1800);

    } catch (err) {

      console.error('Save error:', err);

      showToast('<span>Lỗi lưu bài hát</span>', 'error', 2000);

    }

  });



  // --- Edit Playlist Modal Controller ---

  let editingPlaylistId = null;

  let selectedPlaylistCoverBase64 = null;

  let isRemovingPlaylistCover = false;



  function updateModalPlaylistCoverPreview(pl) {

    const customUrl = modalPlaylistCoverUrl ? modalPlaylistCoverUrl.value.trim() : '';

    const activeCover = selectedPlaylistCoverBase64 || customUrl || (!isRemovingPlaylistCover && pl?.cover ? pl.cover : '');

    const fallbackCover = !isRemovingPlaylistCover ? getPlaylistCoverUrl(pl) : '';

    const displayCover = activeCover || fallbackCover;



    if (modalPlaylistCoverPreview) {

      modalPlaylistCoverPreview.onerror = () => {

        modalPlaylistCoverPreview.style.display = 'none';

        if (modalPlaylistCoverPlaceholder) modalPlaylistCoverPlaceholder.style.display = 'flex';

      };

      if (displayCover) {

        modalPlaylistCoverPreview.src = displayCover;

        modalPlaylistCoverPreview.style.display = 'block';

        modalPlaylistCoverPreview.style.width = '100%';

        modalPlaylistCoverPreview.style.height = '100%';

        modalPlaylistCoverPreview.style.objectFit = 'cover';

        if (modalPlaylistCoverPlaceholder) modalPlaylistCoverPlaceholder.style.display = 'none';

      } else {

        modalPlaylistCoverPreview.src = '';

        modalPlaylistCoverPreview.style.display = 'none';

        if (modalPlaylistCoverPlaceholder) modalPlaylistCoverPlaceholder.style.display = 'flex';

      }

    }



    if (btnPlaylistRemoveCover) {

      btnPlaylistRemoveCover.style.display = (activeCover || (pl?.cover && !isRemovingPlaylistCover)) ? 'flex' : 'none';

    }

  }



  // XU LI MODAL CHINH SUA PLAYLIST
  function openEditPlaylistModal(playlistId) {

    if (!editPlaylistModal) return;

    const targetId = playlistId || currentPlaylistId;

    const pl = userPlaylists.find(p => p.id === targetId);

    if (!pl) return;



    editingPlaylistId = targetId;

    selectedPlaylistCoverBase64 = null;

    isRemovingPlaylistCover = false;



    if (modalPlaylistName) modalPlaylistName.value = pl.name || '';

    if (modalPlaylistDesc) modalPlaylistDesc.value = pl.description || '';

    if (modalPlaylistCoverUrl) {

      modalPlaylistCoverUrl.value = (pl.cover && (pl.cover.startsWith('http://') || pl.cover.startsWith('https://'))) ? pl.cover : '';

    }

    if (modalPlaylistFileInput) modalPlaylistFileInput.value = '';



    updateModalPlaylistCoverPreview(pl);



    editPlaylistModal.style.display = 'flex';

    editPlaylistModal.classList.add('open');

    editPlaylistModal.classList.remove('hidden');

    setTimeout(() => { modalPlaylistName?.focus(); }, 50);

  }



  function closeEditPlaylistModal() {

    if (editPlaylistModal) {

      editPlaylistModal.style.display = 'none';

      editPlaylistModal.classList.remove('open');

      editPlaylistModal.classList.add('hidden');

    }

    editingPlaylistId = null;

    selectedPlaylistCoverBase64 = null;

    isRemovingPlaylistCover = false;

  }



  closeEditPlaylistModal();



  // Playlist Cover click opens Fullscreen Lightbox Image Viewer (NOT edit modal)

  btnPlaylistCoverView?.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (!currentPlaylistId) return;

    const pl = userPlaylists.find(p => p.id === currentPlaylistId);

    if (!pl) return;

    const coverUrl = getPlaylistCoverUrl(pl);

    if (coverUrl) {

      openImageViewer(coverUrl, pl.name);

    } else {

      showToast('<span>Playlist chưa có ảnh bìa tùy chỉnh</span>', 'info', 1800);

    }

  });



  // Only the Edit button opens edit playlist modal

  btnEditPlaylistModalOpen?.addEventListener('click', (e) => {

    e.preventDefault();

    if (currentPlaylistId) openEditPlaylistModal(currentPlaylistId);

  });



  btnEditPlaylistModalClose?.addEventListener('click', (e) => {

    e.preventDefault();

    closeEditPlaylistModal();

  });



  btnEditPlaylistCancel?.addEventListener('click', (e) => {

    e.preventDefault();

    closeEditPlaylistModal();

  });



  editPlaylistModal?.addEventListener('click', (e) => {

    if (e.target === editPlaylistModal) {

      closeEditPlaylistModal();

    }

  });



  modalPlaylistCoverWrapper?.addEventListener('click', (e) => {

    e.preventDefault();

    if (modalPlaylistFileInput) {

      modalPlaylistFileInput.value = '';

      modalPlaylistFileInput.click();

    }

  });



  btnPlaylistChooseFile?.addEventListener('click', (e) => {

    e.preventDefault();

    if (modalPlaylistFileInput) {

      modalPlaylistFileInput.value = '';

      modalPlaylistFileInput.click();

    }

  });



  modalPlaylistFileInput?.addEventListener('change', async (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const optimized = await optimizeCoverImage(file);

    if (optimized) {

      selectedPlaylistCoverBase64 = optimized;

      isRemovingPlaylistCover = false;

      if (modalPlaylistCoverUrl) modalPlaylistCoverUrl.value = '';

      const pl = userPlaylists.find(p => p.id === editingPlaylistId);

      updateModalPlaylistCoverPreview(pl);

    }

  });



  modalPlaylistCoverUrl?.addEventListener('input', () => {

    selectedPlaylistCoverBase64 = null;

    isRemovingPlaylistCover = false;

    const pl = userPlaylists.find(p => p.id === editingPlaylistId);

    updateModalPlaylistCoverPreview(pl);

  });



  btnPlaylistRemoveCover?.addEventListener('click', (e) => {

    e.preventDefault();

    selectedPlaylistCoverBase64 = null;

    isRemovingPlaylistCover = true;

    if (modalPlaylistCoverUrl) modalPlaylistCoverUrl.value = '';

    const pl = userPlaylists.find(p => p.id === editingPlaylistId);

    updateModalPlaylistCoverPreview(pl);

    showToast('<span>Đã chọn xóa ảnh tùy chỉnh (nhấn Lưu để áp dụng)</span>', 'info', 1800);

  });



  btnEditPlaylistSave?.addEventListener('click', async (e) => {

    e.preventDefault();

    if (!editingPlaylistId) return;

    const pl = userPlaylists.find(p => p.id === editingPlaylistId);

    if (!pl) return;



    const newName = modalPlaylistName?.value.trim() || pl.name;

    const newDesc = modalPlaylistDesc?.value.trim() || '';



    let newCover = null;

    if (isRemovingPlaylistCover) {

      newCover = '__REMOVE__';

    } else if (selectedPlaylistCoverBase64) {

      newCover = selectedPlaylistCoverBase64;

    } else if (modalPlaylistCoverUrl && modalPlaylistCoverUrl.value.trim()) {

      newCover = modalPlaylistCoverUrl.value.trim();

    } else if (pl.cover) {

      newCover = pl.cover;

    }



    try {

      await api.updatePlaylist(editingPlaylistId, newName, newDesc, newCover);

      closeEditPlaylistModal();

      showToast(`${ICONS.success} <span>Đã cập nhật playlist <b>${escapeHtml(newName)}</b></span>`, 'success', 1800);

      await loadPlaylists();

    } catch (err) {

      showToast(`<span>Lỗi lưu playlist: ${formatError(err)}</span>`, 'error', 2500);

    }

  });



  // --- Lightbox Image Viewer Logic ---

  // XU LI TRINH XEM ANH KICH THUOC LON (IMAGE VIEWER)
  function openImageViewer(url, title = '') {

    if (!imageViewerModal || !imageViewerImg) return;

    if (!url || typeof url !== 'string' || !url.trim()) return;



    currentViewerImageUrl = url;

    currentViewerImageTitle = title || 'playlist_cover';

    isImageViewerZoomed = false;



    imageViewerImg.style.transform = 'scale(1)';

    imageViewerImg.style.transformOrigin = 'center center';

    imageViewerImg.classList.remove('zoomed');

    imageViewerImg.src = url;



    imageViewerModal.style.display = 'flex';

    hideImageViewerContextMenu();

  }



  function closeImageViewer() {

    if (!imageViewerModal) return;

    imageViewerModal.style.display = 'none';

    isImageViewerZoomed = false;

    if (imageViewerImg) {

      imageViewerImg.style.transform = 'scale(1)';

      imageViewerImg.classList.remove('zoomed');

    }

    hideImageViewerContextMenu();

  }



  function showImageViewerContextMenu(x, y) {

    if (!imageViewerContextMenu) return;

    imageViewerContextMenu.style.display = 'block';

    const menuWidth = 175;

    const menuHeight = 90;

    const posX = Math.max(10, Math.min(x, window.innerWidth - menuWidth - 10));

    const posY = Math.max(10, Math.min(y, window.innerHeight - menuHeight - 10));

    imageViewerContextMenu.style.left = `${posX}px`;

    imageViewerContextMenu.style.top = `${posY}px`;

  }



  function hideImageViewerContextMenu() {

    if (imageViewerContextMenu) {

      imageViewerContextMenu.style.display = 'none';

    }

  }



  imageViewerImg?.addEventListener('click', (e) => {

    if (e.button !== 0) return;

    e.stopPropagation();

    hideImageViewerContextMenu();



    if (!isImageViewerZoomed) {

      const rect = imageViewerImg.getBoundingClientRect();

      const xPercent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));

      const yPercent = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));



      imageViewerImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;

      imageViewerImg.style.transform = 'scale(2.5)';

      imageViewerImg.classList.add('zoomed');

      isImageViewerZoomed = true;

    } else {

      imageViewerImg.style.transform = 'scale(1)';

      imageViewerImg.style.transformOrigin = 'center center';

      imageViewerImg.classList.remove('zoomed');

      isImageViewerZoomed = false;

    }

  });



  imageViewerImg?.addEventListener('contextmenu', (e) => {

    e.preventDefault();

    e.stopPropagation();

    showImageViewerContextMenu(e.clientX, e.clientY);

  });



  imageViewerBackdrop?.addEventListener('click', (e) => {

    if (e.target === imageViewerBackdrop || e.target === imageViewerContainer) {

      closeImageViewer();

    }

  });



  btnCloseImageViewer?.addEventListener('click', (e) => {

    e.stopPropagation();

    closeImageViewer();

  });



  document.addEventListener('click', (e) => {

    if (imageViewerContextMenu && imageViewerContextMenu.style.display !== 'none') {

      if (!e.target.closest('#image-viewer-context-menu')) {

        hideImageViewerContextMenu();

      }

    }

  });



  document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

      if (imageViewerModal && imageViewerModal.style.display !== 'none') {

        closeImageViewer();

        return;

      }

      if (isTrackPageOpen) {

        closeTrackPage();

        return;

      }

    }

  });



  btnImageSave?.addEventListener('click', async (e) => {

    e.stopPropagation();

    hideImageViewerContextMenu();

    if (!currentViewerImageUrl) return;



    const defaultName = (currentViewerImageTitle || 'playlist_cover').trim().replace(/\s+/g, '_');

    try {

      await api.saveImageToDisk(currentViewerImageUrl, defaultName);

      showToast(`${ICONS.success} <span>Đã lưu ảnh và mở trong Explorer</span>`, 'success', 2500);

    } catch (err) {

      console.warn('Native save failed, fallback to browser download:', err);

      try {

        const a = document.createElement('a');

        a.href = currentViewerImageUrl;

        a.download = `${defaultName}.png`;

        document.body.appendChild(a);

        a.click();

        a.remove();

        showToast(`${ICONS.success} <span>Đã tải ảnh về thư mục Downloads</span>`, 'success', 2000);

      } catch (e) {

        showToast('<span>Không thể lưu ảnh</span>', 'error', 1800);

      }

    }

  });



  btnImageCopy?.addEventListener('click', async (e) => {

    e.stopPropagation();

    hideImageViewerContextMenu();

    if (!currentViewerImageUrl) return;



    try {

      const img = new Image();

      img.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {

        img.onload = resolve;

        img.onerror = reject;

        img.src = currentViewerImageUrl;

      });



      const canvas = document.createElement('canvas');

      canvas.width = img.naturalWidth || img.width;

      canvas.height = img.naturalHeight || img.height;

      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0);



      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

      if (blob && navigator.clipboard && navigator.clipboard.write) {

        await navigator.clipboard.write([

          new ClipboardItem({ 'image/png': blob })

        ]);

        showToast(`${ICONS.success} <span>Đã sao chép ảnh vào clipboard</span>`, 'success', 2000);

      } else {

        throw new Error('Clipboard API unavailable');

      }

    } catch (err) {

      console.warn('Copy image blob failed, fallback to url copy:', err);

      try {

        await navigator.clipboard.writeText(currentViewerImageUrl);

        showToast(`${ICONS.info} <span>Đã sao chép liên kết ảnh</span>`, 'info', 1800);

      } catch (e) {

        showToast('<span>Không thể sao chép ảnh</span>', 'error', 1800);

      }

    }

  });



  // XU LI KHOI PHUC PHIEN LAM VIEC CUA NGUOI DUNG
  async function loadUserSession() {

    try {

      const config = await api.getConfig();

      if (config) {

        if (typeof config.volume === 'number') {

          currentVolume = Math.max(0, Math.min(1, config.volume));

          if (audio) audio.volume = currentVolume;

          if (volumeSlider) volumeSlider.value = Math.round(currentVolume * 100);

          if (volumeFill) volumeFill.style.width = `${currentVolume * 100}%`;

          updateVolumeIcon(currentVolume);

        }

        if (config.repeatMode) {

          repeatMode = config.repeatMode;

        }

        CapNhatGiaoDienLapLai();

        if (typeof config.shuffle === 'boolean') {

          isShuffle = config.shuffle;

          if (btnShuffle) {

            btnShuffle.classList.toggle('active', isShuffle);

            btnShuffle.innerHTML = isShuffle ? ICONS.shuffleOn : ICONS.shuffleOff;

          }

        }

        if (config.accentColor) {

          applyAccentColor(config.accentColor);

        }

        if (config.theme) {

          applyTheme(config.theme);

        }

        if (typeof config.sidebarExpanded === 'boolean') {

          setSidebarExpanded(config.sidebarExpanded);

        }

        if (typeof config.showSourceBadges === 'boolean') {

          applySourceBadges(config.showSourceBadges);

        } else {

          applySourceBadges(true);

        }

        if (typeof config.crossfadeEnabled === 'boolean') {

          crossfadeEnabled = config.crossfadeEnabled;

        }

        if (typeof config.crossfadeOverlap === 'number') crossfadeOverlap = config.crossfadeOverlap;

        if (typeof config.crossfadeDurA === 'number') crossfadeDurA = Math.max(0, Math.min(12, config.crossfadeDurA));

        if (typeof config.crossfadeDurB === 'number') crossfadeDurB = Math.max(0, Math.min(12, config.crossfadeDurB));



        if (typeof config.crossfadeCurveA === 'number') {

          crossfadeCurveA = Math.max(-1, Math.min(1, config.crossfadeCurveA));

        }

        if (typeof config.crossfadeCurveB === 'number') {

          crossfadeCurveB = Math.max(-1, Math.min(1, config.crossfadeCurveB));

        }

        applyCrossfadeSettings();

        if (typeof config.sidebarTopnavCollapsed === 'boolean') {
          isTopNavCollapsed = config.sidebarTopnavCollapsed;
          applyTopNavCollapseState(isTopNavCollapsed);
        }
        if (typeof config.trackPageCompact === 'boolean') {
          cheDoThuGonTrangPhat = config.trackPageCompact;
          CapNhatGiaoDienThuGon(cheDoThuGonTrangPhat);
        }
        if (config.layoutMode) {
          currentLayoutMode = config.layoutMode;
          setLayoutMode(currentLayoutMode);
        }
        if (typeof config.continuousWaveSwap === 'boolean') {
          daoViTriSongToanCuc = config.continuousWaveSwap;
          daoViTriSongLienTuc = config.continuousWaveSwap;
        }
        applyWaveSwapSettings();

        if (config.shortcuts && typeof config.shortcuts === 'object') {
          danhSachPhimTat = { ...CAC_PHIM_TAT_MAC_DINH, ...config.shortcuts };
        }
        KhoiTaoHeThongPhimTat();
      }
    } catch (err) {
      console.warn('Config restoration failed:', err);
    }

    try {
      const pb = await api.getPlaybackState();
      if (pb) {
        if (pb.abSegments && typeof pb.abSegments === 'object') {
          abSegmentsMap = pb.abSegments;
        }
        if (Array.isArray(pb.queue)) {
          queue = pb.queue;
          queueIndex = typeof pb.queueIndex === 'number' ? pb.queueIndex : 0;
          if (pb.currentPlayingPlaylistId) currentPlayingPlaylistId = pb.currentPlayingPlaylistId;
          renderQueue();
        }
        if (pb.currentTrack) {
          currentTrack = pb.currentTrack;
          updatePlayerBarUI(currentTrack);
          if (titlebarNowPlaying) titlebarNowPlaying.textContent = `${currentTrack.title} - ${currentTrack.artist}`;

          const duration = parseDurationSec(currentTrack.duration, currentTrack.durationFormatted);
          const savedTime = typeof pb.currentTime === 'number' ? pb.currentTime : 0;
          restoredPlaybackTime = savedTime;

          if (duration > 0 && timeTotal) {
            timeTotal.textContent = formatTime(duration, duration >= 3600);
            if (timeCurrent) timeCurrent.textContent = formatTime(savedTime, savedTime >= 3600);
            const progress = (savedTime / duration) * 100;
            if (seekSlider) seekSlider.value = progress;
            if (progressFill) progressFill.style.width = `${progress}%`;
          }
          updateAbMarkersUI();
        }
      }
    } catch (err) {
      console.warn('Playback restoration failed:', err);
    }

    try {
      const histData = await api.getHistory();
      if (Array.isArray(histData)) {
        listeningHistory = histData;
      }
    } catch (e) {
      console.warn('Load history failed:', e);
    }

    try {
      const contData = await api.getContinueListening();
      if (Array.isArray(contData)) {
        continueListeningList = contData;
      }
    } catch (e) {
      console.warn('Load continue listening failed:', e);
    }

    try {
      await KhoiTaoBoNhoAnhNen();
    } catch (e) {}

    try {
      localStorage.clear();
      sessionStorage.clear();
      if (window.indexedDB) {
        indexedDB.deleteDatabase('OmniMusicAnhNenDB');
      }
    } catch (e) {}

    await loadLibrary();
    await loadPlaylists();
    switchView('home');
    KhoiTaoHeThongPhimTat();
  }



  loadUserSession().catch(console.error);

}



// Safe initial launch

try {

  if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', () => {

      try {

        initApp();

      } catch (err) {

        console.error('Error during initApp on DOMContentLoaded:', err); document.body.innerHTML = '<div style="color:red;font-size:20px;z-index:9999;position:absolute;background:white;padding:20px;">' + err.stack + '</div>';

      }

    });

  } else {

    initApp();

  }

} catch (err) {

  console.error('Fatal initialization error:', err); document.body.innerHTML = '<div style="color:red;font-size:20px;z-index:9999;position:absolute;background:white;padding:20px;">' + err.stack + '</div>';

}

