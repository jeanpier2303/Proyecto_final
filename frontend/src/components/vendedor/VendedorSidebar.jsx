import React from "react";
import { Nav } from "react-bootstrap";
import { House, ShoppingCart, Box, Clock, BarChart2, LogOut } from "lucide-react";
import "../../assets/styles/admin.css";
import "../../assets/styles/vendedor.css";
import lofo from "../../assets/images/categorias/logo-blanc.png";

export default function VendedorSidebar({ activeSection, onSelect }) {
  return (
    <aside className="sidebar-admin">
      {/* Logo */}
      <div className="logo mb-4">
        <img
          src={lofo}
          alt="Kahua Logo"
          className="logo-mg"
        />
        <p>Panel de Vendedor</p>
      </div>

      {/* Menú de navegación */}
      <Nav className="flex-column">
        <Nav.Link
          className={`menu-item ${
            activeSection === "dashboard" ? "active" : ""
          }`}
          onClick={() => onSelect("dashboard")}
        >
          <House size={18} />
          <span className="ms-2">Dashboard</span>
        </Nav.Link>

        <Nav.Link
          className={`menu-item ${
            activeSection === "pedidos" ? "active" : ""
          }`}
          onClick={() => onSelect("pedidos")}
        >
          <ShoppingCart size={18} />
          <span className="ms-2">Pedidos Activos</span>
          <span className="badge ms-auto">12</span>
        </Nav.Link>

        <Nav.Link
          className={`menu-item ${
            activeSection === "inventario" ? "active" : ""
          }`}
          onClick={() => onSelect("inventario")}
        >
          <Box size={18} />
          <span className="ms-2">Inventario</span>
        </Nav.Link>

        <Nav.Link
          className={`menu-item ${
            activeSection === "historial" ? "active" : ""
          }`}
          onClick={() => onSelect("historial")}
        >
          <Clock size={18} />
          <span className="ms-2">Historial</span>
        </Nav.Link>

        <Nav.Link
          className={`menu-item ${
            activeSection === "analiticas" ? "active" : ""
          }`}
          onClick={() => onSelect("analiticas")}
        >
          <BarChart2 size={18} />
          <span className="ms-2">Analíticas</span>
        </Nav.Link>
      </Nav>

      {/* Cerrar sesión */}
      <div className="mt-auto pt-3">
        <button
          className="menu-item w-100 text-start"
          onClick={() => alert("Cerrar sesión")}
        >
          <LogOut size={18} />
          <span className="ms-2">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
