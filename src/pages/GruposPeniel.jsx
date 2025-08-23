import React from 'react';

const GruposPeniel = () => {
  const beneficios = [
    {
      icono: "fas fa-heart",
      titulo: "Relaciones Auténticas",
      descripcion: "Crea vínculos profundos y duraderos con personas que comparten tu fe y valores."
    },
    {
      icono: "fas fa-book-open",
      titulo: "Crecimiento Espiritual",
      descripcion: "Estudia la Biblia en un ambiente íntimo donde puedes hacer preguntas y compartir."
    },
    {
      icono: "fas fa-hands-helping",
      titulo: "Apoyo Mutuo",
      descripcion: "Encuentra apoyo en los momentos difíciles y celebra las victorias juntos."
    },
    {
      icono: "fas fa-home",
      titulo: "Ambiente Familiar",
      descripcion: "Disfruta de la calidez de un hogar donde te sientes como en familia."
    },
    {
      icono: "fas fa-users",
      titulo: "Comunidad Cercana",
      descripcion: "Conecta con vecinos y personas de tu zona en un ambiente relajado."
    },
    {
      icono: "fas fa-seedling",
      titulo: "Discipulado Personal",
      descripcion: "Recibe mentorías y acompañamiento en tu crecimiento como cristiano."
    }
  ];

  const testimonios = [
    {
      nombre: "María González",
      grupo: "Grupo Mujeres - Las Rosas",
      testimonio: "En mi grupo he encontrado hermanas que me apoyan y con las que puedo ser completamente transparente. Hemos crecido juntas en fe y amistad.",
      foto: "M"
    },
    {
      nombre: "Carlos y Ana Martín",
      grupo: "Grupo Matrimonios - García Noblejas",
      testimonio: "Nuestro matrimonio se ha fortalecido enormemente. Aprender junto a otras parejas nos ha dado herramientas para enfrentar los desafíos.",
      foto: "C"
    },
    {
      nombre: "Javier Ruiz",
      grupo: "Grupo Jóvenes - Argüelles", 
      testimonio: "Encontré mi lugar en la iglesia. Aquí puedo ser yo mismo y crecer espiritualmente con personas de mi edad que entienden mis luchas.",
      foto: "J"
    }
  ];

  const tiposGrupos = [
    {
      tipo: "Mujeres",
      descripcion: "Espacios seguros para mujeres de todas las edades donde compartir experiencias, orar unas por otras y crecer en sabiduría bíblica.",
      horarios: "Diferentes opciones de mañana y tarde",
      icono: "fas fa-venus"
    },
    {
      tipo: "Hombres", 
      descripcion: "Hermandad masculina centrada en el crecimiento espiritual, liderazgo bíblico y apoyo mutuo en los desafíos de la vida.",
      horarios: "Principalmente tardes y noches",
      icono: "fas fa-mars"
    },
    {
      tipo: "Matrimonios",
      descripcion: "Parejas que se reúnen para fortalecer sus matrimonios a través de principios bíblicos y la experiencia compartida.",
      horarios: "Fines de semana y tardes",
      icono: "fas fa-heart"
    },
    {
      tipo: "Jóvenes",
      descripcion: "Dinámicas reuniones para jóvenes de 18-35 años enfocadas en propósito, relaciones y crecimiento profesional desde la fe.",
      horarios: "Tardes y noches entre semana",
      icono: "fas fa-rocket"
    },
    {
      tipo: "Adolescentes",
      descripcion: "Grupos especiales para adolescentes de 12-18 años con actividades, juegos y enseñanzas relevantes para su edad.",
      horarios: "Tardes después del instituto",
      icono: "fas fa-graduation-cap"
    },
    {
      tipo: "Mixtos",
      descripcion: "Grupos diversos con hombres y mujeres de diferentes edades, perfectos para quienes buscan variedad generacional.",
      horarios: "Horarios flexibles",
      icono: "fas fa-users"
    }
  ];

  return (
    <div className="page-content">
      <section className="grupos-peniel-page">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        {/* Hero Section */}
        <div className="grupos-hero">
          <div className="section-header">
            <h2 className="section-title">GRUPOS PENIEL</h2>
            <p className="section-subtitle">
              La iglesia más allá de las cuatro paredes
            </p>
          </div>
          
          <div className="hero-content">
            <div className="hero-text">
              <h3>Vida en Comunidad</h3>
              <p>
                Los Grupos Peniel son el corazón de nuestra iglesia. Pequeñas comunidades 
                que se reúnen en hogares para compartir la vida, estudiar la Palabra de Dios 
                y crecer juntos en fe. Aquí es donde nacen las amistades más profundas y 
                donde experimentas el verdadero significado de la familia de Dios.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="number">16+</span>
                  <span className="label">Grupos Activos</span>
                </div>
                <div className="stat">
                  <span className="number">200+</span>
                  <span className="label">Participantes</span>
                </div>
                <div className="stat">
                  <span className="number">12</span>
                  <span className="label">Zonas de Madrid</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-placeholder">
                <i className="fas fa-home"></i>
              </div>
            </div>
          </div>
        </div>

        {/* ¿Qué son? */}
        <div className="que-son-section">
          <div className="section-container">
            <h3>¿Qué son los Grupos Peniel?</h3>
            <div className="descripcion-grid">
              <div className="descripcion-card">
                <div className="card-icon">
                  <i className="fas fa-home"></i>
                </div>
                <h4>En Hogares</h4>
                <p>
                  Nos reunimos en casas de familia, creando un ambiente cálido 
                  y acogedor donde todos se sienten como en casa.
                </p>
              </div>
              
              <div className="descripcion-card">
                <div className="card-icon">
                  <i className="fas fa-calendar-week"></i>
                </div>
                <h4>Semanalmente</h4>
                <p>
                  Encuentros regulares que crean consistencia y permiten 
                  construir relaciones profundas a lo largo del tiempo.
                </p>
              </div>
              
              <div className="descripcion-card">
                <div className="card-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h4>Grupos Pequeños</h4>
                <p>
                  Entre 8-15 personas por grupo, el tamaño perfecto para que 
                  todos puedan participar y conocerse realmente.
                </p>
              </div>
              
              <div className="descripcion-card">
                <div className="card-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h4>Cerca de Ti</h4>
                <p>
                  Grupos distribuidos por toda Madrid para que encuentres 
                  uno cerca de tu zona y puedas asistir cómodamente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <div className="beneficios-section">
          <div className="section-container">
            <h3>¿Por qué unirte a un Grupo Peniel?</h3>
            <div className="beneficios-grid">
              {beneficios.map((beneficio, index) => (
                <div key={index} className="beneficio-card">
                  <div className="beneficio-icon">
                    <i className={beneficio.icono}></i>
                  </div>
                  <h4>{beneficio.titulo}</h4>
                  <p>{beneficio.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tipos de Grupos */}
        <div className="tipos-section">
          <div className="section-container">
            <h3>Encuentra tu Grupo Ideal</h3>
            <div className="tipos-grid">
              {tiposGrupos.map((grupo, index) => (
                <div key={index} className="tipo-card">
                  <div className="tipo-header">
                    <div className="tipo-icon">
                      <i className={grupo.icono}></i>
                    </div>
                    <h4>{grupo.tipo}</h4>
                  </div>
                  <p className="tipo-descripcion">{grupo.descripcion}</p>
                  <div className="tipo-horarios">
                    <i className="far fa-clock"></i>
                    <span>{grupo.horarios}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="testimonios-section">
          <div className="section-container">
            <h3>Lo que dicen nuestros miembros</h3>
            <div className="testimonios-grid">
              {testimonios.map((testimonio, index) => (
                <div key={index} className="testimonio-card">
                  <div className="testimonio-foto">
                    {testimonio.foto}
                  </div>
                  <div className="testimonio-content">
                    <p>"{testimonio.testimonio}"</p>
                    <div className="testimonio-autor">
                      <strong>{testimonio.nombre}</strong>
                      <span>{testimonio.grupo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cómo funciona */}
        <div className="como-funciona-section">
          <div className="section-container">
            <h3>¿Cómo funciona una reunión?</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-icon">
                  <i className="fas fa-door-open"></i>
                </div>
                <div className="timeline-content">
                  <h4>Bienvenida (15 min)</h4>
                  <p>Café, conversación y ponerse al día con la vida de cada uno.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <i className="fas fa-music"></i>
                </div>
                <div className="timeline-content">
                  <h4>Adoración (15 min)</h4>
                  <p>Tiempo de alabanza y adoración en un ambiente íntimo.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                <div className="timeline-content">
                  <h4>Estudio Bíblico (45 min)</h4>
                  <p>Estudio participativo de la Palabra con aplicación práctica.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <i className="fas fa-praying-hands"></i>
                </div>
                <div className="timeline-content">
                  <h4>Oración (15 min)</h4>
                  <p>Compartimos peticiones y oramos unos por otros.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>¿Listo para dar el siguiente paso?</h3>
            <p>
              No esperes más para ser parte de una comunidad que te ayudará a crecer 
              en tu fe y te dará una familia espiritual para toda la vida.
            </p>
            <div className="cta-buttons">
              <a href="/contacto" className="btn btn-primary">
                <i className="fas fa-phone"></i> CONTACTAR
              </a>
              <a href="https://wa.me/34609377944" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <i className="fab fa-whatsapp"></i> WHATSAPP
              </a>
            </div>
            <p className="cta-note">
              Contáctanos y te ayudaremos a encontrar el grupo perfecto para ti
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GruposPeniel;