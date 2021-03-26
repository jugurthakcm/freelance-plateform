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
  loadUser,
  updateEducation,
  deleteEducation,
  updateLanguage,
  addLanguage,
  updateTitle,
  editAvatar,
} = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');
const path = require('path');
const multer = require('multer');

router.get('/user', auth, loadUser);

//Register a user
router.post('/register', register);

//Login a user
router.post('/login', login);

//Logout a user
router.post('/logout', auth, logout);

//Update a user's bio
router.put('/bio', auth, updateBio);

//Update a user's skills
router.put('/skills/update', auth, updateSkills);

//Delete a user's skill
router.delete('/skills/delete', auth, deleteSkill);

//Edit user's name
router.put('/settings/name/edit', auth, editName);

//Edit user's username
router.put('/settings/username/edit', auth, editUsername);

//Edit user's email
router.put('/settings/email/edit', auth, editEmail);

//Edit user's password
router.put('/settings/password/edit', auth, editPassword);

//Delete user's account
router.delete('/settings/account/delete', auth, deleteAccount);

router.put('/education', auth, updateEducation);

router.post('/education', auth, deleteEducation);

router.post('/language', auth, addLanguage);

router.put('/language', auth, updateLanguage);

router.put('/title', auth, updateTitle);

//Using multer to upload user avatar
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, 'AVATAR-' + req.userId + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).any();

router.post('/avatar', auth, upload, editAvatar);

module.exports = router;
