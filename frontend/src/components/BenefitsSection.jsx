import React from "react";

export default function BenefitsSection() {
  const beneficios = [
    {
      icono: "🍎",
      titulo: "100% Natural",
      texto: "Elaborados exclusivamente con frutas frescas, sin conservantes ni aditivos artificiales. Sabores puros directamente de la naturaleza.",
    },
    {
      icono: "🌿",
      titulo: "Ingredientes Orgánicos",
      texto: "Utilizamos frutas cultivadas de manera sostenible, respetando el medio ambiente y apoyando a comunidades locales.",
    },
    {
      icono: "⚡",
      titulo: "Energía Natural",
      texto: "Fuente natural de vitaminas y minerales que te dan energía para todo el día. Nutrición pura en cada sorbo.",
    },
  ];

  return (
    <section className="benefits">
      <div className="container">
        <div className="section-title">
          <h2>Beneficios Kahua</h2>
          <p>Nuestros productos están diseñados para brindarte lo mejor de la naturaleza en cada botella</p>
        </div>

        <div className="benefits-grid">
          {beneficios.map((b, i) => (
            <div key={i} className="benefit-card fade-in">
              <div className="benefit-icon">{b.icono}</div>
              <h3>{b.titulo}</h3>
              <p>{b.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
