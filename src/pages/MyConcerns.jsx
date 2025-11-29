import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MyConcerns.css";

const FAQ_ITEMS = [
  {
    question: "Como sei qual o profissional que escolho?",
    answer: "A escolha do profissional deve ter por base inicial a área da saúde pela qual procura..."
  },
  {
    question: "Posso trocar de terapeuta após escolher?",
    answer: "Pode trocar de terapeuta a qualquer altura, caso já tenha pago as sessões..."
  },
  {
    question: "Preciso de entregar a fatura ao seguro, como faço?",
    answer: "Caso precise de entregar fatura no seguro, contacte-nos por email..."
  },
  {
    question: "Caso o terapeuta falte o que acontece?",
    answer: "Caso o terapeuta falte e não avise ou peça troca de horário com pelo menos 48h..."
  },
  {
    question: "Em que locais funciona a HomeCare?",
    answer: "De momento apenas estamos em Lisboa e Setúbal, porém pretendemos estender-nos..."
  },
  {
    question: "Como faço os pagamentos?",
    answer: "Os métodos de pagamento estarão disponíveis após fazer a reserva..."
  }
];

const MyConcerns = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <Header />
      <main className="my-concerns-page">
        <section className="concerns-header">
          <h1>Dúvidas Frequentes</h1>
          <p>Veja as respostas para as perguntas mais comuns ou contacte-nos diretamente.</p>
        </section>
        <section className="concerns-section">
          {FAQ_ITEMS.map((item, index) => (
            <div className="accordion-item" key={index}>
              <button
                className="accordion-button"
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
              </button>
              <div
                className={`accordion-content ${activeIndex === index ? "active" : ""}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MyConcerns;
