const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createSong, getAllSongs, getSongById } = require('../controllers/songController');

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.post('/', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), createSong);

router.get('/', getAllSongs);
router.get('/:id', getSongById);

module.exports = router;
