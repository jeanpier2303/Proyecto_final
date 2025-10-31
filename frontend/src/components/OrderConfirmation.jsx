// OrderConfirmation.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavPrivate from "./NavPrivate";
import Footer from "./Footer";
import "../assets/styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderData = () => {
      try {
        const storedOrders = JSON.parse(localStorage.getItem('kahuaOrders') || '[]');
        const foundOrder = storedOrders.find(order => order.orderId === orderId);
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrderData();
  }, [orderId]);

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleBackToProducts = () => {
    navigate("/productos");
  };

  const handleViewOrders = () => {
    navigate("/pedidos");
  };

  if (loading) {
    return (
      <>
        <NavPrivate />
        <div className="checkout-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando confirmación...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <NavPrivate />
        <div className="order-not-found">
          <div className="container text-center py-5">
            <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
            <h2 className="mt-3">Orden no encontrada</h2>
            <p className="text-muted">La orden que buscas no existe o ha expirado.</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => navigate("/productos")}
            >
              <i className="bi bi-bag me-2"></i>
              Volver a Productos
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavPrivate />
      
      <div className="order-confirmation-page">
        <div className="confirmation-container">
          {/* Header de Confirmación */}
          <div className="confirmation-header text-center">
            <div className="success-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h1 className="confirmation-title">¡Pago Exitoso!</h1>
            <p className="confirmation-subtitle">
              Tu pedido ha sido procesado correctamente
            </p>
            <div className="order-id-badge">
              <span>Orden #: {order.orderId}</span>
            </div>
          </div>

          <div className="confirmation-content">
            <div className="row">
              {/* Información de la Orden */}
              <div className="col-lg-8">
                <div className="confirmation-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="bi bi-receipt me-2"></i>
                      Detalles del Pedido
                    </h3>
                  </div>
                  <div className="card-body">
                    {/* Información del Cliente */}
                    <div className="customer-info mb-4">
                      <h5 className="section-title">Información del Cliente</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Nombre:</strong> {order.customer.firstName} {order.customer.lastName}</p>
                          <p><strong>Email:</strong> {order.customer.email}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Teléfono:</strong> {order.customer.phone}</p>
                          <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString('es-CO')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dirección de Envío */}
                    <div className="shipping-info mb-4">
                      <h5 className="section-title">Dirección de Envío</h5>
                      <p>{order.shipping.address}</p>
                      <p>{order.shipping.city}, {order.shipping.state}</p>
                      <p>{order.shipping.country} - {order.shipping.zipCode}</p>
                    </div>

                    {/* Productos */}
                    <div className="products-info">
                      <h5 className="section-title">Productos</h5>
                      <div className="order-items-table">
                        <div className="table-header">
                          <div className="row">
                            <div className="col-6">Producto</div>
                            <div className="col-2 text-center">Cantidad</div>
                            <div className="col-2 text-center">Precio Unitario</div>
                            <div className="col-2 text-end">Total</div>
                          </div>
                        </div>
                        <div className="table-body">
                          {order.items.map((item, index) => (
                            <div key={index} className="order-item-row">
                              <div className="row align-items-center">
                                <div className="col-6">
                                  <div className="product-info">
                                    <img 
                                      src={item.imagen} 
                                      alt={item.nombre}
                                      className="product-image"
                                    />
                                    <div className="product-details">
                                      <div className="product-name">{item.nombre}</div>
                                      {item.oferta && (
                                        <small className="text-success">
                                          <i className="bi bi-tag me-1"></i>
                                          Oferta aplicada
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2 text-center">
                                  <span className="quantity">{item.cantidad}</span>
                                </div>
                                <div className="col-2 text-center">
                                  <span className="unit-price">${item.precio.toLocaleString()}</span>
                                </div>
                                <div className="col-2 text-end">
                                  <span className="item-total">${(item.precio * item.cantidad).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumen y Acciones */}
              <div className="col-lg-4">
                {/* Resumen de Pago */}
                <div className="summary-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="bi bi-credit-card me-2"></i>
                      Resumen de Pago
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${order.summary.subtotal.toLocaleString()}</span>
                    </div>
                    {order.summary.discount > 0 && (
                      <div className="summary-row discount">
                        <span>Descuento:</span>
                        <span>-${order.summary.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="summary-row">
                      <span>Envío:</span>
                      <span>Gratis</span>
                    </div>
                    <div className="summary-row">
                      <span>IVA (19%):</span>
                      <span>${order.summary.tax.toLocaleString()}</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                      <span>Total Pagado:</span>
                      <span>${order.summary.total.toLocaleString()}</span>
                    </div>
                    
                    <div className="payment-method-info mt-3">
                      <p><strong>Método de pago:</strong> {order.payment.method === 'card' ? 'Tarjeta de Crédito' : 'Contra Entrega'}</p>
                      {order.payment.cardLastFour && (
                        <p><strong>Tarjeta terminada en:</strong> **** {order.payment.cardLastFour}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="actions-card">
                  <div className="card-body">
                    <h5 className="actions-title">¿Qué deseas hacer ahora?</h5>
                    <div className="actions-buttons">
                      <button 
                        className="btn btn-primary w-100 mb-2"
                        onClick={handlePrintInvoice}
                      >
                        <i className="bi bi-printer me-2"></i>
                        Imprimir Factura
                      </button>
                      <button 
                        className="btn btn-outline-primary w-100 mb-2"
                        onClick={handleBackToProducts}
                      >
                        <i className="bi bi-bag me-2"></i>
                        Seguir Comprando
                      </button>
                      <button 
                        className="btn btn-outline-secondary w-100"
                        onClick={handleViewOrders}
                      >
                        <i className="bi bi-list-ul me-2"></i>
                        Ver Mis Pedidos
                      </button>
                    </div>
                  </div>
                </div>

                {/* Información de Entrega */}
                <div className="delivery-info-card">
                  <div className="card-body">
                    <h5 className="delivery-title">
                      <i className="bi bi-truck me-2"></i>
                      Información de Entrega
                    </h5>
                    <div className="delivery-details">
                      <div className="delivery-item">
                        <i className="bi bi-clock text-primary"></i>
                        <span>Tiempo estimado: 45 minutos</span>
                      </div>
                      <div className="delivery-item">
                        <i className="bi bi-geo-alt text-primary"></i>
                        <span>Entrega a domicilio</span>
                      </div>
                      <div className="delivery-item">
                        <i className="bi bi-whatsapp text-primary"></i>
                        <span>Recibirás notificaciones por WhatsApp</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Factura para Imprimir */}
          <div className="invoice-print" id="invoice-print">
            <div className="invoice-header">
              <div className="invoice-logo">
                <h2>Kahua Jugos</h2>
                <p>Jugos Naturales del Pacífico</p>
              </div>
              <div className="invoice-info">
                <h3>FACTURA</h3>
                <p><strong>No:</strong> {order.orderId}</p>
                <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString('es-CO')}</p>
              </div>
            </div>

            <div className="invoice-customer">
              <div className="row">
                <div className="col-6">
                  <h4>Información del Cliente</h4>
                  <p><strong>Nombre:</strong> {order.customer.firstName} {order.customer.lastName}</p>
                  <p><strong>Email:</strong> {order.customer.email}</p>
                  <p><strong>Teléfono:</strong> {order.customer.phone}</p>
                </div>
                <div className="col-6">
                  <h4>Dirección de Envío</h4>
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.city}, {order.shipping.state}</p>
                  <p>{order.shipping.zipCode}, {order.shipping.country}</p>
                </div>
              </div>
            </div>

            <div className="invoice-items">
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-center">Precio Unitario</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td className="text-center">{item.cantidad}</td>
                      <td className="text-center">${item.precio.toLocaleString()}</td>
                      <td className="text-end">${(item.precio * item.cantidad).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="invoice-totals">
              <div className="row justify-content-end">
                <div className="col-4">
                  <table className="totals-table">
                    <tbody>
                      <tr>
                        <td>Subtotal:</td>
                        <td className="text-end">${order.summary.subtotal.toLocaleString()}</td>
                      </tr>
                      {order.summary.discount > 0 && (
                        <tr>
                          <td>Descuento:</td>
                          <td className="text-end">-${order.summary.discount.toLocaleString()}</td>
                        </tr>
                      )}
                      <tr>
                        <td>Envío:</td>
                        <td className="text-end">Gratis</td>
                      </tr>
                      <tr>
                        <td>IVA (19%):</td>
                        <td className="text-end">${order.summary.tax.toLocaleString()}</td>
                      </tr>
                      <tr className="total-row">
                        <td><strong>Total:</strong></td>
                        <td className="text-end"><strong>${order.summary.total.toLocaleString()}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="invoice-footer">
              <p><strong>Método de pago:</strong> {order.payment.method === 'card' ? 'Tarjeta de Crédito' : 'Contra Entrega'}</p>
              {order.payment.cardLastFour && (
                <p><strong>Tarjeta:</strong> **** {order.payment.cardLastFour}</p>
              )}
              <p className="thank-you">¡Gracias por tu compra!</p>
              <p className="contact-info">
                Kahua Jugos • Tel: +57 322 267 1234 • Email: info@kahuajugos.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderConfirmation;