import React from "react";
import { colors } from "../theme/colors.js";
import IconLocation from "../assets/icon-location.png";
import IconPhone from "../assets/icon-phone.png";
import IconEmail from "../assets/icon-email.png";

const Contact = () => {
  const contacts = [
    {
      icon: IconLocation,
      title: "Office Address",
      text: "74A High Road, Wanstead, London, E11 7RJ"
    },
    {
      icon: IconPhone,
      title: "Telephone number",
      text: "078-4518-4100"
    },
    {
      icon: IconEmail,
      title: "Mail address",
      text: "info@geoatherapydirectory.com"
    }
  ];

  return (
    <section
      style={{
        backgroundColor: colors.work.background, // mesmo fundo do Work Process
        color: colors.home.contactText,
        padding: "60px 20px",
        textAlign: "center"
      }}
    >
      <h2>Contactos</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 30,
          maxWidth: 1000,
          margin: "0 auto"
        }}
      >
        {contacts.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
              width: 280
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <img src={item.icon} alt={item.title} style={{ width: 36 }} />
            </div>
            <h3 style={{ marginBottom: 8, fontSize: 16 }}>{item.title}</h3>
            <p style={{ fontSize: 14 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;
