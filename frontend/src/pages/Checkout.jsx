import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavPrivate from "../components/NavPrivate";
import Footer from "../components/Footer";
import "../assets/styles/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    discount: 0,
    shipping: 0,
    total: 0
  });

  // Estados del formulario
  const [formData, setFormData] = useState({
    // Información de envío
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Colombia",
    
    // Información de pago
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    
    // Términos
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});

  // Cargar datos del carrito
  useEffect(() => {
    const loadCartData = () => {
      try {
        const storedCart = localStorage.getItem('kahuaCart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
          
          // Calcular resumen del pedido
          const subtotal = parsedCart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
          const discount = parsedCart.reduce((total, item) => {
            if (item.oferta) {
              return total + ((item.precioOriginal - item.precio) * item.cantidad);
            }
            return total;
          }, 0);
          const shipping = 0; // Envío gratis
          const total = subtotal - discount + shipping;
          
          setOrderSummary({ subtotal, discount, shipping, total });
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartData();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  }, [errors]);

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar información de envío
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido";
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";
    if (!formData.address.trim()) newErrors.address = "La dirección es requerida";
    if (!formData.city.trim()) newErrors.city = "La ciudad es requerida";
    if (!formData.state.trim()) newErrors.state = "El departamento es requerido";
    if (!formData.zipCode.trim()) newErrors.zipCode = "El código postal es requerido";

    // Validar información de pago
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "El número de tarjeta es requerido";
      if (!formData.cardName.trim()) newErrors.cardName = "El nombre en la tarjeta es requerido";
      if (!formData.expiryDate.trim()) newErrors.expiryDate = "La fecha de expiración es requerida";
      if (!formData.cvv.trim()) newErrors.cvv = "El CVV es requerido";
    }

    // Validar términos y condiciones
    if (!formData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos y condiciones";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Procesar pedido
  const handleSubmitOrder = useCallback((e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Por favor completa todos los campos requeridos correctamente.");
      return;
    }

    // Simular procesamiento del pedido
    const orderData = {
      orderId: `ORD-${Date.now()}`,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      },
      shipping: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      payment: {
        method: formData.paymentMethod,
        ...(formData.paymentMethod === "card" && {
          cardLastFour: formData.cardNumber.slice(-4)
        })
      },
      items: cartItems,
      total: orderSummary.total,
      date: new Date().toISOString()
    };

    // Guardar pedido en localStorage
    const existingOrders = JSON.parse(localStorage.getItem('kahuaOrders') || '[]');
    localStorage.setItem('kahuaOrders', JSON.stringify([...existingOrders, orderData]));
    
    // Limpiar carrito
    localStorage.removeItem('kahuaCart');
    
    // Redirigir a confirmación
    navigate(`/order-confirmation/${orderData.orderId}`);
  }, [formData, cartItems, orderSummary, navigate]);

  // Volver al carrito
  const handleBackToCart = useCallback(() => {
    navigate("/carrito");
  }, [navigate]);

  // Estado de carga
  if (loading) {
    return (
      <>
        <NavPrivate />
        <div className="checkout-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando checkout...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <NavPrivate />
        <div className="checkout-page">
          <div className="checkout-header">
            <div className="checkout-header-content">
              <div>
                <h1 className="checkout-title">
                  <i className="bi bi-cart-check"></i>
                  Checkout
                </h1>
                <p className="checkout-subtitle">
                  Completa tu información para finalizar la compra
                </p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega productos antes de proceder al checkout</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate("/productos")}
              style={{ marginTop: '20px' }}
            >
              <i className="bi bi-bag"></i>
              Explorar Productos
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavPrivate />
      
      <div className="checkout-page">
        {/* Header del Checkout */}
        <div className="checkout-header">
          <div className="checkout-header-content">
            <div>
              <h1 className="checkout-title">
                <i className="bi bi-cart-check"></i>
                Checkout
              </h1>
              <p className="checkout-subtitle">
                Completa tu información para finalizar la compra
              </p>
            </div>
            <div className="checkout-steps">
              <div className="step active">
                <span className="step-number">1</span>
                <span>Carrito</span>
              </div>
              <i className="bi bi-chevron-right"></i>
              <div className="step active">
                <span className="step-number">2</span>
                <span>Checkout</span>
              </div>
              <i className="bi bi-chevron-right"></i>
              <div className="step">
                <span className="step-number">3</span>
                <span>Confirmación</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="checkout-container">
            {/* Formularios Principales */}
            <div className="checkout-main">
              {/* Información de Envío */}
              <div className="checkout-card">
                <div className="checkout-card-header">
                  <h3 className="checkout-card-title">
                    <i className="bi bi-truck"></i>
                    Información de Envío
                  </h3>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required">Nombre</label>
                    <input
                      type="text"
                      className={`form-input ${errors.firstName ? 'error' : ''}`}
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Tu nombre"
                    />
                    {errors.firstName && (
                      <div className="form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Apellido</label>
                    <input
                      type="text"
                      className={`form-input ${errors.lastName ? 'error' : ''}`}
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Tu apellido"
                    />
                    {errors.lastName && (
                      <div className="form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required">Email</label>
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <div className="form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Teléfono</label>
                    <input
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+57 300 123 4567"
                    />
                    {errors.phone && (
                      <div className="form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label required">Dirección</label>
                  <input
                    type="text"
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Dirección completa"
                  />
                  {errors.address && (
                    <div className="form-error">
                      <i className="bi bi-exclamation-circle"></i>
                      {errors.address}
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label required">Ciudad</label>
                    <input
                      type="text"
                      className={`form-input ${errors.city ? 'error' : ''}`}
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Ciudad"
                    />
                    {errors.city && (
                      <div className="form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        {errors.city}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Departamento</label>
                    <input
                      type="text"
                      className={`form-input ${errors.state ? 'error' : ''}`}
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Departamento"
                    />
                    {errors.state && (
                      <div className="form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        {errors.state}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Código Postal</label>
                    <input
                      type="text"
                      className={`form-input ${errors.zipCode ? 'error' : ''}`}
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="Código postal"
                    />
                    {errors.zipCode && (
                      <div className="form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        {errors.zipCode}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Método de Pago */}
              <div className="checkout-card">
                <div className="checkout-card-header">
                  <h3 className="checkout-card-title">
                    <i className="bi bi-credit-card"></i>
                    Método de Pago
                  </h3>
                </div>
                <div className="payment-methods">
                  <label 
                    className={`payment-method ${formData.paymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => handleInputChange('paymentMethod', 'card')}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    />
                    <i className="bi bi-credit-card-2-front payment-method-icon"></i>
                    <div className="payment-method-info">
                      <div className="payment-method-name">Tarjeta de Crédito/Débito</div>
                      <div className="payment-method-description">Paga con tu tarjeta Visa, Mastercard o American Express</div>
                    </div>
                  </label>

                  <label 
                    className={`payment-method ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}
                    onClick={() => handleInputChange('paymentMethod', 'cash')}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    />
                    <i className="bi bi-cash-coin payment-method-icon"></i>
                    <div className="payment-method-info">
                      <div className="payment-method-name">Pago Contra Entrega</div>
                      <div className="payment-method-description">Paga en efectivo cuando recibas tu pedido</div>
                    </div>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="card-info">
                    <div className="form-group">
                      <label className="form-label required">Número de Tarjeta</label>
                      <input
                        type="text"
                        className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && (
                        <div className="form-error">
                          <i className="bi bi-exclamation-circle"></i>
                          {errors.cardNumber}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label required">Nombre en la Tarjeta</label>
                      <input
                        type="text"
                        className={`form-input ${errors.cardName ? 'error' : ''}`}
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        placeholder="Como aparece en la tarjeta"
                      />
                      {errors.cardName && (
                        <div className="form-error">
                          <i className="bi bi-exclamation-circle"></i>
                          {errors.cardName}
                        </div>
                      )}
                    </div>
                    <div className="card-row">
                      <div className="form-group">
                        <label className="form-label required">Fecha de Expiración</label>
                        <input
                          type="text"
                          className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/AA"
                          maxLength="5"
                        />
                        {errors.expiryDate && (
                          <div className="form-error">
                            <i className="bi bi-exclamation-circle"></i>
                            {errors.expiryDate}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label required">CVV</label>
                        <input
                          type="text"
                          className={`form-input ${errors.cvv ? 'error' : ''}`}
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          maxLength="3"
                        />
                        {errors.cvv && (
                          <div className="form-error">
                            <i className="bi bi-exclamation-circle"></i>
                            {errors.cvv}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Términos y Condiciones */}
              <div className="terms">
                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  />
                  <label htmlFor="acceptTerms" className="terms-text">
                    Acepto los <a href="/terminos">términos y condiciones</a> y la <a href="/privacidad">política de privacidad</a>. 
                    Autorizo el tratamiento de mis datos personales de acuerdo con la ley.
                  </label>
                </div>
                {errors.acceptTerms && (
                  <div className="form-error" style={{ marginTop: '10px' }}>
                    <i className="bi bi-exclamation-circle"></i>
                    {errors.acceptTerms}
                  </div>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="action-buttons">
                <button 
                  type="button"
                  className="btn btn-outline"
                  onClick={handleBackToCart}
                >
                  <i className="bi bi-arrow-left"></i>
                  Volver al Carrito
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  <i className="bi bi-lock-fill"></i>
                  Confirmar Pedido - ${orderSummary.total.toLocaleString()}
                </button>
              </div>
            </div>

            {/* Resumen del Pedido */}
            <div className="checkout-sidebar">
              <div className="order-summary">
                <div className="order-summary-header">
                  <h3>
                    <i className="bi bi-receipt"></i>
                    Resumen del Pedido
                  </h3>
                </div>
                <div className="order-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="order-item-image">
                        <img 
                          src={item.imagen} 
                          alt={item.nombre}
                          className="order-item-img"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                      </div>
                      <div className="order-item-info">
                        <div className="order-item-name">{item.nombre}</div>
                        <div className="order-item-details">
                          {item.cantidad} x ${item.precio.toLocaleString()}
                        </div>
                      </div>
                      <div className="order-item-price">
                        ${(item.precio * item.cantidad).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-totals">
                  <div className="price-row">
                    <span>Subtotal:</span>
                    <span>${orderSummary.subtotal.toLocaleString()}</span>
                  </div>
                  {orderSummary.discount > 0 && (
                    <div className="price-row discount">
                      <span>Descuento:</span>
                      <span>-${orderSummary.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="price-row">
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                  <div className="price-divider"></div>
                  <div className="price-row total">
                    <span>Total:</span>
                    <span>${orderSummary.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Información de Envío */}
              <div className="shipping-info">
                <h3 className="checkout-card-title">
                  <i className="bi bi-info-circle"></i>
                  Información de Entrega
                </h3>
                <div className="shipping-address">
                  <div className="address-name">Entrega Express</div>
                  <div className="address-line">⏱️ 45 minutos o menos</div>
                  <div className="address-line">📦 Empaque especial para jugos</div>
                  <div className="address-line">🚚 Envío gratis</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;