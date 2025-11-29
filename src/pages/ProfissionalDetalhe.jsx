import React from "react";
import { useParams } from "react-router-dom";
import profissionais from "../data/profissionais";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ProfissionalDetalhe.css";

const ProfissionalDetalhe = () => {
  const { id } = useParams();
  const profissional = profissionais.find((p) => p.id === id);

  if (!profissional) {
    return <p>Profissional não encontrado.</p>;
  }

  return (
    <>
      <Header />
      <main className="profissional-detalhe-page">
        <div className="detalhe-card">
          <img src={profissional.foto} alt={profissional.nome} className="foto-perfil" />
          <h2>{profissional.nome}</h2>
          <p><strong>Especialidade:</strong> {profissional.especialidade}</p>
          {profissional.subespecialidade && (
            <p><strong>Subespecialidade:</strong> {profissional.subespecialidade}</p>
          )}
          <p><strong>Cidade:</strong> {profissional.localizacao}</p>
          {profissional.freguesia && (
            <p><strong>Freguesia:</strong> {profissional.freguesia}</p>
          )}
          <p><strong>Preço por sessão:</strong> {profissional.preco}</p>

          {profissional.formacoes && profissional.formacoes.length > 0 && (
            <>
              <h3>Formações</h3>
              <ul>
                {profissional.formacoes.map((formacao, idx) => (
                  <li key={idx}>{formacao}</li>
                ))}
              </ul>
            </>
          )}

          {profissional.locaisTrabalho && profissional.locaisTrabalho.length > 0 && (
            <>
              <h3>Locais de Trabalho</h3>
              <ul>
                {profissional.locaisTrabalho.map((local, idx) => (
                  <li key={idx}>{local}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfissionalDetalhe;

