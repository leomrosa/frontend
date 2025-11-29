import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/ProximasConsultas.css";

const localizer = momentLocalizer(moment);

const ProximasConsultas = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  const [consultas, setConsultas] = useState(
    JSON.parse(localStorage.getItem("consultasAgendadas")) || []
  );

  const isConsultaFutura = (data, hora) => {
    const agora = moment();
    const dataHoraConsulta = moment(`${data} ${hora}`, "YYYY-MM-DD HH:mm");
    return dataHoraConsulta.isAfter(agora);
  };

  const tempoRestante = (data, hora) => {
    const dataHora = moment(`${data} ${hora}`, "YYYY-MM-DD HH:mm");
    const diffMin = dataHora.diff(moment(), "minutes");
    if (diffMin <= 0) return "Já ocorreu";
    const horas = Math.floor(diffMin / 60);
    const minutos = diffMin % 60;
    return `${horas}h ${minutos}min`;
  };

  const eventos = consultas.map((c, index) => ({
    id: index,
    title: `Consulta com ${c.nomeProfissional}`,
    start: new Date(`${c.data}T${c.hora}`),
    end: new Date(`${c.data}T${c.hora}`),
    allDay: false,
    detalhes: c,
    isFutura: isConsultaFutura(c.data, c.hora),
  }));

  const handleCancelarConsulta = (id) => {
    const confirmar = window.confirm("Tem a certeza que pretende cancelar esta consulta?");
    if (!confirmar) return;

    const atualizadas = consultas.filter((_, idx) => idx !== id);
    setConsultas(atualizadas);
    localStorage.setItem("consultasAgendadas", JSON.stringify(atualizadas));
    setEventoSelecionado(null);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.isFutura ? "#007bff" : "#888";
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "6px",
        border: "none",
        padding: "2px 6px",
      },
    };
  };

  return (
    <>
      <Header />
      <main className="proximas-consultas-page">
        <h2>Próximas Consultas</h2>

        {eventos.length === 0 ? (
          <p className="sem-consultas">Não tem consultas agendadas.</p>
        ) : (
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={{
              next: "Seguinte",
              previous: "Anterior",
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
              agenda: "Agenda",
              date: "Data",
              time: "Hora",
              event: "Consulta"
            }}
            onSelectEvent={(event) => setEventoSelecionado(event)}
            eventPropGetter={eventStyleGetter}
          />
        )}

        {eventoSelecionado && (
          <div className="modal-detalhes">
            <div className="modal-conteudo">
              <h3>Detalhes da Consulta</h3>
              <p><strong>Profissional:</strong> {eventoSelecionado.detalhes.nomeProfissional}</p>
              <p><strong>Especialidade:</strong> {eventoSelecionado.detalhes.especialidade || "—"}</p>
              {eventoSelecionado.detalhes.subespecialidade && (
                <p><strong>Subespecialidade:</strong> {eventoSelecionado.detalhes.subespecialidade}</p>
              )}
              <p><strong>Data:</strong> {eventoSelecionado.detalhes.data}</p>
              <p><strong>Hora:</strong> {eventoSelecionado.detalhes.hora}</p>
              {eventoSelecionado.detalhes.mensagem && (
                <p><strong>Mensagem:</strong> {eventoSelecionado.detalhes.mensagem}</p>
              )}
              <p><strong>Tempo restante:</strong> {tempoRestante(eventoSelecionado.detalhes.data, eventoSelecionado.detalhes.hora)}</p>

              <div className="modal-botoes">
                <button
                  className="cancelar-btn"
                  onClick={() => handleCancelarConsulta(eventoSelecionado.id)}
                  disabled={!isConsultaFutura(eventoSelecionado.detalhes.data, eventoSelecionado.detalhes.hora)}
                >
                  Cancelar Consulta
                </button>

                <button
                  className="reagendar-btn"
                  onClick={() => navigate(`/agendar/${eventoSelecionado.detalhes.profissionalId}`)}
                >
                  Reagendar
                </button>

                <button
                  className="fechar-btn"
                  onClick={() => setEventoSelecionado(null)}
                >
                  Fechar
                </button>
              </div>

              {!isConsultaFutura(eventoSelecionado.detalhes.data, eventoSelecionado.detalhes.hora) && (
                <p className="aviso-expirado">Esta consulta já ocorreu. Não pode ser cancelada.</p>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProximasConsultas;
