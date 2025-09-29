import React, { useState } from 'react';
import '../css/inicio/donaciones.css';

const Donaciones = () => {
  const [copiado, setCopiado] = useState('');

  const copiarTexto = (texto, tipo) => {
    navigator.clipboard.writeText(texto);
    setCopiado(tipo);
    setTimeout(() => setCopiado(''), 2000);
  };

  const impactos = [
    {
      texto: "Llevando el evangelio a nuestra ciudad y las naciones",
      icono: "fas fa-bullhorn"
    },
    {
      texto: "Apoyando misiones y proyectos sociales",
      icono: "fas fa-heart"
    },
    {
      texto: "Formando discípulos y líderes",
      icono: "fas fa-users"
    },
    {
      texto: "Cuidando y consolidando a nuevos creyentes",
      icono: "fas fa-hands-helping"
    },
    {
      texto: "Invirtiendo en la próxima generación",
      icono: "fas fa-seedling"
    }
  ];

  return (
    <div className="donaciones-page">
      <div className="donaciones-hero">
        <div className="container-donaciones">
          <div className="hero-content">
            <h1>DONACIONES</h1>
            <p className="hero-subtitle">
              Gracias por sembrar en lo que Dios está haciendo a través de Iglesia Peniel Comunidad Cristiana
            </p>
          </div>
        </div>
      </div>

      <section className="section-donaciones">
        <div className="container-donaciones">
          <div className="impacto-content">
            <h2>Tu generosidad permite que sigamos</h2>
            <div className="impactos-grid">
              {impactos.map((impacto, index) => (
                <div key={index} className="impacto-item">
                  <div className="impacto-icon">
                    <i className={impacto.icono}></i>
                  </div>
                  <p>{impacto.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-donaciones bg-dark">
        <div className="container-donaciones">
          <div className="metodos-section">
            <h2>Formas de donar</h2>
            
            <div className="metodos-container">
              <div className="metodo-card bizum-card">
                <div className="metodo-header">
                  <div className="metodo-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="metodo-info">
                    <h3>1. Bizum</h3>
                    <p>Ve a la opción <strong>"Donativo"</strong> en tu app de Bizum e introduce el siguiente código:</p>
                  </div>
                </div>
                
                <div className="codigo-container">
                  <div className="codigo-display">
                    <span className="codigo-numero">07145</span>
                    <button 
                      className={`copiar-btn ${copiado === 'bizum' ? 'copiado' : ''}`}
                      onClick={() => copiarTexto('07145', 'bizum')}
                    >
                      <i className={copiado === 'bizum' ? 'fas fa-check' : 'fas fa-copy'}></i>
                      {copiado === 'bizum' ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="metodo-card transferencia-card">
                <div className="metodo-header">
                  <div className="metodo-icon">
                    <i className="fas fa-university"></i>
                  </div>
                  <div className="metodo-info">
                    <h3>2. Transferencia bancaria</h3>
                  </div>
                </div>
                
                <div className="datos-bancarios">
                  <div className="dato-bancario">
                    <span className="dato-label">Banco:</span>
                    <span className="dato-valor">CaixaBank</span>
                  </div>
                  
                  <div className="dato-bancario iban-dato">
                    <span className="dato-label">IBAN:</span>
                    <div className="iban-container">
                      <span className="dato-valor iban-numero">ES81 2100 6186 6713 0005 0591</span>
                      <button 
                        className={`copiar-btn ${copiado === 'iban' ? 'copiado' : ''}`}
                        onClick={() => copiarTexto('ES81 2100 6186 6713 0005 0591', 'iban')}
                      >
                        <i className={copiado === 'iban' ? 'fas fa-check' : 'fas fa-copy'}></i>
                        {copiado === 'iban' ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metodo-card kilo-card">
                <div className="metodo-header">
                  <div className="metodo-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="metodo-info">
                    <h3>3. Kilo de Amor</h3>
                    <p>Los <strong>primeros domingos de cada mes</strong>, puedes traer un alimento no perecedero destinado a apoyar familias en situaciones vulnerables.</p>
                  </div>
                </div>
                
                <div className="kilo-info">
                  <div className="kilo-display">
                    <div className="kilo-icono">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className="kilo-texto">
                      <span className="kilo-fecha">Primer domingo del mes</span>
                      <span className="kilo-descripcion">Alimento no perecedero</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-donaciones">
        <div className="container-donaciones">
          <div className="agradecimiento-final">
            <div className="agradecimiento-content">
              <h2>¡Gracias por tu generosidad!</h2>
              <p className="mensaje-impacto">
                Cada donación cuenta y tiene un impacto eterno.
              </p>
              
              <div className="contacto-section">
                <p>¿Preguntas sobre donaciones?</p>
                <div className="contacto-buttons">
                  <a href="/contacto" className="btn-donaciones primary">
                    <i className="fas fa-phone"></i>
                    Contactar
                  </a>
                  <a href="https://wa.me/34609377944" target="_blank" rel="noopener noreferrer" className="btn-donaciones secondary">
                    <i className="fab fa-whatsapp"></i>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donaciones;