import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Button, Spinner, Form, InputGroup } from "react-bootstrap";
import { Search } from "lucide-react";
import "../../assets/styles/vendedor.css";

export default function VendedorInventario() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Cargar productos
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/products`);
      setProductos(res.data || []);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Filtrado
  const productosFiltrados = productos.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación local
  const totalPages = Math.ceil(productosFiltrados.length / limit);
  const inicio = (page - 1) * limit;
  const currentPageItems = productosFiltrados.slice(inicio, inicio + limit);

  const handleBuscar = (e) => {
    setBusqueda(e.target.value);
    setPage(1);
  };

  return (
    <div className="content-area">
      <h3 className="mb-3 text-primary">Inventario de Productos</h3>

      {/* Buscador */}
      <InputGroup className="mb-4 shadow-sm" style={{ maxWidth: "400px" }}>
        <InputGroup.Text className="bg-white border-end-0">
          <Search size={18} className="text-muted" />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={handleBuscar}
          className="border-start-0"
        />
      </InputGroup>

      {/* Tabla */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : currentPageItems.length > 0 ? (
        <>
          <Table bordered hover responsive className="table-vendedor shadow-sm">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.category || "—"}</td>
                  <td>${(p.price || 0).toLocaleString()}</td>
                  <td>
                    <span
                      className={`fw-bold ${
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

          {/* Controles de paginación */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
              Página {page} de {totalPages || 1}
            </small>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </Button>{" "}
              <Button
                variant="outline-primary"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-muted py-5">
          No hay productos disponibles.
        </div>
      )}
    </div>
  );
}
