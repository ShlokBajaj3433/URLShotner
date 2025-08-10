const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    try {
        const shortID = nanoid(8); 
        const body = req.body;
        if (!body.url) return res.status(400).json({ error: 'url is required' });

        await URL.create({
            shortId: shortID, 
            redirectUrl: body.url,
            visitHistory: []
        });

        return res.status(201).json({ Id: shortID });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { handleGenerateNewShortUrl };