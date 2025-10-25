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
      const qs = q.length ? `?${q.join("&")}` : "";
      const res = await axios.get(`${API_URL}/admin/products${qs}`);
      setProducts(res.data);
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
    // fetch on filter change
    const t = setTimeout(() => {
      fetchProducts();
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [search, categoryId]);

  return (
    <div className="p-3">
      <Row className="align-items-center mb-3">
        <Col><h3>📦 Gestión de Productos</h3></Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => Swal.fire("Nota", "Agregar producto (no implementado).", "info")}>
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
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button onClick={fetchProducts} className="w-100">Buscar</Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-4"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="6" className="text-center text-muted">No se encontraron productos</td></tr>
            ) : products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>{p.category}</td>
                <td>
                  <Button size="sm" variant="light" className="me-1" onClick={() => Swal.fire("Ver", JSON.stringify(p, null, 2), "info")}>Ver</Button>
                  <Button size="sm" variant="outline-primary" onClick={() => Swal.fire("Editar", "Editar producto (no implementado).", "info")}>Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductosAdmin;
