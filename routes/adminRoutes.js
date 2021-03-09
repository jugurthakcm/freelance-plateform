const express = require('express');
const {
  loginAdmin,
  registerAdmin,
  getGigs,
  getPendingGigs,
  approveGig,
  getUsers,
} = require('../controllers/adminController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/gigs', adminMiddleware, getGigs);
router.get('/gigs/pending', adminMiddleware, getPendingGigs);
router.put('/approvegig', adminMiddleware, approveGig);
router.get('/users', adminMiddleware, getUsers);

module.exports = router;
