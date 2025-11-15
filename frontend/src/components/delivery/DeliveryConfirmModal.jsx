// src/components/delivery/DeliveryConfirmModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DeliveryConfirmModal({ order, onClose, onConfirm }) {
  const [pagoConfirmado, setPagoConfirmado] = useState(false);
  const [monto, setMonto] = useState(order.total);

  const handleConfirm = () => {
    const updated = {
      ...order,
      estado: "entregado",
      pagoConfirmado: order.formaPago === "contraentrega",
      montoRecibido: order.formaPago === "contraentrega" ? monto : null,
    };
    onConfirm(updated);
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Entrega</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <i
          className="bi bi-check-circle text-success"
          style={{ fontSize: "3rem" }}
        ></i>

        <p className="mt-3">
          ¿Estás seguro de que quieres confirmar la entrega del pedido #
          {order.id}?
        </p>

        {order.formaPago === "contraentrega" && (
          <div className="mt-3 text-start">
            <h6>Confirmación de Pago</h6>

            <Form.Check
              type="checkbox"
              label="Confirmo que recibí el pago del cliente"
              checked={pagoConfirmado}
              onChange={(e) => setPagoConfirmado(e.target.checked)}
            />

            <Form.Group className="mt-2">
              <Form.Label>Monto recibido</Form.Label>
              <Form.Control
                type="number"
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
              />
            </Form.Group>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="success"
          onClick={handleConfirm}
          disabled={
            order.formaPago === "contraentrega" &&
            (!pagoConfirmado || monto <= 0)
          }
        >
          Confirmar Entrega
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeliveryConfirmModal;
