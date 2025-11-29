import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { font } from "../theme/typography";
import { border } from "../theme/border";

const Footer = () => {
  const links = [
    { label: "Home", path: "/" },
    { label: "Find a Therapist", path: "/find-a-therapist" },
    { label: "My Concerns", path: "/my-concerns" },
    { label: "About", path: "/about-us" },
    { label: "Register", path: "/register" },
    { label: "Contact Us", path: "/contact-us" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms-and-conditions" }
  ];

  return (
    <footer
      style={{
        backgroundColor: colors.home.footerBg,
        color: colors.home.footerText,
        padding: `${spacing.padding.lg}px 0`,
        textAlign: "center",
        fontFamily: "'Segoe UI', sans-serif"
      }}
    >
      <div style={{ marginBottom: spacing.margin.md }}>
        <h3 style={{
          margin: 0,
          fontSize: 14,
          fontWeight: font.weight.bold,
          letterSpacing: 1,
          textTransform: "uppercase"
        }}>
          QUICK LINKS
        </h3>
        <ul style={{
          listStyle: "none",
          padding: 0,
          marginTop: spacing.margin.sm,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: spacing.gap.lg
        }}>
          {links.map((item, index) => (
            <li key={index}>
              <Link to={item.path} style={{
                color: colors.base.white,
                textDecoration: "none",
                fontSize: 13
              }}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* linha horizontal */}
      <hr style={{
        width: "50%",
        margin: "0 auto",
        borderTop: `1px solid ${colors.base.lightGray}`,
        marginBottom: spacing.margin.sm
      }} />

      {/* texto inferior */}
      <p style={{
        fontSize: 12,
        color: colors.base.lightGray,
        margin: 0
      }}>
        © 2025 FisioHome. All Rights Reserved. Design & Developed by iGex Solutions
      </p>
    </footer>
  );
};

export default Footer;
