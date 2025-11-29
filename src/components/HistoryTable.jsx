import React from "react";
import PropTypes from "prop-types";

const HistoryTable = ({ data }) => {
  return (
    <div className="history-table-container">
      <h2>Histórico de Montantes Recebidos</h2>
      <div className="table-scroll">
        <table className="history-table">
          <thead>
            <tr>
              <th>Ano/Mês</th>
              <th># Sessões</th>
              <th>Sem Retenção</th>
              <th>Com Retenção</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.anoMes}</td>
                  <td>{item.sessoes}</td>
                  <td>{item.sRetencao}€</td>
                  <td>{item.cRetencao}€</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">Sem registros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

HistoryTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      anoMes: PropTypes.string,
      sessoes: PropTypes.number,
      sRetencao: PropTypes.number,
      cRetencao: PropTypes.number
    })
  ).isRequired
};

export default HistoryTable;
