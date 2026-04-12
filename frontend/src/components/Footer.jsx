import React from 'react';

const socials = [
  { name: 'GitHub', url: 'https://github.com/sudhanshu-kumar', icon: '🐙' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/sudhanshu-kumar', icon: '💼' },
  { name: 'Instagram', url: 'https://instagram.com/sudhanshu-kumar', icon: '📸' },
  { name: 'YouTube', url: 'https://youtube.com/@sudhanshu-kumar', icon: '▶️' },
];

export default function Footer() {
  return (
    <footer id="contact" style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.cta}>
          <p style={styles.ctaTag}>// let's connect</p>
          <h2 style={styles.ctaHeading}>Have a project in mind?</h2>
          <p style={styles.ctaSub}>I'm always open to discussing new projects and opportunities.</p>
          <a href="mailto:sudhanshu@email.com" style={styles.emailBtn}>Say Hello 👋</a>
        </div>

        <div style={styles.divider} />

        <div style={styles.bottom}>
          <span style={styles.logo}>Sudhanshu Kumar</span>
          <div style={styles.socials}>
            {socials.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={styles.socialLink}
                onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                onMouseLeave={e => e.currentTarget.style.color = '#444'}>
                {s.icon}
              </a>
            ))}
          </div>
          <p style={styles.copy}>© {new Date().getFullYear()} · Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: { background: '#050508', borderTop: '1px solid #0f0f1a', padding: '80px 40px 40px' },
  inner: { maxWidth: '800px', margin: '0 auto', textAlign: 'center' },
  cta: { marginBottom: '60px' },
  ctaTag: { color: '#6c63ff', fontSize: '0.85rem', fontFamily: 'monospace', marginBottom: '12px' },
  ctaHeading: { fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '12px', letterSpacing: '-1px' },
  ctaSub: { color: '#555', marginBottom: '28px', fontSize: '1rem' },
  emailBtn: {
    display: 'inline-block', padding: '14px 36px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
    color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
    boxShadow: '0 8px 30px rgba(108,99,255,0.3)', transition: 'transform 0.2s'
  },
  divider: { height: '1px', background: '#0f0f1a', marginBottom: '32px' },
  bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
  logo: { fontWeight: 800, color: '#333', fontSize: '1rem' },
  socials: { display: 'flex', gap: '16px' },
  socialLink: { fontSize: '1.3rem', textDecoration: 'none', color: '#444', transition: 'color 0.2s' },
  copy: { color: '#333', fontSize: '0.85rem' }
};
