import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import profissionaisData from "../data/profissionais";
import "../styles/FindTherapist.css";

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

const FindTherapist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const especialidadeQuery = queryParams.get("especialidade") || "";

  const [especialidade, setEspecialidade] = useState(especialidadeQuery);
  const [subespecialidade, setSubespecialidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [freguesia, setFreguesia] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [nomeSearch, setNomeSearch] = useState("");

  useEffect(() => {
    setEspecialidade(especialidadeQuery);
    setSubespecialidade("");
  }, [especialidadeQuery]);

  const especialidades = [
    ...new Set(profissionaisData.flatMap(p => p.especialidadesDetalhadas.map(e => e.especialidade)))
  ];

  const localizacoes = [...new Set(profissionaisData.map(p => p.localizacao))];
  const freguesias = [...new Set(profissionaisData.map(p => p.freguesia).filter(Boolean))];

  const profissionaisFiltrados = profissionaisData.filter((p) => {
    const especialidades = p.especialidadesDetalhadas || [];

    const correspondeEspecialidade = especialidade === "" || especialidades.some(e => e.especialidade === especialidade);
    const correspondeSubespecialidade = subespecialidade === "" || especialidades.some(e => e.subespecialidade === subespecialidade);
    const correspondeNome = nomeSearch === "" || p.nome.toLowerCase().includes(nomeSearch.toLowerCase());
    const correspondeLocal = localizacao === "" || p.localizacao === localizacao;
    const correspondeFreguesia = freguesia === "" || p.freguesia === freguesia;

    const precoBase = especialidades.find(e =>
      (especialidade === "" || e.especialidade === especialidade) &&
      (subespecialidade === "" || e.subespecialidade === subespecialidade)
    )?.preco || 0;

    const dentroDoPrecoMin = precoMin === "" || precoBase >= parseFloat(precoMin);
    const dentroDoPrecoMax = precoMax === "" || precoBase <= parseFloat(precoMax);

    return correspondeEspecialidade &&
           correspondeSubespecialidade &&
           correspondeNome &&
           correspondeLocal &&
           correspondeFreguesia &&
           dentroDoPrecoMin &&
           dentroDoPrecoMax;
  });

  return (
    <>
      <Header />
      <main className="find-therapist-page">
        <section className="therapist-header">
          <h1>Encontre um Profissional</h1>
          <p>Filtre por especialidade, subespecialidade, cidade, freguesia, nome ou preço.</p>
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

          <select value={localizacao} onChange={(e) => setLocalizacao(e.target.value)}>
            <option value="">Todas as Cidades</option>
            {localizacoes.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>

          <select value={freguesia} onChange={(e) => setFreguesia(e.target.value)}>
            <option value="">Todas as Freguesias</option>
            {freguesias.map((freg, index) => (
              <option key={index} value={freg}>{freg}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Preço mín (€)"
            value={precoMin}
            onChange={(e) => setPrecoMin(e.target.value)}
            min="0"
          />

          <input
            type="number"
            placeholder="Preço máx (€)"
            value={precoMax}
            onChange={(e) => setPrecoMax(e.target.value)}
            min="0"
          />
        </section>

        <section className="lista-profissionais">
          {profissionaisFiltrados.length > 0 ? (
            profissionaisFiltrados.map((p) => {
              const especialidadesFiltradas = p.especialidadesDetalhadas.filter(e =>
                (especialidade === "" || e.especialidade === especialidade) &&
                (subespecialidade === "" || e.subespecialidade === subespecialidade)
              );

              const precoApresentado = especialidadesFiltradas?.[0]?.preco;

              return (
                <div key={p.id} className="card" onClick={() => navigate(`/profissional/${p.id}?especialidade=${especialidade}&subespecialidade=${subespecialidade}`)}>
                  <img src={p.foto} alt={p.nome} />
                  <h3>{p.nome}</h3>
                  <p>{p.localizacao}{p.freguesia ? ` · ${p.freguesia}` : ""}</p>

                  {especialidade === "" && subespecialidade === "" && (
                    <p className="subespecialidade">
                      {p.especialidadesDetalhadas.map(e => (
                        e.subespecialidade ? e.subespecialidade : e.especialidade
                      )).join(", ")}
                    </p>
                  )}

                  {(especialidade !== "" || subespecialidade !== "") && (
                    <p className="subespecialidade">
                      {especialidadesFiltradas.map(e => e.subespecialidade || e.especialidade).join(", ")}
                    </p>
                  )}

                  {precoApresentado !== undefined && (
                    <p><strong>{precoApresentado.toFixed(2)}€</strong></p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="nenhum-encontrado">Nenhum profissional encontrado com os filtros aplicados.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FindTherapist;

