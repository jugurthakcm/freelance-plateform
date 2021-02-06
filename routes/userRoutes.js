const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  addBio,
} = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.put('/bio/add', auth, addBio);

module.exports = router;
