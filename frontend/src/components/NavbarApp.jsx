// components/NavPublic.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavPublic = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top navbar-custom ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        <Link className="navbar-brand logo-brand" to="/">
          <div className="logo-fallback">
            Kahua<span>Jugos</span>
          </div>
        </Link>

        <div className="auth-buttons">
          <button className="btn btn-login" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </button>
          <button className="btn btn-register" onClick={() => navigate("/register")}>
            Registrarse
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavPublic;