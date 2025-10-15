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
  );
}

export default App;