/* import React from "react"; */
import { Container, Card, Form, Button } from "react-bootstrap";

const RegisterForm = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow-sm" style={{ width: "400px", borderRadius: "10px" }}>
        <Form>
          {/* Campo E-mail */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Nombres</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control type="text" placeholder=" " />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Documento de identidad</Form.Label>
            <Form.Select enable>
            <option>Selecciones tipo de Documento</option>
            <option>Cédula de Ciudadanía</option>
            <option>Tarjeta de Identidad</option>
            <option>Cédula de Extranjería</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formID">
            <Form.Label>Numero de Identidad</Form.Label>
            <Form.Control type="tel" placeholder=" " />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="tel" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="example@correo.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCheckbox">
            <Form.Check
              type="checkbox"
              label="Acepto Terminos y Condiciones."
              defaultChecked
            />
          </Form.Group>


          {/* Botón Continuar */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 fw-semibold"
            style={{ backgroundColor: "#1a73e8", border: "none" }}
          >
            Continuar
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterForm;
