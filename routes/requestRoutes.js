const express = require('express');
const { addRequest, editRequest } = require('../controllers/requestController');
const router = express.Router();

router.post('/add', addRequest);
router.put('/edit', editRequest);

module.exports = router;
