import { useState, useEffect } from 'react';

export const useYouTubeVideos = (limit = 6) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      const API_URL = isLocalhost 
        ? `/api/youtube.php?limit=${limit}`
        : `https://orangered-guanaco-582072.hostingersite.com/api/youtube.php?limit=${limit}`;
      
      console.log('Fetching from:', API_URL);
      
      const response = await fetch(API_URL);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success) {
        setVideos(data.videos);
        setLastUpdated(data.lastUpdated);
        console.log('Videos loaded from database:', data.videos.length);
      } else {
        throw new Error(data.message || 'Error desconocido');
      }
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      console.error('Full error object:', err);
      setError(`Error cargando videos: ${err.message}`);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    
    const interval = setInterval(fetchVideos, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [limit]);

  return { 
    videos, 
    loading, 
    error, 
    lastUpdated,
    refetch: fetchVideos 
  };
};