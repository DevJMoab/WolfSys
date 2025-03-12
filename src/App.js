import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import useWindowSize from './hooks/useWindowSize';
import './App.css';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [notifications, setNotifications] = useState({ email: 2, bell: 5 });

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
          <h1>Conteúdo Principal</h1>
          <p>Este é o conteúdo principal da aplicação.</p>
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
  );
}

export default App;