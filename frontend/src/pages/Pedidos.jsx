import React, { useState } from "react";
import NavPrivate from "../../components/NavPrivate";
import Footer from "../../components/Footer";
import "../../assets/styles/Home.css";
import "../assets/styles/Pedidos.css";

const Pedidos = () => {
  const [activeTab, setActiveTab] = useState("activos");

  const tabs = [
    { id: "activos", name: "Pedidos Activos", icon: "bi-clock" },
    { id: "completados", name: "Completados", icon: "bi-check-circle" },
    { id: "cancelados", name: "Cancelados", icon: "bi-x-circle" }
  ];

  const orders = {
    activos: [
      {
        id: "ORD-001",
        date: "2024-06-15",
        status: "preparando",
        statusText: "En Preparación",
        items: [
          { name: "Jugo de Mango 1L", quantity: 2, price: 15000 },
          { name: "Piña Fresca", quantity: 1, price: 8000 }
        ],
        total: 38000,
        estimatedDelivery: "2024-06-15 14:00-16:00",
        address: "Calle 123 #45-67, Bogotá"
      },
      {
        id: "ORD-002",
        date: "2024-06-14",
        status: "enviado",
        statusText: "En Camino",
        items: [
          { name: "Jugo de Mora 500ml", quantity: 3, price: 12000 }
        ],
        total: 36000,
        estimatedDelivery: "2024-06-14 10:00-12:00",
        address: "Carrera 89 #12-34, Bogotá"
      }
    ],
    completados: [
      {
        id: "ORD-003",
        date: "2024-06-10",
        status: "entregado",
        statusText: "Entregado",
        items: [
          { name: "Banano Orgánico", quantity: 5, price: 5000 },
          { name: "Jugo de Naranja 1L", quantity: 1, price: 13000 }
        ],
        total: 38000,
        deliveredAt: "2024-06-10 11:30",
        address: "Calle 123 #45-67, Bogotá",
        rating: 5
      }
    ],
    cancelados: []
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "preparando": return "bi-clock";
      case "enviado": return "bi-truck";
      case "entregado": return "bi-check-circle";
      default: return "bi-info-circle";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "preparando": return "status-preparing";
      case "enviado": return "status-shipping";
      case "entregado": return "status-delivered";
      default: return "status-default";
    }
  };

  return (
    <>
      <NavPrivate />
      <main className="orders-page">
        {/* Hero Section de Pedidos */}
        <section className="orders-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Mis <span>Pedidos</span></h1>
              <p>Gestiona y revisa el estado de tus pedidos</p>
              <div className="orders-stats">
                <div className="stat">
                  <span className="stat-number">{orders.activos.length}</span>
                  <span className="stat-label">Activos</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{orders.completados.length}</span>
                  <span className="stat-label">Completados</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{orders.cancelados.length}</span>
                  <span className="stat-label">Cancelados</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs de Pedidos */}
        <section className="orders-tabs">
          <div className="container">
            <div className="tabs-container">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={tab.icon}></i>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lista de Pedidos */}
        <section className="orders-list-section">
          <div className="container">
            {orders[activeTab].length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-inbox"></i>
                <h3>No hay pedidos {activeTab}</h3>
                <p>Cuando realices un pedido, aparecerá aquí</p>
                <button className="btn btn-primary">
                  <i className="bi bi-cart"></i> Hacer Pedido
                </button>
              </div>
            ) : (
              <div className="orders-container">
                {orders[activeTab].map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Pedido #{order.id}</h3>
                        <span className="order-date">
                          {new Date(order.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className={`order-status ${getStatusColor(order.status)}`}>
                        <i className={getStatusIcon(order.status)}></i>
                        {order.statusText}
                      </div>
                    </div>

                    <div className="order-items">
                      <h4>Productos:</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-details">
                      <div className="detail-row">
                        <span>Total:</span>
                        <strong>${order.total.toLocaleString()}</strong>
                      </div>
                      {order.estimatedDelivery && (
                        <div className="detail-row">
                          <span>Entrega estimada:</span>
                          <span>{order.estimatedDelivery}</span>
                        </div>
                      )}
                      {order.deliveredAt && (
                        <div className="detail-row">
                          <span>Entregado el:</span>
                          <span>{new Date(order.deliveredAt).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="detail-row">
                        <span>Dirección:</span>
                        <span>{order.address}</span>
                      </div>
                    </div>

                    <div className="order-actions">
                      <button className="btn btn-outline">
                        <i className="bi bi-eye"></i> Ver Detalles
                      </button>
                      {order.status === "preparando" && (
                        <button className="btn btn-danger">
                          <i className="bi bi-x-circle"></i> Cancelar
                        </button>
                      )}
                      {order.status === "entregado" && !order.rating && (
                        <button className="btn btn-primary">
                          <i className="bi bi-star"></i> Calificar
                        </button>
                      )}
                      <button className="btn btn-outline">
                        <i className="bi bi-repeat"></i> Volver a Pedir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Track de Pedidos */}
        {orders.activos.length > 0 && (
          <section className="order-tracking">
            <div className="container">
              <div className="section-title">
                <h2>Seguimiento en Tiempo Real</h2>
                <p>Mira el progreso de tus pedidos activos</p>
              </div>
              
              <div className="tracking-container">
                {orders.activos.map(order => (
                  <div key={order.id} className="tracking-card">
                    <h3>Seguimiento: #{order.id}</h3>
                    <div className="tracking-steps">
                      <div className={`tracking-step ${order.status === 'preparando' || order.status === 'enviado' || order.status === 'entregado' ? 'completed' : ''}`}>
                        <div className="step-icon">
                          <i className="bi bi-cart-check"></i>
                        </div>
                        <span>Confirmado</span>
                      </div>
                      <div className={`tracking-step ${order.status === 'enviado' || order.status === 'entregado' ? 'completed' : ''}`}>
                        <div className="step-icon">
                          <i className="bi bi-box"></i>
                        </div>
                        <span>Preparando</span>
                      </div>
                      <div className={`tracking-step ${order.status === 'enviado' || order.status === 'entregado' ? 'completed' : ''}`}>
                        <div className="step-icon">
                          <i className="bi bi-truck"></i>
                        </div>
                        <span>En Camino</span>
                      </div>
                      <div className={`tracking-step ${order.status === 'entregado' ? 'completed' : ''}`}>
                        <div className="step-icon">
                          <i className="bi bi-house-check"></i>
                        </div>
                        <span>Entregado</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Pedidos;