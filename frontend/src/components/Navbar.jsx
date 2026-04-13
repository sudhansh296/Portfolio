import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.background = dark ? '#050508' : '#f5f5f5';
    document.body.style.color = dark ? '#fff' : '#111';
  }, [dark]);

  const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <nav style={{ ...styles.nav, background: scrolled ? (dark ? 'rgba(5,5,8,0.95)' : 'rgba(245,245,245,0.95)') : 'transparent', borderBottom: scrolled ? '1px solid #1a1a2e' : '1px solid transparent' }}>
      <span style={styles.logo}>
        <span style={styles.logoPurple}>S</span>udhanshu
      </span>
      <div style={{ ...styles.links, display: menuOpen ? 'flex' : undefined }}>
        {links.map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
            style={{ ...styles.link, color: dark ? '#888' : '#555' }}
            onMouseEnter={e => e.target.style.color = '#a78bfa'}
            onMouseLeave={e => e.target.style.color = dark ? '#888' : '#555'}>
            {item}
          </a>
        ))}
        <a href="/admin" style={styles.adminBtn}>Admin</a>
        <button onClick={() => setDark(!dark)} style={styles.themeBtn}>
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed', top: 0, width: '100%', zIndex: 100,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '18px 48px', backdropFilter: 'blur(20px)', transition: 'all 0.3s ease'
  },
  logo: { fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' },
  logoPurple: {
    display: 'inline-block', background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900
  },
  links: { display: 'flex', gap: '28px', alignItems: 'center' },
  link: { textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' },
  adminBtn: {
    padding: '7px 18px', borderRadius: '20px', border: '1px solid #6c63ff',
    color: '#a78bfa', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600
  },
  themeBtn: {
    background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '8px',
    padding: '6px 10px', cursor: 'pointer', fontSize: '1rem'
  }
};
