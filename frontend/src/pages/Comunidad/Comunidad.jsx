import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Tab, Tabs } from "react-bootstrap";
import NavPrivate from "../../components/NavPrivate";
import Footer from "../../components/Footer";
import "../../assets/styles/Comunidad.css";

const Comunidad = () => {
  const [activeTab, setActiveTab] = useState("recetas");

  // Datos de ejemplo para recetas
  const recetas = [
    {
      id: 1,
      titulo: "Batido Energético Matutino",
      autor: "María González",
      fecha: "15 Mar 2024",
      imagen: "/images/comunidad/receta1.jpg",
      descripcion: "Comienza tu día con energía natural",
      ingredientes: ["1 plátano", "1/2 taza de avena", "1 cucharada de miel", "1 taza de leche de almendras", "1 cucharadita de canela"],
      preparacion: "Mezclar todos los ingredientes en la licuadora hasta obtener una consistencia suave. Servir inmediatamente.",
      likes: 24,
      comentarios: 8
    },
    {
      id: 2,
      titulo: "Jugo Detox de Piña y Jengibre",
      autor: "Carlos Rodríguez",
      fecha: "12 Mar 2024",
      imagen: "/images/comunidad/receta2.jpg",
      descripcion: "Perfecto para limpiar tu organismo",
      ingredientes: ["2 rodajas de piña", "1 trozo de jengibre", "1/2 pepino", "Jugo de 1 limón", "250ml de agua"],
      preparacion: "Licuar todos los ingredientes y colar si es necesario. Beber fresco.",
      likes: 31,
      comentarios: 12
    }
  ];

  // Datos de ejemplo para testimonios
  const testimonios = [
    {
      id: 1,
      nombre: "Ana Martínez",
      ubicacion: "Cali, Colombia",
      imagen: "/images/comunidad/testimonio1.jpg",
      contenido: "Los jugos de Kahua han transformado mi rutina matutina. Me siento con más energía y mi piel luce radiante.",
      rating: 5
    },
    {
      id: 2,
      nombre: "Javier López",
      ubicacion: "Medellín, Colombia",
      imagen: "/images/comunidad/testimonio2.jpg",
      contenido: "Como deportista, necesito hidratación de calidad. Los batidos de Kahua son mi combustible preferido.",
      rating: 4
    },
    {
      id: 3,
      nombre: "Laura Ramírez",
      ubicacion: "Bogotá, Colombia",
      imagen: "/images/comunidad/testimonio3.jpg",
      contenido: "La variedad de sabores es increíble. Mi favorito es el jugo de maracuyá con un toque de menta.",
      rating: 5
    }
  ];

  // Datos de ejemplo para eventos
  const eventos = [
    {
      id: 1,
      titulo: "Taller de Jugos Naturales",
      fecha: "25 Mar 2024",
      hora: "10:00 AM",
      lugar: "Tienda Principal Kahua",
      imagen: "/images/comunidad/evento1.jpg",
      descripcion: "Aprende a preparar tus propios jugos naturales con frutas locales",
      cupos: 15,
      inscritos: 12
    },
    {
      id: 2,
      titulo: "Degustación de Nuevos Sabores",
      fecha: "30 Mar 2024",
      hora: "3:00 PM",
      lugar: "Plaza de la Libertad",
      imagen: "/images/comunidad/evento2.jpg",
      descripcion: "Prueba nuestros nuevos lanzamientos y danos tu opinión",
      cupos: 30,
      inscritos: 22
    }
  ];

  return (
    <>
      <NavPrivate />
      
      <section className="comunidad-page py-5">
        <Container>
          <div className="page-header text-center mb-5">
            <h1 className="page-title">Comunidad Kahua</h1>
            <p className="page-subtitle">Comparte, aprende y conecta con otros amantes de los jugos naturales</p>
          </div>

          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="comunidad-tabs mb-4"
            justify
          >
            <Tab eventKey="recetas" title="Recetas">
              <Row>
                <Col lg={8}>
                  <h3 className="section-subtitle mb-4">Recetas de la Comunidad</h3>
                  {recetas.map(receta => (
                    <Card key={receta.id} className="receta-card mb-4">
                      <Row className="g-0">
                        <Col md={4}>
                          <div className="receta-img-container">
                            <Card.Img 
                              src={receta.imagen} 
                              alt={receta.titulo}
                              className="receta-img"
                            />
                          </div>
                        </Col>
                        <Col md={8}>
                          <Card.Body>
                            <Card.Title className="receta-titulo">{receta.titulo}</Card.Title>
                            <div className="receta-meta mb-2">
                              <span className="receta-autor">Por {receta.autor}</span>
                              <span className="receta-fecha">{receta.fecha}</span>
                            </div>
                            <Card.Text className="receta-descripcion">
                              {receta.descripcion}
                            </Card.Text>
                            <div className="receta-stats">
                              <span className="me-3">
                                <i className="fas fa-heart text-danger me-1"></i>
                                {receta.likes}
                              </span>
                              <span>
                                <i className="fas fa-comment text-primary me-1"></i>
                                {receta.comentarios}
                              </span>
                            </div>
                            <Button variant="outline-primary" className="btn-ver-receta mt-2">
                              Ver Receta Completa
                            </Button>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Col>
                <Col lg={4}>
                  <Card className="nueva-receta-card">
                    <Card.Body className="text-center">
                      <i className="fas fa-plus-circle fa-3x text-primary mb-3"></i>
                      <h5>Comparte Tu Receta</h5>
                      <p className="text-muted">¿Tienes una receta especial? Compártela con la comunidad</p>
                      <Button variant="primary" className="btn-compartir-receta">
                        Crear Receta
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="testimonios" title="Testimonios">
              <h3 className="section-subtitle mb-4">Lo que dicen nuestros clientes</h3>
              <Row>
                {testimonios.map(testimonio => (
                  <Col key={testimonio.id} lg={4} md={6} className="mb-4">
                    <Card className="testimonio-card h-100">
                      <Card.Body className="text-center">
                        <div className="testimonio-img-container mb-3">
                          <img 
                            src={testimonio.imagen} 
                            alt={testimonio.nombre}
                            className="testimonio-img"
                          />
                        </div>
                        <div className="rating mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i}
                              className={`fas fa-star ${i < testimonio.rating ? 'text-warning' : 'text-muted'}`}
                            ></i>
                          ))}
                        </div>
                        <Card.Text className="testimonio-contenido">
                          "{testimonio.contenido}"
                        </Card.Text>
                        <Card.Footer className="bg-transparent border-0">
                          <strong>{testimonio.nombre}</strong>
                          <div className="text-muted small">{testimonio.ubicacion}</div>
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab>

            <Tab eventKey="eventos" title="Eventos">
              <h3 className="section-subtitle mb-4">Próximos Eventos</h3>
              <Row>
                {eventos.map(evento => (
                  <Col key={evento.id} lg={6} className="mb-4">
                    <Card className="evento-card h-100">
                      <Row className="g-0 h-100">
                        <Col md={5}>
                          <div className="evento-img-container h-100">
                            <Card.Img 
                              src={evento.imagen} 
                              alt={evento.titulo}
                              className="evento-img h-100"
                            />
                            <div className="evento-fecha">
                              <div className="evento-dia">{evento.fecha.split(' ')[0]}</div>
                              <div className="evento-mes">{evento.fecha.split(' ')[1]}</div>
                            </div>
                          </div>
                        </Col>
                        <Col md={7}>
                          <Card.Body className="d-flex flex-column h-100">
                            <Card.Title className="evento-titulo">{evento.titulo}</Card.Title>
                            <div className="evento-info mb-2">
                              <div className="evento-hora">
                                <i className="fas fa-clock me-2"></i>
                                {evento.hora}
                              </div>
                              <div className="evento-lugar">
                                <i className="fas fa-map-marker-alt me-2"></i>
                                {evento.lugar}
                              </div>
                            </div>
                            <Card.Text className="evento-descripcion flex-grow-1">
                              {evento.descripcion}
                            </Card.Text>
                            <div className="evento-cupos mb-2">
                              <div className="progress">
                                <div 
                                  className="progress-bar" 
                                  style={{width: `${(evento.inscritos / evento.cupos) * 100}%`}}
                                ></div>
                              </div>
                              <small className="text-muted">
                                {evento.inscritos} de {evento.cupos} cupos ocupados
                              </small>
                            </div>
                            <Button 
                              variant="primary" 
                              className="btn-inscribirse"
                              disabled={evento.inscritos >= evento.cupos}
                            >
                              {evento.inscritos >= evento.cupos ? 'Evento Lleno' : 'Inscribirme'}
                            </Button>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Comunidad;