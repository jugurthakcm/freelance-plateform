const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    min: 1,
  },
  sender: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  receiver: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  chatId: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

exports.Message = mongoose.model('messages', messageSchema);
