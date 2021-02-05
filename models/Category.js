const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
});

exports.Category = mongoose.model('category', categorySchema);
