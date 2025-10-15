import React from 'react';
import { useInView } from 'react-intersection-observer';

const BenefitCard = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`benefit-card fade-in ${inView ? 'visible' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="benefit-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "🍎",
      title: "100% Natural",
      description: "Elaborados exclusivamente con frutas frescas, sin conservantes ni aditivos artificiales. Sabores puros directamente de la naturaleza."
    },
    {
      icon: "🌿",
      title: "Ingredientes Orgánicos",
      description: "Utilizamos frutas cultivadas de manera sostenible, respetando el medio ambiente y apoyando a comunidades locales."
    },
    {
      icon: "⚡",
      title: "Energía Natural",
      description: "Fuente natural de vitaminas y minerales que te dan energía para todo el día. Nutrición pura en cada sorbo."
    }
  ];

  return (
    <section className="benefits">
      <div className="container">
        <div className="section-title">
          <h2>Beneficios Kahua</h2>
          <p>Nuestros productos están diseñados para brindarte lo mejor de la naturaleza en cada botella</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;