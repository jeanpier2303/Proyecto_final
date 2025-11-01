import React from "react";
import { useParams } from "react-router-dom";
import FacturaCard from "./FacturaCard"; // 👈 Importa tu componente visual

const FacturaAdmin = () => {
  const { id } = useParams();

  return (
    <div className="p-4" style={{ maxWidth: "1200px", margin: "auto" }}>
      <h3 style={{ color: "#6f42c1", fontWeight: "bold" }}>
        🧾 Factura del Pedido #{id}
      </h3>

      {/* Aquí renderizamos directamente la factura con datos reales */}
      <FacturaCard orderId={id} />
    </div>
  );
};

export default FacturaAdmin;
