import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import "../styles/EditClientProfile.css";

const EditClientProfile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.username || "");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados atualizados:", { name, email, phone });
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <>
      <Header />
      <main className="edit-client-profile">
        <section className="profile-section">
          <h2>Editar Perfil</h2>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 912345678"
              />
            </div>

            <button type="submit" className="save-button">
              Guardar Alterações
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EditClientProfile;
