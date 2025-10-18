import React from "react";
import "../assets/styles/Tienda.css"; // ✅ Ruta corregida
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const productos = [
  {
    id: 1,
    nombre: "Cola Artesanal",
    categoria: "Gaseosas",
    descripcion: "Sabor clásico con toque cítrico",
    precio: 4.5,
    imagen: "https://images.unsplash.com/photo-1604908177522-1b17e4b0c8b9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    nombre: "Jugo Tropical",
    categoria: "Jugos",
    descripcion: "100% fruta, sin azúcares añadidos",
    precio: 3.0,
    imagen: "https://images.unsplash.com/photo-1542444459-db2a3a5c3b6a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    nombre: "Energética X",
    categoria: "Energéticas",
    descripcion: "Rendimiento y sabor",
    precio: 5.0,
    imagen: "https://images.unsplash.com/photo-1604147706289-9e3b7b8a0b3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    nombre: "Agua Premium",
    categoria: "Aguas",
    descripcion: "Purificada y mineralizada",
    precio: 2.0,
    imagen: "https://images.unsplash.com/photo-1508747703725-719a3d14c2f6?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Tienda() {
  return (
    <div className="tienda">
      <header className="header">
        <Container className="header-inner">
          <div className="logo">BEBIDAS<span>Pro</span></div>
          <div className="header-right">
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              className="top-search"
            />
            <Button variant="light" className="mini-cart">🛒 0 - $0.00</Button>
          </div>
        </Container>
      </header>

      <main className="container">
        <nav className="breadcrumb">Inicio / Tienda / <strong>Todos los productos</strong></nav>

        <section className="catalog">
          <aside className="filters">
            <h4>Filtros</h4>

            <div className="filter-group">
              <label className="muted">Categoría</label>
              <div className="checkbox"><input type="checkbox" /> <label>Gaseosas</label></div>
              <div className="checkbox"><input type="checkbox" /> <label>Jugos</label></div>
              <div className="checkbox"><input type="checkbox" /> <label>Tés</label></div>
            </div>

            <div className="filter-group">
              <label className="muted">Precio</label>
              <div className="range-row">
                <input type="number" placeholder="Min" />
                <input type="number" placeholder="Max" />
              </div>
            </div>
          </aside>

          <section className="main-catalog">
            <div className="topbar">
              <div className="left">
                <div id="resultsCount">{productos.length} productos</div>
              </div>
            </div>

            <div className="grid">
              {productos.map((p) => (
                <article key={p.id} className="card">
                  <div className="card-media">
                    <img src={p.imagen} alt={p.nombre} />
                  </div>
                  <div className="card-body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong>{p.nombre}</strong>
                      <div className="badge">{p.categoria}</div>
                    </div>
                    <div className="muted" style={{ fontSize: "13px" }}>{p.descripcion}</div>
                    <div className="price">${p.precio.toFixed(2)}</div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                      <button className="btn">Ver</button>
                      <button className="btn btn-primary">Añadir</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>

      <footer className="site-footer">
        <Container className="footer-inner">
          <div>© <strong>BebidasPro</strong> 2025</div>
          <div className="muted">Términos • Privacidad • Contacto</div>
        </Container>
      </footer>
    </div>
  );
}
