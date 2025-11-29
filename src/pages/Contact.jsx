import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <section className="contact-page">
      <h1>Contacte-nos</h1>
      <p>Entre em contacto connosco para qualquer dúvida ou assistência.</p>

      <div className="contact-info">
        <div className="info-block">
          <h4>Morada</h4>
          <p>74A, High Road, Wienstreet, London</p>
        </div>

        <div className="info-block">
          <h4>Telefone</h4>
          <p>0976 45-81-100</p>
        </div>

        <div className="info-block">
          <h4>Email</h4>
          <p>info@fisiohome.com</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
