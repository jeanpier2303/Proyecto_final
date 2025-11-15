// src/components/delivery/DeliveryOrderList.jsx
import React from "react";
import { Form } from "react-bootstrap";
import DeliveryOrderCard from "./DeliveryOrderCard";

function DeliveryOrderList({ orders, onSelect, filter, setFilter, onOpenModal }) {
  return (
    <>
      {/* Filtro */}
      <Form.Select
        className="mb-3"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="todos">Todos los estados</option>
        <option value="pendiente">Pendientes</option>
        <option value="en_camino">En camino</option>
        <option value="entregado">Entregados</option>
      </Form.Select>

      {/* Lista de pedidos */}
      <div className="pedidos-lista">
        {orders.length === 0 ? (
          <p className="placeholder-text">
            No hay pedidos con los filtros aplicados
          </p>
        ) : (
          orders.map((order) => (
            <DeliveryOrderCard
              key={order.id}
              order={order}
              onSelect={onSelect}
              onOpenModal={onOpenModal}
            />
          ))
        )}
      </div>
    </>
  );
}

export default DeliveryOrderList;
