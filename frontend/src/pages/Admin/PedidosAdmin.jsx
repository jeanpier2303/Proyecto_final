import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Form, Table, Button } from "react-bootstrap";

const PedidosAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // 🔹 Consulta al backend con paginación
      const res = await axios.get(`${API_URL}/admin/orders?page=${page}&limit=10`);
      let data = res.data;

      // 🔹 Extraemos los pedidos del objeto paginado
      let ordersList = data.data || [];

      // 🔹 Aplicar filtro por estado (opcional, en frontend)
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
    <div>
      <h3>Gestión de Pedidos</h3>

      <Form.Select
        className="my-3"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setPage(1); // reiniciar paginación al cambiar filtro
        }}
      >
        <option value="">Todos los estados</option>
        <option value="En proceso">En proceso</option>
        <option value="Completado">Completado</option>
        <option value="Cancelado">Cancelado</option>
      </Form.Select>

      {loading ? (
        <p>Cargando pedidos...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.date}</td>
                  <td>${o.total}</td>
                  <td>{o.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay pedidos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* 🔹 Controles de paginación */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          ← Anterior
        </Button>
        <span>
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
