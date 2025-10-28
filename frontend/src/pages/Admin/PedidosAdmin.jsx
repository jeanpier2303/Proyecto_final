import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Form, Table, Button, Spinner } from "react-bootstrap";

const PedidosAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/orders?page=${page}&limit=10`);
      let data = res.data;
      let ordersList = data.data || [];

      if (status) {
        ordersList = ordersList.filter((o) => o.status === status);
      }

      setOrders(ordersList);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("❌ Error cargando pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  return (
    <div className="p-3">
      <h3>📋 Gestión de Pedidos</h3>

      <Form.Select
        className="my-3"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setPage(1);
        }}
      >
        <option value="">Todos los estados</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En preparación">En preparación</option>
        <option value="Enviado">Enviado</option>
        <option value="Entregado">Entregado</option>
        <option value="Cancelado">Cancelado</option>
      </Form.Select>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Cargando pedidos...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {/* consultar con el profee */}
            {orders.length > 0 ? (
              orders.map((o, index) => (
                <tr key={o.id}>
                  <td>{(page - 1) * 10 + (index + 1)}</td>
                  <td>{o.customer}</td>
                  <td>{o.date}</td>
                  <td>${o.total}</td>
                  <td>{o.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">
                  No hay pedidos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          ← Anterior
        </Button>
        <span className="text-muted">
          Página {page} de {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Siguiente →
        </Button>
      </div>
    </div>
  );
};

export default PedidosAdmin;
