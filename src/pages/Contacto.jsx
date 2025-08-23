import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  const copiarTexto = (texto) => {
    navigator.clipboard.writeText(texto);
  };

  return (
    <div className="page-content">
      <section className="contacto-page">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        <div className="section-header">
          <h2 className="section-title">CONTACTO</h2>
          <p className="section-subtitle">
            Construyendo puentes hacia una comunidad de fe
          </p>
        </div>

        <div className="contacto-container">
          
          {/* Hero Principal */}
          <div className="contacto-hero">
            <div className="hero-left">
              <h3>Estamos aquí para ti</h3>
              <p>
                En Peniel Madrid valoramos cada persona que se acerca a nosotros. 
                Ya sea tu primera visita o necesites acompañamiento pastoral, 
                tenemos las puertas abiertas para recibirte con amor y dedicación.
              </p>
              
              <div className="contacto-directo">
                <div className="contacto-principal">
                  <div className="contacto-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <span className="label">Llamadas</span>
                      <a href="tel:+34609377944" className="valor">+34 609 377 944</a>
                    </div>
                  </div>
                  
                  <div className="contacto-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <span className="label">Email</span>
                      <a href="mailto:info@penielmadrid.com" className="valor">info@penielmadrid.com</a>
                    </div>
                  </div>
                  
                  <div className="contacto-item whatsapp-destacado">
                    <i className="fab fa-whatsapp"></i>
                    <div>
                      <span className="label">WhatsApp</span>
                      <a 
                        href="https://wa.me/34609377944" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="valor"
                      >
                        Chatear ahora
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hero-right">
              <div className="ubicacion-card">
                <h4>Nuestra ubicación</h4>
                <div className="direccion">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Calle Miguel Fleta 11</strong>
                    <span>28037, Madrid</span>
                  </div>
                </div>
                
                <div className="horarios-resumen">
                  <h5>Horarios de atención</h5>
                  <div className="horario-item">
                    <span>Lun - Vie</span>
                    <span>10:00 - 19:00</span>
                  </div>
                  <div className="horario-item">
                    <span>Sábados</span>
                    <span>10:00 - 13:00</span>
                  </div>
                  <div className="horario-item">
                    <span>Domingos</span>
                    <span>09:00 - 13:00</span>
                  </div>
                </div>
                
                <div className="transporte">
                  <h5>Cómo llegar</h5>
                  <div className="transporte-item">
                    <i className="fas fa-subway"></i>
                    <span>Metro Canillejas (L5)</span>
                  </div>
                  <div className="transporte-item">
                    <i className="fas fa-bus"></i>
                    <span>Buses 77, 104, 112</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Equipo Pastoral */}
          <div className="equipo-pastoral">
            <div className="seccion-header">
              <h3>Equipo Pastoral</h3>
              <p>Líderes dedicados al cuidado y crecimiento de nuestra comunidad</p>
            </div>
            
            <div className="pastores-lista">
              <div className="pastor-principal">
                <div className="pastor-avatar">
                  <span>JO</span>
                </div>
                <div className="pastor-info">
                  <h4>Pastor Julio Ortega</h4>
                  <span className="cargo">Pastor Principal</span>
                  <p>Liderazgo general, consejería pastoral y enseñanza bíblica</p>
                  <div className="pastor-contactos">
                    <a href="tel:+34609377944">
                      <i className="fas fa-phone"></i>
                    </a>
                    <a href="mailto:pastor@penielmadrid.com">
                      <i className="fas fa-envelope"></i>
                    </a>
                    <a href="https://wa.me/34609377944" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="pastores-auxiliares">
                <div className="pastor-item">
                  <div className="pastor-mini-avatar">M</div>
                  <div>
                    <h5>Pastora María Ortega</h5>
                    <span>Ministerio femenino y familias</span>
                    <a href="mailto:maria@penielmadrid.com">maria@penielmadrid.com</a>
                  </div>
                </div>
                
                <div className="pastor-item">
                  <div className="pastor-mini-avatar">D</div>
                  <div>
                    <h5>Pastor David Ruiz</h5>
                    <span>Ministerio de jóvenes</span>
                    <a href="mailto:jovenes@penielmadrid.com">jovenes@penielmadrid.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario y Mapa */}
          <div className="comunicacion-section">
            <div className="formulario-contacto">
              <h3>Envíanos un mensaje</h3>
              <p>Completa el formulario y nos pondremos en contacto contigo</p>
              
              <form onSubmit={handleSubmit} className="contacto-form">
                <div className="form-grupo-doble">
                  <div className="input-group">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grupo-doble">
                  <div className="input-group">
                    <label htmlFor="telefono">Teléfono (opcional)</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="asunto">Motivo de consulta</label>
                    <select
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="primera-visita">Primera visita</option>
                      <option value="consejeria">Consejería pastoral</option>
                      <option value="ministerio">Unirme a un ministerio</option>
                      <option value="grupos">Grupos Peniel</option>
                      <option value="matrimonio">Matrimonio y familia</option>
                      <option value="jovenes">Ministerio juvenil</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="mensaje">Tu mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="5"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  Enviar mensaje
                </button>

                {enviado && (
                  <div className="mensaje-exito">
                    <i className="fas fa-check-circle"></i>
                    ¡Mensaje enviado correctamente! Te contactaremos pronto.
                  </div>
                )}
              </form>
            </div>
            
            <div className="mapa-ubicacion">
              <h3>Encuéntranos</h3>
              <div className="mapa-frame">
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
              
              <div className="datos-ubicacion">
                <div className="dato-copia">
                  <span>Dirección completa</span>
                  <div className="copiable" onClick={() => copiarTexto('Calle Miguel Fleta 11, 28037, Madrid')}>
                    <span>Calle Miguel Fleta 11, 28037, Madrid</span>
                    <i className="fas fa-copy"></i>
                  </div>
                </div>
                
                <div className="dato-copia">
                  <span>Teléfono principal</span>
                  <div className="copiable" onClick={() => copiarTexto('+34609377944')}>
                    <span>+34 609 377 944</span>
                    <i className="fas fa-copy"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Final */}
          <div className="cta-final">
            <div className="cta-contenido">
              <h3>Da el primer paso</h3>
              <p>
                "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar." 
                <span>- Mateo 11:28</span>
              </p>
              <p>
                No importa en qué momento de tu vida te encuentres, hay un lugar para ti 
                en nuestra familia. Contáctanos y descubre cómo podemos caminar juntos 
                en esta jornada de fe.
              </p>
              
              <div className="acciones-cta">
                <a 
                  href="https://wa.me/34609377944" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <i className="fab fa-whatsapp"></i>
                  Escribenos por WhatsApp
                </a>
                <a href="/reuniones" className="btn btn-secondary">
                  <i className="fas fa-calendar"></i>
                  Ver nuestros horarios
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;