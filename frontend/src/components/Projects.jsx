import React, { useEffect, useState } from 'react';
import API from '../api';

const CATEGORIES = ['All', 'Web', 'Mobile', 'Telegram Bots', 'AI/ML', 'Other'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always show MusiqFlow apps (don't depend on API)
    const musiqFlowProject = {
      _id: 'musiqflow-main',
      title: 'MusiqFlow',
      description: 'Advanced music streaming platform with real-time lyrics, high-quality audio, and smart recommendations. Cross-platform PWA with YouTube integration.',
      techStack: ['Capacitor', 'JavaScript', 'Node.js', 'YouTube API', 'PWA'],
      image: '/images/musiqflow-main-home.jpg',
      liveLink: '/mobile-apps',
      githubLink: 'https://github.com/sudhansh296/Portfolio',
      category: 'Mobile',
      createdAt: new Date()
    };
    
    const musiqFlowLiteProject = {
      _id: 'musiqflow-lite',
      title: 'MusiqFlow Lite',
      description: 'Native Android music player built with Kotlin and Jetpack Compose. Features Material Design 3, background service, and notification controls.',
      techStack: ['Kotlin', 'Jetpack Compose', 'Media3', 'MVVM', 'Coroutines'],
      image: '/images/musiqflow-lite-home.jpg',
      liveLink: '/mobile-apps',
      githubLink: 'https://github.com/sudhansh296/musiqflow-lite',
      category: 'Mobile',
      createdAt: new Date()
    };

    const ytBoosterProject = {
      _id: 'yt-booster',
      title: 'YT Booster',
      description: 'YouTube Subscriber Exchange & Social Platform. Real-time chat, voice/video calls, group voice chat, AI companion, daily tasks, leaderboard & referral system.',
      techStack: ['Kotlin', 'Jetpack Compose', 'Node.js', 'Socket.IO', 'WebRTC', 'MongoDB', 'Firebase FCM'],
      image: null,
      liveLink: 'https://api.picrypto.in/download/YT-Booster.apk',
      githubLink: 'https://github.com/sudhansh296/yt-sub-exchange',
      category: 'Mobile',
      createdAt: new Date()
    };

    API.get('/api/projects')
      .then(res => {
        const apiProjects = res.data || [];
        
        // Filter out any existing MusiqFlow/YT Booster projects from API
        const filteredProjects = apiProjects.filter(p => 
          p.title !== 'MusiqFlow' && p.title !== 'MusiqFlow Lite' && p.title !== 'YT Booster'
        );
        
        // Always add our projects at the beginning
        const allProjects = [ytBoosterProject, musiqFlowProject, musiqFlowLiteProject, ...filteredProjects];
        setProjects(allProjects);
      })
      .catch(() => {
        setProjects([ytBoosterProject, musiqFlowProject, musiqFlowLiteProject]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (project) => {
    if (project._id === 'yt-booster') {
      window.open('https://api.picrypto.in/download/YT-Booster.apk', '_blank');
    } else if (project._id === 'musiqflow-main' || project._id === 'musiqflow-lite') {
      window.location.href = '/mobile-apps';
    } else {
      setSelected(project);
    }
  };

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" style={styles.section}>
      <div style={styles.inner}>
        <p style={styles.sub}>Things I've built and shipped</p>

        {/* Filter tabs */}
        <div style={styles.filters}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ ...styles.filterBtn, ...(filter === cat ? styles.filterActive : {}) }}>
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: '3rem' }}>🚀</p>
            <p style={{ color: '#444', marginTop: '12px' }}>No projects yet. Add from admin panel.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((p, i) => (
              <div key={p._id} className="card-hover" style={{ ...styles.card, animationDelay: `${i * 0.1}s` }}
                onClick={() => handleCardClick(p)}>
                <div style={styles.cardImgWrap}>
                  {p.image
                    ? <img src={p.image} alt={p.title} style={styles.img} />
                    : <div style={styles.imgPlaceholder}>
                        <span style={{ fontSize: '2.5rem' }}>
                          {p.category === 'Telegram Bots' ? '🤖' : '🖥️'}
                        </span>
                      </div>
                  }
                  <div style={styles.cardOverlay}>
                    <span style={styles.viewBtn}>
                      {p._id === 'yt-booster' ? 'Download APK →' : (p._id === 'musiqflow-main' || p._id === 'musiqflow-lite') ? 'View Apps →' : 'View Details →'}
                    </span>
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.cardTop}>
                    <span style={styles.category}>{p.category}</span>
                    <div style={styles.cardLinks}>
                      {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={styles.iconLink}>🐙</a>}
                      {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={styles.iconLink}>🌐</a>}
                    </div>
                  </div>
                  <h3 style={styles.title}>{p.title}</h3>
                  <p style={styles.desc}>{p.description.slice(0, 90)}{p.description.length > 90 ? '...' : ''}</p>
                  <div style={styles.tags}>
                    {p.techStack.slice(0, 4).map(t => <span key={t} style={styles.tag}>{t}</span>)}
                    {p.techStack.length > 4 && <span style={styles.tag}>+{p.techStack.length - 4}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div style={styles.overlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={styles.close}>✕</button>
            {selected.image
              ? <img src={selected.image} alt={selected.title} style={styles.modalImg} />
              : <div style={{ ...styles.imgPlaceholder, height: '200px', borderRadius: '12px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '3rem' }}>
                    {selected.category === 'Telegram Bots' ? '🤖' : '🖥️'}
                  </span>
                </div>
            }
            <span style={styles.category}>{selected.category}</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '10px 0 14px' }}>{selected.title}</h2>
            <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '20px' }}>{selected.description}</p>
            <div style={styles.tags}>
              {selected.techStack.map(t => <span key={t} style={styles.tag}>{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {selected.liveLink && (
                <a href={selected.liveLink} target="_blank" rel="noreferrer" style={styles.modalBtn}>
                  🌐 Live Demo
                </a>
              )}
              {selected.githubLink && (
                <a href={selected.githubLink} target="_blank" rel="noreferrer" style={{ ...styles.modalBtn, background: '#1a1a1a', border: '1px solid #333' }}>
                  🐙 GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: { padding: '100px 40px', background: 'var(--bg)' },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  sectionTag: { color: '#6c63ff', fontSize: '0.85rem', fontFamily: 'monospace', marginBottom: '10px' },
  heading: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '10px', letterSpacing: '-1px', color: 'var(--text)' },
  sub: { color: 'var(--text3)', marginBottom: '40px', fontSize: '1rem' },
  filters: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' },
  filterBtn: {
    padding: '8px 20px', borderRadius: '20px', border: '1px solid var(--border)',
    background: 'transparent', color: 'var(--text3)', cursor: 'pointer', fontSize: '0.85rem',
    fontWeight: 500, transition: 'all 0.2s', fontFamily: 'Inter, sans-serif'
  },
  filterActive: { background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: '#fff', border: '1px solid transparent' },
  empty: { textAlign: 'center', padding: '80px 0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  card: {
    background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px',
    overflow: 'hidden', cursor: 'pointer'
  },
  cardImgWrap: { position: 'relative', overflow: 'hidden' },
  img: { width: '100%', height: '200px', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' },
  imgPlaceholder: {
    height: '200px', background: 'linear-gradient(135deg, #0d0d20, #1a1a2e)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  cardOverlay: {
    position: 'absolute', inset: 0, background: 'rgba(108,99,255,0.85)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: 0, transition: 'opacity 0.3s'
  },
  viewBtn: { color: '#fff', fontWeight: 700, fontSize: '1rem' },
  cardBody: { padding: '20px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  category: {
    fontSize: '0.72rem', color: '#a78bfa', textTransform: 'uppercase',
    letterSpacing: '1.5px', fontWeight: 600
  },
  cardLinks: { display: 'flex', gap: '8px' },
  iconLink: { fontSize: '1rem', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' },
  title: { fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text)' },
  desc: { color: 'var(--text3)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '14px' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  tag: {
    background: 'rgba(108,99,255,0.1)', color: '#a78bfa',
    padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem',
    border: '1px solid rgba(108,99,255,0.2)'
  },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 999, padding: '20px', backdropFilter: 'blur(8px)'
  },
  modal: {
    background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '20px',
    padding: '32px', maxWidth: '620px', width: '100%',
    position: 'relative', maxHeight: '90vh', overflowY: 'auto'
  },
  modalImg: { width: '100%', borderRadius: '12px', marginBottom: '20px', maxHeight: '260px', objectFit: 'cover' },
  modalBtn: {
    padding: '11px 24px', borderRadius: '10px',
    background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
    color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600
  },
  close: {
    position: 'absolute', top: '16px', right: '16px',
    background: '#1a1a2e', border: 'none', color: '#888',
    width: '32px', height: '32px', borderRadius: '50%',
    cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
  }
};
