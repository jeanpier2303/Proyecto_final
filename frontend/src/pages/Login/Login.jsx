import { useState } from "react";
import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Image from 'react-bootstrap/Image'


const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');
  const handleLogin = () => {
  
   if (!username || !password) {
     setError('Please fill in both fields.');
     return;
   }
   if (username === 'user' && password === 'password') {
     setError('');
     alert('Login Successful!');
   } else {
     setError('Invalid username or password.');
   }
 };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100" style={{ maxWidth: "900px" }}>

        <Col md={6} className="d-flex align-items-center">
          <div>
            <Image src="/login.jpg" alt="Login" fluid />
            <br />
            <br />
           
          </div>
        </Col>


        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="text" placeholder="linuxg@outlook.es" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder=" " />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 fw-semibold mb-3"
                style={{ backgroundColor: "#1a73e8", border: "none" }}
              >
                Continuar
              </Button>

              <div className="d-flex align-items-center mb-3">
                <hr className="flex-grow-1" />
                <span className="mx-2">o</span>
                <hr className="flex-grow-1" />
              </div>

              <div className="text-center mb-3">
                <a href="../Registro/Register" className="text-decoration-none">
                  Registrarse
                </a>
              </div>

              

            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;



