import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import Contact from "../components/Contact";
import "../styles/Contact.css";

const ContactUs = () => {
  return (
    <>
      <Header />
      <main className="contact-us-page">
        <div className="contact-form-wrapper">
          <ContactForm />
        </div>
        <section className="contact-section">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;

