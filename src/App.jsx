import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Reuniones from './pages/Reuniones';
import GruposPeniel from './pages/GruposPeniel';
import Ministerios from './pages/Ministerios';
import Donaciones from './pages/Donaciones';
import Blog from './pages/Blog';
import DevocionalDetalle from './pages/DevocionalDetalle';
import Contacto from './pages/Contacto';
import Footer from './components/Footer';
import './css/globales/global.css';
import './css/globales/nav.css';
import './css/globales/footer.css';

// Componente para manejar el scroll automático al cambiar de página
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => {
  return (
    <Router>
      <div className="peniel-app">
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<About />} />
            <Route path="/reuniones" element={<Reuniones />} />
            <Route path="/grupos-peniel" element={<GruposPeniel />} />
            <Route path="/ministerios" element={<Ministerios />} />
            <Route path="/donaciones" element={<Donaciones />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<DevocionalDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;