import React, { useEffect, useState } from 'react';

const socials = [
  { name: 'GitHub', url: 'https://github.com/sudhanshu-kumar', icon: '🐙' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/sudhanshu-kumar', icon: '💼' },
  { name: 'Instagram', url: 'https://instagram.com/sudhanshu-kumar', icon: '📸' },
  { name: 'YouTube', url: 'https://youtube.com/@sudhanshu-kumar', icon: '▶️' },
];

const roles = ['Developer', 'Creator', 'Builder', 'Designer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % roles.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" style={styles.section}>
      {/* Background grid */}
      <div style={styles.grid} />
      {/* Glow orbs */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      <div style={{ ...styles.content, animation: 'fadeUp 0.8s ease forwards' }}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          Available for work
        </div>

        <h1 style={styles.name} className="gradient-text">
          Sudhanshu Kumar
        </h1>

        <div style={styles.roleWrap}>
          <span style={styles.rolePrefix}>I'm a </span>
          <span style={{ ...styles.role, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-10px)', transition: 'all 0.3s ease' }}>
            {roles[roleIndex]}
          </span>
        </div>

        <p style={styles.bio}>
          I build things for the web and beyond. Passionate about creating
          unique digital experiences and sharing my journey through projects.
        </p>

        <div style={styles.socials}>
          {socials.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={styles.socialBtn}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a2e'; e.currentTarget.style.borderColor = '#6c63ff'; e.currentTarget.style.color = '#a78bfa'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#888'; }}>
              <span>{s.icon}</span> {s.name}
            </a>
          ))}
        </div>

        <div style={styles.ctaRow}>
          <a href="#projects" style={styles.ctaPrimary}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            View Projects →
          </a>
          <a href="#contact" style={styles.ctaSecondary}
            onMouseEnter={e => { e.currentTarget.style.background = '#1a1a2e'; e.currentTarget.style.borderColor = '#6c63ff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#333'; }}>
            Contact Me
          </a>
        </div>

        <div style={styles.stats}>
          {[['Projects', '10+'], ['Experience', '2+ Yrs'], ['Technologies', '15+']].map(([label, val]) => (
            <div key={label} style={styles.stat}>
              <span style={styles.statVal}>{val}</span>
              <span style={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '120px 40px 80px',
    position: 'relative', overflow: 'hidden'
  },
  grid: {
    position: 'absolute', inset: 0, zIndex: 0,
    backgroundImage: 'linear-gradient(rgba(108,99,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.03) 1px, transparent 1px)',
    backgroundSize: '60px 60px'
  },
  orb1: {
    position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)',
    top: '10%', left: '-10%', zIndex: 0
  },
  orb2: {
    position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
    bottom: '10%', right: '-5%', zIndex: 0
  },
  content: { textAlign: 'center', zIndex: 1, maxWidth: '700px' },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '6px 16px', borderRadius: '20px',
    border: '1px solid #1a2a1a', background: 'rgba(0,255,100,0.05)',
    color: '#4ade80', fontSize: '0.8rem', fontWeight: 500, marginBottom: '24px'
  },
  badgeDot: {
    width: '7px', height: '7px', borderRadius: '50%',
    background: '#4ade80', display: 'inline-block',
    boxShadow: '0 0 8px #4ade80'
  },
  name: {
    fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900,
    marginBottom: '16px', letterSpacing: '-2px', lineHeight: 1.1
  },
  roleWrap: { fontSize: '1.4rem', marginBottom: '20px', color: '#666' },
  rolePrefix: { color: '#555' },
  role: { color: '#a78bfa', fontWeight: 700, display: 'inline-block' },
  bio: { color: '#555', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8, fontSize: '1rem' },
  socials: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' },
  socialBtn: {
    padding: '8px 18px', borderRadius: '20px', border: '1px solid #222',
    color: '#888', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
    display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
  },
  ctaRow: { display: 'flex', gap: '14px', justifyContent: 'center', marginBottom: '48px' },
  ctaPrimary: {
    padding: '13px 32px', borderRadius: '10px',
    background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
    color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem',
    transition: 'transform 0.2s', boxShadow: '0 8px 30px rgba(108,99,255,0.3)'
  },
  ctaSecondary: {
    padding: '13px 32px', borderRadius: '10px',
    border: '1px solid #333', color: '#aaa',
    textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s'
  },
  stats: { display: 'flex', gap: '40px', justifyContent: 'center', paddingTop: '32px', borderTop: '1px solid #111' },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  statVal: { fontSize: '1.6rem', fontWeight: 800, color: '#fff' },
  statLabel: { fontSize: '0.8rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }
};
