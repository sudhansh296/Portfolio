const express = require('express');
const router = express.Router();
const multer = require('multer');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/auth');
const { storage } = require('../cloudinary');

const upload = multer({ storage });

// Get profile photo
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = { photo: '' };
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile photo
router.post('/photo', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    profile.photo = req.file ? req.file.path : profile.photo;
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
