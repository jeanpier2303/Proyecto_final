import React, { useEffect, useState } from "react";
import { Bell, Clock3, ShoppingCart } from "lucide-react";

export default function VendedorHeader({ onNuevaVenta }) {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalo); // Limpieza al desmontar
  }, []);

  return (
    <header className="admin-header">
      <div className="header-left">
        <h2>Dashboard Vendedor</h2>
        <p>Gestiona tus ventas diarias</p>
      </div>

      <div className="header-right">
        <div className="notification-btn">
          <Bell />
          <span className="badge">3</span>
        </div>

        <div className="time-display">
          <Clock3 /> <span>{hora}</span>
        </div>

        <button className="btn btn-vendedor" onClick={onNuevaVenta}>
          <ShoppingCart /> Nueva Venta
        </button>
      </div>
    </header>
  );
}
