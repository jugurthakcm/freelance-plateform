const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  updateBio,
  updateSkills,
} = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.put('/bio/update', auth, updateBio);
router.put('/skills/update', auth, updateSkills);

module.exports = router;
