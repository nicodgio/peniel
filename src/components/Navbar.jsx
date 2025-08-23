import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="logo">
            <div className="logo-img">
              <img src="/imgs/peniel.svg" alt="Peniel Madrid" />
            </div>
            <div className="logo-text">
              <div className="peniel">PENIEL</div>
              <div className="madrid">MADRID</div>
            </div>
          </Link>
          <ul className="nav-links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>INICIO</Link></li>
            <li><Link to="/quienes-somos" className={location.pathname === '/quienes-somos' ? 'active' : ''}>QUIÉNES SOMOS</Link></li>
            <li><Link to="/reuniones" className={location.pathname === '/reuniones' ? 'active' : ''}>REUNIONES</Link></li>
            <li><Link to="/grupos-peniel" className={location.pathname === '/grupos-peniel' ? 'active' : ''}>GRUPOS PENIEL</Link></li>
            <li><Link to="/ministerios" className={location.pathname === '/ministerios' ? 'active' : ''}>MINISTERIOS</Link></li>
            <li><Link to="/donaciones" className={location.pathname === '/donaciones' ? 'active' : ''}>DONACIONES</Link></li>
            <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>BLOG</Link></li>
            <li><Link to="/contacto" className={location.pathname === '/contacto' ? 'active' : ''}>CONTACTO</Link></li>
          </ul>
        </div>
      </nav>

      {/* Botón flotante "Soy Nuevo" */}
      <Link to="/contacto" className="nuevo-button">
        <span className="nuevo-text">SOY NUEVO</span>
        <div className="nuevo-icon">👋</div>
      </Link>
    </>
  );
};

export default Navbar;