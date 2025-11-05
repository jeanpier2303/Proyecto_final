import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import NavPrivate from "../../components/NavPrivate";
import Footer from "../../components/Footer";
import "../../assets/styles/Pedidos.css";

// Importar las mismas imágenes que en Productos.jsx
import JugoNaranja from "../../assets/images/Productos/Jugo_naranja.png";
import JugoManzana from "../../assets/images/Productos/Jugo_manzana.png";
import JugoZanahoriaNaranja from "../../assets/images/Productos/Jugo_Naranja&Zanahoria.png";
import JugoBorojó from "../../assets/images/Productos/Jugo_borojo.png";
import JugoGuanabana from "../../assets/images/Productos/Jugo_guanabana.png";
import JugoLulo from "../../assets/images/Productos/Jugo_lulo.png";
import JugoMango from "../../assets/images/Productos/Jugo_mango.png";
import JugoBorojóMaracuya from "../../assets/images/Productos/Jugo_borojo&maracuya.png";
import JugoFrutosRojos from "../../assets/images/Productos/Jugo_frutos_rojos.png";
import JugoMangoMaracuya from "../../assets/images/Productos/Jugo_Mango&Maracuyá.png";
import JugoChontaduro from "../../assets/images/Productos/Jugo_Chontaduro.png";
import JugoMangoGuayabaNaranja from "../../assets/images/Productos/Jugo_MangoGuayabaNaranja.png";

