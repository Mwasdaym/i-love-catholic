// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/songs', express.static(path.join(__dirname, 'songs')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Songs JSON API
app.get('/songs-json', (req, res) => {
  const songsDir = path.join(__dirname, 'songs');

  fs.readdir(songsDir, (err, files) => {
    if (err) {
      console.error('Error reading songs directory:', err);
      return res.status(500).json({ error: 'Failed to read songs directory' });
    }

    const songs = files
      .filter(file => file.endsWith('.mp3'))
      .map(filename => ({
        title: filename.replace(/\.[^/.]+$/, ''),
        filename,
        url: `/songs/${filename}`
      }));

    res.json(songs);
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎶 Catholic Songs API running at http://localhost:${PORT}`);
});
