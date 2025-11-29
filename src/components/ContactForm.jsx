import React from "react";
import "../styles/ContactForm.css";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <section className="contact-form-section">
      <h2>Formulário de Contacto</h2>
      <p>Preencha os campos abaixo. Responderemos o mais breve possível.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" placeholder="Nome Completo" aria-label="Nome" required />
          <input type="email" placeholder="Email" aria-label="Email" required />
          <input type="text" placeholder="Telemóvel" aria-label="Telemóvel" required />
        </div>
        <textarea placeholder="Questões ou dúvidas" aria-label="Mensagem" required />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default ContactForm;
