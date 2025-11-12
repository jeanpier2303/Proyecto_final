import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Accordion, Alert } from "react-bootstrap";
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

  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aquí iría la lógica real para enviar el correo
      // Por ahora simulamos el envío
      console.log('Datos del formulario:', formData);
      
      // Mostrar alerta de éxito
      setShowAlert(true);
      
      // Limpiar formulario
      setFormData({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
      });

      // Ocultar alerta después de 5 segundos
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
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
    },
    {
      id: 6,
      pregunta: "¿Cómo funciona el programa de puntos Kahua?",
      respuesta: "Por cada compra acumulas puntos que puedes canjear por productos gratuitos. 100 puntos equivalen a $10.000 en compras."
    }
  ];

  return (
    <>
      <NavPrivate />
      
      <section className="soporte-kahua-page py-5">
        <Container>
          <div className="soporte-page-header text-center mb-5">
            <h1 className="soporte-page-title">Centro de Soporte Kahua</h1>
            <p className="soporte-page-subtitle">
              Estamos aquí para ayudarte. Encuentra respuestas rápidas o envíanos tu consulta.
            </p>
          </div>

          <Row>
            {/* Información de contacto */}
            <Col lg={4} className="mb-4">
              <Card className="soporte-contact-info-card">
                <Card.Body>
                  <h4 className="soporte-card-title mb-4">
                    <i className="bi bi-info-circle me-2"></i>
                    Información de Contacto
                  </h4>
                  
                  <div className="soporte-contact-item mb-3">
                    <div className="soporte-contact-icon">
                      <i className="bi bi-telephone"></i>
                    </div>
                    <div className="soporte-contact-details">
                      <h6>Teléfono</h6>
                      <p>+57 322 267 1234</p>
                    </div>
                  </div>
                  
                  <div className="soporte-contact-item mb-3">
                    <div className="soporte-contact-icon">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="soporte-contact-details">
                      <h6>Email</h6>
                      <p>soporte@kahuajugos.com</p>
                    </div>
                  </div>
                  
                  <div className="soporte-contact-item mb-3">
                    <div className="soporte-contact-icon">
                      <i className="bi bi-clock"></i>
                    </div>
                    <div className="soporte-contact-details">
                      <h6>Horario de Atención</h6>
                      <p>Lun - Vie: 8:00 AM - 8:00 PM<br/>Sáb - Dom: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="soporte-contact-item">
                    <div className="soporte-contact-icon">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="soporte-contact-details">
                      <h6>Dirección</h6>
                      <p>Calle 29-30, Quibdó, Colombia</p>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="soporte-extra-info mt-4 p-3 rounded">
                    <h6 className="mb-2">
                      <i className="bi bi-lightning me-2"></i>
                      Respuesta Rápida
                    </h6>
                    <p className="small mb-0">
                      Normalmente respondemos en menos de 2 horas durante nuestro horario de atención.
                    </p>
                  </div>
                </Card.Body>
              </Card>

              {/* Tarjeta de ayuda inmediata */}
              <Card className="soporte-help-card mt-4">
                <Card.Body className="text-center">
                  <div className="soporte-help-icon mb-3">
                    <i className="bi bi-whatsapp"></i>
                  </div>
                  <h5 className="soporte-card-title">¿Necesitas ayuda inmediata?</h5>
                  <p className="text-muted mb-3">
                    Escríbenos por WhatsApp para una atención más rápida
                  </p>
                  <Button 
                    variant="success" 
                    className="soporte-whatsapp-btn"
                    href="https://wa.me/573222671234"
                    target="_blank"
                  >
                    <i className="bi bi-whatsapp me-2"></i>
                    Chatear por WhatsApp
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Contenido principal */}
            <Col lg={8}>
              {/* Preguntas Frecuentes */}
              <Card className="soporte-faq-card mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="soporte-card-title mb-0">
                      <i className="bi bi-question-circle me-2"></i>
                      Preguntas Frecuentes
                    </h4>
                    <span className="badge bg-primary">{faqs.length} preguntas</span>
                  </div>
                  
                  <Accordion flush className="soporte-accordion">
                    {faqs.map((faq, index) => (
                      <Accordion.Item key={faq.id} eventKey={index.toString()} className="soporte-accordion-item">
                        <Accordion.Header className="soporte-accordion-header">
                          <i className="bi bi-question-lg me-2 text-primary"></i>
                          {faq.pregunta}
                        </Accordion.Header>
                        <Accordion.Body className="soporte-accordion-body">
                          <i className="bi bi-lightbulb me-2 text-warning"></i>
                          {faq.respuesta}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>

              {/* Formulario de contacto */}
              <Card className="soporte-contact-form-card">
                <Card.Body>
                  <h4 className="soporte-card-title mb-4">
                    <i className="bi bi-chat-dots me-2"></i>
                    Envíanos un Mensaje
                  </h4>
                  
                  {showAlert && (
                    <Alert variant="success" className="soporte-alert-success">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-check-circle-fill me-2 fs-4"></i>
                        <div>
                          <h6 className="mb-1">¡Mensaje enviado con éxito!</h6>
                          <p className="mb-0">Hemos recibido tu consulta y te responderemos pronto a tu correo electrónico.</p>
                        </div>
                      </div>
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="soporte-form-label">
                        <i className="bi bi-tag me-1"></i>
                        Asunto *
                      </Form.Label>
                      <Form.Select
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                        className="soporte-form-select"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="pedido">Consulta sobre pedido</option>
                        <option value="producto">Información de productos</option>
                        <option value="entrega">Problemas con entrega</option>
                        <option value="pago">Problemas con pago</option>
                        <option value="puntos">Consulta sobre puntos Kahua</option>
                        <option value="sugerencia">Sugerencia o comentario</option>
                        <option value="otro">Otro</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label className="soporte-form-label">
                        <i className="bi bi-chat-text me-1"></i>
                        Mensaje *
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        placeholder="Describe tu consulta o problema con detalle..."
                        className="soporte-form-textarea"
                      />
                      <Form.Text className="soporte-form-help">
                        <i className="bi bi-info-circle me-1"></i>
                        Sé específico para que podamos ayudarte mejor
                      </Form.Text>
                    </Form.Group>
                    
                    <div className="d-grid">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        className="soporte-btn-enviar"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send-fill me-2"></i>
                            Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </div>
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