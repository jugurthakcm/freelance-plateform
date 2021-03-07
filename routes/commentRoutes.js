const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/add', auth, addComment);
module.exports = router;
