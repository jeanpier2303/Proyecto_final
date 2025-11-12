import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import "../../assets/styles/vendedor.css";

export default function VendedorDashboard() {
  const ventas = [
    { id: 1001, productos: "Jugo Verde, Batido Fresa", total: 5500, estado: "Listo" },
    { id: 1002, productos: "Sándwich Vegano, Jugo Naranja", total: 7200, estado: "En Prep." },
    { id: 1003, productos: "Acaí Bowl", total: 4800, estado: "Pendiente" },
  ];

  return (
    <div className="content-area">
      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div>
            <div className="stat-value">$ 245,800</div>
            <div className="stat-label">Ventas Hoy</div>
          </div>
          <div className="stat-icon purple">
            <i className="bi bi-cash-coin"></i>
          </div>
        </div>

        <div className="stat-card warning">
          <div>
            <div className="stat-value">18</div>
            <div className="stat-label">Pedidos Activos</div>
          </div>
          <div className="stat-icon orange">
            <i className="bi bi-cart-check"></i>
          </div>
        </div>

        <div className="stat-card success">
          <div>
            <div className="stat-value">42</div>
            <div className="stat-label">Clientes Atendidos</div>
          </div>
          <div className="stat-icon green">
            <i className="bi bi-people"></i>
          </div>
        </div>

        <div className="stat-card danger">
          <div>
            <div className="stat-value">3</div>
            <div className="stat-label">Productos Bajo Stock</div>
          </div>
          <div className="stat-icon blue">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header d-flex justify-content-between align-items-center mb-3">
          <h3 className="section-title">Pedidos Recientes</h3>
        </div>

        <div className="table-responsive">
          <Table className="table-vendedor">
            <thead>
              <tr>
                <th># Pedido</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.id}>
                  <td>#{v.id}</td>
                  <td>{v.productos}</td>
                  <td>$ {v.total.toLocaleString()}</td>
                  <td>
                    <span className={`badge-vendedor ${
                      v.estado === "Listo" ? "badge-listo" : v.estado.includes("Prep") ? "badge-preparacion" : "badge-pendiente"
                    }`}>{v.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
