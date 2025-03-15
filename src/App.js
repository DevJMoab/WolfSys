import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importe o Router
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import useWindowSize from './hooks/useWindowSize';
import Dashboard from './pages/Dashboard';
import Orcamentos from './pages/Orcamentos';
import Clientes from './pages/Clientes';
import Projetos from './pages/Projetos';
import Financiamentos from './pages/Financiamentos';
import Vendas from './pages/Vendas';
import Agenda from './pages/Agenda';
import Colaboradores from './pages/Colaboradores';
import Contratos from './pages/Contratos';
import Configuracoes from './pages/Configuracoes';
import './App.css';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [notifications] = useState({ email: 2, bell: 5 });

  const { width } = useWindowSize(); // Obtém a largura da tela

  // Função para alternar o estado do Sidebar (recolhido/expandido)
  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  // Função para alternar o tema (claro/escuro)
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <Router>
      <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />

        {/* Conteúdo principal */}
        <div className="content">
          {/* Header */}
          <Header
            selectedMenu={selectedMenu}
            toggleTheme={toggleTheme}
            isDarkTheme={isDarkTheme}
            toggleSidebar={toggleSidebar} // Passa a função para o Header
            isSidebarCollapsed={collapsed} // Passa o estado do Sidebar para o Header
            notifications={notifications}
          />

          {/* Main Content */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orcamentos" element={<Orcamentos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/financiamentos" element={<Financiamentos />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/colaboradores" element={<Colaboradores />} />
              <Route path="/contratos" element={<Contratos />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
          </div>
        </div>

        {/* Footer para telas pequenas */}
        {width <= 1000 && (
          <Footer
            toggleTheme={toggleTheme}
            isDarkTheme={isDarkTheme}
            notifications={notifications}
          />
        )}
      </div>
    </Router>
  );
}

export default App;