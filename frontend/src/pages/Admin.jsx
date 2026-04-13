import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Admin() {
  const [auth, setAuth] = useState(!!localStorage.getItem('admin'));
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', techStack: '', liveLink: '', githubLink: '', category: 'Web' });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  const login = async () => {
    try {
      const res = await API.post('/api/auth/login', { password });
      if (res.data.success) {
        localStorage.setItem('admin', '1');
        localStorage.setItem('token', res.data.token);
        setAuth(true);
      }
    } catch {
      setMsg('Wrong password');
    }
  };

  const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

  const fetchProjects = () => API.get('/api/projects').then(r => setProjects(r.data));

  useEffect(() => { if (auth) fetchProjects(); }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append('image', image);
    try {
      if (editId) {
        await API.put(`/api/projects/${editId}`, fd, getAuthHeader());
        setMsg('Updated!');
      } else {
        await API.post('/api/projects', fd, getAuthHeader());
        setMsg('Added!');
      }
      setForm({ title: '', description: '', techStack: '', liveLink: '', githubLink: '', category: 'Web' });
      setImage(null); setEditId(null);
      fetchProjects();
      setTimeout(() => setMsg(''), 2000);
    } catch {
      setMsg('Error! Please login again.');
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({ title: p.title, description: p.description, techStack: p.techStack.join(','), liveLink: p.liveLink || '', githubLink: p.githubLink || '', category: p.category });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      await API.delete(`/api/projects/${id}`, getAuthHeader());
      fetchProjects();
    }
  };

  if (!auth) return (
    <div style={styles.loginWrap}>
      <div style={styles.loginBox}>
        <h2 style={{ marginBottom: '24px', color: '#6c63ff' }}>Admin Login</h2>
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} style={styles.input} />
        <button onClick={login} style={styles.btn}>Login</button>
        {msg && <p style={{ color: 'red', marginTop: '12px' }}>{msg}</p>}
      </div>
    </div>
  );

  return (
    <div style={styles.wrap}>
      <h1 style={styles.heading}>Admin Panel</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <a href="/" style={{ color: '#6c63ff' }}>← Back to site</a>
        <button onClick={() => { localStorage.removeItem('admin'); localStorage.removeItem('token'); setAuth(false); }} style={{ ...styles.btn, background: '#c0392b', padding: '8px 18px', fontSize: '0.85rem' }}>Logout</button>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={{ marginBottom: '16px' }}>{editId ? 'Edit Project' : 'Add New Project'}</h3>
        {['title', 'description', 'techStack', 'liveLink', 'githubLink'].map(field => (
          <div key={field}>
            <label style={styles.label}>{field === 'techStack' ? 'Tech Stack (comma separated)' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {field === 'description'
              ? <textarea value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={{ ...styles.input, height: '100px', resize: 'vertical' }} required={field === 'title' || field === 'description'} />
              : <input value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={styles.input} required={field === 'title'} />
            }
          </div>
        ))}
        <label style={styles.label}>Category</label>
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={styles.input}>
          {['Web', 'Mobile', 'Desktop', 'AI/ML', 'Other'].map(c => <option key={c}>{c}</option>)}
        </select>
        <label style={styles.label}>Project Image</label>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ color: '#aaa', marginBottom: '16px' }} />
        <button type="submit" style={styles.btn}>{editId ? 'Update Project' : 'Add Project'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', techStack: '', liveLink: '', githubLink: '', category: 'Web' }); }} style={{ ...styles.btn, background: '#333', marginLeft: '10px' }}>Cancel</button>}
        {msg && <p style={{ color: '#6c63ff', marginTop: '12px' }}>{msg}</p>}
      </form>

      <h3 style={{ margin: '40px 0 16px' }}>All Projects ({projects.length})</h3>
      {projects.map(p => (
        <div key={p._id} style={styles.projectRow}>
          <div>
            <strong>{p.title}</strong>
            <span style={{ color: '#666', marginLeft: '10px', fontSize: '0.85rem' }}>{p.category}</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => handleEdit(p)} style={{ ...styles.btn, padding: '6px 14px', fontSize: '0.85rem' }}>Edit</button>
            <button onClick={() => handleDelete(p._id)} style={{ ...styles.btn, background: '#c0392b', padding: '6px 14px', fontSize: '0.85rem' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  loginWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' },
  loginBox: { background: '#111', padding: '40px', borderRadius: '12px', border: '1px solid #222', textAlign: 'center', width: '320px' },
  wrap: { maxWidth: '800px', margin: '0 auto', padding: '40px 20px', background: '#0a0a0a', minHeight: '100vh' },
  heading: { fontSize: '2rem', fontWeight: 800, marginBottom: '8px' },
  form: { background: '#111', padding: '28px', borderRadius: '12px', border: '1px solid #222' },
  label: { display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '6px', textTransform: 'capitalize' },
  input: {
    width: '100%', padding: '10px 14px', background: '#1a1a1a', border: '1px solid #333',
    borderRadius: '8px', color: '#fff', fontSize: '0.95rem', marginBottom: '16px', outline: 'none'
  },
  btn: { padding: '10px 24px', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  projectRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 20px', background: '#111', borderRadius: '8px', marginBottom: '10px', border: '1px solid #222'
  }
};
