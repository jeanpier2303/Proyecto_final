// src/components/delivery/DeliveryOrderCard.jsx
import React from "react";
import { Button } from "react-bootstrap";

function DeliveryOrderCard({ order, onSelect, onOpenModal }) {
  const estadoClass = {
    pendiente: "estado-pendiente",
    en_camino: "estado-en_camino",
    entregado: "estado-entregado",
  }[order.estado];

  const pagoClass =
    order.formaPago === "online" ? "pago-online" : "pago-contraentrega";

  return (
    <div
      className={`pedido-card ${order.urgencia === "alta" ? "urgente" : ""}`}
      onClick={() => onSelect(order)}
    >
      {/* header */}
      <div className="pedido-header">
        <span className="pedido-id">Pedido #{order.id}</span>
        <span className={`pedido-estado ${estadoClass}`}>
          {order.estado === "pendiente"
            ? "Pendiente"
            : order.estado === "en_camino"
            ? "En camino"
            : "Entregado"}
        </span>
      </div>

      {/* info */}
      <div className="pedido-info">
        <div className="pedido-cliente">{order.cliente}</div>
        <div className="pedido-direccion">{order.direccion}</div>

        <div className="pedido-detalles">
          <span>{order.productos.length} producto(s)</span>
          <span>${order.total.toLocaleString()}</span>
        </div>

        <div className={`pago-badge ${pagoClass}`}>
          {order.formaPago === "online" ? "Pago Online" : "Contraentrega"}
        </div>
      </div>

      {/* acciones */}
      <div className="pedido-acciones">
        <Button
          className="btn-accion btn-entrega"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(order);
          }}
        >
          Confirmar Entrega
        </Button>

        <Button
          className="btn-accion btn-llamar"
          onClick={(e) => {
            e.stopPropagation();
            alert("Llamando al cliente: " + order.telefono);
          }}
        >
          Llamar Cliente
        </Button>
      </div>
    </div>
  );
}

export default DeliveryOrderCard;
