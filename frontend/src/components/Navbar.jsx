import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{ ...styles.nav, background: scrolled ? 'rgba(5,5,8,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid #1a1a2e' : '1px solid transparent' }}>
      <span style={styles.logo}>
        <span style={styles.logoDot}>S</span>udhanshu
      </span>
      <div style={styles.links}>
        {['Home', 'Projects', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={styles.link}
            onMouseEnter={e => e.target.style.color = '#a78bfa'}
            onMouseLeave={e => e.target.style.color = '#888'}>
            {item}
          </a>
        ))}
        <a href="/admin" style={styles.adminBtn}>Admin</a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed', top: 0, width: '100%', zIndex: 100,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '18px 48px',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.3s ease'
  },
  logo: { fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' },
  logoDot: {
    display: 'inline-block', background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900
  },
  links: { display: 'flex', gap: '32px', alignItems: 'center' },
  link: { color: '#888', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' },
  adminBtn: {
    padding: '7px 18px', borderRadius: '20px',
    border: '1px solid #6c63ff', color: '#a78bfa',
    textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600,
    transition: 'all 0.2s'
  }
};
