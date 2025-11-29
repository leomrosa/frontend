import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { colors, spacing } from "../theme/colors"; // <- Importar variáveis

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
      <main
        style={{
          padding: spacing.lg,
          backgroundColor: colors.background,
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <section
          style={{
            backgroundColor: colors.white,
            padding: `${spacing.xl}px ${spacing.lg}px`,
            borderRadius: 12,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            maxWidth: 500,
            width: "100%"
          }}
        >
          <h2
            style={{
              marginBottom: spacing.lg,
              textAlign: "center",
              color: colors.text
            }}
          >
            Editar Perfil
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: spacing.md }}>
              <label style={{ color: colors.textLabel, fontWeight: "600" }}>
                Nome Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: spacing.sm,
                  fontSize: 16,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`
                }}
              />
            </div>

            <div style={{ marginBottom: spacing.md }}>
              <label style={{ color: colors.textLabel, fontWeight: "600" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: spacing.sm,
                  fontSize: 16,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`
                }}
              />
            </div>

            <div style={{ marginBottom: spacing.md }}>
              <label style={{ color: colors.textLabel, fontWeight: "600" }}>
                Telefone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: spacing.sm,
                  fontSize: 16,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`
                }}
              />
            </div>

            <div style={{ textAlign: "center", marginTop: spacing.lg }}>
              <button
                type="submit"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  padding: "10px 24px",
                  borderRadius: 8,
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Guardar Alterações
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EditClientProfile;
