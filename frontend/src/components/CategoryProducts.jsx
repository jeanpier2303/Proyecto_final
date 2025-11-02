import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup, Pagination, Modal, Badge, Alert } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavbarApp from "../components/NavbarApp";
import Footer from "../components/Footer";
import "../assets/styles/CategoryProducts.css";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const productsPerPage = 6;

  // Datos de ejemplo para productos (mismos que en Productos.jsx)
 const productos = [
    {
      id: 1,
      nombre: "Jugo de Naranja Natural",
      precio: 7500,
      precioOriginal: 8500,
      categoria: "clasicos",
      imagen: "/images/productos/naranja.jpg",
      descripcion: "Jugo de naranja recién exprimido, lleno de vitamina C y energía natural para empezar tu día.",
      oferta: true,
      descuento: 12,
      stock: 18,
      ingredientes: ["Naranjas frescas", "Hielo"],
      rating: 4.8,
      reviews: 124,
      tiempoPreparacion: "5 min",
      esNuevo: true
    },
    {
      id: 2,
      nombre: "Jugo Verde Detox",
      precio: 12000,
      precioOriginal: 12000,
      categoria: "verdes",
      imagen: "/images/productos/verde-detox.jpg",
      descripcion: "Mezcla revitalizante de espinaca, piña, pepino y jengibre para limpiar tu cuerpo naturalmente.",
      oferta: false,
      descuento: 0,
      stock: 12,
      ingredientes: ["Espinaca fresca", "Piña", "Pepino", "Jengibre", "Limón"],
      rating: 4.9,
      reviews: 89,
      tiempoPreparacion: "7 min",
      esNuevo: false
    },
    {
      id: 3,
      nombre: "Batido Tropical de Mango y Maracuyá",
      precio: 10500,
      precioOriginal: 12000,
      categoria: "tropicales",
      imagen: "/images/productos/tropical-mango.jpg",
      descripcion: "Explosión tropical de mango dulce y maracuyá ácido en un batido cremoso y refrescante.",
      oferta: true,
      descuento: 13,
      stock: 10,
      ingredientes: ["Mango maduro", "Maracuyá", "Leche de coco", "Hielo"],
      rating: 4.7,
      reviews: 156,
      tiempoPreparacion: "6 min",
      esNuevo: true
    },
    {
      id: 4,
      nombre: "Energizante Natural de Guaraná",
      precio: 12800,
      precioOriginal: 14500,
      categoria: "energizantes",
      imagen: "/images/productos/energizante-guarana.jpg",
      descripcion: "Potente combinación de guaraná, maca y jengibre para energía natural sin cafeína.",
      oferta: true,
      descuento: 12,
      stock: 8,
      ingredientes: ["Guaraná natural", "Maca", "Jengibre", "Miel", "Agua de coco"],
      rating: 4.6,
      reviews: 67,
      tiempoPreparacion: "8 min",
      esNuevo: false
    },
    {
      id: 5,
      nombre: "Jugo Clásico de Manzana",
      precio: 6800,
      precioOriginal: 6800,
      categoria: "clasicos",
      imagen: "/images/productos/manzana.jpg",
      descripcion: "Jugo dulce y refrescante de manzana roja, perfecto para cualquier momento del día.",
      oferta: false,
      descuento: 0,
      stock: 20,
      ingredientes: ["Manzanas rojas", "Hielo", "Canela opcional"],
      rating: 4.5,
      reviews: 98,
      tiempoPreparacion: "4 min",
      esNuevo: false
    },
    {
      id: 6,
      nombre: "Green Power con Espirulina",
      precio: 13500,
      precioOriginal: 15000,
      categoria: "verdes",
      imagen: "/images/productos/green-power.jpg",
      descripcion: "Super jugo verde con espirulina, kale, piña y limón para carga máxima de nutrientes.",
      oferta: true,
      descuento: 10,
      stock: 6,
      ingredientes: ["Kale", "Espirulina", "Piña", "Limón", "Manzana verde"],
      rating: 4.9,
      reviews: 45,
      tiempoPreparacion: "7 min",
      esNuevo: true
    },
    {
      id: 7,
      nombre: "Sunset Tropical",
      precio: 11200,
      precioOriginal: 11200,
      categoria: "tropicales",
      imagen: "/images/productos/sunset-tropical.jpg",
      descripcion: "Mezcla exótica de papaya, fresa y coco que evoca atardeceres en la playa.",
      oferta: false,
      descuento: 0,
      stock: 9,
      ingredientes: ["Papaya", "Fresa", "Coco fresco", "Jugo de naranja"],
      rating: 4.8,
      reviews: 112,
      tiempoPreparacion: "6 min",
      esNuevo: false
    },
    {
      id: 8,
      nombre: "Power Boost con Ginseng",
      precio: 14200,
      precioOriginal: 16000,
      categoria: "energizantes",
      imagen: "/images/productos/power-boost.jpg",
      descripcion: "Combinación potente de ginseng, jengibre y cítricos para máximo rendimiento físico y mental.",
      oferta: true,
      descuento: 11,
      stock: 7,
      ingredientes: ["Ginseng natural", "Jengibre", "Naranja", "Limón", "Miel"],
      rating: 4.7,
      reviews: 78,
      tiempoPreparacion: "8 min",
      esNuevo: false
    },
    {
      id: 9,
      nombre: "Jugo de Zanahoria y Naranja",
      precio: 8200,
      precioOriginal: 9200,
      categoria: "clasicos",
      imagen: "/images/productos/zanahoria-naranja.jpg",
      descripcion: "Clásica combinación de zanahoria dulce y naranja cítrica, rica en betacaroteno.",
      oferta: true,
      descuento: 11,
      stock: 14,
      ingredientes: ["Zanahoria fresca", "Naranja", "Jengibre"],
      rating: 4.6,
      reviews: 134,
      tiempoPreparacion: "5 min",
      esNuevo: false
    },
    {
      id: 10,
      nombre: "Detox Verde Profundo",
      precio: 12500,
      precioOriginal: 12500,
      categoria: "verdes",
      imagen: "/images/productos/detox-verde.jpg",
      descripcion: "Jugo detox profundo con diente de león, pepino, manzana verde y limón para limpieza hepática.",
      oferta: false,
      descuento: 0,
      stock: 5,
      ingredientes: ["Diente de león", "Pepino", "Manzana verde", "Limón", "Menta"],
      rating: 4.9,
      reviews: 56,
      tiempoPreparacion: "7 min",
      esNuevo: true
    },
    {
      id: 11,
      nombre: "Piña Colada Sin Alcohol",
      precio: 9800,
      precioOriginal: 11500,
      categoria: "tropicales",
      imagen: "/images/productos/pina-colada.jpg",
      descripcion: "Versión saludable de la clásica piña colada, con coco cremoso y piña dulce sin azúcar añadido.",
      oferta: true,
      descuento: 15,
      stock: 11,
      ingredientes: ["Piña madura", "Leche de coco", "Hielo", "Esencia de vainilla"],
      rating: 4.8,
      reviews: 203,
      tiempoPreparacion: "5 min",
      esNuevo: false
    },
    {
      id: 12,
      nombre: "Focus Mind Elixir",
      precio: 13800,
      precioOriginal: 15500,
      categoria: "energizantes",
      imagen: "/images/productos/focus-mind.jpg",
      descripcion: "Elixir mental con romero, blueberries y té verde para claridad y concentración máxima.",
      oferta: true,
      descuento: 11,
      stock: 8,
      ingredientes: ["Blueberries", "Romero", "Té verde", "Miel", "Limón"],
      rating: 4.7,
      reviews: 89,
      tiempoPreparacion: "8 min",
      esNuevo: true
    }
  ];

  const categorias = [
    { id: "clasicos", nombre: "Jugos Clásicos", icon: "bi bi-cup-fill" },
    { id: "verdes", nombre: "Jugos Verdes", icon: "bi bi-droplet-fill" },
    { id: "tropicales", nombre: "Mezclas Tropicales", icon: "bi bi-tropical-storm" },
    { id: "energizantes", nombre: "Energizantes", icon: "bi bi-lightning-fill" }
  ];

  // Obtener información de la categoría actual
  const currentCategory = categorias.find(cat => cat.id === categoryId) || { nombre: "Productos" };

  // Filtrar productos según búsqueda y categoría
  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.ingredientes.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = producto.categoria === categoryId;
    const matchesPrice = producto.precio >= priceRange[0] && producto.precio <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Ordenar productos
  const sortedProductos = [...filteredProductos].sort((a, b) => {
    if (sortBy === "nombre") {
      return a.nombre.localeCompare(b.nombre);
    } else if (sortBy === "precio-asc") {
      return a.precio - b.precio;
    } else if (sortBy === "precio-desc") {
      return b.precio - a.precio;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "nuevos") {
      return b.esNuevo - a.esNuevo;
    }
    return 0;
  });

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProductos.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProductos.length / productsPerPage);

  // Función para agregar al carrito (requiere login)
  const handleAddToCart = (producto) => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = localStorage.getItem('authToken'); // O tu método de verificación
    
    if (!isAuthenticated) {
      setSelectedProduct(producto);
      setShowLoginModal(true);
      return;
    }
    
    // Si está autenticado, proceder con la lógica normal de agregar al carrito
    const cartItem = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      precioOriginal: producto.precioOriginal,
      imagen: producto.imagen,
      categoria: producto.categoria,
      cantidad: 1,
      maxStock: producto.stock,
      oferta: producto.oferta,
      descuento: producto.descuento
    };

    // Obtener carrito actual del localStorage
    const currentCart = JSON.parse(localStorage.getItem('kahuaCart') || '[]');
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = currentCart.findIndex(item => item.id === producto.id);
    
    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      currentCart[existingItemIndex].cantidad += 1;
      if (currentCart[existingItemIndex].cantidad > producto.stock) {
        currentCart[existingItemIndex].cantidad = producto.stock;
        alert(`Solo tenemos ${producto.stock} unidades disponibles de ${producto.nombre}`);
      }
    } else {
      // Agregar nuevo item
      currentCart.push(cartItem);
    }

    // Guardar en localStorage
    localStorage.setItem('kahuaCart', JSON.stringify(currentCart));
    
    // Mostrar mensaje de éxito
    alert(`¡${producto.nombre} agregado al carrito!`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setSelectedProduct(null);
  };

  const handleLoginRedirect = () => {
    handleCloseModal();
    navigate('/login');
  };

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, priceRange, categoryId]);

  // Generar paginación
  const renderPagination = () => {
    let items = [];
    
    // Botón anterior
    items.push(
      <Pagination.Prev 
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Páginas
    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Botón siguiente
    items.push(
      <Pagination.Next 
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  // Renderizar estrellas de rating
  const renderRating = (rating) => {
    return (
      <div className="product-rating">
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <i 
              key={star}
              className={`bi ${star <= rating ? 'bi-star-fill' : 'bi-star'}${star > rating && star - rating < 1 ? 'bi-star-half' : ''}`}
            ></i>
          ))}
        </div>
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  return (
    <>
      <NavbarApp />
      
      <section className="category-products-page">
        {/* Hero Section de Categoría */}
        <div className="category-hero">
          <Container>
            <div className="hero-content text-center">
              <div className="category-icon mb-3">
                <i className={currentCategory.icon}></i>
              </div>
              <h1 className="hero-title">
                {currentCategory.nombre}
              </h1>
              <p className="hero-subtitle">
                Descubre nuestra selección especial de {currentCategory.nombre.toLowerCase()}. 
                Productos frescos y naturales preparados al momento.
              </p>
              <div className="category-stats">
                <div className="stat-item">
                  <i className="bi bi-grid-3x3-gap-fill"></i>
                  <span>{filteredProductos.length} Productos</span>
                </div>
                <div className="stat-item">
                  <i className="bi bi-star-fill"></i>
                  <span>4.8/5 Rating Promedio</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container className="products-container">
          {/* Barra de herramientas */}
          <div className="products-toolbar">
            <Row className="align-items-center">
              <Col md={6}>
                <div className="toolbar-left">
                  <h5 className="toolbar-title">
                    {currentCategory.nombre}
                    <Badge bg="primary" className="ms-2">{filteredProductos.length}</Badge>
                  </h5>
                  <p className="toolbar-subtitle text-muted mb-0">
                    Explora nuestra selección especial
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="toolbar-right d-flex justify-content-md-end gap-3">
                  {/* Selector de vista */}
                  <div className="view-toggle">
                    <Button
                      variant={viewMode === "grid" ? "primary" : "outline-secondary"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="view-btn"
                    >
                      <i className="bi bi-grid-3x3-gap"></i>
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "primary" : "outline-secondary"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="view-btn"
                    >
                      <i className="bi bi-list"></i>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <Row>
            {/* Contenido Principal */}
            <Col lg={12}>
              {/* Barra de filtros */}
              <Card className="filters-bar mb-4">
                <Card.Body className="py-2">
                  <Row className="align-items-center">
                    <Col md={6}>
                      <div className="search-container">
                        <InputGroup size="sm">
                          <InputGroup.Text>
                            <i className="bi bi-search"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder={`Buscar en ${currentCategory.nombre.toLowerCase()}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md={6}>
                      <Form.Select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        size="sm"
                      >
                        <option value="nombre">Ordenar por nombre</option>
                        <option value="precio-asc">Precio: Menor a Mayor</option>
                        <option value="precio-desc">Precio: Mayor a Menor</option>
                        <option value="rating">Mejor valorados</option>
                        <option value="nuevos">Más nuevos</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Información de resultados */}
              <div className="results-info mb-3">
                <Row className="align-items-center">
                  <Col>
                    <p className="mb-0">
                      Mostrando <strong>{Math.min(indexOfFirstProduct + 1, filteredProductos.length)}-{Math.min(indexOfLastProduct, filteredProductos.length)}</strong> de <strong>{filteredProductos.length}</strong> productos
                    </p>
                  </Col>
                  <Col className="text-end">
                    <small className="text-muted">
                      Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
                    </small>
                  </Col>
                </Row>
              </div>

              {/* Estado de resultados vacíos */}
              {filteredProductos.length === 0 ? (
                <Card className="no-products-card">
                  <Card.Body className="text-center py-5">
                    <i className="bi bi-search-heart no-products-icon"></i>
                    <h5 className="no-products-title">No se encontraron productos</h5>
                    <p className="no-products-text mb-3">
                      Intenta ajustar tus filtros o términos de búsqueda
                    </p>
                    <Button 
                      variant="outline-primary"
                      onClick={() => {
                        setSearchTerm("");
                        setPriceRange([0, 20000]);
                      }}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Restablecer filtros
                    </Button>
                  </Card.Body>
                </Card>
              ) : (
                <>
                  {/* Grid de Productos */}
                  <Row className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                    {currentProducts.map((producto) => (
                      <Col 
                        key={producto.id} 
                        xs={12} 
                        sm={viewMode === 'list' ? 12 : 6} 
                        lg={viewMode === 'list' ? 12 : 4} 
                        className="mb-4"
                      >
                        <Card className={`producto-card h-100 ${viewMode === 'list' ? 'list-card' : ''}`}>
                          <div className="producto-img-container">
                            <Card.Img 
                              variant="top" 
                              src={producto.imagen} 
                              alt={producto.nombre}
                              className="producto-img"
                            />
                            
                            {/* Badges */}
                            <div className="card-badges">
                              {producto.oferta && (
                                <Badge bg="danger" className="discount-badge">
                                  <i className="bi bi-tag-fill me-1"></i>
                                  -{producto.descuento}%
                                </Badge>
                              )}
                              {producto.esNuevo && (
                                <Badge bg="success" className="new-badge">
                                  Nuevo
                                </Badge>
                              )}
                            </div>

                            {/* Información rápida */}
                            <div className="quick-info">
                              <div className="prep-time">
                                <i className="bi bi-clock"></i>
                                {producto.tiempoPreparacion}
                              </div>
                              {renderRating(producto.rating)}
                            </div>
                          </div>

                          <Card.Body className="producto-body d-flex flex-column">
                            <Card.Title className="producto-nombre">{producto.nombre}</Card.Title>
                            <Card.Text className="producto-descripcion flex-grow-1">
                              {producto.descripcion}
                            </Card.Text>
                            
                            {/* Rating y reviews */}
                            <div className="producto-meta mb-2">
                              <div className="d-flex justify-content-between align-items-center">
                                {renderRating(producto.rating)}
                                <small className="text-muted">
                                  ({producto.reviews} reviews)
                                </small>
                              </div>
                            </div>

                            {/* Ingredientes */}
                            <div className="producto-ingredientes mb-2">
                              <small className="text-muted">
                                <i className="bi bi-list-check me-1"></i>
                                {producto.ingredientes.slice(0, 2).join(', ')}
                                {producto.ingredientes.length > 2 && '...'}
                              </small>
                            </div>

                            {/* Precios */}
                            <div className="producto-precio-container mt-auto">
                              {producto.oferta ? (
                                <div className="precio-con-descuento">
                                  <div className="d-flex align-items-center gap-2 mb-1">
                                    <span className="producto-precio-oferta">
                                      ${producto.precio.toLocaleString()}
                                    </span>
                                    <span className="producto-precio-original">
                                      ${producto.precioOriginal.toLocaleString()}
                                    </span>
                                  </div>
                                  <small className="text-success">
                                    <i className="bi bi-arrow-down-circle me-1"></i>
                                    Ahorras ${(producto.precioOriginal - producto.precio).toLocaleString()}
                                  </small>
                                </div>
                              ) : (
                                <span className="producto-precio">
                                  ${producto.precio.toLocaleString()}
                                </span>
                              )}
                            </div>

                            {/* Stock */}
                            <div className="producto-stock mb-2">
                              <small className={producto.stock < 5 ? 'text-danger' : 'text-success'}>
                                <i className="bi bi-box-seam me-1"></i>
                                {producto.stock < 5 ? 'Últimas unidades' : `${producto.stock} disponibles`}
                              </small>
                            </div>

                            {/* Botón de acción */}
                            <div className="producto-actions mt-2">
                              <Button 
                                variant="primary" 
                                className="btn-comprar"
                                onClick={() => handleAddToCart(producto)}
                                disabled={producto.stock === 0}
                              >
                                {producto.stock === 0 ? (
                                  <>
                                    <i className="bi bi-x-circle me-2"></i>
                                    Agotado
                                  </>
                                ) : (
                                  <>
                                    <i className="bi bi-cart-plus me-2"></i>
                                    Agregar al carrito
                                  </>
                                )}
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  {/* Paginación */}
                  {totalPages > 1 && (
                    <div className="pagination-section mt-5">
                      <div className="d-flex justify-content-center">
                        <Pagination className="custom-pagination">
                          {renderPagination()}
                        </Pagination>
                      </div>
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modal de login requerido */}
      <Modal show={showLoginModal} onHide={handleCloseModal} centered className="login-modal">
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <i className="bi bi-person-check-fill text-primary me-2"></i>
            Inicia sesión para continuar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedProduct && (
            <>
              <div className="login-product-image mb-3">
                <img 
                  src={selectedProduct.imagen} 
                  alt={selectedProduct.nombre}
                  className="img-fluid rounded"
                  style={{maxHeight: '100px'}}
                />
              </div>
              <h5 className="login-product-name">{selectedProduct.nombre}</h5>
              <p className="text-muted mb-3">
                Para agregar este producto a tu carrito, necesitas iniciar sesión.
              </p>
              <Alert variant="info" className="small">
                <i className="bi bi-info-circle me-2"></i>
                Si no tienes una cuenta, puedes registrarte en menos de un minuto.
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="outline-secondary" onClick={handleCloseModal} className="me-2">
            <i className="bi bi-arrow-left me-1"></i>
            Seguir explorando
          </Button>
          <Button variant="primary" onClick={handleLoginRedirect}>
            <i className="bi bi-box-arrow-in-right me-1"></i>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default CategoryProducts;