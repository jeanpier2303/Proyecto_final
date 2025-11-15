import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Form, Row, Col, Button, Spinner, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const ProductosAdmin = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);


  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));};
  

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: ""
  });

  const itemsPerPage = 10;

  //  Cargar categorías
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/categories/all`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error cargando categorías:", err);
    }
  };

  //  Cargar productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = [];
      if (categoryId) q.push(`category_id=${categoryId}`);
      if (search) q.push(`search=${encodeURIComponent(search)}`);
      const qs = q.length ? `?${q.join("&")}` : "";

      const res = await axios.get(`${API_URL}/admin/products${qs}`);
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];

      setAllProducts(data);
      const filtered = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      setProducts(filtered);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
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
  }, [search, categoryId, page]);

  //  Crear producto
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category_id) {
      Swal.fire("Campos requeridos", "Completa todos los campos", "warning");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/admin/products`, newProduct);
      const created = res.data;

      setAllProducts((prev) => [created, ...prev]);
      setProducts((prev) => [created, ...prev.slice(0, itemsPerPage - 1)]);
      Swal.fire(" Éxito", "Producto agregado correctamente", "success");
      setShowAddModal(false);
      setNewProduct({ name: "", price: "", stock: "", category_id: "" });
    } catch (err) {
      console.error("Error agregando producto:", err);
      Swal.fire("Error", "No se pudo agregar el producto", "error");
    }
  };

  return (
    <div className="p-3">
      <h3> Gestión de Productos</h3>

      {/* Filtros */}
      <Row className="g-2 my-3">
        <Col md={6}>
          <Form.Control
            placeholder="Buscar producto por nombre..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2} className="text-end">
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            + Nuevo producto
          </Button>
        </Col>
      </Row>

      {/* Tabla */}
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
                  <td>{(page - 1) * itemsPerPage + (index + 1)}</td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  <td>{p.category}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="light"
                      className="me-1"
                      onClick={() => {
                        setSelectedProduct(p);
                        setShowViewModal(true);
                      }}
                    >
                      Ver
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Paginación */}
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

      {/*  Modal para agregar producto */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />

              <Button className="mb3 mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
              </Button>

              {/* <Button
                type="button"
                className="btn btn-outline-primary mt-3"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Seleccionar imagen
              </Button>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              /> */}

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={newProduct.category_id}
                onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
              >
                <option value="">Selecciona categoría</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  Modal para ver producto */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> Detalles del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct ? (
            <div>
              <p><strong>Nombre:</strong> {selectedProduct.name}</p>
              <p><strong>Precio:</strong> ${selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock}</p>
              <p><strong>Categoría:</strong> {selectedProduct.category}</p>
              <p><strong>ID:</strong> {selectedProduct.id}</p>
            </div>
          ) : (
            <p>No hay información del producto</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductosAdmin;
