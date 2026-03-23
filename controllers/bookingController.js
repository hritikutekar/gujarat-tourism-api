const Booking = require('../models/Booking');
const TouristPlace = require('../models/TouristPlace');

// Customer: create a booking
const createBooking = async (req, res) => {
  try {
    const { placeId, travelDate, numberOfPeople, notes } = req.body;
    if (!placeId || !travelDate || !numberOfPeople) {
      return res.status(400).json({ message: 'Place, travel date and number of people are required' });
    }

    const place = await TouristPlace.findById(placeId);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    const totalAmount =
      place.price != null ? place.price * Number(numberOfPeople) : null;

    const booking = new Booking({
      customer: req.customer.id,
      place: placeId,
      travelDate,
      numberOfPeople,
      notes,
      totalAmount,
    });
    await booking.save();
    await booking.populate('place', 'name category images');

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Customer: get own bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.customer.id })
      .populate('place', 'name category images price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin: get all bookings
const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const bookings = await Booking.find(filter)
      .populate('customer', 'name email phone')
      .populate('place', 'name category images price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin: update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate('customer', 'name email phone')
      .populate('place', 'name category images price');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin: get booking stats
const getBookingStats = async (req, res) => {
  try {
    const [total, pending, confirmed, cancelled] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.countDocuments({ status: 'cancelled' }),
    ]);
    res.json({ total, pending, confirmed, cancelled });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus, getBookingStats };
