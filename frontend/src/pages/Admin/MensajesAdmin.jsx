// src/pages/Admin/MensajesAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Table, Form, Row, Col, Button, Spinner, Modal, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";

const MensajesAdmin = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const itemsPerPage = 8;

  // Cargar mensajes de soporte
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/support/messages`);
      const data = Array.isArray(res.data) ? res.data : [];
      setAllMessages(data);
      filterAndPaginate(data, page, statusFilter, search);
    } catch (err) {
      console.error("Error cargando mensajes:", err);
      Swal.fire("Error", "No se pudieron cargar los mensajes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterAndPaginate(allMessages, page, statusFilter, search);
  }, [search, statusFilter, page]);

  // Filtrar y paginar mensajes
  const filterAndPaginate = (data, currentPage, status, term) => {
    let filtered = data;
    if (status) filtered = filtered.filter((m) => m.status_id === parseInt(status));
    if (term)
      filtered = filtered.filter(
        (m) =>
          m.email.toLowerCase().includes(term.toLowerCase()) ||
          m.subject.toLowerCase().includes(term.toLowerCase())
      );

    const total = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    setMessages(paginated);
    setTotalPages(total);
  };

  // Cambiar estado
  const handleUpdateStatus = async (id, status_id) => {
    try {
      await axios.put(`${API_URL}/admin/support/messages/${id}/status`, { status_id });
      Swal.fire("Actualizado", "El estado del mensaje fue actualizado", "success");
      fetchMessages();
      setShowViewModal(false);
    } catch (err) {
      console.error("Error actualizando estado:", err);
      Swal.fire("Error", "No se pudo actualizar el estado", "error");
    }
  };

  // Ver detalle del mensaje
  const handleView = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/admin/support/messages/${id}`);
      setSelectedMessage(res.data);
      setShowViewModal(true);
    } catch (err) {
      console.error("Error al obtener detalle:", err);
      Swal.fire("Error", "No se pudo cargar el mensaje", "error");
    }
  };

  return (
    <div className="p-3">
      <h3>Centro de soporte</h3>

      {/* Filtros */}
      <Row className="g-2 my-3">
        <Col md={5}>
          <Form.Control
            placeholder="Buscar por asunto o correo..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos los estados</option>
            <option value="1">Pendiente</option>
            <option value="2">Respondido</option>
            <option value="3">Archivado</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Tabla */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Cargando mensajes...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Asunto</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">
                  No se encontraron mensajes
                </td>
              </tr>
            ) : (
              messages.map((m, index) => (
                <tr key={m.id}>
                  <td>{(page - 1) * itemsPerPage + (index + 1)}</td>
                  <td>{m.subject}</td>
                  <td>{m.email}</td>
                  <td>
                    {m.status_id === 1 ? (
                      <Badge bg="warning" text="dark">
                        Pendiente
                      </Badge>
                    ) : m.status_id === 2 ? (
                      <Badge bg="success">Respondido</Badge>
                    ) : (
                      <Badge bg="secondary">Archivado</Badge>
                    )}
                  </td>
                  <td>{new Date(m.created_at).toLocaleDateString("es-CO")}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => handleView(m.id)}
                    >
                      <FaEye />
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
        <Button
          variant="secondary"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Siguiente →
        </Button>
      </div>

      {/* Modal detalle del mensaje */}
      {/* Modal detalle del mensaje */}
<Modal
  show={showViewModal}
  onHide={() => setShowViewModal(false)}
  centered
  size="lg"
  backdrop="static"
>
  <Modal.Header closeButton>
    <Modal.Title>
      <strong>📨 Mensaje de soporte</strong>
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedMessage ? (
      <div>
        {/* Información del remitente */}
        <div className="p-3 mb-3 rounded bg-light border">
          <p className="mb-1">
            <strong>Asunto:</strong> {selectedMessage.subject}
          </p>
          <p className="mb-1">
            <strong>Correo:</strong> {selectedMessage.email}
          </p>
          <p className="mb-1">
            <strong>Fecha:</strong>{" "}
            {new Date(selectedMessage.created_at).toLocaleString("es-CO")}
          </p>
          <Badge
            bg={
              selectedMessage.status_id === 1
                ? "warning"
                : selectedMessage.status_id === 2
                ? "success"
                : "secondary"
            }
            text={selectedMessage.status_id === 1 ? "dark" : ""}
          >
            {selectedMessage.status_id === 1
              ? "Pendiente"
              : selectedMessage.status_id === 2
              ? "Respondido"
              : "Archivado"}
          </Badge>
        </div>

        {/* Mensaje original */}
        <div
          className="p-3 mb-4 rounded border bg-white"
          style={{ minHeight: "120px" }}
        >
          <p className="text-muted mb-1">
            <strong>Mensaje del cliente:</strong>
          </p>
          <p style={{ whiteSpace: "pre-line" }}>{selectedMessage.message}</p>
        </div>

        {/* Campo de respuesta */}
        <div className="mb-3">
          <Form.Label><strong>Respuesta</strong></Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Escribe tu respuesta aquí..."
            value={selectedMessage.reply || ""}
            onChange={(e) =>
              setSelectedMessage({
                ...selectedMessage,
                reply: e.target.value,
              })
            }
          />
        </div>

        {/* Botones de acción */}
        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="success"
            onClick={() => {
              if (!selectedMessage.reply) {
                Swal.fire("Campo vacío", "Debes escribir una respuesta", "warning");
                return;
              }
              Swal.fire({
                title: "Respuesta enviada",
                text: "El mensaje fue respondido correctamente.",
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
              });
              handleUpdateStatus(selectedMessage.id, 2);
            }}
          >
            Enviar respuesta
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleUpdateStatus(selectedMessage.id, 3)}
          >
            Archivar
          </Button>
        </div>
      </div>
    ) : (
      <p>No hay información disponible</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="outline-secondary" onClick={() => setShowViewModal(false)}>
      Cerrar
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default MensajesAdmin;
