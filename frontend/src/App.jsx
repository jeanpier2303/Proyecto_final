import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import NavPrivate from "./components/NavPrivate";
import Home from "./pages/Home";
import HomePrivate from "./pages/HomePrivate";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/register";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      {user ? <NavPrivate /> : <NavbarApp />}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas */}
        <Route path="/home" element={user ? <HomePrivate /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
