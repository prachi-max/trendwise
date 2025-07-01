'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  // Fetch all articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/article');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    };
    fetchArticles();
  }, []);

  const generateArticle = async () => {
    if (!topic) return alert("Please enter a topic");
    setLoading(true);
    try {
      const res = await fetch('/api/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      setArticles(prev => [data, ...prev]);
      setTopic('');
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 TrendWise Blog Generator</h1>
      
      <input
        type="text"
        placeholder="Enter a trending topic..."
        className="border p-2 w-full mb-4"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        onClick={generateArticle}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Article'}
      </button>

      <h2 className="text-xl font-semibold mt-8">📰 All Articles</h2>
      <ul className="mt-4 space-y-4">
        {articles.map((article) => (
          <li key={article._id} className="border p-4 rounded">
            <h3 className="text-lg font-bold">{article.title}</h3>
            <Link href={`/article/${article.slug}`}>
              <span className="text-blue-600 underline">Read More</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
