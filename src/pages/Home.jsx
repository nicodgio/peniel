import React, { useState, useEffect } from "react";
import { useYouTubeVideos } from "../hooks/useYoutubeVideos";
import "../css/inicio/home.css";

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [ministerios, setMinisterios] = useState([]);
  const [liveStream, setLiveStream] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [menuForm, setMenuForm] = useState({
    nombre: "",
    telefono: "",
    cantidad: 1,
    forma_pago: "efectivo",
  });
  const [comprobante, setComprobante] = useState(null);
  const [comprobantePreview, setComprobantePreview] = useState(null);
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
    fetchMinisterios();
    fetchLiveStream();

    const liveStreamInterval = setInterval(() => {
      fetchLiveStream();
    }, 30000);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(liveStreamInterval);
    };
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await fetch("https://penielmadrid.es/api/eventos.php");
      const data = await response.json();
      if (data.success) {
        setEventos(data.eventos.slice(0, 3));
      }
    } catch (error) {
      console.error("Error cargando eventos:", error);
    }
  };

  const fetchMinisterios = async () => {
    try {
      const response = await fetch("https://penielmadrid.es/api/ministerios.php");
      const data = await response.json();
      if (data.success) {
        setMinisterios(data.ministerios);
      }
    } catch (error) {
      console.error("Error cargando ministerios:", error);
    }
  };

  const fetchLiveStream = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`https://penielmadrid.es/api/live-stream.php?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const data = await response.json();
      
      if (data.success && data.live && data.live.activo === 1) {
        setLiveStream(data.live);
      } else {
        setLiveStream(null);
      }
    } catch (error) {
      console.error("Error cargando transmisión en vivo:", error);
      setLiveStream(null);
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMessage("");

    try {
      const formData = new FormData();
      formData.append("nombre", menuForm.nombre);
      formData.append("telefono", menuForm.telefono);
      formData.append("cantidad", menuForm.cantidad);
      formData.append("forma_pago", menuForm.forma_pago);
      
      if (menuForm.forma_pago === "bizum" && comprobante) {
        formData.append("comprobante", comprobante);
      }

      const response = await fetch(
        "https://penielmadrid.es/api/menu-registro.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setFormMessage("¡Registro exitoso! Nos vemos el domingo.");
        setMenuForm({ nombre: "", telefono: "", cantidad: 1, forma_pago: "efectivo" });
        setComprobante(null);
        setComprobantePreview(null);
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

  const handleComprobanteChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormMessage("Por favor selecciona una imagen válida");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setFormMessage("La imagen no debe superar los 5MB");
        return;
      }
      
      setComprobante(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setComprobantePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeComprobante = () => {
    setComprobante(null);
    setComprobantePreview(null);
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

      {liveStream && liveStream.activo === 1 && (
        <section className="live-stream">
          <div className="live-stream-container">
            <div className="live-badge">
              <span className="live-dot"></span>
              TRANSMISIÓN EN VIVO
            </div>
            
            <div className="live-content">
              <div className="live-info">
                <h2 className="live-title">{liveStream.titulo}</h2>
                {liveStream.descripcion && (
                  <p className="live-description">{liveStream.descripcion}</p>
                )}
              </div>
              
              <div className="live-video-wrapper">
                <iframe
                  key={liveStream.id}
                  src={`${liveStream.url_embed}?t=${Date.now()}`}
                  title="Transmisión en vivo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      )}

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
          {ministerios.map((ministerio) => (
            <div key={ministerio.id} className="ministerio-card">
              <div 
                className="ministerio-img"
                style={{
                  backgroundImage: ministerio.imagen 
                    ? `url(${ministerio.imagen})` 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              ></div>
              <div className="ministerio-content">
                <div className="ministerio-meta">
                  {ministerio.frecuencia && (
                    <span>
                      <i className="far fa-calendar"></i>
                      {ministerio.frecuencia}
                    </span>
                  )}
                  {ministerio.horario && (
                    <span>
                      <i className="far fa-clock"></i>
                      {ministerio.horario}
                    </span>
                  )}
                </div>
                <h3>{ministerio.nombre}</h3>
                <p>{ministerio.descripcion}</p>
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

              <div className="form-group">
                <label>Forma de pago *</label>
                <select
                  name="forma_pago"
                  value={menuForm.forma_pago}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="bizum">Bizum</option>
                </select>
              </div>

              {menuForm.forma_pago === "bizum" && (
                <>
                  <div className="bizum-info">
                    <i className="fas fa-mobile-alt"></i>
                    <div>
                      <strong>Código 07145</strong>
                      <span>Opción "donativo"</span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Comprobante de pago (opcional)</label>
                    <div className="file-upload-container">
                      {!comprobantePreview ? (
                        <label className="file-upload-label">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleComprobanteChange}
                            className="file-upload-input"
                          />
                          <div className="file-upload-box">
                            <i className="fas fa-cloud-upload-alt"></i>
                            <span>Subir comprobante</span>
                            <small>JPG, PNG o GIF (máx. 5MB)</small>
                          </div>
                        </label>
                      ) : (
                        <div className="comprobante-preview">
                          <img src={comprobantePreview} alt="Comprobante" />
                          <button
                            type="button"
                            onClick={removeComprobante}
                            className="remove-comprobante"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      )}
                    </div>
                    <small className="form-help">
                      Envía tu comprobante de Bizum para agilizar tu registro
                    </small>
                  </div>
                </>
              )}

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
                      <i class="fas fa-play"></i>
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