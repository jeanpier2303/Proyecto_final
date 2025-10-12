import React from "react";
import NavbarApp from "../../components/NavbarApp";
import HeroSection from "../../components/HeroSection";
import BenefitsSection from "../../components/BenefitsSection";
import CTASection from "../../components/CTASection";
import Footer from "../../components/Footer";
import "../../assets/styles/Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <NavbarApp />
      <HeroSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
