import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Spinner, Button, Alert } from "react-bootstrap";
import { saveAs } from "file-saver";

const VentasAdmin = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // 🔹 Formato COP
  const formatCOP = (value) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value || 0);

  // 🔹 Obtener ventas
  const fetchSales = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/admin/sales/details`);
      let data = Array.isArray(res.data) ? res.data : res.data.data || [];

      if (!data.length) {
        setSales([]);
        setTotalPages(1);
        return;
      }

      // 🔸 Paginación manual en frontend
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = data.slice(start, end);
      setSales(paginated);
      setTotalPages(Math.ceil(data.length / limit));
    } catch (err) {
      console.error("❌ Error cargando ventas:", err);
      setError("Ocurrió un error al cargar las ventas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [page]);

  // para  Exportar CSV
  const exportCSV = () => {
    if (!sales.length) return;
    const header = [
      "#",
      "Pedido",
      "Fecha",
      "Cliente",
      "Producto",
      "Cantidad",
      "Precio (COP)",
      "Subtotal (COP)",
    ];
    const rows = sales.map((s, i) => [
      (page - 1) * limit + i + 1,
      s.order_id,
      s.date,
      s.client,
      s.product,
      s.quantity,
      formatCOP(s.price),
      formatCOP(s.subtotal),
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "ventas_detalladas.csv");
  };

  return (
    <div className="p-3">
      <h3>💰 Ventas Detalladas</h3>

      <div className="mb-3 d-flex justify-content-end">
        <Button
          variant="outline-primary"
          onClick={exportCSV}
          disabled={!sales.length}
        >
          Exportar CSV
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-3">Cargando ventas...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : sales.length === 0 ? (
        <div className="text-center py-4 text-muted">
          No hay ventas registradas.
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Pedido</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s, i) => (
              <tr key={i}>
                <td>{(page - 1) * limit + i + 1}</td>
                <td>{s.order_id}</td>
                <td>{s.date}</td>
                <td>{s.client}</td>
                <td>{s.product}</td>
                <td>{s.quantity}</td>
                <td>{formatCOP(s.price)}</td>
                <td>{formatCOP(s.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Paginación visual */}
      {sales.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            ← Anterior
          </Button>
          <span className="text-muted">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            Siguiente →
          </Button>
        </div>
      )}
    </div>
  );
};

export default VentasAdmin;
