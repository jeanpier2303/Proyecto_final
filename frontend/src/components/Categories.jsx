import React from 'react';
import { useInView } from 'react-intersection-observer';
import "bootstrap-icons/font/bootstrap-icons.css"; 

const CategoryCard = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`col-md-6 col-lg-3 mb-4 fade-in ${inView ? 'visible' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="category-card text-center">
        <div className="category-icon">
          <i className={icon}></i> 
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Categories = () => {
  const categories = [
    {
      icon: "bi bi-cup-straw", 
      title: "Jugos Clásicos",
      description:
        "Sabores tradicionales con un toque especial Kahua. Frescura garantizada en cada botella.",
    },
    {
      icon: "bi bi-flower3", 
      title: "Jugos Verdes",
      description:
        "Combinaciones detox llenas de nutrientes. Perfectos para empezar tu día con energía.",
    },
    {
      icon: "bi bi-brightness-alt-high", 
      title: "Mezclas Tropicales",
      description:
        "Explosión de sabores exóticos directamente desde los trópicos del Pacífico.",
    },
    {
      icon: "bi bi-lightning-charge", 
      title: "Energizantes",
      description:
        "Boosters naturales con superfoods para maximizar tu rendimiento físico y mental.",
    },
  ];

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>Nuestras Categorías</h2>
          <p>Descubre la variedad de sabores y beneficios que tenemos para ti</p>
        </div>
        <div className="row">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
