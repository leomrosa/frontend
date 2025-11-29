import React, { useState } from "react";
import "../styles/TratamentosSection.css";
import modeloRelatorio from "../assets/DOC-20250709-WA0020.docx"; // Coloque o ficheiro na pasta /src/assets/

const TratamentosSection = () => {
  const [sessoes, setSessoes] = useState([
    { id: 1, data: "2024-05-10", paciente: "João Silva", relatorio: null },
    { id: 2, data: "2024-05-17", paciente: "Maria Costa", relatorio: null },
  ]);

  const handleUploadRelatorio = (file, index) => {
    if (!file) return;
    const updated = [...sessoes];
    updated[index].relatorio = file;
    setSessoes(updated);
  };

  return (
    <section className="tratamentos-section">
      <h2>Sessões Anteriores</h2>
      {sessoes.length === 0 ? (
        <p>Sem sessões registadas.</p>
      ) : (
        <table className="tratamentos-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Paciente</th>
              <th>Relatório</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {sessoes.map((sessao, index) => (
              <tr key={sessao.id}>
                <td>{sessao.data}</td>
                <td>{sessao.paciente}</td>
                <td>
                  {sessao.relatorio ? (
                    <span className="anexo-ok">✔ {sessao.relatorio.name}</span>
                  ) : (
                    <span className="anexo-falta">—</span>
                  )}
                </td>
                <td>
                  <a
                    href={modeloRelatorio}
                    download={`Modelo_Relatorio_${sessao.paciente}.docx`}
                  >
                    <button type="button">Baixar Modelo</button>
                  </a>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={(e) => handleUploadRelatorio(e.target.files[0], index)}
                    style={{ marginLeft: "8px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default TratamentosSection;
