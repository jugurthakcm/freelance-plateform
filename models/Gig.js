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
    type: String,
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
    min: 0,
    max: 5,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

exports.Gig = mongoose.model('gigs', gigSchema);
