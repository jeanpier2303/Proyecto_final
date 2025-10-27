import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Button, Spinner, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const CategoriasAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/categories/all?page=${page}&limit=10`);
      const data = res.data;
      setCategories(data.data || data);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("Error cargando categorías:", err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!name.trim()) return Swal.fire("Error", "Ingresa un nombre válido", "warning");
    try {
      await axios.post(`${API_URL}/admin/categories`, { name });
      setName("");
      fetchCategories();
      Swal.fire("Éxito", "Categoría agregada", "success");
    } catch {
      Swal.fire("Error", "No se pudo agregar la categoría", "error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  return (
    <div className="p-3">
      <h3>🏷️ Gestión de Categorías</h3>

      <Row className="my-3 g-2">
        <Col md={8}>
          <Form.Control
            placeholder="Nueva categoría..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button className="w-100" onClick={addCategory}>Agregar</Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Cargando categorías...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted py-3">
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categories.map((c, index) => (
                <tr key={c.id}>
                  <td>{(page - 1) * 10 + (index + 1)}</td>
                  <td>{c.name}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => Swal.fire("Eliminar", "Eliminar categoría (no implementado).", "info")}
                    >
                      Eliminar
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

export default CategoriasAdmin;
