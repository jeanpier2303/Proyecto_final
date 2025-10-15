import React, { useState, useEffect } from "react";
import NavbarApp from "../../components/NavbarApp";
import HeroSection from "../../components/HeroSection";
import BenefitsSection from "../../components/BenefitsSection";
import Categories from "../../components/Categories";
import CTASection from "../../components/CTASection";
import Footer from "../../components/Footer";
import Particles from "../../components/Particles";
import Loader from "../../components/Loader";
import "../../assets/styles/Home.css";

export default function Home() {
  const [colorPalette, setColorPalette] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar paleta guardada al inicio
  useEffect(() => {
    const savedPalette = localStorage.getItem('kahua-color-palette');
    if (savedPalette) {
      setColorPalette(JSON.parse(savedPalette));
    }
  }, []);

  // Aplicar paleta de colores
  useEffect(() => {
    if (colorPalette) {
      applyColorPalette(colorPalette);
    }
  }, [colorPalette]);

  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 segundos de loader

    return () => clearTimeout(timer);
  }, []);

  const applyColorPalette = (palette) => {
    document.documentElement.style.setProperty('--primary-color', palette.primary);
    document.documentElement.style.setProperty('--secondary-color', palette.secondary);
    document.documentElement.style.setProperty('--accent-color', palette.accent);
    document.documentElement.style.setProperty('--dark-color', palette.dark);
    document.documentElement.style.setProperty('--light-color', palette.light);
    document.documentElement.style.setProperty('--text-color', palette.text);
  };

  return (
    <div className="home-page">
      {isLoading && <Loader />}
      <Particles />
      <NavbarApp />
      <HeroSection />
      <BenefitsSection />
      <Categories />
      <CTASection />
      <Footer />
    </div>
  );
}