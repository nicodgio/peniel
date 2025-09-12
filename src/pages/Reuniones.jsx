import React, { useState, useEffect } from 'react';
import '../css/inicio/reuniones.css';

const Reuniones = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const horarios = [
    {
      dia: "Domingos",
      hora: "11:00hs",
      tipo: "Reunión General",
      icono: "fas fa-church"
    },
    {
      dia: "Sábados", 
      hora: "19:00hs",
      tipo: "Jóvenes y Adolescentes",
      icono: "fas fa-users"
    },
    {
      dia: "Martes",
      hora: "20:00hs",
      tipo: "Reunión de Oración vía Zoom",
      descripcion: "Contacta al móvil de secretaría para unirte a la lista de difusión",
      icono: "fas fa-video"
    },
    {
      dia: "Miércoles",
      hora: "",
      tipo: "Evangelismo",
      descripcion: "Punto de encuentro: Centro Comercial Alcalá Norte",
      icono: "fas fa-heart"
    }
  ];

  const transporteInfo = [
    {
      tipo: "Metro",
      detalle: "Línea 7 - Estación García Noblejas",
      tiempo: "5 min caminando",
      icono: "fas fa-subway"
    },
    {
      tipo: "Autobús",
      detalle: "Líneas 28, 38 y 70",
      icono: "fas fa-bus"
    },
    {
      tipo: "Coche",
      detalle: "Aparcamiento gratuito en calles adyacentes",
      icono: "fas fa-car"
    }
  ];

  return (
    <div className={`reuniones-page ${isVisible ? 'loaded' : ''}`}>
      {/* Hero Section */}
      <section className="reuniones-hero">
        <div className="container-clean">
          <h1>Nuestras reuniones</h1>
          <p>Si quieres visitarnos y ser parte de esta gran familia, ¡eres bienvenido!</p>
        </div>
      </section>

      <div className="reuniones-container">
        {/* Horarios Section */}
        <section className="horarios-section">
          <div className="section-header">
            <h2>Horarios de Reuniones</h2>
          </div>

          <div className="horarios-grid">
            {horarios.map((horario, index) => (
              <div key={index} className="horario-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="horario-icon">
                  <i className={horario.icono}></i>
                </div>
                <div className="horario-content">
                  <div className="horario-time">
                    <span className="dia">{horario.dia}</span>
                    {horario.hora && <span className="hora">{horario.hora}</span>}
                  </div>
                  <h3>{horario.tipo}</h3>
                  {horario.descripcion && <p className="descripcion">{horario.descripcion}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grupos Peniel */}
        <section className="grupos-section">
          <div className="grupos-card">
            <div className="grupos-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="grupos-content">
              <h3>Grupos Peniel (semanales)</h3>
              <p>Participa en nuestros <strong>grupos pequeños</strong> y crece en comunidad.</p>
              <a href="#" className="formulario-link">→ formulario de inscripción</a>
            </div>
          </div>
        </section>

        {/* Ubicación Section */}
        <section className="ubicacion-section">
          <div className="section-content">
            <div className="ubicacion-info">
              <div className="section-header">
                <h2>
                  <i className="fas fa-map-marker-alt"></i>
                  Nuestra Ubicación
                </h2>
                <div className="direccion-principal">
                  <h3>Calle Miguel Fleta 11, 28037, Ciudad Lineal, Madrid</h3>
                  <p>Fácil acceso en transporte público y con aparcamiento disponible.</p>
                </div>
              </div>
              
              <div className="transporte-grid">
                {transporteInfo.map((transporte, index) => (
                  <div key={index} className="transporte-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="transporte-icon">
                      <i className={transporte.icono}></i>
                    </div>
                    <div className="transporte-content">
                      <h4>{transporte.tipo}</h4>
                      <p>{transporte.detalle}</p>
                      {transporte.tiempo && <span className="tiempo">{transporte.tiempo}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mapa-wrapper">
              <div className="mapa-container">
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reuniones;