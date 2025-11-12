import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import "../../assets/styles/vendedor.css";

export default function VendedorDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/admin/stats`)

        setStats(res.data);
      } catch (err) {
        console.error("Error al cargar estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Cargando métricas...</p>
      </div>
    );
  }

  return (
    <div className="content-area">
      <h3 className="mb-4 text-primary">Resumen de Actividad</h3>

      <Row className="g-3">
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <DollarSign className="icon" />
              <h5>Total Ventas</h5>
              <h3>${stats?.sales_total?.toLocaleString() || "0"}</h3>
              <small className="text-muted">Ventas registradas</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <ShoppingCart className="icon" />
              <h5>Órdenes Totales</h5>
              <h3>{stats?.orders_count || 0}</h3>
              <small className="text-muted">Pedidos realizados</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <Package className="icon" />
              <h5>Productos</h5>
              <h3>{stats?.products_count || 0}</h3>
              <small className="text-muted">En inventario</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <TrendingUp className="icon" />
              <h5>Usuarios activos</h5>
              <h3>{stats?.users_active || 0}</h3>
              <small className="text-muted">Clientes registrados</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
