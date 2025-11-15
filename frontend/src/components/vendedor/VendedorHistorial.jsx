import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Spinner, Button, Badge, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Eye } from "lucide-react";
import Swal from "sweetalert2";

export default function VendedorHistorial() {
  const { user } = useAuth();
  const vendedorId = user?.id;

  const [ordenes, setOrdenes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrdenes();
  }, [vendedorId]);

  const fetchOrdenes = async () => {
    if (!vendedorId) return;

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/seller/orders`, {
        params: { vendedor_id: vendedorId },
      });

      setOrdenes(res.data.items || []);
      setFiltered(res.data.items || []);

    } catch (err) {
      console.error(err);
      setOrdenes([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  useEffect(() => {
    const f = ordenes.filter((o) =>
      o.id.toString().includes(search) ||
      o.status.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(f);
    setPage(1);
  }, [search]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / limit);
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  const verDetalle = (orden) => {
    const itemsHtml = orden.items
      .map(
        (i) =>
          `<tr>
            <td>${i.product_name}</td>
            <td>${i.qty}</td>
            <td>$${i.unit_price.toLocaleString()}</td>
            <td>$${i.subtotal.toLocaleString()}</td>
          </tr>`
      )
      .join("");

    Swal.fire({
      title: `Venta #${orden.id}`,
      html: `
        <div style="text-align:left">
          <p><b>Total:</b> $${orden.total.toLocaleString()}</p>
          <p><b>Estado:</b> ${orden.status}</p>
          <p><b>Fecha:</b> ${new Date(orden.created_at).toLocaleString()}</p>
          <table class="table table-bordered mt-3">
            <thead><tr><th>Producto</th><th>Cant</th><th>Precio</th><th>Subtotal</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
        </div>
      `,
      width: 600,
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <div className="content-area">
      <h3 className="text-primary mb-4">Historial de Ventas</h3>

      {/* Search */}
      <Form.Control
        type="text"
        placeholder="Buscar por ID o estado..."
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div className="mb-2 text-muted">
            Total de ventas: <b>{filtered.length}</b>
          </div>

          {filtered.length > 0 ? (
            <Table bordered hover responsive className="shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((o, index) => (
                  <tr key={o.id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{new Date(o.created_at).toLocaleString()}</td>
                    <td>${o.total.toLocaleString()}</td>
                    <td>
                      <Badge
                        bg={
                          o.status.toLowerCase().includes("entregado")
                            ? "success"
                            : "secondary"
                        }
                      >
                        {o.status}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => verDetalle(o)}
                      >
                        <Eye size={14} /> Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center text-muted py-4">
              No hay ventas registradas.
            </div>
          )}

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">

              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <Button
                      key={n}
                      size="sm"
                      variant={n === page ? "primary" : "outline-primary"}
                      className="mx-1"
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </Button>
                  )
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
