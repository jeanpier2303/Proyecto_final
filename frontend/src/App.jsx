import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import Product from "./pages/";
import NavbarApp from "./components/NavbarApp";
import Product from "./pages/Product";

function App() {
  return (
    <Router>
      <NavbarApp />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
