import React, { useState, useEffect } from 'react';

const GreenNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      console.log('Attempting to fetch news...'); // Debug log
      const response = await fetch('http://localhost:5000/api/news');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received news data:', data); // Debug log
      setNews(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching news:', err); // Debug log
      setError(`Failed to fetch news: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center">Loading news...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">🌍 Live Green Investment News</h2>
      {news.map((article, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-300 mb-3">{article.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400"
            >
              Read More →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GreenNews; 