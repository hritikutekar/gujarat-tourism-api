const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/auth');
const customerAuth = require('../middleware/customerAuth');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  getBookingStats,
} = require('../controllers/bookingController');

// Customer routes
router.post('/', customerAuth, createBooking);
router.get('/my', customerAuth, getMyBookings);

// Admin routes
router.get('/stats', adminAuth, getBookingStats);
router.get('/', adminAuth, getAllBookings);
router.put('/:id/status', adminAuth, updateBookingStatus);

module.exports = router;
