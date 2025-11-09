const Song = require('../models/Song');

exports.createSong = async (req, res) => {
  try {
    const { title, composer, language, category, season, lyrics, tags } = req.body;
    const audio = req.files?.audio?.[0]?.filename;
    const video = req.files?.video?.[0]?.filename;

    const newSong = new Song({
      title,
      composer,
      language,
      category,
      season,
      lyrics,
      tags: tags?.split(','),
      audioUrl: audio ? `/uploads/${audio}` : null,
      videoUrl: video ? `/uploads/${video}` : null
    });

    await newSong.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
