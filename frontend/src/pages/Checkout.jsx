// Checkout.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  // Datos de departamentos y ciudades de Colombia
  const colombiaData = useMemo(() => ({
    "Bogotá D.C.": ["Bogotá"],
    "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Sabaneta", "Rionegro"],
    "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago"],
    "Cundinamarca": ["Soacha", "Facatativá", "Girardot", "Zipaquirá", "Chía"],
    "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta"],
    "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia"],
    "Bolívar": ["Cartagena", "Magangué", "Turbaco"],
    "Nariño": ["Pasto", "Ipiales", "Tumaco"],
    "Córdoba": ["Montería", "Cereté", "Lorica"],
    "Boyacá": ["Tunja", "Sogamoso", "Duitama"],
    "Caldas": ["Manizales", "La Dorada", "Chinchiná"],
    "Magdalena": ["Santa Marta", "Ciénaga", "Fundación"],
    "Tolima": ["Ibagué", "Espinal", "Melgar"],
    "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona"],
    "Huila": ["Neiva", "Pitalito", "Garzón"],
    "Cauca": ["Popayán", "Santander de Quilichao"],
    "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
    "Quindío": ["Armenia", "Calarcá", "Montenegro"],
    "Sucre": ["Sincelejo", "Corozal", "Sampués"],
    "Meta": ["Villavicencio", "Acacías", "Granada"]
  }), []);

  // Estados del formulario
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    country: "Colombia",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [completedSections, setCompletedSections] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Cargar datos del carrito
  useEffect(() => {
    const loadCartData = () => {
      try {
        const storedCart = localStorage.getItem('kahuaCart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
          
          const subtotal = parsedCart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
          const discount = parsedCart.reduce((total, item) => {
            if (item.oferta) {
              return total + ((item.precioOriginal - item.precio) * item.cantidad);
            }
            return total;
          }, 0);
          const shipping = 0;
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

  // Efecto para animar elementos cuando se cargan
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setCurrentStep(1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Verificar secciones completadas
  useEffect(() => {
    const sections = [];
    if (formData.firstName && formData.lastName && formData.email && formData.phone && 
        formData.address && formData.state && formData.city && formData.zipCode) {
      sections.push('shipping');
    }
    if (formData.paymentMethod) {
      if (formData.paymentMethod === 'cash' || 
          (formData.cardNumber && formData.cardName && formData.expiryDate && formData.cvv)) {
        sections.push('payment');
      }
    }
    if (formData.acceptTerms) {
      sections.push('terms');
    }
    setCompletedSections(sections);
  }, [formData]);

  // Manejar cambios en el formulario
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Actualizar ciudades cuando cambie el departamento
    if (field === 'state') {
      setCities(colombiaData[value] || []);
      setFormData(prev => ({ ...prev, city: "" })); // Resetear ciudad
    }
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }

    // Efecto de animación al completar campo
    if (value.trim() !== '') {
      const inputElement = document.querySelector(`[data-field="${field}"]`);
      if (inputElement) {
        inputElement.classList.add('field-completed');
        setTimeout(() => {
          inputElement.classList.remove('field-completed');
        }, 1000);
      }
    }
  }, [errors, colombiaData]);

  // Validar formulario
  const validateForm = useCallback(() => {
    const newErrors = {};

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

    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "El número de tarjeta es requerido";
      if (!formData.cardName.trim()) newErrors.cardName = "El nombre en la tarjeta es requerido";
      if (!formData.expiryDate.trim()) newErrors.expiryDate = "La fecha de expiración es requerida";
      if (!formData.cvv.trim()) newErrors.cvv = "El CVV es requerido";
    }

    if (!formData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos y condiciones";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Procesar pedido
  const handleSubmitOrder = useCallback((e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Animación de shake en los campos con error
      const errorFields = Object.keys(errors);
      errorFields.forEach(field => {
        const element = document.querySelector(`[data-field="${field}"]`);
        if (element) {
          element.classList.add('field-error-shake');
          setTimeout(() => {
            element.classList.remove('field-error-shake');
          }, 600);
        }
      });
      
      // Scroll al primer error
      const firstErrorField = document.querySelector('.field-error-shake');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }

    // Animación de confirmación
    setCurrentStep(2);
    
    setTimeout(() => {
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

      const existingOrders = JSON.parse(localStorage.getItem('kahuaOrders') || '[]');
      localStorage.setItem('kahuaOrders', JSON.stringify([...existingOrders, orderData]));
      localStorage.removeItem('kahuaCart');
      navigate(`/order-confirmation/${orderData.orderId}`);
    }, 1500);
  }, [formData, cartItems, orderSummary, navigate, validateForm, errors]);

  const handleBackToCart = useCallback(() => {
    navigate("/carrito");
  }, [navigate]);

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
          <div className="empty-cart-message">
            <h3>Tu carrito está vacío</h3>
            <p>Agrega productos antes de proceder al checkout</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate("/productos")}
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
      
      <div className={`checkout-page ${currentStep > 0 ? 'step-active' : ''}`}>
        {/* Header Principal */}
        <div className="checkout-header">
          <div className="checkout-header-content">
            <div className="header-main">
              <h1 className="checkout-title">
                <i className="bi bi-cart-check"></i>
                Finalizar Compra
              </h1>
              <p className="checkout-subtitle">
                Completa tu información para procesar el pedido
              </p>
            </div>
            <div className="order-total-preview">
              <span className="total-label">Total a pagar:</span>
              <span className="total-amount">${orderSummary.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="checkout-container">
            <div className="checkout-main">
              {/* Información de Envío */}
              <div className={`checkout-card ${completedSections.includes('shipping') ? 'section-completed' : ''}`}>
                <div className="checkout-card-header">
                  <h3 className="checkout-card-title">
                    <i className="bi bi-truck"></i>
                    Información de Envío
                    {completedSections.includes('shipping') && (
                      <i className="bi bi-check-circle-fill section-complete-icon"></i>
                    )}
                  </h3>
                  <p className="section-description">Ingresa la dirección donde deseas recibir tu pedido</p>
                </div>
                <div className="form-row">
                  <div className="form-group" data-field="firstName">
                    <label className="form-label required">
                      <i className="bi bi-person"></i>
                      Nombre
                    </label>
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
                  <div className="form-group" data-field="lastName">
                    <label className="form-label required">
                      <i className="bi bi-person-badge"></i>
                      Apellido
                    </label>
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
                  <div className="form-group" data-field="email">
                    <label className="form-label required">
                      <i className="bi bi-envelope"></i>
                      Email
                    </label>
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
                  <div className="form-group" data-field="phone">
                    <label className="form-label required">
                      <i className="bi bi-telephone"></i>
                      Teléfono
                    </label>
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
                <div className="form-group" data-field="address">
                  <label className="form-label required">
                    <i className="bi bi-geo-alt"></i>
                    Dirección
                  </label>
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
                  <div className="form-group" data-field="state">
                    <label className="form-label required">
                      <i className="bi bi-map"></i>
                      Departamento
                    </label>
                    <select
                      className={`form-input ${errors.state ? 'error' : ''}`}
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    >
                      <option value="">Selecciona un departamento</option>
                      {Object.keys(colombiaData).map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <div className="form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        {errors.state}
                      </div>
                    )}
                  </div>
                  <div className="form-group" data-field="city">
                    <label className="form-label required">
                      <i className="bi bi-geo"></i>
                      Ciudad
                    </label>
                    <select
                      className={`form-input ${errors.city ? 'error' : ''}`}
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!formData.state}
                    >
                      <option value="">Selecciona una ciudad</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && (
                      <div className="form-error">
                        <i className="bi bi-exclamation-circle"></i>
                        {errors.city}
                      </div>
                    )}
                  </div>
                  <div className="form-group" data-field="zipCode">
                    <label className="form-label required">
                      <i className="bi bi-mailbox"></i>
                      Código Postal
                    </label>
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
              <div className={`checkout-card ${completedSections.includes('payment') ? 'section-completed' : ''}`}>
                <div className="checkout-card-header">
                  <h3 className="checkout-card-title">
                    <i className="bi bi-credit-card"></i>
                    Método de Pago
                    {completedSections.includes('payment') && (
                      <i className="bi bi-check-circle-fill section-complete-icon"></i>
                    )}
                  </h3>
                  <p className="section-description">Selecciona cómo deseas pagar tu pedido</p>
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
                    <div className="form-group" data-field="cardNumber">
                      <label className="form-label required">
                        <i className="bi bi-credit-card"></i>
                        Número de Tarjeta
                      </label>
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
                    <div className="form-group" data-field="cardName">
                      <label className="form-label required">
                        <i className="bi bi-person-vcard"></i>
                        Nombre en la Tarjeta
                      </label>
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
                      <div className="form-group" data-field="expiryDate">
                        <label className="form-label required">
                          <i className="bi bi-calendar"></i>
                          Fecha de Expiración
                        </label>
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
                      <div className="form-group" data-field="cvv">
                        <label className="form-label required">
                          <i className="bi bi-shield-lock"></i>
                          CVV
                        </label>
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
              <div className={`terms ${completedSections.includes('terms') ? 'section-completed' : ''}`}>
                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  />
                  <label htmlFor="acceptTerms" className="terms-text">
                    <i className="bi bi-shield-check"></i>
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
                  disabled={currentStep === 2}
                >
                  {currentStep === 2 ? (
                    <>
                      <div className="btn-spinner"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-lock-fill"></i>
                      Confirmar Pedido - ${orderSummary.total.toLocaleString()}
                    </>
                  )}
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
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="order-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
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

              <div className="shipping-info">
                <h3 className="checkout-card-title">
                  <i className="bi bi-info-circle"></i>
                  Información de Entrega
                </h3>
                <div className="shipping-address">
                  <div className="address-name">
                    <i className="bi bi-lightning"></i>
                    Entrega Express
                  </div>
                  <div className="address-line">
                    <i className="bi bi-clock"></i>
                    45 minutos o menos
                  </div>
                  <div className="address-line">
                    <i className="bi bi-box-seam"></i>
                    Empaque especial para jugos
                  </div>
                  <div className="address-line">
                    <i className="bi bi-truck"></i>
                    Envío gratis
                  </div>
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