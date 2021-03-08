const express = require('express');
const router = express.Router();
const {
  addComment,
  editComment,
  deleteComment,
  getComments,
} = require('../controllers/commentController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/add', auth, addComment);
router.put('/edit', auth, editComment);
router.delete('/delete', auth, deleteComment);
router.get('/', getComments);

module.exports = router;
