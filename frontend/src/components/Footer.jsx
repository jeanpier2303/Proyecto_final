import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`¡Gracias por suscribirte con: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Kahua Jugos</h3>
            <p>Jugos naturales directamente desde las costas del Pacífico.</p>
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" title="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Enlaces</h3>
            <div className="footer-links">
              <a href="#inicio">Inicio</a>
              <a href="#productos">Productos</a>
              <a href="#contacto">Contacto</a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Contacto</h3>
            <div className="contact-info">
              <p>
                <i className="fas fa-phone"></i>
                <span>+593 98 765 4321</span>
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                <span>info@kahuajugos.com</span>
              </p>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>Recibe ofertas exclusivas</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="newsletter-btn">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Kahua Jugos - Frutos del Pacífico</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;