import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import DeliveryHeader from "../../components/delivery/DeliveryHeader";
import DeliveryOrderList from "../../components/delivery/DeliveryOrderList";
import DeliveryOrderDetail from "../../components/delivery/DeliveryOrderDetail";
import DeliveryConfirmModal from "../../components/delivery/DeliveryConfirmModal";
import "../../assets/styles/delivery.css";

function DeliveryPage() {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("todos");
  const [modalOrder, setModalOrder] = useState(null);

  useEffect(() => {
    fetchMock();
  }, []);

  const fetchMock = () => {
    setOrders([
      {
        id: 1001,
        cliente: "María García",
        telefono: "+57 300 123 4567",
        direccion: "Calle 123 #45-67, Medellín",
        productos: [
          { nombre: "Jugo de Naranja Natural", cantidad: 2, precio: 7500 },
          { nombre: "Jugo Verde Lulo", cantidad: 1, precio: 12000 },
        ],
        total: 27000,
        estado: "pendiente",
        formaPago: "online",
        notas: "Entregar en portería",
        fecha: "2024-03-20 14:30",
        urgencia: "normal",
        tiempoEstimado: "15 min",
      },
      {
        id: 1002,
        cliente: "Carlos López",
        telefono: "+57 310 987 6543",
        direccion: "Avenida Siempre Viva 742, Bogotá",
        productos: [
          { nombre: "Mezcla Tropical Mango-Maracuyá", cantidad: 3, precio: 10500 },
          { nombre: "Jugo Energizante Borojó", cantidad: 1, precio: 12800 },
        ],
        total: 44300,
        estado: "en_camino",
        formaPago: "contraentrega",
        notas: "Llamar antes de llegar",
        fecha: "2024-03-20 15:15",
        urgencia: "normal",
        tiempoEstimado: "25 min",
      },
    ]);
  };

  const filteredOrders = orders.filter((o) => {
    return filter === "todos" || o.estado === filter;
  });

  return (
    <div className="delivery-container">

      {/* HEADER */}
      <DeliveryHeader />

      {/* MAIN */}
      <Container className="mt-4">
        <Row>
          {/* LISTA */}
          <Col lg={6}>
            <div className="pedidos-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Pedidos Asignados</h2>
                <Badge bg="primary">{filteredOrders.length}</Badge>
              </div>

              <DeliveryOrderList
                orders={filteredOrders}
                onSelect={setSelectedOrder}
                filter={filter}
                setFilter={setFilter}
                onOpenModal={setModalOrder}
              />
            </div>
          </Col>

          {/* DETALLE */}
          <Col lg={6}>
            <DeliveryOrderDetail order={selectedOrder} />
          </Col>
        </Row>
      </Container>

      {/* MODAL */}
      {modalOrder && (
        <DeliveryConfirmModal
          order={modalOrder}
          onClose={() => setModalOrder(null)}
          onConfirm={(updated) => {
            // Actualizar estado
            setOrders((prev) =>
              prev.map((o) => (o.id === updated.id ? updated : o))
            );
            setModalOrder(null);
          }}
        />
      )}
    </div>
  );
}

export default DeliveryPage;
