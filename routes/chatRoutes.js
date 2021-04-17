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
        'firstName lastName imageURI'
      );
      const participant2 = await User.findById(req.body.participant).select(
        'firstName lastName imageURI'
      );
      Chat.create({
        participant1: {
          id: req.userId,
          name: `${participant1.firstName} ${participant1.lastName}`,
          imageURI: participant1.imageURI,
        },
        participant2: {
          id: req.body.participant,
          name: `${participant2.firstName} ${participant2.lastName}`,
          imageURI: participant2.imageURI,
        },
      })
        .then((chat) => res.status(200).json({ chat }))
        .catch((error) => res.status(500).json({ error }));
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

//Get all chats of a user
router.get('/user-chats', auth, (req, res) => {
  Chat.find({
    $or: [
      {
        'participant1.id': req.userId,
      },
      {
        'participant2.id': req.userId,
      },
    ],
  })
    .sort({ lastModified: -1 })
    .then((chats) => res.status(200).json({ chats }))
    .catch((error) => res.status(500).json({ error }));
});

//Get chat by its id
router.get('/:id', auth, (req, res) => {
  Chat.findById(req.params.id)
    .then((chat) => res.status(200).json({ chat }))
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
