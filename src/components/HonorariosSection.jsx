import React, { useState } from "react";
import "../styles/HonorariosSection.css";

const HonorariosSection = () => {
  const [recibos, setRecibos] = useState([]);
  const [novoRecibo, setNovoRecibo] = useState(null);
  const [activeTab, setActiveTab] = useState("porReceber");

  const historyData = [
    { anoMes: "02/2025", sessoes: 8, sRetencao: 500, cRetencao: 450 },
    { anoMes: "01/2025", sessoes: 10, sRetencao: 600, cRetencao: 540 },
  ];

  const handleAnexarRecibo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setRecibos((prev) => [...prev, { file, data: new Date().toLocaleDateString() }]);
    setNovoRecibo(null);
  };

  const handleRemoverRecibo = (index) => {
    const updated = [...recibos];
    updated.splice(index, 1);
    setRecibos(updated);
  };

  return (
    <section className="honorarios-section">
      <h2>Gestão de Honorários</h2>

      <div className="upload-area">
        <label htmlFor="recibo-upload">Anexar Recibo Verde:</label>
        <input
          type="file"
          id="recibo-upload"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleAnexarRecibo}
        />
      </div>

      <h3>Recibos Submetidos</h3>
      {recibos.length === 0 ? (
        <p>Nenhum recibo submetido ainda.</p>
      ) : (
        <ul className="recibo-list">
          {recibos.map((r, i) => (
            <li key={i}>
              {r.file.name} — <em>{r.data}</em>
              <button onClick={() => handleRemoverRecibo(i)}>Remover</button>
            </li>
          ))}
        </ul>
      )}

      <div className="honorarios-caixa">
        <div className="billing-tabs">
          <button
            className={activeTab === "porReceber" ? "active" : ""}
            onClick={() => setActiveTab("porReceber")}
          >
            Por Receber
          </button>
          <button
            className={activeTab === "historico" ? "active" : ""}
            onClick={() => setActiveTab("historico")}
          >
            Histórico
          </button>
        </div>

        <div className="billing-content">
          {activeTab === "porReceber" && (
            <div className="billing-table">
              <h3>Montantes por Receber</h3>
              <table>
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Data</th>
                    <th># Sessões</th>
                    <th>A Receber</th>
                    <th>Com Retenção</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paciente Exemplo</td>
                    <td>2025/02</td>
                    <td>3</td>
                    <td>150€</td>
                    <td>Sim</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "historico" && (
            <div className="billing-table">
              <h3>Histórico de Recebimentos</h3>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th># Sessões</th>
                    <th>S/ Retenção</th>
                    <th>C/ Retenção</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.anoMes}</td>
                      <td>{item.sessoes}</td>
                      <td>{item.sRetencao}€</td>
                      <td>{item.cRetencao}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HonorariosSection;
