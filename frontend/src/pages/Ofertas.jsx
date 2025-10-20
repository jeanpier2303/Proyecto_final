/* 
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import '../../src/assets/styles/Ofertas.css';

const Ofertas = ({ user }) => {
const _greeting = user ? `Bienvenido, ${user.name}` : "Ofertas públicas";
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersQuery = query(
          collection(db, 'offers'),
          where('active', '==', true),
          where('endDate', '>=', new Date()),
          orderBy('endDate', 'asc')
        );
        
        const querySnapshot = await getDocs(offersQuery);
        const offersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setOffers(offersData);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    if (selectedOffer) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(selectedOffer.endDate));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedOffer, timeLeft]);

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-fruit"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎁
        </motion.div>
        <p>Cargando ofertas...</p>
      </div>
    );
  }

  return (
    <>
      <section className="special-offers-page">
        <div className="container">
          <motion.div 
            className="offers-header"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Ofertas Especiales</h1>
            <p>Descuentos exclusivos y promociones limitadas</p>
          </motion.div>

          <AnimatePresence>
            {offers.length === 0 ? (
              <motion.div
                className="no-offers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3>No hay ofertas disponibles en este momento</h3>
                <p>Vuelve pronto para no perderte nuestras promociones</p>
                <motion.div
                  className="sad-emoji"
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  😔
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="offers-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {offers.map(offer => (
                  <motion.div
                    key={offer.id}
                    className="offer-card"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -10,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    onClick={() => setSelectedOffer(offer)}
                  >
                    <div className="offer-badge">{offer.discount}% OFF</div>
                    
                    <motion.div 
                      className="offer-image"
                      whileHover={{ rotate: 5 }}
                    >
                      <span className="offer-emoji">{offer.emoji}</span>
                    </motion.div>

                    <div className="offer-content">
                      <h3>{offer.title}</h3>
                      <p>{offer.description}</p>
                      
                      <div className="offer-pricing">
                        <span className="original-price">${offer.originalPrice}</span>
                        <span className="discount-price">${offer.discountPrice}</span>
                      </div>

                      <div className="offer-meta">
                        <span className="time-left">
                          ⏰ {Math.floor((new Date(offer.endDate) - new Date()) / (1000 * 60 * 60 * 24))} días
                        </span>
                        <span className="stock-left">
                          📦 {offer.stock} disponibles
                        </span>
                      </div>

                      <motion.button
                        className="btn-offer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Aprovechar Oferta
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

   
      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            className="offer-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOffer(null)}
          >
            <motion.div
              className="offer-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-modal"
                onClick={() => setSelectedOffer(null)}
              >
                ×
              </button>

              <div className="modal-content">
                <div className="modal-header">
                  <motion.div 
                    className="modal-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedOffer.discount}% OFF
                  </motion.div>
                  <h2>{selectedOffer.title}</h2>
                  <p>{selectedOffer.detailedDescription}</p>
                </div>

                <div className="modal-body">
                  <motion.div 
                    className="modal-image"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <span className="modal-emoji">{selectedOffer.emoji}</span>
                  </motion.div>

                  <div className="modal-details">
                    <div className="pricing">
                      <span className="original">${selectedOffer.originalPrice}</span>
                      <span className="final">${selectedOffer.discountPrice}</span>
                    </div>

                    <div className="countdown">
                      <h4>¡Oferta termina en!</h4>
                      <div className="countdown-timer">
                        <div className="time-unit">
                          <span className="time-value">{timeLeft.days || 0}</span>
                          <span className="time-label">Días</span>
                        </div>
                        <div className="time-unit">
                          <span className="time-value">{timeLeft.hours || 0}</span>
                          <span className="time-label">Horas</span>
                        </div>
                        <div className="time-unit">
                          <span className="time-value">{timeLeft.minutes || 0}</span>
                          <span className="time-label">Min</span>
                        </div>
                        <div className="time-unit">
                          <span className="time-value">{timeLeft.seconds || 0}</span>
                          <span className="time-label">Seg</span>
                        </div>
                      </div>
                    </div>

                    <div className="stock-info">
                      <p>📦 <strong>{selectedOffer.stock}</strong> unidades disponibles</p>
                      <p>🚚 Entrega en 24 horas</p>
                    </div>

                    <motion.button
                      className="btn-modal-offer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Agregar al Carrito - ${selectedOffer.discountPrice}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Ofertas; */