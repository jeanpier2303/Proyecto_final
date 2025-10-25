import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Spinner } from "react-bootstrap";
import { saveAs } from "file-saver";

const VentasAdmin = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/sales/details`);
      setSales(res.data);
    } catch (err) {
      console.error("Error cargando ventas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const exportCSV = () => {
    if (!sales.length) return;
    const header = ["order_id","date","client","product","quantity","price","subtotal"];
    const rows = sales.map(s => [s.order_id, s.date, s.client, s.product, s.quantity, s.price, s.subtotal]);
    const csv = [header, ...rows].map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "ventas_detalladas.csv");
  };

  return (
    <div className="p-3">
      <h3>💰 Ventas Detalladas</h3>

      <div className="mb-3">
        <button className="btn btn-outline-primary" onClick={exportCSV} disabled={!sales.length}>Exportar CSV</button>
      </div>

      {loading ? (
        <div className="text-center py-4"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
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
              <tr><td colSpan="7" className="text-center text-muted">No hay ventas registradas</td></tr>
            ) : sales.map((s, i) => (
              <tr key={i}>
                <td>{s.order_id}</td>
                <td>{s.date}</td>
                <td>{s.client}</td>
                <td>{s.product}</td>
                <td>{s.quantity}</td>
                <td>${s.price}</td>
                <td>${s.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default VentasAdmin;
