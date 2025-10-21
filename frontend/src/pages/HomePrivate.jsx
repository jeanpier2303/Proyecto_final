// frontend/src/pages/HomePrivate.jsx
import React, { useState, useEffect } from 'react';
import NavPrivate from '../components/NavPrivate';
import Footer from '../components/Footer';
//import '../assets/styles/HomePrivate.css';

const HomePrivate = () => {
  // Estados
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Datos de productos
  const products = [
    {
      id: 1,
      name: 'Uvas Moradas Premium',
      category: 'uvas',
      price: 12.99,
      image: '🍇',
      description: 'Uvas moradas frescas de la mejor calidad',
      stock: 25,
      featured: true
    },
    {
      id: 2,
      name: 'Naranjas Dulces',
      category: 'citricos',
      price: 8.50,
      image: '🍊',
      description: 'Naranjas jugosas y dulces',
      stock: 40,
      featured: true
    },
    {
      id: 3,
      name: 'Mangos Tropicales',
      category: 'tropicales',
      price: 15.75,
      image: '🥭',
      description: 'Mangos maduros y dulces',
      stock: 18,
      featured: false
    },
    {
      id: 4,
      name: 'Fresas Frescas',
      category: 'berries',
      price: 9.99,
      image: '🍓',
      description: 'Fresas rojas y jugosas',
      stock: 30,
      featured: true
    },
    {
      id: 5,
      name: 'Piñas Golden',
      category: 'tropicales',
      price: 11.25,
      image: '🍍',
      description: 'Piñas dulces y aromáticas',
      stock: 15,
      featured: false
    },
    {
      id: 6,
      name: 'Manzanas Verdes',
      category: 'manzanas',
      price: 7.80,
      image: '🍏',
      description: 'Manzanas verdes crujientes',
      stock: 35,
      featured: false
    },
    {
      id: 7,
      name: 'Arándanos Orgánicos',
      category: 'berries',
      price: 13.50,
      image: '🫐',
      description: 'Arándanos frescos orgánicos',
      stock: 22,
      featured: true
    },
    {
      id: 8,
      name: 'Limones Jugosos',
      category: 'citricos',
      price: 6.99,
      image: '🍋',
      description: 'Limones amarillos jugosos',
      stock: 50,
      featured: false
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos los Productos', icon: '🍎' },
    { id: 'uvas', name: 'Uvas y Pasas', icon: '🍇' },
    { id: 'citricos', name: 'Cítricos', icon: '🍊' },
    { id: 'tropicales', name: 'Frutas Tropicales', icon: '🥭' },
    { id: 'berries', name: 'Berries', icon: '🫐' },
    { id: 'manzanas', name: 'Manzanas y Peras', icon: '🍏' }
  ];

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'todos' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Funciones del carrito
  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    showNotification(`${product.name} agregado al carrito`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Notificaciones
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  // Checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    alert(`¡Gracias por tu compra! Total: $${getCartTotal().toFixed(2)}`);
    setCart([]);
    setIsCartOpen(false);
    showNotification('¡Compra realizada exitosamente!');
  };

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.sales-header');
      if (header && window.scrollY > 100) {
        header.classList.add('scrolled');
      } else if (header) {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="kahua-private-home">
      {/* Navigation */}
      <NavPrivate />

      {/* Hero Section */}
      <section className="sales-hero" id="inicio">
        <div className="container">
          <div className="hero-content">
            <div className="welcome-text">
              <h1>
                Bienvenido a <span>Kahua</span>
              </h1>
              <p>Descubre nuestra selección premium de frutas frescas, directamente del campo a tu mesa</p>
              <button className="btn-primary">
                Comprar Ahora
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Productos</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Natural</span>
              </div>
              <div className="stat">
                <span className="stat-number">24h</span>
                <span className="stat-label">Entrega</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animación de frutas */}
        <div className="fruit-animation">
          <div className="fruit fruit-1">🍇</div>
          <div className="fruit fruit-2">🍊</div>
          <div className="fruit fruit-3">🥭</div>
          <div className="fruit fruit-4">🍓</div>
          <div className="fruit fruit-5">🍍</div>
          <div className="fruit fruit-6">🫐</div>
        </div>

        {/* Olas decorativas */}
        <div className="hero-waves">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="special-offers" id="ofertas">
        <div className="container">
          <div className="section-header">
            <h2>Ofertas Especiales</h2>
            <p>Descubre nuestras promociones exclusivas para clientes Kahua</p>
          </div>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-badge">20%</div>
              <h3>Oferta de Temporada</h3>
              <p>20% de descuento en frutas tropicales</p>
              <button className="btn-offer">Ver Oferta</button>
            </div>
            <div className="offer-card">
              <div className="offer-badge">33%</div>
              <h3>Combo Familiar</h3>
              <p>Lleva 3 kilos de frutas variadas por el precio de 2</p>
              <button className="btn-offer">Ver Oferta</button>
            </div>
            <div className="offer-card">
              <div className="offer-badge">15%</div>
              <h3>Cliente Premium</h3>
              <p>Descuento exclusivo para miembros Kahua</p>
              <button className="btn-offer">Ver Oferta</button>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <section className="products-catalog" id="productos">
        <div className="container">
          <div className="catalog-header">
            <div className="section-header">
              <h2>Nuestros Productos</h2>
              <p>Selección premium de frutas frescas y naturales</p>
            </div>
            
            <div className="catalog-controls">
              <div className="search-container">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button">
                  🔍
                </button>
              </div>

              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                {product.featured && <div className="featured-badge">Destacado</div>}
                {product.stock < 10 && <div className="discount-badge">¡Últimas unidades!</div>}
                
                <div className="product-image">
                  <span className="product-emoji">{product.image}</span>
                </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  
                  <div className="product-meta">
                    <span className="stock">Stock: {product.stock}</span>
                    <div className="price-container">
                      <span className="price">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    className={`btn-add-to-cart ${product.stock === 0 ? 'disabled' : ''}`}
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrito de Compras */}
      <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Tu Carrito</h3>
          <button 
            className="close-cart"
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Tu carrito está vacío</p>
              <button 
                className="btn-continue-shopping"
                onClick={() => setIsCartOpen(false)}
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <div className="item-emoji">{item.image}</div>
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} c/u</p>
                </div>
                <div className="item-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-shipping">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <div className="cart-total">
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="btn-checkout"
              onClick={handleCheckout}
            >
              <span>Proceder al Pago</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>

      {/* Overlay para el carrito */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'active' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Botón flotante del carrito */}
      {getTotalItems() > 0 && (
        <button 
          className="floating-cart-btn"
          onClick={() => setIsCartOpen(true)}
        >
          🛒
          <span className="cart-badge">{getTotalItems()}</span>
        </button>
      )}

      {/* Notificación */}
      {notification.show && (
        <div className="kahua-notification show">
          {notification.message}
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePrivate;