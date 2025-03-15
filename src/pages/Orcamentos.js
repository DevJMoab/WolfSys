import React, { useState, useEffect, useRef } from 'react';
import './Orcamentos.css';

const Orcamentos = () => {
  const [orcamentos, setOrcamentos] = useState([
    { id: 1, nome: 'Juarez Gonçalves', potencia: '12kWp', data: '14/03/2025 - 11:50', valor: 'R$30.000,00', telefone: '(11) 99999-9999', email: 'juarez@example.com', whatsapp: '(11) 99999-9999', status: 'Pendente' },
    { id: 2, nome: 'Maria Silva', potencia: '10kWp', data: '15/03/2025 - 09:30', valor: 'R$25.000,00', telefone: '(11) 88888-8888', status: 'Negociando' },
    { id: 3, nome: 'Carlos Oliveira', potencia: '15kWp', data: '16/03/2025 - 14:20', valor: 'R$35.000,00', email: '(11) 77777-7777', status: 'Fechado' },
    { id: 4, nome: 'Ana Costa', potencia: '8kWp', data: '17/03/2025 - 10:10', valor: 'R$20.000,00', telefone: '(11) 66666-6666', status: 'Pendente' },
    { id: 5, nome: 'Pedro Santos', potencia: '20kWp', data: '18/03/2025 - 16:40', valor: 'R$40.000,00', email: '(11) 55555-5555', status: 'Negociando' },
    { id: 6, nome: 'Luiza Fernandes', potencia: '18kWp', data: '19/03/2025 - 12:00', valor: 'R$38.000,00', telefone: '(11) 44444-4444', status: 'Fechado' },
    { id: 7, nome: 'Juarez Gonçalves', potencia: '12kWp', data: '14/03/2025 - 11:50', valor: 'R$30.000,00', telefone: '(11) 99999-9999', status: 'Pendente' },
    { id: 8, nome: 'Maria Silva', potencia: '10kWp', data: '15/03/2025 - 09:30', valor: 'R$25.000,00', email: '(11) 88888-8888', status: 'Negociando' },
    { id: 9, nome: 'Carlos Oliveira', potencia: '15kWp', data: '16/03/2025 - 14:20', valor: 'R$35.000,00', whatsapp: '(11) 77777-7777', status: 'Fechado' },
    { id: 10, nome: 'Ana Costa', potencia: '8kWp', data: '17/03/2025 - 10:10', valor: 'R$20.000,00', email: '(11) 66666-6666', status: 'Pendente' },
    { id: 11, nome: 'Pedro Santos', potencia: '20kWp', data: '18/03/2025 - 16:40', valor: 'R$40.000,00', email: '(11) 55555-5555', status: 'Negociando' },
    { id: 12, nome: 'Luiza Fernandes', potencia: '18kWp', data: '19/03/2025 - 12:00', valor: 'R$38.000,00', whatsapp: '(11) 44444-4444', status: 'Fechado' },
    { id: 13, nome: 'Juarez Gonçalves', potencia: '12kWp', data: '14/03/2025 - 11:50', valor: 'R$30.000,00', whatsapp: '(11) 99999-9999', status: 'Pendente' },
    { id: 14, nome: 'Maria Silva', potencia: '10kWp', data: '15/03/2025 - 09:30', valor: 'R$25.000,00', whatsapp: '(11) 88888-8888', status: 'Negociando' },
    { id: 15, nome: 'Carlos Oliveira', potencia: '15kWp', data: '16/03/2025 - 14:20', valor: 'R$35.000,00', whatsapp: '(11) 77777-7777', status: 'Fechado' },
    { id: 16, nome: 'Ana Costa', potencia: '8kWp', data: '17/03/2025 - 10:10', valor: 'R$20.000,00', whatsapp: '(11) 66666-6666', status: 'Pendente' },
    { id: 17, nome: 'Pedro Santos', potencia: '20kWp', data: '18/03/2025 - 16:40', valor: 'R$40.000,00', whatsapp: '(11) 55555-5555', status: 'Negociando' },
    { id: 18, nome: 'Luiza Fernandes', potencia: '18kWp', data: '19/03/2025 - 12:00', valor: 'R$38.000,00', whatsapp: '(11) 44444-4444', status: 'Fechado' },
    { id: 19, nome: 'Juarez Gonçalves', potencia: '12kWp', data: '14/03/2025 - 11:50', valor: 'R$30.000,00', whatsapp: '(11) 99999-9999', status: 'Pendente' },
    { id: 20, nome: 'Maria Silva', potencia: '10kWp', data: '15/03/2025 - 09:30', valor: 'R$25.000,00', whatsapp: '(11) 88888-8888', status: 'Negociando' },
    { id: 21, nome: 'Carlos Oliveira', potencia: '15kWp', data: '16/03/2025 - 14:20', valor: 'R$35.000,00', whatsapp: '(11) 77777-7777', status: 'Fechado' },
    { id: 22, nome: 'Ana Costa', potencia: '8kWp', data: '17/03/2025 - 10:10', valor: 'R$20.000,00', whatsapp: '(11) 66666-6666', status: 'Pendente' },
    { id: 23, nome: 'Pedro Santos', potencia: '20kWp', data: '18/03/2025 - 16:40', valor: 'R$40.000,00', whatsapp: '(11) 55555-5555', status: 'Negociando' },
    { id: 24, nome: 'Luiza Fernandes', potencia: '18kWp', data: '19/03/2025 - 12:00', valor: 'R$38.000,00', whatsapp: '(11) 44444-4444', status: 'Fechado' },
  ]);

  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [ordenacao, setOrdenacao] = useState({ campo: 'id', ordem: 'asc' });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoOrcamento, setNovoOrcamento] = useState({
    nome: '',
    potencia: '',
    valor: '',
    telefone: '',
    email: '',
    whatsapp: '',
    status: 'Pendente',
  });
  const [registrosPorPagina, setRegistrosPorPagina] = useState(8);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [mostrarPopupAcoes, setMostrarPopupAcoes] = useState(false);
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
  const [posicaoPopup, setPosicaoPopup] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);

  // Fechar o pop-up ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setMostrarPopupAcoes(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filtrarOrcamentos = orcamentos.filter(orcamento => {
    if (filtroStatus === 'Todos') return true;
    return orcamento.status === filtroStatus;
  });

  const ordenarOrcamentos = (campo) => {
    const ordem = ordenacao.campo === campo && ordenacao.ordem === 'asc' ? 'desc' : 'asc';
    setOrdenacao({ campo, ordem });

    const orcamentosOrdenados = [...filtrarOrcamentos].sort((a, b) => {
      if (a[campo] < b[campo]) return ordem === 'asc' ? -1 : 1;
      if (a[campo] > b[campo]) return ordem === 'asc' ? 1 : -1;
      return 0;
    });

    setOrcamentos(orcamentosOrdenados);
  };

  const handleNovoOrcamento = () => {
    setMostrarFormulario(true);
  };

  const handleSalvar = () => {
    if (novoOrcamento.nome && novoOrcamento.potencia && novoOrcamento.valor) {
      if (orcamentoSelecionado) {
        // Editar orçamento existente
        const orcamentosAtualizados = orcamentos.map(orc =>
          orc.id === orcamentoSelecionado.id ? { ...novoOrcamento, id: orc.id, data: orc.data } : orc
        );
        setOrcamentos(orcamentosAtualizados);
        setOrcamentoSelecionado(null);
      } else {
        // Adicionar novo orçamento
        setOrcamentos([...orcamentos, { ...novoOrcamento, id: orcamentos.length + 1, data: new Date().toLocaleString() }]);
      }
      setNovoOrcamento({ nome: '', potencia: '', valor: '', telefone: '', email: '', whatsapp: '', status: 'Pendente' });
      setMostrarFormulario(false);
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  };

  const handleLimpar = () => {
    setNovoOrcamento({ nome: '', potencia: '', valor: '', telefone: '', email: '', whatsapp: '', status: 'Pendente' });
  };

  const handleCancelar = () => {
    if (novoOrcamento.nome || novoOrcamento.potencia || novoOrcamento.valor || novoOrcamento.telefone || novoOrcamento.email || novoOrcamento.whatsapp) {
      if (window.confirm('Deseja sair sem salvar?')) {
        setMostrarFormulario(false);
        setOrcamentoSelecionado(null);
      }
    } else {
      setMostrarFormulario(false);
      setOrcamentoSelecionado(null);
    }
  };

  const handleEditar = (orcamento) => {
    setNovoOrcamento(orcamento);
    setOrcamentoSelecionado(orcamento);
    setMostrarFormulario(true);
    setMostrarPopupAcoes(false);
  };

  const handleExcluir = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este orçamento?')) {
      setOrcamentos(orcamentos.filter(orc => orc.id !== id));
      setMostrarPopupAcoes(false);
    }
  };

  const totalRegistros = filtrarOrcamentos.length;
  const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);
  const inicio = (paginaAtual - 1) * registrosPorPagina;
  const fim = inicio + registrosPorPagina;
  const registrosPaginaAtual = filtrarOrcamentos.slice(inicio, fim);

  const handleRegistrosPorPaginaChange = (e) => {
    setRegistrosPorPagina(Number(e.target.value));
    setPaginaAtual(1);
  };

  const handleAbrirPopupAcoes = (event, orcamento) => {
    const botaoRect = event.target.getBoundingClientRect();
    setPosicaoPopup({
      top: botaoRect.top,
      left: botaoRect.left - 200, // Ajuste a posição horizontal
    });
    setOrcamentoSelecionado(orcamento);
    setMostrarPopupAcoes(true);
  };

  return (
    <div className="orcamentos-container">
      {/* Filtros */}
      <div className="filtros">
        <div className="buttonFilter">
          {['Todos', 'Pendente', 'Negociando', 'Fechado'].map((status) => (
            <button
              key={status}
              className={`filtro-btn ${filtroStatus === status ? 'active' : ''}`}
              onClick={() => setFiltroStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <button className='btn-no' onClick={handleNovoOrcamento}><span>+ </span>Novo Orçamento</button>
      </div>

      {/* Tabela */}
      <table>
        <thead>
          <tr>
            <th onClick={() => ordenarOrcamentos('id')}>
              ID {ordenacao.campo === 'id' && (ordenacao.ordem === 'asc' ? '↓' : '↑')}
            </th>
            <th onClick={() => ordenarOrcamentos('nome')}>
              Nome {ordenacao.campo === 'nome' && (ordenacao.ordem === 'asc' ? '↓' : '↑')}
            </th>
            <th onClick={() => ordenarOrcamentos('potencia')}>
              Potência {ordenacao.campo === 'potencia' && (ordenacao.ordem === 'asc' ? '↓' : '↑')}
            </th>
            <th onClick={() => ordenarOrcamentos('data')}>
              Data {ordenacao.campo === 'data' && (ordenacao.ordem === 'asc' ? '↓' : '↑')}
            </th>
            <th onClick={() => ordenarOrcamentos('valor')}>
              Valor {ordenacao.campo === 'valor' && (ordenacao.ordem === 'asc' ? '↓' : '↑')}
            </th>
            <th>Contato</th>
            <th onClick={() => ordenarOrcamentos('status')}>
              Status {ordenacao.campo === 'status' && (ordenacao.ordem === 'asc' ? '↓' : '↑')}
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {registrosPaginaAtual.map(orcamento => (
            <tr key={orcamento.id}>
              <td>{orcamento.id}</td>
              <td>{orcamento.nome}</td>
              <td>{orcamento.potencia}</td>
              <td>{orcamento.data}</td>
              <td>{orcamento.valor}</td>
              <td>
                {orcamento.telefone && (
                  <a href={`tel:${orcamento.telefone}`}>
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/ios-glyphs/24/phone--v1.png"
                      alt="phone--v1"
                      className="contato-icon"
                    />
                  </a>
                )}
                {orcamento.email && (
                  <a href={`mailto:${orcamento.email}`}>
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/ios-glyphs/24/new-post.png"
                      alt="new-post"
                      className="contato-icon"
                    />
                  </a>
                )}
                {orcamento.whatsapp && (
                  <a href={`https://wa.me/${orcamento.whatsapp.replace(/\D/g, '')}`}>
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/ios-glyphs/24/whatsapp.png"
                      alt="whatsapp"
                      className="contato-icon"
                    />
                  </a>
                )}
              </td>
              <td>
                <span className={`status cards ${orcamento.status.toLowerCase()}`}>{orcamento.status}</span>
              </td>
              <td>
                <button
                  className="acoes-btn"
                  onClick={(e) => handleAbrirPopupAcoes(e, orcamento)}
                >
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/windows/32/menu-2.png"
                    alt="menu-2"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rodapé da Tabela */}
      <div className="rodape-tabela">
        <span className="mostrando-registros">
          Mostrando {registrosPaginaAtual.length} de {totalRegistros} registros
        </span>
        <label className="registros-por-pagina">
          Registros por página:
          <input
            type="number"
            value={registrosPorPagina}
            onChange={handleRegistrosPorPaginaChange}
            min="1"
            max={totalRegistros}
          />
        </label>
        <div className="paginacao">
          <button className="paginacao-fl" onClick={() => setPaginaAtual(1)} disabled={paginaAtual === 1}>
            {"<<"}
          </button>
          <button className="paginacao-fl" onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>
            {"<"}
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPaginaAtual(i + 1)}
              className={paginaAtual === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button className="paginacao-fl"
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            {">"}
          </button>
          <button className="paginacao-fl"
            onClick={() => setPaginaAtual(totalPaginas)}
            disabled={paginaAtual === totalPaginas}
          >
            {">>"}
          </button>
        </div>
      </div>

      {/* Pop-up de Ações */}
      {mostrarPopupAcoes && (
        <div
          className="popup-acoes"
          ref={popupRef}
          style={{ top: posicaoPopup.top, left: posicaoPopup.left }}
        >
          <button className="fechar-popup" onClick={() => setMostrarPopupAcoes(false)}>
            <img
              width="16"
              height="16"
              src="https://img.icons8.com/ios-filled/16/delete-sign.png"
              alt="delete-sign"
            />
          </button>
          <button onClick={() => handleEditar(orcamentoSelecionado)}>Editar</button>
          <button onClick={() => handleExcluir(orcamentoSelecionado.id)}>Excluir</button>
        </div>
      )}

      {/* Formulário de Novo/Editar Orçamento */}
      {mostrarFormulario && (
        <div className="formulario-popup">
          <h2>{orcamentoSelecionado ? 'Editar Orçamento' : 'Novo Orçamento'}</h2>
          <input
            type="text"
            placeholder="Nome do Cliente"
            value={novoOrcamento.nome}
            onChange={(e) => setNovoOrcamento({ ...novoOrcamento, nome: e.target.value })}
          />
          <input
            type="text"
            placeholder="Potência"
            value={novoOrcamento.potencia}
            onChange={(e) => setNovoOrcamento({ ...novoOrcamento, potencia: e.target.value })}
          />
          <input
            type="text"
            placeholder="Valor"
            value={novoOrcamento.valor}
            onChange={(e) => setNovoOrcamento({ ...novoOrcamento, valor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={novoOrcamento.telefone}
            onChange={(e) => setNovoOrcamento({ ...novoOrcamento, telefone: e.target.value })}
          />
          <input
            type="text"
            placeholder="E-mail"
            value={novoOrcamento.email}
            onChange={(e) => setNovoOrcamento({ ...novoOrcamento, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={novoOrcamento.whatsapp}
            onChange={(e) => setNovoOrcamento({ ...novoOrcamento, whatsapp: e.target.value })}
          />
          <select
            value={novoOrcamento.status}
            onChange={(e) => setNovoOrcamento({ ...novoOrcamento, status: e.target.value })}
          >
            <option  value="Pendente">Pendente</option>
            <option  value="Negociando">Negociando</option>
            <option  value="Fechado">Fechado</option>
          </select>
          <div className="botoes-formulario">
            <button onClick={handleSalvar}>Salvar</button>
            <button onClick={handleLimpar}>Limpar</button>
            <button onClick={handleCancelar}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orcamentos;