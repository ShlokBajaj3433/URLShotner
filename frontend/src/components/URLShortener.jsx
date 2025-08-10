import React, { useState } from 'react';
import { shortenURL } from '../services/api';

const URLShortener = () => {
    const [url, setUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await shortenURL(url);
            setShortenedUrl(response.shortenedUrl);
        } catch (err) {
            setError('Failed to shorten URL. Please try again.');
        }
    };

    return (
        <div className="url-shortener">
            <h2>URL Shortener</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL to shorten"
                    required
                />
                <button type="submit">Shorten URL</button>
            </form>
            {shortenedUrl && (
                <div>
                    <p>Shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a></p>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default URLShortener;