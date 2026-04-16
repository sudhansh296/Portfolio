// MusiqFlow — Metrolist concept: phone-direct YouTube InnerTube streaming
// Search: YouTube Music WEB_REMIX client | Stream: ANDROID_VR / IOS client (phone IP)

var lyrics = [], activeIdx = -1, lyricsOffset = 0, searchResults = [];
var nextStreamCache = {};
var currentItem = null;

// ── YouTube Music InnerTube clients (from Metrolist source) ───────────────────
var YT_CLIENTS = {
  WEB_REMIX: {
    clientName: 'WEB_REMIX', clientVersion: '1.20260213.01.00', clientId: '67',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0',
    origin: 'https://music.youtube.com'
  },
  ANDROID_VR: {
    clientName: 'ANDROID_VR', clientVersion: '1.61.48', clientId: '28',
    userAgent: 'com.google.android.apps.youtube.vr.oculus/1.61.48 (Linux; U; Android 12; en_US; Oculus Quest 3; Build/SQ3A.220605.009.A1; Cronet/132.0.6808.3)',
    androidSdkVersion: '32', osName: 'Android', osVersion: '12',
    deviceMake: 'Oculus', deviceModel: 'Quest 3'
  },
  IOS: {
    clientName: 'IOS', clientVersion: '21.03.1', clientId: '5',
    userAgent: 'com.google.ios.youtube/21.03.1 (iPhone16,2; U; CPU iOS 18_2 like Mac OS X;)',
    osVersion: '18.2.22C152'
  },
  ANDROID: {
    clientName: 'ANDROID', clientVersion: '21.03.38', clientId: '3',
    userAgent: 'com.google.android.youtube/21.03.38 (Linux; U; Android 14) gzip',
    androidSdkVersion: '34'
  }
};

function makeContext(c, hl, gl) {
  var ctx = { clientName: c.clientName, clientVersion: c.clientVersion, hl: hl||'en', gl: gl||'US' };
  if (c.androidSdkVersion) ctx.androidSdkVersion = c.androidSdkVersion;
  if (c.osName) ctx.osName = c.osName;
  if (c.osVersion) ctx.osVersion = c.osVersion;
  if (c.deviceMake) ctx.deviceMake = c.deviceMake;
  if (c.deviceModel) ctx.deviceModel = c.deviceModel;
  return { context: { client: ctx } };
}

// ── Search History ────────────────────────────────────────────────────────────
var searchHistory = JSON.parse(localStorage.getItem('mf_history') || '[]');
function saveHistory(q) {
  searchHistory = searchHistory.filter(function(x) { return x.toLowerCase() !== q.toLowerCase(); });
  searchHistory.unshift(q);
  if (searchHistory.length > 30) searchHistory = searchHistory.slice(0, 30);
  localStorage.setItem('mf_history', JSON.stringify(searchHistory));
}
function showSuggestions(val) {
  var existing = document.getElementById('suggBox');
  var q = val.trim().toLowerCase();
  var matches = q ? searchHistory.filter(function(x) { return x.toLowerCase().includes(q); }) : searchHistory.slice(0, 8);
  if (!matches.length) { hideSuggestions(); return; }
  var box = existing || document.createElement('div');
  box.id = 'suggBox';
  box.innerHTML = matches.map(function(m) {
    var hl = q ? m.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')', 'gi'), '<mark>$1</mark>') : m;
    return '<div class="sugg-item" data-q="' + m.replace(/"/g,'&quot;') + '">' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity=".4"><circle cx="12" cy="12" r="10"/></svg>' + hl + '</div>';
  }).join('');
  if (!existing) {
    box.className = 'sugg-box';
    searchInput.closest('.search-outer').appendChild(box);
    box.addEventListener('mousedown', function(e) {
      var item = e.target.closest('.sugg-item');
      if (!item) return;
      e.preventDefault();
      searchInput.value = item.dataset.q;
      hideSuggestions();
      doSearch();
    });
  }
}
function hideSuggestions() { var b = document.getElementById('suggBox'); if (b) b.remove(); }

// ── DOM refs ──────────────────────────────────────────────────────────────────
var searchInput = document.getElementById('searchInput');
var searchBtn   = document.getElementById('searchBtn');
var resultsEl   = document.getElementById('results');
var resultsLabel= document.getElementById('resultsLabel');
var idleState   = document.getElementById('idleState');
var playerEl    = document.getElementById('player');
var disc        = document.getElementById('disc');
var discImg     = document.getElementById('discImg');
var discIcon    = document.getElementById('discIcon');
var artGlow     = document.getElementById('artGlow');
var sTitleEl    = document.getElementById('sTitle');
var sArtistEl   = document.getElementById('sArtist');
var linner      = document.getElementById('linner');
var pfill       = document.getElementById('pfill');
var pthumb      = document.getElementById('pthumb');
var pbar        = document.getElementById('pbar');
var curEl       = document.getElementById('cur');
var durEl       = document.getElementById('dur');
var playBtn     = document.getElementById('playBtn');
var playIcon    = document.getElementById('playIcon');
var pauseIcon   = document.getElementById('pauseIcon');
var prevBtn     = document.getElementById('prevBtn');
var nextBtn     = document.getElementById('nextBtn');
var volEl       = document.getElementById('vol');
var offRow      = document.getElementById('offsetRow');
var offVal      = document.getElementById('offVal');
var offMinus    = document.getElementById('offMinus');
var offPlus     = document.getElementById('offPlus');
var statusEl    = document.getElementById('status');
var ap          = document.getElementById('ap');

