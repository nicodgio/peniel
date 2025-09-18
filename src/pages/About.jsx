import React from 'react';
import '../css/inicio/about.css';

const About = () => {
  const estadisticas = [
    { numero: "24+", label: "Años de historia" },
    { numero: "300+", label: "Miembros activos" },
    { numero: "11", label: "Ministerios activos" },
    { numero: "4", label: "Pasos de discipulado" }
  ];

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

      <section className="pastoral-section">
        <div className="container-clean">
          <h2 className="section-title-centered">Nuestros Pastores</h2>
          
          <div className="pastoral-layout">
            <div className="pastor-main">
              <div className="pastor-image">
                <img src="/imgs/about/Pastores.png" alt="Julio Ortega y Ethel Bayona" />
              </div>
              <div className="pastor-info">
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
            
            <div className="leadership-info">
              <h3>Un Liderazgo Comprometido</h3>
              <div className="leadership-content">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-mission-modern">
        <div className="container-clean">
          <div className="section-intro">
            <h2>Visión y Misión</h2>
            <p>Nuestro propósito y dirección como iglesia</p>
          </div>
          
          <div className="vm-hero">
            <div className="vision-side">
              <div className="vm-label">VISIÓN</div>
              <h3>Transformar vidas y comunidades</h3>
              <p>
                Ser una iglesia que transforma vidas y comunidades a través del 
                poder del evangelio, formando discípulos comprometidos que extiendan 
                el Reino de Dios en Madrid y hasta lo último de la tierra.
              </p>
            </div>
            
            <div className="mission-side">
              <div className="vm-label">MISIÓN</div>
              <h3>Hacer discípulos de todas las naciones</h3>
              <p>
                Siguiendo el mandato de Jesús en Mateo 28:19-20, cumplimos nuestra 
                misión a través de cuatro pasos fundamentales que nos permiten 
                <strong> ser y hacer discípulos</strong> de manera integral.
              </p>
              
              <div className="process-flow">
                <div className="process-step">
                  <div className="step-circle">01</div>
                  <div className="step-info">
                    <h4>Ganar</h4>
                    <span>Evangelismo</span>
                  </div>
                </div>
                
                <div className="flow-arrow">→</div>
                
                <div className="process-step">
                  <div className="step-circle">02</div>
                  <div className="step-info">
                    <h4>Consolidar</h4>
                    <span>Afianzar la fe</span>
                  </div>
                </div>
                
                <div className="flow-arrow">→</div>
                
                <div className="process-step">
                  <div className="step-circle">03</div>
                  <div className="step-info">
                    <h4>Discipular</h4>
                    <span>Formar carácter</span>
                  </div>
                </div>
                
                <div className="flow-arrow">→</div>
                
                <div className="process-step">
                  <div className="step-circle">04</div>
                  <div className="step-info">
                    <h4>Enviar</h4>
                    <span>Multiplicar obreros</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-modern">
        <div className="container-clean">
          <div className="values-header">
            <h2>Nuestros Valores</h2>
            <p>Los principios que guían cada aspecto de nuestra vida como iglesia</p>
          </div>
          
          <div className="values-showcase">
            <div className="value-highlight">
              <div className="value-number">01</div>
              <div className="value-content-modern">
                <div className="value-title">
                  <i className="fas fa-heart"></i>
                  <h3>Amor</h3>
                </div>
                <p>
                  Amamos a Dios sobre todas las cosas y extendemos ese amor incondicional 
                  a nuestro prójimo, creando un ambiente de gracia, aceptación y cuidado mutuo.
                </p>
              </div>
            </div>
            
            <div className="value-highlight">
              <div className="value-number">02</div>
              <div className="value-content-modern">
                <div className="value-title">
                  <i className="fas fa-users"></i>
                  <h3>Comunidad</h3>
                </div>
                <p>
                  Creemos en la vida en familia de fe, donde cada persona es valorada, 
                  cuidada y tiene un lugar de pertenencia dentro del cuerpo de Cristo.
                </p>
              </div>
            </div>
            
            <div className="value-highlight">
              <div className="value-number">03</div>
              <div className="value-content-modern">
                <div className="value-title">
                  <i className="fas fa-seedling"></i>
                  <h3>Crecimiento</h3>
                </div>
                <p>
                  Buscamos constantemente madurar espiritualmente a través del estudio 
                  de la Palabra, la oración y la aplicación práctica de los principios bíblicos.
                </p>
              </div>
            </div>
            
            <div className="value-highlight">
              <div className="value-number">04</div>
              <div className="value-content-modern">
                <div className="value-title">
                  <i className="fas fa-globe"></i>
                  <h3>Misión</h3>
                </div>
                <p>
                  Estamos profundamente comprometidos con la Gran Comisión, llevando el 
                  evangelio tanto a nuestra ciudad de Madrid como hasta los confines del mundo.
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