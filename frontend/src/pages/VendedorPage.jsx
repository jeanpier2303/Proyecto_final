import React, { useState } from "react";
import VendedorSidebar from "../components/vendedor/VendedorSidebar";
import VendedorHeader from "../components/vendedor/VendedorHeader";
import VendedorDashboard from "../components/vendedor/VendedorDashboard";
import "../assets/styles/admin.css";
import "../assets/styles/vendedor.css";

export default function VendedorPage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  function renderSection() {
    switch (activeSection) {
      case "dashboard":
        return <VendedorDashboard />;
      // case "pedidos": return <VendedorPedidos />;
      // case "inventario": return <VendedorInventario />;
      // case "historial": return <VendedorHistorial />;
      // case "analiticas": return <VendedorAnaliticas />;
      default:
        return <VendedorDashboard />;
    }
  }

  return (
    <div className="admin-container">
      <VendedorSidebar activeSection={activeSection} onSelect={setActiveSection} />
      <main className="main-area">
        <VendedorHeader onNuevaVenta={() => setActiveSection("dashboard")} />
        {renderSection()}
      </main>
    </div>
  );
}
