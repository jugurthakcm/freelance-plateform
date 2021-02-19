const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  updateBio,
  updateSkills,
  deleteSkill,
  editName,
} = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.put('/bio/update', auth, updateBio);
router.put('/skills/update', auth, updateSkills);
router.delete('/skills/delete', auth, deleteSkill);
router.put('/settings/editname', auth, editName);

module.exports = router;
