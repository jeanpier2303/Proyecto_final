import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import { Table, Form, Button, InputGroup, Modal } from "react-bootstrap";
import { Search, Trash2, Save } from "lucide-react";
import Swal from "sweetalert2";
import FacturaCard from "../../pages/Admin/Facturacion/FacturaCard";
import "../../assets/styles/vendedor.css";

export default function VendedorVenta() {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [itemsVenta, setItemsVenta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [facturaId, setFacturaId] = useState(null);
  const [mostrarFactura, setMostrarFactura] = useState(false);

  const vendedor_id = user?.id;

  useEffect(() => {
    axios.get(`${API_URL}/productos/`)
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  const productosFiltrados = productos.filter(p =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarProducto = (producto) => {
    const existe = itemsVenta.find(item => item.product_id === producto.id);
    if (existe) {
      Swal.fire("Ya agregado", "El producto ya está en la lista.", "warning");
      return;
    }

    setItemsVenta([...itemsVenta, {
      product_id: producto.id,
      name: producto.name,
      unit_price: producto.price,
      qty: 1,
      subtotal: producto.price
    }]);
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    setItemsVenta(prev =>
      prev.map(item =>
        item.product_id === id
          ? { ...item, qty: nuevaCantidad, subtotal: nuevaCantidad * item.unit_price }
          : item
      )
    );
  };

  const eliminarProducto = (id) => {
    setItemsVenta(prev => prev.filter(item => item.product_id !== id));
  };

  const totalVenta = itemsVenta.reduce((sum, item) => sum + item.subtotal, 0);

  const registrarVenta = async () => {
    if (itemsVenta.length === 0) {
      Swal.fire("Sin productos", "Agrega al menos un producto antes de registrar la venta.", "info");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        vendedor_id,
        status: "Pagado", // ✅ siempre pagado
        items: itemsVenta.map(i => ({
          product_id: i.product_id,
          qty: i.qty,
          unit_price: i.unit_price
        })),
        note: "Venta en tienda física (pagada)",
      };

      const res = await axios.post(`${API_URL}/seller/sales`, payload);
      const orderId = res.data.order_id;

      setItemsVenta([]);
      setBusqueda("");

      Swal.fire({
        title: "✅ Venta registrada",
        text: `La venta #${orderId} fue guardada correctamente.`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Descargar factura",
        cancelButtonText: "Cerrar",
      }).then((r) => {
        if (r.isConfirmed) {
          setFacturaId(orderId);
          setMostrarFactura(true);
        }
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo registrar la venta.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-area">
      <h3 className="mb-3 text-primary fw-bold">🧾 Nueva Venta (Tienda Física)</h3>

      {/* Buscador */}
      <InputGroup className="mb-3 shadow-sm rounded">
        <InputGroup.Text><Search size={18} /></InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </InputGroup>

      {/* Resultados */}
      {busqueda && (
        <div className="productos-lista mb-4">
          {productosFiltrados.slice(0, 6).map(p => (
            <div key={p.id} className="producto-item" onClick={() => agregarProducto(p)}>
              <div>
                <strong>{p.name}</strong>
                <p className="m-0 text-muted">${p.price.toLocaleString()}</p>
              </div>
              <Button size="sm" variant="outline-success">Agregar</Button>
            </div>
          ))}
          {productosFiltrados.length === 0 && <p className="text-muted">No se encontraron productos</p>}
        </div>
      )}

      {/* Tabla */}
      <Table bordered hover responsive className="table-vendedor">
        <thead className="table-light">
          <tr>
            <th>Producto</th>
            <th style={{ width: "120px" }}>Precio</th>
            <th style={{ width: "100px" }}>Cantidad</th>
            <th style={{ width: "140px" }}>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemsVenta.map(item => (
            <tr key={item.product_id}>
              <td>{item.name}</td>
              <td>${item.unit_price.toLocaleString()}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => actualizarCantidad(item.product_id, parseInt(e.target.value))}
                />
              </td>
              <td>${item.subtotal.toLocaleString()}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => eliminarProducto(item.product_id)}
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Total */}
      <div className="text-end mt-3">
        <h5 className="fw-bold">Total a pagar: ${totalVenta.toLocaleString()}</h5>
      </div>

      {/* Botón */}
      <div className="text-end mt-3">
        <Button
          className="btn-vendedor"
          onClick={registrarVenta}
          disabled={loading}
        >
          <Save size={18} className="me-1" /> {loading ? "Guardando..." : "Registrar y pagar"}
        </Button>
      </div>

      {/* Modal factura */}
      <Modal show={mostrarFactura} onHide={() => setMostrarFactura(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Factura de Venta #{facturaId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {facturaId && <FacturaCard orderId={facturaId} />}
        </Modal.Body>
      </Modal>
    </div>
  );
}
