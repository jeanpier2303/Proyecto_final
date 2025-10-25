import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../assets/styles/admin.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = ({ title = "Dashboard Principal" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      confirmButtonColor: "#9C27B0",
      cancelButtonText: "Cancelar",
    }).then((r) => {
      if (r.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <h2>{title}</h2>
        <p>Bienvenido de nuevo, {user?.first_name ?? "Admin"}</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <i className="fas fa-search" style={{position:"absolute", left:12, top:12, color:"var(--gray)"}}></i>
          <input placeholder="Buscar..." />
        </div>

        <div className="notification-btn">
          <i className="fas fa-bell"></i>
          <div className="badge">5</div>
        </div>

        <div className="user-profile" onClick={() => {}}>
          <div className="user-avatar">{(user?.first_name?.[0] ?? "A") + (user?.last_name?.[0] ?? "")}</div>
          <div>
            <div className="user-name">{user ? `${user.first_name} ${user.last_name}` : "Admin Kahua"}</div>
            <div className="user-role">{user ? (user.role_id === 4 ? "Administrador" : "Cliente") : "Administrador"}</div>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
