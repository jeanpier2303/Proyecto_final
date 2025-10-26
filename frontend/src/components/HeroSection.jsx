import React from "react";
import { Link, useNavigate } from "react-router-dom"

export default function HeroSection() {
    const navigate = useNavigate();
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
            <button className="btn btn-hero btn-explore"  onClick={() => navigate("/login")} >Explorar Sabores</button>
            <button className="btn btn-hero btn-login"  onClick={() => navigate("/login")} >Conoce Más</button>
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
