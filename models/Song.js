const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  composer: String,
  language: String,
  category: String,
  season: String,
  lyrics: String,
  audioUrl: String, // path to audio file
  videoUrl: String, // path to video file or YouTube link
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
