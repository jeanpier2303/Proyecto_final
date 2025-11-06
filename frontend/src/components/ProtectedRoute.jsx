import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // Evitar redirección múltiple
      if (window.location.pathname !== '/login') {
        Swal.fire({
          icon: "warning",
          title: "Acceso denegado",
          text: "Debes iniciar sesión para acceder a esta sección.",
          confirmButtonText: "Entendido",
        }).then(() => {
          navigate("/login", { replace: true });
        });
      }
    }
  }, [user, loading, navigate]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no hay usuario después de loading, no renderizar
  if (!user) {
    return null;
  }

  // Usuario autenticado - renderizar contenido
  return children;
};

export default ProtectedRoute;