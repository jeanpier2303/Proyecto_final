import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API_URL } from "../../config";

import {
  Table,
  Button,
  Spinner,
  Form,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import { Search } from "lucide-react";

import "../../assets/styles/vendedor.css";

export default function VendedorInventario() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  // Paginación
  const [page, setPage] = useState(1);
  const limit = 10;

  // ==========================================

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/products`);
      setProductos(res.data || []);
    } catch (err) {
      console.error("❌ Error cargando productos:", err);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // ==========================================
  const productosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return productos;
    return productos.filter((p) =>
      [p.name, p.category, p.price?.toString()]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [productos, busqueda]);


  const totalPages = Math.ceil(productosFiltrados.length / limit) || 1;
  const inicio = (page - 1) * limit;
  const currentPageItems = productosFiltrados.slice(inicio, inicio + limit);

  const changePage = (num) => {
    if (num >= 1 && num <= totalPages) setPage(num);
  };

  // Crear lista de botones de paginación
  const paginationItems = [...Array(totalPages)].map((_, i) => (
    <Pagination.Item
      key={i}
      active={i + 1 === page}
      onClick={() => changePage(i + 1)}
    >
      {i + 1}
    </Pagination.Item>
  ));

  return (
    <div className="content-area">
      <h3 className="mb-4 fw-bold text-primary"> Inventario de Productos</h3>

      {/* ================= BUSCADOR ================= */}
      <InputGroup className="mb-4 shadow-sm" style={{ maxWidth: "420px" }}>
        <InputGroup.Text className="bg-white border-end-0">
          <Search size={18} className="text-muted" />
        </InputGroup.Text>

        <Form.Control
          type="text"
          placeholder="Buscar por nombre, categoría o precio..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPage(1);
          }}
          className="border-start-0"
        />
      </InputGroup>

      {/* ================= TABLA ================= */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : currentPageItems.length === 0 ? (
        <div className="py-5 text-center text-muted">
          No se encontraron productos.
        </div>
      ) : (
        <>
          <Table bordered hover responsive className="shadow-sm rounded table-inventario">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {currentPageItems.map((p, index) => (
                <tr key={p.id}>
                  {/* ID incremental global */}
                  <td>{inicio + index + 1}</td>

                  <td>{p.name}</td>

                  <td>{p.category || "—"}</td>

                  <td>${Number(p.price || 0).toLocaleString()}</td>

                  <td>
                    <span
                      className={`fw-semibold ${
                        p.stock <= 5 ? "text-danger" : "text-success"
                      }`}
                    >
                      {p.stock ?? "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* ================= PAGINACIÓN ================= */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
              Página {page} de {totalPages}
            </small>

            <Pagination>{paginationItems}</Pagination>
          </div>
        </>
      )}
    </div>
  );
}
