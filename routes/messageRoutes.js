const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const { Message } = require('../models/Message');

router.get('/:chatId', auth, (req, res) => {
  const chatId = req.params.chatId;
  Message.find({ chatId })
    .sort({ createdAt: 1 })
    .then((messages) => res.status(200).json({ messages }))
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
