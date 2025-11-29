import React from "react";
import heroImage from "../assets/banner.png"; // ajusta o caminho conforme necessário
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { border } from "../theme/border";
import { font } from "../theme/typography";

const HeroSection = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundImage: `linear-gradient(${colors.home.heroBgOverlay}, ${colors.home.heroBgOverlay}), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
        padding: `0 ${spacing.padding.xl}px`,
        fontFamily: "'Segoe UI', sans-serif"
      }}
    >
      {/* Texto à esquerda */}
      <div style={{ color: colors.home.heroText, maxWidth: "45%" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: spacing.margin.sm }}>
          Saúde à distância de um clique
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.5 }}>
          Encontre os melhores profissionais e serviços de saúde ao seu alcance.
        </p>
      </div>

      {/* Formulário à direita */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: border.radius.lg,
          boxShadow: border.shadow.default,
          padding: spacing.padding.lg,
          maxWidth: 320,
          width: "100%"
        }}
      >
        <h2 style={{ fontSize: 18, marginBottom: spacing.margin.md, fontWeight: 600, color: "#111" }}>
          Encontre o melhor profissional para si:
        </h2>

        <form>
          {/* Campo de data */}
          <div style={{ marginBottom: spacing.margin.md }}>
            <label htmlFor="date" style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>
              Data:
            </label>
            <input
              type="date"
              id="date"
              required
              style={inputStyle}
            />
          </div>

          {/* Campo de localização */}
          <div style={{ marginBottom: spacing.margin.md }}>
            <label htmlFor="location" style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>
              Localização:
            </label>
            <select id="location" required defaultValue="" style={inputStyle}>
              <option value="" disabled>Selecione a localização</option>
              <option value="lisboa">Lisboa</option>
              <option value="porto">Porto</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: colors.base.primary,
              color: "#fff",
              padding: "10px",
              fontSize: 14,
              borderRadius: border.radius.sm,
              border: "none",
              cursor: "pointer"
            }}
          >
            Começar a procurar
          </button>
        </form>
      </div>
    </section>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14
};

export default HeroSection;
