const TouristPlace = require('../models/TouristPlace');

const getAll = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }

    const places = await TouristPlace.find(filter).sort({ createdAt: -1 });
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const place = await TouristPlace.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const place = new TouristPlace(req.body);
    await place.save();
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ message: 'Validation error', error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const place = await TouristPlace.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(400).json({ message: 'Validation error', error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const place = await TouristPlace.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json({ message: 'Place deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
