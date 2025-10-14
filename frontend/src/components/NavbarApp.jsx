import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
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
}
