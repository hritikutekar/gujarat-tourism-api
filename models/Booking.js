const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'TouristPlace', required: true },
    travelDate: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true, min: 1 },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    totalAmount: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