// ── Audio events ──────────────────────────────────────────────────────────────
ap.addEventListener('play',  function() { setPlayIcon(true); });
ap.addEventListener('pause', function() { setPlayIcon(false); });
ap.addEventListener('ended', function() {
  setPlayIcon(false);
  if (searchResults.length > 1) {
    var idx = searchResults.indexOf(currentItem);
    var next = searchResults[(idx + 1) % searchResults.length];
    if (next) playSong(next);
  }
});
ap.addEventListener('timeupdate', function() {
  var cur = ap.currentTime, dur = ap.duration || 0;
  curEl.textContent = fmt(cur); durEl.textContent = fmt(dur);
  if (dur) setProg((cur / dur) * 100);
  syncLyrics(cur);
  // Prefetch next song 30s before end
  if (dur && (dur - cur) < 30 && searchResults.length > 1 && currentItem) {
    var idx = searchResults.indexOf(currentItem);
    var next = searchResults[(idx + 1) % searchResults.length];
    if (next) {
      var q = next.artistName + ' ' + next.trackName;
      if (!nextStreamCache[q]) {
        nextStreamCache[q] = 'loading';
        ytMusicSearch(q).then(function(videoId) {
          if (!videoId) { delete nextStreamCache[q]; return; }
          fetchStreamDirect(videoId, function(url) {
            if (url) nextStreamCache[q] = url;
            else delete nextStreamCache[q];
          });
        }).catch(function() { delete nextStreamCache[q]; });
      }
    }
  }
});
ap.addEventListener('error', function() {
  if (!ap.src || ap.src === window.location.href) return;
  setStatus('Audio error — retrying...');
  setTimeout(function() { ap.load(); ap.play().catch(function(){}); }, 1500);
});

// ── YouTube Music Search (WEB_REMIX InnerTube — Metrolist approach) ───────────
function ytMusicSearch(query) {
  var c = YT_CLIENTS.WEB_REMIX;
  var body = Object.assign(makeContext(c), {
    query: query,
    params: 'EgWKAQIIAWoKEAMQBBAJEAoQBQ%3D%3D' // songs filter
  });
  return fetch('https://music.youtube.com/youtubei/v1/search?prettyPrint=false', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': c.userAgent,
      'X-YouTube-Client-Name': c.clientId,
      'X-YouTube-Client-Version': c.clientVersion,
      'Origin': c.origin,
      'Referer': c.origin + '/'
    },
    body: JSON.stringify(body)
  })
  .then(function(r) { return r.json(); })
  .then(function(data) { return extractVideoId(data); })
  .catch(function() { return null; });
}

function extractVideoId(data) {
  try {
    var tabs = data.contents && data.contents.tabbedSearchResultsRenderer && data.contents.tabbedSearchResultsRenderer.tabs;
    if (!tabs) return null;
    var contents = tabs[0] && tabs[0].tabRenderer && tabs[0].tabRenderer.content &&
      tabs[0].tabRenderer.content.sectionListRenderer && tabs[0].tabRenderer.content.sectionListRenderer.contents;
    if (!contents) return null;
    for (var i = 0; i < contents.length; i++) {
      var card = contents[i].musicCardShelfRenderer;
      if (card) {
        var ep = card.title && card.title.runs && card.title.runs[0] &&
          card.title.runs[0].navigationEndpoint && card.title.runs[0].navigationEndpoint.watchEndpoint;
        if (ep && ep.videoId) return ep.videoId;
      }
      var shelf = contents[i].musicShelfRenderer;
      if (!shelf || !shelf.contents) continue;
      for (var j = 0; j < shelf.contents.length; j++) {
        var r = shelf.contents[j].musicResponsiveListItemRenderer;
        if (!r) continue;
        var ovEp = r.overlay && r.overlay.musicItemThumbnailOverlayRenderer &&
          r.overlay.musicItemThumbnailOverlayRenderer.content &&
          r.overlay.musicItemThumbnailOverlayRenderer.content.musicPlayButtonRenderer &&
          r.overlay.musicItemThumbnailOverlayRenderer.content.musicPlayButtonRenderer.playNavigationEndpoint;
        if (ovEp && ovEp.watchEndpoint && ovEp.watchEndpoint.videoId) return ovEp.watchEndpoint.videoId;
        if (r.flexColumns) {
          for (var k = 0; k < r.flexColumns.length; k++) {
            var runs = r.flexColumns[k].musicResponsiveListItemFlexColumnRenderer &&
              r.flexColumns[k].musicResponsiveListItemFlexColumnRenderer.text &&
              r.flexColumns[k].musicResponsiveListItemFlexColumnRenderer.text.runs;
            if (!runs) continue;
            for (var l = 0; l < runs.length; l++) {
              var vid = runs[l].navigationEndpoint && runs[l].navigationEndpoint.watchEndpoint && runs[l].navigationEndpoint.watchEndpoint.videoId;
              if (vid) return vid;
            }
          }
        }
      }
    }
  } catch(e) {}
  return null;
}

