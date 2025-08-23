import { useState, useEffect } from 'react';

export const useYouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Detectar si estamos en localhost o en producción
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      const API_URL = isLocalhost 
        ? '/api/youtube.php'  // Para desarrollo local
        : 'https://orangered-guanaco-582072.hostingersite.com/api/youtube.php';  // Para producción
      
      console.log('Fetching from:', API_URL);  // Para debug
      
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setVideos(data.videos);
      } else {
        throw new Error(data.error || 'Error desconocido');
      }
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setError(err.message);
      
      // Fallback con datos estáticos si la API falla
      setVideos([
        {
          id: 'G4xpiUtz944',
          title: "Cuídate bien: El descanso de Dios",
          thumbnail: "https://img.youtube.com/vi/G4xpiUtz944/maxresdefault.jpg",
          channelTitle: "Pastor Julio Ortega",
          timeAgo: "hace 1 semana",
          url: "https://www.youtube.com/watch?v=G4xpiUtz944&t=1s"
        },
        {
          id: 'TU_LINK_2',
          title: "Caminando en la Voluntad de Dios",
          thumbnail: "/imgs/predica2.jpg",
          channelTitle: "Pastora Ethel Bayona",
          timeAgo: "hace 2 semanas",
          url: "https://www.youtube.com/watch?v=TU_LINK_2"
        },
        {
          id: 'TU_LINK_3',
          title: "La Gracia que Transforma",
          thumbnail: "/imgs/predica3.jpg",
          channelTitle: "Pastor Juan Carlos Escobar",
          timeAgo: "hace 3 semanas",
          url: "https://www.youtube.com/watch?v=TU_LINK_3"
        },
        {
          id: 'TU_LINK_4',
          title: "Restauración Divina",
          thumbnail: "/imgs/predica4.jpg",
          channelTitle: "Pastora Fiona Belshaw",
          timeAgo: "hace 1 mes",
          url: "https://www.youtube.com/watch?v=TU_LINK_4"
        },
        {
          id: 'TU_LINK_5',
          title: "El Fuego del Espíritu",
          thumbnail: "/imgs/predica5.jpg",
          channelTitle: "Pastor Julio Ortega",
          timeAgo: "hace 1 mes",
          url: "https://www.youtube.com/watch?v=TU_LINK_5"
        },
        {
          id: 'TU_LINK_6',
          title: "Venciendo en Cristo",
          thumbnail: "/imgs/predica6.jpg",
          channelTitle: "Pastora Ethel Bayona",
          timeAgo: "hace 2 meses",
          url: "https://www.youtube.com/watch?v=TU_LINK_6"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    
    // Actualizar cada 10 minutos
    const interval = setInterval(fetchVideos, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { videos, loading, error, refetch: fetchVideos };
};