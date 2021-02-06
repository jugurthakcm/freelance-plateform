const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);

module.exports = router;
