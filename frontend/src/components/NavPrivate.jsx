import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoKahua from "../assets/Logo-Kahua.png";
import "../assets/styles/NavPrivate.css"; 

const NavPrivate = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("inicio");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Obtener usuario del localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Simular items en carrito (luego vendrá de tu estado global o API)
    setCartCount(3);

    // Establecer link activo basado en la ruta actual
    const path = location.pathname;
    if (path === "/") setActiveLink("inicio");
    else if (path === "/productos") setActiveLink("productos");
    else if (path === "/ofertas") setActiveLink("ofertas");
    else if (path === "/pedidos") setActiveLink("pedidos");
    else if (path === "/perfil") setActiveLink("perfil");

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Si usas tokens
    navigate("/");
    // No es necesario recargar la página con React
  };

  const toggleCart = () => {
    // Aquí puedes integrar tu contexto del carrito o modal
    console.log("Abrir carrito");
    // Ejemplo: setShowCart(true);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const closeUserMenu = () => {
    setShowUserMenu(false);
  };

  // Obtener iniciales del usuario
  const getUserInitials = () => {
    if (!user) return "U";
    const names = user.nombres?.split(" ") || [];
    const lastnames = user.apellidos?.split(" ") || [];
    
    const firstInitial = names[0] ? names[0].charAt(0) : "";
    const lastInitial = lastnames[0] ? lastnames[0].charAt(0) : "";
    
    return (firstInitial + lastInitial).toUpperCase();
  };

  const getUserName = () => {
    if (!user) return "Usuario";
    return user.nombres || user.email || "Usuario";
  };

  return (
    <nav className={`kahua-nav-private ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link 
          className="nav-logo" 
          to="/"
          onClick={() => setActiveLink("inicio")}
        >
          <div className="logo-wrapper">
            <img
              src={LogoKahua}
              alt="Kahua Jugos"
              className="logo-image"
            />
          </div>
        </Link>

        {/* Navegación central */}
        <div className="nav-center">
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${activeLink === "inicio" ? "active" : ""}`}
                onClick={() => setActiveLink("inicio")}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                to="/productos" 
                className={`nav-link ${activeLink === "productos" ? "active" : ""}`}
                onClick={() => setActiveLink("productos")}
              >
                Productos
              </Link>
            </li>
            <li>
              <Link 
                to="/ofertas" 
                className={`nav-link ${activeLink === "ofertas" ? "active" : ""}`}
                onClick={() => setActiveLink("ofertas")}
              >
                Ofertas
              </Link>
            </li>
            <li>
              <Link 
                to="/pedidos" 
                className={`nav-link ${activeLink === "pedidos" ? "active" : ""}`}
                onClick={() => setActiveLink("pedidos")}
              >
                Mis Pedidos
              </Link>
            </li>
            <li>
              <Link 
                to="/perfil" 
                className={`nav-link ${activeLink === "perfil" ? "active" : ""}`}
                onClick={() => setActiveLink("perfil")}
              >
                Mi Perfil
              </Link>
            </li>
          </ul>
        </div>

        {/* Acciones del usuario */}
        <div className="nav-actions">
          {/* Búsqueda */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className="search-input"
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Carrito */}
          <button className="cart-button" onClick={toggleCart}>
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>

          {/* Menú de usuario */}
          <div className="user-container">
            <button 
              className="user-button"
              onClick={toggleUserMenu}
              onBlur={closeUserMenu}
            >
              <div className="user-info">
                <span className="user-greeting">Hola,</span>
                <span className="user-name">{getUserName()}</span>
              </div>
              <div className="user-avatar">
                {getUserInitials()}
              </div>
            </button>

            {/* Menú desplegable */}
            {showUserMenu && (
              <div className="user-dropdown">
                <Link 
                  to="/perfil" 
                  className="dropdown-item"
                  onClick={closeUserMenu}
                >
                  <i className="fas fa-user"></i>
                  <span>Mi Perfil</span>
                </Link>
                <Link 
                  to="/pedidos" 
                  className="dropdown-item"
                  onClick={closeUserMenu}
                >
                  <i className="fas fa-shopping-bag"></i>
                  <span>Mis Pedidos</span>
                </Link>
                <Link 
                  to="/favoritos" 
                  className="dropdown-item"
                  onClick={closeUserMenu}
                >
                  <i className="fas fa-heart"></i>
                  <span>Favoritos</span>
                </Link>
                <Link 
                  to="/configuracion" 
                  className="dropdown-item"
                  onClick={closeUserMenu}
                >
                  <i className="fas fa-cog"></i>
                  <span>Configuración</span>
                </Link>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item logout-button"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavPrivate;