import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavPrivate from "../components/NavPrivate";
import Footer from "../components/Footer";
import "../assets/styles/Carrito.css";

const Carrito = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const navigate = useNavigate();

  // Cargar items del carrito desde localStorage
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const storedCart = localStorage.getItem('kahuaCart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // Actualizar localStorage cuando cambie el carrito
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('kahuaCart', JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  // Función para actualizar la cantidad de un producto
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId 
          ? { 
              ...item, 
              cantidad: Math.min(newQuantity, item.maxStock),
              ...(newQuantity > item.maxStock && { showStockAlert: true })
            }
          : item
      )
    );

    // Ocultar alerta después de 3 segundos
    if (newQuantity > cartItems.find(item => item.id === productId)?.maxStock) {
      setTimeout(() => {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === productId 
              ? { ...item, showStockAlert: false }
              : item
          )
        );
      }, 3000);
    }
  }, [cartItems]);

  // Función para eliminar un producto del carrito
  const removeItem = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  // Función para vaciar todo el carrito
  const clearCart = useCallback(() => {
    if (window.confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
      setCartItems([]);
      localStorage.removeItem('kahuaCart');
    }
  }, []);

  // Calcular subtotal
  const calculateSubtotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }, [cartItems]);

  // Calcular descuentos por ofertas
  const calculateProductDiscounts = useCallback(() => {
    return cartItems.reduce((total, item) => {
      if (item.oferta) {
        return total + ((item.precioOriginal - item.precio) * item.cantidad);
      }
      return total;
    }, 0);
  }, [cartItems]);

  // Calcular descuento por cupón
  const calculateCouponDiscount = useCallback(() => {
    if (!couponApplied) return 0;
    const subtotal = calculateSubtotal();
    return subtotal * (couponDiscount / 100);
  }, [couponApplied, couponDiscount, calculateSubtotal]);

  // Calcular total final
  const calculateTotal = useCallback(() => {
    const subtotal = calculateSubtotal();
    const productDiscounts = calculateProductDiscounts();
    const couponDiscountValue = calculateCouponDiscount();
    return subtotal - productDiscounts - couponDiscountValue;
  }, [calculateSubtotal, calculateProductDiscounts, calculateCouponDiscount]);

  // Obtener número total de items
  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0);
  }, [cartItems]);

  // Aplicar cupón de descuento
  const applyCoupon = useCallback(() => {
    const coupons = {
      'KAHUA10': 10,
      'KAHUA15': 15,
      'FRESCO20': 20,
      'BIENVENIDO': 5
    };

    const discount = coupons[couponCode.toUpperCase()];
    
    if (discount) {
      setCouponApplied(true);
      setCouponDiscount(discount);
      alert(`¡Cupón aplicado! Obtienes un ${discount}% de descuento.`);
    } else {
      alert('Cupón no válido. Intenta con KAHUA10, KAHUA15, FRESCO20 o BIENVENIDO.');
    }
  }, [couponCode]);

  // Remover cupón
  const removeCoupon = useCallback(() => {
    setCouponApplied(false);
    setCouponCode("");
    setCouponDiscount(0);
  }, []);

  // Proceder al checkout
  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    navigate("/checkout");
  }, [cartItems, navigate]);

  // Continuar comprando
  const handleContinueShopping = useCallback(() => {
    navigate("/productos");
  }, [navigate]);

  // Estado de carga
  if (loading) {
    return (
      <>
        <NavPrivate />
        <div className="carrito-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando tu carrito...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavPrivate />
      
      <div className="carrito-page">
        {/* Header del Carrito */}
        <div className="carrito-header">
          <div className="carrito-header-content">
            <div className="carrito-titles">
              <h1 className="carrito-title">
                <i className="bi bi-cart3"></i>
                Mi Carrito de Compras
              </h1>
              <p className="carrito-subtitle">
                Revisa y gestiona tus productos antes de finalizar la compra
              </p>
            </div>
            <div className="items-count-badge">
              {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
            </div>
          </div>
        </div>

        <div className="carrito-container">
          {/* Lista de Productos */}
          <div className="carrito-main">
            {cartItems.length === 0 ? (
              <div className="empty-cart-card">
                <div className="empty-cart-content">
                  <i className="bi bi-cart-x empty-cart-icon"></i>
                  <h3 className="empty-cart-title">Tu carrito está vacío</h3>
                  <p className="empty-cart-text">
                    ¡Descubre nuestros deliciosos jugos naturales y llena tu carrito de frescura!
                  </p>
                  <button 
                    className="btn btn-primary btn-empty-cart"
                    onClick={handleContinueShopping}
                  >
                    <i className="bi bi-bag"></i>
                    Explorar Productos
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Encabezado de productos con opción de vaciar carrito */}
                <div className="cart-items-card">
                  <div className="cart-items-header">
                    <h5>
                      <i className="bi bi-list-check"></i>
                      Productos en el Carrito
                    </h5>
                    <div className="cart-header-actions">
                      <span className="items-count">{getTotalItems()} items</span>
                      <button 
                        className="btn btn-outline-danger clear-cart-btn"
                        onClick={clearCart}
                      >
                        <i className="bi bi-trash"></i>
                        Vaciar Carrito
                      </button>
                    </div>
                  </div>
                  <div className="cart-items-body">
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-content">
                          {/* Imagen del Producto */}
                          <div className="cart-item-image">
                            <img 
                              src={item.imagen} 
                              alt={item.nombre}
                              className="product-image"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
                              }}
                            />
                            {item.oferta && (
                              <span className="discount-badge">
                                -{item.descuento}%
                              </span>
                            )}
                          </div>

                          {/* Información del Producto */}
                          <div className="cart-item-info">
                            <h6 className="product-name">{item.nombre}</h6>
                            <div className="product-category">
                              <span className="category-badge">{item.categoria}</span>
                            </div>
                            <div className="product-prices">
                              {item.oferta ? (
                                <div className="prices-with-discount">
                                  <span className="current-price">${item.precio.toLocaleString()}</span>
                                  <span className="original-price">${item.precioOriginal.toLocaleString()}</span>
                                  <span className="savings">
                                    Ahorras ${((item.precioOriginal - item.precio) * item.cantidad).toLocaleString()}
                                  </span>
                                </div>
                              ) : (
                                <span className="current-price">${item.precio.toLocaleString()}</span>
                              )}
                            </div>
                          </div>

                          {/* Controles de Cantidad */}
                          <div className="cart-item-quantity">
                            <div className="quantity-controls">
                              <button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                                disabled={item.cantidad <= 1}
                              >
                                <i className="bi bi-dash"></i>
                              </button>
                              <span className="quantity-display">{item.cantidad}</span>
                              <button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                                disabled={item.cantidad >= item.maxStock}
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                            <small className="stock-info">
                              Máx: {item.maxStock} unidades
                            </small>
                            {item.showStockAlert && (
                              <div className="stock-alert">
                                <small>
                                  <i className="bi bi-exclamation-triangle"></i>
                                  Stock máximo alcanzado
                                </small>
                              </div>
                            )}
                          </div>

                          {/* Precio Total y Acciones */}
                          <div className="cart-item-total">
                            <div className="total-price">
                              ${(item.precio * item.cantidad).toLocaleString()}
                            </div>
                            <button
                              className="remove-btn"
                              onClick={() => removeItem(item.id)}
                              title="Eliminar producto"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cupón de Descuento */}
                <div className="coupon-card">
                  <div className="coupon-content">
                    <i className="bi bi-ticket-perforated coupon-icon"></i>
                    <div className="coupon-form">
                      <label className="coupon-label">
                        ¿Tienes un cupón de descuento?
                      </label>
                      <div className="coupon-input-group">
                        <input
                          type="text"
                          placeholder="Ingresa el código del cupón"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          disabled={couponApplied}
                          className="coupon-input"
                        />
                        {couponApplied ? (
                          <button className="btn btn-outline-danger coupon-btn" onClick={removeCoupon}>
                            <i className="bi bi-x-circle"></i>
                            Remover
                          </button>
                        ) : (
                          <button className="btn btn-outline-primary coupon-btn" onClick={applyCoupon}>
                            <i className="bi bi-check-circle"></i>
                            Aplicar
                          </button>
                        )}
                      </div>
                      <small className="coupon-help">
                        Códigos disponibles: KAHUA10 (10%), KAHUA15 (15%), FRESCO20 (20%), BIENVENIDO (5%)
                      </small>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Resumen del Pedido */}
          <div className="carrito-sidebar">
            <div className="order-summary-card">
              <div className="order-summary-header">
                <h5>
                  <i className="bi bi-receipt"></i>
                  Resumen del Pedido
                </h5>
              </div>
              <div className="order-summary-body">
                {/* Detalles del Precio */}
                <div className="price-details">
                  <div className="price-row">
                    <span>Subtotal ({getTotalItems()} items):</span>
                    <span>${calculateSubtotal().toLocaleString()}</span>
                  </div>
                  
                  {calculateProductDiscounts() > 0 && (
                    <div className="price-row discount-row">
                      <span>Descuentos de productos:</span>
                      <span className="text-success">-${calculateProductDiscounts().toLocaleString()}</span>
                    </div>
                  )}

                  {couponApplied && (
                    <div className="price-row discount-row">
                      <span>Descuento por cupón ({couponDiscount}%):</span>
                      <span className="text-success">-${calculateCouponDiscount().toLocaleString()}</span>
                    </div>
                  )}

                  <div className="price-row">
                    <span>Envío:</span>
                    <span className="text-success">Gratis</span>
                  </div>

                  <div className="price-divider"></div>

                  <div className="price-row total-row">
                    <span>
                      <strong>Total:</strong>
                    </span>
                    <span>
                      <strong>${calculateTotal().toLocaleString()}</strong>
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="coupon-applied-alert">
                      <small>
                        <i className="bi bi-tag-fill"></i>
                        Cupón <strong>{couponCode.toUpperCase()}</strong> aplicado - {couponDiscount}% de descuento
                      </small>
                    </div>
                  )}
                </div>

                {/* Información de Envío */}
                <div className="shipping-info">
                  <div className="shipping-item">
                    <i className="bi bi-truck shipping-icon"></i>
                    <div>
                      <div className="shipping-title">Entrega Express</div>
                      <div className="shipping-subtitle">Recibe en 45 min o menos</div>
                    </div>
                  </div>
                  
                  <div className="shipping-item">
                    <i className="bi bi-shield-check shipping-icon"></i>
                    <div>
                      <div className="shipping-title">Pago Seguro</div>
                      <div className="shipping-subtitle">Tus datos están protegidos</div>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="action-buttons">
                  <button 
                    className="btn btn-primary checkout-btn"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    <i className="bi bi-lock-fill"></i>
                    Proceder al Pago
                  </button>
                  
                  <button 
                    className="btn btn-outline-primary continue-btn"
                    onClick={handleContinueShopping}
                  >
                    <i className="bi bi-arrow-left"></i>
                    Seguir Comprando
                  </button>
                </div>

                {/* Garantías */}
                <div className="guarantees">
                  <div className="guarantee-item">
                    <i className="bi bi-arrow-clockwise guarantee-icon"></i>
                    <span>Devolución fácil en 24h</span>
                  </div>
                  <div className="guarantee-item">
                    <i className="bi bi-star-fill guarantee-icon"></i>
                    <span>Productos 100% naturales</span>
                  </div>
                  <div className="guarantee-item">
                    <i className="bi bi-heart-fill guarantee-icon"></i>
                    <span>Hecho con amor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Productos Recomendados */}
            {cartItems.length > 0 && (
              <div className="recommended-products-card">
                <div className="recommended-products-header">
                  <h6>
                    <i className="bi bi-lightning"></i>
                    También te podría gustar
                  </h6>
                </div>
                <div className="recommended-products-body">
                  <div className="recommended-product">
                    <div className="recommended-image">
                      <img 
                        src="/images/productos/jugo-verde.jpg" 
                        alt="Jugo Verde Detox"
                        className="product-img"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    </div>
                    <div className="recommended-info">
                      <div className="recommended-name">Jugo Verde Detox</div>
                      <div className="recommended-price">$12.000</div>
                    </div>
                    <button 
                      className="btn btn-outline-primary add-btn"
                      onClick={() => {
                        const newItem = {
                          id: Date.now(),
                          nombre: "Jugo Verde Detox",
                          precio: 12000,
                          precioOriginal: 12000,
                          imagen: "/images/productos/jugo-verde.jpg",
                          categoria: "detox",
                          cantidad: 1,
                          maxStock: 10,
                          oferta: false,
                          descuento: 0
                        };
                        setCartItems(prev => [...prev, newItem]);
                      }}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  
                  <div className="recommended-product">
                    <div className="recommended-image">
                      <img 
                        src="/images/productos/batido-banano.jpg" 
                        alt="Batido de Banano"
                        className="product-img"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    </div>
                    <div className="recommended-info">
                      <div className="recommended-name">Batido de Banano</div>
                      <div className="recommended-price">$9.500</div>
                    </div>
                    <button 
                      className="btn btn-outline-primary add-btn"
                      onClick={() => {
                        const newItem = {
                          id: Date.now() + 1,
                          nombre: "Batido de Banano",
                          precio: 9500,
                          precioOriginal: 9500,
                          imagen: "/images/productos/batido-banano.jpg",
                          categoria: "batidos",
                          cantidad: 1,
                          maxStock: 8,
                          oferta: false,
                          descuento: 0
                        };
                        setCartItems(prev => [...prev, newItem]);
                      }}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Carrito;