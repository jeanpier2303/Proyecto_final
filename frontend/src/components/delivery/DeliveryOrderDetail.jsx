// src/components/delivery/DeliveryOrderDetail.jsx
import React from "react";

function DeliveryOrderDetail({ order }) {
  if (!order) {
    return (
      <div className="detalle-pedido-section">
        <h2>Detalle del Pedido</h2>
        <p className="text-muted">Selecciona un pedido para ver los detalles</p>
      </div>
    );
  }

  const pagoClass =
    order.formaPago === "online" ? "pago-online" : "pago-contraentrega";

  return (
    <div className="detalle-pedido-section">
      <h2>Detalle del Pedido</h2>

      <div className="detalle-content activo">
        <div className="detalle-grid">

          <div className="detalle-item">
            <span className="detalle-label">ID del Pedido</span>
            <span className="detalle-value">#{order.id}</span>
          </div>

          <div className="detalle-item">
            <span className="detalle-label">Cliente</span>
            <span className="detalle-value">{order.cliente}</span>
          </div>

          <div className="detalle-item">
            <span className="detalle-label">Teléfono</span>
            <span className="detalle-value">{order.telefono}</span>
          </div>

          <div className="detalle-item">
            <span className="detalle-label">Estado</span>
            <span className={`pedido-estado estado-${order.estado}`}>
              {order.estado}
            </span>
          </div>

          <div className="detalle-item">
            <span className="detalle-label">Forma de pago</span>
            <span className={`pago-badge ${pagoClass}`}>
              {order.formaPago === "online" ? "Pago Online" : "Contraentrega"}
            </span>
          </div>

          <div className="detalle-item">
            <span className="detalle-label">Dirección</span>
            <span className="detalle-value">{order.direccion}</span>
          </div>

          <div className="detalle-item">
            <span className="detalle-label">Tiempo estimado</span>
            <span className="detalle-value">{order.tiempoEstimado}</span>
          </div>
        </div>

        {/* Productos */}
        <div className="detalle-item">
          <span className="detalle-label">Productos</span>
          <ul className="productos-lista">
            {order.productos.map((p, i) => (
              <li key={i} className="producto-item">
                <span className="producto-nombre">
                  {p.cantidad}x {p.nombre}
                </span>
                <span className="producto-precio">
                  ${(p.precio * p.cantidad).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Total */}
        <div className="detalle-item">
          <span className="detalle-label">Total</span>
          <span className="detalle-value">${order.total.toLocaleString()}</span>
        </div>

        {/* Notas */}
        {order.notas && (
          <div className="detalle-item">
            <span className="detalle-label">Notas</span>
            <span className="detalle-value">{order.notas}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryOrderDetail;
