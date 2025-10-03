import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/inicio/devocional-detalle.css';

const DevocionalDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [devocional, setDevocional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDevocional();
  }, [id]);

  const fetchDevocional = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://orangered-guanaco-582072.hostingersite.com/api/blog-detalle.php?id=${id}`
      );
      const data = await response.json();

      if (data.success) {
        setDevocional(data.devocional);
      } else {
        setError('No se encontró el devocional');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `${devocional.titulo} - ${devocional.descripcion_corta}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="devocional-detalle-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando devocional...</p>
        </div>
      </div>
    );
  }

  if (error || !devocional) {
    return (
      <div className="devocional-detalle-page">
        <div className="error-container">
          <i className="fas fa-exclamation-circle"></i>
          <h2>{error || 'Devocional no encontrado'}</h2>
          <button onClick={() => navigate('/blog')} className="btn-back">
            <i className="fas fa-arrow-left"></i>
            Volver al Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="devocional-detalle-page">
      {/* Hero con imagen de fondo */}
      <div 
        className="devocional-hero"
        style={{
          backgroundImage: devocional.imagen_url 
            ? `url(${devocional.imagen_url})` 
            : 'linear-gradient(135deg, #609be8, #4a8bc2)'
        }}
      >
        <div className="devocional-hero-overlay"></div>
        <div className="devocional-hero-content">
          <h1>{devocional.titulo}</h1>
          
          <div className="hero-meta">
            <span>
              <i className="fas fa-user"></i>
              {devocional.autor}
            </span>
            <span>
              <i className="far fa-calendar"></i>
              {devocional.fecha_formateada}
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="devocional-container">
        <article className="devocional-article">
          {/* Descripción destacada */}
          <div className="devocional-lead">
            <p>{devocional.descripcion_corta}</p>
          </div>

          {/* Versículos */}
          {devocional.versiculos && (
            <div className="versiculos-destacados">
              <div className="versiculos-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <div className="versiculos-content">
                <h3>Versículos de referencia</h3>
                <p>{devocional.versiculos}</p>
              </div>
            </div>
          )}

          {/* Contenido del devocional */}
          <div className="devocional-body">
            {devocional.contenido.split('\n\n').map((parrafo, index) => (
              <p key={index}>{parrafo}</p>
            ))}
          </div>

          {/* Navegación inferior */}
          <div className="devocional-footer">
            <button 
              onClick={() => navigate('/blog')} 
              className="btn-volver"
            >
              <i className="fas fa-arrow-left"></i>
              Volver al Blog
            </button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="devocional-sidebar">
          {/* Card de autor */}
          <div className="sidebar-card">
            <div className="sidebar-icon">
              <i className="fas fa-user-circle"></i>
            </div>
            <h3>Autor</h3>
            <p className="autor-nombre">{devocional.autor}</p>
          </div>

          {/* Card de fecha */}
          <div className="sidebar-card">
            <div className="sidebar-icon">
              <i className="far fa-calendar-alt"></i>
            </div>
            <h3>Fecha de publicación</h3>
            <p>{devocional.fecha_completa}</p>
          </div>

          {/* Card de compartir */}
          <div className="sidebar-card sidebar-card-compartir">
            <div className="sidebar-icon">
              <i className="fas fa-share-alt"></i>
            </div>
            <h3>Compartir</h3>
            <p>Comparte este devocional</p>
            <button 
              onClick={handleShare}
              className="btn-compartir-sidebar"
            >
              <i className="fab fa-whatsapp"></i>
              WhatsApp
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DevocionalDetalle;