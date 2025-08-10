const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    try {
        const shortID = nanoid(8); 
        const body = req.body;
        if (!body.url) return res.status(400).json({ error: 'url is required' });

        const newUrl = await URL.create({
            shortId: shortID, 
            redirectUrl: body.url,
            visitHistory: []
        });

        return res.status(201).json({ 
            Id: shortID,
            originalUrl: body.url,
            shortUrl: shortID,
            clicks: 0,
            createdAt: newUrl._id.getTimestamp()
        });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetAllUrls(req, res) {
    try {
        const urls = await URL.find({});
        const formattedUrls = urls.map(url => ({
            _id: url._id,
            originalUrl: url.redirectUrl,
            shortUrl: url.shortId,
            clicks: url.visitHistory.length,
            createdAt: url._id.getTimestamp(),
            visitHistory: url.visitHistory
        }));
        return res.json(formattedUrls);
    } catch (error) {
        console.error('Error fetching URLs:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetUrlStats(req, res) {
    try {
        const totalUrls = await URL.countDocuments();
        const allUrls = await URL.find({});
        const totalClicks = allUrls.reduce((sum, url) => sum + url.visitHistory.length, 0);
        
        return res.json({
            totalURLs: totalUrls,
            totalClicks: totalClicks,
            averageClicksPerUrl: totalUrls > 0 ? (totalClicks / totalUrls).toFixed(2) : 0
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { 
    handleGenerateNewShortUrl, 
    handleGetAllUrls, 
    handleGetUrlStats 
};