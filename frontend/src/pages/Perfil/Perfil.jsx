import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, Button, Container, Badge, Modal, Form } from "react-bootstrap";
import { BiEditAlt, BiMailSend, BiUserCircle, BiCoinStack, BiMap, BiPhone, BiHome, BiCalendar } from "react-icons/bi";
import NavPrivate from "../../components/NavPrivate.jsx";
import Footer from "../../components/Footer.jsx";
import "../../assets/styles/ProfileModern.css";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeSection, setActiveSection] = useState("informacion");
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setEditForm({
        nombres: userData.nombres || "",
        apellidos: userData.apellidos || "",
        email: userData.email || "",
        telefono: userData.telefono || "",
        direccion: userData.direccion || "",
        ciudad: userData.ciudad || "Barranquilla",
        fechaNacimiento: userData.fechaNacimiento || ""
      });
    } else {
      const mockUser = {
        nombres: "Linux",
        apellidos: "Master",
        email: "dv@kahua.com",
        telefono: "+57 300 123 4567",
        direccion: "Calle 123 #45-67",
        ciudad: "Barranquilla",
        fechaNacimiento: "1990-01-15",
        puntosKahua: 120,
        nivel: "Plata",
        fechaRegistro: "2024-03-15",
        pedidosCompletados: 12,
        productosFavoritos: 8
      };
      setUser(mockUser);
      setEditForm(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    }
  }, []);

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...editForm };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setShowEditModal(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) return null;

  const renderContent = () => {
    switch (activeSection) {
      case "informacion":
        return (
          <div className="perfil-section-content">
            <div className="section-header">
              <BiUserCircle className="section-icon" />
              <h4>Información Personal</h4>
            </div>
            <Row className="g-4">
              <Col md={6}>
                <Card className="perfil-info-card">
                  <Card.Body>
                    <h6 className="card-subtitle">Datos Básicos</h6>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Nombres:</span>
                        <span className="info-value">{user.nombres}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Apellidos:</span>
                        <span className="info-value">{user.apellidos}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{user.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Fecha de Nacimiento:</span>
                        <span className="info-value">
                          {user.fechaNacimiento ? formatDate(user.fechaNacimiento) : "No especificada"}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="perfil-info-card">
                  <Card.Body>
                    <h6 className="card-subtitle">Contacto</h6>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Teléfono:</span>
                        <span className="info-value">{user.telefono || "—"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Dirección:</span>
                        <span className="info-value">{user.direccion || "—"}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Ciudad:</span>
                        <span className="info-value">{user.ciudad}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case "seguridad":
        return (
          <div className="perfil-section-content">
            <div className="section-header">
              <i className="bi bi-shield-check section-icon"></i>
              <h4>Seguridad y Privacidad</h4>
            </div>
            <Row className="g-4">
              <Col lg={8}>
                <Card className="security-card">
                  <Card.Body>
                    <div className="security-status">
                      <div className="status-item verified">
                        <i className="bi bi-check-circle-fill status-icon"></i>
                        <div className="status-content">
                          <span className="status-title">Email verificado</span>
                          <span className="status-desc">Tu dirección de email está confirmada</span>
                        </div>
                      </div>
                      <div className="status-item pending">
                        <i className="bi bi-clock status-icon"></i>
                        <div className="status-content">
                          <span className="status-title">Verificación de teléfono pendiente</span>
                          <span className="status-desc">Agrega tu número de teléfono</span>
                        </div>
                        <Button size="sm" variant="outline-primary">Verificar</Button>
                      </div>
                      <div className="status-item default">
                        <i className="bi bi-key status-icon"></i>
                        <div className="status-content">
                          <span className="status-title">Contraseña</span>
                          <span className="status-desc">Último cambio: hace 30 días</span>
                        </div>
                        <Button size="sm" variant="outline-primary">Cambiar</Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Card className="account-info-card">
                  <Card.Body>
                    <h6 className="card-subtitle">Información de la Cuenta</h6>
                    <div className="account-meta">
                      <div className="meta-item">
                        <BiCalendar className="meta-icon" />
                        <div>
                          <span className="meta-label">Miembro desde</span>
                          <span className="meta-value">{formatDate(user.fechaRegistro)}</span>
                        </div>
                      </div>
                      <div className="meta-item">
                        <i className="bi bi-activity meta-icon"></i>
                        <div>
                          <span className="meta-label">Última actividad</span>
                          <span className="meta-value">Hace 2 horas</span>
                        </div>
                      </div>
                      <div className="meta-item">
                        <i className="bi bi-device meta-icon"></i>
                        <div>
                          <span className="meta-label">Dispositivos</span>
                          <span className="meta-value">2 conectados</span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <NavPrivate />

      <Container className="perfil-moderno-container">
        {/* Header del Perfil */}
        <Card className="perfil-header-moderno">
          <Card.Body className="perfil-header-body">
            <Row className="align-items-center">
              <Col md={3} className="text-center">
                <div className="avatar-container-moderno">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    roundedCircle
                    className="perfil-avatar-moderno"
                    alt="Foto de perfil"
                  />
                  <div className="avatar-badge-online"></div>
                </div>
              </Col>
              
              <Col md={6}>
                <div className="perfil-info-principal">
                  <h1 className="perfil-nombre-moderno">
                    {user.nombres} {user.apellidos}
                  </h1>
                  <p className="perfil-email-moderno">
                    <BiMailSend className="me-2" />
                    {user.email}
                  </p>
                </div>
              </Col>
              
              <Col md={3} className="text-end">
                <div className="perfil-actions-moderno">
                  <Button 
                    className="btn-editar-perfil"
                    onClick={() => setShowEditModal(true)}
                  >
                    <BiEditAlt className="me-2" />
                    Editar Perfil
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Navegación y Contenido */}
        <Row className="perfil-main-content">
          <Col lg={3}>
            <Card className="perfil-sidebar">
              <Card.Body>
                <nav className="perfil-nav">
                  <button 
                    className={`nav-item ${activeSection === "informacion" ? "active" : ""}`}
                    onClick={() => setActiveSection("informacion")}
                  >
                    <BiUserCircle className="nav-icon" />
                    <span>Información</span>
                  </button>
                  
                  <button 
                    className={`nav-item ${activeSection === "seguridad" ? "active" : ""}`}
                    onClick={() => setActiveSection("seguridad")}
                  >
                    <i className="bi bi-shield-check nav-icon"></i>
                    <span>Seguridad</span>
                  </button>
                </nav>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Card className="perfil-content-area">
              <Card.Body>
                {renderContent()}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered className="perfil-edit-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <BiEditAlt className="me-2" />
            Editar Información Personal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombres *</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.nombres}
                    onChange={(e) => handleInputChange('nombres', e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellidos *</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.apellidos}
                    onChange={(e) => handleInputChange('apellidos', e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                value={editForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                value={editForm.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                placeholder="+57 300 123 4567"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={editForm.direccion}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
                placeholder="Calle 123 #45-67"
              />
            </Form.Group>
            
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.ciudad}
                    onChange={(e) => handleInputChange('ciudad', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    value={editForm.fechaNacimiento}
                    onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Perfil;