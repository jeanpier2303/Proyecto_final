// components/CTA.js
import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="cta">
      <div className="container">
        <h2>¿Listo para disfrutar de la frescura?</h2>
        <p>Únete a nuestra comunidad y descubre por qué miles de personas eligen Kahua para su bienestar diario. 
          Recibe un 15% de descuento en tu primer pedido.</p>
        <button className="btn btn-cta btn-custom"  onClick={() => navigate("/login")} >Comenzar Ahora</button>
      </div>
    </section>
  );
};

export default CTASection;