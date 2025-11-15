import React from "react";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../assets/styles/delivery-header.css";
import log from "../../assets/images/categorias/Logo-blanc.png"

function DeliveryHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = () => {
    const f = user?.first_name?.[0] ?? "U";
    const l = user?.last_name?.[0] ?? "S";
    return (f + l).toUpperCase();
  };

  const fullName = `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9C27B0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir",
    }).then((res) => {
      if (res.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  return (
    <Navbar className="delivery-header" expand="lg">
      <Container className="d-flex justify-content-between align-items-center">

        {/* IZQUIERDA */}
        <div className="d-flex align-items-center gap-3">
          <img src={log} alt="logo" className="delivery-logo" />
          <h4 className="delivery-title">Panel de Repartidor</h4>
        </div>

        {/* DERECHA */}
        <div className="delivery-right">
          <NavDropdown
            align="end"
            title={
              <div className="delivery-user-trigger">
                <div className="delivery-avatar">{getInitials()}</div>
                <span className="delivery-name">{fullName}</span>
                <i className="bi bi-chevron-down"></i>
              </div>
            }
            className="delivery-user-dropdown"
            id="dropdown-repartidor"
          >
            <div className="dropdown-user-header">
              <strong>{fullName}</strong>
              <br />
              <small>{user?.email}</small>
            </div>

            <NavDropdown.Divider />

            <NavDropdown.Item onClick={handleLogout} className="logout-item">
              <i className="bi bi-box-arrow-right"></i> Cerrar sesión
            </NavDropdown.Item>
          </NavDropdown>
        </div>

      </Container>
    </Navbar>
  );
}

export default DeliveryHeader;

