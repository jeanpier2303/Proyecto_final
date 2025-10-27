import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Form, Row, Col, Spinner, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const UsuariosAdmin = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const qs = role ? `?role_id=${role}` : "";
      const res = await axios.get(`${API_URL}/admin/users${qs}`);
      setUsers(res.data);
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
  }, [role]);

  return (
    <div className="p-3">
      <Row className="align-items-center mb-3">
        <Col><h3>👥 Gestión de Usuarios</h3></Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={() => Swal.fire("Exportar", "Función exportar no implementada.", "info")}>Exportar</Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Todos los roles</option>
            <option value="4">Administradores</option>
            <option value="5">Clientes</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-4"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th></tr>
          </thead>
          <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted">No hay usuarios</td></tr>
              ) : (
                users.map((u, index) => (
                  <tr key={u.id}>
                    <td>{index + 1}</td>
                    <td>{u.first_name} {u.last_name}</td>
                    <td>{u.email}</td>
                    <td>{u.role_id === 4 ? "Administrador" : "Cliente"}</td>
                    <td>
                      <Button size="sm" variant="light" className="me-1" onClick={() => Swal.fire("Usuario", JSON.stringify(u, null, 2), "info")}>Ver</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
        </Table>
      )}
    </div>
  );
};

export default UsuariosAdmin;
