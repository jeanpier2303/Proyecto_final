<<<<<<< HEAD
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function NavbarApp() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">🍹 Kahua - Jugos Naturales</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>
            <Nav.Link as={Link} to="./pages/Login/Login">Iniciar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
=======
  /*  import React from "react";
import { Container, Nav, Navbar} from "react-bootstrap";
import "../assets/styles/Home.css";
export default function NavbarApp() {
  return (
    <header className="main-header">
      <Navbar expand="lg" fixed="top" className="navbar-custom">
        <Container className="nav-container">
          <Navbar.Brand href="#" className="logo">
            Kahua<span>Jugos</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#">Inicio</Nav.Link>
              <Nav.Link href="#">Productos</Nav.Link>
              <Nav.Link href="#">Nosotros</Nav.Link>
              <Nav.Link href="#">Beneficios</Nav.Link>
              <Nav.Link href="#">Contacto</Nav.Link>
            </Nav>
            <div className="auth-buttons">
              <Button variant="outline-primary" className="btn-login">
                Iniciar Sesión
              </Button>
              <Button variant="primary" className="btn-register">
                Registrarse
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}/*  
/*  
import React, { useState, useEffect } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import "../assets/styles/Home.css";

export default function NavbarApp() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="main-header">
      <Navbar expand="lg" fixed="top" className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`}>
        <Container className="nav-container">
       
          <Navbar.Brand href="#" className="logo-brand">
            <img 
              src="/logo.png" 
              alt="Kahua Jugos" 
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.parentElement.querySelector('.logo-fallback');
                if (fallback) fallback.style.display = 'block';
              }}
            />
       
            <div className="logo-fallback" style={{display: 'none'}}>
              Kahua<span>Jugos</span>
            </div>
          </Navbar.Brand>
          
       
          <div className="auth-buttons">
            <Button variant="outline-primary" className="btn-login">
              Iniciar Sesión
            </Button>
            <Button variant="primary" className="btn-register">
              Registrarse
            </Button>
          </div>
        </Container>
      </Navbar>
    </header>
  );
}*/
import React, { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"; // 👈 Importa Link
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
      <Navbar expand="lg" fixed="top" className={`navbar-custom ${scrolled ? "navbar-scrolled" : ""}`}>
        <Container className="nav-container">
          <Navbar.Brand href="#" className="logo-brand">
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
>>>>>>> 42eb4246beed3ba7d6f23a1cadb647028d46c40d
  );
}
