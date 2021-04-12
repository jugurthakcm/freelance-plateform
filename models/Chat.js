const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  participant1: {
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
  participant2: {
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

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

exports.Chat = mongoose.model('chats', chatSchema);
