import React from "react";
import "../styles/Services.css";
import IconHome from "../assets/process-1.svg";
import IconOnline from "../assets/process-3.svg";
import IconOther from "../assets/process-1-1.svg";

const services = [
  {
    icon: IconHome,
    title: "Fisioterapia em casa",
    description: "Conforto, segurança e resultados. Avaliação no conforto do lar.",
    link: "#fisioterapia"
  },
  {
    icon: IconOnline,
    title: "Consulta Online",
    description: "Flexibilidade e resultados. Avaliação remota com qualidade.",
    link: "#consulta-online"
  },
  {
    icon: IconOther,
    title: "Outros serviços ao domicílio",
    description: "Psicologia e outras especialidades diretamente em sua casa.",
    link: "#outros-servicos"
  }
];

const Services = () => (
  <section className="services-section">
    <div className="services-container">
      {services.map((service, idx) => (
        <div key={idx} className="service-card">
          <img src={service.icon} alt={service.title} className="service-icon" />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <a href={service.link}>Saber mais →</a>
        </div>
      ))}
    </div>
  </section>
);

export default Services;
