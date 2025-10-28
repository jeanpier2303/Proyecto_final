import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Button, Spinner } from "react-bootstrap";

const TablePedidos = ({ endpoint }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/${endpoint}&page=${page}`);
      const data = res.data;
      setOrders(data.data || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente": return "text-warning fw-bold";
      case "En preparación": return "text-info fw-bold";
      case "Enviado": return "text-primary fw-bold";
      case "Entregado": return "text-success fw-bold";
      case "Cancelado": return "text-danger fw-bold";
      default: return "text-muted";
    }
  };

  return (
    <div className="p-3">
      <h5 className="mb-3">📋 Pedidos Recientes</h5>

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
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">
                  No hay pedidos recientes
                </td>
              </tr>
            ) : (
              orders.map((o, index) => (
                <tr key={o.id}>
                  <td>{(page - 1) * 10 + (index + 1)}</td>
                  <td>{o.customer}</td>
                  <td>{o.date}</td>
                  <td>${o.total}</td>
                  <td className={getStatusColor(o.status)}>{o.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* 🔹 Paginación */}
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

export default TablePedidos;
