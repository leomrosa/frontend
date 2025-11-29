// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ClientDashboard from "../pages/ClientDashboard";
import FindTherapist from "../pages/FindTherapist";
import MyConcerns from "../pages/MyConcerns";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EditClientProfile from "../pages/EditClientProfile";
import PhysioDashboard from "../pages/PhysioDashboard";
import ProfessionalProfile from "../pages/ProfessionalProfile";
import AgendarConsulta from "../pages/AgendarConsulta";
import MarcarConsultaCliente from "../pages/MarcarConsultaCliente";
import ProfissionalDetalhe from "../pages/ProfissionalDetalhe";
import HistoricoConsultas from "../pages/HistoricoConsultas";
import ProximasConsultas from "../pages/ProximasConsultas";
import { useAuth } from "../components/context/AuthContext";

// PrivateRoute inline no AppRoutes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return children;
};

// Redirecionamento baseado em role diretamente no AppRoutes
const RoleRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "patient":
      return <Navigate to="/cliente" replace />;
    case "physiotherapist":
      return <Navigate to="/fisioterapeuta" replace />;
    case "admin":
      return <Navigate to="/fisioterapeuta" replace />; // ou rota de admin
    default:
      return <Navigate to="/" replace />;
  }
};

const AppRoutes = () => (
  <Routes>
    {/* Rotas públicas */}
    <Route path="/" element={<HomePage />} />
    <Route path="/find-a-therapist" element={<FindTherapist />} />
    <Route path="/my-concerns" element={<MyConcerns />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profissional/:id" element={<ProfessionalProfile />} />
    <Route path="/agendar/:id" element={<AgendarConsulta />} />

    {/* Redirecionamento “/dashboard” → role-based */}
    <Route path="/dashboard" element={<RoleRedirect />} />

    {/* Rotas protegidas */}
    <Route
      path="/cliente"
      element={
        <PrivateRoute>
          <ClientDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/cliente/editar-perfil"
      element={
        <PrivateRoute>
          <EditClientProfile />
        </PrivateRoute>
      }
    />
    <Route
      path="/cliente/marcar-consulta"
      element={
        <PrivateRoute>
          <MarcarConsultaCliente />
        </PrivateRoute>
      }
    />
    <Route
      path="/cliente/historico"
      element={
        <PrivateRoute>
          <HistoricoConsultas />
        </PrivateRoute>
      }
    />
    <Route
      path="/cliente/proximas-consultas"
      element={
        <PrivateRoute>
          <ProximasConsultas />
        </PrivateRoute>
      }
    />

    <Route
      path="/fisioterapeuta"
      element={
        <PrivateRoute>
          <PhysioDashboard />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
