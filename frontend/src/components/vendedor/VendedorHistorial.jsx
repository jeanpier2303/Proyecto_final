import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Spinner, Button, Badge } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Eye } from "lucide-react";
import Swal from "sweetalert2";

export default function VendedorHistorial() {
  const { user } = useAuth();
  const vendedorId = user?.id;
  const [ordenes, setOrdenes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchOrdenes = async (p = 1) => {
    if (!vendedorId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/seller/orders`, {
        params: { vendedor_id: vendedorId, page: p, limit: 10 },
      });
      setOrdenes(res.data.items || []);
      setPage(res.data.page || p);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
      setOrdenes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdenes(1);
  }, [vendedorId]);

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

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className="mb-3 text-muted">Total de ventas: {total}</div>

          {ordenes.length > 0 ? (
            <Table bordered hover responsive className="table-vendedor shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{new Date(o.created_at).toLocaleString()}</td>
                    <td>${o.total.toLocaleString()}</td>
                    <td>
                      <Badge
                        bg={
                          o.status?.toLowerCase().includes("entregado")
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
                        <Eye size={16} /> Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center text-muted py-5">
              No hay ventas registradas.
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
              Página {page} de {pages}
            </small>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                disabled={page <= 1}
                onClick={() => fetchOrdenes(page - 1)}
              >
                Anterior
              </Button>{" "}
              <Button
                variant="outline-primary"
                size="sm"
                disabled={page >= pages}
                onClick={() => fetchOrdenes(page + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
