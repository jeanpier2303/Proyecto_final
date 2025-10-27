import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Spinner, Button } from "react-bootstrap";
import { saveAs } from "file-saver";

const VentasAdmin = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/sales/details?page=${page}&limit=${limit}`);
      const data = res.data;
      setSales(data.data || data); // por si el backend no usa "data"
      setTotalPages(data.total_pages || Math.ceil((data.total || data.length) / limit));
    } catch (err) {
      console.error("Error cargando ventas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [page]);

  const exportCSV = () => {
    if (!sales.length) return;
    const header = ["#", "Pedido", "Fecha", "Cliente", "Producto", "Cantidad", "Precio", "Subtotal"];
    const rows = sales.map((s, i) => [
      (page - 1) * limit + i + 1,
      s.order_id,
      s.date,
      s.client,
      s.product,
      s.quantity,
      s.price,
      s.subtotal
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
        <Button variant="outline-primary" onClick={exportCSV} disabled={!sales.length}>
          Exportar CSV
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
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
            {sales.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No hay ventas registradas
                </td>
              </tr>
            ) : (
              sales.map((s, i) => (
                <tr key={i}>
                  <td>{(page - 1) * limit + i + 1}</td>
                  <td>{s.order_id}</td>
                  <td>{s.date}</td>
                  <td>{s.client}</td>
                  <td>{s.product}</td>
                  <td>{s.quantity}</td>
                  <td>${s.price}</td>
                  <td>${s.subtotal}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* 🔹 Paginación visual */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          ← Anterior
        </Button>
        <span>Página {page} de {totalPages}</span>
        <Button
          variant="secondary"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        >
          Siguiente →
        </Button>
      </div>
    </div>
  );
};

export default VentasAdmin;
