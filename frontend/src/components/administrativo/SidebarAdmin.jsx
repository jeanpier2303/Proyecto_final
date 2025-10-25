import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/styles/admin.css";

const SidebarAdmin = () => {
  return (
    <aside className="sidebar-admin">
      <div className="logo">
        <h1>Kahua</h1>
        <p>Frutos del Pacífico</p>
      </div>

      <div className="menu-section">
        <div className="menu-title">Principal</div>
        <NavLink to="/admin" end className={({isActive}) => `menu-item ${isActive ? "active" : ""}`}>
          <i className="fas fa-chart-line"></i><span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/ventas" className={({isActive}) => `menu-item ${isActive ? "active" : ""}`}>
          <i className="fas fa-chart-pie"></i><span>Análisis</span>
        </NavLink>
      </div>

      <div className="menu-section">
        <div className="menu-title">Gestión</div>
        <NavLink to="/admin/pedidos" className={({isActive}) => `menu-item ${isActive ? "active" : ""}`}>
          <i className="fas fa-shopping-cart"></i><span>Pedidos</span>
          <span className="badge">250</span>
        </NavLink>
        <NavLink to="/admin/productos" className={({isActive}) => `menu-item ${isActive ? "active" : ""}`}>
          <i className="fas fa-box"></i><span>Productos</span>
        </NavLink>
        <NavLink to="/admin/usuarios" className={({isActive}) => `menu-item ${isActive ? "active" : ""}`}>
          <i className="fas fa-users"></i><span>Usuarios</span>
        </NavLink>
        <NavLink to="/admin/categorias" className={({isActive}) => `menu-item ${isActive ? "active" : ""}`}>
          <i className="fas fa-star"></i><span>Reseñas</span>
        </NavLink>
      </div>

      <div className="menu-section">
        <div className="menu-title">Soporte</div>
        <NavLink to="/admin/mensajes" className={({isActive}) => `menu-item ${isActive ? "active" : ""}`}>
          <i className="fas fa-envelope"></i><span>Mensajes</span>
          <span className="badge">8</span>
        </NavLink>
        <NavLink to="/admin/configuracion" className={({isActive}) => `menu-item ${isActive ? "active" : ""}`}>
          <i className="fas fa-cog"></i><span>Configuración</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
