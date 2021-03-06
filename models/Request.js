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

exports.Request = mongoose.model('requests', requestSchema);
