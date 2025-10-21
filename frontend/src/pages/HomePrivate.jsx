import React, { useState, useEffect } from "react";
import "../../assets/styles/HomePrivate.css";
import Logo from "../../assets/Logo-Kahua.png";

// Importar imágenes de productos (debes agregar estas imágenes en tu proyecto)
// import UvasImg from "../../assets/products/uvas.jpg";
// import NaranjasImg from "../../assets/products/naranjas.jpg";
// import MangosImg from "../../assets/products/mangos.jpg";
// import FresasImg from "../../assets/products/fresas.jpg";
// import PiñasImg from "../../assets/products/piñas.jpg";
// import ManzanasImg from "../../assets/products/manzanas.jpg";
// import ArandanosImg from "../../assets/products/arandanos.jpg";
// import LimonesImg from "../../assets/products/limones.jpg";

const HomePrivate = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Datos de productos
  const products = [
    {
      id: 1,
      name: 'Uvas Moradas Premium',
      category: 'uvas',
      price: 12.99,
      image: '/assets/products/uvas.jpg',
      description: 'Uvas moradas frescas de la mejor calidad, cultivadas en el valle central',
      stock: 25,
      featured: true
    },
    {
      id: 2,
      name: 'Naranjas Dulces',
      category: 'citricos',
      price: 8.50,
      image: '/assets/products/naranjas.jpg',
      description: 'Naranjas jugosas y dulces recién cosechadas del pacífico',
      stock: 40,
      featured: true
    },
    {
      id: 3,
      name: 'Mangos Tropicales',
      category: 'tropicales',
      price: 15.75,
      image: '/assets/products/mangos.jpg',
      description: 'Mangos maduros y dulces importados de zonas tropicales',
      stock: 18,
      featured: false
    },
    {
      id: 4,
      name: 'Fresas Frescas',
      category: 'berries',
      price: 9.99,
      image: '/assets/products/fresas.jpg',
      description: 'Fresas rojas y jugosas cultivadas en tierras altas',
      stock: 30,
      featured: true
    },
    {
      id: 5,
      name: 'Piñas Golden',
      category: 'tropicales',
      price: 11.25,
      image: '/assets/products/piñas.jpg',
      description: 'Piñas dulces y aromáticas de la variedad golden',
      stock: 15,
      featured: false
    },
    {
      id: 6,
      name: 'Manzanas Verdes',
      category: 'manzanas',
      price: 7.80,
      image: '/assets/products/manzanas.jpg',
      description: 'Manzanas verdes crujientes de temporada',
      stock: 35,
      featured: false
    },
    {
      id: 7,
      name: 'Arándanos Orgánicos',
      category: 'berries',
      price: 13.50,
      image: '/assets/products/arandanos.jpg',
      description: 'Arándanos frescos orgánicos cultivados sin pesticidas',
      stock: 22,
      featured: true
    },
    {
      id: 8,
      name: 'Limones Jugosos',
      category: 'citricos',
      price: 6.99,
      image: '/assets/products/limones.jpg',
      description: 'Limones amarillos jugosos recién cosechados',
      stock: 50,
      featured: false
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos los Productos', icon: 'fas fa-apple-alt' },
    { id: 'uvas', name: 'Uvas y Pasas', icon: 'fas fa-grapes' },
    { id: 'citricos', name: 'Cítricos', icon: 'fas fa-lemon' },
    { id: 'tropicales', name: 'Frutas Tropicales', icon: 'fas fa-pineapple' },
    { id: 'berries', name: 'Berries', icon: 'fas fa-strawberry' },
    { id: 'manzanas', name: 'Manzanas y Peras', icon: 'fas fa-apple-alt' }
  ];

  // Efecto para actualizar contador del carrito
  useEffect(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, [cart]);

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

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const checkout = () => {
    if (cart.length === 0) return;
    
    alert(`¡Gracias por tu compra ${user?.nombres || 'Usuario'}! Total: $${getCartTotal().toFixed(2)}`);
    setCart([]);
    setIsCartOpen(false);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const showNotification = (message) => {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = 'kahua-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animación de entrada
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Animación de salida
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'todos' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="kahua-private-home">
      {/* Hero Section */}
      <section className="private-hero">
        <div className="container">
          <div className="hero-content">
            <div className="welcome-box">
              <img src={Logo} alt="Kahua" className="welcome-logo" />
              <h1>¡Bienvenido, {user?.nombres || "Usuario"}!</h1>
              <p>
                Nos alegra verte de nuevo en <strong>Kahua</strong>.  
                Explora nuestros productos naturales y descubre ofertas exclusivas para ti.
              </p>
              <button className="btn-primary" onClick={() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' })}>
                Ver Productos
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
        
        {/* Animación de frutas con imágenes */}
        <div className="fruit-animation">
          <div className="fruit fruit-1">
            <div className="fruit-placeholder"></div>
          </div>
          <div className="fruit fruit-2">
            <div className="fruit-placeholder"></div>
          </div>
          <div className="fruit fruit-3">
            <div className="fruit-placeholder"></div>
          </div>
          <div className="fruit fruit-4">
            <div className="fruit-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="special-offers">
        <div className="container">
          <h2>Ofertas Especiales</h2>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-badge">20% OFF</div>
              <h3>Oferta de Temporada</h3>
              <p>20% de descuento en frutas tropicales seleccionadas</p>
              <button className="btn-offer">Ver Oferta</button>
            </div>
            <div className="offer-card">
              <div className="offer-badge">33% OFF</div>
              <h3>Combo Familiar</h3>
              <p>Lleva 3 kilos de frutas variadas por el precio de 2</p>
              <button className="btn-offer">Ver Oferta</button>
            </div>
            <div className="offer-card">
              <div className="offer-badge">ENVÍO GRATIS</div>
              <h3>Primera Compra</h3>
              <p>Envío gratis en tu primer pedido superior a $25.000</p>
              <button className="btn-offer">Aprovechar</button>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <section className="products-catalog" id="productos">
        <div className="container">
          <div className="catalog-header">
            <h2>Nuestros Productos</h2>
            <p>Descubre nuestra selección premium de frutas frescas</p>
            
            {/* Búsqueda */}
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>

            {/* Filtros de categoría */}
            <div className="category-filters">
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <i className={category.icon}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de productos */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                {product.featured && <div className="featured-badge">Destacado</div>}
                
                <div className="product-image">
                  {/* Espacio para imagen del producto */}
                  <div className="product-image-placeholder">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="image-fallback">
                      <i className="fas fa-image"></i>
                      <span>{product.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-meta">
                    <span className="stock">Disponible: {product.stock}</span>
                    <span className="price">${product.price.toFixed(2)}</span>
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
          <button className="close-cart" onClick={toggleCart}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
              <div className="empty-cart-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <div className="item-image-placeholder">
                    <i className="fas fa-shopping-bag"></i>
                  </div>
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} c/u</p>
                </div>
                <div className="item-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <i className="fas fa-minus"></i>
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <button className="btn-checkout" onClick={checkout}>
              Proceder al Pago
            </button>
          </div>
        )}
      </div>

      {/* Overlay para el carrito */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'active' : ''}`} 
        onClick={toggleCart}
      ></div>

      {/* Botón flotante del carrito */}
      <button className="floating-cart-btn" onClick={toggleCart}>
        <i className="fas fa-shopping-cart"></i>
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
    </div>
  );
};

export default HomePrivate;