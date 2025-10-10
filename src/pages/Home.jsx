import React, { useState, useEffect } from "react";
import { useYouTubeVideos } from "../hooks/useYoutubeVideos";
import "../css/inicio/home.css";

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [menuForm, setMenuForm] = useState({
    nombre: "",
    telefono: "",
    cantidad: 1,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const {
    videos: predicas,
    loading: videosLoading,
    error: videosError,
  } = useYouTubeVideos();

  const decodeHtmlEntities = (text) => {
    if (!text) return text;
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  useEffect(() => {
    fetchEventos();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await fetch(
        "https://orangered-guanaco-582072.hostingersite.com/api/eventos.php"
      );
      const data = await response.json();
      if (data.success) {
        setEventos(data.eventos.slice(0, 3));
      }
    } catch (error) {
      console.error("Error cargando eventos:", error);
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMessage("");

    try {
      const response = await fetch(
        "https://orangered-guanaco-582072.hostingersite.com/api/menu-registro.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(menuForm),
        }
      );

      const data = await response.json();

      if (data.success) {
        setFormMessage("¡Registro exitoso! Nos vemos el domingo.");
        setMenuForm({ nombre: "", telefono: "", cantidad: 1 });
        setTimeout(() => {
          setShowMenuModal(false);
          setFormMessage("");
        }, 2000);
      } else {
        setFormMessage(data.message || "Error al procesar el registro");
      }
    } catch (error) {
      console.error("Error enviando formulario:", error);
      setFormMessage("Error de conexión. Intenta nuevamente.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const scrollCarousel = (direction) => {
    const carousel = document.getElementById("ministeriosCarousel");
    const cardWidth = isMobile ? 320 : 450;
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  const scrollPredicasCarousel = (direction) => {
    const carousel = document.getElementById("predicasCarousel");
    const cardWidth = isMobile ? window.innerWidth - 40 : 320;
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  const ministerios = [
    {
      meta: ["MENSUAL", "SERVICIO"],
      title: "Acción Social",
      description:
        "Cada mes recogemos y distribuimos alimentos a más de 100 personas en riesgo de exclusión, evitando el desperdicio y ofreciendo también un ropero comunitario. Todo esto como expresión práctica del amor de Dios.",
    },
    {
      meta: ["SÁBADOS", "19:00"],
      title: "Peniel NG (Next Generation)",
      description:
        "Ministerio para adolescentes y jóvenes apasionados por Cristo. Crecemos en la fe, fortalecemos amistades y vivimos juntos la Palabra de Dios. También organizamos campamentos en verano e invierno.",
    },
    {
      meta: ["DOMINGOS", "11:00"],
      title: "Peniel Kids",
      description:
        "Ministerio para los niños de 3 a 11 años. Aprenden la Palabra de Dios de forma creativa y divertida cada domingo. Se dividen en tres grupos por edad: Exploradores (3-5 años), Valientes (6-9 años) y Detectives (9-11 años). Además, disfrutan de un campamento urbano especial en julio.",
    },
    {
      meta: ["CONTINUO", "SERVICIO"],
      title: "Atención Primaria y Consolidación",
      description:
        "El primer contacto para quienes llegan a la iglesia o comienzan su caminar con Jesús. Acompañamos a los recién convertidos para afianzar su relación con Dios e integrarse a la familia de la iglesia.",
    },
    {
      meta: ["MARTES", "21:00"],
      title: "Instituto Bíblico Peniel",
      description:
        "Formación semipresencial para profundizar en la Palabra y prepararse para el servicio ministerial. Material oficial de Global University con certificaciones internas.",
    },
    {
      meta: ["GLOBAL", "9 PAÍSES"],
      title: "Misiones",
      description:
        "Somos una comunidad misionera comprometida con llevar el evangelio a todas las naciones. Apoyamos 9 proyectos misioneros alrededor del mundo. Celebramos anualmente la Fiesta de las Naciones.",
    },
    {
      meta: ["MIÉRCOLES", "19:00"],
      title: "Evangelismo",
      description:
        "Cada semana salimos a llevar esperanza a nuestra ciudad. Punto de encuentro: Centro Comercial Alcalá Norte (Ciudad Lineal). No se necesita experiencia, solo un corazón dispuesto.",
    },
    {
      meta: ["HOGARES", "SEMANAL"],
      title: "Grupos Peniel",
      description:
        "Peniel es una iglesia en células con un solo propósito: alcanzar más almas. Las células llevan el evangelio a los hogares para dar a conocer el nombre de Dios a nuestros amigos, vecinos y comunidad.",
    },
    {
      meta: ["DOMINGOS", "ADORACIÓN"],
      title: "Alabanza y Adoración",
      description:
        "En Peniel, creemos que la alabanza y la adoración no son simplemente un momento del servicio, sino una expresión viva y poderosa de nuestra relación con Dios.",
    },
  ];

  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-bg"></div>

        <div className="hero-content">
          <h1>PENIEL MADRID</h1>
          <p className="hero-subtitle">Un encuentro con Dios lo cambia todo</p>

          <div className="hero-cta">
            <a href="/reuniones" className="btn btn-primary">
              VISÍTANOS
            </a>
            <a href="/contacto" className="btn btn-secondary">
              HÁBLANOS
            </a>
          </div>
        </div>

        <div className="hero-info">
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
            <img src="/imgs/hero-peniel.jpg" alt="Iglesia Peniel Madrid" />
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
                <div
                  className="event-calendar-date"
                  style={{ borderTopColor: evento.color }}
                >
                  <div
                    className="calendar-month"
                    style={{ backgroundColor: evento.color }}
                  >
                    {evento.mes}
                  </div>
                  <div className="calendar-day">{evento.dias}</div>
                  <div className="calendar-weekday">{evento.diaSemana}</div>
                </div>

                <div className="event-content-calendar">
                  <div className="event-header">
                    <h3 className="event-title-calendar">
                      <i
                        className={evento.icono}
                        style={{ color: evento.color }}
                      ></i>
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
            <div className="no-events">
              <p>No hay eventos programados en este momento.</p>
            </div>
          )}
        </div>
      </section>

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
            <img src="/imgs/menu1.jpg" alt="Menú Dominical" />
          </div>
        </div>
      </section>

      {showMenuModal && (
        <div
          className="menu-modal"
          onClick={(e) =>
            e.target === e.currentTarget && setShowMenuModal(false)
          }
        >
          <div className="menu-modal-content">
            <button
              onClick={() => setShowMenuModal(false)}
              className="menu-modal-close"
            >
              ×
            </button>

            <h3 className="modal-title">Registro Menú Dominical</h3>

            {formMessage && (
              <div
                className={`form-message ${
                  formMessage.includes("exitoso") ? "success" : "error"
                }`}
              >
                {formMessage}
              </div>
            )}

            <form onSubmit={handleMenuSubmit}>
              <div className="form-group">
                <label>Nombre completo *</label>
                <input
                  type="text"
                  name="nombre"
                  value={menuForm.nombre}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={menuForm.telefono}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Cantidad de personas *</label>
                <select
                  name="cantidad"
                  value={menuForm.cantidad}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "persona" : "personas"}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="btn btn-primary btn-block"
              >
                {formLoading ? "REGISTRANDO..." : "CONFIRMAR REGISTRO"}
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="predicas" id="predicas">
        <div className="section-header">
          <h2 className="section-title">MENSAJES RECIENTES</h2>
          <p className="section-subtitle">
            Revive nuestras prédicas más recientes desde nuestro canal de
            YouTube
          </p>
        </div>

        {isMobile ? (
          <>
            <div className="predicas-carousel" id="predicasCarousel">
              {videosLoading ? (
                <div className="loading-message">
                  <p>Cargando videos...</p>
                </div>
              ) : videosError ? (
                <div className="error-message">
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
                      <h3 className="predica-title">
                        {decodeHtmlEntities(predica.title)}
                      </h3>
                      <p className="predica-meta">
                        {predica.channelTitle
                          ? decodeHtmlEntities(predica.channelTitle)
                          : predica.pastor}
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
          </>
        ) : (
          <div className="predicas-grid">
            {videosLoading ? (
              <div className="loading-message">
                <p>Cargando videos...</p>
              </div>
            ) : videosError ? (
              <div className="error-message">
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
                    <h3 className="predica-title">
                      {decodeHtmlEntities(predica.title)}
                    </h3>
                    <p className="predica-meta">
                      {predica.channelTitle
                        ? decodeHtmlEntities(predica.channelTitle)
                        : predica.pastor}
                      {predica.timeAgo && ` • ${predica.timeAgo}`}
                      {predica.date && ` • ${predica.date}`}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="section-footer">
          <a href="/predicas" className="btn btn-primary">
            VER MÁS PRÉDICAS
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
