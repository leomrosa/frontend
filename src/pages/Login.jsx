// src/pages/Login.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { font } from "../theme/typography";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[Login.jsx] Submeter formulário de login:", { email });

    try {
      // login() vem do AuthContext e faz fetch ao backend
      const userData = await login(email, password);
      console.log("[Login.jsx] ✅ Login bem sucedido:", userData);

      // redireciona para o dashboard
      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error("[Login.jsx] ✖ Erro no login:", err);
      alert("Falha no login. Verifica as credenciais.");
    }
  };

  return (
    <>
      <Header />
      <main
        style={{
          backgroundColor: colors.login.background,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: spacing.lg,
        }}
      >
        <div
          style={{
            backgroundColor: colors.login.formBg,
            padding: spacing.xl,
            borderRadius: 12,
            maxWidth: 400,
            width: "100%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: spacing.lg }}>
            Bem-vindo!
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: spacing.md }}>
              <label style={{ fontWeight: font.weight.bold }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: spacing.sm,
                  fontSize: font.size.base,
                  border: `1px solid ${colors.login.border}`,
                  borderRadius: 8,
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: spacing.md }}>
              <label style={{ fontWeight: font.weight.bold }}>Password</label>

              <div style={{ position: "relative" }}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: spacing.sm,
                    fontSize: font.size.base,
                    border: `1px solid ${colors.login.border}`,
                    borderRadius: 8,
                  }}
                />

                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: spacing.sm,
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className={`fa ${
                      passwordVisible ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </span>
              </div>
            </div>

            {/* Button */}
            <div style={{ textAlign: "center", marginTop: spacing.lg }}>
              <button
                type="submit"
                style={{
                  backgroundColor: colors.login.focus,
                  color: "#fff",
                  padding: spacing.sm,
                  fontSize: font.size.base,
                  borderRadius: 8,
                  border: "none",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;

