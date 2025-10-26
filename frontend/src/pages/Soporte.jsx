import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Accordion } from "react-bootstrap";
import NavPrivate from "../components/NavPrivate";
import Footer from "../components/Footer";
import "../assets/styles/Soporte.css";

const Soporte = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert("Mensaje enviado. Nos pondremos en contacto contigo pronto.");
    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: ""
    });
  };

  // Preguntas frecuentes
  const faqs = [
    {
      id: 1,
      pregunta: "¿Cuáles son los horarios de entrega?",
      respuesta: "Realizamos entregas de lunes a sábado de 8:00 AM a 8:00 PM. Los domingos y festivos de 9:00 AM a 6:00 PM."
    },
    {
      id: 2,
      pregunta: "¿Hacen entregas a domicilio?",
      respuesta: "Sí, realizamos entregas a domicilio en toda el área metropolitana. El costo de envío varía según la ubicación."
    },
    {
      id: 3,
      pregunta: "¿Los jugos tienen conservantes?",
      respuesta: "No, todos nuestros jugos son 100% naturales, sin conservantes, colorantes ni azúcares añadidos."
    },
    {
      id: 4,
      pregunta: "¿Puedo personalizar mi pedido?",
      respuesta: "Sí, ofrecemos opciones de personalización. Puedes contactarnos para solicitar combinaciones especiales."
    },
    {
      id: 5,
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos efectivo, tarjetas débito y crédito, transferencias bancarias y pagos a través de nuestra app."
    }
  ];

  return (
    <>
      <NavPrivate />
      
      <section className="soporte-page py-5">
        <Container>
          <div className="page-header text-center mb-5">
            <h1 className="page-title">Centro de Soporte</h1>
            <p className="page-subtitle">Estamos aquí para ayudarte. Encuentra respuestas o contáctanos directamente.</p>
          </div>

          <Row>
            {/* Información de contacto */}
            <Col lg={4} className="mb-4">
              <Card className="contact-info-card">
                <Card.Body>
                  <h4 className="card-title mb-4">Información de Contacto</h4>
                  
                  <div className="contact-item mb-3">
                    <div className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="contact-details">
                      <h6>Teléfono</h6>
                      <p>+57 322 267 1234</p>
                    </div>
                  </div>
                  
                  <div className="contact-item mb-3">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-details">
                      <h6>Email</h6>
                      <p>soporte@kahuajugos.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-item mb-3">
                    <div className="contact-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="contact-details">
                      <h6>Horario de Atención</h6>
                      <p>Lun - Vie: 8:00 AM - 8:00 PM<br/>Sáb - Dom: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-details">
                      <h6>Dirección</h6>
                      <p>Calle 123 #45-67, Cali, Colombia</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Canales rápidos */}
              <Card className="quick-channels-card mt-4">
                <Card.Body>
                  <h5 className="card-title mb-3">Canales Rápidos</h5>
                  <div className="channels-grid">
                    <Button variant="outline-primary" className="channel-btn">
                      <i className="fab fa-whatsapp fa-2x mb-2"></i>
                      WhatsApp
                    </Button>
                    <Button variant="outline-primary" className="channel-btn">
                      <i className="fas fa-comment-alt fa-2x mb-2"></i>
                      Chat en Vivo
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Contenido principal */}
            <Col lg={8}>
              {/* Preguntas Frecuentes */}
              <Card className="faq-card mb-4">
                <Card.Body>
                  <h4 className="card-title mb-4">Preguntas Frecuentes</h4>
                  <Accordion flush>
                    {faqs.map((faq, index) => (
                      <Accordion.Item key={faq.id} eventKey={index.toString()}>
                        <Accordion.Header>{faq.pregunta}</Accordion.Header>
                        <Accordion.Body>
                          {faq.respuesta}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>

              {/* Formulario de contacto */}
              <Card className="contact-form-card">
                <Card.Body>
                  <h4 className="card-title mb-4">Envíanos un Mensaje</h4>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre completo *</Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre completo"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Asunto *</Form.Label>
                      <Form.Select
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="pedido">Consulta sobre pedido</option>
                        <option value="producto">Información de productos</option>
                        <option value="entrega">Problemas con entrega</option>
                        <option value="pago">Problemas con pago</option>
                        <option value="otro">Otro</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Mensaje *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        placeholder="Describe tu consulta o problema..."
                      />
                    </Form.Group>
                    
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="btn-enviar"
                      size="lg"
                    >
                      <i className="fas fa-paper-plane me-2"></i>
                      Enviar Mensaje
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Soporte;