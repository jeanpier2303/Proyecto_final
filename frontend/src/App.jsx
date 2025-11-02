import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexto
import { AuthProvider } from "./contexts/AuthContext";

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
/* import Perfil from "./pages/Perfil/Perfil"; */
import CategoryProducts from "./components/CategoryProducts"; // Nueva página para productos por categoría
import Perfil from "./pages/Perfil/Perfil";
//import FacturaView from "./pages/Admin/Facturacion/FacturaView";
//import FacturaView from "./pages/Admin/Facturacion/FacturaView";



function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rutas principales */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Inicio />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas privadas o internas */}
            <Route path="/admin/*" element={<AdminDashboard />} />

            {/* Rutas del sitio principal */}
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Ofertas" element={<Ofertas />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Comunidad" element={<Comunidad />} />
            <Route path="/Soporte" element={<Soporte />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/Checkout" element={<Checkout />} />
            {/* <Route path="/OrderConfirmation" element={<OrderConfirmation />} /> */}
            {/* <Route path="/Perfil" element={<Perfil />} /> */}
            <Route path="/categoria/:categoryId" element={<CategoryProducts />} />
            {/* <Route path="/admin/factura/:id" element={<FacturaView />} /> */}
          </Routes>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
