import React, { useState, useEffect, useRef, useCallback } from 'react';
import { headerIcons, notifications } from './headerConfig';
import './Header.css';

const Header = ({
  selectedMenu,
  toggleTheme,
  isDarkTheme,
  toggleSidebar,
  isSidebarCollapsed,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isBellPopupOpen, setIsBellPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const userMenuRef = useRef(null);
  const emailPopupRef = useRef(null);
  const bellPopupRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (emailPopupRef.current && !emailPopupRef.current.contains(event.target)) {
        setIsEmailPopupOpen(false);
      }
      if (bellPopupRef.current && !bellPopupRef.current.contains(event.target)) {
        setIsBellPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserMenuClick = useCallback(() => {
    setIsUserMenuOpen((prev) => !prev);
  }, []);

  const handleEmailClick = useCallback(() => {
    setIsEmailPopupOpen((prev) => !prev);
  }, []);

  const handleBellClick = useCallback(() => {
    setIsBellPopupOpen((prev) => !prev);
  }, []);

  return (
    <header className="header">
      <div className='buttonSelectMenu'>
        {/* Botão de Recolhimento */}
        <button onClick={toggleSidebar} className="sidebar-toggle">
        <img
          width="24"
          height="24"
          src={isSidebarCollapsed ? headerIcons.menu.collapsed : headerIcons.menu.expanded}
          alt="Menu"
        />
      </button>

      {/* Nome do Menu Selecionado */}
      <div className="selected-menu">
        {selectedMenu}
      </div>
      </div>

      

      {/* Barra de Pesquisa */}
      <div className="search-bar">
        <input type="text" placeholder="Pesquisar" />
        <img
          width="20"
          height="20"
          src={headerIcons.search}
          alt="Pesquisar"
          className="search-icon"
        />
      </div>

      {/* Botões de Tema, Notificações e Menu de Usuário */}
      {!isMobile && (
        <div className="header-right">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Alternar tema">
            <img
              width="24"
              height="24"
              src={isDarkTheme ? headerIcons.theme.dark : headerIcons.theme.light}
              alt="Ícone de tema"
            />
          </button>

          <div className="notification-icon" onClick={handleEmailClick} ref={emailPopupRef}>
            <span className="icon">
              <img width="24" height="24" src={headerIcons.email} alt="E-mail" />
            </span>
            {notifications.email > 0 && (
              <span className="notification-badge">{notifications.email}</span>
            )}
            {isEmailPopupOpen && (
              <div className="notification-popup">
                <ul>
                  <li>Novo e-mail 1</li>
                  <li>Novo e-mail 2</li>
                  <li>Novo e-mail 3</li>
                </ul>
              </div>
            )}
          </div>

          <div className="notification-icon" onClick={handleBellClick} ref={bellPopupRef}>
            <span className="icon">
              <img width="24" height="24" src={headerIcons.bell} alt="Notificações" />
            </span>
            {notifications.bell > 0 && (
              <span className="notification-badge">{notifications.bell}</span>
            )}
            {isBellPopupOpen && (
              <div className="notification-popup">
                <ul>
                  <li>Nova notificação 1</li>
                  <li>Nova notificação 2</li>
                </ul>
              </div>
            )}
          </div>

          <div className="user-menu" onClick={handleUserMenuClick} ref={userMenuRef}>
            <div className="user-avatar">
              <img src="./images/user-avatar.jpg" alt="Avatar do usuário" />
            </div>
            <div className="user-info">
              <div className="user-name">Johan Moab</div>
              <div className="user-role">Admin</div>
            </div>
            <span className="user-menu-arrow">▼</span>

            {isUserMenuOpen && (
              <div className="user-menu-popup">
                <ul>
                  <li>Meu Perfil</li>
                  <li>Configurações</li>
                  <li>Sair</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;