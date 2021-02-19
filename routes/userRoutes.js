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
  editUsername,
  editEmail,
  editPassword,
  deleteAccount,
} = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.put('/bio/update', auth, updateBio);
router.put('/skills/update', auth, updateSkills);
router.delete('/skills/delete', auth, deleteSkill);
router.put('/settings/name/edit', auth, editName);
router.put('/settings/username/edit', auth, editUsername);
router.put('/settings/email/edit', auth, editEmail);
router.put('/settings/password/edit', auth, editPassword);
router.delete('/settings/account/delete', auth, deleteAccount);

module.exports = router;
