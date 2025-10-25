import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRouteAdmin = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  // 🚫 Si no hay usuario o no tiene rol de administrador
  if (!user || user.role_id !== 4) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Si pasa la validación, muestra el contenido
  return children;
};

export default PrivateRouteAdmin;
