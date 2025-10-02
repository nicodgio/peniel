import React from "react";
import "../css/inicio/about.css";
const About = () => {
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
                  <strong>Peniel Comunidad Cristiana</strong> es una iglesia
                  evangélica en el distrito de Ciudad Lineal (Madrid), parte de
                  las <strong>Asambleas de Dios de España</strong> e inscrita en
                  el Registro de Entidades Religiosas (Nº 025312).
                </p>
                <p>
                  Nuestra pasión es{" "}
                  <strong>
                    amar a Dios, servir a las personas y anunciar a Jesucristo
                  </strong>{" "}
                  para que muchos experimenten una vida nueva en Él.
                </p>
                <p>
                  Desde el año 2000, hemos sido testigos del poder transformador
                  del evangelio en centenares de vidas. Lo que comenzó como
                  reuniones en hogares y garajes, ha crecido hasta convertirse
                  en una comunidad vibrante con 11 ministerios activos que
                  sirven a diferentes edades y necesidades.
                </p>
              </div>
            </div>
            <div className="church-image-container">
              <div className="church-video">
                <video className="church-video-element" controls playsInline>
                  <source
                    src="/videos/about/about.mp4"
                    type="video/mp4"
                  />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faith-section">
        <div className="container-clean">
          <h2 className="section-title-centered">Nuestra Fe</h2>
          <p className="faith-intro">
            En Peniel creemos y afirmamos la fe cristiana basada en:
          </p>

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
                <img
                  src="/imgs/about/Pastores.png"
                  alt="Julio Ortega y Ethel Bayona"
                />
              </div>
              <div className="pastor-info">
                <h3>Julio Ortega y Ethel Bayona</h3>
                <p className="pastor-role">Pastores Principales</p>
                <p>
                  Desde 2017 sirven como pastores principales de Peniel Madrid.
                  Con un corazón pastoral y un fuerte compromiso con la
                  enseñanza bíblica, lideran la iglesia junto a un equipo de
                  ministros y líderes que trabajan en unidad para edificar la
                  familia de la fe.
                </p>
              </div>
            </div>

            <div className="leadership-info">
              <h3>Un Liderazgo Comprometido</h3>
              <div className="leadership-content">
                <p>
                  Nuestra familia pastoral está compuesta por líderes íntegros y
                  comprometidos que han sido llamados por Dios para servir a
                  esta congregación. Cada miembro del equipo pastoral aporta sus
                  dones únicos y experiencia ministerial para el cuidado, la
                  enseñanza y el desarrollo espiritual de nuestra iglesia.
                </p>
                <p>
                  Creemos en un liderazgo plural y colaborativo, donde las
                  decisiones se toman en unidad y bajo la dirección del Espíritu
                  Santo. Nuestros pastores no solo predican desde el púlpito,
                  sino que viven entre la congregación, compartiendo sus
                  alegrías y tristezas.
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
              <h3>Ser y hacer discípulos</h3>
              <p>
                A la luz de la Palabra, entendemos que la Visión de la iglesia
                es la revelación del plan de Dios, dada a conocer para que sea
                cumplida tanto en la iglesia como en el mundo. Dicho de otro
                modo, es la idea o el sentir que nuestro Padre Celestial tiene
                en su corazón, y que revela a la mente de sus hijos para que
                ellos la lleven a cabo.
                <br></br>
                <br></br>
                La Visión que hemos recibido está alineada con la voluntad de
                Dios de salvar a los que se pierden y, una vez salvos,
                proveerles lo necesario para la transformación oportuna de sus
                vidas. Es decir, hacemos discípulos y –con la ayuda del Espíritu
                Santo– los alimentamos con lo necesario para su crecimiento, de
                modo que ellos también puedan hacer más discípulos.
              </p>
            </div>

            <div className="mission-side">
              <div className="vm-label">MISIÓN</div>
              <h3>
                Enseñando por el templo y por las casas, conforme al modelo
                bíblico.
              </h3>
              <p>
                Siguiendo el mandato de Jesús en Mateo 28:19-20, llevamos a cabo
                la visión a través de lo que llamamos el Ciclo de Vida, que es
                el proceso por el cual todo creyente debe transitar como
                resultado del crecimiento natural dado por Dios. Este ciclo
                abarca desde el momento en que acepta a Cristo y decide
                convertirse en un discípulo suyo, hasta el momento en que puede
                ayudar a otros a hacer lo mismo.
                <br></br>
                <br></br>
                En el caso de la iglesia, en su Ciclo de Vida, que debería darse
                siempre de manera natural, existen cuatro pasos fundamentales
                que nos permiten ser y hacer discípulos de manera integral:
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
            <p>
              Los principios que guían cada aspecto de nuestra vida como iglesia
            </p>
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
                  Amamos a Dios sobre todas las cosas y extendemos ese amor
                  incondicional a nuestro prójimo, creando un ambiente de
                  gracia, aceptación y cuidado mutuo.
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
                  Creemos en la vida en familia de fe, donde cada persona es
                  valorada, cuidada y tiene un lugar de pertenencia dentro del
                  cuerpo de Cristo.
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
                  Buscamos constantemente madurar espiritualmente a través del
                  estudio de la Palabra, la oración y la aplicación práctica de
                  los principios bíblicos.
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
                  Estamos profundamente comprometidos con la Gran Comisión,
                  llevando el evangelio tanto a nuestra ciudad de Madrid como
                  hasta los confines del mundo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-clean">
        <div className="container-clean">
          <div className="contact-clean">
            <h2>Nos gustaría conocerte</h2>
            <p>Déjanos saber de ti, queremos saludarte y acompañarte.</p>
            <div className="buttons-clean">
              <a href="/contacto" className="btn-clean primary">
                Contáctanos
              </a>
              <a href="/reuniones" className="btn-clean secondary">
                Visítanos
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
