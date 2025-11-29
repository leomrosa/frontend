import React, { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import "../styles/ProfileSection.css";
import cidadesFreguesias from "../data/cidadesFreguesias";

const ProfileSection = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("porReceber");
  const [bio, setBio] = useState(user.bio || "");
  const maxBioLength = 100;
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [foto, setFoto] = useState(null);
  const [idiomaSelecionado, setIdiomaSelecionado] = useState("");
  const [nivelSelecionado, setNivelSelecionado] = useState("");
  const [idiomasFalados, setIdiomasFalados] = useState([]);


  const especialidadesDisponiveis = {
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

  const [precos, setPrecos] = useState({
  "Fisioterapia": [
    {
      sub: "Fisioterapia Desportiva",
      preco: 40,
      permitirDesconto: true,
      pack5: 5,
      pack10: 10,
      pack15: 15,
      pack20: 0
    }
  ],
  "Osteopatia": [],
  "Enfermagem ao domicílio": []
});


  const [curriculoDocs, setCurriculoDocs] = useState([]);
  const [locaisTrabalho, setLocaisTrabalho] = useState([]);
  const [novoLocal, setNovoLocal] = useState("");
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");
  const [subespecialidadeSelecionada, setSubespecialidadeSelecionada] = useState("");

  const [areaCidade, setAreaCidade] = useState("");
  const [areaFreguesia, setAreaFreguesia] = useState("");
  const [areasAtuacao, setAreasAtuacao] = useState([]);


  const handleAddAreaAtuacao = () => {
    if (areaCidade && areaFreguesia) {
      const nova = `${areaCidade} - ${areaFreguesia}`;
      if (!areasAtuacao.includes(nova)) {
        setAreasAtuacao(prev => [...prev, nova]);
      }
      setAreaCidade("");
      setAreaFreguesia("");
    }
  };

  const handleRemoveAreaAtuacao = (index) => {
    setAreasAtuacao(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddDocumento = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const tipo = prompt("Tipo de documento (ex: Certificado, Declaração, CV)?");
    if (!tipo) return;
    setCurriculoDocs((prev) => [...prev, { file, tipo }]);
    e.target.value = null;
  };

  const handleRemoveDocumento = (index) => {
    setCurriculoDocs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddLocal = () => {
    if (novoLocal.trim()) {
      setLocaisTrabalho((prev) => [...prev, novoLocal.trim()]);
      setNovoLocal("");
    }
  };

  const handleRemoveLocal = (index) => {
    setLocaisTrabalho((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSalvarTudo = () => {
    alert("Todas as alterações foram guardadas com sucesso!");
  };

  const handleSalvarBio = () => {
    alert("Biografia atualizada!");
  };

  const handleSalvarPrecos = () => {
    alert("Preços e descontos atualizados!");
  };

  const handleAdicionarEspecialidade = () => {
  if (!especialidadeSelecionada) return;

  // Se tiver subespecialidade, usa-a; senão, usa o nome da especialidade como sub
  const novaSub = subespecialidadeSelecionada || especialidadeSelecionada;

  // Verifica se já existe esta subespecialidade na especialidade selecionada
  if (
    precos[especialidadeSelecionada]?.some(
      (item) => item.sub === novaSub
    )
  ) {
    alert("Esta subespecialidade já foi adicionada.");
    return;
  }

  const novaEntrada = {
    sub: novaSub,
    preco: 0,
    permitirDesconto: false,
    pack5: 0,
    pack10: 0,
    pack15: 0,
    pack20: 0
  };

  // Garante que precos continua como um objeto, não array
  setPrecos((prev) => {
    const novo = { ...prev };
    if (!novo[especialidadeSelecionada]) {
      novo[especialidadeSelecionada] = [];
    }
    novo[especialidadeSelecionada] = [...novo[especialidadeSelecionada], novaEntrada];
    return novo;
  });

  setEspecialidadeSelecionada("");
  setSubespecialidadeSelecionada("");
};

  const historyData = [
    { anoMes: "02/2025", sessoes: 8, sRetencao: 500, cRetencao: 450 },
    { anoMes: "01/2025", sessoes: 10, sRetencao: 600, cRetencao: 540 },
  ];


  return (
    <>
<section className="profile-form-section">
  <div className="profile-header">
    <div className="profile-title-centered">
      <h2>Perfil do Fisioterapeuta</h2>
      <p>Informações da sua conta:</p>
    </div>
    {foto && (
      <div className="foto-preview-canto">
        <img src={foto} alt="Foto de Perfil" />
      </div>
    )}
  </div>

  <div className="profile-form-grid">
    <div className="form-group">
      <label>Nome</label>
      <input type="text" value={user?.name || "Profissional"} readOnly />
    </div>

    <div className="form-group">
      <label>Utilizador</label>
      <input type="text" value={user?.username || "N/A"} readOnly />
    </div>

    <div className="form-group">
      <label>Data de Registo</label>
      <input type="text" value={user?.registrationDate || "N/A"} readOnly />
    </div>

    <div className="form-group">
      <label>Última Visita</label>
      <input type="text" value={user?.lastVisit || "N/A"} readOnly />
    </div>

    <div className="form-group">
      <label>Idade</label>
      <input
        type="number"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        placeholder="Ex: 32"
      />
    </div>

    <div className="form-group">
      <label>Sexo</label>
      <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
        <option value="">Selecionar</option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="outro">Outro</option>
      </select>
    </div>

    <div className="form-group foto-upload-col" style={{ gridColumn: "1 / -1" }}>
      <label>Fotografia de Perfil</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setFoto(URL.createObjectURL(file));
          }
        }}
      />
    </div>
  </div>
</section>



    

      <section className="curriculo-section">
        <h3>Biografia Profissional</h3>
        <textarea
          value={bio}
          onChange={(e) => {
            if (e.target.value.length <= maxBioLength) {
              setBio(e.target.value);
            }
          }}
          placeholder="Ex: Tenho mais de 10 anos de experiência em fisioterapia desportiva..."
          rows={4}
        />
        <div className="bio-footer">
          <small>{bio.length}/{maxBioLength} caracteres</small>
          <button className="bio-save-btn" onClick={handleSalvarBio}>
            Guardar Biografia
          </button>
        </div>
      </section>


      <section className="curriculo-section">
        <h3>Currículo Profissional</h3>
        <label>Anexar documento (PDF, JPG, DOC)</label>
        <input type="file" onChange={handleAddDocumento} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
        <ul>
          {curriculoDocs.map((doc, idx) => (
            <li key={idx}>
              {doc.file.name} ({doc.tipo}){" "}
              <button onClick={() => handleRemoveDocumento(idx)}>Remover</button>
            </li>
          ))}
        </ul>
        <h3>Experiencia Profissional</h3>
        <div className="dynamic-input">
          <input
            type="text"
            placeholder="Ex: Clínica ABC"
            value={novoLocal}
            onChange={(e) => setNovoLocal(e.target.value)}
          />
          <button onClick={handleAddLocal}>Adicionar</button>
        </div>
        <ul>
          {locaisTrabalho.map((local, i) => (
            <li key={i}>
              {local} <button onClick={() => handleRemoveLocal(i)}>Remover</button>
            </li>
          ))}
        </ul>
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <button className="save-all-btn" onClick={handleSalvarTudo}>
          Guardar Alterações
        </button>
      </div>

      </section>

      <section className="curriculo-section">
        <h3>Idiomas Falados</h3>
        <div className="dynamic-input">
          <select value={idiomaSelecionado} onChange={(e) => setIdiomaSelecionado(e.target.value)}>
            <option value="">Selecionar Idioma</option>
            <option value="Português">Português</option>
            <option value="Inglês">Inglês</option>
            <option value="Espanhol">Espanhol</option>
            <option value="Francês">Francês</option>
            <option value="Alemão">Alemão</option>
            <option value="Outro">Outro</option>
          </select>

          <select value={nivelSelecionado} onChange={(e) => setNivelSelecionado(e.target.value)}>
            <option value="">Selecionar Nível</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermédio">Intermédio</option>
            <option value="Fluente">Fluente</option>
            <option value="Nativo">Nativo</option>
          </select>

          <button
            onClick={() => {
              if (idiomaSelecionado && nivelSelecionado) {
                const novo = `${idiomaSelecionado} - ${nivelSelecionado}`;
                if (!idiomasFalados.includes(novo)) {
                  setIdiomasFalados((prev) => [...prev, novo]);
                }
                setIdiomaSelecionado("");
                setNivelSelecionado("");
              }
            }}
            disabled={!idiomaSelecionado || !nivelSelecionado}
          >
            Adicionar Idioma
          </button>
        </div>

        <ul className="area-list">
          {idiomasFalados.map((idioma, i) => (
            <li key={i} className="area-item">
              <span>{idioma}</span>
              <button onClick={() => setIdiomasFalados((prev) => prev.filter((_, index) => index !== i))}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      </section>



      <section className="curriculo-section">
        <h3>Áreas de Atuação</h3>
        <div className="dynamic-input">
          <select value={areaCidade} onChange={(e) => {
            setAreaCidade(e.target.value);
            setAreaFreguesia("");
          }}>
            <option value="">Selecionar Cidade</option>
            {Object.keys(cidadesFreguesias).map((cidade, idx) => (
              <option key={idx} value={cidade}>{cidade}</option>
            ))}
          </select>

          {areaCidade && (
            <select value={areaFreguesia} onChange={(e) => setAreaFreguesia(e.target.value)}>
              <option value="">Selecionar Freguesia</option>
              {cidadesFreguesias[areaCidade].map((freg, idx) => (
                <option key={idx} value={freg}>{freg}</option>
              ))}
            </select>
          )}

          <button onClick={handleAddAreaAtuacao} disabled={!areaCidade || !areaFreguesia}>
            Adicionar Área
          </button>
        </div>

        <ul className="area-list">
          {areasAtuacao.map((area, i) => (
            <li key={i} className="area-item">
              <span>{area}</span>
              <button onClick={() => handleRemoveAreaAtuacao(i)}>Remover</button>
            </li>
          ))}
        </ul>
      </section>





      <section className="edit-prices-section">
  <h3>Editar Preços e Descontos por Subespecialidade</h3>

  <div className="dynamic-input">
    <select
      value={especialidadeSelecionada}
      onChange={(e) => {
        setEspecialidadeSelecionada(e.target.value);
        setSubespecialidadeSelecionada("");
      }}
    >
      <option value="">Selecionar Especialidade</option>
      {Object.keys(especialidadesDisponiveis).map((esp) => (
        <option key={esp} value={esp}>{esp}</option>
      ))}
    </select>

    {especialidadeSelecionada && especialidadesDisponiveis[especialidadeSelecionada].length > 0 && (
      <select
        value={subespecialidadeSelecionada}
        onChange={(e) => setSubespecialidadeSelecionada(e.target.value)}
      >
        <option value="">Selecionar Subespecialidade</option>
        {especialidadesDisponiveis[especialidadeSelecionada].map((sub) => (
          <option key={sub} value={sub}>{sub}</option>
        ))}
      </select>
    )}

    <button
      onClick={handleAdicionarEspecialidade}
      disabled={
        !especialidadeSelecionada ||
        (especialidadesDisponiveis[especialidadeSelecionada].length > 0 && !subespecialidadeSelecionada)
      }
    >
      Adicionar
    </button>
  </div>

  {Object.entries(precos).map(([especialidade, lista]) =>
    lista.length > 0 ? (
      <div key={especialidade}>
        <h4>{especialidade}</h4>
        {lista.map((config, index) => (
          <div key={`${especialidade}-${index}`} className="preco-bloco">
            <div className="preco-row">
              <label>{config.sub || especialidade}</label>
              <input
                type="number"
                value={config.preco}
                onChange={(e) => {
                  const updated = { ...precos };
                  updated[especialidade][index].preco = Number(e.target.value);
                  setPrecos(updated);
                }}
              />
              <span>€</span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={config.permitirDesconto}
                  onChange={(e) => {
                    const updated = { ...precos };
                    updated[especialidade][index].permitirDesconto = e.target.checked;
                    setPrecos(updated);
                  }}
                />
                <span className="slider round"></span>
              </label>
              <span className="switch-label">Permitir desconto em packs</span>

              <button
                onClick={() => {
                  const updated = { ...precos };
                  updated[especialidade].splice(index, 1);
                  setPrecos(updated);
                }}
                className="remove-btn"
              >
                Remover
              </button>
            </div>

            {config.permitirDesconto && (
              <div className="descontos-row">
                {["pack5", "pack10", "pack15", "pack20"].map((key) => {
                  const maxValues = {
                    pack5: 2.5,
                    pack10: 5,
                    pack15: 7.5,
                    pack20: 10
                  };

                  return (
                    <div key={key}>
                      <label>Pack {key.replace("pack", "")}</label>
                      <input
                        type="number"
                        min={0}
                        max={maxValues[key]}
                        step={0.5}
                        value={config[key]}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= 0 && value <= maxValues[key]) {
                            const updated = { ...precos };
                            updated[especialidade][index][key] = value;
                            setPrecos(updated);
                          }
                        }}
                      />
                      <span>%</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : null
  )}

  <button onClick={handleSalvarPrecos}>Guardar Preços</button>
</section>

    </>
  );
};

export default ProfileSection;

