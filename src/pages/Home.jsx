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

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="inicio">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1>PENIEL MADRID</h1>
          <p className="hero-subtitle">Un encuentro con Dios lo cambia todo</p>
          <div className="hero-cta">
            <a href="/reuniones" className="btn btn-primary">VISÍTANOS</a>
            <a href="/contacto" className="btn btn-secondary">HABLANOS</a>
          </div>
        </div>
        <div className="hero-bottom">
          <div>REUNIONES GENERALES DOMINGOS 11:00 HS</div>
          <div>JÓVENES SÁBADOS 19:00 HS</div>
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

      {/* Reuniones Section */}
      <section className="reuniones" id="reuniones">
        <div className="section-header">
          <h2 className="section-title">REUNIONES</h2>
          <p className="section-subtitle">
            Si quieres visitarnos y ser parte de esta gran familia, ¡eres bienvenido!
          </p>
        </div>

        <div className="reuniones-grid">
          <div className="reuniones-info">
            <h3><i className="fas fa-map-marker-alt"></i> Ubicación</h3>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
              Calle Miguel Fleta 11, 28037, Madrid
            </p>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
              De fácil acceso en transporte público y con aparcamiento en la zona
            </p>

            <div className="reunion-item">
              <div className="reunion-time">Domingos 11:00 hs</div>
              <p>Reuniones Generales</p>
            </div>

            <div className="reunion-item">
              <div className="reunion-time">Sábados 19:00 hs</div>
              <p>Reuniones de Jóvenes</p>
            </div>

            <div className="reunion-item">
              <div className="reunion-time">Durante la semana</div>
              <p>Grupos Peniel - ¡Apúntate y forma parte!</p>
            </div>
          </div>

          <div className="reunion-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.947988960281!2d-3.634061223578483!3d40.43215057143719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f72711cfea9%3A0x33f8534cc9869da9!2sC.%20de%20Miguel%20Fleta%2C%2011%2C%20San%20Blas-Canillejas%2C%2028037%20Madrid%2C%20Espa%C3%B1a!5e0!3m2!1ses-419!2smx!4v1754721691771!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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

      {/* Vision Section */}
      <section className="vision" id="vision">
        <div className="floating-element"></div>
        <div className="floating-element"></div>

        <div className="section-header">
          <h2 className="section-title">NUESTRA VISIÓN</h2>
        </div>

        <div className="vision-container">
          <div className="vision-content">
            <h2>"Ser y Hacer Discípulos"</h2>
            <p>
              Creemos que la tarea primordial de la iglesia es que todas las
              personas en el mundo sean salvas de la condenación eterna y que
              todos aquellos que reciben el don de la salvación sean transformados
              profundamente.
            </p>
            <p>
              Nuestra dinámica de trabajo es el <strong>Ciclo de Vida</strong>,
              que asegura el crecimiento y la multiplicación de la iglesia a
              través de cuatro pasos fundamentales.
            </p>
          </div>

          <div className="vision-graphic">
            <div className="vision-circles">
              <div className="vision-circle">GANAR</div>
              <div className="vision-circle">CONSOLIDAR</div>
              <div className="vision-circle">DISCIPULAR</div>
              <div className="vision-circle">ENVIAR</div>
            </div>
          </div>
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