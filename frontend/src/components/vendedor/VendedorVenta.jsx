import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Button, Form, Table, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../assets/styles/vendedor.css";

const VendedorVenta = ({ vendedor }) => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);

  // Cargar productos
  useEffect(() => {
    axios.get(`${API_URL}/api/productos/`)
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Filtrar productos
  const filtrados = productos.filter(p =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarProducto = (producto) => {
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(p =>
        p.id === producto.id ? { ...p, qty: p.qty + 1 } : p
      ));
    } else {
      setCarrito([...carrito, { ...producto, qty: 1 }]);
    }
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(carrito.map(p =>
      p.id === id
        ? { ...p, qty: Math.max(1, p.qty + delta) }
        : p
    ));
  };

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter(p => p.id !== id));
  };

  const subtotal = carrito.reduce((acc, p) => acc + p.qty * p.price, 0);

  const registrarVenta = async () => {
    if (carrito.length === 0) {
      Swal.fire("Sin productos", "Agrega productos antes de registrar la venta", "warning");
      return;
    }

    try {
      const payload = {
        vendedor_id: vendedor.id,
        items: carrito.map(p => ({
          product_id: p.id,
          qty: p.qty,
          unit_price: p.price
        })),
        note: "Venta realizada desde el panel del vendedor"
      };

      const res = await axios.post(`${API_URL}/api/seller/orders`, payload);
      Swal.fire("Venta registrada", `Venta #${res.data.order_id} por $${res.data.total.toLocaleString()}`, "success");
      setCarrito([]);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo registrar la venta", "error");
    }
  };

  return (
    <div className="content-area">
      <h2 className="mb-4">Punto de Venta</h2>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </InputGroup>

      <div className="productos-grid mb-4">
        {filtrados.map(p => (
          <div key={p.id} className="producto-card" onClick={() => agregarProducto(p)}>
            <img src={p.image_url || "/placeholder.png"} alt={p.name} />
            <div className="producto-info">
              <h6>{p.name}</h6>
              <p>${p.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <h4>Carrito</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>
                <Button size="sm" onClick={() => cambiarCantidad(p.id, -1)}>-</Button>{" "}
                {p.qty}{" "}
                <Button size="sm" onClick={() => cambiarCantidad(p.id, 1)}>+</Button>
              </td>
              <td>${p.price.toLocaleString()}</td>
              <td>${(p.qty * p.price).toLocaleString()}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => eliminarProducto(p.id)}>
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end">
        <h5>Total: ${subtotal.toLocaleString()}</h5>
        <Button variant="success" onClick={registrarVenta}>Registrar Venta</Button>
      </div>
    </div>
  );
};

export default VendedorVenta;
