import React, { useState } from "react";
import NavPrivate from "../../components/NavPrivate";
import Footer from "../../components/Footer";
import "../../assets/styles/Home.css";
import "../assets/styles/Ofertas.css";

const Ofertas = () => {
  const [activeFilter, setActiveFilter] = useState("todas");

  const filters = [
    { id: "todas", name: "Todas las Ofertas" },
    { id: "destacadas", name: "Destacadas" },
    { id: "proximas", name: "Próximas" },
    { id: "exclusivas", name: "Exclusivas" }
  ];

  const offers = [
    {
      id: 1,
      title: "Oferta de Verano",
      discount: "30%",
      category: "destacadas",
      image: "/assets/images/offers/summer-offer.jpg",
      description: "30% de descuento en toda la línea de jugos tropicales",
      validUntil: "2024-08-31",
      code: "VERANO24",
      products: ["Jugo de Mango", "Jugo de Piña", "Jugo de Maracuyá"]
    },
    {
      id: 2,
      title: "Combo Familiar",
      discount: "40%",
      category: "exclusivas",
      image: "/assets/images/offers/family-combo.jpg",
      description: "Llévate 3 botellas de 1L por el precio de 2",
      validUntil: "2024-07-15",
      code: "FAMILIA40",
      products: ["Todos los jugos 1L"]
    },
    {
      id: 3,
      title: "Primera Compra",
      discount: "25%",
      category: "destacadas",
      image: "/assets/images/offers/first-purchase.jpg",
      description: "25% de descuento en tu primer pedido online",
      validUntil: "2024-12-31",
      code: "BIENVENIDO25",
      products: ["Todos los productos"]
    },
    {
      id: 4,
      title: "Frutas de Temporada",
      discount: "20%",
      category: "proximas",
      image: "/assets/images/offers/seasonal-fruits.jpg",
      description: "20% de descuento en frutas de temporada",
      validUntil: "2024-09-30",
      code: "TEMPORADA20",
      products: ["Piña", "Mango", "Maracuyá"]
    }
  ];

  const filteredOffers = activeFilter === "todas" 
    ? offers 
    : offers.filter(offer => offer.category === activeFilter);

  return (
    <>
      <NavPrivate />
      <main className="offers-page">
        {/* Hero Section de Ofertas */}
        <section className="offers-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Ofertas <span>Especiales</span></h1>
              <p>Aprovecha nuestros descuentos exclusivos y promociones limitadas</p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">{offers.length}+</span>
                  <span className="stat-label">Ofertas Activas</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Hasta 40%</span>
                  <span className="stat-label">Descuento</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros de Ofertas */}
        <section className="offers-filters">
          <div className="container">
            <div className="filters-container">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de Ofertas */}
        <section className="offers-grid-section">
          <div className="container">
            <div className="section-title">
              <h2>Ofertas Disponibles</h2>
              <p>No dejes pasar estas oportunidades únicas</p>
            </div>

            <div className="offers-grid">
              {filteredOffers.map(offer => (
                <div key={offer.id} className="offer-card-large">
                  <div className="offer-header">
                    <div className="offer-badge-large">{offer.discount} OFF</div>
                    <div className="offer-category">{offer.category}</div>
                  </div>
                  
                  <div className="offer-image">
                    <img src={offer.image} alt={offer.title} />
                  </div>
                  
                  <div className="offer-content">
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    
                    <div className="offer-details">
                      <div className="detail-item">
                        <i className="bi bi-calendar"></i>
                        <span>Válido hasta: {new Date(offer.validUntil).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-tag"></i>
                        <span>Código: <strong>{offer.code}</strong></span>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-box"></i>
                        <span>Productos: {offer.products.join(", ")}</span>
                      </div>
                    </div>
                    
                    <div className="offer-actions">
                      <button className="btn btn-primary">
                        <i className="bi bi-cart-plus"></i> Aplicar Oferta
                      </button>
                      <button className="btn btn-outline">
                        <i className="bi bi-share"></i> Compartir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner de Newsletter */}
            <div className="newsletter-banner">
              <div className="newsletter-content">
                <h3>¡No te pierdas ninguna oferta!</h3>
                <p>Suscríbete y recibe las mejores promociones en tu email</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Tu email..." />
                  <button className="btn btn-accent">Suscribirse</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Ofertas;