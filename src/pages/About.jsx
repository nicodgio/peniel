import React, { useState } from 'react';
import '../css/inicio/about.css';

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
    { numero: "24+", label: "Años de historia" },
    { numero: "300+", label: "Miembros activos" },
    { numero: "11", label: "Ministerios activos" },
    { numero: "4", label: "Pasos de discipulado" }
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
          <p>Peniel Comunidad Cristiana</p>
        </div>
      </section>

      <section className="section-clean">
        <div className="container-clean">
          <div className="grid-2col">
            <div>
              <h2>Nuestra Identidad</h2>
              <div className="text-block">
                <p>
                  <strong>Peniel Comunidad Cristiana</strong> es una iglesia evangélica en el distrito 
                  de Ciudad Lineal (Madrid), parte de las <strong>Asambleas de Dios de España</strong> e 
                  inscrita en el Registro de Entidades Religiosas (Nº 025312).
                </p>
                <p>
                  Nuestra pasión es <strong>amar a Dios, servir a las personas y anunciar a 
                  Jesucristo</strong> para que muchos experimenten una vida nueva en Él.
                </p>
                <p>
                  Desde el año 2000, hemos sido testigos del poder transformador del evangelio 
                  en centenares de vidas. Lo que comenzó como reuniones en hogares y garajes, 
                  ha crecido hasta convertirse en una comunidad vibrante con 11 ministerios activos 
                  que sirven a diferentes edades y necesidades.
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

      <section className="section-clean bg-light">
        <div className="container-clean">
          <h2 className="section-title-centered">Nuestra Historia</h2>
          
          <div className="history-timeline">
            <div className="history-item">
              <div className="history-year">2000</div>
              <div className="history-content">
                <div className="history-image">
                  <img src="/imgs/about/victor_janet.png" alt="Victor y Janet Hedman" />
                </div>
                <div className="history-text">
                  <h3>Los Pioneros</h3>
                  <h4>Victor y Janet Hedman</h4>
                  <p>
                    La historia de Peniel Madrid comienza cuando los misioneros estadounidenses 
                    Victor y Janet Hedman, tras años de servicio en Argentina y Paraguay, 
                    recibieron de parte de Dios el llamado a fundar una iglesia en Madrid. 
                    Las primeras reuniones fueron en hoteles y en el garaje de su casa, 
                    hasta que en 2002 se alquiló el primer local en la calle Rufino González.
                  </p>
                </div>
              </div>
            </div>

            <div className="history-item reverse">
              <div className="history-year">2003</div>
              <div className="history-content">
                <div className="history-image">
                  <img src="/imgs/about/juan_fiona.png" alt="Juan Carlos Escobar y Fiona Belshaw" />
                </div>
                <div className="history-text">
                  <h3>Etapa de Crecimiento</h3>
                  <h4>Juan Carlos Escobar y Fiona Belshaw</h4>
                  <p>
                    En 2003, los pastores Juan Carlos Escobar y Fiona Belshaw asumieron 
                    el liderazgo, impulsando una nueva etapa de crecimiento que llevó a 
                    la iglesia a diferentes locales, hasta establecerse en 2015 en la 
                    calle Miguel Fleta 11.
                  </p>
                </div>
              </div>
            </div>

            <div className="history-item">
              <div className="history-year">2017</div>
              <div className="history-content">
                <div className="history-image">
                  <img src="/imgs/about/Pastores.png" alt="Julio Ortega y Ethel Bayona" />
                </div>
                <div className="history-text">
                  <h3>El Presente</h3>
                  <h4>Julio Ortega y Ethel Bayona</h4>
                  <p>
                    Tras un tiempo de oración y dirección de Dios, en 2017 los pastores 
                    Julio Ortega y Ethel Bayona fueron consagrados y tomaron el testigo 
                    pastoral. Con un corazón pastoral y un fuerte compromiso con la 
                    enseñanza bíblica, lideran la iglesia junto a un equipo de ministros 
                    y líderes que trabajan en unidad para edificar la familia de la fe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faith-section">
        <div className="container-clean">
          <h2 className="section-title-centered">Nuestra Fe</h2>
          <p className="faith-intro">En Peniel creemos y afirmamos la fe cristiana basada en la Biblia:</p>
          
          <div className="faith-grid">
            <div className="faith-card">
              <div className="faith-icon">
                <i className="fas fa-bible"></i>
              </div>
              <h4>La Biblia</h4>
              <p>Como Palabra inspirada de Dios</p>
            </div>
            
            <div className="faith-card">
              <div className="faith-icon">
                <i className="fas fa-cross"></i>
              </div>
              <h4>Dios Trino</h4>
              <p>Padre, Hijo y Espíritu Santo</p>
            </div>
            
            <div className="faith-card">
              <div className="faith-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h4>Jesucristo</h4>
              <p>Como único y suficiente Salvador</p>
            </div>
            
            <div className="faith-card">
              <div className="faith-icon">
                <i className="fas fa-hands-praying"></i>
              </div>
              <h4>Salvación</h4>
              <p>Por gracia, mediante la fe</p>
            </div>
            
            <div className="faith-card">
              <div className="faith-icon">
                <i className="fas fa-dove"></i>
              </div>
              <h4>Espíritu Santo</h4>
              <p>Su poder para transformar vidas</p>
            </div>
            
            <div className="faith-card">
              <div className="faith-icon">
                <i className="fas fa-church"></i>
              </div>
              <h4>La Iglesia</h4>
              <p>Como cuerpo de Cristo, llamada a hacer discípulos</p>
            </div>
            
            <div className="faith-card">
              <div className="faith-icon">
                <i className="fas fa-crown"></i>
              </div>
              <h4>Segunda Venida</h4>
              <p>La esperanza en el regreso de Cristo</p>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-section-animated">
        <div className="container-clean">
          <div className="vision-container">
            <h2 className="vision-title">Nuestra Visión y Misión</h2>
            <p className="vision-subtitle">
              Siguiendo el mandato de Jesús en Mateo 28:19-20, nuestra visión es <strong>ser y hacer discípulos</strong>:
            </p>
            
            <div className="vision-cards">
              <div className="vision-card">
                <div className="vision-icon">
                  <span className="vision-number">1</span>
                </div>
                <h3>Ganar</h3>
                <p>Anunciar el evangelio a todas las personas</p>
              </div>
              
              <div className="vision-card">
                <div className="vision-icon">
                  <span className="vision-number">2</span>
                </div>
                <h3>Consolidar</h3>
                <p>Ayudar a los nuevos creyentes a afirmarse en la fe</p>
              </div>
              
              <div className="vision-card">
                <div className="vision-icon">
                  <span className="vision-number">3</span>
                </div>
                <h3>Discipular</h3>
                <p>Formar seguidores de Cristo comprometidos</p>
              </div>
              
              <div className="vision-card">
                <div className="vision-icon">
                  <span className="vision-number">4</span>
                </div>
                <h3>Enviar</h3>
                <p>Levantar obreros que alcancen a otros con el evangelio</p>
              </div>
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

      <section className="section-clean">
        <div className="container-clean">
          <h2 className="section-title-centered">Nuestros Valores</h2>
          <div className="valores-grid-clean">
            <div className="valor-item-clean">
              <div className="valor-icon-clean">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Amor</h3>
              <p>Amamos a Dios y extendemos ese amor a nuestro prójimo.</p>
            </div>
            <div className="valor-item-clean">
              <div className="valor-icon-clean">
                <i className="fas fa-users"></i>
              </div>
              <h3>Comunidad</h3>
              <p>Creemos en la vida en familia de fe.</p>
            </div>
            <div className="valor-item-clean">
              <div className="valor-icon-clean">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Crecimiento</h3>
              <p>Buscamos madurar espiritualmente a través de la Palabra y la oración.</p>
            </div>
            <div className="valor-item-clean">
              <div className="valor-icon-clean">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Misión</h3>
              <p>Estamos comprometidos con la Gran Comisión en Madrid y el mundo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-clean bg-light">
        <div className="container-clean">
          <h2 className="section-title-centered">Pastores Principales</h2>
          
          <div className="pastoral-grid">
            <div className="pastor-card-clean">
              <div className="pastor-image-clean">
                <img src="/imgs/about/Pastores.png" alt="Julio Ortega y Ethel Bayona" />
              </div>
              <div className="pastor-content">
                <h3>Julio Ortega y Ethel Bayona</h3>
                <p className="pastor-role">Pastores Principales</p>
                <p>
                  Desde 2017 sirven como pastores principales de Peniel Madrid. Con un 
                  corazón pastoral y un fuerte compromiso con la enseñanza bíblica, 
                  lideran la iglesia junto a un equipo de ministros y líderes que 
                  trabajan en unidad para edificar la familia de la fe.
                </p>
              </div>
            </div>
            
            <div className="pastoral-text">
              <h3 class="text-center">Un Liderazgo Comprometido</h3>
              <div className="text-block">
                <p>
                  Nuestra familia pastoral está compuesta por líderes íntegros y comprometidos 
                  que han sido llamados por Dios para servir a esta congregación. Cada miembro 
                  del equipo pastoral aporta sus dones únicos y experiencia ministerial para el 
                  cuidado, la enseñanza y el desarrollo espiritual de nuestra iglesia.
                </p>
                <p>
                  Creemos en un liderazgo plural y colaborativo, donde las decisiones se toman 
                  en unidad y bajo la dirección del Espíritu Santo. Nuestros pastores no solo 
                  predican desde el púlpito, sino que viven entre la congregación, compartiendo 
                  sus alegrías y tristezas.
                </p>
                <p>
                  El equipo pastoral está disponible para el cuidado espiritual, consejería, 
                  oración y acompañamiento en los momentos más importantes de la vida. Su 
                  compromiso va más allá del domingo; es una dedicación de vida completa al 
                  llamado que Dios les ha dado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-clean">
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