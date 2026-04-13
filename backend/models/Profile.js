const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  photo: { type: String, default: '' }
});

module.exports = mongoose.model('Profile', ProfileSchema);
