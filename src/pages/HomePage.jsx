import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import Welcome from "../components/Welcome";
import WorkProcess from "../components/WorkProcess";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../styles/HomePage.css";

const HomePage = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      
      <section className="services-section">
        <h2 className="services-title">Our Services</h2>
        <Services />
      </section>

      <section className="about-section">
        <Welcome />
      </section>

      <section className="work-process-section">
        <WorkProcess />
      </section>
      
      <Contact />
    </main>
    <Footer />
  </>
);

export default HomePage;
