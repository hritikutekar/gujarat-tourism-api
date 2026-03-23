const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const placesRoutes = require('./routes/places');
const uploadRoutes = require('./routes/upload');
const customerAuthRoutes = require('./routes/customerAuth');
const bookingsRoutes = require('./routes/bookings');
const { seedAdmin } = require('./controllers/authController');

const app = express();

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/customer/auth', customerAuthRoutes);
app.use('/api/bookings', bookingsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedAdmin();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
