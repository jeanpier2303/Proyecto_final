import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../../config";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos.",
        confirmButtonColor: "#9C27B0",
      });
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

        // Guardar usuario en localStorage (puedes usar context o Redux después)
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirigir al dashboard o página principal
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
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100" style={{ maxWidth: "900px" }}>
        {/* Imagen lateral */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Image
            src="/login.jpg"
            alt="Login"
            fluid
            style={{ borderRadius: "15px", maxHeight: "500px" }}
          />
        </Col>

        {/* Formulario */}
        <Col md={6}>
          <Card className="p-4 shadow-lg" style={{ borderRadius: "20px" }}>
            <h3 className="text-center mb-4" style={{ color: "#9C27B0" }}>
              Iniciar Sesión
            </h3>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="tucorreo@ejemplo.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 fw-semibold mb-3"
                style={{ backgroundColor: "#9C27B0", border: "none" }}
              >
                Continuar
              </Button>

              <div className="text-center">
                <p className="text-muted">
                  ¿No tienes cuenta?{" "}
                  <Link to="/register" style={{ color: "#9C27B0", textDecoration: "none" }}>
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
