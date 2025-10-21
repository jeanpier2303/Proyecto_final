import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import NavPrivate from "./components/NavPrivate";
import Home from "./pages/Home";
import HomePrivate from "./pages/HomePrivate";
import Login from "./pages/Login/Login";
import Register from "./pages/Registro/register";
import Inicio from "./pages/Inicio";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      {user ? <NavPrivate /> : <NavbarApp />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/Inicio" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Inicio" element={user ? <Inicio /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
