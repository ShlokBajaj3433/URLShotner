export const API_BASE_URL = 'http://localhost:8081/api'; // Base URL for the backend API
export const SHORTEN_URL_ENDPOINT = `${API_BASE_URL}/shorten`; // Endpoint for shortening URLs
export const FETCH_URLS_ENDPOINT = `${API_BASE_URL}/urls`; // Endpoint for fetching shortened URLs
export const URL_STATS_ENDPOINT = `${API_BASE_URL}/stats`; // Endpoint for fetching URL statistics

export const DEFAULT_SHORTENED_URL = 'https://short.ly/'; // Default shortened URL prefix
export const MAX_URL_LENGTH = 2048; // Maximum 

export const ERROR_MESSAGE = 'An error occurred. Please try again.'; // Generic error message for API calls