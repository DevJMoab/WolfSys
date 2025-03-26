import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
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
  const [notifications] = useState({
    email: 2,
    bell: 5,
    messages: 0
  });

  const { width } = useWindowSize();

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <Router>
      <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />

        <div className="content">
          <Header
            selectedMenu={selectedMenu}
            toggleTheme={toggleTheme}
            isDarkTheme={isDarkTheme}
            toggleSidebar={toggleSidebar}
            isSidebarCollapsed={collapsed}
            notifications={notifications}
          />

          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orcamentos" element={<Orcamentos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/financiamentos" element={<Financiamentos />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/colaboradores" element={<Colaboradores />} />
              <Route path="/contratos" element={<Contratos />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>

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