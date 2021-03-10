require('dotenv').config();
const express = require('express');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/confirmAccount/:token', (req, res) => {
  const token = req.params.token;
  jwt.verify(token, process.env.JWT_KEY, function (err, user) {
    if (err) return res.status(400).send('Invalid token');

    User.updateOne({ _id: user._id }, { confirmedEmail: true })
      .then(() => res.status(200).send('Email Confirmed'))
      .catch(() => res.status(500).send('Error during confirming email'));
  });
});
module.exports = router;
