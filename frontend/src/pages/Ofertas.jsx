import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Alert, Form, InputGroup, ProgressBar, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavPrivate from "../components/NavPrivate";
import Footer from "../components/Footer";
import "../assets/styles/Ofertas.css";
import ChicaJugo from "../assets/images/Productos/Jugos_Fondo.png";
import JugoFresa from "../assets/images/Productos/Jugo_fresa.png";
import JugoMango from "../assets/images/Productos/Jugo_Mango.png";
import JugoPiña from "../assets/images/Productos/Jugo_Piña.png";
import JugoNaranja from "../assets/images/Productos/Jugo_naranja.png";
import JugoDetox from "../assets/images/Productos/Jugo_Detox.png";
import JugoMora from "../assets/images/Productos/Jugo_Mora.png";
import JugoChontaduro from "../assets/images/Productos/Jugo_Chontaduro.png";
import JugosCombo1 from "../assets/images/Productos/Jugos_combo01.png";


const Ofertas = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({});
  const [activeFilter, setActiveFilter] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyAvailable] = useState(true);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedOferta, setSelectedOferta] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Datos de ofertas mejorados
  const ofertas = [
    {
      id: 1,
      nombre: "Jugo de Fresa Natural",
      descripcion: "Delicioso jugo natural de fresa, rico en antioxidantes y vitamina C",
      precio: 7200,
      precioOriginal: 9000,
      descuento: 20,
      categoria: "Naturales",
      imagen: JugoFresa,
      tiempoRestante: "12:45:30",
      stock: 8,
      vendidos: 45,
      popularidad: 85,
      esExclusivo: true,
      ingredientes: ["Fresas frescas", "Agua purificada", "Hielo", "Miel natural"],
      beneficios: ["Antioxidante", "Vitamina C", "Energía natural"]
    },
    {
      id: 2,
      nombre: "Jugo Verde Detox",
      descripcion: "Mezcla revitalizante de espinaca, piña, pepino y jengibre fresco",
      precio: 10200,
      precioOriginal: 12000,
      descuento: 15,
      categoria: "Verdes",
      imagen: JugoDetox,
      tiempoRestante: "08:20:15",
      stock: 5,
      vendidos: 32,
      popularidad: 72,
      esExclusivo: false,
      ingredientes: ["Espinaca", "Piña", "Pepino", "Jengibre", "Limón"],
      beneficios: ["Detox", "Minerales", "Clorofila"]
    },
    {
      id: 3,
      nombre: "Jugo Clásico de Mora",
      descripcion: "Refrescante jugo de mora natural Rico en fibra y antioxidantes",
      precio: 8400,
      precioOriginal: 12000,
      descuento: 30,
      categoria: "Naturales",
      imagen: JugoMora,
      tiempoRestante: "23:15:40",
      stock: 12,
      vendidos: 67,
      popularidad: 92,
      esExclusivo: true,
      ingredientes: ["Mora fresca", "Yogurt griego", "Avena", "Miel", "Hielo"],
      beneficios: ["Energía", "Proteína", "Fibra"]
    },
    {
      id: 4,
      nombre: "Jugo Tropical de Mango",
      descripcion: "Jugo exótico de mango maduro con un toque de lima y menta fresca",
      precio: 8100,
      precioOriginal: 9000,
      descuento: 10,
      categoria: "Tropicales",
      imagen: JugoMango,
      tiempoRestante: "15:30:25",
      stock: 15,
      vendidos: 28,
      popularidad: 65,
      esExclusivo: false,
      ingredientes: ["Mango maduro", "Lima", "Menta fresca", "Agua", "Hielo"],
      beneficios: ["Vitamina A", "Digestivo", "Refrescante"]
    },
    {
      id: 5,
      nombre: "Jugo Energizante de Chontaduro",
      descripcion: "Batido proteico con chontaduro. Ideal para energía y recuperación muscular",
      precio: 11200,
      precioOriginal: 14000,
      descuento: 20,
      categoria: "Energizantes",
      imagen: JugoChontaduro,
      tiempoRestante: "06:45:10",
      stock: 3,
      vendidos: 41,
      popularidad: 78,
      esExclusivo: true,
      ingredientes: ["Chontaduro", "Leche de almendra", "Proteína en polvo", "Banana", "Miel"],
      beneficios: ["Proteína", "Energía", "Recuperación"]
    },
    {
      id: 6,
      nombre: "Jugo Quemagrasa de Piña",
      descripcion: "Combinación termogénica de piña, jengibre y pomelo para acelerar metabolismo",
      precio: 9600,
      precioOriginal: 12000,
      descuento: 20,
      categoria: "Verdes",
      imagen: JugoPiña,
      tiempoRestante: "18:20:35",
      stock: 7,
      vendidos: 53,
      popularidad: 88,
      esExclusivo: false,
      ingredientes: ["Piña fresca", "Jengibre", "Pomelo", "Menta", "Agua"],
      beneficios: ["Termogénico", "Metabolismo", "Vitamina C"]
    },
    {
      id: 7,
      nombre: "Combo Familiar Energético",
      descripcion: "2 jugos naturales + 2 Jugos verdes- Perfecto para toda la familia",
      precio: 35000,
      precioOriginal: 45000,
      descuento: 22,
      categoria: "Combos",
      imagen: JugosCombo1,
      tiempoRestante: "02:15:50",
      stock: 6,
      vendidos: 24,
      popularidad: 95,
      esExclusivo: true,
      ingredientes: ["Variedad de frutas", "Verduras frescas"],
      beneficios: ["Ahorro", "Variedad", "Familiar"]
    },
    {
      id: 8,
      nombre: "Jugo Natural de Naranja",
      descripcion: "Refrescante jugo de naranja 100% natural, rico en vitamina C y antioxidantes",
      precio: 10800,
      precioOriginal: 13500,
      descuento: 20,
      categoria: "Naturales",
      imagen: JugoNaranja,
      tiempoRestante: "11:40:20",
      stock: 10,
      vendidos: 38,
      popularidad: 82,
      esExclusivo: false,
      ingredientes: ["Arándanos", "Granada", "Té verde", "Miel", "Limón"],
      beneficios: ["Antioxidante", "Memoria", "Salud cardiovascular"]
    }
  ];

