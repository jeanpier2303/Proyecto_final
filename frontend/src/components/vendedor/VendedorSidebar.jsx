import React from "react";
import { Nav } from "react-bootstrap";
import { House, Box, Clock, BarChart2, LogOut } from "lucide-react";
import "../../assets/styles/admin.css";
import "../../assets/styles/vendedor.css";
import lofo from "../../assets/images/categorias/logo-blanc.png";

export default function VendedorSidebar({ activeSection, onSelect, onLogout }) {
  return (
    <aside className="sidebar-admin">
      {/* Logo */}
      <div className="logo mb-4">
        <img src={lofo} alt="Kahua Logo" className="logo-mg" />
        <p>Panel de Vendedor</p>
      </div>

      {/* Menú */}
      <Nav className="flex-column">
        <Nav.Link
          className={`menu-item ${activeSection === "dashboard" ? "active" : ""}`}
          onClick={() => onSelect("dashboard")}
        >
          <House size={18} />
          <span className="ms-2">Dashboard</span>
        </Nav.Link>

        <Nav.Link
          className={`menu-item ${activeSection === "inventario" ? "active" : ""}`}
          onClick={() => onSelect("inventario")}
        >
          <Box size={18} />
          <span className="ms-2">Inventario</span>
        </Nav.Link>

        <Nav.Link
          className={`menu-item ${activeSection === "historial" ? "active" : ""}`}
          onClick={() => onSelect("historial")}
        >
          <Clock size={18} />
          <span className="ms-2">Historial</span>
        </Nav.Link>

        <Nav.Link
          className={`menu-item ${activeSection === "analiticas" ? "active" : ""}`}
          onClick={() => onSelect("analiticas")}
        >
          <BarChart2 size={18} />
          <span className="ms-2">Analíticas</span>
        </Nav.Link>
      </Nav>

      {/* Botón de cerrar sesión */}
      <div className="mt-auto pt-3">
        <button
          className="menu-item logout-btn w-100 text-start"
          onClick={() => {
            if (window.confirm("¿Seguro que deseas cerrar sesión?")) onLogout();
          }}
        >
          <LogOut size={18} />
          <span className="ms-2">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
