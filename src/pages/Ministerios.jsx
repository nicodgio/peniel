import React, { useState } from 'react';
import '../css/inicio/ministerios.css';

const Ministerios = () => {
  const [ministerioActivo, setMinisterioActivo] = useState(null);

  const ministerios = [
    {
      id: 'accion-social',
      nombre: 'Acción Social',
      categoria: 'Servicio',
      frecuencia: 'Mensual',
      horario: 'Sábados 10:00 HS',
      descripcion: 'Transformamos vidas a través del servicio práctico a nuestra comunidad.',
      descripcionCompleta: 'Nuestro ministerio de Acción Social es el corazón compasivo de Peniel Madrid. Operamos un banco de alimentos y ropero comunitario que atiende a familias en situación de vulnerabilidad. Promovemos la economía circular y la sostenibilidad mientras demostramos el amor de Cristo de manera práctica.',
      lider: 'Carmen Rodríguez',
      telefono: '+34 600 123 456',
      actividades: [
        'Banco de alimentos semanal',
        'Ropero comunitario',
        'Campañas de recolección',
        'Visitas a familias necesitadas',
        'Colaboración con ONGs locales'
      ],
      requisitos: [
        'Corazón de servicio',
        'Disponibilidad los sábados',
        'Compromiso mensual mínimo'
      ],
      icono: 'fas fa-hands-helping',
      color: '#e74c3c'
    },
    {
      id: 'peniel-ng',
      nombre: 'Peniel NG (Next Generation)',
      categoria: 'Jóvenes',
      frecuencia: 'Semanal',
      horario: 'Sábados 19:00 HS',
      descripcion: 'Empoderando a la nueva generación para impactar su mundo.',
      descripcionCompleta: 'Peniel NG es nuestro dinámico ministerio para adolescentes (12-18) y jóvenes (18-35). Creamos un espacio donde la nueva generación puede experimentar a Dios de manera relevante y contemporánea, desarrollando liderazgo y propósito para transformar su generación.',
      lider: 'David Martínez',
      telefono: '+34 600 234 567',
      actividades: [
        'Reuniones dinámicas con música contemporánea',
        'Talleres de liderazgo juvenil',
        'Dos campamentos anuales',
        'Noches de juegos y comunión',
        'Proyectos de evangelismo creativo',
        'Mentoría personal'
      ],
      requisitos: [
        'Edad entre 12-35 años',
        'Deseo de crecer espiritualmente',
        'Participación regular en reuniones'
      ],
      icono: 'fas fa-rocket',
      color: '#9b59b6'
    },
    {
      id: 'peniel-kids',
      nombre: 'Peniel Kids',
      categoria: 'Niños',
      frecuencia: 'Semanal',
      horario: 'Domingos 11:00 HS',
      descripcion: 'Sembrando semillas de fe en los corazones más pequeños.',
      descripcionCompleta: 'Peniel Kids ofrece enseñanza creativa y apropiada para la edad de niños de 3-11 años. Nuestros programas incluyen Exploradores (3-5), Valientes (6-8) y Detectives (9-11), cada uno diseñado para enseñar verdades bíblicas de manera divertida y memorable.',
      lider: 'Ana García',
      telefono: '+34 600 345 678',
      actividades: [
        'Clases dominicales por edades',
        'Teatro y representaciones bíblicas',
        'Manualidades y actividades creativas',
        'Campamento urbano en julio',
        'Festivales familiares',
        'Programas de memorización bíblica'
      ],
      requisitos: [
        'Amor por los niños',
        'Paciencia y creatividad',
        'Compromiso con la enseñanza bíblica',
        'Certificado de antecedentes (requerido)'
      ],
      icono: 'fas fa-child',
      color: '#f39c12'
    },
    {
      id: 'consolidacion',
      nombre: 'Atención Primaria y Consolidación',
      categoria: 'Pastoral',
      frecuencia: 'Continuo',
      horario: 'Flexible según necesidad',
      descripcion: 'Acompañando a cada persona en sus primeros pasos de fe.',
      descripcionCompleta: 'Este ministerio vital se encarga del primer contacto con nuevos visitantes y recién convertidos. Proporcionamos acompañamiento personalizado durante los primeros pasos cruciales en la fe cristiana, asegurándonos de que nadie camine solo en su jornada espiritual.',
      lider: 'Miguel Santos',
      telefono: '+34 600 456 789',
      actividades: [
        'Recepción de nuevos visitantes',
        'Seguimiento personalizado',
        'Clases de fundamentos de la fe',
        'Conexión con grupos pequeños',
        'Mentorías individuales',
        'Programa de integración de 3 meses'
      ],
      requisitos: [
        'Madurez espiritual',
        'Habilidades de comunicación',
        'Disponibilidad para seguimiento',
        'Corazón pastoral'
      ],
      icono: 'fas fa-heart',
      color: '#e67e22'
    },
    {
      id: 'instituto-biblico',
      nombre: 'Instituto Bíblico Peniel',
      categoria: 'Educación',
      frecuencia: 'Semanal',
      horario: 'Martes 21:00 HS',
      descripcion: 'Formación teológica sólida para el ministerio y la vida.',
      descripcionCompleta: 'Nuestro Instituto Bíblico ofrece formación teológica semipresencial utilizando material de Global University. Proporcionamos educación bíblica de calidad para equipar a los santos para la obra del ministerio, con certificaciones internas disponibles.',
      lider: 'Pastor Julio Ortega',
      telefono: '+34 600 567 890',
      actividades: [
        'Clases presenciales semanales',
        'Estudio personal dirigido',
        'Seminarios especializados',
        'Proyectos de investigación bíblica',
        'Conferencias con invitados',
        'Certificación en teología básica'
      ],
      requisitos: [
        'Compromiso de estudio',
        'Asistencia regular a clases',
        'Completar asignaciones',
        'Recomendación pastoral'
      ],
      icono: 'fas fa-graduation-cap',
      color: '#3498db'
    },
    {
      id: 'misiones',
      nombre: 'Misiones',
      categoria: 'Evangelismo',
      frecuencia: 'Continuo',
      horario: '9 Proyectos Globales',
      descripcion: 'Llevando el evangelio hasta lo último de la tierra.',
      descripcionCompleta: 'Nuestro corazón misionero nos lleva a apoyar proyectos evangelísticos alrededor del mundo. Mantenemos 9 proyectos misioneros activos y celebramos anualmente la Fiesta de las Naciones, conectando nuestra iglesia local con la visión global del Reino de Dios.',
      lider: 'Rosa Delgado',
      telefono: '+34 600 678 901',
      actividades: [
        'Apoyo a 9 misioneros globales',
        'Fiesta de las Naciones anual',
        'Campañas de ofrenda misionera',
        'Comunicación con misioneros',
        'Educación sobre misiones mundiales',
        'Viajes misioneros cortos'
      ],
      requisitos: [
        'Visión global del evangelio',
        'Compromiso con la oración',
        'Generosidad para ofrendas',
        'Interés en otras culturas'
      ],
      icono: 'fas fa-globe',
      color: '#27ae60'
    },
    {
      id: 'evangelismo',
      nombre: 'Evangelismo',
      categoria: 'Evangelismo',
      frecuencia: 'Semanal',
      horario: 'Miércoles 19:00 HS',
      descripcion: 'Compartiendo esperanza en las calles de Madrid.',
      descripcionCompleta: 'Cada semana salimos a las calles de Madrid para compartir el amor de Cristo de manera práctica y relevante. Nuestro punto de encuentro es el Centro Comercial Alcalá Norte en Ciudad Lineal, desde donde desplegamos equipos de evangelismo por toda la zona.',
      lider: 'Carlos Ruiz',
      telefono: '+34 600 789 012',
      actividades: [
        'Evangelismo callejero semanal',
        'Repartición de literatura cristiana',
        'Oración por las calles',
        'Eventos evangelísticos especiales',
        'Capacitación en evangelismo personal',
        'Testimonios públicos'
      ],
      requisitos: [
        'Pasión por las almas perdidas',
        'Disponibilidad los miércoles',
        'Valentía para compartir la fe',
        'Entrenamiento en evangelismo'
      ],
      icono: 'fas fa-bullhorn',
      color: '#e74c3c'
    },
    {
      id: 'grupos-peniel',
      nombre: 'Grupos Peniel',
      categoria: 'Comunidad',
      frecuencia: 'Semanal',
      horario: 'Diversos horarios en hogares',
      descripcion: 'La iglesia más allá de las cuatro paredes.',
      descripcionCompleta: 'Los Grupos Peniel son células que se reúnen en hogares por toda Madrid. Estos grupos son donde compartimos la vida real, crecemos espiritualmente y alcanzamos a nuestros vecinos con el amor de Cristo. Cada grupo es una mini-iglesia con propósito evangelístico.',
      lider: 'Varios Líderes',
      telefono: '+34 609 377 944',
      actividades: [
        'Reuniones semanales en hogares',
        'Estudio bíblico participativo',
        'Oración intercesora',
        'Eventos de alcance comunitario',
        'Multiplicación de grupos',
        'Formación de líderes'
      ],
      requisitos: [
        'Deseo de comunidad genuina',
        'Compromiso semanal',
        'Apertura para evangelismo',
        'Disposición para liderar (eventual)'
      ],
      icono: 'fas fa-home',
      color: '#9b59b6'
    }
  ];

  const categorias = ['Todos', 'Servicio', 'Jóvenes', 'Niños', 'Pastoral', 'Educación', 'Evangelismo', 'Comunidad'];
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  const ministeriosFiltrados = categoriaActiva === 'Todos' 
    ? ministerios 
    : ministerios.filter(m => m.categoria === categoriaActiva);

  const abrirModal = (ministerio) => {
    setMinisterioActivo(ministerio);
  };

  const cerrarModal = () => {
    setMinisterioActivo(null);
  };

  return (
    <div className="page-content">
      <section className="ministerios-page">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        
        <div className="section-header">
          <h2 className="section-title">NUESTROS MINISTERIOS</h2>
          <p className="section-subtitle">
            Descubre tu lugar en el Reino de Dios y usa tus dones para transformar vidas
          </p>
        </div>

        <div className="ministerios-container">
          <div className="vision-ministerios">
            <div className="vision-content">
              <h3>Una iglesia con propósito</h3>
              <p>
                En Peniel Madrid creemos que cada persona tiene dones únicos que Dios quiere usar 
                para bendecir a otros. Nuestros ministerios no son solo programas, son oportunidades 
                para descubrir tu llamado, desarrollar tus talentos y ser parte de algo más grande que tú mismo.
              </p>
              <div class="vision-stats">
                <div class="stat-item">
                  <span class="number">8</span>
                  <span class="label">Ministerios Activos</span>
                </div>
                <div class="stat-item">
                  <span class="number">150+</span>
                  <span class="label">Voluntarios</span>
                </div>
                <div class="stat-item">
                  <span class="number">12</span>
                  <span class="label">Líderes Principales</span>
                </div>
              </div>
            </div>
          </div>

          <div className="filtros-section">
            <h3>Explora por categoría</h3>
            <div className="filtros-tabs">
              {categorias.map(categoria => (
                <button 
                  key={categoria}
                  className={`filtro-tab ${categoriaActiva === categoria ? 'active' : ''}`}
                  onClick={() => setCategoriaActiva(categoria)}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>

          <div className="ministerios-grid">
            {ministeriosFiltrados.map((ministerio, index) => (
              <div key={index} className="ministerio-card">
                <div className="ministerio-header">
                  <div className="ministerio-icon" style={{ background: `linear-gradient(135deg, ${ministerio.color}, ${ministerio.color}dd)` }}>
                    <i className={ministerio.icono}></i>
                  </div>
                  <div className="ministerio-meta">
                    <span className="categoria" style={{ color: ministerio.color }}>
                      {ministerio.categoria}
                    </span>
                    <div className="horario-info">
                      <i className="far fa-clock"></i>
                      <span>{ministerio.horario}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ministerio-content">
                  <h4>{ministerio.nombre}</h4>
                  <p>{ministerio.descripcion}</p>
                  
                  <div className="ministerio-detalles">
                    <div className="detalle-item">
                      <i className="fas fa-user-tie"></i>
                      <span>Líder: {ministerio.lider}</span>
                    </div>
                    <div className="detalle-item">
                      <i className="far fa-calendar"></i>
                      <span>{ministerio.frecuencia}</span>
                    </div>
                  </div>
                  
                  <div className="ministerio-actions">
                    <button 
                      className="btn-secundario"
                      onClick={() => abrirModal(ministerio)}
                    >
                      <i className="fas fa-info-circle"></i>
                      MÁS INFO
                    </button>
                    <a 
                      href={`https://wa.me/${ministerio.telefono.replace(/\s/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primario"
                    >
                      <i className="fab fa-whatsapp"></i>
                      UNIRME
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="llamado-section">
            <div className="llamado-content">
              <h3>¿Listo para usar tus dones?</h3>
              <p>
                No importa cuáles sean tus talentos, experiencia o disponibilidad, 
                hay un lugar para ti en el Reino de Dios. Da el paso y descubre 
                cómo Dios puede usar tu vida para transformar otras vidas.
              </p>
              <div className="llamado-actions">
                <a href="/contacto" className="btn btn-primary">
                  <i className="fas fa-phone"></i>
                  CONTACTAR PASTORAL
                </a>
                <a href="https://wa.me/34609377944" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fab fa-whatsapp"></i>
                  WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de información detallada */}
        {ministerioActivo && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={cerrarModal}>
                <i className="fas fa-times"></i>
              </button>
              
              <div className="modal-header">
                <div className="modal-icon" style={{ background: `linear-gradient(135deg, ${ministerioActivo.color}, ${ministerioActivo.color}dd)` }}>
                  <i className={ministerioActivo.icono}></i>
                </div>
                <div>
                  <h3>{ministerioActivo.nombre}</h3>
                  <p className="modal-categoria" style={{ color: ministerioActivo.color }}>
                    {ministerioActivo.categoria}
                  </p>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-descripcion">
                  <h4>Acerca de este ministerio</h4>
                  <p>{ministerioActivo.descripcionCompleta}</p>
                </div>

                <div className="modal-info-grid">
                  <div className="modal-info-section">
                    <h4><i className="fas fa-tasks"></i> Actividades principales</h4>
                    <ul>
                      {ministerioActivo.actividades.map((actividad, idx) => (
                        <li key={idx}>{actividad}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="modal-info-section">
                    <h4><i className="fas fa-check-circle"></i> Requisitos</h4>
                    <ul>
                      {ministerioActivo.requisitos.map((requisito, idx) => (
                        <li key={idx}>{requisito}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="modal-contacto">
                  <h4>Información de contacto</h4>
                  <div className="contacto-info">
                    <div className="contacto-item">
                      <i className="fas fa-user-tie"></i>
                      <span>Líder: {ministerioActivo.lider}</span>
                    </div>
                    <div className="contacto-item">
                      <i className="fas fa-phone"></i>
                      <span>{ministerioActivo.telefono}</span>
                    </div>
                    <div className="contacto-item">
                      <i className="far fa-clock"></i>
                      <span>{ministerioActivo.horario}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <a 
                    href={`https://wa.me/${ministerioActivo.telefono.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <i className="fab fa-whatsapp"></i>
                    CONTACTAR LÍDER
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Ministerios;