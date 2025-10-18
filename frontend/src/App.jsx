import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import NavbarApp from "./components/NavbarApp";
import Login from "./pages/Login/Login";
import RegisterFORM from "./pages/Registro/Register";

function App() {
  return (
    <Router>
      <NavbarApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterFORM />} />
      </Routes>
    </Router>
  );
}

export default App;
