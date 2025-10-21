import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../../config";
import "../../assets/styles/Auth.css"; // Importar

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  // Generar partículas
  const renderParticles = () => {
    return [...Array(20)].map((_, i) => (
      <div 
        key={i}
        className={`kahua-particle ${i % 4 === 0 ? 'small' : i % 4 === 1 ? 'medium' : i % 4 === 2 ? 'large' : 'special'} ${i % 3 === 0 ? 'twinkle' : ''}`}
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`,
        }}
      />
    ));
  };

  return (
    <div className="kahua-auth-container">
      {/* Fondo animado con partículas */}
      <div className="kahua-particles">
        {renderParticles()}
      </div>

      <Container className="kahua-auth-wrapper">
        <Row className="justify-content-center align-items-center min-vh-100">
          {/* Sección de Bienvenida */}
          <Col md={6} className="d-none d-md-block">
            <div className="kahua-welcome-section">
              <div className="kahua-welcome-content">
                <div className="kahua-logo-container">
                  <img 
                    src={Logoblanc} 
                    alt="Kahua Logo" 
                    className="kahua-logo-img"
                  />
                </div>
                <h1 className="kahua-welcome-title">Bienvenido a Kahua</h1>
                <p className="kahua-welcome-text">
                  Descubre los jugos más frescos y naturales, preparados al momento 
                  con ingredientes 100% orgánicos y llenos de sabor.
                </p>
                
                <div className="kahua-features">
                  <div className="kahua-feature">
                    <i className="fas fa-leaf"></i>
                    <div className="kahua-feature-title">Ingredientes Frescos</div>
                  </div>
                  <div className="kahua-feature">
                    <i className="fas fa-heart"></i>
                    <div className="kahua-feature-title">100% Natural</div>
                  </div>
                  <div className="kahua-feature">
                    <i className="fas fa-bolt"></i>
                    <div className="kahua-feature-title">Energía Natural</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Sección del Formulario */}
          <Col xs={12} md={6}>
            <Card className="kahua-auth-card">
              <Card.Body className="kahua-card-body">
                <div className="kahua-form-header">
                  <h2 className="kahua-form-title">Bienvenido</h2>
                  <p className="kahua-form-subtitle">Inicia sesión en Kahua</p>
                </div>

                <Form onSubmit={handleLogin} className="kahua-auth-form">
                  {/* Campo Email */}
                  <div className="kahua-form-group">
                    <label className="kahua-input-label">Correo Electrónico</label>
                    <div className="kahua-input-container">
                      <i className="kahua-input-icon fas fa-envelope"></i>
                      <Form.Control
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="kahua-input-field"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  {/* Campo Contraseña */}
                  <div className="kahua-form-group">
                    <label className="kahua-input-label">Contraseña</label>
                    <div className="kahua-input-container">
                      <i className="kahua-input-icon fas fa-lock"></i>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="kahua-input-field"
                        disabled={isLoading}
                        required
                      />
                      <button 
                        type="button"
                        className="kahua-toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Opciones adicionales */}
                  <div className="kahua-form-options">
                    <Form.Check
                      type="checkbox"
                      label="Recordar mi sesión"
                      className="kahua-custom-checkbox"
                    />
                    <Link to="/forgot-password" className="kahua-forgot-password">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  {/* Botón de Login */}
                  <Button
                    type="submit"
                    className={`kahua-auth-btn kahua-login-btn ${isLoading ? 'kahua-btn-loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="kahua-btn-spinner"></span>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <i className="kahua-btn-icon fas fa-sign-in-alt"></i>
                        Iniciar Sesión
                      </>
                    )}
                  </Button>

                  {/* Enlace de registro */}
                  <div className="kahua-auth-switch">
                    <p className="kahua-switch-text">
                      ¿No tienes cuenta?{" "}
                      <Link to="/register" className="kahua-switch-link">
                        Regístrate gratis
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