import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/DisponibilidadeSection.css";
import { FiSave } from "react-icons/fi";

const localizer = momentLocalizer(moment);

const DisponibilidadeSection = () => {
  const [slots, setSlots] = useState(() => {
    const salvos = localStorage.getItem("disponibilidades");
    return salvos
      ? JSON.parse(salvos).map((s) => ({
          start: new Date(`${s.dia}T${s.horaInicio}`),
          end: new Date(`${s.dia}T${s.horaFim}`),
        }))
      : [];
  });

  useEffect(() => {
    const serializado = slots.map((s) => ({
      dia: moment(s.start).format("dddd"),
      horaInicio: moment(s.start).format("HH:mm"),
      horaFim: moment(s.end).format("HH:mm"),
    }));
    localStorage.setItem("disponibilidades", JSON.stringify(serializado));
  }, [slots]);

  const horariosSobrepostos = (novo) => {
    return slots.some((slot) => {
      const mesmoDia = moment(slot.start).format("dddd") === moment(novo.start).format("dddd");
      return (
        mesmoDia &&
        moment(novo.start).isBefore(slot.end) &&
        moment(novo.end).isAfter(slot.start)
      );
    });
  };

  const handleSlotSelect = ({ start, end }) => {
    const agora = moment();
    if (moment(start).isBefore(agora, "day")) {
      alert("Não é possível definir disponibilidade para datas anteriores a hoje.");
      return;
    }

    const novo = { start, end };

    const existe = slots.find(
      (s) => s.start.getTime() === start.getTime() && s.end.getTime() === end.getTime()
    );

    if (existe) {
      const atualizados = slots.filter(
        (s) => s.start.getTime() !== start.getTime() || s.end.getTime() !== end.getTime()
      );
      setSlots(atualizados);
    } else if (!horariosSobrepostos(novo)) {
      setSlots((prev) => [...prev, novo]);
    } else {
      alert("Este horário sobrepõe-se a outro no mesmo dia da semana.");
    }
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: "#28a745",
      color: "white",
      borderRadius: "6px",
      fontWeight: "bold",
      border: "none",
      padding: "4px 6px",
      cursor: "pointer",
      transition: "0.2s ease",
    },
  });

  return (
    <section className="disponibilidade-semanal">
      <h2>📅 Definir Disponibilidade Semanal</h2>
      <p>Clique e arraste no calendário para adicionar. Clique num bloco para removê-lo.</p>

      <div className="calendar-wrapper-wide">
        <Calendar
          localizer={localizer}
          defaultView={Views.WEEK}
          views={[Views.WEEK, Views.DAY]}
          selectable
          events={slots}
          onSelectSlot={handleSlotSelect}
          onSelectEvent={handleSlotSelect}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: "100%" }}
          messages={{
            week: "Semana",
            day: "Dia",
            today: "Hoje",
            next: "Seguinte",
            previous: "Anterior",
          }}
          eventPropGetter={eventStyleGetter}
          step={30}
          timeslots={2}
          min={new Date(0, 0, 0, 8, 0)}
          max={new Date(0, 0, 0, 20, 0)}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button className="guardar-btn">
          <FiSave style={{ marginRight: "6px", fontSize: "1.1rem" }} />
          Guardar Disponibilidade
        </button>
      </div>
    </section>
  );
};

export default DisponibilidadeSection;
