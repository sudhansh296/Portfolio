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
                href="/downloads/musiqflow-v1.0.0.apk" 
                className="download-btn primary"
                download="MusiqFlow.apk"
                onClick={() => handleDownload('musiqflow')}
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