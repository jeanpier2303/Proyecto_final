/* import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const CategoryCard = ({ icon, title, description, delay, categoryId }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`col-md-6 col-lg-3 mb-4 fade-in ${inView ? "visible" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Link to={`/categoria/${categoryId}`} className="text-decoration-none">
        <div className="category-card text-center">
          <div className="category-icon">
            <i className={icon}></i>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

const Categories = () => {
  const categories = [
    {
      icon: "bi bi-cup-straw",
      title: "Jugos Clásicos",
      categoryId: "clasicos",
      description:
        "Sabores tradicionales con un toque especial Kahua. Frescura garantizada en cada botella.",
    },
    {
      icon: "bi bi-flower3",
      title: "Jugos Verdes",
      categoryId: "verdes",
      description:
        "Combinaciones detox llenas de nutrientes. Perfectos para empezar tu día con energía.",
    },
    {
      icon: "bi bi-brightness-alt-high",
      title: "Mezclas Tropicales",
      categoryId: "tropicales",
      description:
        "Explosión de sabores exóticos directamente desde los trópicos del Pacífico.",
    },
    {
      icon: "bi bi-lightning-charge",
      title: "Energizantes",
      categoryId: "energizantes",
      description:
        "Boosters naturales con superfoods para maximizar tu rendimiento físico y mental.",
    },
  ];

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>Nuestras Categorías</h2>
          <p>Descubre la variedad de sabores y beneficios que tenemos para ti</p>
        </div>
        <div className="row">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              categoryId={category.categoryId}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
 */


import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

// Importar imágenes de productos
import JugoNaranja from "../assets/images/Productos/Jugo_naranja.png";
import JugoLulo from "../assets/images/Productos/Jugo_lulo.png";
import JugoMangoMaracuya from "../assets/images/Productos/Jugo_Mango&Maracuyá.png";
import JugoBorojó from "../assets/images/Productos/Jugo_borojo.png";

const CategoryCard = ({ icon, title, description, delay, categoryId, product }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`col-md-6 col-lg-3 mb-4 fade-in ${inView ? "visible" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="category-card text-center h-100 d-flex flex-column">
        <div className="category-icon mb-3">
          <i className={icon}></i>
        </div>
        
        {/* Producto destacado */}
        {product && (
          <div className="category-product-highlight mb-3">
            <div className="product-image-container mx-auto mb-2">
              <img 
                src={product.imagen} 
                alt={product.nombre}
                className="category-product-image"
              />
              {product.oferta && (
                <span className="product-badge discount">-{product.descuento}%</span>
              )}
              {product.esNuevo && (
                <span className="product-badge new">Nuevo</span>
              )}
            </div>
            <h5 className="product-name">{product.nombre}</h5>
            <div className="product-price mb-2">
              {product.oferta ? (
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <span className="current-price">${product.precio.toLocaleString()}</span>
                  <span className="original-price">${product.precioOriginal.toLocaleString()}</span>
                </div>
              ) : (
                <span className="current-price">${product.precio.toLocaleString()}</span>
              )}
            </div>
          </div>
        )}

        <h3>{title}</h3>
        <p className="flex-grow-1">{description}</p>
        
        <Link to={`/categoria/${categoryId}`} className="btn btn-primary mt-auto">
          <i className="bi bi-arrow-right me-2"></i>
          Ver más productos
        </Link>
      </div>
    </div>
  );
};

const Categories = () => {
  // Productos destacados por categoría (uno por categoría)
  const featuredProducts = [
    {
      id: 1,
      nombre: "Jugo de Naranja Natural",
      precio: 7500,
      precioOriginal: 8500,
      categoria: "clasicos",
      imagen: JugoNaranja,
      oferta: true,
      descuento: 12,
      esNuevo: true
    },
    {
      id: 2,
      nombre: "Jugo Verde Lulo",
      precio: 12000,
      precioOriginal: 12000,
      categoria: "verdes",
      imagen: JugoLulo,
      oferta: false,
      descuento: 0,
      esNuevo: false
    },
    {
      id: 3,
      nombre: "Mezcla Tropical de Mango y Maracuyá",
      precio: 10500,
      precioOriginal: 12000,
      categoria: "tropicales",
      imagen: JugoMangoMaracuya,
      oferta: true,
      descuento: 13,
      esNuevo: true
    },
    {
      id: 4,
      nombre: "Jugo energizante de Borojó",
      precio: 12800,
      precioOriginal: 14500,
      categoria: "energizantes",
      imagen: JugoBorojó,
      oferta: true,
      descuento: 12,
      esNuevo: false
    }
  ];

  const categories = [
    {
      icon: "bi bi-cup-straw",
      title: "Jugos Clásicos",
      categoryId: "clasicos",
      description: "Sabores tradicionales con un toque especial Kahua. Frescura garantizada en cada botella.",
      product: featuredProducts.find(p => p.categoria === "clasicos")
    },
    {
      icon: "bi bi-flower3",
      title: "Jugos Verdes",
      categoryId: "verdes",
      description: "Combinaciones detox llenas de nutrientes. Perfectos para empezar tu día con energía.",
      product: featuredProducts.find(p => p.categoria === "verdes")
    },
    {
      icon: "bi bi-brightness-alt-high",
      title: "Mezclas Tropicales",
      categoryId: "tropicales",
      description: "Explosión de sabores exóticos directamente desde los trópicos del Pacífico.",
      product: featuredProducts.find(p => p.categoria === "tropicales")
    },
    {
      icon: "bi bi-lightning-charge",
      title: "Energizantes",
      categoryId: "energizantes",
      description: "Boosters naturales con superfoods para maximizar tu rendimiento físico y mental.",
      product: featuredProducts.find(p => p.categoria === "energizantes")
    },
  ];

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>Nuestras Categorías</h2>
          <p>Descubre la variedad de sabores y beneficios que tenemos para ti</p>
        </div>
        <div className="row">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              categoryId={category.categoryId}
              product={category.product}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;