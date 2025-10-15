import React, { useEffect, useState } from 'react';
import '../assets/styles/Home.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Crear partículas para el loader
    createLoaderParticles();
    
    // Simular progreso de carga
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const createLoaderParticles = () => {
    const particlesContainer = document.getElementById('loaderParticles');
    if (!particlesContainer) return;

    // Limpiar partículas existentes
    particlesContainer.innerHTML = '';

    // Crear partículas para el loader
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      
      // Tamaños aleatorios
      const sizes = ['small', 'medium', 'large', 'special'];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      
      particle.classList.add('loader-particle', size);
      
      // Posición inicial aleatoria
      particle.style.left = `${Math.random() * 100}%`;
      
      // Animación
      particle.style.animationDuration = `${15 + Math.random() * 20}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="page-loader">
      <div className="loader-backdrop">
        {/* Partículas de fondo del loader */}
        <div className="loader-particles" id="loaderParticles"></div>

        {/* Contenido principal del loader */}
        <div className="loader-content">
          {/* Logo animado con partículas */}
          <div className="loader-logo">
            <div className="logo-circle">
              <div className="logo-inner"></div>
            </div>
          </div>

          {/* Texto animado */}
          <div className="loader-text">
            <h2 className="loader-title">
              <span className="letter">K</span>
              <span className="letter">a</span>
              <span className="letter">h</span>
              <span className="letter">u</span>
              <span className="letter">a</span>
              <span className="letter" style={{ marginLeft: '10px' }}>J</span>
              <span className="letter">u</span>
              <span className="letter">g</span>
              <span className="letter">o</span>
              <span className="letter">s</span>
            </h2>
            <p className="loader-subtitle">Cargando frescura natural...</p>
          </div>

          {/* Barra de progreso */}
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="progress-text">{Math.min(100, Math.round(progress))}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;