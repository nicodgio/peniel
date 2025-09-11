import React, { useState } from 'react';

const About = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    url: `/imgs/about/${i + 1}.jpeg`,
    thumbnail: `/imgs/about/${i + 1}.jpeg`,
    title: `Momento ${i + 1}`,
    description: `Descripción de la imagen ${i + 1}`
  }));

  const estadisticas = [
    { numero: "15+", label: "Años de ministerio" },
    { numero: "300+", label: "Miembros activos" },
    { numero: "9", label: "Proyectos misioneros" },
    { numero: "8", label: "Ministerios" }
  ];

  const openModal = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="about-page-clean">
      
      <section className="hero-clean">
        <div className="container-clean">
          <h1>Quiénes Somos</h1>
          <p>Iglesia Peniel Madrid</p>
        </div>
      </section>

      <section className="section-clean">
        <div className="container-clean">
          <div className="grid-2col">
            <div>
              <h2>Nuestra Historia</h2>
              <div className="text-block">
                <p>
                  Desde 2009, Iglesia Peniel Madrid ha sido un faro de esperanza en el corazón de la capital española. 
                  Comenzamos como un pequeño grupo de familias con la visión de establecer una iglesia que honrara a Dios 
                  y sirviera a la comunidad madrileña.
                </p>
                <p>
                  A lo largo de estos 15 años, hemos sido testigos del poder transformador del evangelio en centenares de vidas. 
                  Lo que inició como una reunión en hogares, ha crecido hasta convertirse en una comunidad vibrante 
                  de más de 300 miembros activos.
                </p>
              </div>
            </div>
            <div className="stats-container">
              <div className="stats-grid-clean">
                {estadisticas.map((stat, index) => (
                  <div key={index} className="stat-item-clean">
                    <div className="stat-number-clean">{stat.numero}</div>
                    <div className="stat-label-clean">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-section-animated">
        <div className="container-clean">
          <div className="vision-container">
            <h2 className="vision-title">Nuestra Visión</h2>
            <div className="vision-cards">
              <div className="vision-card">
                <div className="vision-icon">
                  <i className="fas fa-cross"></i>
                </div>
                <h3>Impactar Madrid</h3>
                <p>Una iglesia que transforme la capital española con el amor de Cristo</p>
              </div>
              <div className="vision-card">
                <div className="vision-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Formar Discípulos</h3>
                <p>Personas comprometidas que transformen su entorno con el evangelio</p>
              </div>
              <div className="vision-card">
                <div className="vision-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3>Alcanzar Naciones</h3>
                <p>Una iglesia multiplicadora que envíe misioneros a todo el mundo</p>
              </div>
            </div>
            <div className="vision-text-main">
              <p>
                Visualizamos una comunidad donde cada persona, sin importar su trasfondo, pueda encontrar 
                su propósito en Dios, crecer en su fe y ser equipada para impactar su esfera de influencia. 
                Aspiramos a ser una iglesia relevante, accesible y centrada en la Palabra de Dios.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section-cards">
        <div className="gallery-full-width">
          <h2>Momentos que nos definen</h2>
          
          <div className="gallery-cards-container">
            <div className="gallery-cards-wrapper" id="galleryCardsWrapper">
              {images.map((image, index) => (
                <div 
                  key={image.id} 
                  className="gallery-card"
                  onClick={window.innerWidth > 768 ? () => openModal(index) : undefined}
                >
                  <div className="card-image">
                    <img src={image.url} alt={image.title} />
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="gallery-nav-btn gallery-nav-prev"
              onClick={() => {
                const wrapper = document.getElementById('galleryCardsWrapper');
                const cardWidth = window.innerWidth <= 768 ? 300 : 1500;
                wrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="gallery-nav-btn gallery-nav-next"
              onClick={() => {
                const wrapper = document.getElementById('galleryCardsWrapper');
                const cardWidth = window.innerWidth <= 768 ? 300 : 1500;
                wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="section-clean bg-light">
        <div className="container-clean">
          <h2 className="section-title-centered">Nuestros Valores</h2>
          <div className="valores-grid-clean">
            <div className="valor-item-clean">
              <div className="valor-icon-clean">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Amor</h3>
              <p>Amamos a Dios sobre todas las cosas y extendemos ese amor a nuestro prójimo sin condiciones.</p>
            </div>
            <div className="valor-item-clean">
              <div className="valor-icon-clean">
                <i className="fas fa-users"></i>
              </div>
              <h3>Comunidad</h3>
              <p>Creemos en la importancia de la vida en comunidad, donde nos edificamos mutuamente.</p>
            </div>
            <div className="valor-item-clean">
              <div className="valor-icon-clean">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Crecimiento</h3>
              <p>Buscamos el crecimiento espiritual continuo a través del estudio de la Palabra y la oración.</p>
            </div>
            <div className="valor-item-clean">
              <div className="valor-icon-clean">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Misión</h3>
              <p>Estamos comprometidos con la Gran Comisión de hacer discípulos en Madrid y el mundo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-clean">
        <div className="container-clean">
          <h2 className="section-title-centered">Familia Pastoral</h2>
          
          <div className="pastoral-grid">
            <div className="pastor-card-clean">
              <div className="pastor-image-clean">
                <img src="/imgs/about/Pastores.png" alt="Pastor Julio Ortega" />
              </div>
              <div className="pastor-content">
                <h3>Pastor Julio Ortega</h3>
                <p className="pastor-role">Pastor Principal</p>
                <p>
                  Con más de 20 años de experiencia en el ministerio, el Pastor Julio ha sido fundamental 
                  en el crecimiento y desarrollo de Peniel Madrid. Su pasión por la enseñanza bíblica y 
                  el cuidado pastoral ha impactado centenares de vidas en nuestra comunidad.
                </p>
              </div>
            </div>
            
            <div className="pastoral-text">
              <h3>Un Liderazgo Comprometido</h3>
              <div className="text-block">
                <p>
                  Nuestra familia pastoral está compuesta por líderes íntegros y comprometidos que han sido 
                  llamados por Dios para servir a esta congregación. Cada miembro del equipo pastoral aporta 
                  sus dones únicos y experiencia ministerial para el cuidado, la enseñanza y el desarrollo 
                  espiritual de nuestra iglesia.
                </p>
                <p>
                  Creemos en un liderazgo plural y colaborativo, donde las decisiones se toman en unidad y 
                  bajo la dirección del Espíritu Santo. Nuestros pastores no solo predican desde el púlpito, 
                  sino que viven entre la congregación, compartiendo sus alegrías y tristezas.
                </p>
                <p>
                  El equipo pastoral está disponible para el cuidado espiritual, consejería, oración y 
                  acompañamiento en los momentos más importantes de la vida. Su compromiso va más allá del 
                  domingo; es una dedicación de vida completa al llamado que Dios les ha dado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-clean bg-light">
        <div className="container-clean">
          <div className="contact-clean">
            <h2>¿Te gustaría conocernos?</h2>
            <p>Nos encantaría tenerte como parte de nuestra familia</p>
            <div className="buttons-clean">
              <a href="/contacto" className="btn-clean primary">Contáctanos</a>
              <a href="/reuniones" className="btn-clean secondary">Visítanos</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;