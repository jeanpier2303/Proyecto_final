import React from "react";
import "../assets/styles/Inicio.css";

const HomePrivate = () => {
  return (
    <main className="dashboard-home">
      {/* Sección principal tipo Hero */}
      <section className="sales-hero" id="inicio">
        <div className="container">
          <div className="hero-content">
            <h1>
              Frutas <span>Frescas</span> del Pacífico
            </h1>
            <p>
              Descubre nuestra selección premium de jugos y frutas naturales,
              directamente del campo a tu mesa.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Productos</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Natural</span>
              </div>
              <div className="stat">
                <span className="stat-number">24h</span>
                <span className="stat-label">Entrega</span>
              </div>
            </div>
          </div>
        </div>
        <div className="fruit-animation">
          <div className="fruit fruit-1"></div>
          <div className="fruit fruit-2"></div>
          <div className="fruit fruit-3"></div>
          <div className="fruit fruit-4"></div>
        </div>
      </section>

      {/* Sección de Ofertas */}
      <section className="special-offers" id="ofertas">
        <div className="container">
          <h2>Ofertas Especiales</h2>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-badge">20%</div>
              <h3>Oferta de Temporada</h3>
              <p>20% de descuento en jugos tropicales Kahua</p>
              <button className="btn-offer">Ver Oferta</button>
            </div>
            <div className="offer-card">
              <div className="offer-badge">33%</div>
              <h3>Combo Familiar</h3>
              <p>
                Llévate 3 botellas de 1L por el precio de 2. ¡Aprovecha esta
                promoción exclusiva!
              </p>
              <button className="btn-offer">Ver Oferta</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePrivate;
