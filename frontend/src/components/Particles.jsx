/* Fragmentos de Frotend */
import React, { useEffect } from 'react';

const Particles = () => {
  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)', 'var(--dark-color)'];
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 20 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
    }
  };

  return <div className="particles" id="particles"></div>;
};

export default Particles;