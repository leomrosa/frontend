import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSection from "../components/ProfileSection";
import AgendaSection from "../components/AgendaSection";
import DisponibilidadeSection from "../components/DisponibilidadeSection";
import DocumentacaoSection from "../components/DocumentacaoSection";
import TratamentosSection from "../components/TratamentosSection";
import HonorariosSection from "../components/HonorariosSection";
import "../styles/PhysioDashboard.css";

const TABS = [
  { id: "perfil", label: "Perfil do Utilizador" },
  { id: "documentacao", label: "Documentação" },
  { id: "tratamentos", label: "Tratamentos" },
  { id: "agenda", label: "Agenda" },
  { id: "disponibilidade", label: "Disponibilidade" },
  { id: "honorarios", label: "Honorários" }
];

const PhysioDashboard = () => {
  const [activeTab, setActiveTab] = useState("perfil");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="dashboard-container">
        <div className="dashboard-box">
          <nav className="dashboard-nav">
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className={`tab-wrapper ${tab.id === "perfil" ? "has-dropdown" : ""}`}
                onMouseEnter={() => tab.id === "perfil" && setDropdownOpen(true)}
                onMouseLeave={() => tab.id === "perfil" && setDropdownOpen(false)}
              >
                <button
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === "perfil") setDropdownOpen(!dropdownOpen);
                  }}
                >
                  {tab.label}
                </button>

                {tab.id === "perfil" && dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><a href="#">Editar Perfil</a></li>
                    <li><a href="#">Dados para Pagamento</a></li>
                    <li><a href="#">Ausências</a></li>
                    <li><a href="#">Terminar Sessão</a></li>
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="dashboard-content">
            {activeTab === "perfil" && <ProfileSection />}
            {activeTab === "documentacao" && <DocumentacaoSection />}
            {activeTab === "agenda" && <AgendaSection />}
            {activeTab === "disponibilidade" && <DisponibilidadeSection />}
            {activeTab === "tratamentos" && <TratamentosSection />}
            {activeTab === "honorarios" && <HonorariosSection />}
          
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PhysioDashboard;

