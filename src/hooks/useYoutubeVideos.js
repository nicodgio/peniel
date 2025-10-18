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
      
      const API_URL = `https://penielmadrid.es/api/youtube.php?limit=${limit}`;

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Response text:', text);
        throw new Error('La respuesta no es JSON válido');
      }

      if (data.success && Array.isArray(data.videos)) {
        setVideos(data.videos);
        setLastUpdated(data.lastUpdated);
      } else {
        throw new Error(data.message || 'No se encontraron videos');
      }

    } catch (err) {
      console.error('Error en useYouTubeVideos:', err);
      setError(err.message);
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