import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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

          {/* Desktop Navigation */}
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

          {/* Mobile Hamburger */}
          <div 
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-content">
          <ul className="mobile-nav-links">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                INICIO
              </Link>
            </li>
            <li>
              <Link 
                to="/quienes-somos" 
                className={location.pathname === '/quienes-somos' ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                QUIÉNES SOMOS
              </Link>
            </li>
            <li>
              <Link 
                to="/reuniones" 
                className={location.pathname === '/reuniones' ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                REUNIONES
              </Link>
            </li>
            <li>
              <Link 
                to="/grupos-peniel" 
                className={location.pathname === '/grupos-peniel' ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                GRUPOS PENIEL
              </Link>
            </li>
            <li>
              <Link 
                to="/ministerios" 
                className={location.pathname === '/ministerios' ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                MINISTERIOS
              </Link>
            </li>
            <li>
              <Link 
                to="/donaciones" 
                className={location.pathname === '/donaciones' ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                DONACIONES
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                className={location.pathname === '/blog' ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                BLOG
              </Link>
            </li>
            <li>
              <Link 
                to="/contacto" 
                className={location.pathname === '/contacto' ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                CONTACTO
              </Link>
            </li>
          </ul>

          <div className="mobile-nav-footer">
            <p>Iglesia Peniel Madrid</p>
          </div>
        </div>
      </div>

      {/* Botón flotante "Soy Nuevo" */}
      <Link to="/contacto" className="nuevo-button">
        <span className="nuevo-text">SOY NUEVO</span>
        <div className="nuevo-icon">👋</div>
      </Link>
    </>
  );
};

export default Navbar;