// ── Fetch stream URL directly from phone (Metrolist concept) ─────────────────
// Phone IP = residential = YouTube trusts it, no bot check needed
function fetchStreamDirect(videoId, cb) {
  var clients = [YT_CLIENTS.ANDROID_VR, YT_CLIENTS.IOS, YT_CLIENTS.ANDROID];
  var idx = 0;
  function tryNext() {
    if (idx >= clients.length) { cb(null); return; }
    var c = clients[idx++];
    var body = Object.assign(makeContext(c), { videoId: videoId, params: 'CgIQBg==' });
    fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': c.userAgent,
        'X-YouTube-Client-Name': c.clientId,
        'X-YouTube-Client-Version': c.clientVersion,
        'Origin': 'https://www.youtube.com'
      },
      body: JSON.stringify(body)
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var status = data && data.playabilityStatus && data.playabilityStatus.status;
      if (status !== 'OK') { tryNext(); return; }
      var formats = (data.streamingData && data.streamingData.adaptiveFormats) || [];
      var audio = formats.filter(function(f) { return f.mimeType && f.mimeType.startsWith('audio/'); });
      if (!audio.length) { tryNext(); return; }
      audio.sort(function(a, b) { return (b.bitrate || 0) - (a.bitrate || 0); });
      var url = audio[0].url;
      if (url) { cb(url); } else { tryNext(); }
    })
    .catch(function() { tryNext(); });
  }
  tryNext();
}

// ── Search (iTunes for metadata + YouTube Music for videoId) ──────────────────
function doSearch() {
  var q = searchInput.value.trim();
  if (!q) return;
  hideSuggestions();
  saveHistory(q);
  resultsEl.innerHTML = '<div class="no-results">Searching...</div>';
  resultsLabel.style.display = 'none';

  // iTunes for rich metadata (artwork, duration, album)
  fetch(apiUrl('/search?q=' + encodeURIComponent(q)))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var results = (data && data.results || []).filter(function(r) { return r.kind === 'song'; }).slice(0, 80);
      if (!results.length) {
        resultsEl.innerHTML = '<div class="no-results">No results found.</div>';
        return;
      }
      searchResults = results;
      resultsLabel.style.display = 'block';
      resultsLabel.textContent = 'Results (' + results.length + ')';
      renderResults(results);
    })
    .catch(function() {
      resultsEl.innerHTML = '<div class="no-results">Search failed. Check connection.</div>';
    });
}

function renderResults(items) {
  resultsEl.innerHTML = '';
  resultsLabel.style.display = 'block';
  items.forEach(function(item) {
    var thumb = (item.artworkUrl100 || '').replace('100x100', '60x60');
    var div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML =
      '<img class="result-thumb" src="' + escHtml(thumb) + '" onerror="this.style.display=\'none\'">' +
      '<div class="result-info">' +
        '<div class="result-title">' + escHtml(item.trackName || '') + '</div>' +
        '<div class="result-artist">' + escHtml(item.artistName || '') + ' — ' + escHtml(item.collectionName || '') + '</div>' +
      '</div>' +
      '<div class="result-dur">' + fmt(Math.round((item.trackTimeMillis || 0) / 1000)) + '</div>' +
      '<button class="pl-add-btn" title="Add to playlist">+</button>';
    div.querySelector('.pl-add-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      addToPlaylist(item);
      this.textContent = '✓'; this.style.color = '#a78bfa';
      setTimeout(function(btn) { btn.textContent = '+'; btn.style.color = ''; }.bind(null, this), 1200);
    });
    div.addEventListener('click', function() {
      document.querySelectorAll('.result-item').forEach(function(el) { el.classList.remove('active', 'loading'); });
      div.classList.add('loading');
      playSong(item);
    });
    resultsEl.appendChild(div);
  });
}

// ── Play Song ─────────────────────────────────────────────────────────────────
function playSong(item) {
  currentItem = item;
  idleState.style.display = 'none';
  playerEl.style.display  = 'flex';

  document.querySelectorAll('.result-item').forEach(function(el) { el.classList.remove('active'); });
  var allItems = resultsEl.querySelectorAll('.result-item');
  searchResults.forEach(function(r, i) { if (r === item && allItems[i]) allItems[i].classList.add('active'); });

  sTitleEl.textContent  = item.trackName  || '—';
  sArtistEl.textContent = item.artistName || '—';
  linner.innerHTML = '<div class="lhint">🎵 Fetching lyrics...</div>';
  linner.style.transform = 'translateY(0)';
  lyrics = []; activeIdx = -1; lyricsOffset = 0;
  offRow.style.display = 'none'; updateOffsetUI();

  if (item.artworkUrl100) {
    var imgUrl = item.artworkUrl100.replace('100x100', '300x300');
    discImg.src = imgUrl; discImg.style.display = 'block'; discIcon.style.display = 'none';
    artGlow.style.background = 'radial-gradient(circle, rgba(124,58,237,.5) 0%, transparent 70%)';
  } else {
    discImg.style.display = 'none'; discIcon.style.display = 'block'; artGlow.style.background = '';
  }

  ap.pause(); ap.removeAttribute('src'); ap.load();
  setStatus('Searching YouTube Music...');

  var query = item.artistName + ' ' + item.trackName;
  var cached = nextStreamCache[query];
  if (cached && cached !== 'loading') {
    delete nextStreamCache[query];
    playFromUrl(cached, item);
    return;
  }

  // Step 1: YouTube Music search for videoId (WEB_REMIX client)
  ytMusicSearch(query).then(function(videoId) {
    if (!videoId) {
      // Fallback: server-side search
      setStatus('Trying server fallback...');
      return fetch(apiUrl('/ytstream?q=' + encodeURIComponent(query)))
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data && data.videoId) return data.videoId;
          if (data && data.streamUrl) { playFromUrl(data.streamUrl, item); return null; }
          setStatus('Not found'); markNotLoading(); return null;
        });
    }
    return videoId;
  })
  .then(function(videoId) {
    if (!videoId) return;
    setStatus('Loading stream...');
    // Step 2: Fetch stream directly from phone (Metrolist approach)
    fetchStreamDirect(videoId, function(streamUrl) {
      if (streamUrl) {
        playFromUrl(streamUrl, item);
      } else {
        // Last fallback: server proxy
        fetch(apiUrl('/ytstream?q=' + encodeURIComponent(query)))
          .then(function(r) { return r.json(); })
          .then(function(data) {
            if (data && data.streamUrl) {
              playFromUrl(apiUrl('/audio?url=' + encodeURIComponent(data.streamUrl)), item);
            } else {
              setStatus('Stream unavailable'); markNotLoading();
            }
          }).catch(function() { setStatus('Stream failed'); markNotLoading(); });
      }
    });
  })
  .catch(function(e) { setStatus('Error: ' + e.message); markNotLoading(); });

  var artistForLyrics = (item.artistName || '').split(/[,&]/)[0].trim();
  fetchLyrics(item.trackName || '', artistForLyrics);
}

function playFromUrl(streamUrl, item) {
  var query = item.artistName + ' ' + item.trackName;
  delete nextStreamCache[query];
  ap.src = streamUrl; ap.load();
  ap.volume = volEl.value / 100;
  ap.play().catch(function() { setStatus('Click ▶ to play'); });
  setStatus('Playing ♪');
  markNotLoading();
  var allItems2 = resultsEl.querySelectorAll('.result-item');
  searchResults.forEach(function(r, i) { if (r === item && allItems2[i]) allItems2[i].classList.add('active'); });
}

function markNotLoading() {
  document.querySelectorAll('.result-item').forEach(function(el) { el.classList.remove('loading'); });
}

// ── Controls ──────────────────────────────────────────────────────────────────
playBtn.addEventListener('click', function() {
  if (!ap.src || ap.src === window.location.href) return;
  ap.paused ? ap.play().catch(function(){}) : ap.pause();
});
prevBtn.addEventListener('click', function() { ap.currentTime = Math.max(0, ap.currentTime - 10); });
nextBtn.addEventListener('click', function() { if (ap.duration) ap.currentTime = Math.min(ap.currentTime + 10, ap.duration); });
prevBtn.addEventListener('dblclick', function(e) {
  e.preventDefault();
  if (!searchResults.length || !currentItem) return;
  var idx = searchResults.indexOf(currentItem);
  playSong(searchResults[(idx - 1 + searchResults.length) % searchResults.length]);
});
nextBtn.addEventListener('dblclick', function(e) {
  e.preventDefault();
  if (!searchResults.length || !currentItem) return;
  var idx = searchResults.indexOf(currentItem);
  playSong(searchResults[(idx + 1) % searchResults.length]);
});
volEl.addEventListener('input', function() { ap.volume = volEl.value / 100; });

function quickSearch(q) { searchInput.value = q; searchInput.scrollIntoView({ behavior: 'smooth', block: 'start' }); searchInput.focus(); doSearch(); }
function langSearch(lang) { searchInput.value = lang; searchInput.scrollIntoView({ behavior: 'smooth', block: 'start' }); searchInput.focus(); doSearch(); }

// Artist search filter
var artistSearchEl = document.getElementById('artistSearch');
if (artistSearchEl) {
  var artistSearchTimer = null;
  artistSearchEl.addEventListener('input', function() {
    var q = this.value.toLowerCase().trim();
    document.querySelectorAll('.artist-card').forEach(function(card) {
      var name = card.querySelector('span').textContent.toLowerCase();
      card.style.display = (!q || name.includes(q)) ? '' : 'none';
    });
    clearTimeout(artistSearchTimer);
    if (!q) return;
    artistSearchTimer = setTimeout(function() {
      fetch(apiUrl('/search?q=' + encodeURIComponent(q)))
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (!data || !data.results) return;
          var seen = {}, artists = [];
          data.results.forEach(function(r) {
            if (r.kind !== 'song' || !r.artistName) return;
            var key = r.artistName.toLowerCase();
            if (!seen[key]) { seen[key] = true; artists.push({ name: r.artistName, thumb: r.artworkUrl100 || '' }); }
          });
          var dynEl = document.getElementById('artistDynamic');
          if (!dynEl) { dynEl = document.createElement('div'); dynEl.id = 'artistDynamic'; dynEl.className = 'artist-grid'; document.querySelector('.idle-artists').appendChild(dynEl); }
          dynEl.innerHTML = '';
          artists.slice(0, 12).forEach(function(a) {
            var card = document.createElement('div'); card.className = 'artist-card';
            var thumb = a.thumb ? a.thumb.replace('100x100','120x120') : 'https://ui-avatars.com/api/?name='+encodeURIComponent(a.name)+'&background=7c3aed&color=fff&size=120&bold=true';
            card.innerHTML = '<img src="'+thumb+'" alt="'+a.name+'"/><span>'+a.name+'</span>';
            card.addEventListener('click', function() { quickSearch(a.name); });
            dynEl.appendChild(card);
          });
        }).catch(function(){});
    }, 400);
  });
  artistSearchEl.addEventListener('keydown', function(e) { if (e.key === 'Enter') { var q = this.value.trim(); if (q) { quickSearch(q); this.value = ''; } } });
  artistSearchEl.addEventListener('input', function() { if (!this.value.trim()) { var d = document.getElementById('artistDynamic'); if (d) d.innerHTML = ''; } });
}

