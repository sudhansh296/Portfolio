import React from 'react';

export default function About() {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.left}>
          <div style={styles.imgWrap}>
            <div style={styles.imgPlaceholder}>
              <span style={{ fontSize: '4rem' }}>👨‍💻</span>
            </div>
            <div style={styles.imgGlow} />
          </div>
        </div>
        <div style={styles.right}>
          <h2 style={styles.heading}>Who Am I?</h2>
          <p style={styles.bio}>
            Hey! I'm <span style={styles.highlight}>Sudhanshu Kumar</span>, a passionate full-stack developer
            who loves building beautiful and functional web applications.
          </p>
          <p style={styles.bio}>
            I specialize in the <span style={styles.highlight}>MERN stack</span> and enjoy turning ideas into
            real products. I'm always learning new technologies and looking for exciting freelance opportunities.
          </p>
          <div style={styles.infoGrid}>
            {[
              ['📍', 'Location', 'India'],
              ['💼', 'Available', 'Freelance'],
              ['🎓', 'Focus', 'Full Stack Dev'],
              ['⚡', 'Passion', 'Clean Code'],
            ].map(([icon, label, val]) => (
              <div key={label} style={styles.infoCard}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <div>
                  <p style={styles.infoLabel}>{label}</p>
                  <p style={styles.infoVal}>{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '100px 40px', background: '#050508' },
  inner: { maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap' },
  left: { flex: '0 0 300px', display: 'flex', justifyContent: 'center' },
  imgWrap: { position: 'relative' },
  imgPlaceholder: {
    width: '280px', height: '280px', borderRadius: '24px',
    background: 'linear-gradient(135deg, #0d0d20, #1a1a2e)',
    border: '1px solid #2a2a4a', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  imgGlow: {
    position: 'absolute', inset: '-2px', borderRadius: '26px', zIndex: -1,
    background: 'linear-gradient(135deg, #6c63ff, #a855f7)', opacity: 0.3, filter: 'blur(20px)'
  },
  right: { flex: 1, minWidth: '280px' },
  tag: { color: '#6c63ff', fontSize: '0.85rem', fontFamily: 'monospace', marginBottom: '10px' },
  heading: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '20px', letterSpacing: '-1px' },
  bio: { color: '#666', lineHeight: 1.8, marginBottom: '16px', fontSize: '1rem' },
  highlight: { color: '#a78bfa', fontWeight: 600 },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '28px' },
  infoCard: {
    display: 'flex', gap: '12px', alignItems: 'center',
    background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '10px', padding: '14px'
  },
  infoLabel: { color: '#555', fontSize: '0.75rem', marginBottom: '2px' },
  infoVal: { color: '#e0e0e0', fontWeight: 600, fontSize: '0.9rem' }
};
