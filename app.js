const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const songRoutes = require('./routes/songs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // serve audio/video files
app.use('/api/songs', songRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

module.exports = app;
