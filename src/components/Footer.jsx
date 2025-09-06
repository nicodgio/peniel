import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contacto">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Iglesia Peniel Comunidad Cristiana</h3>
          <p>
            Un encuentro con Dios lo cambia todo. Construyendo una comunidad de
            fe, esperanza y amor centrada en Jesucristo.
          </p>
          <div className="social-links">
            <a
              href="https://www.instagram.com/penielmadrid/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Peniel Madrid"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href="https://www.youtube.com/@CcPeniel" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Canal de YouTube de Peniel"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a 
              href="https://wa.me/34609377944" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Peniel Madrid"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
            <li><Link to="/ministerios">Ministerios</Link></li>
            <li><Link to="/reuniones">Horarios</Link></li>
            <li><Link to="/predicas">Prédicas</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Involúcrate</h4>
          <ul>
            <li><Link to="/grupos-peniel">Grupos Peniel</Link></li>
            <li><Link to="/ministerios">Voluntariado</Link></li>
            <li><Link to="/ministerios">Instituto Bíblico</Link></li>
            <li><Link to="/ministerios">Misiones</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul>
            <li>
              <a 
                href="https://maps.google.com/?q=Calle+Miguel+Fleta+11,+Madrid" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Calle Miguel Fleta 11
              </a>
            </li>
            <li>
              <a 
                href="https://maps.google.com/?q=28037+Madrid" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                28037, Madrid
              </a>
            </li>
            <li>
              <a href="tel:+34609377944">(+34) 609 377 944</a>
            </li>
            <li>
              <a href="mailto:secretariapenielmadrid@gmail.com">
                secretariapenielmadrid@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-copyright">
        <p>
          &copy; 2025 Iglesia Peniel Comunidad Cristiana. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;