/*   const categorias = [
    { id: "todas", nombre: "Todas las ofertas", count: ofertas.length },
    { id: "naturales", nombre: "Jugos Naturales", count: ofertas.filter(o => o.categoria === "naturales").length },
    { id: "batidos", nombre: "Batidos", count: ofertas.filter(o => o.categoria === "batidos").length },
    { id: "detox", nombre: "Detox", count: ofertas.filter(o => o.categoria === "detox").length },
    { id: "tropicales", nombre: "Tropicales", count: ofertas.filter(o => o.categoria === "tropicales").length },
    { id: "combos", nombre: "Combos", count: ofertas.filter(o => o.categoria === "combos").length }
  ]; */

  // Calcular tiempo restante para cada oferta
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      ofertas.forEach(oferta => {
        const [hours, minutes, seconds] = oferta.tiempoRestante.split(':').map(Number);
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        if (totalSeconds > 0) {
          totalSeconds--;
          const newHours = Math.floor(totalSeconds / 3600);
          const newMinutes = Math.floor((totalSeconds % 3600) / 60);
          const newSeconds = totalSeconds % 60;
          
          newTimeLeft[oferta.id] = {
            hours: newHours.toString().padStart(2, '0'),
            minutes: newMinutes.toString().padStart(2, '0'),
            seconds: newSeconds.toString().padStart(2, '0')
          };
        } else {
          newTimeLeft[oferta.id] = { hours: '00', minutes: '00', seconds: '00' };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, );

  // Filtrar ofertas
  const filteredOfertas = ofertas.filter(oferta => {
    const matchesCategory = activeFilter === "todas" || oferta.categoria === activeFilter;
    const matchesSearch = oferta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         oferta.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = !showOnlyAvailable || oferta.stock > 0;
    
    return matchesCategory && matchesSearch && matchesAvailability;
  });

  // Función para agregar al carrito (actualizada con la misma lógica que Productos.jsx)
  const handleAddToCart = (oferta, qty = 1) => {
    const cartItem = {
      id: oferta.id,
      nombre: oferta.nombre,
      precio: oferta.precio,
      precioOriginal: oferta.precioOriginal,
      imagen: oferta.imagen,
      categoria: oferta.categoria,
      cantidad: qty,
      maxStock: oferta.stock,
      oferta: true,
      descuento: oferta.descuento
    };

    // Obtener carrito actual del localStorage
    const currentCart = JSON.parse(localStorage.getItem('kahuaCart') || '[]');
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = currentCart.findIndex(item => item.id === oferta.id);
    
    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      currentCart[existingItemIndex].cantidad += qty;
      if (currentCart[existingItemIndex].cantidad > oferta.stock) {
        currentCart[existingItemIndex].cantidad = oferta.stock;
        alert(`Solo tenemos ${oferta.stock} unidades disponibles de ${oferta.nombre}`);
      }
    } else {
      // Agregar nuevo item
      currentCart.push(cartItem);
    }

    // Guardar en localStorage
    localStorage.setItem('kahuaCart', JSON.stringify(currentCart));
    
    // Mostrar modal de confirmación
    setSelectedOferta(oferta);
    setQuantity(qty);
    setShowCartModal(true);
  };

/*   const handleQuickAdd = (oferta) => {
    handleAddToCart(oferta, 1);
  };
 */
  const handleCloseModal = () => {
    setShowCartModal(false);
    setSelectedOferta(null);
    setQuantity(1);
  };

  const handleContinueShopping = () => {
    handleCloseModal();
  };

  const handleGoToCart = () => {
    handleCloseModal();
    navigate('/Carrito');
  };

 /*  // Función para ver detalles
  const handleViewDetails = (oferta) => {
    navigate(`/producto/${oferta.id}`);
  }; */

  // Función para calcular el ahorro
  const calculateSavings = (oferta) => {
    return oferta.precioOriginal - oferta.precio;
  };

  // Función para obtener el color del temporizador
  const getTimerColor = (hours) => {
    if (hours < 4) return "danger";
    if (hours < 12) return "warning";
    return "success";
  };

  return (
    <>
      <NavPrivate />
      
      {/* Hero Section de Ofertas */}
      <section className="ofertas-hero">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <div className="hero-content">
                <Badge bg="danger" className="hero-badge mb-3">
                  <i className="bi bi-lightning-fill me-2"></i>
                  OFERTAS FLASH
                </Badge>
                <h1 className="hero-title">
                  Descuentos Exclusivos 
                  <span className="text-primary"> por Tiempo Limitado</span>
                </h1>
                <p className="hero-description">
                  Aprovecha nuestras ofertas especiales en jugos naturales y batidos. 
                  Precios increíbles que desaparecen pronto. ¡No te quedes sin el tuyo!
                </p>
                <div className="hero-stats">
                  <div className="stat">
                    <div className="stat-number">{ofertas.length}</div>
                    <div className="stat-label">Ofertas activas</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">
                      {Math.max(...ofertas.map(o => o.descuento))}%
                    </div>
                    <div className="stat-label">Máximo descuento</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">
                      {ofertas.filter(o => o.stock > 0).length}
                    </div>
                    <div className="stat-label">Disponibles</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-visual">
                <div className="floating-offer">
                  <div className="offer-bubble">
                    <span>¡Hasta {Math.max(...ofertas.map(o => o.descuento))}% OFF!</span>
                  </div>
                </div>
                <img 
                  src={ChicaJugo} 
                  alt="Ofertas Kahua"
                  className="hero-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Alertas de Ofertas */}
      <Container className="mb-4">
        <Alert variant="warning" className="ofertas-alert">
          <div className="d-flex align-items-center">
            <div className="alert-icon">
              <i className="bi bi-clock-fill"></i>
            </div>
            <div className="flex-grow-1">
              <strong>¡Atención!</strong> Estas ofertas son por tiempo limitado. 
              Los precios pueden cambiar una vez que expire el tiempo.
            </div>
            <Badge bg="danger" className="ms-3">
              <i className="bi bi-stopwatch me-1"></i>
              Tiempo Limitado
            </Badge>
          </div>
        </Alert>
      </Container>

      {/* Grid de Ofertas */}
      <section className="ofertas-grid-section py-5">
        <Container>
          {filteredOfertas.length === 0 ? (
            <div className="no-ofertas text-center py-5">
              <i className="bi bi-search-heart no-ofertas-icon"></i>
              <h3 className="no-ofertas-title">No se encontraron ofertas</h3>
              <p className="no-ofertas-text">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <Button 
                variant="outline-primary"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("todas");
                }}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Mostrar todas las ofertas
              </Button>
            </div>
          ) : (
            <>
              <div className="results-info mb-4">
                <Row className="align-items-center">
                  <Col>
                    <h5 className="mb-0">
                      {filteredOfertas.length} oferta(s) encontrada(s)
                    </h5>
                  </Col>
                  <Col className="text-end">
                    <small className="text-muted">
                      Ordenado por: <strong>Mayor descuento</strong>
                    </small>
                  </Col>
                </Row>
              </div>

              <Row>
                {filteredOfertas.map(oferta => (
                  <Col key={oferta.id} xl={3} lg={4} md={6} className="mb-4">
                    <Card className="oferta-card h-100">
                      <div className="oferta-image-container">
                        <Card.Img 
                          variant="top" 
                          src={oferta.imagen} 
                          alt={oferta.nombre}
                          className="oferta-image"
                        />
                        
                        {/* Badges */}
                        <div className="card-badges">
                          <Badge bg="danger" className="discount-badge">
                            <i className="bi bi-arrow-down-right me-1"></i>
                            -{oferta.descuento}%
                          </Badge>
                          {oferta.esExclusivo && (
                            <Badge bg="warning" className="exclusive-badge">
                              <i className="bi bi-star-fill me-1"></i>
                              Exclusivo
                            </Badge>
                          )}
                          {oferta.stock === 0 && (
                            <Badge bg="secondary" className="soldout-badge">
                              <i className="bi bi-x-circle me-1"></i>
                              Agotado
                            </Badge>
                          )}
                        </div>

                        {/* Temporizador */}
                        <div className={`timer-badge timer-${getTimerColor(parseInt(timeLeft[oferta.id]?.hours || 0))}`}>
                          <div className="timer-icon">
                            <i className="bi bi-clock"></i>
                          </div>
                          <div className="timer-display">
                            {timeLeft[oferta.id] ? (
                              <>
                                {timeLeft[oferta.id].hours}:
                                {timeLeft[oferta.id].minutes}:
                                {timeLeft[oferta.id].seconds}
                              </>
                            ) : (
                              oferta.tiempoRestante
                            )}
                          </div>
                        </div>

                        {/* Popularidad */}
                        <div className="popularity-indicator">
                          <div className="popularity-label">
                            <i className="bi bi-graph-up-arrow me-1"></i>
                            {oferta.popularidad}% popularidad
                          </div>
                          <ProgressBar 
                            now={oferta.popularidad} 
                            variant={oferta.popularidad > 80 ? "success" : oferta.popularidad > 60 ? "warning" : "info"}
                            className="popularity-bar"
                          />
                        </div>
                      </div>

                      <Card.Body className="oferta-body d-flex flex-column">
                        <div className="categoria-badge mb-2">
                          <Badge bg="outline-primary" text="dark">
                            {oferta.categoria}
                          </Badge>
                        </div>
                        
                        <Card.Title className="oferta-nombre">
                          {oferta.nombre}
                        </Card.Title>
                        
                        <Card.Text className="oferta-descripcion flex-grow-1">
                          {oferta.descripcion}
                        </Card.Text>

                        {/* Beneficios */}
                        <div className="beneficios-oferta mb-3">
                          {oferta.beneficios.slice(0, 3).map((beneficio, index) => (
                            <Badge key={index} bg="light" text="dark" className="beneficio-badge me-1 mb-1">
                              {beneficio}
                            </Badge>
                          ))}
                        </div>

                        {/* Stock y Vendidos */}
                        <div className="oferta-stats mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <small className={`stock-info ${oferta.stock < 3 ? 'text-danger' : 'text-success'}`}>
                              <i className="bi bi-box-seam me-1"></i>
                              {oferta.stock} disponibles
                            </small>
                            <small className="text-muted">
                              <i className="bi bi-cart-check me-1"></i>
                              {oferta.vendidos} vendidos
                            </small>
                          </div>
                        </div>

                        {/* Precios */}
                        <div className="precios-container mb-3">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span className="precio-actual">
                              ${oferta.precio.toLocaleString()}
                            </span>
                            <span className="precio-original">
                              ${oferta.precioOriginal.toLocaleString()}
                            </span>
                          </div>
                          <div className="ahorro-info">
                            <Badge bg="success" className="ahorro-badge">
                              <i className="bi bi-piggy-bank me-1"></i>
                              Ahorras ${calculateSavings(oferta).toLocaleString()}
                            </Badge>
                          </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="oferta-actions mt-auto">
                          <div className="d-grid gap-2">
                            <Button 
                              variant={oferta.stock === 0 ? "secondary" : "primary"}
                              className="btn-comprar"
                              onClick={() => handleAddToCart(oferta, 1)}
                              disabled={oferta.stock === 0}
                            >
                              {oferta.stock === 0 ? (
                                <>
                                  <i className="bi bi-x-circle me-2"></i>
                                  Agotado
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-cart-plus me-2"></i>
                                  Agregar al Carrito
                                </>
                              )}
                            </Button>
{/*                             <Button 
                              variant="outline-primary" 
                              className="btn-detalles"
                              onClick={() => handleViewDetails(oferta)}
                            >
                              <i className="bi bi-eye me-2"></i>
                              Ver Detalles
                            </Button> */}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </section>

      {/* Sección de Newsletter para Ofertas */}
      <section className="newsletter-ofertas py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <div className="newsletter-content">
                <Badge bg="light" text="dark" className="newsletter-badge mb-3">
                  <i className="bi bi-envelope-fill me-2"></i>
                  SUSCRIPCIÓN EXCLUSIVA
                </Badge>
                <h2 className="newsletter-title">
                  Recibe Ofertas Antes que Nadie
                </h2>
                <p className="newsletter-description">
                  Suscríbete a nuestro newsletter y sé el primero en conocer 
                  nuestras ofertas flash, descuentos exclusivos y nuevos productos.
                </p>
                <div className="newsletter-form">
                  <Row className="g-2 justify-content-center">
                    <Col md={6}>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="tu@email.com"
                          className="newsletter-input"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={3}>
                      <Button variant="warning" className="btn-suscribir w-100">
                        <i className="bi bi-bell-fill me-2"></i>
                        Suscribirse
                      </Button>
                    </Col>
                  </Row>
                </div>
                <small className="text-light-50 mt-2 d-block">
                  📧 Sin spam, solo ofertas reales. Puedes cancelar en cualquier momento.
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modal de oferta agregada al carrito */}
      <Modal show={showCartModal} onHide={handleCloseModal} centered className="cart-modal">
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <i className="bi bi-check-circle-fill text-success me-2"></i>
            ¡Oferta agregada!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedOferta && (
            <>
              <div className="product-added-image mb-3">
                <img 
                  src={selectedOferta.imagen} 
                  alt={selectedOferta.nombre}
                  className="img-fluid rounded"
                  style={{maxHeight: '120px'}}
                />
              </div>
              <h5 className="product-added-name">{selectedOferta.nombre}</h5>
              <p className="text-muted mb-3">
                Cantidad: {quantity} × ${selectedOferta.precio.toLocaleString()}
              </p>
              <div className="total-added-price mb-4">
                <strong>Total: ${(selectedOferta.precio * quantity).toLocaleString()}</strong>
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

export default Ofertas;