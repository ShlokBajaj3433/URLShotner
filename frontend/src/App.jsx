import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:8001';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API_BASE}/urls`);
      setUrls(response.data);
    } catch (err) {
      console.error('Error fetching URLs:', err);
      setError('Failed to fetch URLs');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE}/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchUrls();
    fetchStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCopySuccess('');
    
    try {
      const response = await axios.post(`${API_BASE}/shorten`, {
        url: originalUrl
      });
      setShortUrl(`${API_BASE}/${response.data.Id}`);
      setOriginalUrl('');
      fetchUrls();
      fetchStats();
    } catch (err) {
      setError('Failed to create short URL. Please check if the URL is valid.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('Copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const filteredUrls = urls.filter(url => 
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUrls = filteredUrls.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'mostClicks':
        return b.clicks - a.clicks;
      case 'leastClicks':
        return a.clicks - b.clicks;
      default:
        return 0;
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔗 URL Shortener</h1>
        
        {/* Stats Section */}
        {stats && (
          <div className="stats-section">
            <div className="stat-card">
              <h3>{stats.totalURLs}</h3>
              <p>Total URLs</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalClicks}</h3>
              <p>Total Clicks</p>
            </div>
            <div className="stat-card">
              <h3>{stats.averageClicksPerUrl}</h3>
              <p>Avg Clicks/URL</p>
            </div>
          </div>
        )}

        {/* URL Shortener Form */}
        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter URL to shorten (e.g., https://example.com)"
            required
            className="url-input"
          />
          <button 
            type="submit" 
            disabled={loading || !validateUrl(originalUrl)} 
            className="shorten-btn"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}
        {copySuccess && <div className="success">{copySuccess}</div>}

        {shortUrl && (
          <div className="result">
            <h3>✅ URL Shortened Successfully!</h3>
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
                📋 Copy
              </button>
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="visit-btn"
              >
                🔗 Visit
              </a>
            </div>
          </div>
        )}

        {/* URL History Section */}
        <div className="urls-list">
          <div className="urls-header">
            <h3>📊 URL History ({urls.length})</h3>
            <div className="controls">
              <input
                type="text"
                placeholder="Search URLs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="mostClicks">Most Clicks</option>
                <option value="leastClicks">Least Clicks</option>
              </select>
            </div>
          </div>

          {sortedUrls.length > 0 ? (
            <div className="urls-grid">
              {sortedUrls.map((url) => (
                <div key={url._id} className="url-card">
                  <div className="url-info">
                    <div className="original-url">
                      <span className="label">Original:</span>
                      <a 
                        href={url.originalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={url.originalUrl}
                      >
                        {url.originalUrl.length > 50 
                          ? url.originalUrl.substring(0, 50) + '...' 
                          : url.originalUrl}
                      </a>
                    </div>
                    
                    <div className="short-url">
                      <span className="label">Short:</span>
                      <a 
                        href={`${API_BASE}/${url.shortUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {API_BASE}/{url.shortUrl}
                      </a>
                      <button 
                        onClick={() => copyToClipboard(`${API_BASE}/${url.shortUrl}`)}
                        className="mini-copy-btn"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  <div className="url-stats">
                    <div className="stat">
                      <span className="stat-value">{url.clicks}</span>
                      <span className="stat-label">Clicks</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">
                        {new Date(url.createdAt).toLocaleDateString()}
                      </span>
                      <span className="stat-label">Created</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-urls">
              {searchTerm ? 
                `No URLs found matching "${searchTerm}"` : 
                'No URLs created yet. Create your first short URL above! 🚀'
              }
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;