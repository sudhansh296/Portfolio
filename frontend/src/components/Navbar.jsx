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
    if (dark) document.body.classList.remove('light');
    else document.body.classList.add('light');
  }, [dark]);

  const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', backdropFilter: 'blur(20px)', transition: 'all 0.3s ease',
        background: scrolled ? (dark ? 'rgba(5,5,8,0.95)' : 'rgba(245,245,245,0.95)') : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxSizing: 'border-box'
      }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>
          <span style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900 }}>S</span>udhanshu
        </span>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {links.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ color: dark ? '#888' : '#555', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.target.style.color = '#a78bfa'}
              onMouseLeave={e => e.target.style.color = dark ? '#888' : '#555'}>
              {item}
            </a>
          ))}
          <a href="/admin" style={{ padding: '7px 16px', borderRadius: '20px', border: '1px solid #6c63ff', color: '#a78bfa', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap' }}>Admin</a>
          <button onClick={() => setDark(!dark)} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '1rem' }}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile right side */}
        <div className="nav-mobile" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => setDark(!dark)} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '1rem' }}>
            {dark ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ width: '24px', height: '2px', background: 'var(--text)', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ width: '24px', height: '2px', background: 'var(--text)', display: 'block', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ width: '24px', height: '2px', background: 'var(--text)', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 99,
          background: dark ? 'rgba(5,5,8,0.98)' : 'rgba(245,245,245,0.98)',
          backdropFilter: 'blur(20px)', padding: '20px 24px',
          borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px'
        }}>
          {links.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              {item}
            </a>
          ))}
          <a href="/admin" onClick={() => setMenuOpen(false)}
            style={{ color: '#a78bfa', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, padding: '8px 0' }}>
            Admin
          </a>
        </div>
      )}
    </>
  );
}
