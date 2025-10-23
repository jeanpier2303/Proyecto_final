import React, { useState } from "react";
import NavPrivate from "../../components/NavPrivate";
import Footer from "../../components/Footer";
import "../../assets/styles/Home.css";
import "../assets/styles/Productos.css";

const Productos = () => {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "todos", name: "Todos", icon: "bi-grid" },
    { id: "jugos", name: "Jugos", icon: "bi-cup" },
    { id: "frutas", name: "Frutas", icon: "bi-apple" },
    { id: "verduras", name: "Verduras", icon: "bi-flower1" },
    { id: "organicos", name: "Orgánicos", icon: "bi-leaf" }
  ];

  const products = [
    {
      id: 1,
      name: "Jugo de Mango Natural 1L",
      price: 15000,
      category: "jugos",
      image: "/assets/images/products/mango-juice.jpg",
      rating: 4.8,
      description: "Jugo 100% natural sin conservantes",
      inStock: true
    },
    {
      id: 2,
      name: "Piña Fresca Premium",
      price: 8000,
      category: "frutas",
      image: "/assets/images/products/pineapple.jpg",
      rating: 4.6,
      description: "Piña dulce y jugosa",
      inStock: true
    },
    {
      id: 3,
      name: "Jugo de Mora 500ml",
      price: 12000,
      category: "jugos",
      image: "/assets/images/products/blackberry-juice.jpg",
      rating: 4.9,
      description: "Rico en antioxidantes",
      inStock: false
    },
    {
      id: 4,
      name: "Banano Orgánico",
      price: 5000,
      category: "organicos",
      image: "/assets/images/products/banana.jpg",
      rating: 4.7,
      description: "Cultivado sin pesticidas",
      inStock: true
    },
    {
      id: 5,
      name: "Tomate Cherry",
      price: 6000,
      category: "verduras",
      image: "/assets/images/products/tomato.jpg",
      rating: 4.5,
      description: "Dulce y fresco",
      inStock: true
    },
    {
      id: 6,
      name: "Jugo de Naranja 1L",
      price: 13000,
      category: "jugos",
      image: "/assets/images/products/orange-juice.jpg",
      rating: 4.8,
      description: "Recién exprimido",
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "todos" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <NavPrivate />
      <main className="products-page">
        {/* Hero Section de Productos */}
        <section className="products-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Nuestros <span>Productos</span></h1>
              <p>Descubre la frescura y calidad de nuestros productos naturales</p>
              
              {/* Barra de búsqueda */}
              <div className="search-bar">
                <div className="input-group">
                  <i className="bi bi-search"></i>
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="categories-section">
          <div className="container">
            <div className="categories-filter">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <i className={category.icon}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de Productos */}
        <section className="products-grid-section">
          <div className="container">
            <div className="products-header">
              <h2>{filteredProducts.length} Productos Encontrados</h2>
              <div className="sort-options">
                <select className="form-select">
                  <option>Ordenar por: Popularidad</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                  <option>Mejor Calificados</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {!product.inStock && <div className="out-of-stock">Agotado</div>}
                    <div className="product-actions">
                      <button className="btn-wishlist">
                        <i className="bi bi-heart"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : ''}`}
                          ></i>
                        ))}
                        <span>({product.rating})</span>
                      </div>
                    </div>
                    
                    <div className="product-footer">
                      <div className="product-price">${product.price.toLocaleString()}</div>
                      <button 
                        className="btn btn-primary" 
                        disabled={!product.inStock}
                      >
                        <i className="bi bi-cart-plus"></i>
                        {product.inStock ? 'Añadir' : 'Agotado'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn next">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Productos;