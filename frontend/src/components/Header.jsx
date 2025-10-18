import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        {/* Logo - Reemplaza con tu imagen */}
        <a className="navbar-brand" href="#">
          <img 
            src="/logo.png" 
            alt="Kahua Jugos" 
            className="logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span style={{display: 'none', fontSize: '1.8rem', fontWeight: '800', color: 'var(--dark-color)'}}>
            Kahua<span style={{color: 'var(--primary-color)'}}>Jugos</span>
          </span>
        </a>
        
        <div className="d-flex gap-3">
          <button className="btn btn-login btn-custom">Iniciar Sesión</button>
          <button className="btn btn-register btn-custom">Registrarse</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;