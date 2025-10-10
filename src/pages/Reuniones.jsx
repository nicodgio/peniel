import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/inicio/reuniones.css";

const Reuniones = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const images = Array.from({ length: 26 }, (_, i) => {
    const imageNumber = i + 1;
    const extension = imageNumber <= 18 ? "jpeg" : "jpg";
    return {
      id: imageNumber,
      url: `/imgs/about/${imageNumber}.${extension}`,
      title: `Momento ${imageNumber}`,
    };
  });

  useEffect(() => {
    const wrapper = document.querySelector(".gallery-cards-wrapper");
    if (!wrapper) return;

    let scrollLeft = 0;
    const scrollSpeed = 0.3;
    let animationId;
    let lastManualScroll = 0;

    const scroll = () => {
      const currentTime = Date.now();

      if (currentTime - lastManualScroll > 2000) {
        scrollLeft += scrollSpeed;
        wrapper.scrollLeft = scrollLeft;

        if (scrollLeft >= wrapper.scrollWidth / 2) {
          scrollLeft = 0;
          wrapper.scrollLeft = 0;
        }
      } else {
        scrollLeft = wrapper.scrollLeft;
      }

      animationId = requestAnimationFrame(scroll);
    };

    const handleManualScroll = () => {
      lastManualScroll = Date.now();
    };

    window.scrollGalleryLeft = () => {
      handleManualScroll();
      wrapper.scrollBy({ left: -300, behavior: "smooth" });
    };

    window.scrollGalleryRight = () => {
      handleManualScroll();
      wrapper.scrollBy({ left: 300, behavior: "smooth" });
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      delete window.scrollGalleryLeft;
      delete window.scrollGalleryRight;
    };
  }, []);

  const scrollHorariosCarousel = (direction) => {
    const carousel = document.getElementById("horariosCarousel");
    const cardWidth = isMobile ? window.innerWidth - 40 : 300;
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  const horarios = [
    {
      dia: "Domingos",
      hora: "11:00hs",
      tipo: "Culto Dominical",
      descripcion:
        "Te invitamos a compartir un tiempo de fe, adoración y comunidad. ¡Eres bienvenido!",
      icono: "fas fa-church",
    },
    {
      dia: "Sábados",
      hora: "19:00hs",
      tipo: "Reunión de Jóvenes",
      descripcion:
        "Un espacio para conectar con otros, compartir, aprender y crecer en la fe. Si eres joven o adolescente, ¡Te esperamos!",
      icono: "fas fa-users",
    },
    {
      dia: "Martes",
      hora: "20:00hs",
      tipo: "Reunión de Oración",
      descripcion: "Vía Zoom - Contacta al móvil de secretaría",
      icono: "fas fa-video",
    },
    {
      dia: "Miércoles",
      hora: "19:00hs",
      tipo: "Evangelismo",
      descripcion: "Centro Comercial Alcalá Norte",
      icono: "fas fa-heart",
    },
  ];

  const transporteInfo = [
    {
      tipo: "Metro",
      detalle: "Línea 7 - Estación García Noblejas",
      tiempo: "5 min caminando",
      icono: "fas fa-subway",
    },
    {
      tipo: "Autobús",
      detalle: "Líneas 28, 38 y 70",
      tiempo: "Parada cercana",
      icono: "fas fa-bus",
    },
    {
      tipo: "Coche",
      detalle: "Aparcamiento gratuito disponible",
      tiempo: "Zona blanca",
      icono: "fas fa-car",
    },
  ];

  return (
    <div className={`reuniones-page ${isVisible ? "loaded" : ""}`}>
      <section className="reuniones-hero">
        <div className="container-clean">
          <h1>Nuestras reuniones</h1>
          <p>
            Si quieres visitarnos y ser parte de esta gran familia, ¡eres
            bienvenido!
          </p>
        </div>
      </section>

      <section className="gallery-section-cards">
        <div className="gallery-full-width">
          <h2>Momentos que nos definen</h2>

          <div className="gallery-cards-container">
            <div className="gallery-cards-wrapper">
              {[...images, ...images].map((image, index) => (
                <div key={`${image.id}-${index}`} className="gallery-card">
                  <div className="card-image">
                    <img
                      src={image.url}
                      alt={image.title}
                      onError={(e) => {
                        const currentSrc = e.target.src;
                        if (currentSrc.includes(".jpeg")) {
                          e.target.src = currentSrc.replace(".jpeg", ".jpg");
                        } else if (currentSrc.includes(".jpg")) {
                          e.target.src = currentSrc.replace(".jpg", ".jpeg");
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              className="gallery-nav-btn gallery-nav-prev"
              onClick={() => {
                if (window.scrollGalleryLeft) {
                  window.scrollGalleryLeft();
                }
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="gallery-nav-btn gallery-nav-next"
              onClick={() => {
                if (window.scrollGalleryRight) {
                  window.scrollGalleryRight();
                }
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      <div className="reuniones-container">
        <section className="horarios-section">
          <div className="section-header">
            <h2>Horarios de Reuniones</h2>
            <div className="header-line"></div>
          </div>

          {isMobile ? (
            <>
              <div className="horarios-carousel" id="horariosCarousel">
                {horarios.map((horario, index) => (
                  <div key={index} className="horario-card">
                    <div className="card-top">
                      <div className="horario-icon">
                        <i className={horario.icono}></i>
                      </div>
                      <div className="horario-time">
                        <span className="dia">{horario.dia}</span>
                        {horario.hora && (
                          <span className="hora">{horario.hora}</span>
                        )}
                      </div>
                    </div>
                    <div className="card-content">
                      <h3>{horario.tipo}</h3>
                      <p>{horario.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="horarios-carousel-controls">
                <button
                  className="horarios-carousel-btn"
                  onClick={() => scrollHorariosCarousel(-1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="horarios-carousel-btn"
                  onClick={() => scrollHorariosCarousel(1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </>
          ) : (
            <div className="horarios-grid">
              {horarios.map((horario, index) => (
                <div
                  key={index}
                  className="horario-card"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="card-top">
                    <div className="horario-icon">
                      <i className={horario.icono}></i>
                    </div>
                    <div className="horario-time">
                      <span className="dia">{horario.dia}</span>
                      {horario.hora && (
                        <span className="hora">{horario.hora}</span>
                      )}
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{horario.tipo}</h3>
                    <p>{horario.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="grupos-section">
          <div className="grupos-wrapper">
            <div className="grupos-image">
              <img
                src="/imgs/ministerios/grupospeniel.jpeg"
                alt="Grupos Peniel"
              />
              <div className="image-overlay"></div>
            </div>
            <div className="grupos-content">
              <div className="grupos-badge">
                <i className="fas fa-users"></i>
                <span>Comunidad</span>
              </div>
              <h3>Grupos Peniel</h3>
              <p>
                Conecta, crece y comparte en nuestros grupos pequeños. Una
                experiencia de fe auténtica donde cada persona importa.
              </p>
              <div className="grupos-features">
                <div className="feature">
                  <i className="fas fa-calendar-week"></i>
                  <span>Reuniones semanales</span>
                </div>
                <div className="feature">
                  <i className="fas fa-heart"></i>
                  <span>Ambiente familiar</span>
                </div>
                <div className="feature">
                  <i className="fas fa-book-open"></i>
                  <span>Estudio bíblico</span>
                </div>
              </div>
              <Link to="/grupos-peniel" className="btn-grupos">
                Únete ahora
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>

        <section className="ubicacion-section">
          <div className="section-header">
            <h2>Visítanos</h2>
            <div className="header-line"></div>
          </div>

          <div className="ubicacion-layout">
            <div className="direccion-y-mapa">
              <div className="direccion-info">
                <div className="direccion-pin">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="direccion-detalles">
                  <h3>Calle Miguel Fleta 11</h3>
                  <p>28037 Ciudad Lineal, Madrid</p>
                  <span>Fácil acceso en transporte público</span>
                </div>
              </div>

              <div className="mapa-moderno">
                <div className="mapa-overlay">
                  <a
                    href="https://www.google.com/maps/place/C.+de+Miguel+Fleta,+11,+San+Blas-Canillejas,+28037+Madrid,+España/@40.432151,-3.631486,16z/data=!4m6!3m5!1s0xd422f72711cfea9:0x33f8534cc9869da9!8m2!3d40.4321506!4d-3.6314863!16s%2Fg%2F11c1yks2yr?hl=es-419&entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mapa-link"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    Abrir en Google Maps
                  </a>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.947988960281!2d-3.634061223578483!3d40.43215057143719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f72711cfea9%3A0x33f8534cc9869da9!2sC.%20de%20Miguel%20Fleta%2C%2011%2C%20San%20Blas-Canillejas%2C%2028037%20Madrid%2C%20Espa%C3%B1a!5e0!3m2!1ses-419!2smx!4v1754721691771!5m2!1ses-419!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="transporte-moderno">
              <h4>Cómo llegar</h4>
              <div className="transporte-cards">
                {transporteInfo.map((transporte, index) => (
                  <div
                    key={index}
                    className="transporte-item"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="transporte-icon">
                      <i className={transporte.icono}></i>
                    </div>
                    <div className="transporte-details">
                      <h5>{transporte.tipo}</h5>
                      <p>{transporte.detalle}</p>
                      <span className="tiempo">{transporte.tiempo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reuniones;
