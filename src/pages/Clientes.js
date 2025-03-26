import React, { useState, useEffect, useRef } from 'react';
import { IMaskInput } from 'react-imask';
import './Clientes.css';
import api from '../services/api';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroColuna, setFiltroColuna] = useState('nome');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    dataCadastro: new Date().toISOString().split('T')[0],
  });
  const [registrosPorPagina, setRegistrosPorPagina] = useState(8);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [mostrarPopupAcoes, setMostrarPopupAcoes] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const popupRef = useRef('');
  const [ordenacao, setOrdenacao] = useState({
    coluna: 'id',
    direcao: 'asc'
  });

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const clientesFiltradosOrdenados = clientes
    .filter(cliente => {
      const valorColuna = cliente[filtroColuna]?.toString().toLowerCase() || '';
      return valorColuna.includes(filtroTexto.toLowerCase());
    })
    .sort((a, b) => {
      // Ordenação especial para datas
      if (ordenacao.coluna === 'datanascimento') {
        const dataA = a.datanascimento ? new Date(a.datanascimento) : '';
        const dataB = b.datanascimento ? new Date(b.datanascimento) : '';
        
        if (ordenacao.direcao === 'asc') {
          return (dataA || 0) - (dataB || 0);
        } else {
          return (dataB || 0) - (dataA || 0);
        }
      }
      
      // Ordenação padrão para outros campos
      const valorA = a[ordenacao.coluna]?.toString().toLowerCase() || '';
      const valorB = b[ordenacao.coluna]?.toString().toLowerCase() || '';
      
      if (ordenacao.direcao === 'asc') {
        return valorA.localeCompare(valorB);
      } else {
        return valorB.localeCompare(valorA);
      }
    });

  const totalRegistros = clientesFiltradosOrdenados.length;
  const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);
  const inicio = (paginaAtual - 1) * registrosPorPagina;
  const fim = inicio + registrosPorPagina;
  const registrosPaginaAtual = clientesFiltradosOrdenados.slice(inicio, fim);

  const handleOrdenar = (coluna) => {
    setOrdenacao(prev => ({
      coluna,
      direcao: prev.coluna === coluna ? (prev.direcao === 'asc' ? 'desc' : 'asc') : 'asc'
    }));
  };

  const handleSalvarCliente = async () => {
    try {
      if (clienteSelecionado) {
        await api.put(`/clientes/${clienteSelecionado.id}`, novoCliente);
      } else {
        await api.post('/clientes', novoCliente);
      }
      fetchClientes();
      setMostrarFormulario(false);
      setNovoCliente({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        dataCadastro: new Date().toISOString().split('T')[0],
      });
      setClienteSelecionado('');
      alert(clienteSelecionado ? 'Cliente atualizado com sucesso!' : 'Cliente adicionado com sucesso!');
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data || error);
      alert(`Erro ao salvar cliente: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleExcluirCliente = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.')) {
      return;
    }
    
    try {
      await api.delete(`/clientes/${id}`);
      fetchClientes();
      alert('Cliente excluído com sucesso!');
      setMostrarPopupAcoes(false);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente. Tente novamente.');
    }
  };

  const handleEditarCliente = (cliente) => {
    const dataFormatada = cliente.dataNascimento
      ? new Date(cliente.dataNascimento).toISOString().split('T')[0]
      : '';

    setNovoCliente({
      ...cliente,
      dataNascimento: dataFormatada,
    });
    setClienteSelecionado(cliente);
    setMostrarFormulario(true);
  };

  const handleAbrirPopupAcoes = (event, cliente) => {
    event.stopPropagation();
    setClienteSelecionado(cliente);
    setMostrarPopupAcoes(true);
  };

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

  return (
    <div className="clientes-container">
      <div className="header-table">
        <div className="pesquisa-cliente">
          <select
            value={filtroColuna}
            onChange={(e) => setFiltroColuna(e.target.value)}
            className="select-pesquisa"
          >
            <option value="nome">Nome</option>
            <option value="cpf">CPF</option>
            <option value="email">E-mail</option>
            <option value="telefone">Telefone</option>
            <option value="dataNascimento">Data de Nascimento</option>
          </select>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            className="input-pesquisa"
          />
        </div>
        <button className="btn-adicionar" onClick={() => setMostrarFormulario(true)}>
          + Cliente
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleOrdenar('id')}>
              ID {ordenacao.coluna === 'id' && (
                <span>{ordenacao.direcao === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th onClick={() => handleOrdenar('nome')}>
              Nome {ordenacao.coluna === 'nome' && (
                <span>{ordenacao.direcao === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th onClick={() => handleOrdenar('cpf')}>
              CPF {ordenacao.coluna === 'cpf' && (
                <span>{ordenacao.direcao === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th onClick={() => handleOrdenar('datanascimento')}>
              Data de Nascimento {ordenacao.coluna === 'datanascimento' && (
                <span>{ordenacao.direcao === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th>Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {registrosPaginaAtual.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.datanascimento ? new Date(cliente.datanascimento).toLocaleDateString('pt-BR') : 'N/A'}</td>
              <td>
                {cliente.telefone && (
                  <a href={`tel:${cliente.telefone}`}>
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/ios-glyphs/24/phone--v1.png"
                      alt="phone--v1"
                      className="contato-icon"
                    />
                  </a>
                )}
                {cliente.email && (
                  <a href={`mailto:${cliente.email}`}>
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/ios-glyphs/24/new-post.png"
                      alt="new-post"
                      className="contato-icon"
                    />
                  </a>
                )}
              </td>
              <td>
                <button
                  className="acoes-btn"
                  onClick={(e) => handleAbrirPopupAcoes(e, cliente)}
                >
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/windows/32/menu-2.png"
                    alt="menu-2"
                  />
                </button>
                {mostrarPopupAcoes && clienteSelecionado?.id === cliente.id && (
                  <div className="popup-acoes" ref={popupRef}>
                    <button className="fechar-popup" onClick={() => setMostrarPopupAcoes(false)}>
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/ios-filled/16/delete-sign.png"
                        alt="Fechar"
                      />
                    </button>
                    <button onClick={() => handleEditarCliente(cliente)}>
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/ios-filled/16/edit.png"
                        alt="Editar"
                        style={{ marginRight: '5px' }}
                      />
                      Editar
                    </button>
                    <button onClick={() => handleExcluirCliente(cliente.id)}>
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/ios-filled/16/trash.png"
                        alt="Excluir"
                        style={{ marginRight: '5px' }}
                      />
                      Excluir
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="rodape-tabela">
        <span className="mostrando-registros">
          Mostrando {registrosPaginaAtual.length} de {totalRegistros} registros
        </span>
        <label className="registros-por-pagina">
          Registros por página:
          <input
            type="number"
            value={registrosPorPagina}
            onChange={(e) => setRegistrosPorPagina(Number(e.target.value))}
            min="1"
            max={totalRegistros}
          />
        </label>
        <div className="paginacao">
          <button onClick={() => setPaginaAtual(1)} disabled={paginaAtual === 1}>
            {"<<"}
          </button>
          <button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>
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
          <button
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            {">"}
          </button>
          <button
            onClick={() => setPaginaAtual(totalPaginas)}
            disabled={paginaAtual === totalPaginas}
          >
            {">>"}
          </button>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="formulario-popup">
          <h2>{clienteSelecionado ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
          <input
            type="text"
            placeholder="Nome"
            value={novoCliente.nome}
            onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
            maxLength={255}
          />
          <IMaskInput
            mask="000.000.000-00"
            placeholder="CPF"
            value={novoCliente.cpf}
            onChange={(e) => setNovoCliente({ ...novoCliente, cpf: e.target.value })}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={novoCliente.email}
            onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
            maxLength={200}
          />
          <IMaskInput
            mask="(00) 00000-0000"
            placeholder="Telefone"
            value={novoCliente.telefone}
            onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={novoCliente.dataNascimento}
            onChange={(e) => setNovoCliente({ ...novoCliente, dataNascimento: e.target.value })}
          />
          <input
            type="text"
            placeholder="Logradouro"
            value={novoCliente.logradouro}
            onChange={(e) => setNovoCliente({ ...novoCliente, logradouro: e.target.value })}
          />
          <input
            type="text"
            placeholder="Número"
            value={novoCliente.numero}
            onChange={(e) => setNovoCliente({ ...novoCliente, numero: e.target.value })}
            maxLength={10}
          />
          <input
            type="text"
            placeholder="Complemento"
            value={novoCliente.complemento}
            onChange={(e) => setNovoCliente({ ...novoCliente, complemento: e.target.value })}
          />
          <input
            type="text"
            placeholder="Bairro"
            value={novoCliente.bairro}
            onChange={(e) => setNovoCliente({ ...novoCliente, bairro: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cidade"
            value={novoCliente.cidade}
            onChange={(e) => setNovoCliente({ ...novoCliente, cidade: e.target.value })}
          />
          <input
            type="text"
            placeholder="Estado"
            value={novoCliente.estado}
            onChange={(e) => setNovoCliente({ ...novoCliente, estado: e.target.value })}
            maxLength={2}
          />
          <IMaskInput
            mask="00000-000"
            placeholder="CEP"
            value={novoCliente.cep}
            onChange={(e) => setNovoCliente({ ...novoCliente, cep: e.target.value })}
          />
          <div className="botoes-formulario">
            <button onClick={handleSalvarCliente}>Salvar</button>
            <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;