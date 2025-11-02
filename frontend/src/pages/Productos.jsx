import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup, Pagination, Modal, Badge, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavPrivate from "../components/NavPrivate";
import Footer from "../components/Footer";
import "../assets/styles/Productos.css";
import JugoNaranja from "../assets/images/Productos/Jugo_naranja.png"
import JugoManzana from "../assets/images/Productos/Jugo_manzana.png"
import JugoZanahoriaNaranja from "../assets/images/Productos/Jugo_Naranja&Zanahoria.png"
import JugoBorojó from "../assets/images/Productos/Jugo_borojo.png"
import JugoGuanabana from "../assets/images/Productos/Jugo_guanabana.png"
import JugoLulo from "../assets/images/Productos/Jugo_lulo.png"
import JugoMango from "../assets/images/Productos/Jugo_mango.png"
import JugoBorojóMaracuya from "../assets/images/Productos/Jugo_borojo&maracuya.png"
import JugoFrutosRojos from "../assets/images/Productos/Jugo_frutos_rojos.png"
import JugoMangoMaracuya from "../assets/images/Productos/Jugo_Mango&Maracuyá.png"
import JugoChontaduro from "../assets/images/Productos/Jugo_Chontaduro.png"
import JugoMangoGuayabaNaranja from "../assets/images/Productos/Jugo_MangoGuayabaNaranja.png"


const Productos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [sortBy, setSortBy] = useState("nombre");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const productsPerPage = 6;

  // Datos de ejemplo mejorados para productos
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
    { id: "todos", nombre: "Todos los productos", icon: "bi bi-grid-fill", count: productos.length },
    { id: "clasicos", nombre: "Jugos Clásicos", icon: "bi bi-cup-fill", count: productos.filter(p => p.categoria === "clasicos").length },
    { id: "verdes", nombre: "Jugos Verdes", icon: "bi bi-droplet-fill", count: productos.filter(p => p.categoria === "verdes").length },
    { id: "tropicales", nombre: "Mezclas Tropicales", icon: "bi bi-tropical-storm", count: productos.filter(p => p.categoria === "tropicales").length },
    { id: "energizantes", nombre: "Energizantes", icon: "bi bi-lightning-fill", count: productos.filter(p => p.categoria === "energizantes").length }
  ];

  // Filtrar productos según búsqueda y categoría
  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.ingredientes.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "todos" || producto.categoria === selectedCategory;
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

  // Función para agregar al carrito
  const handleAddToCart = (producto, qty = 1) => {
    const cartItem = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      precioOriginal: producto.precioOriginal,
      imagen: producto.imagen,
      categoria: producto.categoria,
      cantidad: qty,
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
      currentCart[existingItemIndex].cantidad += qty;
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
    
    // Mostrar modal de confirmación
    setSelectedProduct(producto);
    setQuantity(qty);
    setShowCartModal(true);
  };

