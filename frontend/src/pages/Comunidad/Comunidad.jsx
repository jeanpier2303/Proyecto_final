import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Tab, Tabs, Alert } from "react-bootstrap";
import NavPrivate from "../../components/NavPrivate";
import Footer from "../../components/Footer";
import "../../assets/styles/Comunidad.css";
import perfil from "../../assets/images/categorias/Carrusel3.png"

const Comunidad = () => {
  const [activeTab, setActiveTab] = useState("testimonios");
  const [showAlert, setShowAlert] = useState(false);
  
  // Estado para el formulario de testimonio
  const [nuevoTestimonio, setNuevoTestimonio] = useState({
    nombre: "",
    ubicacion: "",
    contenido: "",
    rating: 5
  });

  // Datos de ejemplo para testimonios
  const [testimonios, setTestimonios] = useState([
    {
      id: 1,
      nombre: "Ana Martínez",
      ubicacion: "Cali, Colombia",
      imagen: perfil,
      contenido: "Los jugos de Kahua han transformado mi rutina matutina. Me siento con más energía y mi piel luce radiante.",
      rating: 5,
      fecha: "2024-03-15"
    },
    {
      id: 2,
      nombre: "Javier López",
      ubicacion: "Medellín, Colombia",
      imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      contenido: "Como deportista, necesito hidratación de calidad. Los batidos de Kahua son mi combustible preferido.",
      rating: 4,
      fecha: "2024-03-14"
    },
    {
      id: 3,
      nombre: "Laura Ramírez",
      ubicacion: "Bogotá, Colombia",
      imagen: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      contenido: "La variedad de sabores es increíble. Mi favorito es el jugo de maracuyá con un toque de menta.",
      rating: 5,
      fecha: "2024-03-13"
    }
  ]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoTestimonio(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambio de rating
  const handleRatingChange = (rating) => {
    setNuevoTestimonio(prev => ({
      ...prev,
      rating: rating
    }));
  };

  // Enviar nuevo testimonio
  const handleSubmitTestimonio = (e) => {
    e.preventDefault();
    
    if (!nuevoTestimonio.nombre || !nuevoTestimonio.contenido) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const testimonio = {
      id: testimonios.length + 1,
      nombre: nuevoTestimonio.nombre,
      ubicacion: nuevoTestimonio.ubicacion || "Kahua Lover",
      imagen: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      contenido: nuevoTestimonio.contenido,
      rating: nuevoTestimonio.rating,
      fecha: new Date().toISOString().split('T')[0]
    };

    setTestimonios(prev => [testimonio, ...prev]);
    setNuevoTestimonio({
      nombre: "",
      ubicacion: "",
      contenido: "",
      rating: 5
    });
    
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
    
    // Cambiar a la pestaña de testimonios
    setActiveTab("testimonios");
  };

  return (
    <>
      <NavPrivate />
      
      <section className="comunidad-kahua py-5">
        <Container>
          <div className="page-header text-center mb-5">
            <h1 className="page-title-comunidad">Comunidad Kahua</h1>
            <p className="page-subtitle-comunidad">
              Comparte tu experiencia y descubre lo que otros amantes de los jugos naturales tienen que decir
            </p>
          </div>

          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="comunidad-tabs-kahua mb-4"
            justify
          >
            <Tab eventKey="publicar" title={
              <span>
                <i className="bi bi-pencil-square me-2"></i>
                Publicar Testimonio
              </span>
            }>
              <Row className="justify-content-center">
                <Col lg={8}>
                  <Card className="formulario-testimonio-card">
                    <Card.Header className="formulario-testimonio-header">
                      <h3 className="mb-0">
                        <i className="bi bi-chat-heart me-2"></i>
                        Comparte tu Experiencia Kahua
                      </h3>
                    </Card.Header>
                    <Card.Body>
                      {showAlert && (
                        <Alert variant="success" className="alert-testimonio">
                          <i className="bi bi-check-circle-fill me-2"></i>
                          ¡Gracias por compartir tu testimonio! Tu experiencia ha sido publicada.
                        </Alert>
                      )}
                      
                      <Form onSubmit={handleSubmitTestimonio}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <strong>Tu Nombre *</strong>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="nombre"
                                value={nuevoTestimonio.nombre}
                                onChange={handleInputChange}
                                placeholder="¿Cómo te llamas?"
                                required
                                className="input-testimonio"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <strong>Tu Ciudad</strong>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="ubicacion"
                                value={nuevoTestimonio.ubicacion}
                                onChange={handleInputChange}
                                placeholder="¿De dónde nos escribes?"
                                className="input-testimonio"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <strong>¿Cómo calificarías tu experiencia? *</strong>
                          </Form.Label>
                          <div className="rating-selector">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                type="button"
                                className={`estrella-btn ${star <= nuevoTestimonio.rating ? 'activa' : ''}`}
                                onClick={() => handleRatingChange(star)}
                              >
                                <i className="bi bi-star-fill"></i>
                              </button>
                            ))}
                            <span className="rating-text ms-2">
                              {nuevoTestimonio.rating === 5 ? 'Excelente' : 
                               nuevoTestimonio.rating === 4 ? 'Muy Bueno' :
                               nuevoTestimonio.rating === 3 ? 'Bueno' :
                               nuevoTestimonio.rating === 2 ? 'Regular' : 'Malo'}
                            </span>
                          </div>
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                          <Form.Label>
                            <strong>Tu Testimonio *</strong>
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            name="contenido"
                            value={nuevoTestimonio.contenido}
                            onChange={handleInputChange}
                            placeholder="Comparte tu experiencia con nuestros jugos naturales. ¿Cuál es tu favorito? ¿Cómo ha mejorado tu rutina?"
                            required
                            className="textarea-testimonio"
                          />
                          <Form.Text className="text-muted">
                            Tu testimonio inspirará a otros a descubrir los beneficios de los jugos naturales.
                          </Form.Text>
                        </Form.Group>
                        
                        <div className="d-grid">
                          <Button 
                            type="submit" 
                            variant="primary" 
                            size="lg"
                            className="btn-publicar-testimonio"
                          >
                            <i className="bi bi-send-fill me-2"></i>
                            Publicar
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                  
                  <div className="tips-testimonio mt-4">
                    <Card className="border-0 bg-light">
                      <Card.Body>
                        <h5 className="d-flex align-items-center">
                          <i className="bi bi-lightbulb me-2 text-warning"></i>
                          Consejos para tu testimonio
                        </h5>
                        <ul className="mb-0">
                          <li>Menciona tu jugo o batido favorito</li>
                          <li>Comparte cómo ha impactado positivamente tu día a día</li>
                          <li>Describe los beneficios que has experimentado</li>
                          <li>¡Sé auténtico y comparte desde el corazón!</li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="testimonios" title={
              <span>
                <i className="bi bi-chat-quote me-2"></i>
                Testimonios
                <span className="badge bg-primary ms-2">{testimonios.length}</span>
              </span>
            }>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="section-subtitle-comunidad mb-0">
                  Experiencias de la Comunidad Kahua
                </h3>
                <Button 
                  variant="outline-primary"
                  onClick={() => setActiveTab("publicar")}
                  className="btn-nuevo-testimonio"
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Compartir Mi Experiencia
                </Button>
              </div>
              
              <Row>
                {testimonios.map(testimonio => (
                  <Col key={testimonio.id} lg={4} md={6} className="mb-4">
                    <Card className="testimonio-card-comunidad h-100">
                      <Card.Body className="text-center">
                        <div className="testimonio-img-container-comunidad mb-3">
                          <img 
                            src={testimonio.imagen} 
                            alt={testimonio.nombre}
                            className="testimonio-img-comunidad"
                          />
                        </div>
                        <div className="rating-comunidad mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i}
                              className={`bi bi-star-fill ${i < testimonio.rating ? 'text-warning' : 'text-muted'}`}
                            ></i>
                          ))}
                        </div>
                        <Card.Text className="testimonio-contenido-comunidad">
                          "{testimonio.contenido}"
                        </Card.Text>
                        <Card.Footer className="bg-transparent border-0 pt-0">
                          <strong className="d-block">{testimonio.nombre}</strong>
                          <div className="text-muted small">{testimonio.ubicacion}</div>
                          <div className="text-muted small mt-1">
                            <i className="bi bi-calendar me-1"></i>
                            {testimonio.fecha}
                          </div>
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              
              {testimonios.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-chat-quote display-1 text-muted mb-3"></i>
                  <h4 className="text-muted">Aún no hay testimonios</h4>
                  <p className="text-muted">Sé el primero en compartir tu experiencia con la comunidad Kahua</p>
                  <Button 
                    variant="primary"
                    onClick={() => setActiveTab("publicar")}
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Escribir Primer Testimonio
                  </Button>
                </div>
              )}
            </Tab>
          </Tabs>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Comunidad;