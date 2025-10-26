import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../assets/styles/Auth.css";
import Logoblanc from "../../assets/images/categorias/Logo-blanc.png"; 
import axios from "axios";
import { API_URL } from "../../config";


const RegisterForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Paso 1: Información personal
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    
    // Paso 2: Información de cuenta
    email: "",
    password: "",
    confirmPassword: "",
    aceptar: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const nextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const validateStep1 = () => {
    const { nombres, apellidos, tipoDocumento, numeroDocumento, telefono } = formData;
    
    if (!nombres || !apellidos || !tipoDocumento || !numeroDocumento || !telefono) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos del paso 1.",
        confirmButtonColor: "#9C27B0",
      });
      return false;
    }

    if (telefono.length < 10) {
      Swal.fire({
        icon: "warning",
        title: "Teléfono inválido",
        text: "El teléfono debe tener al menos 10 dígitos.",
        confirmButtonColor: "#9C27B0",
      });
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const { email, password, confirmPassword, aceptar } = formData;
    
    if (!email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos del paso 2.",
        confirmButtonColor: "#9C27B0",
      });
      return false;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Contraseñas no coinciden",
        text: "Las contraseñas deben ser iguales.",
        confirmButtonColor: "#9C27B0",
      });
      return false;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña muy corta",
        text: "La contraseña debe tener al menos 6 caracteres.",
        confirmButtonColor: "#9C27B0",
      });
      return false;
    }

    if (!aceptar) {
      Swal.fire({
        icon: "warning",
        title: "Términos y condiciones",
        text: "Debes aceptar los términos y condiciones.",
        confirmButtonColor: "#9C27B0",
      });
      return false;
    }

    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateStep2()) return;

  setIsLoading(true);

  try {
    // Mapeo de campos 
    const payload = {
      first_name: formData.nombres,
      last_name: formData.apellidos,
      identification_type_id:
        formData.tipoDocumento === "CC"
          ? 1
          : formData.tipoDocumento === "TI"
          ? 2
          : 3, //
      identification_number: formData.numeroDocumento,
      phone: formData.telefono,
      email: formData.email,
      password: formData.password,
    };

    const response = await axios.post(`${API_URL}/auth/register`, payload);

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "¡Cuenta creada exitosamente!",
        text: "Tu cuenta ha sido creada. Serás redirigido al login.",
        confirmButtonColor: "#9C27B0",
      }).then(() => navigate("/login"));
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error al registrar",
      text:
        error.response?.data?.detail ||
        "Hubo un problema al crear la cuenta.",
      confirmButtonColor: "#9C27B0",
    });
  } finally {
    setIsLoading(false);
  }
};


  // Indicador de fuerza de contraseña
  const renderPasswordStrength = () => {
    if (!formData.password) return null;

    const strength = 
      formData.password.length < 3 ? 1 :
      formData.password.length < 6 ? 2 :
      formData.password.length < 8 ? 3 : 4;

    const strengthText = 
      strength === 1 ? 'Muy débil' :
      strength === 2 ? 'Débil' :
      strength === 3 ? 'Buena' : 'Excelente';

    return (
      <div className="kahua-password-strength">
        <div className="kahua-strength-bars">
          <div className={`kahua-strength-bar ${strength >= 1 ? 'active' : ''}`}></div>
          <div className={`kahua-strength-bar ${strength >= 2 ? 'active' : ''}`}></div>
          <div className={`kahua-strength-bar ${strength >= 3 ? 'active' : ''}`}></div>
          <div className={`kahua-strength-bar ${strength >= 4 ? 'active' : ''}`}></div>
        </div>
        <div className="kahua-strength-text">{strengthText}</div>
      </div>
    );
  };

  // Renderizar indicador de pasos
  const renderStepIndicator = () => (
    <div className="kahua-step-indicator">
      <div className={`kahua-step ${currentStep >= 1 ? 'active' : ''}`}>
        <div className="kahua-step-marker">
          <span className="kahua-step-number">1</span>
          <i className="kahua-step-check fas fa-check"></i>
        </div>
        <div className="kahua-step-label">Información Personal</div>
      </div>
      <div className="kahua-step-connector"></div>
      <div className={`kahua-step ${currentStep >= 2 ? 'active' : ''}`}>
        <div className="kahua-step-marker">
          <span className="kahua-step-number">2</span>
          <i className="kahua-step-check fas fa-check"></i>
        </div>
        <div className="kahua-step-label">Cuenta y Seguridad</div>
      </div>
    </div>
  );

  // Renderizar paso 1 - Información personal
  const renderStep1 = () => (
    <div className="kahua-step-content">
      <Row>
        <Col md={6}>
          <div className="kahua-form-group">
            <label className="kahua-input-label">Nombres *</label>
            <div className="kahua-input-container">
              <i className="kahua-input-icon fas fa-user"></i>
              <Form.Control
                type="text"
                placeholder="Tus nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="kahua-input-field"
                required
              />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="kahua-form-group">
            <label className="kahua-input-label">Apellidos *</label>
            <div className="kahua-input-container">
              <i className="kahua-input-icon fas fa-user"></i>
              <Form.Control
                type="text"
                placeholder="Tus apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="kahua-input-field"
                required
              />
            </div>
          </div>
        </Col>
      </Row>

      <div className="kahua-form-group">
        <label className="kahua-input-label">Tipo de Documento *</label>
        <div className="kahua-input-container">
          <i className="kahua-input-icon fas fa-id-card"></i>
          <Form.Select
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            className="kahua-input-field"
            required
          >
            <option value="">Selecciona un documento</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
          </Form.Select>
        </div>
      </div>

      <div className="kahua-form-group">
        <label className="kahua-input-label">Número de Documento *</label>
        <div className="kahua-input-container">
          <i className="kahua-input-icon fas fa-id-card"></i>
          <Form.Control
            type="text"
            placeholder="Ej: 1234567890"
            name="numeroDocumento"
            value={formData.numeroDocumento}
            onChange={handleChange}
            className="kahua-input-field"
            required
          />
        </div>
      </div>

      <div className="kahua-form-group">
        <label className="kahua-input-label">Teléfono *</label>
        <div className="kahua-input-container">
          <i className="kahua-input-icon fas fa-phone"></i>
          <Form.Control
            type="tel"
            placeholder="Ej: 3001234567"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="kahua-input-field"
            required
          />
        </div>
      </div>

      <div className="kahua-step-actions">
        <Button
          type="button"
          className="kahua-auth-btn secondary"
          onClick={prevStep}
          disabled={true}
        >
          <i className="kahua-btn-icon fas fa-arrow-left"></i>
          Atrás
        </Button>
        <Button
          type="button"
          className="kahua-auth-btn primary"
          onClick={nextStep}
        >
          Siguiente
          <i className="kahua-btn-icon fas fa-arrow-right"></i>
        </Button>
      </div>
    </div>
  );

  // Renderizar paso 2 - Información de cuenta
  const renderStep2 = () => (
    <div className="kahua-step-content">
      <div className="kahua-form-group">
        <label className="kahua-input-label">Correo Electrónico *</label>
        <div className="kahua-input-container">
          <i className="kahua-input-icon fas fa-envelope"></i>
          <Form.Control
            type="email"
            placeholder="tu@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="kahua-input-field"
            required
          />
        </div>
      </div>

      <Row>
        <Col md={6}>
          <div className="kahua-form-group">
            <label className="kahua-input-label">Contraseña *</label>
            <div className="kahua-input-container">
              <i className="kahua-input-icon fas fa-lock"></i>
              <Form.Control
                type={showPassword.password ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="kahua-input-field"
                required
              />
              <button 
                type="button"
                className="kahua-toggle-password"
                onClick={() => togglePassword('password')}
              >
                <i className={`fas fa-eye${showPassword.password ? '-slash' : ''}`}></i>
              </button>
            </div>
            {renderPasswordStrength()}
          </div>
        </Col>
        <Col md={6}>
          <div className="kahua-form-group">
            <label className="kahua-input-label">Confirmar Contraseña *</label>
            <div className="kahua-input-container">
              <i className="kahua-input-icon fas fa-lock"></i>
              <Form.Control
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="••••••••"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="kahua-input-field"
                required
              />
              <button 
                type="button"
                className="kahua-toggle-password"
                onClick={() => togglePassword('confirmPassword')}
              >
                <i className={`fas fa-eye${showPassword.confirmPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Términos y condiciones */}
      <div className="kahua-terms-section">
        <Form.Check
          type="checkbox"
          label={
            <span>
              Acepto los <a href="/terminos" className="kahua-terms-link">Términos y Condiciones</a>
            </span>
          }
          name="aceptar"
          checked={formData.aceptar}
          onChange={handleChange}
          className="kahua-terms-checkbox"
        />
      </div>

      <div className="kahua-step-actions">
        <Button
          type="button"
          className="kahua-auth-btn secondary"
          onClick={prevStep}
        >
          <i className="kahua-btn-icon fas fa-arrow-left"></i>
          Atrás
        </Button>
        <Button
          type="submit"
          className={`kahua-auth-btn kahua-register-btn ${isLoading ? 'kahua-btn-loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="kahua-btn-spinner"></span>
              Creando cuenta...
            </>
          ) : (
            <>
              <i className="kahua-btn-icon fas fa-user-plus"></i>
              Crear Cuenta
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="kahua-auth-container">

      <Container className="kahua-auth-wrapper">
        <Row className="justify-content-center align-items-center min-vh-100">
          {/* Sección de Bienvenida */}
          <Col md={6} className="d-none d-md-block">
            <div className="kahua-welcome-section">
              <div className="kahua-welcome-content">
                <div className="kahua-logo-container"><a href="/">
                  <img 
                    src={Logoblanc}
                    alt="Kahua Logo" 
                    className="kahua-logo-img"
                  /></a>
                </div>
                <h1 className="kahua-welcome-title">Únete a Kahua</h1>
                <p className="kahua-welcome-text">
                  Regístrate y disfruta de descuentos exclusivos, promociones 
                  especiales y acumula puntos con cada compra.
                </p>
                
                <div className="kahua-features">
                  <div className="kahua-feature">
                    <i className="fas fa-tag"></i>
                    <div className="kahua-feature-title">Descuentos</div>
                  </div>
                  <div className="kahua-feature">
                    <i className="fas fa-gift"></i>
                    <div className="kahua-feature-title">Promociones</div>
                  </div>
                  <div className="kahua-feature">
                    <i className="fas fa-star"></i>
                    <div className="kahua-feature-title">Puntos</div>
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
                  <h2 className="kahua-form-title">Crear Cuenta</h2>
                  <p className="kahua-form-subtitle">Paso {currentStep} de 2</p>
                </div>

                {/* Indicador de pasos */}
                {renderStepIndicator()}

                <Form onSubmit={handleSubmit} className="kahua-auth-form">
                  {currentStep === 1 ? renderStep1() : renderStep2()}
                </Form>

                {/* Enlace de login */}
                <div className="kahua-auth-switch">
                  <p className="kahua-switch-text">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="kahua-switch-link">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterForm;