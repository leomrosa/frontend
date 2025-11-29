import React from "react";
import "../styles/Welcome.css";
import geriatriaImage from "../assets/fisioterapia-em-geriatria-3.jpg";

const Welcome = () => {
  return (
    <section className="welcome-section">
      <div className="welcome-container">
        <div className="welcome-image">
          <img src={geriatriaImage} alt="Fisioterapia em geriatria" />
        </div>
        <div className="welcome-text">
          <h2>Bem-vindo à HomeCare</h2>
          <p>
            A HomeCare é uma empresa portuguesa dedicada à melhoria e personalização dos serviços de saúde.
            Cada pessoa é diferente, e acreditamos que deve poder escolher o profissional de saúde mais adequado para si.
          </p>
          <p>
            Oferecemos uma plataforma simples e acessível onde pode selecionar o terapeuta mais indicado para o seu caso,
            promovendo confiança e proximidade entre paciente e profissional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
