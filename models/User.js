const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
  username: {
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
  confirmedEmail: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  bio: {
    type: String,
    max: 1000,
    default: '',
  },
  skills: {
    type: Array,
    default: [],
  },
  languages: {
    type: Array,
    default: [],
  },
  education: {
    type: Array,
    default: [],
  },
  location: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
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

exports.User = mongoose.model('users', userSchema);
