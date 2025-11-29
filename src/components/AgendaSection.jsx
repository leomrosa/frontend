import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/AgendaSection.css";

const appointments = [
  { date: "2025-05-30", hour: "10:00", patient: "Maria Santos" },
  { date: "2025-05-30", hour: "14:00", patient: "João Oliveira" },
  { date: "2025-05-31", hour: "09:00", patient: "Ana Costa" },
];

const AgendaSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredAppointments = appointments.filter(
    (appt) => new Date(appt.date).toDateString() === selectedDate.toDateString()
  );

  const hasAppointment = (date) =>
    appointments.some(
      (appt) => new Date(appt.date).toDateString() === date.toDateString()
    );

  return (
    <section className="agenda-section">
      <h2>Agenda Semanal</h2>
      <div className="agenda-grid">
        <div className="calendar-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            view="month"
            locale="pt-PT"
            tileContent={({ date, view }) =>
              view === "month" && hasAppointment(date) ? (
                <div className="dot" />
              ) : null
            }
          />
        </div>

        <div className="appointments-wrapper">
          <h3>Consultas para {selectedDate.toLocaleDateString("pt-PT")}</h3>
          {filteredAppointments.length > 0 ? (
            <ul className="appointment-list">
              {filteredAppointments.map((appt, idx) => (
                <li key={idx}>
                  <strong>{appt.hour}</strong> - {appt.patient}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sem consultas para este dia.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;

