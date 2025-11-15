import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../assets/styles/admin.css";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { NavDropdown, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const HeaderAdmin = ({ title = "Dashboard Principal" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará y volverás al inicio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9C27B0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has salido correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/login");
      }
    });
  };

  const getUserName = () => {
    if (!user) return "Administrador";
    return `${user.first_name ?? "Admin"} ${user.last_name ?? ""}`;
  };

  const getUserInitials = () => {
    if (!user) return "AD";
    const first = user.first_name?.charAt(0) ?? "A";
    const last = user.last_name?.charAt(0) ?? "D";
    return (first + last).toUpperCase();
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <h2>{title}</h2>
        <p>Bienvenido de nuevo, {getUserName()}</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <i
            className="fas fa-search"
            style={{ position: "absolute", left: 12, top: 12, color: "var(--gray)" }}
          ></i>
          <input placeholder="Buscar..." />
        </div>

        {/* <div className="notification-btn">
          <i className="fas fa-bell"></i>
          <div className="badge">5</div>
        </div> */}

        {/* === Menú de Usuario estilo NavPrivate === */}
        <NavDropdown
          title={
            <div className="user-dropdown-trigger-improved">
              <div className="user-avatar-improved">{getUserInitials()}</div>
              <div className="user-info-improved">
                <div className="user-greeting-improved">Hola,</div>
                <div className="user-name-improved">{getUserName()}</div>
              </div>
              <i className="bi bi-chevron-down dropdown-arrow-improved"></i>
            </div>
          }
          id="user-dropdown"
          align="end"
          className="user-dropdown-custom-improved"
        >
          <div className="dropdown-header-improved">
            <div className="dropdown-avatar-improved">{getUserInitials()}</div>
            <div className="dropdown-user-info-improved">
              <div className="dropdown-name-improved">{getUserName()}</div>
              <div className="dropdown-email-improved">
                {user?.email ?? "admin@kahua.com"}
              </div>
            </div>
          </div>

          <NavDropdown.Divider />

          <NavDropdown.Item as={Link} to="/admin/perfil" className="dropdown-item-improved">
            <i className="bi bi-person"></i>
            <span>Mi Perfil</span>
          </NavDropdown.Item>

          <NavDropdown.Item as={Link} to="/admin/configuracion" className="dropdown-item-improved">
            <i className="bi bi-gear"></i>
            <span>Configuración</span>
          </NavDropdown.Item>

          <NavDropdown.Item as={Link} to="/admin/notificaciones" className="dropdown-item-improved">
            <i className="bi bi-bell"></i>
            <span>Notificaciones</span>
            <Badge bg="danger" className="item-badge-improved">5</Badge>
          </NavDropdown.Item>

          <NavDropdown.Divider />

          <NavDropdown.Item
            onClick={handleLogout}
            className="dropdown-item-improved logout-item-improved"
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Cerrar Sesión</span>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </header>
  );
};

export default HeaderAdmin;
