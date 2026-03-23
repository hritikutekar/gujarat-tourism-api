const mongoose = require('mongoose');

const touristPlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    mapLink: { type: String, default: '' },
    price: { type: Number, default: null },  // null = free / price not set
    category: {
      type: String,
      enum: ['Beach', 'Temple', 'Historical', 'Wildlife', 'Hill Station', 'Other'],
      default: 'Other',
    },
  },
  { timestamps: true }
);

touristPlaceSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('TouristPlace', touristPlaceSchema);
