import React from 'react';

const About = () => {
  return (
    <div className="page-content">
      <section className="quienes-somos">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        <div className="section-header">
          <h2 className="section-title">QUIÉNES SOMOS</h2>
          <p className="section-subtitle">
            Una comunidad de fe comprometida con transformar vidas y alcanzar Madrid para Cristo
          </p>
        </div>

        <div className="about-container">
          <div className="about-content">
            <div className="about-main">
              <h3>Una familia con propósito</h3>
              <p>
                Somos una iglesia cristiana evangélica ubicada en el corazón de Madrid, 
                comprometidos con el mensaje transformador del evangelio de Jesucristo. 
                Desde nuestros inicios, hemos sido una comunidad que cree en el poder 
                de Dios para cambiar vidas y restaurar familias.
              </p>
              <p>
                Nuestra pasión es crear un ambiente donde cada persona pueda experimentar 
                el amor incondicional de Dios, crecer en su fe y descubrir su propósito 
                único en el reino de los cielos.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Años de ministerio</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">8</div>
                <div className="stat-label">Ministerios activos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">300+</div>
                <div className="stat-label">Miembros de familia</div>
              </div>
            </div>
          </div>

          <div className="about-values">
            <h3>Nuestros valores</h3>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h4>Amor</h4>
                <p>Amamos a Dios sobre todas las cosas y extendemos ese amor a nuestro prójimo sin condiciones.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h4>Comunidad</h4>
                <p>Creemos en la importancia de la vida en comunidad, donde nos edificamos mutuamente.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-seedling"></i>
                </div>
                <h4>Crecimiento</h4>
                <p>Buscamos el crecimiento espiritual continuo a través del estudio de la Palabra y la oración.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h4>Misión</h4>
                <p>Estamos comprometidos con la Gran Comisión de hacer discípulos en Madrid y el mundo.</p>
              </div>
            </div>
          </div>

          <div className="about-leadership">
            <h3>Liderazgo pastoral</h3>
            <div className="leadership-content">
              <div className="pastor-card">
                <div className="pastor-image"></div>
                <div className="pastor-info">
                  <h4>Pastor Julio Ortega</h4>
                  <p className="pastor-title">Pastor Principal</p>
                  <p>
                    Con más de 20 años de experiencia en el ministerio, el Pastor Julio 
                    ha sido fundamental en el crecimiento y desarrollo de Peniel Madrid. 
                    Su pasión por la enseñanza bíblica y el cuidado pastoral ha impactado 
                    centenares de vidas en nuestra comunidad.
                  </p>
                </div>
              </div>
              
              <div className="leadership-team">
                <h4>Equipo pastoral</h4>
                <p>
                  Contamos con un equipo de líderes comprometidos que trabajan 
                  incansablemente para pastorear, enseñar y servir a nuestra congregación. 
                  Cada uno aporta sus dones únicos para el fortalecimiento del cuerpo de Cristo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;