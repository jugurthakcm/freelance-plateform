const mongoose = require('mongoose');

const gigSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  description: {
    type: String,
    required: true,
    min: 1,
    max: 1500,
  },
  seller: {
    id: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    name: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
  },
  category: {
    id: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    title: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
  },
  deliveryTime: {
    type: String,
    required: true,
    min: 1,
    max: 50,
    default: 'Not specified',
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
    required: true,
    default: false,
  },
  pending: {
    type: Boolean,
    default: true,
    required: true,
  },
  imageURI: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

exports.Gig = mongoose.model('gigs', gigSchema);
