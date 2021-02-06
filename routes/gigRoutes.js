const express = require('express');
const router = express.Router();
const { addGig, deleteGig } = require('../controllers/gigController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/add', auth, addGig);
router.delete('/delete', auth, deleteGig);

module.exports = router;
