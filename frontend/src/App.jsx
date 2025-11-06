/* import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";



import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Inicio from "./pages/Inicio"; 
import Ofertas from "./pages/Ofertas";
import Productos from "./pages/Productos";
import Comunidad from "./pages/Comunidad/Comunidad";
import Soporte from "./pages/Soporte";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import CategoryProducts from "./components/CategoryProducts"; 
import Perfil from "./pages/Perfil/Perfil";
import Pedidos from "./pages/Perfil/Pedidos";


function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Ofertas" element={<Ofertas />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Pedidos" element={<Pedidos />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Comunidad" element={<Comunidad />} />
            <Route path="/Soporte" element={<Soporte />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/categoria/:categoryId" element={<CategoryProducts />} />
          </Routes>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexto
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; 

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Inicio from "./pages/Inicio"; 
import Ofertas from "./pages/Ofertas";
import Productos from "./pages/Productos";
import Comunidad from "./pages/Comunidad/Comunidad";
import Soporte from "./pages/Soporte";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import CategoryProducts from "./components/CategoryProducts"; 
import Perfil from "./pages/Perfil/Perfil";
import Pedidos from "./pages/Perfil/Pedidos";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rutas principales */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas privadas o internas */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Rutas del sitio principal */}
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Ofertas" element={<Ofertas />} />
            <Route
              path="/Perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Pedidos"
              element={
                <ProtectedRoute>
                  <Pedidos />
                </ProtectedRoute>
              }
            />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Comunidad" element={<Comunidad />} />
            <Route path="/Soporte" element={<Soporte />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/categoria/:categoryId" element={<CategoryProducts />} />
          </Routes>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;