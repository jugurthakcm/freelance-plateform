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
  editGigImage,
} = require('../controllers/gigController');
const { auth } = require('../middlewares/authMiddleware');
const { uploadGigsImagesUtil } = require('../util');

router.get('/mygigs', auth, getMyGigs);

router.get('/mygigs/pending', auth, getMyPendingGigs);

router.post('/add', auth, addGig);

router.post('/delete', auth, deleteGig);

router.get('/explore/:category', auth, filterGigsPerCategory);

router.get('/explore', auth, exploreGigs);

router.get('/:id', getGig);

router.put('/:id/edit', auth, editMyGig);

router.put('/:id/rate', auth, rateGig);

router.put('/:id/image', auth, uploadGigsImagesUtil(), editGigImage);

module.exports = router;
