const mongoose = require('mongoose');

const gigSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  sellerId: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  category: {
    type: Number,
    required: true,
    min: 1,
    max: 50,
  },
  subCategory: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

exports.Gig = mongoose.model('gigs', gigSchema);
