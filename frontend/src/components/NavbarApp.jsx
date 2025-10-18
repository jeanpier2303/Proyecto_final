import React, { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/Home.css";

export default function NavbarApp() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="main-header">
      <Navbar
        expand="lg"
        fixed="top"
        className={`navbar-custom ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <Container className="nav-container">
          <Navbar.Brand as={Link} to="/" className="logo-brand">
            <img
              src="/logo.png"
              alt="Kahua Jugos"
              className="logo-image"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = e.target.parentElement.querySelector(".logo-fallback");
                if (fallback) fallback.style.display = "block";
              }}
            />
            <div className="logo-fallback" style={{ display: "none" }}>
              Kahua<span>Jugos</span>
            </div>
          </Navbar.Brand>

          {/* Botones personalizados con direccionamiento */}
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-login">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="btn btn-register">
              Registrarse
            </Link>
          </div>
        </Container>
      </Navbar>
    </header>
  );
}
