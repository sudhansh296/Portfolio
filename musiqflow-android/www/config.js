// MusiqFlow — Server config
// SERVER_URL: apna Railway URL yahan daalo after deployment
(function() {
  // ⚠️ Yahan apna deployed Railway URL daalo, e.g.:
  // var DEFAULT = 'https://musiqflow-production.up.railway.app';
  var DEFAULT = 'https://musiqflow-1.onrender.com';

  // Admin panel se override allow karo
  var saved = localStorage.getItem('mf_server_url');
  window.SERVER_URL = saved || DEFAULT;

  window.apiUrl = function(path) {
    return window.SERVER_URL + path;
  };

  window.addEventListener('DOMContentLoaded', function() {
    // Settings button — sirf admin password ke baad khule
    var settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', function() {
        var pass = prompt('Admin Password:');
        if (pass === 'coder@admin123') {
          window.location.href = 'admin.html';
        } else if (pass !== null) {
          alert('Wrong password!');
        }
      });
    }

    // Silent connection test
    fetch(window.SERVER_URL + '/health', { signal: AbortSignal.timeout(5000) })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.ok && data.ytdlp) {
          showConnBar('✓ Server connected', 'ok');
        } else if (data.ok && !data.ytdlp) {
          showConnBar('⚠ Server up, yt-dlp loading...', 'err');
          // Retry after 15s
          setTimeout(function() {
            fetch(window.SERVER_URL + '/health', { signal: AbortSignal.timeout(5000) })
              .then(function(r2) { return r2.json(); })
              .then(function(d2) { if (d2.ytdlp) showConnBar('✓ Ready', 'ok'); })
              .catch(function(){});
          }, 15000);
        }
      })
      .catch(function() { showConnBar('⚠ Server offline', 'err'); });
  });

  function showConnBar(msg, type) {
    var bar = document.getElementById('connBar');
    if (!bar) return;
    bar.textContent = msg;
    bar.style.display = 'block';
    bar.className = 'conn-bar show ' + type;
    setTimeout(function() {
      bar.className = 'conn-bar';
      bar.style.display = 'none';
    }, type === 'ok' ? 2500 : 6000);
  }
})();
