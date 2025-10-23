import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavbarApp from "./components/NavbarApp";
import Login from "./pages/Login/Login";
import RegisterFORM from "./pages/Registro/Register";

function App() {
  return (
    <Router>
      <NavbarApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterFORM />} />
      </Routes>
    </Router>
  );
}

export default App;
