const express = require('express');
const {
  loginAdmin,
  registerAdmin,
  getGigs,
  getPendingGigs,
  approveGig,
  getUsers,
  deleteGig,
  deleteUser,
} = require('../controllers/adminController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/gigs', adminMiddleware, getGigs);
router.get('/gigs/pending', adminMiddleware, getPendingGigs);
router.put('/gigs/approve', adminMiddleware, approveGig);
router.delete('/gigs/delete', adminMiddleware, deleteGig);
router.get('/users', adminMiddleware, getUsers);
router.delete('/users/delete', adminMiddleware, deleteUser);

module.exports = router;
