const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  updateBio,
  updateSkills,
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
  updateExperience,
  deleteExperience,
  getUser,
} = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');
const { uploadAvatarUtil } = require('../util');

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

router.put('/education/update', auth, updateEducation);

router.post('/education/delete', auth, deleteEducation);

router.put('/experience/update', auth, updateExperience);

router.post('/experience/delete', auth, deleteExperience);

router.post('/language', auth, addLanguage);

router.put('/language', auth, updateLanguage);

router.put('/title', auth, updateTitle);

router.post('/avatar', auth, uploadAvatarUtil(), editAvatar);

router.get('/user/:id', getUser);

module.exports = router;
