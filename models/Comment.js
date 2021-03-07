const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    min: 1,
  },
  senderId: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  //   receiverId: {
  //     type: String,
  //     required: true,
  //     min: 1,
  //     max: 50,
  //   },
  gigId: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

exports.Comment = mongoose.model('comments', commentSchema);
