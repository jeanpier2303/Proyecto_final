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
  );
}

export default App;
