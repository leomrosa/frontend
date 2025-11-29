import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import profissionaisData from "../data/profissionais";
import { useAuth } from "../components/context/AuthContext";
import "../styles/AgendarConsulta.css";

const disponibilidadeMock = {
  segunda: ["09:00", "10:00", "14:00"],
  terca: ["10:00", "11:00", "15:00"],
  quarta: ["09:30", "11:00", "16:00"],
  quinta: ["10:00", "13:00", "17:00"],
  sexta: ["09:00", "12:00", "14:30"]
};

const diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

const AgendarConsulta = () => {
  const { id } = useParams();
  const profissional = profissionaisData.find((p) => p.id === id);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [nome] = useState(user?.name || "");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const saldoAtual = user?.sessoesDisponiveis?.[profissional.id] || 0;

    if (saldoAtual > 0) {
      const novoUser = {
        ...user,
        sessoesDisponiveis: {
          ...user.sessoesDisponiveis,
          [profissional.id]: saldoAtual - 1,
        },
      };
      login(novoUser);
    }

    // Guardar no localStorage
    const novaConsulta = {
      profissionalId: profissional.id,
      nomeProfissional: profissional.nome,
      especialidade: profissional.especialidadesDetalhadas?.[0]?.especialidade || profissional.especialidade,
      subespecialidade: profissional.especialidadesDetalhadas?.[0]?.subespecialidade || profissional.subespecialidade || "",
      data,
      hora,
      mensagem
    };

    const existentes = JSON.parse(localStorage.getItem("consultasAgendadas")) || [];
    existentes.push(novaConsulta);
    localStorage.setItem("consultasAgendadas", JSON.stringify(existentes));

    alert(`Consulta com ${profissional.nome} marcada para ${data} às ${hora}.`);
    navigate("/cliente");
  };

  if (!profissional) return <p>Profissional não encontrado.</p>;

  const getHorariosDisponiveis = () => {
    if (!data) return [];
    const dia = new Date(data).getDay();
    const nomeDia = diasSemana[dia];
    return disponibilidadeMock[nomeDia] || [];
  };

  return (
    <>
      <Header />
      <main className="agendar-page">
        <div className="agendar-card">
          <h2>Agendar com {profissional.nome}</h2>
          <p className="especialidade">{profissional.especialidadesDetalhadas?.[0]?.especialidade}</p>
          {profissional.especialidadesDetalhadas?.[0]?.subespecialidade && (
            <p className="subespecialidade">{profissional.especialidadesDetalhadas[0].subespecialidade}</p>
          )}

          <form className="form-agendar" onSubmit={handleSubmit}>
            <label>Seu nome</label>
            <input type="text" value={nome} readOnly />

            <label>Data desejada</label>
            <input
              type="date"
              value={data}
              onChange={(e) => {
                setData(e.target.value);
                setHora("");
              }}
              required
            />

            {data && (
              <>
                <label>Horários disponíveis</label>
                <div className="horarios-grid">
                  {getHorariosDisponiveis().length > 0 ? (
                    getHorariosDisponiveis().map((h, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`hora-btn ${hora === h ? "hora-selecionada" : ""}`}
                        onClick={() => setHora(h)}
                      >
                        {h}
                      </button>
                    ))
                  ) : (
                    <p>Sem horários disponíveis para este dia.</p>
                  )}
                </div>
              </>
            )}

            {hora && (
              <>
                <label>Mensagem adicional (opcional)</label>
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={4}
                  placeholder="Ex: Tenho dores no ombro desde a semana passada..."
                />

                <button type="submit" className="confirmar-btn">Confirmar Agendamento</button>
              </>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AgendarConsulta;
