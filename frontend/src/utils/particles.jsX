// utils/particles.js
export const createParticles = (containerId, count = 30) => {
  const particlesContainer = document.getElementById(containerId);
  if (!particlesContainer) return;

  // Limpiar partículas existentes
  particlesContainer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Tamaños aleatorios
    const sizes = ['small', 'medium', 'large', 'special'];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    particle.classList.add(size);
    
    // Posición inicial aleatoria
    particle.style.left = `${Math.random() * 100}%`;
    
    // Animación
    particle.style.animationDuration = `${15 + Math.random() * 20}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // Efecto twinkle aleatorio
    if (Math.random() > 0.7) {
      particle.classList.add('twinkle');
    }
    
    particlesContainer.appendChild(particle);
  }
};