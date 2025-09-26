import React, { useState, useEffect } from "react";
import { useYouTubeVideos } from "../hooks/useYoutubeVideos";
import '../css/inicio/sections.css';
import '../css/inicio/ministerios-predicas.css';

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [menuForm, setMenuForm] = useState({
    nombre: '',
    telefono: '',
    cantidad: 1
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const {
    videos: predicas,
    loading: videosLoading,
    error: videosError,
  } = useYouTubeVideos();

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await fetch('https://orangered-guanaco-582072.hostingersite.com/api/eventos.php');
      const data = await response.json();
      if (data.success) {
        setEventos(data.eventos.slice(0, 3)); // Solo los primeros 3
      }
    } catch (error) {
      console.error("Error cargando eventos:", error);
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMessage('');

    try {
      const response = await fetch('https://orangered-guanaco-582072.hostingersite.com/api/menu-registro.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuForm)
      });

      const data = await response.json();
      
      if (data.success) {
        setFormMessage('¡Registro exitoso! Nos vemos el domingo.');
        setMenuForm({ nombre: '', telefono: '', cantidad: 1 });
        setTimeout(() => {
          setShowMenuModal(false);
          setFormMessage('');
        }, 2000);
      } else {
        setFormMessage(data.message || 'Error al procesar el registro');
      }
    } catch (error) {
      console.error("Error enviando formulario:", error);
      setFormMessage('Error de conexión. Intenta nuevamente.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollCarousel = (direction) => {
    const carousel = document.getElementById("ministeriosCarousel");
    const cardWidth = 420;
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  const scrollPredicasCarousel = (direction) => {
    const carousel = document.getElementById("predicasCarousel");
    const cardWidth = 320;
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

const ministerios = [
  {
    meta: ["MENSUAL", "SERVICIO"],
    title: "Acción Social",
    description: "Cada mes recogemos y distribuimos alimentos a más de 100 personas en riesgo de exclusión, evitando el desperdicio y ofreciendo también un ropero comunitario. Todo esto como expresión práctica del amor de Dios."
  },
  {
    meta: ["SÁBADOS", "19:00"],
    title: "Peniel NG (Next Generation)",
    description: "Ministerio para adolescentes y jóvenes apasionados por Cristo. Crecemos en la fe, fortalecemos amistades y vivimos juntos la Palabra de Dios. También organizamos campamentos en verano e invierno."
  },
  {
    meta: ["DOMINGOS", "11:00"],
    title: "Peniel Kids",
    description: "Ministerio para los niños de 3 a 11 años. Aprenden la Palabra de Dios de forma creativa y divertida cada domingo. Se dividen en tres grupos por edad: Exploradores (3-5 años), Valientes (6-9 años) y Detectives (9-11 años). Además, disfrutan de un campamento urbano especial en julio."
  },
  {
    meta: ["CONTINUO", "SERVICIO"],
    title: "Atención Primaria y Consolidación",
    description: "El primer contacto para quienes llegan a la iglesia o comienzan su caminar con Jesús. Acompañamos a los recién convertidos para afianzar su relación con Dios e integrarse a la familia de la iglesia."
  },
  {
    meta: ["MARTES", "21:00"],
    title: "Instituto Bíblico Peniel",
    description: "Formación semipresencial para profundizar en la Palabra y prepararse para el servicio ministerial. Material oficial de Global University con certificaciones internas."
  },
  {
    meta: ["GLOBAL", "9 PAÍSES"],
    title: "Misiones",
    description: "Somos una comunidad misionera comprometida con llevar el evangelio a todas las naciones. Apoyamos 9 proyectos misioneros alrededor del mundo. Celebramos anualmente la Fiesta de las Naciones."
  },
  {
    meta: ["MIÉRCOLES", "19:00"],
    title: "Evangelismo",
    description: "Cada semana salimos a llevar esperanza a nuestra ciudad. Punto de encuentro: Centro Comercial Alcalá Norte (Ciudad Lineal). No se necesita experiencia, solo un corazón dispuesto."
  },
  {
    meta: ["HOGARES", "SEMANAL"],
    title: "Grupos Peniel",
    description: "Peniel es una iglesia en células con un solo propósito: alcanzar más almas. Las células llevan el evangelio a los hogares para dar a conocer el nombre de Dios a nuestros amigos, vecinos y comunidad."
  }
];

  return (
    <>
      <section
        className="hero"
        id="inicio"
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginTop: "-120px",
        }}
      >
        <div
          className="hero-bg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/imgs/hero.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            color: "white",
            maxWidth: "1200px",
            width: "100%",
            padding: "0 2rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 900,
              lineHeight: 1,
              margin: "0 0 1.5rem 0",
              letterSpacing: "-2px",
              fontFamily: "Montserrat, sans-serif",
              textTransform: "uppercase",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              textAlign: "center",
              width: "100%",
            }}
          >
            PENIEL MADRID
          </h1>

          <p
            style={{
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              fontWeight: 300,
              margin: "0 0 3rem 0",
              opacity: 0.95,
              fontFamily: "Montserrat, sans-serif",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              lineHeight: 1.3,
              textAlign: "center",
              width: "100%",
            }}
          >
            Un encuentro con Dios lo cambia todo
          </p>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <a
              href="/reuniones"
              className="btn btn-primary"
              style={{
                padding: "1rem 2.5rem",
                border: "none",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.3s",
                textDecoration: "none",
                display: "inline-block",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.9rem",
                background: "rgba(255, 255, 255, 0.9)",
                color: "black",
                border: "2px solid rgba(255, 255, 255, 0.9)",
              }}
            >
              VISÍTANOS
            </a>
            <a
              href="/contacto"
              className="btn btn-secondary"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.3s",
                textDecoration: "none",
                display: "inline-block",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.9rem",
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              HÁBLANOS
            </a>
          </div>
        </div>

        <div
          className="hero-info"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "4rem",
            right: "4rem",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="hero-info-item">
            REUNIONES GENERALES
            <br />
            <strong>DOMINGOS 11:00 HS</strong>
          </div>
          <div className="hero-info-item">
            JÓVENES
            <br />
            <strong>SÁBADOS 19:00 HS</strong>
          </div>
        </div>
      </section>

      <section className="visitanos-banner">
        <div className="visitanos-content">
          <div className="visitanos-image">
            <img
              src="/imgs/hero-peniel.jpg"
              alt="Iglesia Peniel Madrid"
            />
          </div>
          <div className="visitanos-text">
            <h2>Ven y Visítanos</h2>
            <p>
              Te esperamos con los brazos abiertos en nuestra iglesia.
              Experimenta la presencia de Dios y forma parte de nuestra familia.
            </p>
            <a href="/reuniones" className="btn btn-primary">
              CONOCER MÁS
            </a>
          </div>
        </div>
      </section>

      <section className="proximos-eventos" id="eventos">
        <div className="section-header">
          <h2 className="section-title">PRÓXIMOS EVENTOS</h2>
          <p className="section-subtitle">
            No te pierdas las actividades especiales que tenemos preparadas
          </p>
        </div>

        <div className="events-grid">
          {eventos.length > 0 ? (
            eventos.map((evento, index) => (
              <div key={evento.id || index} className="event-card-calendar">
                <div className="event-calendar-date" style={{borderTopColor: evento.color}}>
                  <div className="calendar-month" style={{backgroundColor: evento.color}}>
                    {evento.mes}
                  </div>
                  <div className="calendar-day">
                    {evento.dias}
                  </div>
                  <div className="calendar-weekday">
                    {evento.diaSemana}
                  </div>
                </div>
                
                <div className="event-content-calendar">
                  <div className="event-header">
                    <h3 className="event-title-calendar">
                      <i className={evento.icono} style={{color: evento.color}}></i>
                      {evento.titulo}
                    </h3>
                    <div className="event-time-calendar">
                      <i className="far fa-clock"></i>
                      {evento.hora}
                    </div>
                  </div>
                  
                  <p className="event-description-calendar">
                    {evento.descripcion}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '2rem'}}>
              <p>No hay eventos programados en este momento.</p>
            </div>
          )}
        </div>
      </section>

      <section className="menu-dominical">
        <div className="menu-content">
          <div className="menu-text">
            <h2>
              <i className="fas fa-utensils"></i> Te invitamos a conocer nuestro
              Menú Dominical
            </h2>
            <p>
              Cada domingo preparamos un delicioso menú casero. Tu contribución
              nos ayuda a seguir bendiciendo a más familias y sostener los
              ministerios de la iglesia.
            </p>
            <button 
              onClick={() => setShowMenuModal(true)}
              className="btn btn-primary"
            >
              REGISTRARSE PARA EL MENÚ
            </button>
          </div>
          <div className="menu-image">
            <img
              src="/imgs/menu1.jpg"
              alt="Menú Dominical"
            />
          </div>
        </div>
      </section>

      {/* Modal de registro para menú dominical */}
      {showMenuModal && (
        <div 
          className="menu-modal"
          onClick={(e) => e.target === e.currentTarget && setShowMenuModal(false)}
        >
          <div className="menu-modal-content">
            <button
              onClick={() => setShowMenuModal(false)}
              className="menu-modal-close"
            >
              ×
            </button>

            <h3 style={{ 
              marginBottom: '1.5rem', 
              fontFamily: 'Montserrat, sans-serif',
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              Registro Menú Dominical
            </h3>

            {formMessage && (
              <div style={{
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1rem',
                textAlign: 'center',
                backgroundColor: formMessage.includes('exitoso') ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)',
                color: formMessage.includes('exitoso') ? '#4ade80' : '#f87171',
                border: `1px solid ${formMessage.includes('exitoso') ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`
              }}>
                {formMessage}
              </div>
            )}

            <form onSubmit={handleMenuSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={menuForm.nombre}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'white',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={menuForm.telefono}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'white',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  Cantidad de personas *
                </label>
                <select
                  name="cantidad"
                  value={menuForm.cantidad}
                  onChange={handleInputChange}
                  required
                  className="menu-form-select"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'persona' : 'personas'}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#609be8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  fontWeight: '600',
                  fontFamily: 'Montserrat, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: formLoading ? 'not-allowed' : 'pointer',
                  opacity: formLoading ? 0.7 : 1
                }}
              >
                {formLoading ? 'REGISTRANDO...' : 'CONFIRMAR REGISTRO'}
              </button>
            </form>
          </div>
        </div>
      )}

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
                      <i
                        className={i === 0 ? "far fa-calendar" : "far fa-clock"}
                      ></i>
                      {meta}
                    </span>
                  ))}
                </div>
                <h3>{ministerio.title}</h3>
                <p>{ministerio.description}</p>
                <a href="/ministerios" className="more-info">
                  MÁS INFORMACIÓN
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="predicas" id="predicas">
        <div className="section-header">
          <h2 className="section-title">MENSAJES RECIENTES</h2>
          <p className="section-subtitle">
            Revive nuestras prédicas más recientes desde nuestro canal de
            YouTube
          </p>
        </div>

        <div className="predicas-grid">
          {videosLoading ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <p>Cargando videos...</p>
            </div>
          ) : videosError ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <p>Error cargando videos: {videosError}</p>
            </div>
          ) : (
            predicas.map((predica, index) => (
              <div
                key={predica.id || index}
                className="predica-card"
                style={{
                  backgroundImage: `url('${
                    predica.thumbnail || predica.image
                  }')`,
                }}
                onClick={() => window.open(predica.url, "_blank")}
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

        <div className="predicas-carousel" id="predicasCarousel">
          {videosLoading ? (
            <div
              style={{ textAlign: "center", padding: "2rem", width: "100%" }}
            >
              <p>Cargando videos...</p>
            </div>
          ) : videosError ? (
            <div
              style={{ textAlign: "center", padding: "2rem", width: "100%" }}
            >
              <p>Error cargando videos: {videosError}</p>
            </div>
          ) : (
            predicas.map((predica, index) => (
              <div
                key={predica.id || index}
                className="predica-card"
                style={{
                  backgroundImage: `url('${
                    predica.thumbnail || predica.image
                  }')`,
                }}
                onClick={() => window.open(predica.url, "_blank")}
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

        <div className="predicas-carousel-controls">
          <button
            className="predicas-carousel-btn"
            onClick={() => scrollPredicasCarousel(-1)}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="predicas-carousel-btn"
            onClick={() => scrollPredicasCarousel(1)}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="/predicas" className="btn btn-primary">
            VER MÁS PRÉDICAS
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;