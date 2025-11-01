import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Form, Table, Button, Spinner, Modal } from "react-bootstrap";
import FacturaCard from "./Facturacion/FacturaCard";

const PedidosAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const limit = 10;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/orders`, {
        params: { page, limit, status },
      });
      const data = res.data;
      setOrders(data.data || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error(" Error cargando pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const handleViewFactura = (id) => {
    setSelectedOrder(id);
    setShowModal(true);
  };

  return (
    <div className="p-3">
      <h3 className="mb-3"> Gestión de Pedidos</h3>

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
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((o, index) => (
                <tr key={o.id}>
                  <td>{(page - 1) * limit + (index + 1)}</td>
                  <td>{o.customer}</td>
                  <td>{o.date}</td>
                  <td>${o.total}</td>
                  <td>{o.status}</td>
                  <td>
                    {["Entregado", "Enviado", "En preparación", "Cancelado"].includes(o.status) ? (
                      <Button
                        style={{
                          backgroundColor: "#6f42c1",
                          borderColor: "#6f42c1",
                        }}
                        size="sm"
                        onClick={() => handleViewFactura(o.id)}
                      >
                        Ver factura
                      </Button>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">
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

      {/* 🔹 Modal con la factura */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Factura del Pedido #{selectedOrder}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && <FacturaCard orderId={selectedOrder} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PedidosAdmin;