/*   const handleQuickAdd = (producto) => {
    handleAddToCart(producto, 1);
  }; */

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseModal = () => {
    setShowCartModal(false);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleContinueShopping = () => {
    handleCloseModal();
  };

  const handleGoToCart = () => {
    handleCloseModal();
    window.location.href = '/Carrito';
  };

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

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
      <NavPrivate />
      
      <section className="productos-page">
        {/* Hero Section Mejorada */}
        <div className="products-hero">
          <Container>
            <div className="hero-content text-center">
              <h1 className="hero-title">
                Descubre Nuestra Frescura Natural
              </h1>
              <p className="hero-subtitle">
                Jugos 100% naturales, batidos energéticos y mezclas tropicales 
                preparados al momento con los mejores ingredientes frescos
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <i className="bi bi-star-fill"></i>
                  <span>4.8/5 Rating</span>
                </div>
                <div className="stat-item">
                  <i className="bi bi-cup-fill"></i>
                  <span>+500 Pedidos</span>
                </div>
                <div className="stat-item">
                  <i className="bi bi-clock-fill"></i>
                  <span>Preparación 5-8 min</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container className="products-container">
          {/* Barra de herramientas mejorada */}
          <div className="products-toolbar">
            <Row className="align-items-center">
              <Col md={6}>
                <div className="toolbar-left">
                  <h5 className="toolbar-title">
                    Nuestros Productos
                    <Badge bg="primary" className="ms-2">{filteredProductos.length}</Badge>
                  </h5>
                  <p className="toolbar-subtitle text-muted mb-0">
                    Productos frescos y naturales
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

                  {/* Filtros móvil */}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="d-md-none"
                  >
                    <i className="bi bi-funnel me-1"></i>
                    Filtros
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          <Row>
            {/* Sidebar de Filtros - Desktop */}
            <Col lg={3} className="d-none d-lg-block">
              <Card className="filters-sidebar">
                <Card.Header>
                  <h6 className="mb-0">
                    <i className="bi bi-funnel me-2"></i>
                    Filtros
                  </h6>
                </Card.Header>
                <Card.Body>
                  {/* Filtro por categoría */}
                  <div className="filter-group">
                    <h6 className="filter-title">Categorías</h6>
                    <div className="category-filters">
                      {categorias.map(cat => (
                        <div 
                          key={cat.id}
                          className={`category-filter-item ${selectedCategory === cat.id ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(cat.id)}
                        >
                          <div className="category-info">
                            <i className={cat.icon}></i>
                            <span>{cat.nombre}</span>
                          </div>
                          <Badge bg="light" text="dark">{cat.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filtro por precio */}
                  <div className="filter-group">
                    <h6 className="filter-title">Rango de Precio</h6>
                    <div className="price-filter">
                      <Form.Range
                        min={0}
                        max={20000}
                        step={1000}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      />
                      <div className="price-labels">
                        <span>$0</span>
                        <span>${priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Filtro por ofertas */}
                  <div className="filter-group">
                    <h6 className="filter-title">Ofertas</h6>
                    <Form.Check
                      type="switch"
                      id="ofertas-switch"
                      label="Mostrar solo ofertas"
                      checked={sortBy === "ofertas"}
                      onChange={(e) => setSortBy(e.target.checked ? "ofertas" : "nombre")}
                    />
                  </div>
                </Card.Body>
              </Card>

              
            {/* <Card className="promo-banner mt-3">
                <Card.Body className="text-center">
                  <i className="bi bi-truck promo-icon"></i>
                  <h6>Envío Gratis</h6>
                  <p className="small text-muted mb-0">En pedidos mayores a $20.000</p>
                </Card.Body>
              </Card> */}

            </Col>

            {/* Contenido Principal */}
            <Col lg={9}>
              {/* Filtros móvil desplegable */}
              {showFilters && (
                <Card className="mobile-filters d-lg-none mb-3">
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <Form.Select 
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mb-2"
                        >
                          {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.nombre} ({cat.count})
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Select 
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="mb-2"
                        >
                          <option value="nombre">Ordenar por nombre</option>
                          <option value="precio-asc">Precio: Menor a Mayor</option>
                          <option value="precio-desc">Precio: Mayor a Menor</option>
                          <option value="rating">Mejor valorados</option>
                          <option value="nuevos">Más nuevos</option>
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Control
                          type="text"
                          placeholder="Buscar..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}

              {/* Barra de filtros superiores */}
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
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md={4}>
                      <Form.Select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        size="sm"
                      >
                        {categorias.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nombre}
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
                        setSelectedCategory("todos");
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
                              <Badge bg="outline-primary" className="category-badge">
                                {producto.categoria}
                              </Badge>
                            </div>

                            {/* Overlay con acciones rápidas */}
                            <div className="producto-overlay">
                              <div className="overlay-content">
{/*                                 <Button 
                                  variant="primary" 
                                  className="btn-quick-view"
                                  onClick={() => setSelectedProduct(producto)}
                                >
                                  <i className="bi bi-eye me-1"></i>
                                  Ver detalles
                                </Button> */}
{/*                                 <Button 
                                  variant="success" 
                                  className="btn-quick-add mt-2"
                                  onClick={() => handleQuickAdd(producto)}
                                >
                                  <i className="bi bi-cart-plus me-1"></i>
                                  Agregar al carrito
                                </Button> */}
                              </div>
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
                                className="btn-comprar "
                                onClick={() => handleAddToCart(producto, 1)}
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

      {/* Modal de producto agregado */}
      <Modal show={showCartModal} onHide={handleCloseModal} centered className="cart-modal">
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <i className="bi bi-check-circle-fill text-success me-2"></i>
            ¡Producto agregado!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedProduct && (
            <>
              <div className="product-added-image mb-3">
                <img 
                  src={selectedProduct.imagen} 
                  alt={selectedProduct.nombre}
                  className="img-fluid rounded"
                  style={{maxHeight: '120px'}}
                />
              </div>
              <h5 className="product-added-name">{selectedProduct.nombre}</h5>
              <p className="text-muted mb-3">
                Cantidad: {quantity} × ${selectedProduct.precio.toLocaleString()}
              </p>
              <div className="total-added-price mb-4">
                <strong>Total: ${(selectedProduct.precio * quantity).toLocaleString()}</strong>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="outline-primary" onClick={handleContinueShopping} className="me-2">
            <i className="bi bi-arrow-left me-1"></i>
            Seguir comprando
          </Button>
          <Button variant="primary" onClick={handleGoToCart}>
            <i className="bi bi-cart-check me-1"></i>
            Ver carrito
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Productos;