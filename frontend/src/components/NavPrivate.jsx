/* // components/NavPrivate.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import './NavPrivate.css';

const NavPrivate = ({ user, cartCount, toggleCart }) => {
  const [_isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="sales-header">
      <div className="container">
        <div className="nav-container">
          <div className="logo-brand">
            <Link to="/" className="logo-fallback">
              Kahua
            </Link>
          </div>

          <nav className="sales-nav">
            <ul>
              <li><Link to="/" className="nav-link">Inicio</Link></li>
              <li><Link to="/productos" className="nav-link">Productos</Link></li>
              <li><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
              <li><Link to="/contacto" className="nav-link">Contacto</Link></li>
            </ul>
          </nav>

        <button className="cart-toggle" onClick={toggleCart}>🛒
        <span className="cart-count">{cartCount}</span>
        </button>

          <div className="header-actions">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearch}
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="user-menu">
              <div className="user-info">
                <span className="user-name">Hola, {user.displayName || user.email}</span>
                <span className="user-role">Cliente Premium</span>
              </div>
              <div className="user-avatar">
                {(user.displayName || user.email).charAt(0).toUpperCase()}
              </div>
            </div>

            <button className="cart-toggle" onClick={() => setIsCartOpen(true)}>
              🛒
              <span className="cart-count">0</span>
            </button>

            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavPrivate;
 */