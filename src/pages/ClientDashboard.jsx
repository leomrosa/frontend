import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import profissionais from "../data/profissionais";
import "../styles/ClientDashboard.css";

const dashboardItems = [
  {
    title: "Próximas Consultas",
    text: "Consulte as suas próximas sessões de fisioterapia.",
    action: "proximas"
  },
  {
    title: "Marcar Nova Consulta",
    text: "Agende uma nova sessão com o fisioterapeuta da sua escolha.",
    action: "marcar"
  },
  {
    title: "Editar Perfil",
    text: "Atualize os seus dados pessoais e preferências.",
    action: "editar"
  },
  {
    title: "Histórico de Consultas",
    text: "Veja as consultas anteriores já realizadas.",
    action: "historico"
  }
];

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const sessoesDisponiveis = user?.sessoesDisponiveis || {};

  const handleCardClick = (action) => {
    if (action === "editar") {
      navigate("/cliente/editar-perfil");
    } else if (action === "marcar") {
      navigate("/cliente/marcar-consulta");
    } else if (action === "historico") {
      navigate("/cliente/historico");
    } else if (action === "proximas") {
      navigate("/cliente/proximas-consultas");
    }
  };

  return (
    <>
      <Header />
      <main className="client-dashboard">
        <section className="dashboard-section">
          <h2>Bem-vindo{user?.name ? `, ${user.name}` : ""} à sua Área de Cliente</h2>

          <div className="cards-container">
            {dashboardItems.map((item, idx) => (
              <div className="dashboard-card" key={idx}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <button
                  onClick={() => item.action && handleCardClick(item.action)}
                  disabled={!item.action}
                >
                  Aceder
                </button>
              </div>
            ))}
          </div>

          {Object.keys(sessoesDisponiveis).length > 0 && (
            <div className="sessao-pendente">
              <h3>Sessões por Agendar</h3>
              {Object.entries(sessoesDisponiveis).map(([profId, count]) => {
                const prof = profissionais.find(p => p.id === profId);
                if (!prof || count <= 0) return null;
                return (
                  <div key={profId} className="sessao-bloco">
                    <p>
                      <strong>{prof.nome}</strong> — {count} sessão(ões) disponíveis
                    </p>
                    <button onClick={() => navigate(`/agendar/${profId}`)}>Agendar agora</button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ClientDashboard;
