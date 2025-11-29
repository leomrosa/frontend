import React from "react";
import { useParams } from "react-router-dom";
import profissionaisData from "../data/profissionais";
import "../styles/PhysioProfile.css";

const PhysioProfile = () => {
  const { id } = useParams();
  const profissional = profissionaisData.find((p) => p.id === id);

  if (!profissional) return <p>Profissional não encontrado.</p>;

  return (
    <section className="public-profile">
      <div className="profile-header">
        <img src={profissional.foto} alt={profissional.nome} className="profile-photo" />
        <div>
          <h2>{profissional.nome}</h2>
          <p><strong>Especialidade:</strong> {(profissional.especialidadesDetalhadas || []).map(e => e.especialidade).join(", ")}</p>
          <p><strong>Localização:</strong> {profissional.localizacao}</p>
          <p><strong>Freguesia:</strong> {profissional.freguesia}</p>
          <p><strong>Preço:</strong> {(profissional.especialidadesDetalhadas[0]?.preco || 0).toFixed(2)}€</p>
        </div>
      </div>

      <div className="profile-description">
        <h3>Sobre o profissional</h3>
        <p>{profissional.bio || "Este profissional ainda não adicionou uma biografia."}</p>
      </div>

      <button className="schedule-button">Agendar Consulta</button>
    </section>
  );
};

export default PhysioProfile;
