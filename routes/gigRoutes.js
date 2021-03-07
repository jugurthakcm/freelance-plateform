const express = require('express');
const { addComment } = require('../controllers/commentController');
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
router.get('/explore/:category', auth, filterGigsPerCategory);
router.get('/explore', auth, exploreGigs);
router.put('/:gigId/rate', auth, rateGig);
router.post('/:gigId/comment', auth, addComment);

module.exports = router;
