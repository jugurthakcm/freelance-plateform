const express = require('express');
const router = express.Router();
const { addComment, editComment } = require('../controllers/commentController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/add', auth, addComment);
router.put('/edit', auth, editComment);
module.exports = router;
