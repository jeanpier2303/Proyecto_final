import React from "react";
import "../assets/styles/HomePrivate.css";
import Logo from "../assets/Logo-Kahua.png";

const HomePrivate = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="private-home">
      <div className="private-container">
        <div className="welcome-box">
          <img src={Logo} alt="Kahua" className="welcome-logo" />
          <h1>¡Bienvenido, {user?.name || "Usuario"}! 🍹</h1>
          <p>
            Nos alegra verte de nuevo en <strong>Kahua</strong>.  
            Explora nuestros productos naturales y descubre ofertas exclusivas para ti.
          </p>
          <button className="btn-primary">Ver Productos</button>
        </div>
      </div>
    </section>
  );
};

export default HomePrivate;
