const express = require('express');
const router = express.Router();
const {
  addGig,
  deleteGig,
  getMyGigs,
  getMyGig,
  editMyGig,
  exploreGigs,
  filterGigsPerCategory,
  rateGig,
} = require('../controllers/gigController');
const { auth } = require('../middlewares/authMiddleware');

router.get('/mygigs', auth, getMyGigs);
router.post('/add', auth, addGig);
router.delete('/delete', auth, deleteGig);
router.get('/mygigs/:id', auth, getMyGig);
router.put('/mygigs/:id/edit', auth, editMyGig);
router.get('/explore/:category', filterGigsPerCategory);
router.get('/explore', exploreGigs);
router.post('/:gigId/rate', auth, rateGig);

module.exports = router;
