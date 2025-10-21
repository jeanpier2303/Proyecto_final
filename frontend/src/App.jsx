import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavbarApp from "./components/NavbarApp";
import NavPrivate from "./components/NavPrivate";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"; 
import HomePrivate from "./pages/HomePrivate.jsx";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
    setLoading(false);

    // Escuchar cambios en el localStorage para actualizar autenticación
    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También verificar periódicamente (por si hay cambios en otra pestaña)
    const interval = setInterval(() => {
      const user = localStorage.getItem("user");
      if (!!user !== isAuthenticated) {
        setIsAuthenticated(!!user);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  // Función para actualizar estado de autenticación
  const updateAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  if (loading) {
    return (
      <div className="page-loader">
        <div className="loader-backdrop">
          <div className="loader-content">
            <div className="loader-logo">
              <div className="logo-circle">
                <div className="logo-inner"></div>
              </div>
            </div>
            <div className="loader-text">
              <h1 className="loader-title">
                <span className="letter">K</span>
                <span className="letter">A</span>
                <span className="letter">H</span>
                <span className="letter">U</span>
                <span className="letter">A</span>
              </h1>
              <p className="loader-subtitle">Cargando tu experiencia...</p>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: '100%' }}></div>
            </div>
            <div className="progress-text">Inicializando...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated ? <NavPrivate /> : <NavbarApp />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={<Login onLogin={updateAuthStatus} />} 
        />
        <Route 
          path="/register" 
          element={<Register onRegister={updateAuthStatus} />} 
        />
        <Route path="/dashboard" element={<HomePrivate />} />
      </Routes>
    </Router>
  );
}

export default App;