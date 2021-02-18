const express = require('express');
const router = express.Router();
const {
  addGig,
  deleteGig,
  getMyGigs,
  getMyGig,
} = require('../controllers/gigController');
const { auth } = require('../middlewares/authMiddleware');

router.get('/mygigs', auth, getMyGigs);
router.post('/add', auth, addGig);
router.delete('/delete', auth, deleteGig);
router.get('/mygigs/:id', auth, getMyGig);

module.exports = router;
