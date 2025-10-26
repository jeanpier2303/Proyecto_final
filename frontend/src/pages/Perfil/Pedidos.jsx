import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavPrivate from "../components/NavPrivate";
import Footer from "../components/Footer";
import "../assets/styles/Pedidos.css";

const Pedidos = () => {
  return (
    <>
      {/* Navbar */}
      <NavPrivate />

      {/* Encabezado */}
      <section className="pedidos-header text-center py-5">
        <h1 className="pedidos-title">📦 Mis Pedidos</h1>
        <p className="pedidos-subtitle">
          Consulta el estado de tus compras y vuelve a disfrutar de tus jugos favoritos.
        </p>
      </section>

      {/* Sección de pedidos */}
      <section className="pedidos-section py-5">
        <Container>
          <Row>
            {/* Pedido 1 */}
            <Col md={6} className="mb-4">
              <Card className="pedido-card">
                <Row className="align-items-center">
                  <Col xs={4}>
                    {/* 👉 Aquí colocas una imagen del producto */}
                    <img
                      src="ruta/a/tu/imagen-pedido1.jpg"
                      alt="Pedido 1"
                      className="pedido-img"
                    />
                  </Col>
                  <Col xs={8}>
                    <div className="pedido-info">
                      <h5 className="pedido-producto">Jugo de Mango</h5>
                      <p className="pedido-fecha">Fecha: 10 Octubre 2025</p>
                      <p className="pedido-total">Total: <strong>$9.000</strong></p>
                      <span className="estado-pedido entregado">Entregado</span>
                    </div>
                    <div className="pedido-actions mt-3">
                      <Button variant="outline-primary" size="sm">
                        Ver Detalles
                      </Button>{" "}
                      <Button variant="primary" size="sm">
                        Comprar de nuevo
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Pedido 2 */}
            <Col md={6} className="mb-4">
              <Card className="pedido-card">
                <Row className="align-items-center">
                  <Col xs={4}>
                    <img
                      src="ruta/a/tu/imagen-pedido2.jpg"
                      alt="Pedido 2"
                      className="pedido-img"
                    />
                  </Col>
                  <Col xs={8}>
                    <div className="pedido-info">
                      <h5 className="pedido-producto">Smoothie de Fresa</h5>
                      <p className="pedido-fecha">Fecha: 2 Octubre 2025</p>
                      <p className="pedido-total">Total: <strong>$12.000</strong></p>
                      <span className="estado-pedido en-proceso">En proceso</span>
                    </div>
                    <div className="pedido-actions mt-3">
                      <Button variant="outline-primary" size="sm">
                        Ver Detalles
                      </Button>{" "}
                      <Button variant="primary" size="sm">
                        Comprar de nuevo
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Pedido 3 */}
            <Col md={6} className="mb-4">
              <Card className="pedido-card">
                <Row className="align-items-center">
                  <Col xs={4}>
                    <img
                      src="ruta/a/tu/imagen-pedido3.jpg"
                      alt="Pedido 3"
                      className="pedido-img"
                    />
                  </Col>
                  <Col xs={8}>
                    <div className="pedido-info">
                      <h5 className="pedido-producto">Jugo Verde Detox</h5>
                      <p className="pedido-fecha">Fecha: 28 Septiembre 2025</p>
                      <p className="pedido-total">Total: <strong>$15.000</strong></p>
                      <span className="estado-pedido cancelado">Cancelado</span>
                    </div>
                    <div className="pedido-actions mt-3">
                      <Button variant="outline-primary" size="sm">
                        Ver Detalles
                      </Button>{" "}
                      <Button variant="primary" size="sm">
                        Comprar de nuevo
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Pedidos;
