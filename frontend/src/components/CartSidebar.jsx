/* import React from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, cart, removeFromCart, updateQuantity, toggleCart }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { 
      x: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="cart-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={toggleCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="cart-sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="cart-header">
              <h3>Tu Carrito</h3>
              <button className="close-cart" onClick={toggleCart}>
                ×
              </button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>Tu carrito está vacío</p>
                  <span>🥺</span>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">{item.emoji || '🍎'}</div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>${item.price} c/u</p>
                    </div>
                    <div className="item-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <button className="btn-checkout">
                  Proceder al Pago
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar; */