const express = require('express');
const router = express.Router();
const { uploadImages } = require('../controllers/uploadController');

// POST /api/upload
router.post('/', uploadImages);

module.exports = router;
