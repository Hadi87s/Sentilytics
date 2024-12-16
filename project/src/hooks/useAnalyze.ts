import { useState } from 'react';
import { analyzeSentiment } from '../services/api';
import type { SentimentResult } from '../types';

export function useAnalyze() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SentimentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a valid Amazon product URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeSentiment(url);
      setResults(data);
    } catch (err) {
      setError('Failed to analyze reviews. Please try again.');
      console.error('Analysis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!results) return;

    const csv = [
      ['Review', 'Sentiment'],
      ...results.reviews.map(review => [review.text, review.sentiment])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentiment-analysis.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return {
    url,
    setUrl,
    loading,
    results,
    error,
    handleAnalyze,
    handleDownload
  };
}