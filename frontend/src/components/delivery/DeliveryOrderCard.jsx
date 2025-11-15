// src/components/delivery/DeliveryOrderCard.jsx
import React from "react";
import { Button } from "react-bootstrap";

function DeliveryOrderCard({ order, onSelect, onOpenModal }) {
  const productos = Array.isArray(order.productos) ? order.productos : [];

  const estadoMap = {
    1: "pendiente",
    2: "en_camino",
    4: "entregado",
  };

  const estado = estadoMap[order.status_id] || "pendiente";

  const estadoClass = {
    pendiente: "estado-pendiente",
    en_camino: "estado-en_camino",
    entregado: "estado-entregado",
  }[estado];

  const pagoClass =
    order.formaPago === "online" ? "pago-online" : "pago-contraentrega";

  return (
    <div
      className={`pedido-card`}
      onClick={() => onSelect(order)}
    >
      {/* HEADER */}
      <div className="pedido-header">
        <span className="pedido-id">Pedido #{order.id}</span>

        <span className={`pedido-estado ${estadoClass}`}>
          {estado === "pendiente"
            ? "Pendiente"
            : estado === "en_camino"
            ? "En camino"
            : "Entregado"}
        </span>
      </div>

      {/* INFO */}
      <div className="pedido-info">
        <div className="pedido-cliente">{order.cliente || "Cliente"}</div>

        <div className="pedido-direccion">
          {order.direccion || "Dirección no disponible"}
        </div>

        <div className="pedido-detalles">
          <span>{productos.length} producto(s)</span>
          <span>${Number(order.total || 0).toLocaleString()}</span>
        </div>

        <div className={`pago-badge ${pagoClass}`}>
          {order.formaPago === "online" ? "Pago Online" : "Contraentrega"}
        </div>
      </div>

      {/* ACCIONES */}
      <div className="pedido-acciones">
        {estado !== "entregado" && (
          <Button
            className="btn-accion btn-entrega"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(order);
            }}
          >
            Confirmar Entrega
          </Button>
        )}

        <Button
          className="btn-accion btn-llamar"
          onClick={(e) => {
            e.stopPropagation();
            alert("Llamando al cliente: " + (order.telefono || "N/A"));
          }}
        >
          Llamar Cliente
        </Button>
      </div>
    </div>
  );
}

export default DeliveryOrderCard;
