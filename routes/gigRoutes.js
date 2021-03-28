const express = require('express');
const { addComment } = require('../controllers/commentController');
const router = express.Router();
const {
  addGig,
  deleteGig,
  getMyGigs,
  getGig,
  editMyGig,
  exploreGigs,
  filterGigsPerCategory,
  rateGig,
  getMyPendingGigs,
} = require('../controllers/gigController');
const { auth } = require('../middlewares/authMiddleware');

router.get('/mygigs', auth, getMyGigs);

router.get('/mygigs/pending', auth, getMyPendingGigs);

router.post('/add', auth, addGig);

router.post('/delete', auth, deleteGig);

router.get('/:id', getGig);

router.put('/:id/edit', auth, editMyGig);

router.get('/explore/:category', auth, filterGigsPerCategory);

router.get('/explore', auth, exploreGigs);

router.put('/:id/rate', auth, rateGig);

module.exports = router;
