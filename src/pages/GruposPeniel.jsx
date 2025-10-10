import React, { useState, useEffect } from "react";
import "../css/inicio/grupos.css";

const GruposPeniel = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    fechaNacimiento: "",
    sexo: "",
    direccion: "",
    cp: "",
    invitadoDe: "",
    primeraVez: "",
    conocerMas: "",
    pedidoOracion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep1 = () => {
    return (
      formData.nombre.trim() !== "" &&
      formData.telefono.trim() !== "" &&
      formData.fechaNacimiento.trim() !== "" &&
      formData.sexo !== ""
    );
  };

  const validateStep2 = () => {
    return (
      formData.direccion.trim() !== "" &&
      formData.cp.trim() !== "" &&
      formData.primeraVez !== ""
    );
  };

  const validateStep3 = () => {
    return formData.conocerMas !== "";
  };

  const nextStep = () => {
    let canAdvance = false;

    if (currentStep === 1) {
      canAdvance = validateStep1();
      if (!canAdvance) {
        setErrorMessage(
          "Por favor, completa todos los campos obligatorios del paso 1"
        );
        setShowErrorModal(true);
        return;
      }
    } else if (currentStep === 2) {
      canAdvance = validateStep2();
      if (!canAdvance) {
        setErrorMessage(
          "Por favor, completa todos los campos obligatorios del paso 2"
        );
        setShowErrorModal(true);
        return;
      }
    }

    if (canAdvance && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) {
      setErrorMessage(
        "Por favor, completa todos los campos obligatorios del paso 3"
      );
      setShowErrorModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://orangered-guanaco-582072.hostingersite.com/api/grupospeniel.php",
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
        setShowModal(false);
        setCurrentStep(1);
        setFormData({
          nombre: "",
          telefono: "",
          fechaNacimiento: "",
          sexo: "",
          direccion: "",
          cp: "",
          invitadoDe: "",
          primeraVez: "",
          conocerMas: "",
          pedidoOracion: "",
        });
      } else {
        setErrorMessage(result.error || "Error al enviar el formulario");
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage("Error de conexión. Por favor, inténtalo de nuevo.");
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentStep(1);
  };

  const scrollAreasCarousel = (direction) => {
    const carousel = document.getElementById("areasCarousel");
    const cardWidth = carousel.querySelector(".area-card").offsetWidth + 32;
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="grupos-page">
        <div className="grupos-hero">
          <div className="container-clean">
            <h1>GRUPOS PENIEL</h1>
            <p>
              "Y todos los días, en el templo y por las casas, no cesaban de
              enseñar y predicar a Jesucristo"
            </p>
          </div>
        </div>

        <section className="section-clean">
          <div className="container-clean">
            <div className="intro-content">
              <div className="intro-text">
                <h2>Una iglesia en movimiento</h2>
                <p>
                  Peniel no es una iglesia que se queda dentro de cuatro
                  paredes, sino una <strong>iglesia en movimiento</strong>.
                  Llevamos el evangelio a los hogares y a cada rincón de nuestra
                  ciudad.
                </p>
                <p>
                  Por eso somos una <strong>iglesia en células</strong>, con un
                  propósito claro:
                </p>
                <p className="highlight-centered">
                  Alcanzar más almas para Cristo.
                </p>
              </div>
              <div className="intro-image">
                <div className="church-image">
                  <img src="/imgs/gp.png" alt="Grupos Peniel" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-clean bg-light">
          <div className="container-clean">
            <div className="section-header">
              <h2 className="section-title-centered">
                ¿Qué son los Grupos Peniel?
              </h2>
              <div className="header-line"></div>
            </div>

            <div className="que-son-content">
              <p className="section-intro">
                Son la integración de hermanos en la fe que trabajan juntos, de
                manera ordenada y sistemática, para impulsar la vida de la
                iglesia local en todas sus áreas:
              </p>

              <div className="areas-carousel-wrapper">
                <div className="areas-carousel" id="areasCarousel">
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

                <button
                  className="areas-carousel-btn prev"
                  onClick={() => scrollAreasCarousel(-1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="areas-carousel-btn next"
                  onClick={() => scrollAreasCarousel(1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              <div className="objetivo-highlight">
                <p>
                  Los Grupos Peniel no son solo reuniones de oración o alabanza,
                  ni un club social.
                </p>
                <p className="objetivo-main">
                  Su verdadero objetivo es{" "}
                  <strong>dar a conocer a Jesús</strong> a nuestros amigos,
                  vecinos, comunidad y nación.
                </p>
                <p className="objetivo-footer">
                  Esta no es tarea de unos pocos, es una misión que nos
                  involucra a todos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-clean">
          <div className="container-clean">
            <h2 className="section-title-centered">
              Características de un Grupo Peniel
            </h2>
            <div
              className="header-line"
              style={{ margin: "0 auto 4rem" }}
            ></div>

            <div className="caracteristicas-layout">
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
                      <p>
                        Se organiza por edad (adolescentes, jovenes y adultos) y
                        sexo (hombres o mujeres).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                      <p>
                        Su prioridad es la multiplicación: "Ser y Hacer
                        discípulos".
                      </p>
                    </div>
                  </div>
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-heartbeat"></i>
                    </div>
                    <div className="item-content">
                      <h4>Tiene vida</h4>
                      <p>
                        Cada miembro experimenta el ciclo de vida espiritual
                        dentro del grupo.
                      </p>
                    </div>
                  </div>
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <div className="item-content">
                      <h4>Trabaja en equipo</h4>
                      <p>
                        Todos son importantes y necesarios para el desarrollo
                        espiritual.
                      </p>
                    </div>
                  </div>
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="item-content">
                      <h4>Crece espiritualmente</h4>
                      <p>
                        Se edifica a través de enseñanza, doctrina, comunión y
                        visión.
                      </p>
                    </div>
                  </div>
                  <div className="caracteristica-item">
                    <div className="item-icon">
                      <i className="fas fa-church"></i>
                    </div>
                    <div className="item-content">
                      <h4>Edifica la iglesia</h4>
                      <p>
                        Fortalece la vida local en oración, servicio,
                        consagración y evangelización.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-clean bg-dark">
          <div className="container-clean">
            <div className="cta-content">
              <h2>Únete a un Grupo Peniel</h2>
              <p>
                ¡Este es el tiempo de crecer, compartir y llevar la luz de Jesús
                a cada rincón de nuestra ciudad!
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-modern">
            <div className="modal-header-modern">
              <button onClick={closeModal} className="close-btn-modern">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body-modern">
              <div className="modal-image-side">
                <div className="modal-image-container">
                  <img
                    src="/imgs/ministerios/grupospeniel.jpeg"
                    alt="Grupos Peniel"
                  />
                  <div className="image-overlay-modern">
                    <div className="overlay-content">
                      <h3>Únete a Grupos Peniel</h3>
                      <p>Forma parte de nuestra familia de fe</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-form-side">
                <div className="step-indicator" data-step={currentStep}>
                  <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                    <div className="step-number">1</div>
                    <span>Datos personales</span>
                  </div>
                  <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                    <div className="step-number">2</div>
                    <span>Información adicional</span>
                  </div>
                  <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
                    <div className="step-number">3</div>
                    <span>Finalizar</span>
                  </div>
                </div>

                <div className="form-steps">
                  {currentStep === 1 && (
                    <div className="step-content">
                      <h4>Datos Personales</h4>
                      <div className="form-grid">
                        <div className="form-field">
                          <label>Nombre completo *</label>
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            placeholder="Tu nombre completo"
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>Teléfono *</label>
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            placeholder="+34 xxx xxx xxx"
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>Fecha de nacimiento *</label>
                          <input
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>Sexo *</label>
                          <div className="radio-modern">
                            <label className="radio-option">
                              <input
                                type="radio"
                                name="sexo"
                                value="F"
                                checked={formData.sexo === "F"}
                                onChange={handleInputChange}
                                required
                              />
                              <span className="radio-custom"></span>
                              Femenino
                            </label>
                            <label className="radio-option">
                              <input
                                type="radio"
                                name="sexo"
                                value="M"
                                checked={formData.sexo === "M"}
                                onChange={handleInputChange}
                                required
                              />
                              <span className="radio-custom"></span>
                              Masculino
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="step-content">
                      <h4>Información Adicional</h4>
                      <div className="form-grid">
                        <div className="form-field">
                          <label>Dirección *</label>
                          <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            placeholder="Tu dirección completa"
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>Código Postal *</label>
                          <input
                            type="text"
                            name="cp"
                            value={formData.cp}
                            onChange={handleInputChange}
                            placeholder="28xxx"
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label>Invitado de (opcional)</label>
                          <input
                            type="text"
                            name="invitadoDe"
                            value={formData.invitadoDe}
                            onChange={handleInputChange}
                            placeholder="¿Quién te invitó?"
                          />
                        </div>
                        <div className="form-field full-width">
                          <label>
                            ¿Es tu primera vez en una iglesia evangélica? *
                          </label>
                          <div className="radio-modern">
                            <label className="radio-option">
                              <input
                                type="radio"
                                name="primeraVez"
                                value="si"
                                checked={formData.primeraVez === "si"}
                                onChange={handleInputChange}
                                required
                              />
                              <span className="radio-custom"></span>
                              Sí
                            </label>
                            <label className="radio-option">
                              <input
                                type="radio"
                                name="primeraVez"
                                value="no"
                                checked={formData.primeraVez === "no"}
                                onChange={handleInputChange}
                                required
                              />
                              <span className="radio-custom"></span>
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="step-content">
                      <h4>Información Final</h4>
                      <div className="form-grid">
                        <div className="form-field full-width">
                          <label>
                            ¿Te gustaría conocer más de Dios y la Biblia? *
                          </label>
                          <div className="radio-modern">
                            <label className="radio-option">
                              <input
                                type="radio"
                                name="conocerMas"
                                value="si"
                                checked={formData.conocerMas === "si"}
                                onChange={handleInputChange}
                                required
                              />
                              <span className="radio-custom"></span>
                              Sí
                            </label>
                            <label className="radio-option">
                              <input
                                type="radio"
                                name="conocerMas"
                                value="no"
                                checked={formData.conocerMas === "no"}
                                onChange={handleInputChange}
                                required
                              />
                              <span className="radio-custom"></span>
                              No
                            </label>
                          </div>
                        </div>
                        <div className="form-field full-width">
                          <label>¿Tienes algún pedido de oración?</label>
                          <textarea
                            name="pedidoOracion"
                            value={formData.pedidoOracion}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Comparte tu pedido de oración (opcional)..."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="modal-navigation">
                  {currentStep > 1 && (
                    <button onClick={prevStep} className="btn-nav secondary">
                      <i className="fas fa-arrow-left"></i>
                      Anterior
                    </button>
                  )}
                  <div className="nav-spacer"></div>
                  {currentStep < 3 ? (
                    <button onClick={nextStep} className="btn-nav primary">
                      Siguiente
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="btn-nav primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          Enviando...
                          <i className="fas fa-spinner fa-spin"></i>
                        </>
                      ) : (
                        <>
                          Enviar
                          <i className="fas fa-paper-plane"></i>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {currentStep === 3 && (
                  <div className="privacy-compact">
                    <p>
                      Al enviar este formulario aceptas nuestros términos de
                      privacidad y el uso de tus datos según la LOPD.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-simple">
            <div className="modal-simple-content">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>¡Datos enviados correctamente!</h3>
              <p>
                Gracias por tu interés en formar parte de Grupos Peniel. Hemos
                recibido tu información y en breve nos pondremos en contacto
                contigo.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="btn-nav primary"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-simple">
            <div className="modal-simple-content">
              <div className="error-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Error</h3>
              <p>{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="btn-nav secondary"
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

export default GruposPeniel;
