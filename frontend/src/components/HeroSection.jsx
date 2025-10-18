import React from "react";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Jugos Naturales <span>Llenos de Vida</span> y Energía
          </h1>
          <p>
            Descubre la frescura de los frutos del Pacífico en cada sorbo. Nuestros jugos 100% naturales están elaborados con las mejores frutas para brindarte salud y bienestar.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-hero btn-explore">Explorar Sabores</button>
            <button className="btn btn-hero btn-login">Conoce Más</button>
          </div>
        </div>
      </div>
      <div className="fruit-animation">
        <div className="fruit"></div>
        <div className="fruit"></div>
        <div className="fruit"></div>
        <div className="fruit"></div>
      </div>
    </section>
  );
}
