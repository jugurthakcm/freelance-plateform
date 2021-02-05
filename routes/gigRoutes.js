const express = require('express');
const router = express.Router();
const { addGig } = require('../controllers/gigController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/add', auth, addGig);

module.exports = router;
