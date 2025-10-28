import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Form, Row, Col, Spinner, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const UsuariosAdmin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const qs = role ? `?role_id=${role}` : "";
      const res = await axios.get(`${API_URL}/admin/users${qs}`);

      const data = Array.isArray(res.data) ? res.data : [];
      setAllUsers(data);

      // 🔹 Calcula la paginación local
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setUsers(data.slice(start, end));
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [role, page]);

  return (
    <div className="p-3">
      <Row className="align-items-center mb-3">
        <Col>
          <h3>👥 Gestión de Usuarios</h3>
        </Col>
        <Col xs="auto">
          <Button
            variant="secondary"
            onClick={() =>
              Swal.fire("Exportar", "Función exportar no implementada.", "info")
            }
          >
            Exportar
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPage(1); // reiniciar al cambiar filtro
            }}
          >
            <option value="">Todos los roles</option>
            <option value="4">Administradores</option>
            <option value="5">Clientes</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Cargando usuarios...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">
                  No hay usuarios
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={u.id}>
                  <td>{(page - 1) * itemsPerPage + (index + 1)}</td>
                  <td>
                    {u.first_name} {u.last_name}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.role_id === 4 ? "Administrador" : "Cliente"}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="light"
                      className="me-1"
                      onClick={() =>
                        Swal.fire("Usuario", JSON.stringify(u, null, 2), "info")
                      }
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

      {/* 🔹 Controles de paginación */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          ← Anterior
        </Button>
        <span className="text-muted">
          Página {page} de {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Siguiente →
        </Button>
      </div>
    </div>
  );
};

export default UsuariosAdmin;
