import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Container, 
  Navbar, 
  Nav, 
  NavDropdown, 
  Badge
} from "react-bootstrap";
import LogoKahua from "../assets/images/categorias/Logo-Kahua.png";
import "../assets/styles/NavPrivate.css";
import Swal from "sweetalert2";

const NavPrivate = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Datos del usuario dv
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      const mockUser = {
        nombres: "dv",
        apellidos: "usuario",
        email: "dv@kahua.com",
        puntosKahua: 12,
        nivel: "Bronce"
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

    // Actualiza el número del carrito en tiempo real
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará y volverás al inicio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9C27B0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "No, mantenerme aquí"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has salido correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
        navigate("/Home"); 
      }
    });
  };

  const handleCartClick = () => {
    navigate("/carrito");
  };

/*   const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  }; */

  const getUserName = () => {
    if (!user) return "Usuario";
    return user.nombres || user.email || "dv";
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const names = user.nombres?.split(" ") || [];
    const lastnames = user.apellidos?.split(" ") || [];
    const firstInitial = names[0] ? names[0].charAt(0) : "";
    const lastInitial = lastnames[0] ? lastnames[0].charAt(0) : "";
    return (firstInitial + lastInitial).toUpperCase() || "DV";
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar 
      expand="lg" 
      className={`kahua-navbar-custom ${scrolled ? 'nav-scrolled' : ''}`}
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand 
          as={Link} 
          to="/inicio" 
          className="navbar-brand-custom"
        >
          <div className="brand-wrapper">
            <img
              src={LogoKahua}
              alt="Kahua Jugos"
              className="brand-logo-large"
            />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="navbar-toggler-custom"
        >
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto navbar-nav-custom">
            <Nav.Link 
              as={Link} 
              to="/inicio" 
              className={`nav-item-custom ${isActiveLink('/inicio') ? 'active' : ''}`}
            >
              <i className="bi bi-house-door nav-icon"></i>
              <span className="nav-label">Inicio</span>
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/productos" 
              className={`nav-item-custom ${isActiveLink('/productos') ? 'active' : ''}`}
            >
              <i className="bi bi-cup-straw nav-icon"></i>
              <span className="nav-label">Productos</span>
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/ofertas" 
              className={`nav-item-custom ${isActiveLink('/ofertas') ? 'active' : ''}`}
            >
              <i className="bi bi-lightning nav-icon"></i>
              <span className="nav-label">Ofertas</span>
              <Badge bg="danger" className="offer-badge">Nuevo</Badge>
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/comunidad" 
              className={`nav-item-custom ${isActiveLink('/comunidad') ? 'active' : ''}`}
            >
              <i className="bi bi-people nav-icon"></i>
              <span className="nav-label">Comunidad</span>
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/soporte" 
              className={`nav-item-custom ${isActiveLink('/soporte') ? 'active' : ''}`}
            >
              <i className="bi bi-headset nav-icon"></i>
              <span className="nav-label">Soporte</span>
            </Nav.Link>
          </Nav>

          <div className="navbar-actions">
            {/* Búsqueda Mejorada */}
{/*             <Form className="search-form-custom" onSubmit={handleSearch}>
              <InputGroup className="search-input-group">
                <Form.Control
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-improved"
                />
                <InputGroup.Text className="search-button-improved">
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
              </InputGroup>
            </Form> */}

            <button 
              className={`cart-button-custom ${isActiveLink('/carrito') ? 'active' : ''}`}
              onClick={handleCartClick}
              aria-label="Carrito de compras"
            >
              <div className="cart-icon-wrapper">
                <i className="bi bi-cart3 cart-icon"></i>
                {cartCount > 0 && (
                  <>
                    <Badge bg="warning" text="dark" className="cart-badge">
                      {cartCount}
                    </Badge>
                    <div className="cart-pulse"></div>
                  </>
                )}
              </div>
            </button>

            <NavDropdown 
              title={
                <div className="user-dropdown-trigger-improved">
                  <div className="user-avatar-improved">
                    {getUserInitials()}
                  </div>
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
                <div className="dropdown-avatar-improved">
                  {getUserInitials()}
                </div>
                <div className="dropdown-user-info-improved">
                  <div className="dropdown-name-improved">{getUserName()}</div>
                  <div className="dropdown-email-improved">{user?.email || "dv@kahua.com"}</div>
                </div>
              </div>

              <NavDropdown.Divider />

              <NavDropdown.Item as={Link} to="/perfil" className="dropdown-item-improved">
                <i className="bi bi-person"></i>
                <span>Mi Perfil</span>
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/pedidos" className="dropdown-item-improved">
                <i className="bi bi-box"></i>
                <span>Mis Pedidos</span>
                <Badge bg="primary" className="item-badge-improved">3</Badge>
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/favoritos" className="dropdown-item-improved">
                <i className="bi bi-heart"></i>
                <span>Favoritos</span>
                <Badge bg="danger" className="item-badge-improved">2</Badge>
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/configuracion" className="dropdown-item-improved">
                <i className="bi bi-gear"></i>
                <span>Configuración</span>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavPrivate;