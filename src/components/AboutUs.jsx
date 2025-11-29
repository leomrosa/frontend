import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-us-section">
      <div className="about-us-container">
        <div className="about-us-section-one">
          <h2>Sobre Nós</h2>
          <p>
            A HomeCare nasceu da visão de quatro colegas para melhorar os serviços de saúde,
            ligando diretamente pacientes e profissionais. Queremos proporcionar um acompanhamento
            mais personalizado no conforto do lar e valorizar os profissionais da área.
          </p>
          <p>
            Algumas zonas ainda podem estar limitadas consoante a localização dos colaboradores.
            Consulte o mapa de cobertura para mais detalhes.
          </p>
        </div>

        <div className="about-us-section-two">
          <h2>História dos Fundadores e da FisioHome</h2>
          <p>
            Acreditamos que cada pessoa é única e deve poder escolher o profissional mais adequado.
            Oferecemos serviços de fisioterapia nas áreas músculo-esquelética, cardiorrespiratória,
            neurologia, pediatria, pilates clínico, exercício terapêutico e muito mais.
          </p>
          <p>
            O nosso objetivo é elevar a qualidade e personalização da saúde, proporcionando
            liberdade e estabilidade aos profissionais e confiança aos pacientes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
