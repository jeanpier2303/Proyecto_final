import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Carousel, Badge, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavPrivate from "../components/NavPrivate";
import Footer from "../components/Footer";
import "../assets/styles/Inicio.css";
import Carrusel1 from "../assets/images/categorias/Carrusel1.png";
import Carrusel2 from "../assets/images/categorias/Carrusel2.png";
import Carrusel3 from "../assets/images/categorias/Carrusel3.png";
import { FaTelegramPlane } from 'react-icons/fa';

const Inicio = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [recentOrder, setRecentOrder] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [animateElements, setAnimateElements] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      
      const mockRecentOrder = {
        id: "ORD-2024-00123",
        status: "entregado",
        date: "2024-03-15",
        items: [
          { name: "Jugo de Mango", quantity: 2 },
          { name: "Batido de Fresa", quantity: 1 }
        ],
        total: 28000
      };
      setRecentOrder(mockRecentOrder);
    }

    // Activar animaciones después de que el componente se monte
    setTimeout(() => {
      setAnimateElements(true);
    }, 100);
  }, []);

  // Datos del carrusel
  const carouselItems = [
    {
      id: 1,
      title: "Jugos Naturales Premium",
      description: "Frescura, sabor y energía en cada sorbo directamente del Pacífico",
      image: Carrusel3,
      buttonText: "Descubrir Sabores",
      buttonLink: "/productos"
    },
    {
      id: 2,
      title: "Nuevas Ofertas Exclusivas",
      description: "Hasta 30% de descuento en nuestros combos especiales de temporada",
      image: Carrusel2,
      buttonText: "Ver Ofertas",
      buttonLink: "/ofertas"
    },
    {
      id: 3,
      title: "Refresca tu Día con Kahua",
      description: "Descubre sabores exóticos y beneficios únicos para tu salud",
      image: Carrusel1,
      buttonText: "Explorar Productos",
      buttonLink: "/productos"
    }
  ];

  // Productos recomendados
  const productosRecomendados = [
    {
      id: 1,
      nombre: "Jugo de Mango Natural",
      precio: 8500,
      precioOriginal: 9500,
      categoria: "clasicos",
      categoriaNombre: "Jugos Clásicos",
      imagen: "https://images.unsplash.com/photo-1622964318678-1b0f243d258b?auto=format&fit=crop&w=500&q=80",
      descripcion: "Delicioso jugo 100% natural de mango, rico en vitamina C y antioxidantes",
      oferta: true,
      descuento: 11,
      vendidos: 124,
      esFavorito: true,
      stock: 15,
      tiempoPreparacion: "5 min"
    },
    {
      id: 2,
      nombre: "Jugo de Maracuyá Tropical",
      precio: 9000,
      precioOriginal: 9000,
      categoria: "naturales",
      categoriaNombre: "Jugos Naturales",
      imagen: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80",
      descripcion: "Refrescante jugo de maracuyá con un toque tropical que te transportará",
      oferta: false,
      descuento: 0,
      vendidos: 98,
      esFavorito: false,
      stock: 12,
      tiempoPreparacion: "6 min"
    },
    {
      id: 3,
      nombre: "Batido Energético de Fresa",
      precio: 10500,
      precioOriginal: 12000,
      categoria: "batidos",
      categoriaNombre: "Batidos Energéticos",
      imagen: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80",
      descripcion: "Batido cremoso de fresa con leche de almendras y miel orgánica",
      oferta: true,
      descuento: 13,
      vendidos: 156,
      esFavorito: true,
      stock: 8,
      tiempoPreparacion: "7 min"
    },
    {
      id: 4,
      nombre: "Jugo Verde Detox",
      precio: 12000,
      precioOriginal: 12000,
      categoria: "detox",
      categoriaNombre: "Jugos Detox",
      imagen: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80",
      descripcion: "Mezcla revitalizante de espinaca, piña, pepino y jengibre fresco",
      oferta: false,
      descuento: 0,
      vendidos: 87,
      esFavorito: false,
      stock: 10,
      tiempoPreparacion: "8 min"
    }
  ];

  // Productos frecuentes
  const productosFrecuentes = [
    {
      id: 5,
      nombre: "Jugo de Naranja Natural",
      precio: 7500,
      imagen: "https://images.unsplash.com/photo-1622964318678-1b0f243d258b?auto=format&fit=crop&w=500&q=80",
      vecesComprado: 3,
      ultimaCompra: "Hace 2 días",
      stock: 20,
      categoria: "clasicos"
    },
    {
      id: 6,
      nombre: "Batido de Banano",
      precio: 9500,
      imagen: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80",
      vecesComprado: 2,
      ultimaCompra: "Hace 1 semana",
      stock: 15,
      categoria: "energizantes"
    }
  ];

  // Categorías
  const categorias = [
    {
      id: 1,
      nombre: "Jugos Clásicos",
      icono: "bi bi-cup-straw",
      descripcion: "Sabores tradicionales con un toque especial Kahua",
      color: "categoria-1",
      productos: 12,
      categoriaId: "clasicos"
    },
    {
      id: 2,
      nombre: "Jugos Verdes",
      icono: "bi bi-flower3",
      descripcion: "Combinaciones detox llenas de nutrientes",
      color: "categoria-2",
      productos: 8,
      categoriaId: "verdes"
    },
    {
      id: 3,
      nombre: "Mezclas Tropicales",
      icono: "bi bi-brightness-alt-high",
      descripcion: "Explosión de sabores exóticos del Pacífico",
      color: "categoria-3",
      productos: 10,
      categoriaId: "tropicales"
    },
    {
      id: 4,
      nombre: "Energizantes",
      icono: "bi bi-lightning-charge",
      descripcion: "Boosters naturales para máximo rendimiento",
      color: "categoria-4",
      productos: 6,
      categoriaId: "energizantes"
    }
  ];

  // Ofertas especiales
  const ofertasEspeciales = [
    {
      id: 1,
      titulo: "Combo Desayuno Energético",
      descripcion: "2 jugos naturales + 1 batido + 1 snack saludable",
      precio: 22000,
      precioOriginal: 28000,
      ahorro: 6000,
      imagen: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80",
      tiempoRestante: "05:45:30",
      stock: 5
    }
  ];

  // Función para agregar al carrito
  const handleAddToCart = (producto, qty = 1) => {
    const cartItem = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      precioOriginal: producto.precioOriginal || producto.precio,
      imagen: producto.imagen,
      categoria: producto.categoria || producto.categoriaId,
      cantidad: qty,
      maxStock: producto.stock || 10,
      oferta: producto.oferta || false,
      descuento: producto.descuento || 0
    };

    const currentCart = JSON.parse(localStorage.getItem('kahuaCart') || '[]');
    const existingItemIndex = currentCart.findIndex(item => item.id === producto.id);
    
    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].cantidad += qty;
      if (currentCart[existingItemIndex].cantidad > (producto.stock || 10)) {
        currentCart[existingItemIndex].cantidad = producto.stock || 10;
        alert(`Solo tenemos ${producto.stock || 10} unidades disponibles de ${producto.nombre}`);
      }
    } else {
      currentCart.push(cartItem);
    }

    localStorage.setItem('kahuaCart', JSON.stringify(currentCart));
    setSelectedProduct(producto);
    setQuantity(qty);
    setShowCartModal(true);
  };

  const handleQuickAdd = (producto) => {
    handleAddToCart(producto, 1);
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

  const handleCarouselSelect = (selectedIndex) => {
    setActiveCarouselIndex(selectedIndex);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const getUserName = () => {
    if (!user) return "";
    return user.nombres || user.email?.split('@')[0] || "Usuario";
  };

  const getUserTier = () => {
    const puntos = user?.puntosKahua || 0;
    if (puntos > 100) return "Oro";
    if (puntos > 50) return "Plata";
    return "Bronce";
  };


  return (
    <>
      <NavPrivate />
      
      {/* Hero Section con Carrusel Mejorado */}
      <section className="hero-inicio">
        <Carousel 
          activeIndex={activeCarouselIndex} 
          onSelect={handleCarouselSelect}
          className="hero-carousel"
          indicators={false}
          interval={3000}
        >
          {carouselItems.map((item, index) => (
            <Carousel.Item key={item.id} className="hero-carousel-item">
              <div 
                className="carousel-background" 
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="carousel-overlay"></div>
              <Container>
                <Row className="align-items-center min-vh-100">
                  <Col lg={6} className="carousel-content">
                    <div className={`content-wrapper ${index === activeCarouselIndex ? 'active' : ''} ${animateElements ? 'animated' : ''}`}>
                      <Badge bg="light" text="dark" className="hero-badge mb-3 floating">
                        <i className="bi bi-star-fill me-2"></i>
                        ¡Bienvenido {getUserName()}!
                      </Badge>
                      <h1 className="hero-title slide-in-top">{item.title}</h1>
                      <p className="hero-description slide-in-bottom">{item.description}</p>
                      <div className="hero-buttons">
                        <Button 
                          className="btn-hero-primary pulse-on-hover"
                          onClick={() => handleNavigate(item.buttonLink)}
                        >
                          {item.buttonText}
                        </Button>
                        <Button 
                          className="btn-hero-secondary glow-on-hover"
                          onClick={() => handleNavigate("/ofertas")}
                        >
                          <i className="bi bi-lightning me-2"></i>
                          Ofertas Flash
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
          ))}
        </Carousel>
        
        {/* Indicadores personalizados con animación */}
        <div className="carousel-indicators-custom">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeCarouselIndex ? 'active pulse' : ''} bounce-on-hover`}
              onClick={() => setActiveCarouselIndex(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Sección de Bienvenida Personalizada con Animaciones */}
      <section className="welcome-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="welcome-content">
                <div className="user-greeting">
                  <h2 className="welcome-title fade-in-up">
                    Hola, <span className="text-primary wave-text">{getUserName()}</span>
                  </h2>
                  <p className="welcome-text fade-in-up delay-1">
                    ¿Listo para disfrutar de la frescura de hoy? Te tenemos preparadas 
                    recomendaciones especiales basadas en tus gustos.
                  </p>
                </div>
                
                <div className="user-quick-stats">
                  <Row>
                    <Col xs={4} className="text-center">
                      <div className="stat-circle fade-in-up delay-2">
                        <div className="stat-number count-up" data-count="3">0</div>
                        <div className="stat-label">Pedidos</div>
                      </div>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="stat-circle fade-in-up delay-3">
                        <div className="stat-number count-up" data-count="12">0</div>
                        <div className="stat-label">Puntos</div>
                      </div>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="stat-circle fade-in-up delay-4">
                        <div className="stat-number count-up" data-count="2">0</div>
                        <div className="stat-label">Favoritos</div>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Pedido Reciente */}
                {recentOrder && (
                  <div className="recent-order-card mt-4 slide-in-left">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">
                        <i className="bi bi-clock me-2"></i>
                        Tu último pedido
                      </h6>
                      <Badge bg="success" className="pulse-slow">{recentOrder.status}</Badge>
                    </div>
                    <p className="text-muted small mb-2">
                      {recentOrder.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Total: ${recentOrder.total.toLocaleString()}</span>
                      <Button variant="outline-primary" size="sm" className="bounce-on-hover">
                        Volver a pedir
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col lg={6}>
              <div className="welcome-features">
                <Row>
                  <Col md={6} className="mb-3">
                    <div className="feature-card fade-in-up delay-2">
                      <div className="feature-icon floating-slow">
                        <i className="bi bi-lightning"></i>
                      </div>
                      <h6>Entrega Express</h6>
                      <p className="small">En menos de 45 min</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="feature-card fade-in-up delay-3">
                      <div className="feature-icon floating-slow">
                        <i className="bi bi-gift"></i>
                      </div>
                      <h6>Puntos Kahua</h6>
                      <p className="small">Acumula y canjea</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="feature-card fade-in-up delay-4">
                      <div className="feature-icon floating-slow">
                        <i className="bi bi-heart"></i>
                      </div>
                      <h6>Tus Favoritos</h6>
                      <p className="small">Acceso rápido</p>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="feature-card fade-in-up delay-5">
                      <div className="feature-icon floating-slow">
                        <i className="bi bi-arrow-repeat"></i>
                      </div>
                      <h6>Pedir de nuevo</h6>
                      <p className="small">En 1 clic</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección de Pedido Rápido con Animaciones */}
      <section className="quick-order-section py-5 bg-light">
        <Container>
          <div className="section-header mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="section-title slide-in-left">
                  <i className="bi bi-lightning me-2"></i>
                  Pedido Rápido
                </h2>
                <p className="section-subtitle slide-in-left delay-1">Tus productos más pedidos</p>
              </div>
              <Badge bg="primary" className="pulse-slow">{productosFrecuentes.length} productos frecuentes</Badge>
            </div>
          </div>
          <Row>
            {productosFrecuentes.map((producto, index) => (
              <Col key={producto.id} lg={6} className="mb-3">
                <div className={`quick-order-card slide-in-right delay-${index + 1}`}>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <div className="quick-product-image">
                        <img 
                          src={producto.imagen} 
                          alt={producto.nombre}
                          className="img-fluid rounded scale-on-hover"
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <h6 className="mb-1">{producto.nombre}</h6>
                      <p className="text-muted small mb-1">
                        <i className="bi bi-cart me-1"></i>
                        {producto.vecesComprado} veces
                      </p>
                      <p className="text-primary fw-bold mb-0">${producto.precio.toLocaleString()}</p>
                    </Col>
                    <Col xs={3}>
                      <Button 
                        variant="primary" 
                        size="sm"
                        className=" btn-quick-add bounce-on-hover"
                        onClick={() => handleQuickAdd(producto)}
                      >
                        <i className="bi bi-plus"></i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Recomendaciones con Animaciones Mejoradas */}
      <section className="recommendations-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title fade-in-up">
              <i className="bi bi-stars me-2"></i>
              Recomendados para Ti
            </h2>
            <p className="section-subtitle fade-in-up delay-1">Productos que creemos que te encantarán</p>
          </div>
          <Row>
            {productosRecomendados.map((producto, index) => (
              <Col key={producto.id} lg={3} md={6} className="mb-4">
                <Card className={`product-card h-100 fade-in-up delay-${index + 1}`}>
                  <div className="product-image-container">
                    <Card.Img 
                      variant="top" 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      className="product-image scale-on-hover"
                    />
                    {producto.oferta && (
                      <div className="product-badge discount pulse-slow">
                        -{producto.descuento}%
                      </div>
                    )}
                    {producto.stock < 5 && (
                      <div className="product-badge stock-warning">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        Últimas unidades
                      </div>
                    )}
                    <button 
                      className={`favorite-btn ${producto.esFavorito ? 'active' : ''} bounce-on-hover`}
                    >
                      <i className="bi bi-heart"></i>
                    </button>

                    {/* Información rápida */}
                    <div className="quick-info">
                      <div className="prep-time">
                        <i className="bi bi-clock"></i>
                        {producto.tiempoPreparacion}
                      </div>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="product-category mb-2">
                      <Badge bg="light" text="dark">{producto.categoriaNombre}</Badge>
                    </div>
                    <Card.Title className="product-name">{producto.nombre}</Card.Title>
                    <Card.Text className="product-description flex-grow-1">
                      {producto.descripcion}
                    </Card.Text>
                    <div className="product-price-container mt-auto">
                      {producto.oferta ? (
                        <div className="d-flex align-items-center">
                          <span className="product-price current me-2">
                            ${producto.precio.toLocaleString()}
                          </span>
                          <span className="product-price original text-muted text-decoration-line-through">
                            ${producto.precioOriginal.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="product-price">
                          ${producto.precio.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Stock info */}
                    <div className="product-stock mb-2">
                      <small className={producto.stock < 5 ? 'text-danger' : 'text-success'}>
                        <i className="bi bi-box me-1"></i>
                        {producto.stock < 5 ? 'Últimas unidades' : 'En stock'}
                      </small>
                    </div>

                    <Button 
                      variant="primary" 
                      className="btn-add-to-cart mt-3 pulse-on-hover"
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
                          <i className="bi bi-cart me-2"></i>
                          Agregar al Carrito
                        </>
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Categorías con Animaciones */}
      <section className="categories-section py-5 bg-light">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title fade-in-up">
              <i className="bi bi-grid-3x3-gap me-2"></i>
              Nuestras Categorías
            </h2>
            <p className="section-subtitle fade-in-up delay-1">Descubre la variedad de sabores y beneficios que tenemos para ti</p>
          </div>
          <Row>
            {categorias.map((categoria, index) => (
              <Col key={categoria.id} lg={3} md={6} className="mb-4">
                <div 
                  className={`category-card ${categoria.color} fade-in-up delay-${index + 2}`}
                  onClick={() => handleNavigate(`/productos?categoria=${categoria.categoriaId}`)}
                >
                  <div className="category-icon floating">
                    <i className={categoria.icono}></i>
                  </div>
                  <h5 className="category-name">{categoria.nombre}</h5>
                  <p className="category-description">{categoria.descripcion}</p>
                  <div className="category-meta">
                    <span className="product-count">{categoria.productos} productos</span>
                    <div className="category-arrow bounce-on-hover">
                      <i className="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Ofertas Especiales con Animaciones */}
      <section className="special-offers-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="section-title fade-in-up">
              <i className="bi bi-lightning me-2"></i>
              Ofertas Especiales para Ti
            </h2>
            <p className="section-subtitle fade-in-up delay-1">Descuentos exclusivos por tu nivel {getUserTier()}</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              {ofertasEspeciales.map((oferta, index) => (
                <div key={oferta.id} className={`special-offer-card pulse-slow delay-${index + 1}`}>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <div className="offer-content">
                        <h3 className="offer-title">{oferta.titulo}</h3>
                        <p className="offer-description">
                          {oferta.descripcion}
                        </p>
                        <div className="offer-price mb-3">
                          <span className="current-price">${oferta.precio.toLocaleString()}</span>
                          <span className="original-price">${oferta.precioOriginal.toLocaleString()}</span>
                          <span className="savings">Ahorras ${oferta.ahorro.toLocaleString()}</span>
                        </div>
                        <div className="offer-timer">
                          <div className="timer-label">Termina en:</div>
                          <div className="timer-display">
                            <span className="timer-unit">{oferta.tiempoRestante.split(':')[0]}</span>:
                            <span className="timer-unit">{oferta.tiempoRestante.split(':')[1]}</span>:
                            <span className="timer-unit">{oferta.tiempoRestante.split(':')[2]}</span>
                          </div>
                        </div>
                        <div className="offer-stock mb-3">
                          <small className={oferta.stock < 3 ? 'text-danger' : 'text-success'}>
                            <i className="bi bi-box me-1"></i>
                            {oferta.stock < 3 ? 'Últimas unidades disponibles' : `${oferta.stock} disponibles`}
                          </small>
                        </div>
                        <Button 
                          variant="warning" 
                          className="btn-offer mt-3 glow-on-hover"
                          onClick={() => handleAddToCart(oferta, 1)}
                          disabled={oferta.stock === 0}
                        >
                          {oferta.stock === 0 ? (
                            <>
                              <i className="bi bi-x me-2"></i>
                              Oferta Agotada
                            </>
                          ) : (
                            <>
                              <i className="bi bi-lightning me-2"></i>
                              Aprovechar Oferta
                            </>
                          )}
                        </Button>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="offer-image">
                        <img 
                          src={oferta.imagen} 
                          alt={oferta.titulo}
                          className="img-fluid rounded-3 scale-on-hover"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección de Comunidad con Animaciones */}
      <section className="community-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h3 className="community-title fade-in-up">Únete a la Comunidad Kahua</h3>
              <p className="community-description fade-in-up delay-1">
                Comparte tus experiencias, descubre nuevas recetas y conecta con otros 
                amantes de los jugos naturales.
              </p>
              <div className="community-stats">
                <div className="stat fade-in-up delay-2">
                  <div className="stat-number count-up" data-count="1200">0</div>
                  <div className="stat-label">Miembros activos</div>
                </div>
                <div className="stat fade-in-up delay-3">
                  <div className="stat-number count-up" data-count="350">0</div>
                  <div className="stat-label">Recetas compartidas</div>
                </div>
              </div>
              <Button 
                variant="outline-primary"
                className="fade-in-up delay-4"
                onClick={() => handleNavigate("/comunidad")}
              >
                <i className="bi bi-people me-2"></i>
                Ver Comunidad
              </Button>
            </Col>
            <Col lg={6}>
              <div className="community-preview">
                <div className="testimonial-card slide-in-right">
                  <div className="testimonial-content">
                    "Los jugos de Kahua han cambiado mi rutina matutina. ¡Me siento con mucha más energía!"
                  </div>
                  <div className="testimonial-author">
                    <strong>María G.</strong>
                    <span>Cliente Kahua desde 2023</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modal de producto agregado al carrito con Animación */}
      <Modal show={showCartModal} onHide={handleCloseModal} centered className="cart-modal zoom-in">
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <i className="bi bi-check-circle text-success me-2"></i>
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
                  className="img-fluid rounded scale-on-hover"
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
          <Button variant="outline-primary" onClick={handleContinueShopping} className="me-2 bounce-on-hover">
            <i className="bi bi-arrow-left me-1"></i>
            Seguir comprando
          </Button>
          <Button variant="primary" onClick={handleGoToCart} className="pulse-on-hover">
            <i className="bi bi-cart me-1"></i>
            Ver carrito
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Botón flotante de Telegram */}
      {user && user.id && (
        <a
          href={`https://t.me/KAHUA05_bot?start=${user.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="telegram-float"
        >
          {/* REEMPLAZO DEL LOGO: Usa el componente FaTelegramPlane */}
          <FaTelegramPlane 
            size={40} // Define el tamaño del icono aquí
            color="white" // Define el color del icono
            className="telegram-float-icon"
          />
        </a>
      )}

      <Footer />
      
    </>
  );
};

export default Inicio;