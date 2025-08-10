import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:8001';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API_BASE}/url`);
      setUrls(response.data);
    } catch (err) {
      console.error('Error fetching URLs:', err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_BASE}/url`, {
        originalUrl: originalUrl
      });
      
      setShortUrl(`${API_BASE}/${response.data.shortUrl}`);
      setOriginalUrl('');
      fetchUrls();
    } catch (err) {
      setError('Failed to create short URL. Please check if the URL is valid.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Shortener</h1>
        
        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter URL to shorten"
            required
            className="url-input"
          />
          <button type="submit" disabled={loading} className="shorten-btn">
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {shortUrl && (
          <div className="result">
            <h3>Shortened URL:</h3>
            <div className="short-url-container">
              <input 
                type="text" 
                value={shortUrl} 
                readOnly 
                className="short-url-input"
              />
              <button 
                onClick={() => copyToClipboard(shortUrl)}
                className="copy-btn"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <div className="urls-list">
          <h3>Recent URLs</h3>
          {urls.length > 0 ? (
            <table className="urls-table">
              <thead>
                <tr>
                  <th>Original URL</th>
                  <th>Short URL</th>
                  <th>Clicks</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url) => (
                  <tr key={url._id}>
                    <td className="original-url">{url.originalUrl}</td>
                    <td>
                      <a 
                        href={`${API_BASE}/${url.shortUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {url.shortUrl}
                      </a>
                    </td>
                    <td>{url.clicks}</td>
                    <td>{new Date(url.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No URLs created yet.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;