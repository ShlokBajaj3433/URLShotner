const express = require('express');
const router = express.Router();
const { 
    handleGenerateNewShortUrl, 
    handleGetAllUrls, 
    handleGetUrlStats 
} = require('../Controllers/url');

router.post('/shorten', handleGenerateNewShortUrl);
router.get('/urls', handleGetAllUrls);
router.get('/stats', handleGetUrlStats);

module.exports = router;