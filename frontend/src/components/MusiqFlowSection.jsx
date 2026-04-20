import React, { useState, useEffect } from 'react';
import './MusiqFlowSection.css';

const MusiqFlowSection = () => {
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    // Simulate download count (you can connect to real analytics later)
    setDownloadCount(Math.floor(Math.random() * 500) + 100);
  }, []);

  const shareApp = (appName) => {
    const shareData = {
      'musiqflow': {
        title: 'MusiqFlow - Advanced Music Streaming Platform',
        text: 'Check out MusiqFlow, an amazing music streaming app with real-time lyrics and high-quality audio! 🎵',
        url: window.location.href
      },
      'musiqflow-lite': {
        title: 'MusiqFlow Lite - Native Android Music Player',
        text: 'Experience MusiqFlow Lite, a native Android music player built with Kotlin and Jetpack Compose! 🎵',
        url: window.location.href
      },
      'yt-booster': {
        title: 'YT Booster - YouTube Subscriber Exchange & Social Platform',
        text: 'Grow your YouTube channel organically with YT Booster! Real subscriber exchange, chat, voice calls & more 🚀',
        url: 'https://api.picrypto.in/download/YT-Booster.apk'
      }
    };

    const data = shareData[appName] || shareData['musiqflow'];
    
    if (navigator.share) {
      navigator.share(data);
    } else {
      navigator.clipboard.writeText(`${data.title}\n${data.text}\n${data.url}`);
      alert('Link copied to clipboard! 📋');
    }
  };

  const handleDownload = (appName) => {
    // Track download (you can add analytics here)
    console.log(`${appName} Download started`);
  };

  return (
    <section className="musiqflow-section" id="mobile-apps">
      <div className="container">
        <div className="section-header">
          <h2>📱 Mobile Applications</h2>
          <p className="section-subtitle">Cross-platform mobile apps built with modern technologies</p>
        </div>
        
        <div className="apps-grid">
          {/* YT Booster - Full Width at Top */}
          <div className="app-card" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(255,0,0,0.05), rgba(204,0,0,0.02))', border: '1px solid rgba(255,0,0,0.2)' }}>
            <div className="app-header">
              <div className="app-icon" style={{ background: 'linear-gradient(135deg, #ff0000, #cc0000)' }}>
                <span>🚀</span>
              </div>
              <div className="app-info">
                <h3>YT Booster</h3>
                <p>YouTube Subscriber Exchange &amp; Social Platform</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div className="app-preview" style={{ flex: '0 0 auto' }}>
                <div className="phone-mockup">
                  <div className="phone-frame">
                    <div className="phone-screen" style={{ background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '48px' }}>🚀</span>
                      <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>YT Booster</span>
                      <span style={{ color: '#888', fontSize: '10px' }}>Grow Your Channel</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: '280px' }}>
                <div className="app-description">
                  <h4>✨ Features</h4>
                  <ul className="features-list" style={{ columns: 2, columnGap: '20px' }}>
                    <li>📈 Subscriber Exchange System</li>
                    <li>💬 Real-time Chat &amp; Groups</li>
                    <li>📞 Voice &amp; Video Calls</li>
                    <li>🎙️ Group Voice Chat</li>
                    <li>🤖 AI Companion (Gemini)</li>
                    <li>🎮 Daily Tasks &amp; Rewards</li>
                    <li>🏆 Leaderboard System</li>
                    <li>🔔 Push Notifications</li>
                    <li>👥 Referral Program</li>
                    <li>🎵 Music Integration</li>
                  </ul>
                  <div className="tech-stack" style={{ marginTop: '16px' }}>
                    <h5>🛠️ Tech Stack</h5>
                    <div className="tech-tags">
                      <span className="tech-tag">Kotlin</span>
                      <span className="tech-tag">Jetpack Compose</span>
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">Socket.IO</span>
                      <span className="tech-tag">WebRTC</span>
                      <span className="tech-tag">MongoDB</span>
                      <span className="tech-tag">Firebase FCM</span>
                      <span className="tech-tag">React.js</span>
                    </div>
                  </div>
                </div>
                <div className="app-actions" style={{ marginTop: '20px' }}>
                  <a
                    href="https://api.picrypto.in/download/YT-Booster.apk"
                    className="download-btn primary"
                    download="YT-Booster.apk"
                    onClick={() => handleDownload('yt-booster')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: 'linear-gradient(135deg, #ff0000, #cc0000)' }}
                  >
                    📱 Download APK
                  </a>
                  <button className="share-btn secondary" onClick={() => shareApp('yt-booster')}>
                    🔗 Share
                  </button>
                  <a href="https://github.com/sudhansh296/yt-sub-exchange" className="github-btn" target="_blank" rel="noopener noreferrer">
                    📂 View Code
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MusiqFlow (Left Side) */}
          <div className="app-card musiqflow">
            <div className="app-header">
              <div className="app-icon">
                <span>🎵</span>
              </div>
              <div className="app-info">
                <h3>MusiqFlow</h3>
                <p>Advanced Music Streaming Platform</p>
              </div>
            </div>

            <div className="app-preview">
              <div className="phone-mockup">
                <div className="phone-frame">
                  <div className="phone-screen">
                    <img 
                      src="/images/musiqflow-main-home.jpg" 
                      alt="MusiqFlow Home Screen" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '15px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="app-description">
              <h4>✨ Features</h4>
              <ul className="features-list">
                <li>🎵 High-quality music streaming</li>
                <li>📝 Real-time synced lyrics</li>
                <li>🔄 Background playback</li>
                <li>📱 Cross-platform support</li>
                <li>🎯 Smart recommendations</li>
              </ul>

              <div className="tech-stack">
                <h5>🛠️ Tech Stack</h5>
                <div className="tech-tags">
                  <span className="tech-tag">Capacitor</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">YouTube API</span>
                </div>
              </div>
            </div>

            <div className="app-actions">
              <a 
                href="https://github.com/sudhansh296/Portfolio/releases/download/v1.0.0/musiqflow-v1.0.0.apk" 
                className="download-btn primary"
                download="MusiqFlow.apk"
                onClick={() => handleDownload('musiqflow')}
                target="_blank"
                rel="noopener noreferrer"
              >
                📱 Download APK
              </a>
              <button className="share-btn secondary" onClick={() => shareApp('musiqflow')}>
                🔗 Share
              </button>
              <a href="https://github.com/sudhansh296/Portfolio" className="github-btn" target="_blank" rel="noopener noreferrer">
                📂 View Code
              </a>
            </div>
          </div>

          {/* MusiqFlow Lite (Right Side) */}
          <div className="app-card musiqflow-lite">
            <div className="app-header">
              <div className="app-icon lite">
                <span>🎧</span>
              </div>
              <div className="app-info">
                <h3>MusiqFlow Lite</h3>
                <p>Native Android Music Player</p>
              </div>
            </div>

            <div className="app-preview">
              <div className="phone-mockup">
                <div className="phone-frame">
                  <div className="phone-screen">
                    <img 
                      src="/images/musiqflow-lite-home.jpg" 
                      alt="MusiqFlow Lite Home Screen" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '15px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="app-description">
              <h4>✨ Features</h4>
              <ul className="features-list">
                <li>⚡ Native Android performance</li>
                <li>🎨 Material Design 3</li>
                <li>🔔 Notification controls</li>
                <li>🔋 Optimized battery usage</li>
                <li>🎵 Background service</li>
              </ul>

              <div className="tech-stack">
                <h5>🛠️ Tech Stack</h5>
                <div className="tech-tags">
                  <span className="tech-tag">Kotlin</span>
                  <span className="tech-tag">Jetpack Compose</span>
                  <span className="tech-tag">Media3</span>
                  <span className="tech-tag">MVVM</span>
                </div>
              </div>
            </div>

            <div className="app-actions">
              <a 
                href="/downloads/musiqflow-lite-v1.0.1.apk" 
                className="download-btn primary"
                download="MusiqFlow-Lite.apk"
                onClick={() => handleDownload('musiqflow-lite')}
              >
                📱 Download APK
              </a>
              <button className="share-btn secondary" onClick={() => shareApp('musiqflow-lite')}>
                🔗 Share
              </button>
              <a href="https://github.com/sudhansh296/musiqflow-lite" className="github-btn" target="_blank" rel="noopener noreferrer">
                📂 View Code
              </a>
            </div>
          </div>
        </div>

        <div className="app-stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Downloads</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
        </div>

        <div className="app-footer">
          <p className="disclaimer">
            ⚠️ <strong>Note:</strong> These apps are for educational purposes. 
            Enable "Install from Unknown Sources" in Android settings to install APK files.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MusiqFlowSection;