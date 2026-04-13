import React, { useEffect, useState, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { TypeAnimation } from 'react-type-animation';

const socials = [
  { name: 'GitHub', url: 'https://github.com/sudhansh296', icon: '🐙' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sudhanshu-kumar-867918257', icon: '💼' },
  { name: 'Instagram', url: 'https://www.instagram.com/coder_lobby', icon: '📸' },
  { name: 'YouTube', url: 'https://youtube.com/@coder_lobby', icon: '▶️' },
  { name: 'Telegram', url: 'https://t.me/coding_python_programming', icon: '✈️' },
];

export default function Hero() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section id="home" style={styles.section}>
      <Particles id="tsparticles" init={particlesInit} options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          color: { value: '#6c63ff' },
          links: { color: '#6c63ff', distance: 150, enable: true, opacity: 0.15, width: 1 },
          move: { enable: true, speed: 0.8 },
          number: { density: { enable: true, area: 800 }, value: 60 },
          opacity: { value: 0.2 },
          size: { value: { min: 1, max: 3 } }
        }
      }} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <div style={styles.grid} />
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      <div style={{ ...styles.content, animation: 'fadeUp 0.8s ease forwards' }}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          Available for freelance work
        </div>

        <h1 style={styles.name}>Sudhanshu Kumar</h1>

        <div style={styles.typeWrap}>
          <span style={{ color: '#555' }}>I'm a </span>
          <TypeAnimation
            sequence={['Developer', 2000, 'Creator', 2000, 'Builder', 2000, 'Freelancer', 2000]}
            wrapper="span" speed={50} repeat={Infinity}
            style={{ color: '#a78bfa', fontWeight: 700 }}
          />
        </div>

        <p style={styles.bio}>
          I build things for the web and beyond. Passionate about creating
          unique digital experiences and delivering quality freelance projects.
        </p>

        <div style={styles.socials}>
          {socials.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={styles.socialBtn}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a2e'; e.currentTarget.style.borderColor = '#6c63ff'; e.currentTarget.style.color = '#a78bfa'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#888'; }}>
              {s.icon} {s.name}
            </a>
          ))}
        </div>

        <div style={styles.ctaRow}>
          <a href="#projects" style={styles.ctaPrimary}>View Projects →</a>
          <a href="#contact-form" style={styles.ctaSecondary}>Hire Me</a>
        </div>

        <div style={styles.stats}>
          {[['10+', 'Projects'], ['2+ Yrs', 'Experience'], ['15+', 'Technologies']].map(([val, label]) => (
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
    background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80'
  },
  name: {
    fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900,
    marginBottom: '16px', letterSpacing: '-2px', lineHeight: 1.1,
    background: 'linear-gradient(135deg, #fff 0%, #a78bfa 50%, #6c63ff 100%)',
    backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    animation: 'shimmer 3s linear infinite'
  },
  typeWrap: { fontSize: '1.4rem', marginBottom: '20px' },
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
    boxShadow: '0 8px 30px rgba(108,99,255,0.3)', transition: 'transform 0.2s'
  },
  ctaSecondary: {
    padding: '13px 32px', borderRadius: '10px', border: '1px solid #333',
    color: '#aaa', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s'
  },
  stats: { display: 'flex', gap: '40px', justifyContent: 'center', paddingTop: '32px', borderTop: '1px solid #111' },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  statVal: { fontSize: '1.6rem', fontWeight: 800, color: '#fff' },
  statLabel: { fontSize: '0.8rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }
};
