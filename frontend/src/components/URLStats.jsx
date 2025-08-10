import React, { useEffect, useState } from 'react';
import { fetchURLStats } from '../services/api';

const URLStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStats = async () => {
            try {
                const data = await fetchURLStats();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getStats();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>URL Statistics</h2>
            {stats ? (
                <ul>
                    <li>Total URLs Shortened: {stats.totalURLs}</li>
                    <li>Total Clicks: {stats.totalClicks}</li>
                    {/* Add more statistics as needed */}
                </ul>
            ) : (
                <div>No statistics available.</div>
            )}
        </div>
    );
};

export default URLStats;