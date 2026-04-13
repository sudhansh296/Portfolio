import React, { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'React', level: 85, icon: '⚛️' },
  { name: 'Node.js', level: 80, icon: '🟢' },
  { name: 'JavaScript', level: 90, icon: '🟡' },
  { name: 'MongoDB', level: 75, icon: '🍃' },
  { name: 'HTML/CSS', level: 92, icon: '🎨' },
  { name: 'Express.js', level: 78, icon: '🚀' },
  { name: 'Git', level: 80, icon: '🐙' },
  { name: 'Python', level: 65, icon: '🐍' },
];

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} style={styles.section}>
      <div style={styles.inner}>
        <h2 style={styles.heading}>Skills & Technologies</h2>
        <p style={styles.sub}>Tools I work with</p>
        <div style={styles.grid}>
          {skills.map((skill, i) => (
            <div key={skill.name} style={{ ...styles.card, animationDelay: `${i * 0.1}s` }}>
              <div style={styles.cardTop}>
                <span style={styles.icon}>{skill.icon}</span>
                <span style={styles.name}>{skill.name}</span>
                <span style={styles.percent}>{skill.level}%</span>
              </div>
              <div style={styles.barBg}>
                <div style={{
                  ...styles.bar,
                  width: visible ? `${skill.level}%` : '0%',
                  transition: `width 1s ease ${i * 0.1}s`
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '100px 40px', background: '#07070f' },
  inner: { maxWidth: '900px', margin: '0 auto' },
  tag: { color: '#6c63ff', fontSize: '0.85rem', fontFamily: 'monospace', marginBottom: '10px' },
  heading: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '10px', letterSpacing: '-1px' },
  sub: { color: '#555', marginBottom: '48px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' },
  card: { background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: '12px', padding: '20px' },
  cardTop: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
  icon: { fontSize: '1.2rem' },
  name: { flex: 1, fontWeight: 600, color: '#e0e0e0' },
  percent: { color: '#6c63ff', fontWeight: 700, fontSize: '0.9rem' },
  barBg: { height: '6px', background: '#1a1a2e', borderRadius: '3px', overflow: 'hidden' },
  bar: { height: '100%', background: 'linear-gradient(90deg, #6c63ff, #a855f7)', borderRadius: '3px' }
};
