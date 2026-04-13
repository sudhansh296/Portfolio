import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        'service_p312t58',
        'template_05a7ig8',
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        'b6GyHFdl5nptLlEPn'
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 4000);
    } catch (err) {
      console.log(err);
      setStatus('error');
      setTimeout(() => setStatus(''), 4000);
    }
  };

  return (
    <section id="contact-form" style={styles.section}>
      <div style={styles.inner}>
        <h2 style={styles.heading}>Contact Me</h2>
        <p style={styles.sub}>Have a project? Let's talk!</p>
        <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your name" style={styles.input} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input name="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com" style={styles.input} required />
            </div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Message</label>
            <textarea name="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project..." style={{ ...styles.input, height: '140px', resize: 'vertical' }} required />
          </div>
          <button type="submit" style={styles.btn} disabled={status === 'sending'}>
            {status === 'sending' ? '⏳ Sending...' : status === 'sent' ? '✅ Message Sent!' : status === 'error' ? '❌ Failed, try again' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '100px 40px', background: 'var(--bg2)' },
  inner: { maxWidth: '700px', margin: '0 auto' },
  heading: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '10px', letterSpacing: '-1px', color: 'var(--text)' },
  sub: { color: 'var(--text3)', marginBottom: '40px' },
  form: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field: { marginBottom: '20px' },
  label: { display: 'block', color: 'var(--text3)', fontSize: '0.85rem', marginBottom: '8px' },
  input: {
    width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: '8px', color: 'var(--text)', fontSize: '0.95rem', outline: 'none',
    fontFamily: 'Inter, sans-serif', boxSizing: 'border-box'
  },
  btn: {
    width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
    color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem',
    fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'
  }
};