var langSearchEl = document.getElementById('langSearch');
if (langSearchEl) {
  langSearchEl.addEventListener('input', function() {
    var q = this.value.toLowerCase();
    document.querySelectorAll('.lang-btn').forEach(function(btn) { btn.style.display = btn.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  });
  langSearchEl.addEventListener('keydown', function(e) { if (e.key === 'Enter') { var v = document.querySelector('.lang-btn:not([style*="none"])'); if (v) v.click(); } });
}

// ── Artist photos ─────────────────────────────────────────────────────────────
var artistPhotoMap = {
  'Arijit Singh':'artist-arijit','Shreya Ghoshal':'artist-shreya','AP Dhillon':'artist-ap',
  'Diljit Dosanjh':'artist-diljit','Jubin Nautiyal':'artist-jubin','Neha Kakkar':'artist-neha',
  'Atif Aslam':'artist-atif','Badshah':'artist-badshah','The Weeknd':'artist-weeknd',
  'Ed Sheeran':'artist-ed','Taylor Swift':'artist-taylor','Drake':'artist-drake',
  'Billie Eilish':'artist-billie','Bruno Mars':'artist-bruno','Eminem':'artist-eminem',
  'Coldplay':'artist-coldplay','Armaan Malik':'artist-armaan','Guru Randhawa':'artist-guru',
  'Darshan Raval':'artist-darshan','Vishal Mishra':'artist-vishal','Justin Bieber':'artist-justin',
  'Ariana Grande':'artist-ariana','Post Malone':'artist-post','Dua Lipa':'artist-dua'
};
Object.keys(artistPhotoMap).forEach(function(name, i) {
  setTimeout(function() {
    var imgEl = document.getElementById(artistPhotoMap[name]);
    if (!imgEl) return;
    fetch(apiUrl('/artistimg?name=' + encodeURIComponent(name)))
      .then(function(r) { return r.json(); })
      .then(function(data) { if (data && data.url) imgEl.src = data.url; })
      .catch(function(){});
  }, i * 150);
});

searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') doSearch(); });
searchInput.addEventListener('focus', function() { showSuggestions(this.value); });
searchInput.addEventListener('input', function() { showSuggestions(this.value); });
searchInput.addEventListener('blur', function() { setTimeout(hideSuggestions, 150); });
offMinus.addEventListener('click', function() { lyricsOffset = Math.round((lyricsOffset-0.5)*10)/10; activeIdx=-1; updateOffsetUI(); });
offPlus.addEventListener('click',  function() { lyricsOffset = Math.round((lyricsOffset+0.5)*10)/10; activeIdx=-1; updateOffsetUI(); });

document.getElementById('tapSync').addEventListener('click', function() {
  if (!lyrics.length || activeIdx < 0) return;
  lyricsOffset = Math.round((ap.currentTime - lyrics[activeIdx].t) * 10) / 10;
  activeIdx = -1; updateOffsetUI();
  setStatus('Lyrics synced ✓ offset: ' + (lyricsOffset >= 0 ? '+' : '') + lyricsOffset.toFixed(1) + 's');
});
function updateOffsetUI() { offVal.textContent = (lyricsOffset>=0?'+':'')+lyricsOffset.toFixed(1)+'s'; }

// ── Seek / drag ───────────────────────────────────────────────────────────────
var dragging = false;
function seekTo(clientX) {
  if (!ap.duration) return;
  var pct = Math.min(1, Math.max(0, (clientX - pbar.getBoundingClientRect().left) / pbar.offsetWidth));
  ap.currentTime = pct * ap.duration; setProg(pct * 100);
}
pbar.addEventListener('mousedown', function(e) { dragging=true; seekTo(e.clientX); e.preventDefault(); });
document.addEventListener('mousemove', function(e) { if(dragging) seekTo(e.clientX); });
document.addEventListener('mouseup', function() { dragging=false; });
pbar.addEventListener('touchstart', function(e) { dragging=true; seekTo(e.touches[0].clientX); e.preventDefault(); },{passive:false});
document.addEventListener('touchmove', function(e) { if(dragging) seekTo(e.touches[0].clientX); },{passive:false});
document.addEventListener('touchend', function() { dragging=false; });

// ── Lyrics ────────────────────────────────────────────────────────────────────
function buildLyrics(arr) {
  lyrics=arr; activeIdx=-1;
  linner.innerHTML=''; linner.style.transform='translateY(0)';
  if(!arr.length){linner.innerHTML='<div class="lhint">No lyrics found</div>';return;}
  arr.forEach(function(item){var d=document.createElement('div');d.className='line';d.textContent=item.s;linner.appendChild(d);});
  offRow.style.display='flex';
  autoSyncLyrics();
}
function autoSyncLyrics() {
  if (!lyrics.length) return;
  lyricsOffset = 0; activeIdx = -1; updateOffsetUI();
  var checked = false;
  var checkSync = setInterval(function() {
    if (checked || !ap.duration || ap.currentTime < 2) return;
    checked = true; clearInterval(checkSync);
    var cur = ap.currentTime, expectedIdx = -1;
    for (var i = 0; i < lyrics.length; i++) { if (lyrics[i].t <= cur) expectedIdx = i; else break; }
    if (expectedIdx < 0) return;
    var drift = cur - lyrics[expectedIdx].t;
    if (drift > 1 && drift < 15) { lyricsOffset = Math.round(drift * 10) / 10; activeIdx = -1; updateOffsetUI(); }
  }, 500);
}
function syncLyrics(time) {
  if(!lyrics.length) return;
  var t=time-lyricsOffset, idx=-1;
  for(var i=0;i<lyrics.length;i++){ if(t>=lyrics[i].t) idx=i; else break; }
  if(idx===activeIdx) return;
  activeIdx=idx;
  var els=linner.querySelectorAll('.line');
  for(var i=0;i<els.length;i++){
    els[i].classList.remove('active','past');
    if(i<idx) els[i].classList.add('past');
    else if(i===idx) els[i].classList.add('active');
  }
  if(!userScrolling && idx>=0 && els[idx]){
    var top=els[idx].offsetTop-linner.parentElement.offsetHeight/2+els[idx].offsetHeight/2;
    linner.style.transform='translateY('+(-top)+'px)';
  }
}
var userScrolling = false, scrollTimer = null;
var lbox = linner.parentElement;
lbox.addEventListener('wheel', function(e) {
  userScrolling=true; lbox.classList.add('user-scrolling');
  var cur=parseInt(linner.style.transform.replace('translateY(','').replace('px)',''))||0;
  linner.style.transform='translateY('+(cur-e.deltaY*0.5)+'px)';
  e.preventDefault(); clearTimeout(scrollTimer);
  scrollTimer=setTimeout(function(){userScrolling=false;lbox.classList.remove('user-scrolling');},3000);
},{passive:false});
var touchStartY=0;
lbox.addEventListener('touchstart',function(e){touchStartY=e.touches[0].clientY;},{passive:true});
lbox.addEventListener('touchmove',function(e){
  userScrolling=true; lbox.classList.add('user-scrolling');
  var dy=touchStartY-e.touches[0].clientY; touchStartY=e.touches[0].clientY;
  var cur=parseInt(linner.style.transform.replace('translateY(','').replace('px)',''))||0;
  linner.style.transform='translateY('+(cur-dy)+'px)';
  clearTimeout(scrollTimer);
  scrollTimer=setTimeout(function(){userScrolling=false;lbox.classList.remove('user-scrolling');},3000);
},{passive:true});

// ── Fetch Lyrics ──────────────────────────────────────────────────────────────
function fetchLyrics(track, artist) {
  linner.innerHTML='<div class="lhint">🎵 Searching lyrics...</div>';
  var clean=cleanTitle(track);
  var round1=[lrcLibSearch(track,artist),lrcLibSearch(clean,artist),lrcLibQuery(clean+(artist?' '+artist:''))];
  var done=false;
  function applyResult(r){if(done)return;if(r&&r.lyrics&&r.lyrics.length){done=true;buildLyrics(r.lyrics);setStatus('Playing ♪  •  Lyrics: '+r.source+' ('+r.lyrics.length+' lines)');}}
  Promise.all(round1.map(function(p){return p.then(function(r){applyResult(r);return r;}).catch(function(){return null;});})).then(function(){
    if(done)return;
    var fallbacks=[
      function(){return lrcLibSearch(track,'');},
      function(){return lrcLibSearch(clean,'');},
      function(){return lrcLibSearch(clean,fuzzyArtist(artist));},
      function(){return lrcLibQuery(clean+' '+artist.split(' ')[0]);},
      function(){return fetchFromBetterLyrics(clean,artist);}
    ];
    function tryNext(i){
      if(done||i>=fallbacks.length){if(!done)linner.innerHTML='<div class="lhint">No lyrics found</div>';return;}
      fallbacks[i]().then(function(r){if(r&&r.lyrics&&r.lyrics.length)applyResult(r);else tryNext(i+1);}).catch(function(){tryNext(i+1);});
    }
    tryNext(0);
  });
}
function lrcLibSearch(track,artist){if(!track)return Promise.resolve(null);var url='https://lrclib.net/api/search?track_name='+encodeURIComponent(track);if(artist)url+='&artist_name='+encodeURIComponent(artist);return fetch(url).then(function(r){return r.json();}).then(parseLrcLibResponse).catch(function(){return null;});}
function lrcLibQuery(q){if(!q)return Promise.resolve(null);return fetch('https://lrclib.net/api/search?q='+encodeURIComponent(q)).then(function(r){return r.json();}).then(parseLrcLibResponse).catch(function(){return null;});}
function parseLrcLibResponse(data){if(!data||!data.length)return null;var pick=data.find(function(t){return t.syncedLyrics;})||data[0];if(!pick)return null;if(pick.syncedLyrics){var p=parseLRC(pick.syncedLyrics);if(p.length)return{lyrics:p.map(function(x){return{t:x.time,s:x.text};}),source:'LrcLib ✓'};}if(pick.plainLyrics){var lines=pick.plainLyrics.split('\n').filter(function(l){return l.trim();});if(lines.length)return{lyrics:lines.map(function(l,i){return{t:i*3,s:l};}),source:'LrcLib (plain)'};}return null;}
function fetchFromBetterLyrics(track,artist){var u='https://lyrics-api.boidu.dev/getLyrics?s='+encodeURIComponent(track)+(artist?'&a='+encodeURIComponent(artist):'');return fetch(u,{headers:{'Accept':'application/json'}}).then(function(r){return r.ok?r.json():null;}).then(function(data){if(!data||!data.ttml)return null;var lines=parseTTML(data.ttml);return lines.length?{lyrics:lines,source:'BetterLyrics ✓'}:null;}).catch(function(){return null;});}
function parseTTML(ttml){var result=[];try{var doc=new DOMParser().parseFromString(ttml,'text/xml');doc.querySelectorAll('p').forEach(function(p){var b=p.getAttribute('begin');if(!b)return;var text=p.textContent.trim().replace(/\s+/g,' ');if(text)result.push({t:ttmlTime(b),s:text});});}catch(e){}return result.sort(function(a,b){return a.t-b.t;});}
function ttmlTime(ts){var p=ts.split(':');if(p.length===3)return+p[0]*3600+ +p[1]*60+parseFloat(p[2]);if(p.length===2)return+p[0]*60+parseFloat(p[1]);return parseFloat(p[0]);}
function parseLRC(text){var result=[],re=/\[(\d{2}):(\d{2})[.:](\d{2,3})\]/g;text.split('\n').forEach(function(line){var matches=[],m;re.lastIndex=0;while((m=re.exec(line))!==null)matches.push(m);if(!matches.length)return;var txt=line.replace(/\[\d{2}:\d{2}[.:]?\d*\]/g,'').trim();if(!txt)return;matches.forEach(function(mm){result.push({time:+mm[1]*60+ +mm[2]+ +mm[3].padEnd(3,'0')/1000,text:txt});});});return result.sort(function(a,b){return a.time-b.time;});}

// ── Playlist ──────────────────────────────────────────────────────────────────
var playlist = JSON.parse(localStorage.getItem('mf_playlist') || '[]');
function savePL() { localStorage.setItem('mf_playlist', JSON.stringify(playlist)); }
function addToPlaylist(item) {
  var key = item.trackId ? item.trackId.toString() : (item.trackName + '|' + item.artistName);
  if (playlist.some(function(s) { return (s.trackId ? s.trackId.toString() : (s.trackName+'|'+s.artistName)) === key; })) return;
  playlist.push(item); savePL(); renderPlaylist();
}
function removeFromPlaylist(idx) { playlist.splice(idx, 1); savePL(); renderPlaylist(); }
function renderPlaylist() {
  var badge = document.getElementById('plCountBadge');
  if (badge) { if (playlist.length) { badge.textContent = playlist.length + ' songs'; badge.style.display = ''; } else { badge.style.display = 'none'; } }
}
renderPlaylist();

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(s){s=s||0;return Math.floor(s/60)+':'+('0'+Math.floor(s%60)).slice(-2);}
function setProg(pct){pct=Math.min(100,Math.max(0,pct));pfill.style.width=pct+'%';pthumb.style.left=pct+'%';}
function setPlayIcon(on){if(on){playIcon.style.display='none';pauseIcon.style.display='block';disc.classList.add('spin');}else{playIcon.style.display='block';pauseIcon.style.display='none';disc.classList.remove('spin');}}
function setStatus(m){statusEl.textContent=m;}
function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function cleanTitle(t){return t.replace(/\s*\(.*?(official|video|audio|lyrics|lyric|hd|hq|remix|live|acoustic|version|edit|radio|clean|explicit).*?\)/gi,'').replace(/\s*feat\..*$/gi,'').replace(/\s*ft\..*$/gi,'').trim();}
function fuzzyArtist(artist){if(!artist)return '';return artist.replace(/ai/gi,'a').replace(/ii/gi,'i').trim();}

// ── Downloaded Songs (IndexedDB) ──────────────────────────────────────────────
var DL_DB=null, DL_DB_NAME='musiqflow_dl', DL_DB_VER=1, DL_STORE='songs';
function openDlDB(cb){if(DL_DB){cb(DL_DB);return;}var req=indexedDB.open(DL_DB_NAME,DL_DB_VER);req.onupgradeneeded=function(e){e.target.result.createObjectStore(DL_STORE,{keyPath:'id',autoIncrement:true});};req.onsuccess=function(e){DL_DB=e.target.result;cb(DL_DB);};req.onerror=function(){cb(null);};}
function getAllDlSongs(cb){openDlDB(function(d){if(!d){cb([]);return;}var tx=d.transaction(DL_STORE,'readonly');var req=tx.objectStore(DL_STORE).getAll();req.onsuccess=function(){cb((req.result||[]).reverse());};req.onerror=function(){cb([]);};});}
function deleteDlSong(id,cb){openDlDB(function(d){if(!d){cb&&cb();return;}var tx=d.transaction(DL_STORE,'readwrite');tx.objectStore(DL_STORE).delete(typeof id==='string'?parseInt(id,10):id);tx.oncomplete=function(){cb&&cb();};tx.onerror=function(){cb&&cb();};});}
function switchTab(tab){}

function renderDlPanel() {
  getAllDlSongs(function(songs) {
    var badge=document.getElementById('dlBadge');
    if(badge){badge.textContent=songs.length;badge.style.display=songs.length?'':'none';}
    var el=document.getElementById('dlResults');
    if(!el)return;
    if(!songs.length){el.innerHTML='<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">No downloaded songs</div></div>';return;}
    el.innerHTML='';
    songs.forEach(function(song){
      var div=document.createElement('div');div.className='result-item';
      div.innerHTML='<img class="result-thumb" src="'+escHtml(song.artworkUrl||'')+'" onerror="this.style.display=\'none\'">'+
        '<div class="result-info"><div class="result-title">'+escHtml(song.trackName)+'</div><div class="result-artist">'+escHtml(song.artistName)+'</div></div>'+
        '<span class="dl-offline-badge">Offline</span><span class="result-dur">'+fmt(song.duration)+'</span>';
      var playBtnEl=document.createElement('button');playBtnEl.className='dl-play-btn';playBtnEl.title='Play offline';
      playBtnEl.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      playBtnEl.addEventListener('click',function(e){e.stopPropagation();playDlSong(song);});
      var delBtn=document.createElement('button');delBtn.className='dl-del-btn';delBtn.title='Remove';delBtn.textContent='×';
      delBtn.addEventListener('click',function(e){e.stopPropagation();deleteDlSong(song.id,function(){renderDlPanel();});});
      div.appendChild(playBtnEl);div.appendChild(delBtn);
      div.addEventListener('click',function(){playDlSong(song);});
      el.appendChild(div);
    });
  });
}

function playDlSong(song) {
  if(!song.blob){setStatus('Blob not found — re-download');return;}
  var blobUrl=URL.createObjectURL(song.blob);
  idleState.style.display='none';playerEl.style.display='flex';
  sTitleEl.textContent=song.trackName||'—';sArtistEl.textContent=song.artistName||'—';
  if(song.artworkUrl){discImg.src=song.artworkUrl.replace('60x60','300x300');discImg.style.display='block';discIcon.style.display='none';}
  else{discImg.style.display='none';discIcon.style.display='block';}
  linner.innerHTML='<div class="lhint">🎵 Offline mode</div>';lyrics=[];activeIdx=-1;offRow.style.display='none';
  ap.pause();ap.src=blobUrl;ap.load();ap.volume=volEl.value/100;
  ap.play().catch(function(){setStatus('Click ▶ to play');});setStatus('Playing offline ♪');
  document.querySelectorAll('#dlResults .result-item').forEach(function(el){el.classList.remove('active');});
}

// ── Download current song ─────────────────────────────────────────────────────
var dlBtn=document.getElementById('dlCurrentBtn');
if(dlBtn){
  dlBtn.addEventListener('click',function(){
    if(!currentItem)return;
    var name=currentItem.artistName+' - '+currentItem.trackName;
    var q=currentItem.artistName+' '+currentItem.trackName;
    dlBtn.classList.add('dl-downloading');setStatus('Downloading...');
    fetch(apiUrl('/download?q='+encodeURIComponent(q)+'&name='+encodeURIComponent(name)))
      .then(function(r){if(!r.ok)throw new Error('Server error '+r.status);return r.blob();})
      .then(function(blob){
        dlBtn.classList.remove('dl-downloading');dlBtn.classList.add('dl-done');setStatus('Downloaded ✓');
        var blobUrl=URL.createObjectURL(blob);
        var a=document.createElement('a');a.href=blobUrl;a.download=name.replace(/[^\w\s\-]/g,'')+'.m4a';
        document.body.appendChild(a);a.click();document.body.removeChild(a);
        openDlDB(function(d){if(!d)return;var tx2=d.transaction(DL_STORE,'readwrite');
          tx2.objectStore(DL_STORE).add({trackName:currentItem.trackName||'',artistName:currentItem.artistName||'',collectionName:currentItem.collectionName||'',artworkUrl:(currentItem.artworkUrl100||'').replace('100x100','60x60'),duration:Math.round((currentItem.trackTimeMillis||0)/1000),blob:blob,savedAt:Date.now()});
          tx2.oncomplete=function(){renderDlPanel();};});
        setTimeout(function(){dlBtn.classList.remove('dl-done');setStatus('');URL.revokeObjectURL(blobUrl);},4000);
      })
      .catch(function(e){dlBtn.classList.remove('dl-downloading');setStatus('Download failed: '+e.message);});
  });
}

renderDlPanel();

function closePlayer(){playerEl.style.display='none';idleState.style.display='';}
