const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 50,
    min: 1,
  },
  description: {
    type: String,
    required: true,
    max: 500,
  },
  userId: {
    type: String,
    required: true,
    max: 50,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

exports.User = mongoose.model('requests', requestSchema);
