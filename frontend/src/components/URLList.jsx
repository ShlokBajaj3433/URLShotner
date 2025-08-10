import React, { useEffect, useState } from 'react';
import { fetchURLs } from '../services/api';

const URLList = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getURLs = async () => {
            try {
                const data = await fetchURLs();
                setUrls(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getURLs();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Shortened URLs</h2>
            <ul>
                {urls.map((url) => (
                    <li key={url.id}>
                        <a href={url.shortenedUrl} target="_blank" rel="noopener noreferrer">
                            {url.originalUrl}
                        </a> - {url.shortenedUrl}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default URLList;