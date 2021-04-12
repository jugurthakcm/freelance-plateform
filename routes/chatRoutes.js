const express = require('express');

const { auth } = require('../middlewares/authMiddleware');
const { Chat } = require('../models/Chat');
const { User } = require('../models/User');
const router = express.Router();

router.post('/create', auth, async (req, res) => {
  try {
    const chatExists = await Chat.findOne({
      $or: [
        {
          'participant1.id': req.userId,
          'participant2.id': req.body.participant,
        },
        {
          'participant1.id': req.body.participant,
          'participant2.id': req.userId,
        },
      ],
    });

    if (chatExists) {
      res.status(200).json({ chat: chatExists });
    } else {
      const participant1 = await User.findById(req.userId).select(
        'firstName lastName'
      );
      const participant2 = await User.findById(req.body.participant).select(
        'firstName lastName'
      );

      Chat.create({
        participant1: {
          id: req.userId,
          name: `${participant1.firstName} ${participant1.lastName}`,
        },
        participant2: {
          id: req.body.participant,
          name: `${participant2.firstName} ${participant2.lastName}`,
        },
      })
        .then((chat) => res.status(200).json({ chat }))
        .catch((error) => res.status(500).json({ error }));
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:id', auth, (req, res) => {
  Chat.findById(req.params.id)
    .then((chat) => res.status(200).json({ chat }))
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
