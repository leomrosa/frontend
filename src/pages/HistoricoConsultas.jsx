import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import "../styles/HistoricoConsultas.css";

const HistoricoConsultas = () => {
  const { user } = useAuth();

  // Exemplo de dados simulados
  const consultasPassadas = user?.consultasPassadas || [
    {
      id: "C001",
      data: "2025-03-15",
      profissional: "Joana Silva",
      especialidade: "Fisioterapia Desportiva",
      local: "Clínica Movimento, Lisboa",
      preco: 40,
      faturaUrl: "/faturas/fatura_C001.pdf"
    },
    {
      id: "C002",
      data: "2025-04-02",
      profissional: "Carlos Martins",
      especialidade: "Osteopatia",
      local: "Clínica Terapias Norte, Porto",
      preco: 35,
      faturaUrl: "/faturas/fatura_C002.pdf"
    }
  ];

  return (
    <>
      <Header />
      <main className="historico-page">
        <h2>Histórico de Consultas</h2>

        {consultasPassadas.length > 0 ? (
          <table className="historico-tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Profissional</th>
                <th>Especialidade</th>
                <th>Preço</th>
                <th>Fatura</th>
              </tr>
            </thead>
            <tbody>
              {consultasPassadas.map((c) => (
                <tr key={c.id}>
                  <td>{new Date(c.data).toLocaleDateString()}</td>
                  <td>{c.profissional}</td>
                  <td>{c.especialidade}</td>
                  <td>{c.preco.toFixed(2)}€</td>
                  <td>
                    <a href={c.faturaUrl} target="_blank" rel="noopener noreferrer" className="btn-fatura">
                      Ver Fatura
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Não existem consultas anteriores registadas.</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default HistoricoConsultas;

