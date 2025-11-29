import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import logo from "../assets/logo.png";
import { colors } from "../theme/colors.js";
import { spacing } from "../theme/spacing.js";
import { border } from "../theme/border.js";
import { buttons } from "../theme/buttons.js";

const Header = ({ hideLoginButton, hideRegisterButton }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const especialidades = [
    "Fisioterapia",
    "Osteopatia",
    "Enfermagem ao domicílio"
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const goToProfile = () => {
    navigate(user?.role === "cliente" ? "/cliente" : "/fisioterapeuta");
  };

  const handleCategoriaClick = (categoria) => {
    navigate(`/find-a-therapist?especialidade=${encodeURIComponent(categoria)}`);
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        backgroundColor: colors.header.background,
        fontFamily: "'Segoe UI', sans-serif",
        boxShadow: border.shadow.default,
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: spacing.gap.lg }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: 28 }} />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {user?.role !== "fisioterapeuta" && (
            <>
              <div
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                style={{ position: "relative" }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: colors.header.text,
                    fontWeight: 400,
                    cursor: "pointer"
                  }}
                >
                  Find a Therapist
                </span>
                {showDropdown && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      zIndex: 10,
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      minWidth: 200,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }}
                  >
                    <li>
                      <Link
                        to="/find-a-therapist"
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          fontWeight: "bold",
                          backgroundColor: "#f9f9f9",
                          borderBottom: "1px solid #ddd",
                          color: "#333",
                          textDecoration: "none"
                        }}
                      >
                        Ver todos os profissionais
                      </Link>
                    </li>
                    {especialidades.map((cat, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleCategoriaClick(cat)}
                        style={{
                          padding: "10px 16px",
                          cursor: "pointer",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#f1f1f1")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "white")
                        }
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <NavLink to="/my-concerns" label="My Concerns" />
            </>
          )}

          <NavLink to="/about-us" label="About Us" />
          <NavLink to="/contact-us" label="Contact Us" />
          {!isAuthenticated && !hideRegisterButton && (
            <NavLink to="/register" label="Register" />
          )}
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {!isAuthenticated ? (
          !hideLoginButton && (
            <Link to="/login" style={buttons.primary}>
              Login
            </Link>
          )
        ) : (
          <>
            <button onClick={goToProfile} style={buttons.secondary}>
              Área Pessoal
            </button>
            <button onClick={handleLogout} style={buttons.primary}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    style={{
      fontSize: 14,
      textDecoration: "none",
      color: colors.header.text,
      fontWeight: 400
    }}
  >
    {label}
  </Link>
);

export default Header;
