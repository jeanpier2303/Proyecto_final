import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../../config";
import "../../assets/styles/Auth.css"; 

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos.",
        confirmButtonColor: "#9C27B0",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: username,
        password: password,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: `Bienvenido de nuevo 😊`,
          confirmButtonColor: "#9C27B0",
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Credenciales inválidas",
          text: "Usuario o contraseña incorrectos.",
          confirmButtonColor: "#9C27B0",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en el servidor",
          text: "No se pudo conectar con el servidor. Intenta más tarde.",
          confirmButtonColor: "#9C27B0",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-final-container">
      <div className="premium-background">
        <div className="floating-geometrics">
          <div className="geo-circle geo-1"></div>
          <div className="geo-triangle geo-2"></div>
          <div className="geo-square geo-3"></div>
          <div className="geo-circle geo-4"></div>
          <div className="geo-hexagon geo-5"></div>
        </div>
        <div className="sparkle-particles">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`sparkle ${i % 3 === 0 ? 'small' : i % 3 === 1 ? 'medium' : 'large'}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 12}s`
              }}
            />
          ))}
        </div>
      </div>

      <Container className="auth-final-wrapper">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <Card className="auth-card-final">
              <div className="card-header-final">
                <div className="header-brand">
                  <div className="brand-logo">
                    <i className="fas fa-leaf"></i>
                  </div>
                </div>
                <div className="header-welcome">
                  <h2 className="welcome-title">Bienvenido</h2>
                  <p className="welcome-subtitle">Ingresa a tu cuenta</p>
                </div>
              </div>

              <Card.Body className="card-body-final">
                <Form onSubmit={handleLogin} className="auth-form-final">
                  <div className="form-group-final">
                    <div className="input-container">
                      <i className="input-icon-final fas fa-envelope"></i>
                      <Form.Control
                        type="email"
                        placeholder="tu@email.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field-final"
                        disabled={isLoading}
                      />
                      <div className="input-underline"></div>
                    </div>
                  </div>

                  <div className="form-group-final">
                    <div className="input-container">
                      <i className="input-icon-final fas fa-lock"></i>
                      <Form.Control
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field-final"
                        disabled={isLoading}
                      />
                      <div className="input-underline"></div>
                    </div>
                  </div>

                  <div className="form-options-final">
                    <Form.Check
                      type="checkbox"
                      label="Recordar mi sesión"
                      className="custom-checkbox-final"
                    />
                    
                  </div>

                  <Button
                    type="submit"
                    className={`auth-btn-final login-btn ${isLoading ? 'btn-loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="btn-spinner-final"></span>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <i className="btn-icon-final fas fa-sign-in-alt"></i>
                        Iniciar Sesión
                      </>
                    )}
                  </Button>

                  <div className="auth-switch-final">
                    <p className="switch-text">
                      ¿No tienes cuenta?{" "}
                      <Link to="/register" className="switch-link-final">
                        Regístrate aquí
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;