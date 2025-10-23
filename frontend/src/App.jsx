import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import NavPrivate from "./components/NavPrivate";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/register";


function App() {

  return (
    <Router>
      {<NavbarApp />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
