import React, { useState } from 'react';
import axios from 'axios';
import { format, parse } from 'date-fns';
import accounting from 'accounting-js';

const PesquisaTransferencias = () => {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [operador, setOperador] = useState('');
  const [transferencias, setTransferencias] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState('');
  const [saldoPeriodo, setSaldoPeriodo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/api/transferencias', {
        params: { dataInicio, dataFim, operador }
      });

      setTransferencias(response.data.transferencias);
      setSaldoTotal(response.data.saldoTotal);
      setSaldoPeriodo(response.data.saldoPeriodo);
    } catch (error) {
      console.error('Erro ao buscar transferências:', error);
    }
  };

  return (
    <div>
      <h1>Pesquisar Transferências</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Data de início:</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>
        <div>
          <label>Data de fim:</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
        <div>
          <label>Nome do operador transacionado:</label>
          <input
            type="text"
            value={operador}
            onChange={(e) => setOperador(e.target.value)}
          />
        </div>
        <button type="submit">Pesquisar</button>
      </form>

      <h2>Saldo total: R$ {accounting.formatMoney(saldoTotal)}</h2>
      <h2>Saldo no período: R$ {accounting.formatMoney(saldoPeriodo)}</h2>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Valência</th>
            <th>Tipo</th>
            <th>Nome do operador transacionado</th>
          </tr>
        </thead>
        <tbody>
          {transferencias.map((transferencia) => (
            <tr key={transferencia.id}>
              <td>{format(parse(transferencia.data, 'dd/MM/yyyy', new Date()), 'dd/MM/yyyy')}</td>
              <td>R$ {accounting.formatMoney(transferencia.valencia)}</td>
              <td>{transferencia.tipo}</td>
              <td>{transferencia.nomeOperador}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PesquisaTransferencias;

