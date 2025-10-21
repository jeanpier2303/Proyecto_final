//de donde saliste

import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../assets/styles/Auth.css"; 

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
    aceptar: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
    return nombres && apellidos && tipoDocumento && numeroDocumento && telefono;
  };

  const validateStep2 = () => {
    const { email, password, confirmPassword, aceptar } = formData;
    return email && password && confirmPassword && password === confirmPassword && aceptar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateStep1() || !validateStep2()) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos correctamente.",
        confirmButtonColor: "#9C27B0",
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "¡Cuenta creada exitosamente!",
        text: "Bienvenido a nuestra comunidad.",
        confirmButtonColor: "#9C27B0",
      });
      setIsLoading(false);
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="step-indicator-final">
      <div className={`step-final ${currentStep >= 1 ? 'active' : ''}`}>
        <div className="step-marker-final">
          <span className="step-number">1</span>
          <i className="step-check fas fa-check"></i>
        </div>
        <span className="step-label-final">Información Personal</span>
      </div>
      <div className="step-connector-final"></div>
      <div className={`step-final ${currentStep >= 2 ? 'active' : ''}`}>
        <div className="step-marker-final">
          <span className="step-number">2</span>
          <i className="step-check fas fa-check"></i>
        </div>
        <span className="step-label-final">Cuenta</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="step-content-final">
      <Row>
        <Col md={6}>
          <div className="form-group-final">
            <label className="input-label-final">
              <i className="label-icon-final fas fa-user"></i>
              Nombres *
            </label>
            <div className="input-container">
              <Form.Control
                type="text"
                placeholder="Tus nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="input-field-final"
              />
              <div className="input-underline"></div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="form-group-final">
            <label className="input-label-final">
              <i className="label-icon-final fas fa-user"></i>
              Apellidos *
            </label>
            <div className="input-container">
              <Form.Control
                type="text"
                placeholder="Tus apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="input-field-final"
              />
              <div className="input-underline"></div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="form-group-final">
        <label className="input-label-final">
          <i className="label-icon-final fas fa-id-card"></i>
          Tipo de Documento *
        </label>
        <div className="input-container">
          <Form.Select
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            className="input-field-final"
          >
            <option value="">Selecciona un documento</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
          </Form.Select>
          <div className="input-underline"></div>
        </div>
      </div>

      <div className="form-group-final">
        <label className="input-label-final">
          <i className="label-icon-final fas fa-id-card"></i>
          Número de Documento *
        </label>
        <div className="input-container">
          <Form.Control
            type="text"
            placeholder="Ej: 1234567890"
            name="numeroDocumento"
            value={formData.numeroDocumento}
            onChange={handleChange}
            className="input-field-final"
          />
          <div className="input-underline"></div>
        </div>
      </div>

      <div className="form-group-final">
        <label className="input-label-final">
          <i className="label-icon-final fas fa-phone"></i>
          Teléfono *
        </label>
        <div className="input-container">
          <Form.Control
            type="tel"
            placeholder="Ej: 3001234567"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="input-field-final"
          />
          <div className="input-underline"></div>
        </div>
      </div>

      <div className="step-actions-final">
        <Button
          onClick={nextStep}
          className="auth-btn-final next-step"
          disabled={!validateStep1()}
        >
          Continuar
          <i className="btn-icon-final fas fa-arrow-right"></i>
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="step-content-final">
      <div className="form-group-final">
        <label className="input-label-final">
          <i className="label-icon-final fas fa-envelope"></i>
          Correo Electrónico *
        </label>
        <div className="input-container">
          <Form.Control
            type="email"
            placeholder="tu@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field-final"
          />
          <div className="input-underline"></div>
        </div>
      </div>

      <Row>
        <Col md={6}>
          <div className="form-group-final">
            <label className="input-label-final">
              <i className="label-icon-final fas fa-lock"></i>
              Contraseña *
            </label>
            <div className="input-container">
              <Form.Control
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field-final"
              />
              <div className="input-underline"></div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="form-group-final">
            <label className="input-label-final">
              <i className="label-icon-final fas fa-lock"></i>
              Confirmar Contraseña *
            </label>
            <div className="input-container">
              <Form.Control
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field-final"
              />
              <div className="input-underline"></div>
            </div>
          </div>
        </Col>
      </Row>

      {formData.password && (
        <div className="password-strength-final">
          <div className="strength-bars">
            <div className={`strength-bar ${formData.password.length >= 1 ? 'active' : ''}`}></div>
            <div className={`strength-bar ${formData.password.length >= 3 ? 'active' : ''}`}></div>
            <div className={`strength-bar ${formData.password.length >= 6 ? 'active' : ''}`}></div>
            <div className={`strength-bar ${formData.password.length >= 8 ? 'active' : ''}`}></div>
          </div>
          <div className="strength-text-final">
            {formData.password.length < 3 ? 'Muy débil' :
             formData.password.length < 6 ? 'Débil' :
             formData.password.length < 8 ? 'Buena' : 'Excelente'}
          </div>
        </div>
      )}

      <div className="terms-section-final">
        <Form.Check
          type="checkbox"
          label={
            <span>
              Acepto los <a href="/terminos" className="terms-link-final">Términos y Condiciones</a>
            </span>
          }
          name="aceptar"
          checked={formData.aceptar}
          onChange={handleChange}
          className="terms-checkbox-final"
        />
      </div>

      <div className="step-actions-final">
        <Button onClick={prevStep} className="auth-btn-final secondary">
          <i className="btn-icon-final fas fa-arrow-left"></i>
          Atrás
        </Button>
        <Button
          type="submit"
          className={`auth-btn-final register-btn ${isLoading ? 'btn-loading' : ''}`}
          disabled={isLoading || !validateStep2()}
        >
          {isLoading ? (
            <>
              <span className="btn-spinner-final"></span>
              Creando cuenta...
            </>
          ) : (
            <>
              <i className="btn-icon-final fas fa-user-plus"></i>
              Crear Cuenta
            </>
          )}
        </Button>
      </div>
    </div>
  );

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
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="auth-card-final">
              <div className="card-header-final">
                <div className="header-brand">
                  <div className="brand-logo">
                    <i className="fas fa-leaf"></i>
                  </div>
                </div>
                <div className="header-welcome">
                  <h2 className="welcome-title">Crear Cuenta</h2>
                  <p className="welcome-subtitle">Únete a nuestra comunidad</p>
                </div>
              </div>

              <Card.Body className="card-body-final">
                {renderStepIndicator()}
                
                <Form onSubmit={handleSubmit} className="auth-form-final">
                  {currentStep === 1 ? renderStep1() : renderStep2()}
                </Form>

                <div className="auth-switch-final">
                  <p className="switch-text">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="switch-link-final">
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