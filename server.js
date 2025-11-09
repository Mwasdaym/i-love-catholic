const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Root route
app.get('/', (req, res) => {
  res.send('🎶 Catholic Songs API is live');
});

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  res.send({ message: 'File uploaded successfully', filename: req.file.filename });
});

// Upload form route
app.get('/upload-form', (req, res) => {
  res.send(`
    <h2>Upload Catholic Song</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
