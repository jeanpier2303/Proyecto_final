import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    email: "",
    password: "",
    aceptar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      nombres,
      apellidos,
      tipoDocumento,
      numeroDocumento,
      telefono,
      email,
      password,
      aceptar,
    } = formData;

    if (!nombres || !apellidos || !tipoDocumento || !numeroDocumento || !telefono || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos antes de continuar.",
        confirmButtonColor: "#9C27B0",
      });
      return;
    }

    if (!aceptar) {
      Swal.fire({
        icon: "info",
        title: "Debes aceptar los términos",
        text: "Para continuar, debes aceptar los términos y condiciones.",
        confirmButtonColor: "#9C27B0",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Tu cuenta ha sido creada correctamente.",
      confirmButtonColor: "#9C27B0",
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4" style={{ color: "#9C27B0" }}>
          Crear Cuenta
        </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNombres">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tus nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formApellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tus apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de Documento</Form.Label>
            <Form.Select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
            >
              <option value="">Selecciona tipo de documento</option>
              <option>Cédula de Ciudadanía</option>
              <option>Tarjeta de Identidad</option>
              <option>Cédula de Extranjería</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNumero">
            <Form.Label>Número de Identidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: 1234567890"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ej: 3001234567"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@correo.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCheckbox">
            <Form.Check
              type="checkbox"
              label="Acepto Términos y Condiciones."
              name="aceptar"
              checked={formData.aceptar}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 fw-semibold mb-3"
            style={{ backgroundColor: "#9C27B0", border: "none" }}
          >
            Continuar
          </Button>

          <div className="text-center">
            <p className="text-muted">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" style={{ color: "#9C27B0", textDecoration: "none" }}>
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterForm;
