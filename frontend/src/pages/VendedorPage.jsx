import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import VendedorSidebar from "../components/vendedor/VendedorSidebar";
import VendedorHeader from "../components/vendedor/VendedorHeader";
import VendedorDashboard from "../components/vendedor/VendedorDashboard";
import VendedorVenta from "../components/vendedor/VendedorVenta";
import VendedorInventario from "../components/vendedor/VendedorInventario";
import VendedorHistorial from "../components/vendedor/VendedorHistorial";
import "../assets/styles/admin.css";
import "../assets/styles/vendedor.css";

export default function VendedorPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showVenta, setShowVenta] = useState(false);
  const { user, logout } = useAuth();

  function renderSection() {
    if (showVenta) {
      return <VendedorVenta onClose={() => setShowVenta(false)} />;
    }

    switch (activeSection) {
      case "dashboard": return <VendedorDashboard />;
      case "inventario": return <VendedorInventario />;
      case "historial": return <VendedorHistorial />;
      default: return <VendedorDashboard />;
    }
  }

  return (
    <div className="admin-container">
      <VendedorSidebar
        activeSection={activeSection}
        onSelect={setActiveSection}
        onLogout={logout}
      />
      <main className="main-area">
        <VendedorHeader onNuevaVenta={() => setShowVenta(true)} />
        {renderSection()}
      </main>
    </div>
  );
}
