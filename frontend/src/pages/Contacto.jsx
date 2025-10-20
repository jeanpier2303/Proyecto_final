/* // pages/Contacto.jsx
import React, { useState } from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../../src/assets/styles/Contacto.css';

const Contacto = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        userId: user?.uid || null,
        createdAt: new Date(),
        status: 'new'
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error al enviar el mensaje. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  if (submitted) {
    return (
      <section className="contact-page">
        <div className="container">
          <motion.div
            className="success-message"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="success-icon"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.5 }}
            >
              ✅
            </motion.div>
            <h2>¡Mensaje Enviado!</h2>
            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
            <motion.button
              className="btn-back"
              onClick={() => setSubmitted(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enviar otro mensaje
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-page">
      <div className="container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Contáctanos</h1>
          <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
        </motion.div>

        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="contact-info"
            variants={itemVariants}
          >
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Información de Contacto
            </motion.h2>
            
            <motion.div 
              className="contact-cards"
              variants={containerVariants}
            >
              <motion.div 
                className="contact-card"
                whileHover="hover"
                variants={cardHoverVariants}
              >
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Teléfono</h3>
                  <p>+1 234 567 890</p>
                  <span>Lun-Vie 9:00-18:00</span>
                </div>
              </motion.div>

              <motion.div 
                className="contact-card"
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>info@frutospacifico.com</p>
                  <span>Respuesta en 24h</span>
                </div>
              </motion.div>

              <motion.div 
                className="contact-card"
                whileHover="hover"
                variants={cardHoverVariants}
              >
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Dirección</h3>
                  <p>Costa del Pacífico, Chile</p>
                  <span>Visita nuestro local</span>
                </div>
              </motion.div>

              <motion.div 
                className="contact-card"
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="contact-icon">💬</div>
                <div className="contact-details">
                  <h3>WhatsApp</h3>
                  <p>+1 234 567 891</p>
                  <span>Chat directo</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="social-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3>Síguenos en redes</h3>
              <div className="social-links">
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  📘
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  📷
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  🐦
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  💼
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Envíanos un Mensaje
            </motion.h2>

            <div className="form-row">
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </motion.div>

              <motion.div 
                className="form-group"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </motion.div>
            </div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="¿En qué podemos ayudarte?"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Describe tu consulta o sugerencia..."
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⏳
                </motion.span>
              ) : (
                'Enviar Mensaje 📨'
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacto; */