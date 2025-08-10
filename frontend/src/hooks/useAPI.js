import { useState, useEffect } from 'react';
import { fetchURLs, createShortURL } from '../services/api';

const useAPI = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getURLs = async () => {
        try {
            setLoading(true);
            const result = await fetchURLs();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const shortenURL = async (url) => {
        try {
            const newURL = await createShortURL(url);
            setData((prevData) => [...prevData, newURL]);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        getURLs();
    }, []);

    return { data, loading, error, shortenURL };
};

export default useAPI;