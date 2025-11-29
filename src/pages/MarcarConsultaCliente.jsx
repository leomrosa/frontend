import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import profissionais from "../data/profissionais";
import "../styles/MarcarConsultaCliente.css";

const subespecialidadesPorEspecialidade = {
  "Fisioterapia": [
    "Fisioterapia Músculo-Esquelética",
    "Fisioterapia Neurológica",
    "Fisioterapia Respiratória",
    "Fisioterapia Cardiorrespiratória",
    "Fisioterapia Desportiva",
    "Fisioterapia Geriátrica",
    "Fisioterapia Pediátrica",
    "Fisioterapia na Saúde da Mulher",
    "Fisioterapia Uroginecológica",
    "Fisioterapia Oncológica",
    "Fisioterapia Dermatofuncional",
    "Fisioterapia Traumato-Ortopédica",
    "Fisioterapia Reumatológica",
    "Fisioterapia Vestibular (Reabilitação do equilíbrio)",
    "Fisioterapia Pélvica",
    "Fisioterapia em Cuidados Intensivos",
    "Fisioterapia Aquática",
    "Fisioterapia do Trabalho (Ergonomia e reabilitação ocupacional)"
  ],
  "Osteopatia": [],
  "Enfermagem ao domicílio": []
};

const MarcarConsultaCliente = () => {
  const { user } = useAuth();

  const [nomeSearch, setNomeSearch] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [subespecialidade, setSubespecialidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [freguesia, setFreguesia] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  const especialidades = [...new Set(profissionais.flatMap(p => p.especialidadesDetalhadas.map(e => e.especialidade)))];
  const localizacoes = [...new Set(profissionais.map(p => p.localizacao))];
  const freguesiasFiltradas = [...new Set(profissionais.filter(p => p.localizacao === localizacao).map(p => p.freguesia).filter(Boolean))];

  const aplicarFiltros = (lista) => {
    return lista.filter((p) => {
      const detalhes = p.especialidadesDetalhadas || [];

      const correspondeEspecialidade = especialidade === "" || detalhes.some(e => e.especialidade === especialidade);
      const correspondeSubespecialidade = subespecialidade === "" || detalhes.some(e => e.subespecialidade === subespecialidade);
      const correspondeNome = nomeSearch === "" || p.nome.toLowerCase().includes(nomeSearch.toLowerCase());
      const correspondeLocal = localizacao === "" || p.localizacao === localizacao;
      const correspondeFreguesia = freguesia === "" || p.freguesia === freguesia;

      const precoBase = detalhes.find(e =>
        (especialidade === "" || e.especialidade === especialidade) &&
        (subespecialidade === "" || e.subespecialidade === subespecialidade)
      )?.preco || 0;

      const dentroDoPrecoMin = precoMin === "" || precoBase >= parseFloat(precoMin);
      const dentroDoPrecoMax = precoMax === "" || precoBase <= parseFloat(precoMax);

      return (
        correspondeEspecialidade &&
        correspondeSubespecialidade &&
        correspondeNome &&
        correspondeLocal &&
        correspondeFreguesia &&
        dentroDoPrecoMin &&
        dentroDoPrecoMax
      );
    });
  };

  const favoritos = aplicarFiltros(profissionais.filter(p => user.favoritos?.includes(p.id)));
  const anteriores = aplicarFiltros(profissionais.filter(p => user.historico?.includes(p.id)));
  const outros = aplicarFiltros(profissionais.filter(p =>
    !user.favoritos?.includes(p.id) && !user.historico?.includes(p.id)
  ));

  const renderCards = (lista) => (
    lista.map((p) => {
      const detalhesFiltrados = p.especialidadesDetalhadas.filter(e =>
        (especialidade === "" || e.especialidade === especialidade) &&
        (subespecialidade === "" || e.subespecialidade === subespecialidade)
      );
      const preco = detalhesFiltrados[0]?.preco ?? Math.min(...p.especialidadesDetalhadas.map(e => e.preco));

      return (
        <div key={p.id} className="card" onClick={() => window.location.href = `/profissional/${p.id}?especialidade=${especialidade}&subespecialidade=${subespecialidade}`}>
          <img src={p.foto} alt={p.nome} />
          <h3>{p.nome}</h3>
          <p>{p.localizacao}{p.freguesia ? ` · ${p.freguesia}` : ""}</p>
          <p className="subespecialidade">
            {(especialidade || subespecialidade)
              ? detalhesFiltrados.map(e => e.subespecialidade || e.especialidade).join(", ")
              : p.especialidadesDetalhadas.map(e => e.subespecialidade || e.especialidade).join(", ")}
          </p>
          <p><strong>{preco.toFixed(2)}€</strong></p>
          <button className="agendar-btn">Agendar Consulta</button>
        </div>
      );
    })
  );

  return (
    <>
      <Header />
      <main className="find-therapist-page">
        <section className="therapist-header">
          <h1>Marcar Nova Consulta</h1>
          <p>Filtre por nome, especialidade, localização, freguesia ou preço.</p>
        </section>

        <section className="therapist-filter-section">
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            value={nomeSearch}
            onChange={(e) => setNomeSearch(e.target.value)}
          />

          <select value={especialidade} onChange={(e) => {
            setEspecialidade(e.target.value);
            setSubespecialidade("");
          }}>
            <option value="">Todas as Especialidades</option>
            {especialidades.map((esp, index) => (
              <option key={index} value={esp}>{esp}</option>
            ))}
          </select>

          {especialidade && subespecialidadesPorEspecialidade[especialidade]?.length > 0 && (
            <select value={subespecialidade} onChange={(e) => setSubespecialidade(e.target.value)}>
              <option value="">Todas as Subespecialidades</option>
              {subespecialidadesPorEspecialidade[especialidade].map((sub, idx) => (
                <option key={idx} value={sub}>{sub}</option>
              ))}
            </select>
          )}

          <select value={localizacao} onChange={(e) => {
            setLocalizacao(e.target.value);
            setFreguesia(""); // reset freguesia quando muda a cidade
          }}>
            <option value="">Todas as Localizações</option>
            {localizacoes.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>

          {localizacao && (
            <select value={freguesia} onChange={(e) => setFreguesia(e.target.value)}>
              <option value="">Todas as Freguesias</option>
              {freguesiasFiltradas.map((freg, idx) => (
                <option key={idx} value={freg}>{freg}</option>
              ))}
            </select>
          )}

          <input
            type="number"
            placeholder="Preço mín (€)"
            value={precoMin}
            onChange={(e) => setPrecoMin(e.target.value)}
          />

          <input
            type="number"
            placeholder="Preço máx (€)"
            value={precoMax}
            onChange={(e) => setPrecoMax(e.target.value)}
          />
        </section>

        {favoritos.length > 0 && (
          <section className="lista-profissionais">
            <h3 className="secao-titulo">Terapeutas Favoritos</h3>
            {renderCards(favoritos)}
          </section>
        )}

        {anteriores.length > 0 && (
          <section className="lista-profissionais">
            <h3 className="secao-titulo">Terapeutas Anteriores</h3>
            {renderCards(anteriores)}
          </section>
        )}

        {outros.length > 0 && (
          <section className="lista-profissionais">
            <h3 className="secao-titulo">Novos Profissionais</h3>
            {renderCards(outros)}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MarcarConsultaCliente;
