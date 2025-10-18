import React, { useState } from "react";
import "../css/inicio/contacto.css";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch(
        "https://penielmadrid.es/api/contacto.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setShowSuccessModal(true);
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: "",
        });
      } else {
        setErrorMessage(result.error || "Error al enviar el mensaje");
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage("Error de conexión. Por favor, inténtalo de nuevo.");
      setShowErrorModal(true);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
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
            <div className="contacto-main-grid">
              <div className="contacto-left">
                <div className="contacto-intro">
                  <h3>Estamos aquí para ti</h3>
                  <p>
                    En Peniel Madrid valoramos cada persona que se acerca a
                    nosotros. Ya sea tu primera visita o necesites
                    acompañamiento pastoral, tenemos las puertas abiertas para
                    recibirte con amor y dedicación.
                  </p>
                </div>

                <div className="contact-methods">
                  <a
                    href="https://wa.me/34609377944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method whatsapp"
                  >
                    <div className="method-icon">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <div className="method-info">
                      <span className="method-label">WhatsApp</span>
                      <span className="method-value">Chatear ahora</span>
                    </div>
                    <i className="fas fa-arrow-right method-arrow"></i>
                  </a>

                  <a href="tel:+34609377944" className="contact-method phone">
                    <div className="method-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="method-info">
                      <span className="method-label">Teléfono</span>
                      <span className="method-value">+34 609 377 944</span>
                    </div>
                    <i className="fas fa-arrow-right method-arrow"></i>
                  </a>

                  <a
                    href="mailto:secretariapenielmadrid@gmail.com"
                    className="contact-method email"
                  >
                    <div className="method-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="method-info">
                      <span className="method-label">Email</span>
                      <span className="method-value">
                        secretariapenielmadrid@gmail.com
                      </span>
                    </div>
                    <i className="fas fa-arrow-right method-arrow"></i>
                  </a>
                </div>

                <div className="location-info">
                  <div className="location-header">
                    <i className="fas fa-map-marker-alt"></i>
                    <h4>Nuestra ubicación</h4>
                  </div>

                  <div className="location-details">
                    <div className="address">
                      <p className="street">Calle Miguel Fleta 11</p>
                      <p className="city">28037, Madrid</p>
                    </div>

                    <div className="transport-pills">
                      <div className="transport-pill">
                        <i className="fas fa-subway"></i>
                        <span>Metro L5 - Canillejas</span>
                      </div>
                      <div className="transport-pill">
                        <i className="fas fa-bus"></i>
                        <span>Buses: 77, 104, 112</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contacto-right">
                <div className="form-container">
                  <h3>Envíanos un mensaje</h3>
                  <p>
                    Completa el formulario y nos pondremos en contacto contigo
                    pronto
                  </p>

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="nombre">Nombre completo *</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="+34 xxx xxx xxx"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="asunto">Asunto *</label>
                      <select
                        id="asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Selecciona un motivo</option>
                        <option value="primera-visita">Primera visita</option>
                        <option value="consejeria">Consejería pastoral</option>
                        <option value="grupos">Grupos Peniel</option>
                        <option value="ministerios">Ministerios</option>
                        <option value="oracion">Pedido de oración</option>
                        <option value="informacion">Información general</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="mensaje">Mensaje *</label>
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

                    <button
                      type="submit"
                      className="submit-button"
                      disabled={enviando}
                    >
                      {enviando ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i>
                          Enviar mensaje
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="mapa-section">
              <h3>Encuéntranos en el mapa</h3>
              <div className="mapa-wrapper">
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
            </div>

            <div className="cta-final">
              <div className="cta-contenido">
                <h3>Da el primer paso</h3>
                <p className="cta-verse">
                  "Venid a mí todos los que estáis trabajados y cargados, y yo
                  os haré descansar."
                  <span>- Mateo 11:28</span>
                </p>
                <p>
                  No importa dónde estés ni cómo te sientas hoy, Dios quiere
                  encontrarse contigo. En Peniel. Creemos que una sola
                  experiencia con Su presencia puede transformar tu vida por
                  completo. ¡Te esperamos!
                </p>

                <div className="cta-buttons">
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

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-simple">
            <div className="modal-simple-content">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>¡Mensaje enviado!</h3>
              <p>
                Gracias por contactarnos. Hemos recibido tu mensaje y te
                responderemos lo antes posible.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="btn-modal primary"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Error */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-simple">
            <div className="modal-simple-content">
              <div className="error-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Error al enviar</h3>
              <p>{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="btn-modal secondary"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacto;
