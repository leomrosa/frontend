import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import profissionaisData from "../data/profissionais";
import "../styles/ProfissionalDetalhe.css";

const ProfissionalDetalhe = () => {
  const { id } = useParams();
  const profissional = profissionaisData.find((p) => p.id === id);

  if (!profissional) {
    return (
      <>
        <Header />
        <main className="profissional-detalhe">
          <p>Profissional não encontrado.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="profissional-detalhe">
        <div className="detalhe-card">
          <img src={profissional.foto} alt={profissional.nome} className="foto" />
          <h2>{profissional.nome}</h2>
          <p><strong>Especialidade:</strong> {profissional.especialidade}</p>
          {profissional.subespecialidade && (
            <p><strong>Subespecialidade:</strong> {profissional.subespecialidade}</p>
          )}
          <p><strong>Localização:</strong> {profissional.localizacao}</p>
          {profissional.freguesia && (
            <p><strong>Freguesia:</strong> {profissional.freguesia}</p>
          )}
          <p><strong>Preço:</strong> {profissional.preco}</p>

          {profissional.bio && (
            <div className="secao">
              <h4>Biografia</h4>
              <p>{profissional.bio}</p>
            </div>
          )}

          {profissional.formacoes && profissional.formacoes.length > 0 && (
            <div className="secao">
              <h4>Formações</h4>
              <ul>
                {profissional.formacoes.map((form, i) => <li key={i}>{form}</li>)}
              </ul>
            </div>
          )}

          {profissional.locaisTrabalho && profissional.locaisTrabalho.length > 0 && (
            <div className="secao">
              <h4>Locais de Trabalho</h4>
              <ul>
                {profissional.locaisTrabalho.map((loc, i) => <li key={i}>{loc}</li>)}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfissionalDetalhe;

