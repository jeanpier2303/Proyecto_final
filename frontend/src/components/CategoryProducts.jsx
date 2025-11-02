import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup, Pagination, Modal, Badge, Alert } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavbarApp from "../components/NavbarApp";
import Footer from "../components/Footer";
import "../assets/styles/CategoryProducts.css";

// Importar las mismas imágenes que en Productos.jsx
import JugoNaranja from "../assets/images/Productos/Jugo_naranja.png";
import JugoManzana from "../assets/images/Productos/Jugo_manzana.png";
import JugoZanahoriaNaranja from "../assets/images/Productos/Jugo_Naranja&Zanahoria.png";
import JugoBorojó from "../assets/images/Productos/Jugo_borojo.png";
import JugoGuanabana from "../assets/images/Productos/Jugo_guanabana.png";
import JugoLulo from "../assets/images/Productos/Jugo_lulo.png";
import JugoMango from "../assets/images/Productos/Jugo_mango.png";
import JugoBorojóMaracuya from "../assets/images/Productos/Jugo_borojo&maracuya.png";
import JugoFrutosRojos from "../assets/images/Productos/Jugo_frutos_rojos.png";
import JugoMangoMaracuya from "../assets/images/Productos/Jugo_Mango&Maracuyá.png";
import JugoChontaduro from "../assets/images/Productos/Jugo_Chontaduro.png";
import JugoMangoGuayabaNaranja from "../assets/images/Productos/Jugo_MangoGuayabaNaranja.png";

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

  // Usar los mismos datos de productos que en Productos.jsx
  const productos = [
    {
      id: 1,
      nombre: "Jugo de Naranja Natural",
      precio: 7500,
      precioOriginal: 8500,
      categoria: "clasicos",
      imagen: JugoNaranja,
      descripcion: "Jugo de naranja recién exprimido, lleno de vitamina C y energía natural para empezar tu día.",
      oferta: true,
      descuento: 12,
      stock: 18,
      ingredientes: ["Naranjas frescas", "Hielo"],
      beneficios: ["Alto en vitamina C", "Energía natural", "Refuerzo inmunológico"],
      rating: 4.8,
      reviews: 124,
      tiempoPreparacion: "5 min",
      esNuevo: true
    },
    {
      id: 2,
      nombre: "Jugo Verde Lulo",
      precio: 12000,
      precioOriginal: 12000,
      categoria: "verdes",
      imagen: JugoLulo,
      descripcion: "Refrescante jugo verde con lulo, espinaca y pepino, ideal para detoxificar y revitalizar tu cuerpo.",
      oferta: false,
      descuento: 0,
      stock: 12,
      ingredientes: ["Lulo", "Espinaca", "Pepino", "Apio", "Limón"],
      beneficios: ["Detoxificación", "Rico en antioxidantes", "Energizante natural"],
      rating: 4.9,
      reviews: 89,
      tiempoPreparacion: "7 min",
      esNuevo: false
    },
    {
      id: 3,
      nombre: "Mezcla Tropical de Mango y Maracuyá",
      precio: 10500,
      precioOriginal: 12000,
      categoria: "tropicales",
      imagen: JugoMangoMaracuya,
      descripcion: "Explosión tropical de mango dulce y maracuyá ácido en un jugo refrescante.",
      oferta: true,
      descuento: 13,
      stock: 10,
      ingredientes: ["Mango maduro", "Maracuyá", "Hielo"],
      beneficios: ["Vitaminas A y C", "Hidratante", "Antioxidante"],
      rating: 4.7,
      reviews: 156,
      tiempoPreparacion: "6 min",
      esNuevo: true
    },
    {
      id: 4,
      nombre: "Jugo energizante de Borojó",
      precio: 12800,
      precioOriginal: 14500,
      categoria: "energizantes",
      imagen: JugoBorojó,
      descripcion: "Potente jugo de borojó con maca y jengibre, diseñado para aumentar tu energía y resistencia física.",
      oferta: true,
      descuento: 12,
      stock: 8,
      ingredientes: ["Borojó", "Maca", "Jengibre", "Miel", "Agua"],
      beneficios: ["Incrementa energía", "Mejora resistencia", "Aumenta vitalidad"],
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
      imagen: JugoManzana,
      descripcion: "Jugo dulce y refrescante de manzana roja, perfecto para cualquier momento del día.",
      oferta: false,
      descuento: 0,
      stock: 20,
      ingredientes: ["Manzanas rojas", "Hielo", "Canela opcional"],
      beneficios: ["Rico en fibra", "Digestivo", "Hidratante natural"],
      rating: 4.5,
      reviews: 98,
      tiempoPreparacion: "4 min",
      esNuevo: false
    },
    {
      id: 6,
      nombre: "Jugo Guanabana Power",
      precio: 13500,
      precioOriginal: 15000,
      categoria: "verdes",
      imagen: JugoGuanabana,
      descripcion: "Energizante jugo de guanábana con kale y espirulina, cargado de superfoods para un impulso saludable.",
      oferta: true,
      descuento: 10,
      stock: 6,
      ingredientes: ["Guanábana", "Kale", "Espirulina", "Limón"],
      beneficios: ["Antioxidante", "Refuerzo inmunológico", "Energía natural"],
      rating: 4.9,
      reviews: 45,
      tiempoPreparacion: "7 min",
      esNuevo: true
    },
    {
      id: 7,
      nombre: "Mezcla Tropical Frutos Rojos",
      precio: 11200,
      precioOriginal: 11200,
      categoria: "tropicales",
      imagen: JugoFrutosRojos,
      descripcion: "Deliciosa mezcla de frutos rojos tropicales como fresa, papaya y coco, rica en antioxidantes y sabor.",
      oferta: false,
      descuento: 0,
      stock: 9,
      ingredientes: ["Fresas", "Papaya", "Mora", "Uva", "Coco", "Hielo"],
      beneficios: ["Rico en antioxidantes", "Vitaminas C y E", "Salud cardiovascular"],
      rating: 4.8,
      reviews: 112,
      tiempoPreparacion: "6 min",
      esNuevo: false
    },
    {
      id: 8,
      nombre: "Jugo Energizante Borojó y Maracuyá",
      precio: 14200,
      precioOriginal: 16000,
      categoria: "energizantes",
      imagen: JugoBorojóMaracuya,
      descripcion: "Combinación potente de borojó y maracuyá con ginseng para un impulso energético natural.",
      oferta: true,
      descuento: 11,
      stock: 7,
      ingredientes: ["Borojó", "Maracuyá", "Ginseng", "Miel"],
      beneficios: ["Incrementa energía", "Mejora concentración", "Antioxidante"],
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
      imagen: JugoZanahoriaNaranja,
      descripcion: "Clásica combinación de zanahoria dulce y naranja cítrica, rica en betacaroteno.",
      oferta: true,
      descuento: 11,
      stock: 14,
      ingredientes: ["Zanahoria fresca", "Naranja", "Jengibre"],
      beneficios: ["Vitamina A", "Salud ocular", "Piel radiante"],
      rating: 4.6,
      reviews: 134,
      tiempoPreparacion: "5 min",
      esNuevo: false
    },
    {
      id: 10,
      nombre: "Jugo verde de Mango",
      precio: 12500,
      precioOriginal: 12500,
      categoria: "verdes",
      imagen: JugoMango,
      descripcion: "Exquisito jugo verde con mango, pepino y menta para una experiencia refrescante y nutritiva.",
      oferta: false,
      descuento: 0,
      stock: 5,
      ingredientes: ["Mango", "Pepino", "Menta", "Limón"],
      beneficios: ["Rico en vitamina C", "Hidratante", "Antioxidante"],
      rating: 4.9,
      reviews: 56,
      tiempoPreparacion: "7 min",
      esNuevo: true
    },
    {
      id: 11,
      nombre: "Mezcla Tropical de Mango, Guayaba y Naranja",
      precio: 9800,
      precioOriginal: 11500,
      categoria: "tropicales",
      imagen: JugoMangoGuayabaNaranja,
      descripcion: "Deliciosa mezcla tropical de mango, guayaba y naranja, perfecta para un impulso de sabor y vitaminas.",
      oferta: true,
      descuento: 15,
      stock: 11,
      ingredientes: ["Mango", "Guayaba", "Naranja", "Hielo"],
      beneficios: ["Rico en vitamina C", "Hidratante", "Antioxidante"],
      rating: 4.8,
      reviews: 203,
      tiempoPreparacion: "5 min",
      esNuevo: false
    },
    {
      id: 12,
      nombre: "Jugo Energgizante de Chontaduro",
      precio: 13800,
      precioOriginal: 15500,
      categoria: "energizantes",
      imagen: JugoChontaduro,
      descripcion: "Energizante jugo de chontaduro con té verde y romero, ideal para mejorar la concentración y el enfoque mental.",
      oferta: true,
      descuento: 11,
      stock: 8,
      ingredientes: ["Chontaduro", "Té verde", "Romero", "Miel"],
      beneficios: ["Aumenta la resistencia", "Mejora concentración", "Aumenta energía", "Rico en antioxidantes"],
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

  // Función para cambiar de categoría
  const handleCategoryChange = (newCategoryId) => {
    navigate(`/categoria/${newCategoryId}`);
  };

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
            <div className="hero-contentt text-center">
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
              {/* Barra de filtros - ACTUALIZADA CON SELECTOR DE CATEGORÍAS */}
              <Card className="filters-bar mb-4">
                <Card.Body className="py-2">
                  <Row className="align-items-center">
                    <Col md={4}>
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
                    <Col md={4}>
                      {/* Selector de categorías agregado */}
                      <Form.Select 
                        value={categoryId}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        size="sm"
                      >
                        {categorias.map(categoria => (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={4}>
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
                                className="btn-comprarr"
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