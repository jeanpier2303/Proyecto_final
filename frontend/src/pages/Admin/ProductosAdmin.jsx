import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const ProductosAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/categories/all`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error cargando categorías:", err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = [];
      if (categoryId) q.push(`category_id=${categoryId}`);
      if (search) q.push(`search=${encodeURIComponent(search)}`);
      q.push(`page=${page}`, `limit=10`);
      const qs = q.length ? `?${q.join("&")}` : "";

      const res = await axios.get(`${API_URL}/admin/products${qs}`);
      const data = res.data;

      setProducts(data.data || data);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("Error cargando productos:", err);
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [search, categoryId, page]);

  return (
    <div className="p-3">
      <Row className="align-items-center mb-3">
        <Col>
          <h3>📦 Gestión de Productos</h3>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={() => Swal.fire("Nota", "Agregar producto (no implementado).", "info")}
          >
            + Nuevo producto
          </Button>
        </Col>
      </Row>

      <Row className="g-2 mb-3">
        <Col md={6}>
          <Form.Control
            placeholder="Buscar producto por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Cargando productos...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr key={p.id}>
                  <td>{(page - 1) * 10 + (index + 1)}</td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  <td>{p.category}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="light"
                      className="me-1"
                      onClick={() => Swal.fire("Ver", JSON.stringify(p, null, 2), "info")}
                    >
                      Ver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => Swal.fire("Editar", "Editar producto (no implementado).", "info")}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button variant="secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Anterior
        </Button>
        <span className="text-muted">
          Página {page} de {totalPages}
        </span>
        <Button variant="secondary" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Siguiente →
        </Button>
      </div>
    </div>
  );
};

export default ProductosAdmin;
