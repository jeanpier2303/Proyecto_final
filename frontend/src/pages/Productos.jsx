/* import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocation } from 'react-router-dom';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import '../../src/assets/styles/App.css';

const Productos = ({ user }) => {
  const [products, setProducts] = useState([]);
  const _greeting = user ? `Bienvenido, ${user.name}` : "Productos disponibles"; 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories, ] = useState([]);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // ... (Hooks useEffect de fetching y filtrado - quedan igual) ...
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsQuery = query(
          collection(db, 'products'),
          where('active', '==', true),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(productsQuery);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        const uniqueCategories = [...new Set(productsData.map(p => p.category))];
        setCategories(['todos', ...uniqueCategories]);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location]);

  useEffect(() => {
    let filtered = products;

    if (activeCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, activeCategory, searchTerm]);
  // ... (Fin de los Hooks useEffect) ...

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
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };


  const productCardVariants = {
    ...itemVariants, 
    ...cardHoverVariants 
  };
  
  // Renderizado del Spinner de Carga
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
          🍎
        </motion.div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  // Renderizado principal del Catálogo
  return (
    <section className="products-catalog">
      <div className="container">
        <motion.div 
          className="catalog-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
     
          <h2>{_greeting}</h2> 
          <p className="catalog-subtitle">Directamente del campo a tu mesa</p>
          
          <div className="category-filters">
            {categories.map(category => (
              <motion.button
                key={category}
                className={`category-filter ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="category-icon">
                  {category === 'todos' ? '🍎' : 
                    category === 'uvas' ? '🍇' :
                    category === 'citricos' ? '🍊' :
                    category === 'tropicales' ? '🥭' :
                    category === 'berries' ? '🫐' : '🍏'}
                </span>
                {category === 'todos' ? 'Todos' : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {filteredProducts.length === 0 ? (
            <motion.div
              className="no-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>No se encontraron productos</h3>
              <p>Intenta con otros filtros o términos de búsqueda</p>
            </motion.div>
          ) : (
            <motion.div
              className="products-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              layout
            >
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  className="product-card"
           
                  variants={productCardVariants} 
                  initial="hidden" // Hacemos que comience con la animación de itemVariants
                  animate="visible" // Hacemos que termine con la animación de itemVariants
                  whileHover="hover" // Usa el estado 'hover' definido en cardHoverVariants
                  layout
                >
                  {product.featured && (
                    <motion.div 
                      className="featured-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Destacado
                    </motion.div>
                  )}
                  
                 
                  <motion.div 
                    className="product-image"
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <span className="fruit-emoji">{product.emoji}</span>
                    <motion.div 
                      className="stock-indicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {product.stock > 0 ? '✅' : '❌'}
                    </motion.div>
                  </motion.div>

                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    
                    <div className="product-meta">
                      <motion.span 
                        className="stock"
                        animate={{ 
                          color: product.stock > 0 ? 'var(--text-color)' : '#ff4444'
                        }}
                      >
                        {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
                      </motion.span>
                      <motion.span 
                        className="price"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        ${product.price}
                      </motion.span>
                    </div>

                    <motion.button
                      className={`btn-add-to-cart ${product.stock === 0 ? 'disabled' : ''}`}
                      whileHover={product.stock > 0 ? { scale: 1.05 } : {}}
                      whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
                      disabled={product.stock === 0}
                    >
                      {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Productos; */