const Pedidos = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mapeo de imágenes (igual que en Productos.jsx)
  const productImages = {
    "Jugo de Naranja Natural": JugoNaranja,
    "Jugo Verde Lulo": JugoLulo,
    "Mezcla Tropical de Mango y Maracuyá": JugoMangoMaracuya,
    "Jugo energizante de Borojó": JugoBorojó,
    "Jugo Clásico de Manzana": JugoManzana,
    "Jugo Guanabana Power": JugoGuanabana,
    "Mezcla Tropical Frutos Rojos": JugoFrutosRojos,
    "Jugo Energizante Borojó y Maracuyá": JugoBorojóMaracuya,
    "Jugo de Zanahoria y Naranja": JugoZanahoriaNaranja,
    "Jugo verde de Mango": JugoMango,
    "Mezcla Tropical de Mango, Guayaba y Naranja": JugoMangoGuayabaNaranja,
    "Jugo Energgizante de Chontaduro": JugoChontaduro
  };

  // Cargar pedidos desde localStorage al montar el componente
  useEffect(() => {
    const loadOrders = () => {
      try {
        const storedOrders = localStorage.getItem('kahuaOrders');
        if (storedOrders) {
          const parsedOrders = JSON.parse(storedOrders);
          // Ordenar pedidos por fecha (más reciente primero)
          const sortedOrders = parsedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-CO', options);
  };

  // Función para obtener el estado del pedido basado en la fecha
  const getOrderStatus = (orderDate) => {
    const orderDateTime = new Date(orderDate);
    const now = new Date();
    const diffHours = (now - orderDateTime) / (1000 * 60 * 60);

    if (diffHours < 1) return { status: 'preparando', text: 'En preparación', class: 'pedido-status-preparando' };
    if (diffHours < 24) return { status: 'enviado', text: 'En camino', class: 'pedido-status-enviado' };
    return { status: 'entregado', text: 'Entregado', class: 'pedido-status-entregado' };
  };

  // Función para comprar nuevamente
  const handleReorder = (orderItems) => {
    const existingCart = JSON.parse(localStorage.getItem('kahuaCart') || '[]');
    
    const newCartItems = orderItems.map(item => ({
      ...item,
      id: Date.now() + Math.random(), // Nuevo ID para evitar conflictos
      showStockAlert: false
    }));

    const updatedCart = [...existingCart, ...newCartItems];
    localStorage.setItem('kahuaCart', JSON.stringify(updatedCart));
    
    alert('¡Productos agregados al carrito! Serás redirigido al carrito.');
    window.location.href = '/carrito';
  };

  // Función para mostrar detalles del pedido
  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  // Función para cerrar el modal de detalles
  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <>
        <NavPrivate />
        <div className="pedidos-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando tus pedidos...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavPrivate />

      {/* Encabezado */}
      <section className="pedidos-header text-center py-5">
        <Container>
          <h1 className="pedidos-title">
            <i className="bi bi-bag-check me-2"></i>
            Mis Pedidos
          </h1>
          <p className="pedidos-subtitle">
            Consulta el estado de tus compras y vuelve a disfrutar de tus jugos favoritos.
          </p>
        </Container>
      </section>

      {/* Sección de pedidos */}
      <section className="pedidos-section py-5">
        <Container>
          {orders.length === 0 ? (
            <div className="pedidos-empty text-center">
              <i className="bi bi-cart-x pedidos-empty-icon"></i>
              <h3 className="pedidos-empty-title">No has realizado pedidos</h3>
              <p className="pedidos-empty-text">
                ¡Descubre nuestros deliciosos jugos y haz tu primer pedido!
              </p>
              <Button 
                variant="primary" 
                className="pedidos-empty-btn"
                href="/productos"
              >
                <i className="bi bi-bag me-2"></i>
                Explorar Productos
              </Button>
            </div>
          ) : (
            <Row>
              {orders.map((order) => {
                const statusInfo = getOrderStatus(order.date);
                const firstItem = order.items[0];

                return (
                  <Col md={6} lg={4} className="mb-4" key={order.orderId}>
                    <Card className="pedido-card h-100">
                      <Card.Body className="pedido-card-body">
                        {/* Header del pedido */}
                        <div className="pedido-header mb-3">
                          <div className="pedido-id">
                            <strong>
                              <i className="bi bi-receipt me-2"></i>
                              {order.orderId}
                            </strong>
                          </div>
                          <div className="pedido-date">
                            <i className="bi bi-calendar-event me-2"></i>
                            {formatDate(order.date)}
                          </div>
                        </div>

                        {/* Estado del pedido */}
                        <div className={`pedido-status ${statusInfo.class} mb-3`}>
                          <i className="bi bi-clock-history me-2"></i>
                          {statusInfo.text}
                        </div>

                        {/* Información del cliente */}
                        <div className="pedido-customer mb-3">
                          <div className="pedido-customer-name">
                            <i className="bi bi-person me-2"></i>
                            {order.customer.firstName} {order.customer.lastName}
                          </div>
                          <div className="pedido-customer-address">
                            <i className="bi bi-geo-alt me-2"></i>
                            {order.shipping.city}, {order.shipping.state}
                          </div>
                        </div>

                        {/* Items del pedido */}
                        <div className="pedido-items">
                          <div className="pedido-main-item">
                            <div className="pedido-item-image">
                              <img 
                                src={productImages[firstItem.nombre] || firstItem.imagen} 
                                alt={firstItem.nombre}
                                className="pedido-img"
                                onError={(e) => {
                                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
                                }}
                              />
                            </div>
                            <div className="pedido-item-info">
                              <h6 className="pedido-item-name">{firstItem.nombre}</h6>
                              <div className="pedido-item-quantity">
                                Cantidad: {firstItem.cantidad}
                              </div>
                              <div className="pedido-item-price">
                                ${firstItem.precio.toLocaleString()} c/u
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Total del pedido */}
                        <div className="pedido-total-section mt-3 pt-3 border-top">
                          <div className="pedido-total-row">
                            <span>Total del pedido:</span>
                            <strong className="pedido-total-amount">
                              ${order.total.toLocaleString()}
                            </strong>
                          </div>
                        </div>

                        {/* Acciones del pedido */}
                        <div className="pedido-actions mt-3">
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="pedido-action-btnn me-2"
                            onClick={() => handleReorder(order.items)}
                          >
                            <i className="bi bi-cart-plus me-1"></i>
                            Comprar nuevamente
                          </Button>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            className="pedido-action-btnn"
                            onClick={() => handleShowDetails(order)}
                          >
                            <i className="bi bi-eye me-1"></i>
                            Ver detalles
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </section>

      {/* Modal de detalles del pedido */}
      <Modal show={showDetailsModal} onHide={handleCloseDetails} size="lg" className="pedido-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-receipt me-2"></i>
            Detalles del Pedido
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div className="pedido-detalles">
              {/* Header del pedido */}
              <div className="detalle-header">
                <div>
                  <div className="detalle-id">
                    <strong>Pedido: {selectedOrder.orderId}</strong>
                  </div>
                  <div className="detalle-fecha">
                    <i className="bi bi-calendar-event me-1"></i>
                    {formatDate(selectedOrder.date)}
                  </div>
                </div>
                <div className="pedido-total-badge">
                  ${selectedOrder.total.toLocaleString()}
                </div>
              </div>

              {/* Estado del pedido */}
              <div className="detalle-estado">
                {(() => {
                  const statusInfo = getOrderStatus(selectedOrder.date);
                  return (
                    <div className={`estado-badge ${statusInfo.class}`}>
                      <i className="bi bi-clock-history me-2"></i>
                      {statusInfo.text}
                    </div>
                  );
                })()}
              </div>

              {/* Items del pedido */}
              <div className="detalle-items">
                <h6>Productos del pedido:</h6>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="detalle-item">
                    <div className="item-image">
                      <img 
                        src={productImages[item.nombre] || item.imagen} 
                        alt={item.nombre}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.nombre}</div>
                      <div className="item-category">{item.categoria}</div>
                    </div>
                    <div className="item-cantidad">
                      x{item.cantidad}
                    </div>
                    <div className="item-precio">
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="detalle-totales">
                <div className="total-line">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.total.toLocaleString()}</span>
                </div>
                <div className="total-line">
                  <span>Envío:</span>
                  <span>$0</span>
                </div>
                <div className="total-line total-final">
                  <span>Total:</span>
                  <span>${selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Información de envío */}
              <div className="detalle-envio">
                <h6>Información de envío:</h6>
                <div className="envio-info">
                  <div>
                    <strong>Cliente:</strong> {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedOrder.customer.email}
                  </div>
                  <div>
                    <strong>Teléfono:</strong> {selectedOrder.customer.phone}
                  </div>
                  <div>
                    <strong>Dirección:</strong> {selectedOrder.shipping.address}, {selectedOrder.shipping.city}, {selectedOrder.shipping.state}
                  </div>
                  <div>
                    <strong>Referencia:</strong> {selectedOrder.shipping.reference || 'Ninguna'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Cerrar
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              handleReorder(selectedOrder.items);
              handleCloseDetails();
            }}
          >
            <i className="bi bi-cart-plus me-1"></i>
            Comprar nuevamente
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Pedidos;