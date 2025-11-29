import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import profissionaisData from "../data/profissionais";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import "../styles/ProfessionalProfile.css";

const ProfessionalProfile = () => { 
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 necessário para ler query string
  const { isAuthenticated, user, login } = useAuth();
  const [packSize, setPackSize] = useState("5");

  const profissional = profissionaisData.find((p) => p.id === id);
  const saldo = user?.sessoesDisponiveis?.[profissional.id] || 0;

  const especialidadesDetalhadas = profissional?.especialidadesDetalhadas || [];

  const especialidadesUnicas = [...new Set(especialidadesDetalhadas.map(e => e.especialidade))];

  // 🔍 Lê especialidade/subespecialidade da query string
  const queryParams = new URLSearchParams(location.search);
  const especialidadeQuery = queryParams.get("especialidade") || "";
  const subespecialidadeQuery = queryParams.get("subespecialidade") || "";

  // 🔽 Define estados com base nos filtros recebidos (ou defaults)
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(
    especialidadeQuery && especialidadesUnicas.includes(especialidadeQuery)
      ? especialidadeQuery
      : especialidadesUnicas[0] || ""
  );

  const [subespecialidadeSelecionada, setSubespecialidadeSelecionada] = useState(subespecialidadeQuery || "");

  const subespecialidadesFiltradas = especialidadesDetalhadas
    .filter(e => e.especialidade === especialidadeSelecionada && e.subespecialidade)
    .map(e => e.subespecialidade);

  const precoAtual = especialidadesDetalhadas.find(
    e =>
      e.especialidade === especialidadeSelecionada &&
      (e.subespecialidade === subespecialidadeSelecionada || (!e.subespecialidade && !subespecialidadeSelecionada))
  )?.preco;

  const handleAgendar = () => {
    if (isAuthenticated) {
      navigate(`/agendar/${profissional.id}`);
    } else {
      navigate(`/login?redirect=/agendar/${profissional.id}`);
    }
  };

  const handleComprarPack = () => {
    if (isAuthenticated) {
      const novoSaldo = saldo + parseInt(packSize);
      const novoUser = {
        ...user,
        sessoesDisponiveis: {
          ...user.sessoesDisponiveis,
          [profissional.id]: novoSaldo
        }
      };
      login(novoUser);
      alert(`Compraste um pack de ${packSize} sessões com ${profissional.nome}.`);
    } else {
      navigate(`/login?redirect=/profissional/${profissional.id}`);
    }
  };

  if (!profissional) return <p>Profissional não encontrado.</p>;

  return (
    <>
      <Header />
      <main className="profile-page">
        <div className="profile-card">
          <img src={profissional.foto} alt={profissional.nome} className="profile-photo" />
          <h2>{profissional.nome}</h2>

          <div className="especialidade-selector">
            <label>Especialidade</label>
            <select
              value={especialidadeSelecionada}
              onChange={(e) => {
                setEspecialidadeSelecionada(e.target.value);
                setSubespecialidadeSelecionada("");
              }}
            >
              {especialidadesUnicas.map((esp, idx) => (
                <option key={idx} value={esp}>{esp}</option>
              ))}
            </select>

            {subespecialidadesFiltradas.length > 0 && (
              <>
                <label>Subespecialidade</label>
                <select
                  value={subespecialidadeSelecionada}
                  onChange={(e) => setSubespecialidadeSelecionada(e.target.value)}
                >
                  <option value="">Selecionar</option>
                  {subespecialidadesFiltradas.map((sub, idx) => (
                    <option key={idx} value={sub}>{sub}</option>
                  ))}
                </select>
              </>
            )}
          </div>

          <p className="localizacao">📍 {profissional.localizacao}</p>

          <p className="preco">
            💶 {precoAtual ? `${precoAtual.toFixed(2)}€` : "—"} / consulta
          </p>

          {isAuthenticated && saldo > 0 && (
            <p style={{ color: "#28a745", fontWeight: "bold", marginTop: "1rem" }}>
              Saldo de sessões disponíveis: {saldo}
            </p>
          )}

          <button className="agendar-btn" onClick={handleAgendar}>
            Agendar Consulta
          </button>

          <div className="pack-compra">
            <label htmlFor="pack">Ou compre um pack:</label>
            <select id="pack" value={packSize} onChange={(e) => setPackSize(e.target.value)}>
              <option value="5">Pack 5 Sessões</option>
              <option value="10">Pack 10 Sessões</option>
              <option value="15">Pack 15 Sessões</option>
              <option value="20">Pack 20 Sessões</option>
            </select>
            <button onClick={handleComprarPack}>Comprar Pack</button>
          </div>

          <section className="bio-section">
            <h3>Sobre o profissional</h3>
            <p>{profissional.bio || "Este profissional ainda não adicionou uma biografia."}</p>
          </section>


          {profissional.formacoes?.length > 0 && (
            <section className="formacoes-section">
              <h3>Formações</h3>
              <ul>
                {profissional.formacoes.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          {profissional.locaisTrabalho?.length > 0 && (
            <section className="locais-section">
              <h3>Experiência Profissional</h3>
              <ul>
                {profissional.locaisTrabalho.map((l, idx) => (
                  <li key={idx}>{l}</li>
                ))}
              </ul>
            </section>
          )}

          {profissional.idiomas?.length > 0 && (
            <section className="idiomas-section">
              <h3>Idiomas Falados</h3>
              <ul>
                {profissional.idiomas.map((i, idx) => (
                  <li key={idx}>
                    <strong>{i.idioma}</strong> — {i.nivel}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {profissional.areasAtuacao?.length > 0 && (
            <section className="atendimento-section">
              <h3>Zona de Atendimento</h3>
              <ul>
                {profissional.areasAtuacao.map((area, idx) => (
                  <li key={idx}>📍 {area}</li>
                ))}
              </ul>
            </section>
          )}



          <section className="avaliacoes">
            <h3>O que dizem os clientes</h3>
            <div className="avaliacao">
              <strong>Maria F.</strong> ★★★★★
              <p>Excelente profissional. Muito atenta e dedicada.</p>
            </div>
            <div className="avaliacao">
              <strong>João R.</strong> ★★★★☆
              <p>Ótimo acompanhamento pós-lesão. Recomendo.</p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfessionalProfile;

