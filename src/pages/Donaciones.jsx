import React, { useState } from 'react';

const Donaciones = () => {
  const proyectosDestacados = [
    {
      nombre: "Banco de Alimentos",
      descripcion: "Ayudamos a familias vulnerables con alimentos básicos semanalmente",
      meta: "€2,000 mensuales",
      progreso: 65,
      icono: "fas fa-shopping-basket"
    },
    {
      nombre: "Peniel Kids",
      descripcion: "Materiales educativos y campamentos para nuestros niños",
      meta: "€800 mensuales",
      progreso: 40,
      icono: "fas fa-child"
    },
    {
      nombre: "Misiones Globales",
      descripcion: "Apoyo a 9 misioneros en diferentes países del mundo",
      meta: "€3,500 mensuales",
      progreso: 78,
      icono: "fas fa-globe"
    },
    {
      nombre: "Mantenimiento Templo",
      descripcion: "Gastos de alquiler, servicios y mantenimiento del edificio",
      meta: "€1,200 mensuales",
      progreso: 85,
      icono: "fas fa-church"
    }
  ];

  const metodosApego = [
    {
      metodo: "Bizum",
      numero: "609 377 944",
      descripcion: "La forma más rápida y sencilla de donar",
      icono: "fas fa-mobile-alt",
      color: "#00D4AA"
    },
    {
      metodo: "Transferencia Bancaria",
      iban: "ES21 1465 0100 40 1234567890",
      titular: "Iglesia Peniel Comunidad Cristiana",
      descripcion: "Para donaciones programadas o mayores cantidades",
      icono: "fas fa-university",
      color: "#3498db"
    },
    {
      metodo: "PayPal",
      email: "donaciones@penielmadrid.com",
      descripcion: "Acepta tarjetas de crédito internacionales",
      icono: "fab fa-paypal",
      color: "#0070ba"
    }
  ];

  const copiarTexto = (texto) => {
    navigator.clipboard.writeText(texto);
    // Aquí podrías mostrar una notificación de "copiado"
  };

  return (
    <div className="page-content">
      <section className="donaciones-page">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        <div className="section-header">
          <h2 className="section-title">DONACIONES</h2>
          <p className="section-subtitle">
            Tu generosidad transforma vidas y extiende el Reino de Dios
          </p>
        </div>

        <div className="donaciones-container">
          
          {/* Impacto */}
          <div className="impacto-section">
            <div className="impacto-content">
              <h3>El poder de tu generosidad</h3>
              <p>
                Cada donación que recibes se convierte en vidas transformadas, familias restauradas 
                y esperanza extendida por Madrid y el mundo. No se trata solo de dinero, 
                se trata de ser parte del propósito eterno de Dios.
              </p>
              
              <div className="estadisticas-impacto">
                <div className="stat-impacto">
                  <div className="stat-numero">150+</div>
                  <div className="stat-label">Familias ayudadas mensualmente</div>
                </div>
                <div className="stat-impacto">
                  <div className="stat-numero">9</div>
                  <div className="stat-label">Misioneros apoyados globalmente</div>
                </div>
                <div className="stat-impacto">
                  <div className="stat-numero">€12,000</div>
                  <div className="stat-label">Impacto mensual promedio</div>
                </div>
              </div>
            </div>
          </div>

          {/* Métodos de Donación */}
          <div className="metodos-donacion">
            <h3>Formas de donar</h3>
            <div className="metodos-grid">
              {metodosApego.map((metodo, index) => (
                <div key={index} className="metodo-card">
                  <div className="metodo-header">
                    <div className="metodo-icon" style={{ backgroundColor: metodo.color }}>
                      <i className={metodo.icono}></i>
                    </div>
                    <h5>{metodo.metodo}</h5>
                  </div>
                  
                  <p className="metodo-descripcion">{metodo.descripcion}</p>
                  
                  <div className="metodo-datos">
                    {metodo.numero && (
                      <div className="dato-item">
                        <span className="dato-label">Número:</span>
                        <div className="dato-valor">
                          <span>{metodo.numero}</span>
                          <button 
                            className="copiar-btn"
                            onClick={() => copiarTexto(metodo.numero)}
                          >
                            <i className="fas fa-copy"></i>
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {metodo.iban && (
                      <>
                        <div className="dato-item">
                          <span className="dato-label">IBAN:</span>
                          <div className="dato-valor">
                            <span>{metodo.iban}</span>
                            <button 
                              className="copiar-btn"
                              onClick={() => copiarTexto(metodo.iban)}
                            >
                              <i className="fas fa-copy"></i>
                            </button>
                          </div>
                        </div>
                        <div className="dato-item">
                          <span className="dato-label">Titular:</span>
                          <span>{metodo.titular}</span>
                        </div>
                      </>
                    )}
                    
                    {metodo.email && (
                      <div className="dato-item">
                        <span className="dato-label">Email:</span>
                        <div className="dato-valor">
                          <span>{metodo.email}</span>
                          <button 
                            className="copiar-btn"
                            onClick={() => copiarTexto(metodo.email)}
                          >
                            <i className="fas fa-copy"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proyectos Destacados */}
          <div className="proyectos-section">
            <h3>Proyectos que apoyas</h3>
            <div className="proyectos-grid">
              {proyectosDestacados.map((proyecto, index) => (
                <div key={index} className="proyecto-card">
                  <div className="proyecto-header">
                    <div className="proyecto-icon">
                      <i className={proyecto.icono}></i>
                    </div>
                    <div className="proyecto-info">
                      <h4>{proyecto.nombre}</h4>
                      <p>{proyecto.descripcion}</p>
                    </div>
                  </div>
                  
                  <div className="proyecto-progreso">
                    <div className="progreso-info">
                      <span>Meta: {proyecto.meta}</span>
                      <span>{proyecto.progreso}%</span>
                    </div>
                    <div className="barra-progreso">
                      <div 
                        className="progreso-fill"
                        style={{ width: `${proyecto.progreso}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tipos de Donación */}
          <div className="tipos-donacion">
            <h3>Formas de contribuir</h3>
            <div className="tipos-grid">
              <div className="tipo-card">
                <div className="tipo-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h4>Ofrenda Regular</h4>
                <p>
                  Tu contribución semanal o mensual que sostiene 
                  el ministerio continuo de la iglesia.
                </p>
                <ul>
                  <li>Gastos operativos</li>
                  <li>Salarios pastorales</li>
                  <li>Programas regulares</li>
                </ul>
              </div>
              
              <div className="tipo-card">
                <div className="tipo-icon">
                  <i className="fas fa-seedling"></i>
                </div>
                <h4>Primicias</h4>
                <p>
                  Los primeros frutos de tus ingresos, 
                  reconociendo que todo viene de Dios.
                </p>
                <ul>
                  <li>Reconocimiento de la provisión de Dios</li>
                  <li>Inversión en el Reino</li>
                  <li>Bendición multiplicada</li>
                </ul>
              </div>
              
              <div className="tipo-card">
                <div className="tipo-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h4>Donación Especial</h4>
                <p>
                  Contribuciones específicas para proyectos 
                  especiales y necesidades urgentes.
                </p>
                <ul>
                  <li>Proyectos de construcción</li>
                  <li>Emergencias comunitarias</li>
                  <li>Equipamiento especial</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Transparencia */}
          <div className="transparencia-section">
            <div className="transparencia-content">
              <h3>Transparencia y confianza</h3>
              <p>
                Valoramos profundamente tu confianza. Cada euro donado se administra 
                con excelencia e integridad, y estamos comprometidos con la transparencia 
                total en el uso de los recursos.
              </p>
              
              <div className="compromisos-grid">
                <div className="compromiso-item">
                  <i className="fas fa-chart-pie"></i>
                  <h4>Informes Trimestrales</h4>
                  <p>Reportes detallados del uso de fondos cada 3 meses</p>
                </div>
                <div className="compromiso-item">
                  <i className="fas fa-eye"></i>
                  <h4>Auditoría Externa</h4>
                  <p>Revisión anual independiente de nuestras finanzas</p>
                </div>
                <div className="compromiso-item">
                  <i className="fas fa-handshake"></i>
                  <h4>Gestión Ética</h4>
                  <p>Administración responsable según principios bíblicos</p>
                </div>
              </div>
              
              <div className="contacto-financiero">
                <p>
                  ¿Preguntas sobre finanzas? Contacta a nuestro administrador:
                  <a href="mailto:finanzas@penielmadrid.com">finanzas@penielmadrid.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Llamado Final */}
          <div className="llamado-final">
            <div className="llamado-content">
              <h3>Cada donación cuenta</h3>
              <p>
                "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, 
                porque Dios ama al dador alegre." - 2 Corintios 9:7
              </p>
              <p>
                No importa la cantidad, importa el corazón. Tu generosidad, sea grande o pequeña, 
                forma parte del gran plan de Dios para transformar vidas en Madrid y el mundo.
              </p>
              
              <div className="contacto-donaciones">
                <a href="/contacto" className="btn btn-primary">
                  <i className="fas fa-phone"></i>
                  CONTACTAR
                </a>
                <a href="https://wa.me/34609377944" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fab fa-whatsapp"></i>
                  WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donaciones;