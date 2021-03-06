const express = require('express');
const {
  addRequest,
  editRequest,
  deleteRequest,
  getUserRequests,
} = require('../controllers/requestController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', auth, addRequest);
router.put('/edit', auth, editRequest);
router.delete('/delete', auth, deleteRequest);
router.get('/', auth, getUserRequests);

module.exports = router;
