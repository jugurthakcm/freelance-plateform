const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

exports.Admin = mongoose.model('admins', adminSchema);
