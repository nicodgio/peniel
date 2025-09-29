import React, { useState } from "react";
import "../css/inicio/ministerios.css";

const Ministerios = () => {
  const [ministerioActivo, setMinisterioActivo] = useState(null);

  const ministerios = [
    {
      id: "accion-social",
      nombre: "Acción Social",
      categoria: "Servicio",
      frecuencia: "Mensual",
      horario: "Sábados por la mañana",
      lema: "Transformando vidas a través del servicio",
      descripcion:
        "Un noble esfuerzo comunitario que se ha convertido en una hermosa tradición mensual de donaciones de alimentos y ropa.",
      descripcionCompleta:
        "En Iglesia Peniel, creemos firmemente en poner la fe en acción. Desde hace muchos años, hemos emprendido un noble esfuerzo comunitario que se ha convertido en una hermosa tradición mensual: nuestro programa de Donaciones de Alimentos y Ropa. Este ministerio nace del deseo profundo de servir a quienes más lo necesitan, brindando no solo recursos materiales, sino también esperanza, dignidad y consuelo en momentos difíciles. Cada mes, nuestros miembros se unen con generosidad y compromiso para recolectar y distribuir alimentos no perecederos, ropa, calzado y enseres básicos, destinados a personas y familias en situación de vulnerabilidad. Gracias al valioso apoyo del Banco de Alimentos de Madrid, y al esfuerzo colectivo de toda nuestra congregación, hemos logrado ampliar nuestro alcance y fortalecer nuestra capacidad de ayuda, llegando a más hogares y corazones con cada jornada de donación.",
      lider: "Jorge Ferreira y Emegdamar Marcano",
      telefono: "+34 609 377 944",
      actividades: [
        "Donando alimentos, ropa o artículos esenciales",
        "Colaborando como voluntario en la organización y distribución",
        "Orando por las personas y familias que reciben esta ayuda",
        "Colaboración con Banco de Alimentos de Madrid",
        "Distribución mensual a familias vulnerables",
        "Recolección de calzado y enseres básicos",
      ],
      requisitos: [
        "Ser miembro activo y comprometido con la iglesia",
        "Estar bautizado",
        "Hacer el curso de integración",
        "Asistir a un grupo Peniel",
        "Corazón de servicio",
        "Compromiso con los valores del Evangelio",
        "Disponibilidad para actividades mensuales",
      ],
      impacto: "Cada gesto cuenta y marca la diferencia en nuestra comunidad",
      icono: "fas fa-hands-helping",
      color: "#e74c3c",
      imagen: "/imgs/ministerios/accion-social.jpg",
    },
    {
      id: "peniel-ng",
      nombre: "Peniel NG",
      categoria: "Jóvenes",
      frecuencia: "Semanal",
      horario: "Programa semanal + 2 campamentos anuales",
      lema: "Volver a la esencia, arder por Cristo",
      descripcion:
        "Un espacio donde la pasión por Cristo, el crecimiento espiritual y la amistad verdadera se encuentran.",
      descripcionCompleta:
        "Peniel NG es el ministerio de adolescentes y jóvenes de nuestra iglesia, un espacio donde la pasión por Cristo, el crecimiento espiritual y la amistad verdadera se encuentran. Nos guiamos por cuatro pilares fundamentales que dan forma a nuestra identidad como grupo: A.R.D.E. (Alabanza y Adoración, Relaciones Interpersonales, Discipulado, Evangelismo). Creemos que muchas veces podemos perdernos en lo superficial —las formas, los métodos, lo exterior— y olvidar lo más importante: nuestra esencia y el propósito por el cual fuimos creados. Por eso, nuestro enfoque es volver a la fuente, a las sendas antiguas, y dejar que el fuego del Espíritu nos lleve de nuevo al centro de todo: Jesús.",
      lider: "Equipo Peniel NG",
      telefono: "+34 609 377 944",
      actividades: [
        "Crecemos juntos en la Palabra de Dios",
        "Fortalecemos amistades reales y profundas",
        "Adoramos con libertad y sin reservas",
        "Organizamos dos campamentos al año (verano e invierno)",
        "Espacios clave para el encuentro con Dios",
        "Comunión y transformación personal",
      ],
      requisitos: [
        "Adolescentes de 12 a 18 años",
        "Jóvenes de 19 a 35 años",
        "Pasión por Cristo y crecimiento espiritual",
        "Compromiso con una fe activa y contagiosa",
      ],
      impacto:
        "Invertimos en esta generación porque creemos que Dios está haciendo algo nuevo en cada uno",
      icono: "fas fa-fire",
      color: "#e67e22",
      imagen: "/imgs/ministerios/ados.jpg",
      videoUrl: "/videos/ministerios/penielng.mov", // Agrega la URL de tu video
    },
    {
      id: "peniel-kids",
      nombre: "Peniel Kids",
      categoria: "Niños",
      frecuencia: "Semanal",
      horario: "Domingos + Campamento urbano en julio",
      lema: "Donde aprender de Dios es una aventura",
      descripcion:
        "Acompañamos a los más pequeños en sus primeros pasos en la fe con enseñanza creativa, divertida y significativa.",
      descripcionCompleta:
        "En Peniel Kids acompañamos a los más pequeños en sus primeros pasos en la fe con una enseñanza bíblica creativa, divertida y significativa. Nuestro ministerio está diseñado para niños de 3 a 11 años, con actividades adaptadas a cada etapa de su desarrollo. Los niños se agrupan según su edad en tres equipos, lo que nos permite ofrecer una atención más cercana y programas diseñados especialmente para ellos: Exploradores (3 a 5 años), Valientes (6 a 8 años) y Detectives (9 a 11 años). Cada domingo, a través de juegos, música, manualidades e historias bíblicas, los niños aprenden valores cristianos, fortalecen su fe y descubren que seguir a Jesús es la mejor aventura.",
      lider: "Ana Lisbeth Silverio",
      telefono: "+34 609 377 944",
      actividades: [
        "Exploradores (3 a 5 años)",
        "Valientes (6 a 8 años)",
        "Detectives (9 a 11 años)",
        "Juegos, música y manualidades",
        "Historias bíblicas interactivas",
        "Campamento urbano anual en julio",
      ],
      requisitos: [
        "Ser miembro activo y comprometido con la iglesia",
        "Estar bautizado",
        "Hacer el curso de integración",
        "Asistir a un grupo Peniel",
        "Amor por los niños",
        "Creatividad y paciencia",
        "Compromiso con la enseñanza bíblica",
        "Disponibilidad los domingos",
      ],
      impacto:
        "Una experiencia inolvidable que deja huellas en el corazón de cada niño",
      icono: "fas fa-child",
      color: "#f39c12",
      imagen: "/imgs/ministerios/kids.jpg",
    },
    {
      id: "consolidacion",
      nombre: "Atención Primaria y Consolidación",
      categoria: "Pastoral",
      frecuencia: "Continuo",
      horario: "Según necesidad personalizada",
      lema: "Acompañando en los primeros pasos en la nueva vida con Jesús",
      descripcion:
        "Nadie debe hacer este recorrido solo. Acompañamos de manera cercana y amorosa a quienes recién llegan a la fe.",
      descripcionCompleta:
        "Cuando una persona decide seguir a Cristo, comienza un viaje de transformación profunda. En Peniel, creemos que nadie debe hacer este recorrido solo. Por eso, a través del ministerio de Atención Primaria y Consolidación, acompañamos de manera cercana y amorosa a quienes recién llegan a la fe o se integran a nuestra iglesia. Este ministerio es el primer contacto para los nuevos creyentes. Les brindamos orientación, apoyo espiritual y acompañamiento personal para que puedan afianzar su relación con Dios y ser integrados a la familia de la iglesia. Nuestro enfoque sigue el Ciclo de Vida: Ganar, Consolidar, Discipular y Enviar. El ministerio de consolidación se enfoca en la segunda etapa: ayudar a que una decisión por Jesús se transforme en una verdadera conversión, fuerte, firme y estable.",
      lider: "Pedro Parra y Paula Scaccianoce",
      telefono: "+34 609 377 944",
      actividades: [
        "Contactamos a quienes han tomado la decisión de seguir a Cristo",
        "Acompañamiento personalizado (llamadas, visitas, encuentros)",
        "Enseñanza de fundamentos de la fe cristiana",
        "Preparación para el bautismo y su integración a la iglesia",
        "Caminamos con ellos hasta que estén listos para ser discipulados",
        "Formación para discipular a otros",
      ],
      requisitos: [
        "Ser miembro activo y comprometido con la iglesia",
        "Estar bautizado",
        "Hacer el curso de integración",
        "Asistir a un grupo Peniel",
        "Personas maduras en la fe",
        "Disponibilidad para acompañar nuevos creyentes",
        "Obediencia al llamado de Jesús de hacer discípulos",
      ],
      impacto:
        "Como Ananías con Saulo, un consolidador acompaña a otro en su proceso de transformación",
      icono: "fas fa-heart",
      color: "#9b59b6",
      imagen: "/imgs/ministerios/consolidacion.jpg",
      videoUrl: "/videos/ministerios/atencionprimaria.mp4", // Agrega la URL de tu video
    },
    {
      id: "instituto-biblico",
      nombre: "Instituto Bíblico Peniel",
      categoria: "Educación",
      frecuencia: "Semipresencial",
      horario: "Martes 21 hrs via Zoom",
      lema: "Formación bíblica para un ministerio con propósito",
      descripcion:
        "Preparación integral para líderes y todo aquel llamado a servir en el Reino de Dios.",
      descripcionCompleta:
        "El Instituto Bíblico Peniel es el espacio de formación teológica y espiritual de nuestra iglesia, diseñado para todos aquellos que desean profundizar en el estudio de la Palabra de Dios y prepararse para servir con excelencia en el ministerio. A través de un modelo semipresencial, ofrecemos una experiencia de aprendizaje flexible, accesible y transformadora, que combina el estudio personal con encuentros formativos presenciales y comunitarios. Utilizamos material oficial de Global University, una institución reconocida internacionalmente por su formación teológica y ministerial, con certificaciones internas que avalan tu progreso y te capacitan para servir en diferentes áreas de la iglesia.",
      lider: "Samuel Silverio",
      telefono: "+34 609 377 944",
      actividades: [
        "Material oficial de Global University",
        "Certificaciones internas",
        "Experiencia de aprendizaje flexible y accesible",
        "Estudio personal con encuentros presenciales",
        "Preparación integral para líderes",
        "Formación para pastores, maestros y evangelistas",
      ],
      requisitos: [
        "Deseo de profundizar su relación con Dios a través del estudio bíblico",
        "Llamado al servicio ministerial o liderazgo en la iglesia",
        "Preparación para discipular, enseñar y liderar con sabiduría",
        "Compromiso con la formación continua",
      ],
      impacto:
        "Una plataforma de lanzamiento para marcar una diferencia con fundamento, carácter y pasión por Cristo",
      icono: "fas fa-graduation-cap",
      color: "#3498db",
      imagen: "/imgs/ministerios/instituto.jpg",
    },
    {
      id: "misiones",
      nombre: "Misiones",
      categoria: "Evangelismo",
      frecuencia: "Continuo",
      horario: "9 Proyectos Globales + Fiesta de las Naciones",
      lema: "Hasta lo último de la tierra",
      descripcion:
        "Somos una comunidad misionera que ora, da y envía, respondiendo al mandato de Jesús en Mateo 28:19.",
      descripcionCompleta:
        "En Iglesia Peniel Comunidad Cristiana, creemos firmemente en el llamado global de la iglesia: llevar el Evangelio a todas las naciones. Por eso, somos una comunidad misionera que ora, da y envía, respondiendo al mandato de Jesús en Mateo 28:19. Apoyamos 9 proyectos misioneros en el mundo que reflejan nuestro deseo de impactar cada rincón del planeta con el mensaje de esperanza, salvación y transformación que solo Jesús puede dar. Cada año celebramos la Fiesta de las Naciones, un evento donde honramos la riqueza cultural de nuestra iglesia y del mundo.",
      lider: "Arsenia Suero",
      telefono: "+34 609 377 944",
      proyectosMisioneros: [
        "Pilar y Cristian - Holanda",
        "Familia Flores - Perú",
        "Geni y su hija Ester - Burkina Faso",
        "Eva - Comunidad china",
        "ONG Fiet Gratia - España / internacional",
        "Oasis Center Madrid - Ministerio urbano y multicultural",
        "Pramila - Estudiante del Instituto Bíblico en Nepal",
        "Familia Moslero - Grecia",
        "Melissa - Medio Oriente",
      ],
      actividades: [
        "Orando por los misioneros y los pueblos alcanzados",
        "Donando para sostener y expandir los proyectos",
        "Involucrándonos en la movilización misionera local e internacional",
        "Fiesta de las Naciones con comidas típicas, testimonios, danzas y música",
        "Oración por cada nación representada",
        "Comunicación regular con misioneros",
      ],
      requisitos: [
        "Ser miembro activo y comprometido con la iglesia",
        "Estar bautizado",
        "Hacer el curso de integración",
        "Asistir a un grupo Peniel",
        "Visión global del evangelio",
        "Compromiso con la oración por las naciones",
        "Corazón generoso para el sostenimiento",
        "Interés en la diversidad cultural",
      ],
      impacto:
        "Una celebración de unidad, fe y diversidad que impacta cada rincón del planeta",
      icono: "fas fa-globe",
      color: "#27ae60",
      imagen: "/imgs/ministerios/misiones.jpg",
    },
    {
      id: "evangelismo",
      nombre: "Evangelismo",
      categoria: "Evangelismo",
      frecuencia: "Semanal",
      horario: "Miércoles 19:00h - C.C. Alcalá Norte",
      lema: "Llevamos esperanza a nuestra ciudad",
      descripcion:
        "El mensaje de Jesús debe compartirse con amor, claridad y convicción. No es solo una buena noticia: es la mejor noticia.",
      descripcionCompleta:
        "En Iglesia Peniel, creemos que el mensaje de Jesús debe compartirse con amor, claridad y convicción. No es solo una buena noticia: es la mejor noticia que el mundo necesita oír. Por eso, como iglesia, salimos cada semana a las calles de nuestra ciudad para compartir el evangelio de manera práctica y cercana. Nos reunimos todos los miércoles a las 19:30h en el Centro Comercial Alcalá Norte (Ciudad Lineal, Madrid) para orar, compartir el mensaje de salvación, y hablar del amor de Dios con quienes más lo necesitan. Escuchamos, servimos y sembramos con fe, sabiendo que cada palabra puede transformar una vida.",
      lider: "Samuel Silverio",
      telefono: "+34 609 377 944",
      actividades: [
        "Reunión semanal en Centro Comercial Alcalá Norte",
        "Oración por la ciudad y preparación espiritual",
        "Compartir el mensaje de salvación de manera práctica",
        "Escuchar y servir a quienes más lo necesitan",
        "Sembrar con fe en las calles de Madrid",
        "Testimonios del amor de Dios",
      ],
      requisitos: [
        "Corazón dispuesto (no se requiere experiencia)",
        "Disponibilidad los miércoles por la tarde",
        "Deseo de compartir el amor de Dios",
      ],
      impacto:
        "Cada palabra puede transformar una vida en las calles de Madrid",
      icono: "fas fa-bullhorn",
      color: "#e74c3c",
      imagen: "/imgs/ministerios/evangelismo.jpg",
    },
    {
      id: "grupos-peniel",
      nombre: "Grupos Peniel",
      categoria: "Comunidad",
      frecuencia: "Semanal",
      horario: "Diversos horarios en hogares",
      lema: "La iglesia más allá de las cuatro paredes",
      descripcion:
        "Células que se reúnen en hogares por toda Madrid donde compartimos la vida real, crecemos espiritualmente y alcanzamos a nuestros vecinos.",
      descripcionCompleta:
        "Los Grupos Peniel son células que se reúnen en hogares por toda Madrid. Estos grupos son donde compartimos la vida real, crecemos espiritualmente y alcanzamos a nuestros vecinos con el amor de Cristo. Cada grupo es una mini-iglesia con propósito evangelístico. En estos espacios íntimos desarrollamos relaciones auténticas, estudiamos la Palabra de Dios de manera participativa, oramos unos por otros y planificamos maneras creativas de alcanzar a nuestra comunidad. Los grupos están diseñados para multiplicarse, formando nuevos líderes y expandiendo el Reino de Dios en cada barrio de Madrid.",
      lider: "Líderes de Célula",
      telefono: "+34 609 377 944",
      actividades: [
        "Reuniones semanales en hogares por toda Madrid",
        "Estudio bíblico participativo y vida real",
        "Oración intercesora unos por otros",
        "Comunión auténtica y relaciones profundas",
        "Alcance evangelístico comunitario",
        "Multiplicación y formación de nuevos líderes",
      ],
      requisitos: [
        "Deseo de comunidad genuina más allá de las cuatro paredes",
        "Compromiso semanal con el grupo",
        "Apertura para evangelismo vecinal",
        "Disposición para liderar eventualmente",
      ],
      impacto: "Expandiendo el Reino de Dios en cada barrio de Madrid",
      icono: "fas fa-home",
      color: "#8e44ad",
      imagen: "/imgs/ministerios/grupospeniel.jpeg",
    },
    {
      id: "alabanza-adoracion",
      nombre: "Alabanza y Adoración",
      categoria: "Adoración",
      frecuencia: "Semanal",
      horario: "Sabados y Domingos",
      lema: "Adorar es más que cantar; es responder con todo nuestro ser a la presencia de Dios",
      descripcion:
        "Exaltamos el nombre de Jesús con excelencia, pasión y reverencia, creando un ambiente donde cada persona pueda tener un encuentro real con Dios.",
      descripcionCompleta:
        "En Peniel, creemos que la alabanza y la adoración no son simplemente un momento del servicio, sino una expresión viva y poderosa de nuestra relación con Dios. Es el lenguaje del corazón rendido, la respuesta genuina a Su amor, y una puerta abierta para que el cielo toque la tierra. Nuestro ministerio de Alabanza y Adoración existe con un solo propósito: exaltar el nombre de Jesús con excelencia, pasión y reverencia. A través de la música, buscamos crear un ambiente donde cada persona pueda tener un encuentro real con Dios, donde las cadenas se rompan, los corazones se sanen y las vidas sean transformadas por Su presencia. No se trata de talento, sino de unción. No buscamos performance, buscamos presencia. No adoramos por lo que sentimos, adoramos por quién es Él.",
      lider: "Arturo Ccallo",
      telefono: "+34 609 377 944",
      actividades: [
        "Preparamos y guiamos los tiempos de alabanza en nuestras reuniones generales",
        "Cultivamos una atmósfera de adoración sensible al Espíritu Santo",
        "Formamos continuamente a músicos, cantantes y técnicos comprometidos",
        "Realizamos talleres formativos cada 15 días para crecer en habilidades",
        "Trabajamos en equipo con otros ministerios para servir integralmente",
        "Cada ensayo es una oportunidad para rendirnos más y servir mejor",
      ],
      requisitos: [
        "Ser miembro activo y comprometido con la iglesia",
        "Estar bautizado",
        "Hacer el curso de integración",
        "Asistir a un grupo Peniel",
        "Dones musicales o técnicos dados por Dios",
        "Compromiso con la excelencia y la reverencia",
        "Disponibilidad para ensayos y talleres formativos",
      ],
      impacto:
        "El Padre busca adoradores en espíritu y en verdad. Nosotros respondemos a ese llamado",
      icono: "fas fa-music",
      color: "#d946ef",
      imagen: "/imgs/ministerios/adoracion.jpg",
    },
  ];

  const categorias = [
    "Todos",
    "Servicio",
    "Jóvenes",
    "Niños",
    "Pastoral",
    "Educación",
    "Evangelismo",
    "Comunidad",
    "Adoración",
  ];
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const ministeriosFiltrados =
    categoriaActiva === "Todos"
      ? ministerios
      : ministerios.filter((m) => m.categoria === categoriaActiva);

  const abrirModal = (ministerio) => {
    setMinisterioActivo(ministerio);
  };

  const cerrarModal = () => {
    setMinisterioActivo(null);
  };

  return (
    <div className="ministerios-page">
      {/* Hero Section */}
      <div className="ministerios-hero">
        <div className="container-clean">
          <h1>NUESTROS MINISTERIOS</h1>
          <p>"Sirviendo con propósito, predicando a Jesús."</p>
        </div>
      </div>

      {/* Introducción */}
      <section className="section-ministerios">
        <div className="container-ministerios">
          <div className="intro-ministerios">
            <div className="intro-text">
              <h2>Una iglesia con propósito</h2>
              <p>
                En Peniel Madrid creemos que cada persona tiene dones únicos que
                Dios quiere usar para bendecir a otros. Nuestros ministerios no
                son solo programas, son oportunidades para descubrir tu llamado,
                desarrollar tus talentos y ser parte de algo más grande que tú
                mismo.
              </p>
            </div>
            <div className="intro-video">
              <video className="intro-video-element" controls playsInline>
                <source src="/videos/ministerios/ministerios.mov" type="video/quicktime" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="section-ministerios bg-dark">
        <div className="container-ministerios">
          <div className="filtros-section">
            <h2>Explora por categoría</h2>
            <div className="filtros-container">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  className={`filtro-btn ${
                    categoriaActiva === categoria ? "active" : ""
                  }`}
                  onClick={() => setCategoriaActiva(categoria)}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Ministerios */}
      <section className="section-ministerios">
        <div className="container-ministerios">
          <div className="ministerios-grid">
            {ministeriosFiltrados.map((ministerio, index) => (
              <div key={index} className="ministerio-card-modern">
                <div className="card-image">
                  <img src={ministerio.imagen} alt={ministerio.nombre} />
                  <div className="card-overlay">
                    <div className="ministerio-icon-modern">
                      <i className={ministerio.icono}></i>
                    </div>
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <span
                      className="categoria-badge"
                      style={{ background: ministerio.color }}
                    >
                      {ministerio.categoria}
                    </span>
                    <div className="horario-badge">
                      <i className="far fa-clock"></i>
                      <span>{ministerio.frecuencia}</span>
                    </div>
                  </div>

                  <h3>{ministerio.nombre}</h3>
                  <p className="lema">{ministerio.lema}</p>
                  <p className="descripcion">{ministerio.descripcion}</p>

                  <div className="card-footer">
                    <div className="leader-info">
                      <i className="fas fa-user-tie"></i>
                      <span>{ministerio.lider}</span>
                    </div>

                    <div className="card-actions">
                      <button
                        className="btn-info"
                        onClick={() => abrirModal(ministerio)}
                      >
                        <i className="fas fa-info-circle"></i>
                        Más Info
                      </button>
                      <a
                        href={`https://wa.me/${ministerio.telefono.replace(
                          /\s/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-join"
                        style={{ background: ministerio.color }}
                      >
                        <i className="fab fa-whatsapp"></i>
                        Unirme
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-ministerios bg-dark">
        <div className="container-ministerios">
          <div className="cta-ministerios">
            <h2>¿Listo para usar tus dones?</h2>
            <p>
              No importa cuáles sean tus talentos, experiencia o disponibilidad,
              hay un lugar para ti en el Reino de Dios. Da el paso y descubre
              cómo Dios puede usar tu vida para transformar otras vidas.
            </p>
            <div className="cta-buttons">
              <a href="/contacto" className="btn-cta primary">
                <i className="fas fa-phone"></i>
                Contacta
              </a>
              <a
                href="https://wa.me/34609377944"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta secondary"
              >
                <i className="fab fa-whatsapp"></i>
                WhatsApp
              </a>
            </div>
            <div className="contact-info">
              También puedes escribirnos al <strong>+34 609 377 944</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Moderno */}
      {ministerioActivo && (
        <div className="modal-overlay-ministerios" onClick={cerrarModal}>
          <div
            className="modal-modern-ministerios"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={cerrarModal}>
              <i className="fas fa-times"></i>
            </button>

            <div className="modal-body-ministerios">
              <div className="modal-image-side">
                <img
                  src={ministerioActivo.imagen}
                  alt={ministerioActivo.nombre}
                />
                <div className="modal-image-overlay">
                  <div
                    className="modal-icon-large"
                    style={{ background: ministerioActivo.color }}
                  >
                    <i className={ministerioActivo.icono}></i>
                  </div>
                  <div className="modal-header-content">
                    <h3>{ministerioActivo.nombre}</h3>
                    <p className="modal-lema">{ministerioActivo.lema}</p>
                    <span
                      className="modal-categoria"
                      style={{ color: ministerioActivo.color }}
                    >
                      {ministerioActivo.categoria}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-content-side">
                {/* Video dentro del modal si existe */}
                {ministerioActivo.videoUrl && (
                  <div className="modal-video-section">
                    <video
                      className="modal-video"
                      controls
                      poster={ministerioActivo.imagen}
                    >
                      <source
                        src={ministerioActivo.videoUrl}
                        type="video/mp4"
                      />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                )}

                <div className="modal-section">
                  <h4>
                    <i className="fas fa-heart"></i> Acerca de este ministerio
                  </h4>
                  <p>{ministerioActivo.descripcionCompleta}</p>
                </div>

                {ministerioActivo.proyectosMisioneros && (
                  <div className="modal-section">
                    <h4>
                      <i className="fas fa-globe"></i> Proyectos Misioneros
                    </h4>
                    <div className="proyectos-grid">
                      {ministerioActivo.proyectosMisioneros.map(
                        (proyecto, idx) => (
                          <div key={idx} className="proyecto-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{proyecto}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="modal-info-grid">
                  <div className="modal-info-section">
                    <h4>
                      <i className="fas fa-tasks"></i> Actividades
                    </h4>
                    <ul>
                      {ministerioActivo.actividades.map((actividad, idx) => (
                        <li key={idx}>{actividad}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="modal-info-section">
                    <h4>
                      <i className="fas fa-check-circle"></i> Requisitos
                    </h4>
                    <ul>
                      {ministerioActivo.requisitos.map((requisito, idx) => (
                        <li key={idx}>{requisito}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="modal-impact">
                  <div className="impact-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <p>"{ministerioActivo.impacto}"</p>
                </div>

                <div className="modal-contact-info">
                  <div className="contact-item">
                    <i className="fas fa-user-tie"></i>
                    <span>Responsable(s): {ministerioActivo.lider}</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>{ministerioActivo.telefono}</span>
                  </div>
                  <div className="contact-item">
                    <i className="far fa-clock"></i>
                    <span>{ministerioActivo.horario}</span>
                  </div>
                </div>

                <div className="modal-actions">
                  <a
                    href={`https://wa.me/${ministerioActivo.telefono.replace(
                      /\s/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modal-action"
                    style={{ background: ministerioActivo.color }}
                  >
                    <i className="fab fa-whatsapp"></i>
                    Contáctanos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ministerios;
