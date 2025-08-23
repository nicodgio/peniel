import React, { useState, useEffect } from 'react';
import { useYouTubeVideos } from '../hooks/useYoutubeVideos';

const Home = () => {
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveData, setLiveData] = useState({
    predicador: 'Pastor Julio Ortega',
    mensaje: 'El Poder de la Fe',
    tiempoVivo: '45 minutos',
    viewerCount: '247 viendo ahora'
  });

  const { videos: predicas, loading: videosLoading, error: videosError } = useYouTubeVideos();

  const YOUTUBE_CONFIG = {
    API_KEY: "AIzaSyBgg5f96RaAexmF4DB98Y8RptIshmjBL5I",
    CHANNEL_ID: "UC9hskYYUu84QrSsho5bsizg",
  };

  useEffect(() => {
    checkLiveStream();
    const interval = setInterval(checkLiveStream, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkLiveStream = async () => {
    try {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CONFIG.CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_CONFIG.API_KEY}&maxResults=1`;
      
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setIsLiveActive(true);
        const liveVideo = data.items[0];
        setLiveData(prev => ({
          ...prev,
          mensaje: liveVideo.snippet.title,
          predicador: liveVideo.snippet.channelTitle
        }));
      } else {
        setIsLiveActive(false);
      }
    } catch (error) {
      console.error("Error verificando transmisión:", error);
    }
  };

  const scrollCarousel = (direction) => {
    const carousel = document.getElementById("ministeriosCarousel");
    const cardWidth = 420;
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  const ministerios = [
    {
      meta: ["MENSUAL", "SERVICIO"],
      title: "Acción Social",
      description: "Banco de alimentos y ropero comunitario. Ayudamos a personas en situación de vulnerabilidad, promoviendo la economía circular."
    },
    {
      meta: ["SÁBADOS", "19:00 HS"],
      title: "Peniel NG (Next Generation)",
      description: "Ministerio para adolescentes (12-18) y jóvenes (18-35). Reuniones dinámicas y dos campamentos al año."
    },
    {
      meta: ["DOMINGOS", "11:00 HS"],
      title: "Peniel Kids",
      description: "Enseñanza creativa para niños de 3-11 años: Exploradores, Valientes y Detectives. Campamento urbano en julio."
    },
    {
      meta: ["CONTINUO", "SERVICIO"],
      title: "Atención Primaria y Consolidación",
      description: "Primer contacto para nuevos visitantes y recién convertidos. Acompañamiento personalizado en los primeros pasos de fe."
    },
    {
      meta: ["MARTES", "21:00 HS"],
      title: "Instituto Bíblico Peniel",
      description: "Formación teológica semipresencial con material de Global University. Certificaciones internas disponibles."
    },
    {
      meta: ["GLOBAL", "9 PROYECTOS"],
      title: "Misiones",
      description: "Apoyamos proyectos misioneros alrededor del mundo. Celebramos anualmente la Fiesta de las Naciones."
    },
    {
      meta: ["MIÉRCOLES", "19:00 HS"],
      title: "Evangelismo",
      description: "Salimos cada semana a compartir esperanza. Punto de encuentro: C.C. Alcalá Norte (Ciudad Lineal)."
    },
    {
      meta: ["HOGARES", "SEMANAL"],
      title: "Grupos Peniel",
      description: "Células en hogares donde compartimos, crecemos y alcanzamos a nuestros vecinos. La iglesia más allá de las cuatro paredes."
    }
  ];

  const proximosEventos = [
    {
      fecha: "DOM 15 DIC",
      titulo: "Celebración de Navidad",
      descripcion: "Únete a nuestra celebración especial navideña con presentaciones, coro y mensaje inspirador.",
      hora: "11:00 HS",
      icono: "fas fa-gifts"
    },
    {
      fecha: "SÁB 21 DIC",
      titulo: "Retiro de Jóvenes",
      descripcion: "Un fin de semana de crecimiento espiritual y comunión para jóvenes de 18-35 años.",
      hora: "19:00 HS",
      icono: "fas fa-mountain"
    },
    {
      fecha: "DOM 29 DIC",
      titulo: "Culto de Fin de Año",
      descripcion: "Cerramos el año dando gracias y con expectativa por lo que Dios hará en el nuevo año.",
      hora: "11:00 HS",
      icono: "fas fa-calendar-check"
    }
  ];

  return (
    <>
      {/* Hero Section - SOLUCIÓN PERFECTA: CSS + Tailwind centrado */}
      <section 
        className="hero" 
        id="inicio"
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginTop: '-120px'
        }}
      >
        {/* Background */}
        <div 
          className="hero-bg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/imgs/hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -1
          }}
        ></div>
        
        {/* Contenido principal - CENTRADO PERFECTO */}
        <div 
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            color: 'white',
            maxWidth: '1200px',
            width: '100%',
            padding: '0 2rem'
          }}
        >
          <h1 
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1,
              margin: '0 0 1.5rem 0',
              letterSpacing: '-2px',
              fontFamily: 'Montserrat, sans-serif',
              textTransform: 'uppercase',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
              width: '100%'
            }}
          >
            PENIEL MADRID
          </h1>
          
          <p 
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              fontWeight: 300,
              margin: '0 0 3rem 0',
              opacity: 0.95,
              fontFamily: 'Montserrat, sans-serif',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              lineHeight: 1.3,
              textAlign: 'center',
              width: '100%'
            }}
          >
            Un encuentro con Dios lo cambia todo
          </p>
          
          <div 
            style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: '100%'
            }}
          >
            <a 
              href="/reuniones" 
              className="btn btn-primary"
              style={{
                padding: '1rem 2.5rem',
                border: 'none',
                borderRadius: '50px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none',
                display: 'inline-block',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.9rem',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                border: '2px solid rgba(255, 255, 255, 0.9)'
              }}
            >
              VISÍTANOS
            </a>
            <a 
              href="/contacto" 
              className="btn btn-secondary"
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none',
                display: 'inline-block',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.9rem',
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
            >
              HÁBLANOS
            </a>
          </div>
        </div>

        {/* Info cards en la parte inferior */}
        <div 
          className="hero-info"
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '4rem',
            right: '4rem',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div className="hero-info-item">
            REUNIONES GENERALES<br/>
            <strong>DOMINGOS 11:00 HS</strong>
          </div>
          <div className="hero-info-item">
            JÓVENES<br/>
            <strong>SÁBADOS 19:00 HS</strong>
          </div>
        </div>
      </section>

      {/* Live Section */}
      {isLiveActive && (
        <section className="live-section active">
          <div className="live-bg-effect"></div>
          <div className="live-container">
            <div className="live-header">
              <div className="live-badge">
                <div className="live-dot"></div>
                EN VIVO
              </div>
              <h2 className="live-title">Transmisión en Directo</h2>
              <p className="live-subtitle">
                Únete a nuestra reunión desde cualquier lugar
              </p>
            </div>

            <div className="live-content">
              <div className="live-player">
                <iframe id="youtubePlayer" src="" allowFullScreen></iframe>
                <div className="live-player-overlay">
                  <div className="live-viewers">
                    <i className="fas fa-eye"></i>
                    <span>{liveData.viewerCount}</span>
                  </div>
                </div>
              </div>

              <div className="live-info">
                <h3>Información de la Transmisión</h3>

                <div className="live-info-item">
                  <div className="live-info-icon">
                    <i className="fas fa-microphone"></i>
                  </div>
                  <div className="live-info-text">
                    <div className="live-info-label">Predicador</div>
                    <div className="live-info-value">{liveData.predicador}</div>
                  </div>
                </div>

                <div className="live-info-item">
                  <div className="live-info-icon">
                    <i className="fas fa-bible"></i>
                  </div>
                  <div className="live-info-text">
                    <div className="live-info-label">Mensaje</div>
                    <div className="live-info-value">{liveData.mensaje}</div>
                  </div>
                </div>

                <div className="live-info-item">
                  <div className="live-info-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="live-info-text">
                    <div className="live-info-label">Tiempo en vivo</div>
                    <div className="live-info-value">{liveData.tiempoVivo}</div>
                  </div>
                </div>

                <button className="live-chat-btn">
                  <i className="fas fa-comments"></i> PARTICIPAR EN EL CHAT
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Visítanos Banner */}
      <section className="visitanos-banner">
        <div className="visitanos-content">
          <div className="visitanos-image">
            <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop" alt="Iglesia Peniel Madrid" />
          </div>
          <div className="visitanos-text">
            <h2>Ven y Visítanos</h2>
            <p>Te esperamos con los brazos abiertos en nuestra iglesia. Experimenta la presencia de Dios y forma parte de nuestra familia.</p>
            <a href="/reuniones" className="btn btn-primary">CONOCER MÁS</a>
          </div>
        </div>
      </section>

      {/* Próximos Eventos Section */}
      <section className="proximos-eventos" id="eventos">
        <div className="section-header">
          <h2 className="section-title">PRÓXIMOS EVENTOS</h2>
          <p className="section-subtitle">
            No te pierdas las actividades especiales que tenemos preparadas
          </p>
        </div>

        <div className="events-grid">
          {proximosEventos.map((evento, index) => (
            <div key={index} className="event-card">
              <div className="event-image">
                <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=200&fit=crop" alt={evento.titulo} />
              </div>
              <div className="event-content">
                <div className="event-date">{evento.fecha}</div>
                <h3 className="event-title">
                  <i className={evento.icono}></i> {evento.titulo}
                </h3>
                <p className="event-description">{evento.descripcion}</p>
                <div className="event-time">
                  <i className="far fa-clock"></i>
                  {evento.hora}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menú Dominical Banner */}
      <section className="menu-dominical">
        <div className="menu-content">
          <div className="menu-text">
            <h2><i className="fas fa-utensils"></i> Te invitamos a conocer nuestro Menú Dominical</h2>
            <p>Cada domingo preparamos un delicioso menú casero. Tu contribución nos ayuda a seguir bendiciendo a más familias y sostener los ministerios de la iglesia.</p>
            <a href="/menu-dominical" className="btn btn-primary">VER MENÚ DE ESTA SEMANA</a>
          </div>
          <div className="menu-image">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop" alt="Menú Dominical" />
          </div>
        </div>
      </section>

      {/* Ministerios Section */}
      <section className="ministerios" id="ministerios">
        <div className="section-header">
          <h2 className="section-title">Involúcrate en nuestro movimiento</h2>
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={() => scrollCarousel(-1)}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="carousel-btn" onClick={() => scrollCarousel(1)}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="ministerios-carousel" id="ministeriosCarousel">
          {ministerios.map((ministerio, index) => (
            <div key={index} className="ministerio-card">
              <div className="ministerio-img"></div>
              <div className="ministerio-content">
                <div className="ministerio-meta">
                  {ministerio.meta.map((meta, i) => (
                    <span key={i}>
                      <i className={i === 0 ? "far fa-calendar" : "far fa-clock"}></i> 
                      {meta}
                    </span>
                  ))}
                </div>
                <h3>{ministerio.title}</h3>
                <p>{ministerio.description}</p>
                <a href="/ministerios" className="more-info">MÁS INFORMACIÓN</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Predicas Section */}
      <section className="predicas" id="predicas">
        <div className="section-header">
          <h2 className="section-title">MENSAJES RECIENTES</h2>
          <p className="section-subtitle">
            Revive nuestras prédicas más recientes desde nuestro canal de YouTube
          </p>
        </div>

        <div className="predicas-grid">
          {videosLoading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              <p>Cargando videos...</p>
            </div>
          ) : videosError ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              <p>Error cargando videos: {videosError}</p>
            </div>
          ) : (
            predicas.map((predica, index) => (
              <div 
                key={predica.id || index}
                className="predica-card" 
                style={{ backgroundImage: `url('${predica.thumbnail || predica.image}')` }}
                onClick={() => window.open(predica.url, '_blank')}
              >
                <div className="predica-overlay">
                  <div className="play-button">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="predica-info">
                  <h3 className="predica-title">{predica.title}</h3>
                  <p className="predica-meta">
                    {predica.channelTitle || predica.pastor}
                    {predica.timeAgo && ` • ${predica.timeAgo}`}
                    {predica.date && ` • ${predica.date}`}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="/predicas"
            className="btn btn-primary"
          >
            VER MÁS PRÉDICAS
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;