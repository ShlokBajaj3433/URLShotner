const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl } = require('../Controllers/url');

router.post('/shorten', handleGenerateNewShortUrl);

module.exports = router;

