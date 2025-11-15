// src/pages/delivery/DeliveryPage.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge, Spinner } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";

import DeliveryHeader from "../../components/delivery/DeliveryHeader";
import DeliveryOrderList from "../../components/delivery/DeliveryOrderList";
import DeliveryOrderDetail from "../../components/delivery/DeliveryOrderDetail";
import DeliveryConfirmModal from "../../components/delivery/DeliveryConfirmModal";

import "../../assets/styles/delivery.css";

const initialOrders = [
  {
    id: 1001,
    cliente: "María García",
    telefono: "+57 300 123 4567",
    direccion: "Calle 123 #45-67, Medellín",
    productos: [
      { nombre: "Jugo de Naranja Natural", cantidad: 2, precio: 7500 },
      { nombre: "Jugo Verde Lulo", cantidad: 1, precio: 12000 }
    ],
    total: 27000,
    formaPago: "online",
    status_id: 1, // pendiente
    notas: "Entregar en portería",
    fecha: "2024-03-20 14:30",
    urgencia: "normal",
    tiempoEstimado: "15 min",
    pagoConfirmado: false,
    montoRecibido: null
  },
  {
    id: 1002,
    cliente: "Carlos López",
    telefono: "+57 310 987 6543",
    direccion: "Avenida Siempre Viva 742, Bogotá",
    productos: [
      { nombre: "Mezcla Tropical de Mango y Maracuyá", cantidad: 3, precio: 10500 },
      { nombre: "Jugo Energizante de Borojó", cantidad: 1, precio: 12800 }
    ],
    total: 44300,
    formaPago: "contraentrega",
    status_id: 2, // en_camino
    notas: "Llamar antes de llegar",
    fecha: "2024-03-20 15:15",
    urgencia: "normal",
    tiempoEstimado: "25 min",
    pagoConfirmado: false,
    montoRecibido: null
  },
  {
    id: 1003,
    cliente: "Ana Rodríguez",
    telefono: "+57 320 555 1234",
    direccion: "Carrera 80 #25-30, Cali",
    productos: [
      { nombre: "Jugo Clásico de Manzana", cantidad: 1, precio: 6800 },
      { nombre: "Jugo de Zanahoria y Naranja", cantidad: 2, precio: 8200 }
    ],
    total: 23200,
    formaPago: "contraentrega",
    status_id: 4, // entregado
    pagoConfirmado: true,
    montoRecibido: 23200,
    notas: "Cliente espera en oficina",
    fecha: "2024-03-20 16:00",
    urgencia: "alta",
    tiempoEstimado: "0 min"
  }
];

function DeliveryPage() {
  // Header usa useAuth — lo dejamos (tu header ya lo maneja)
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // objeto pedido
  const [filter, setFilter] = useState("todos"); // 'todos' | 'pendiente' | 'en_camino' | 'entregado'
  const [modalOrder, setModalOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper: map status_id a string usada en el filtro
  const statusIdToKey = (status_id) => {
    const map = {
      1: "pendiente",
      2: "en_camino",
      4: "entregado",
    };
    return map[status_id] || "pendiente";
  };

  // Cargar datos estáticos al montar
  useEffect(() => {
    // simulamos pequeña carga para que el spinner se vea si quieres
    setLoading(true);
    const t = setTimeout(() => {
      setOrders(initialOrders);
      setLoading(false);
    }, 200); // puedes poner 0 si no quieres retardo
    return () => clearTimeout(t);
  }, []);

  // Filtrar pedidos según el selector (comparamos la key, no el id numérico)
  const filteredOrders = orders.filter((o) => {
    if (filter === "todos") return true;
    return statusIdToKey(o.status_id) === filter;
  });

  // Manejar confirmación desde el modal (recibe un objeto con id, status_id:4 y pago info)
  const handleConfirmFromModal = (payload) => {
    // payload puede ser { id, status_id:4, pagoConfirmado, montoRecibido }
    setOrders((prev) =>
      prev.map((p) => {
        if (p.id === payload.id) {
          return {
            ...p,
            status_id: payload.status_id ?? 4,
            pagoConfirmado: payload.pagoConfirmado ?? p.pagoConfirmado,
            montoRecibido:
              payload.montoRecibido !== undefined
                ? payload.montoRecibido
                : p.montoRecibido,
            tiempoEstimado: "0 min",
          };
        }
        return p;
      })
    );

    // si el pedido seleccionado está visible, actualizarlo
    if (selectedOrder && selectedOrder.id === payload.id) {
      setSelectedOrder((prev) => ({
        ...prev,
        status_id: payload.status_id ?? 4,
        pagoConfirmado: payload.pagoConfirmado ?? prev.pagoConfirmado,
        montoRecibido:
          payload.montoRecibido !== undefined
            ? payload.montoRecibido
            : prev.montoRecibido,
        tiempoEstimado: "0 min",
      }));
    }

    setModalOrder(null);
  };

  return (
    <div className="delivery-container">
      {/* HEADER */}
      <DeliveryHeader />

      {/* MAIN */}
      <Container className="mt-4">
        <Row>
          {/* LISTA DE PEDIDOS */}
          <Col lg={6}>
            <div className="pedidos-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Pedidos Asignados</h2>

                {loading ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  <Badge bg="primary">{filteredOrders.length}</Badge>
                )}
              </div>

              <DeliveryOrderList
                orders={filteredOrders}
                onSelect={(order) => setSelectedOrder(order)}
                filter={filter}
                setFilter={setFilter}
                onOpenModal={(order) => setModalOrder(order)}
              />
            </div>
          </Col>

          {/* DETALLE DEL PEDIDO */}
          <Col lg={6}>
            <DeliveryOrderDetail order={selectedOrder} />
          </Col>
        </Row>
      </Container>

      {/* MODAL DE CONFIRMACIÓN (actualiza estado en frontend) */}
      {modalOrder && (
        <DeliveryConfirmModal
          order={modalOrder}
          onClose={() => setModalOrder(null)}
          onConfirm={(payload) => handleConfirmFromModal(payload)}
        />
      )}
    </div>
  );
}

export default DeliveryPage;
