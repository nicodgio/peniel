import React from 'react';

const Reuniones = () => {
  const horarios = [
    {
      dia: "Domingos",
      hora: "11:00 HS",
      tipo: "Reunión General",
      descripcion: "Culto principal con adoración, enseñanza bíblica y comunión. Un espacio para toda la familia donde experimentamos la presencia de Dios juntos.",
      publico: "Toda la familia",
      icono: "fas fa-church"
    },
    {
      dia: "Sábados", 
      hora: "19:00 HS",
      tipo: "Peniel NG (Next Generation)",
      descripcion: "Reunión especial para jóvenes con música contemporánea, enseñanza relevante y actividades diseñadas para la nueva generación.",
      publico: "Jóvenes 12-35 años",
      icono: "fas fa-music"
    },
    {
      dia: "Domingos",
      hora: "11:00 HS", 
      tipo: "Peniel Kids",
      descripcion: "Programa especial para niños con enseñanza creativa, juegos y actividades adaptadas para cada edad durante el culto principal.",
      publico: "Niños 3-11 años",
      icono: "fas fa-child"
    },
    {
      dia: "Martes",
      hora: "21:00 HS",
      tipo: "Instituto Bíblico Peniel",
      descripcion: "Clases de formación teológica con material de Global University. Profundiza tu conocimiento de la Palabra de Dios.",
      publico: "Todos los niveles",
      icono: "fas fa-graduation-cap"
    },
    {
      dia: "Miércoles",
      hora: "19:00 HS",
      tipo: "Evangelismo",
      descripcion: "Salimos a las calles a compartir el amor de Cristo. Punto de encuentro: Centro Comercial Alcalá Norte.",
      publico: "Voluntarios",
      icono: "fas fa-heart"
    }
  ];

  const serviciosEspeciales = [
    {
      evento: "Santa Cena",
      frecuencia: "Primer domingo de cada mes",
      descripcion: "Celebramos la Santa Cena recordando el sacrificio de Cristo por nosotros."
    },
    {
      evento: "Noche de Oración",
      frecuencia: "Último viernes de cada mes",
      descripcion: "Una noche especial dedicada a la oración intercesora y adoración."
    },
    {
      evento: "Fiesta de las Naciones",
      frecuencia: "Anual",
      descripcion: "Celebración especial de nuestro compromiso misionero mundial."
    }
  ];

  return (
    <div className="page-content">
      <section className="reuniones-page">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        <div className="section-header">
          <h2 className="section-title">NUESTRAS REUNIONES</h2>
          <p className="section-subtitle">
            Espacios diseñados para encontrarte con Dios y crecer en comunidad
          </p>
        </div>

        <div className="reuniones-container">
          <div className="ubicacion-principal">
            <div className="ubicacion-info">
              <div className="ubicacion-header">
                <h3><i className="fas fa-map-marker-alt"></i> Nuestra Ubicación</h3>
                <div className="direccion">
                  <h4>Calle Miguel Fleta 11, 28037, Madrid</h4>
                  <p>Fácil acceso en transporte público y con aparcamiento disponible en la zona</p>
                </div>
              </div>
              
              <div className="transporte-info">
                <div className="transporte-item">
                  <i className="fas fa-subway"></i>
                  <div>
                    <strong>Metro:</strong>
                    <p>Línea 5 - Estación Canillejas (5 min caminando)</p>
                  </div>
                </div>
                <div className="transporte-item">
                  <i className="fas fa-bus"></i>
                  <div>
                    <strong>Autobús:</strong>
                    <p>Líneas 77, 104, 112 - Parada C.C. Alcalá Norte</p>
                  </div>
                </div>
                <div className="transporte-item">
                  <i className="fas fa-car"></i>
                  <div>
                    <strong>Coche:</strong>
                    <p>Aparcamiento gratuito en calles adyacentes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mapa-container">
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

          <div className="horarios-section">
            <h3>Horarios de Reuniones</h3>
            <div className="horarios-grid">
              {horarios.map((horario, index) => (
                <div key={index} className="horario-card">
                  <div className="horario-header">
                    <div className="horario-icon">
                      <i className={horario.icono}></i>
                    </div>
                    <div className="horario-tiempo">
                      <div className="dia">{horario.dia}</div>
                      <div className="hora">{horario.hora}</div>
                    </div>
                  </div>
                  
                  <div className="horario-content">
                    <h4>{horario.tipo}</h4>
                    <p className="descripcion">{horario.descripcion}</p>
                    <div className="publico">
                      <i className="fas fa-users"></i>
                      <span>{horario.publico}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="servicios-especiales">
            <h3>Servicios Especiales</h3>
            <div className="servicios-grid">
              {serviciosEspeciales.map((servicio, index) => (
                <div key={index} className="servicio-card">
                  <h4>{servicio.evento}</h4>
                  <div className="frecuencia">
                    <i className="far fa-calendar"></i>
                    <span>{servicio.frecuencia}</span>
                  </div>
                  <p>{servicio.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="informacion-adicional">
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-child"></i>
                </div>
                <h4>Cuidado de Niños</h4>
                <p>Ofrecemos cuidado profesional para bebés y niños pequeños durante las reuniones principales.</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-wheelchair"></i>
                </div>
                <h4>Accesibilidad</h4>
                <p>Nuestras instalaciones cuentan con acceso completo para personas con movilidad reducida.</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-wifi"></i>
                </div>
                <h4>WiFi Gratuito</h4>
                <p>Conexión a internet disponible para todos nuestros visitantes durante las reuniones.</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-coffee"></i>
                </div>
                <h4>Café de Comunión</h4>
                <p>Después de cada reunión compartimos un tiempo de café y comunión fraternal.</p>
              </div>
            </div>
          </div>

          <div className="primera-visita">
            <div className="primera-visita-content">
              <h3>¿Primera vez que nos visitas?</h3>
              <p>
                Sabemos que visitar una iglesia por primera vez puede generar algunas dudas. 
                Queremos que te sientas cómodo y bienvenido desde el primer momento.
              </p>
              
              <div className="que-esperar">
                <h4>¿Qué puedes esperar?</h4>
                <ul>
                  <li><i className="fas fa-clock"></i> Reuniones de aproximadamente 90 minutos</li>
                  <li><i className="fas fa-music"></i> Tiempo de adoración con música contemporánea</li>
                  <li><i className="fas fa-bible"></i> Enseñanza bíblica práctica y relevante</li>
                  <li><i className="fas fa-handshake"></i> Ambiente familiar y acogedor</li>
                  <li><i className="fas fa-coffee"></i> Tiempo de comunión después del servicio</li>
                </ul>
              </div>
              
              <div className="codigo-vestimenta">
                <h4>¿Cómo debo vestirme?</h4>
                <p>
                  Ven como te sientas cómodo. No hay un código de vestimenta específico. 
                  Lo importante es tu corazón, no tu ropa.
                </p>
              </div>
              
              <div className="contacto-visita">
                <a href="/contacto" className="btn btn-primary">
                  <i className="fas fa-phone"></i> CONTÁCTANOS
                </a>
                <a href="https://wa.me/34609377944" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fab fa-whatsapp"></i> WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reuniones;