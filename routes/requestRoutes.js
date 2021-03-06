const express = require('express');
const { addRequest } = require('../controllers/requestController');
const router = express.Router();

router.post('/add', addRequest);

module.exports = router;
