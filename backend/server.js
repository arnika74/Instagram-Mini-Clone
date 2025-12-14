const express = require('express');
const mongoose = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => res.send('Instagram clone API running'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
