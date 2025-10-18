<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavbarApp from "./components/NavbarApp";
import Product from "./pages/Product";
import Login from "./pages/Login/Login";
import RegisterFORM from "./pages/Registro/Register";

function App() {
  return (
    <Router>
      <NavbarApp />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/components/NavbarApp" element={<NavbarApp />} />
          <Route path="/pages/Login/Login" element={<Login />} />
          <Route path="/pages/Registro/Register" element={<RegisterFORM />} />
        </Routes>
      </div>
    </Router>
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/User/Home";
import Tienda from "./pages/User/Tienda";
import Product from "./pages/User/Product";
/* import Login from "./pages/Login";
import Register from "./pages/Register"; */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/producto/:id" element={<Product />} />
       {/*  <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
>>>>>>> 42eb4246beed3ba7d6f23a1cadb647028d46c40d
  );
}

export default App;