import React, { useState } from 'react';
import '../css/inicio/grupos.css';

const GruposPeniel = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    fechaNacimiento: '',
    sexo: '',
    direccion: '',
    cp: '',
    invitadoDe: '',
    primeraVez: '',
    conocerMas: '',
    pedidoOracion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    // Aquí iría la funcionalidad del formulario
    alert('Formulario enviado correctamente');
    setShowModal(false);
  };

  return (
    <>
      {/* Página Principal */}
      <div className="grupos-page">
        
        {/* Hero Section */}
        <div className="grupos-hero">
          <div className="container-clean">
            <h1>GRUPOS PENIEL</h1>
            <p>La iglesia más allá de las cuatro paredes</p>
          </div>
        </div>

        {/* Introducción */}
        <section className="section-clean">
          <div className="container-clean">
            <div className="intro-content">
              <div className="intro-text">
                <h2>Una iglesia en movimiento</h2>
                <p>
                  Peniel no es una iglesia que se queda dentro de cuatro paredes, sino una <strong>iglesia en movimiento</strong>.
                  Llevamos el evangelio a los hogares y a cada rincón de nuestra ciudad.
                </p>
                <p>
                  Por eso nos hemos convertido en una <strong>iglesia en células</strong>, con un propósito claro:
                  <span className="highlight">Alcanzar más almas para Cristo.</span>
                </p>
              </div>
              <div className="intro-image">
                <div className="church-image">
                  <img src="/imgs/grupos/grupos-hero.jpg" alt="Grupos Peniel" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Qué son los Grupos Peniel? */}
        <section className="section-clean bg-light">
          <div className="container-clean">
            <div className="section-header">
              <h2 className="section-title-centered">¿Qué son los Grupos Peniel?</h2>
              <div className="header-line"></div>
            </div>
            
            <div className="que-son-content">
              <p className="section-intro">
                Son la integración de hermanos en la fe que trabajan juntos, de manera
                ordenada y sistemática, para impulsar la vida de la iglesia local en todas sus áreas:
              </p>

              <div className="areas-grid">
                <div className="area-card">
                  <div className="area-icon">
                    <i className="fas fa-praying-hands"></i>
                  </div>
                  <h3>Oración</h3>
                </div>
                <div className="area-card">
                  <div className="area-icon">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <h3>Servicio</h3>
                </div>
                <div className="area-card">
                  <div className="area-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <h3>Consagración</h3>
                </div>
                <div className="area-card">
                  <div className="area-icon">
                    <i className="fas fa-bullhorn"></i>
                  </div>
                  <h3>Evangelización</h3>
                </div>
              </div>

              <div className="objetivo-highlight">
                <p>
                  Los Grupos Peniel no son solo reuniones de oración o alabanza, ni un club social.
                </p>
                <p className="objetivo-main">
                  Su verdadero objetivo es <strong>dar a conocer el nombre de Dios</strong> a nuestros amigos, vecinos, comunidad y nación.
                </p>
                <p className="objetivo-footer">
                  Esta no es tarea de unos pocos, es una misión que nos involucra a todos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="section-clean">
          <div className="container-clean">
            <h2 className="section-title-centered">Características de un Grupo Peniel</h2>
            <div className="header-line" style={{margin: '0 auto 4rem'}}></div>

            <div className="caracteristicas-layout">
              {/* En lo externo */}
              <div className="caracteristica-block">
                <div className="caracteristica-header">
                  <div className="caracteristica-icon">
                    <i className="fas fa-eye"></i>
                  </div>
                  <h3>En lo externo</h3>
                </div>
                <div className="caracteristica-list">
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="item-content">
                      <h4>Tamaño reducido</h4>
                      <p>Hasta 12 integrantes, para un mejor acompañamiento.</p>
                    </div>
                  </div>
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-layer-group"></i>
                    </div>
                    <div className="item-content">
                      <h4>Homogeneidad</h4>
                      <p>Se organiza por edad (menores o mayores de 30) y sexo (hombres o mujeres).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* En lo interno */}
              <div className="caracteristica-block">
                <div className="caracteristica-header">
                  <div className="caracteristica-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <h3>En lo interno</h3>
                </div>
                <div className="caracteristica-list">
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-seedling"></i>
                    </div>
                    <div className="item-content">
                      <h4>Reproduce discípulos</h4>
                      <p>Su prioridad es la multiplicación: "Ser y Hacer discípulos".</p>
                    </div>
                  </div>
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-heartbeat"></i>
                    </div>
                    <div className="item-content">
                      <h4>Tiene vida</h4>
                      <p>Cada miembro experimenta el ciclo de vida espiritual dentro del grupo.</p>
                    </div>
                  </div>
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <div className="item-content">
                      <h4>Trabaja en equipo</h4>
                      <p>Todos son importantes y necesarios para el desarrollo espiritual.</p>
                    </div>
                  </div>
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="item-content">
                      <h4>Crece espiritualmente</h4>
                      <p>Se edifica a través de enseñanza, doctrina, comunión y visión.</p>
                    </div>
                  </div>
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-church"></i>
                    </div>
                    <div className="item-content">
                      <h4>Edifica la iglesia</h4>
                      <p>Fortalece la vida local en oración, servicio, consagración y evangelización.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-clean bg-light">
          <div className="container-clean">
            <div className="cta-content">
              <h2>Únete a un Grupo Peniel</h2>
              <p>
                ¡Este es el tiempo de crecer, compartir y llevar la luz de Jesús a cada rincón de nuestra ciudad!
              </p>
              <div className="buttons-clean">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-clean primary"
                >
                  Haz clic si quieres formar parte
                </button>
              </div>
              <div className="contact-info">
                También puedes escribirnos al <strong>+34 609 377 944</strong>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal del Formulario */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Únete a Grupos Peniel</h2>
              <button
                onClick={() => setShowModal(false)}
                className="close-button"
              >
                ×
              </button>
            </div>

            <div className="form-container">
              {/* Nombre completo */}
              <div className="form-group">
                <label>Nombre completo *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Fecha de nacimiento */}
              <div className="form-group">
                <label>Fecha de nacimiento *</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Sexo */}
              <div className="form-group">
                <label>Sexo *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="sexo"
                      value="F"
                      checked={formData.sexo === 'F'}
                      onChange={handleInputChange}
                      required
                    />
                    Femenino
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="sexo"
                      value="M"
                      checked={formData.sexo === 'M'}
                      onChange={handleInputChange}
                      required
                    />
                    Masculino
                  </label>
                </div>
              </div>

              {/* Dirección */}
              <div className="form-group">
                <label>Dirección *</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* CP */}
              <div className="form-group">
                <label>Código Postal *</label>
                <input
                  type="text"
                  name="cp"
                  value={formData.cp}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Invitado de */}
              <div className="form-group">
                <label>Invitado de (opcional)</label>
                <input
                  type="text"
                  name="invitadoDe"
                  value={formData.invitadoDe}
                  onChange={handleInputChange}
                />
              </div>

              {/* Primera vez en iglesia evangélica */}
              <div className="form-group">
                <label>¿Es tu primera vez en una iglesia evangélica? *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="primeraVez"
                      value="si"
                      checked={formData.primeraVez === 'si'}
                      onChange={handleInputChange}
                      required
                    />
                    Sí
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="primeraVez"
                      value="no"
                      checked={formData.primeraVez === 'no'}
                      onChange={handleInputChange}
                      required
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Conocer más de Dios */}
              <div className="form-group">
                <label>¿Te gustaría conocer más de Dios y la Biblia? *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="conocerMas"
                      value="si"
                      checked={formData.conocerMas === 'si'}
                      onChange={handleInputChange}
                      required
                    />
                    Sí
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="conocerMas"
                      value="no"
                      checked={formData.conocerMas === 'no'}
                      onChange={handleInputChange}
                      required
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Pedido de oración */}
              <div className="form-group">
                <label>¿Tienes algún pedido de oración?</label>
                <textarea
                  name="pedidoOracion"
                  value={formData.pedidoOracion}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Comparte tu pedido de oración..."
                />
              </div>

              {/* Aviso de privacidad */}
              <div className="privacy-notice">
                De conformidad con lo establecido en la Ley Orgánica 15/1999, de 13 de
                diciembre, de Protección de Datos de Carácter Personal, así como
                a la inclusión de mis datos en el directorio de IGLESIA PENIEL COMUNIDAD
                CRISTIANA, para su difusión interna. Así mismo, consiento expresamente
                los derechos de acceso, rectificación, cancelación y oposición que podré
                ejercitar dirigiéndome por escrito a Tf: 609377944 Ó
                secretariapenielmadridesp@gmail.com
              </div>

              {/* Botones */}
              <div className="form-buttons">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-clean secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-clean primary"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GruposPeniel;