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
            <Route path="/ProtectedRoute" element={<ProtectedRoute />} />
          </Routes>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
 */

/* import React from "react";
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
           
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

         
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

export default App; */

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
import VendedorPage from "./pages/VendedorPage"; /* ventas fisicas */
import Error404 from "./pages/Error404/Error404";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rutas públicas (sin autenticación) */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Home" element={<Home />} />

            {/* Rutas protegidas (requieren autenticación) */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendedor/*"
              element={
                <ProtectedRoute>
                  <VendedorPage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/Inicio"
              element={
                <ProtectedRoute>
                  <Inicio />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Ofertas"
              element={
                <ProtectedRoute>
                  <Ofertas />
                </ProtectedRoute>
              }
            />

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

            <Route
              path="/Productos"
              element={
                <ProtectedRoute>
                  <Productos />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Comunidad"
              element={
                <ProtectedRoute>
                  <Comunidad />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Soporte"
              element={
                <ProtectedRoute>
                  <Soporte />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Carrito"
              element={
                <ProtectedRoute>
                  <Carrito />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/categoria/:categoryId"
              element={
                <ProtectedRoute>
                  <CategoryProducts />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Error404 />} />

          </Routes>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;