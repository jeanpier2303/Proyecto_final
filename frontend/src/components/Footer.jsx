import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Kahua Jugos</h3>
            <p>Frutos del Pacífico. Ofrecemos los jugos más frescos y naturales directamente desde las costas del Pacífico hasta tu mesa.</p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Enlaces Rápidos</h3>
            <a href="#">Inicio</a><br />
            <a href="#">Productos</a><br />
            <a href="#">Sobre Nosotros</a><br />
            <a href="#">Beneficios</a><br />
            <a href="#">Contacto</a>
          </div>

          <div className="footer-column">
            <h3>Información de Contacto</h3>
            <p><i className="fas fa-map-marker-alt"></i> Costa del Pacífico, Ecuador</p>
            <p><i className="fas fa-phone"></i> +593 98 765 4321</p>
            <p><i className="fas fa-envelope"></i> info@kahuajugos.com</p>
          </div>

          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>Suscríbete para recibir ofertas exclusivas y noticias sobre nuevos sabores.</p>
            <div className="newsletter">
              <input type="email" placeholder="Tu correo electrónico" />
              <button>OK</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Kahua Jugos - Frutos del Pacífico. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
