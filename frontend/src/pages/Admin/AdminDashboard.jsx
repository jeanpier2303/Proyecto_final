import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarAdmin from "../../components/administrativo/SidebarAdmin";
import HeaderAdmin from "../../components/administrativo/HeaderAdmin";
import DashboardHome from "./DashboardHome";
import ProductosAdmin from "./ProductosAdmin";
import PedidosAdmin from "./PedidosAdmin";
import UsuariosAdmin from "./UsuariosAdmin";
import CategoriasAdmin from "./CategoriasAdmin";
import VentasAdmin from "./VentasAdmin";
import "../../assets/styles/admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="main-area">
        <HeaderAdmin title="Panel Administrativo" />
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="productos" element={<ProductosAdmin />} />
          <Route path="pedidos" element={<PedidosAdmin />} />
          <Route path="usuarios" element={<UsuariosAdmin />} />
          <Route path="categorias" element={<CategoriasAdmin />} />
          <Route path="ventas" element={<VentasAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
