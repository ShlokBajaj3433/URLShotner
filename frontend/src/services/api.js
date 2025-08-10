import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Adjust the base URL as needed

export const shortenURL = async (url) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/shorten`, { url });
        return response.data;
    } catch (error) {
        throw new Error('Error shortening the URL: ' + error.message);
    }
};

export const fetchShortenedURLs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/urls`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching shortened URLs: ' + error.message);
    }
};