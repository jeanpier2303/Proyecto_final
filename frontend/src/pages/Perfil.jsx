import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import NavPrivate from "../components/NavPrivate";
import Footer from "../components/Footer";
import "../assets/styles/Ofertas.css";

const Ofertas = () => {
  // Productos en oferta
  const productosOferta = [
    {
      id: 1,
      nombre: "Combo Familiar",
      precio: 25000,
      precioOriginal: 32000,
      imagen: "/images/ofertas/combo-familiar.jpg",
      descripcion: "4 jugos naturales + 2 batidos especiales",
      descuento: 22,
      tiempoRestante: "2d 5h 30m"
    },
    {
      id: 2,
      nombre: "Jugo Detox + Batido",
      precio: 18000,
      precioOriginal: 22500,
      imagen: "/images/ofertas/detox-combo.jpg",
      descripcion: "Combo saludable para tu día",
      descuento: 20,
      tiempoRestante: "1d 12h 15m"
    },
    {
      id: 3,
      nombre: "Pack Semanal",
      precio: 45000,
      precioOriginal: 60000,
      imagen: "/images/ofertas/pack-semanal.jpg",
      descripcion: "7 jugos diferentes para toda la semana",
      descuento: 25,
      tiempoRestante: "3d 8h 45m"
    },
    {
      id: 4,
      nombre: "Jugo del Día",
      precio: 6500,
      precioOriginal: 8500,
      imagen: "/images/ofertas/jugo-dia.jpg",
      descripcion: "Nuestro jugo especial con descuento diario",
      descuento: 24,
      tiempoRestante: "5h 30m"
    }
  ];

  const handleAddToCart = (producto) => {
    alert(`Agregaste ${producto.nombre} al carrito`);
  };

  return (
    <>
      <NavPrivate />
      
      <section className="ofertas-page py-5">
        <Container>
          <div className="page-header text-center mb-5">
            <h1 className="page-title">Ofertas Especiales</h1>
            <p className="page-subtitle">Aprovecha nuestros descuentos exclusivos por tiempo limitado</p>
          </div>

          {/* Banner de ofertas */}
          <div className="banner-oferta mb-5">
            <div className="banner-content text-center text-white p-5">
              <h2 className="banner-title">¡Hasta 30% de descuento!</h2>
              <p className="banner-text">En toda nuestra línea de productos naturales</p>
              <Badge bg="warning" className="banner-badge">Oferta Limitada</Badge>
            </div>
          </div>

          {/* Grid de Ofertas */}
          <Row>
            {productosOferta.map(producto => (
              <Col key={producto.id} lg={6} className="mb-4">
                <Card className="oferta-card h-100">
                  <Row className="g-0 h-100">
                    <Col md={5}>
                      <div className="oferta-img-container h-100">
                        <Card.Img 
                          src={producto.imagen} 
                          alt={producto.nombre}
                          className="oferta-img h-100"
                        />
                        <div className="descuento-badge">
                          -{producto.descuento}%
                        </div>
                        <div className="tiempo-restante">
                          <i className="fas fa-clock me-1"></i>
                          {producto.tiempoRestante}
                        </div>
                      </div>
                    </Col>
                    <Col md={7}>
                      <Card.Body className="d-flex flex-column h-100">
                        <Card.Title className="oferta-nombre">{producto.nombre}</Card.Title>
                        <Card.Text className="oferta-descripcion flex-grow-1">
                          {producto.descripcion}
                        </Card.Text>
                        
                        <div className="precios-container mb-3">
                          <div className="d-flex align-items-center">
                            <span className="precio-actual me-2">
                              ${producto.precio.toLocaleString()}
                            </span>
                            <span className="precio-original text-muted text-decoration-line-through">
                              ${producto.precioOriginal.toLocaleString()}
                            </span>
                          </div>
                          <div className="ahorro-text text-success">
                            Ahorras ${(producto.precioOriginal - producto.precio).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="mt-auto">
                          <Button 
                            variant="primary" 
                            className="btn-oferta w-100"
                            onClick={() => handleAddToCart(producto)}
                          >
                            <i className="fas fa-bolt me-2"></i>
                            Aprovechar Oferta
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Sección de newsletter para ofertas */}
          <div className="newsletter-ofertas mt-5 p-4 rounded">
            <Row className="align-items-center">
              <Col md={8}>
                <h4 className="mb-2">¡No te pierdas nuestras próximas ofertas!</h4>
                <p className="mb-0">Suscríbete y recibe notificaciones de descuentos exclusivos</p>
              </Col>
              <Col md={4} className="text-md-end">
                <Button variant="outline-light" className="btn-suscribir">
                  Suscribirme <i className="fas fa-paper-plane ms-2"></i>
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Ofertas;