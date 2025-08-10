import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

export const shortenURL = async (url) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/shorten`, { url });
        return response.data;
    } catch (error) {
        throw new Error('Error shortening the URL: ' + error.message);
    }
};

export const fetchURLs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/urls`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching URLs: ' + error.message);
    }
};

export const fetchURLStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching URL stats: ' + error.message);
    }
};

export const createShortURL = shortenURL; // Alias for compatibility
export const fetchShortenedURLs = fetchURLs; // Alias for compatibility