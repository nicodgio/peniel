import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/inicio/blog.css';

const Blog = () => {
  const navigate = useNavigate();
  const [devocionales, setDevocionales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit] = useState(9);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchDevocionales();
  }, [offset]);

  const fetchDevocionales = async () => {
    setLoading(true);
    try {
      const url = `https://orangered-guanaco-582072.hostingersite.com/api/blog.php?limit=${limit}&offset=${offset}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setDevocionales(data.devocionales);
        setTotal(data.total);
      } else {
        setError('Error al cargar los devocionales');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset(offset - limit);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (offset + limit < total) {
      setOffset(offset + limit);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <h1>DEVOCIONALES</h1>
          <p>Alimento espiritual para tu vida diaria</p>
        </div>
      </div>

      {/* Grid de Devocionales */}
      <section className="blog-section">
        <div className="blog-container">
          {loading ? (
            <div className="blog-loading">
              <div className="loading-spinner"></div>
              <p>Cargando devocionales...</p>
            </div>
          ) : error ? (
            <div className="blog-error">
              <i className="fas fa-exclamation-circle"></i>
              <p>{error}</p>
            </div>
          ) : devocionales.length === 0 ? (
            <div className="blog-empty">
              <i className="fas fa-book-open"></i>
              <p>No hay devocionales disponibles</p>
            </div>
          ) : (
            <>
              <div className="devocionales-grid">
                {devocionales.map((devocional) => (
                  <div key={devocional.id} className="devocional-card">
                    {devocional.imagen_url && (
                      <div 
                        className="devocional-image"
                        style={{ backgroundImage: `url(${devocional.imagen_url})` }}
                      >
                        <div className="devocional-image-overlay"></div>
                      </div>
                    )}
                    {!devocional.imagen_url && (
                      <div className="devocional-image devocional-image-default">
                        <div className="default-icon">
                          <i className="fas fa-bible"></i>
                        </div>
                      </div>
                    )}
                    
                    <div className="devocional-content">
                      <div className="devocional-meta">
                        {devocional.categoria && (
                          <span className="devocional-categoria">
                            <i className="fas fa-tag"></i>
                            {devocional.categoria}
                          </span>
                        )}
                        <span className="devocional-fecha">
                          <i className="far fa-calendar"></i>
                          {devocional.fecha_formateada}
                        </span>
                      </div>
                      
                      <h3 className="devocional-title">{devocional.titulo}</h3>
                      
                      <p className="devocional-autor">
                        <i className="fas fa-user"></i>
                        {devocional.autor}
                      </p>
                      
                      <p className="devocional-descripcion">
                        {devocional.descripcion_corta}
                      </p>
                      
                      {devocional.versiculos && (
                        <div className="devocional-versiculos">
                          <i className="fas fa-book"></i>
                          <span>{devocional.versiculos}</span>
                        </div>
                      )}
                      
                      <button 
                        className="devocional-btn"
                        onClick={() => navigate(`/blog/${devocional.id}`)}
                      >
                        Leer más
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {total > limit && (
                <div className="blog-pagination">
                  <button
                    className="pagination-btn"
                    onClick={handlePrevPage}
                    disabled={offset === 0}
                  >
                    <i className="fas fa-chevron-left"></i>
                    Anterior
                  </button>
                  
                  <span className="pagination-info">
                    Mostrando {offset + 1} - {Math.min(offset + limit, total)} de {total}
                  </span>
                  
                  <button
                    className="pagination-btn"
                    onClick={handleNextPage}
                    disabled={offset + limit >= total}
                  >
                    Siguiente
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;