const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// Public - anyone can view
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - only admin
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, liveLink, githubLink, category } = req.body;
    const project = new Project({
      title, description,
      techStack: techStack ? techStack.split(',').map(t => t.trim()) : [],
      liveLink, githubLink, category,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, liveLink, githubLink, category } = req.body;
    const update = { title, description, techStack: techStack ? techStack.split(',').map(t => t.trim()) : [], liveLink, githubLink, category };
    if (req.file) update.image = `/uploads/${req.file.filename}`;
    const project = await Project.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
