import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, Button, Container, Badge } from "react-bootstrap";
import { BiEditAlt, BiMailSend, BiUserCircle, BiCoinStack, BiMap } from "react-icons/bi";
import NavPrivate from "../../components/NavPrivate.jsx";
import "../../assets/styles/ProfileModern.css";
import Footer from "../../components/Footer.jsx";
/* import "../assets/styles/ProfileModern.css"; */

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const mockUser = {
        nombres: "dv",
        apellidos: "usuario",
        email: "dv@kahua.com",
        puntosKahua: 120,
        nivel: "Plata",
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    }
  }, []);

  if (!user) return null;

  return (
    <>
      <NavPrivate />

      <Container className="perfil-modern-container mt-10 pt-5">
        {/* Card principal de cabecera */}
        <Card className="perfil-header-card shadow-sm border-0 mb-4">
          <Row className="align-items-center">
            <Col md={3} className="text-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                roundedCircle
                className="perfil-avatar"
                alt="Foto de perfil"
              />
            </Col>
            <Col md={9}>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h3 className="perfil-nombre">{user.nombres} {user.apellidos}</h3>
                  <h4 className="perfil-email"><BiMailSend className="me-1" /> {user.email}</h4>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Grid de cards informativas */}
        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card className="perfil-info-card shadow-sm border-0 h-100">
              <Card.Body>
                <div className="perfil-card-header">
                  <BiUserCircle size={28} className="perfil-card-icon" />
                  <h5>Información Personal</h5>
                </div>
                <hr />
                <p><strong>Nombres:</strong> {user.nombres}</p>
                <p><strong>Apellidos:</strong> {user.apellidos}</p>
                <p><strong>Correo:</strong> {user.email}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="perfil-info-card shadow-sm border-0 h-100">
              <Card.Body>
                <div className="perfil-card-header">
                  <BiMap size={28} className="perfil-card-icon" />
                  <h5>Ubicación y Contacto</h5>
                </div>
                <hr />
                <p><strong>Teléfono:</strong> —</p>
                <p><strong>Dirección:</strong> —</p>
                <p><strong>Ciudad:</strong> Barranquilla</p>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="perfil-info-card shadow-sm border-0 h-100">
              <Card.Body>
                <div className="perfil-card-header">
                  <BiCoinStack size={28} className="perfil-card-icon" />
                  <h5>Recompensas Kahua</h5>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p><strong>Puntos Acumulados:</strong></p>
                    <h4 className="text-primary mb-0">{user.puntosKahua}</h4>
                  </div>
                  <Badge bg="success" className="px-3 py-2">
                    Activa
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="perfil-info-card shadow-sm border-0 h-100">
              <Card.Body>
                <div className="perfil-card-header">
                  <i className="bi bi-clock-history perfil-card-icon"></i>
                  <h5>Estado de la Cuenta</h5>
                </div>
                <hr />
{/*                 <p><strong>Usuario:</strong> {user.nombres.toLowerCase()}</p>
 */}                <p><strong>Estado:</strong> Activa</p>
                <p><strong>Registro:</strong> 15 de marzo de 2024</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        <Footer />
    </>
  );
};

export default Perfil;
