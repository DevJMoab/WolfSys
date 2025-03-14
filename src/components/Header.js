import React, { useState, useRef, useEffect } from 'react';
import { headerIcons } from './headerConfig';
import './Header.css';

const Header = ({ selectedMenu, toggleTheme, isDarkTheme }) => {
  const [notifications, setNotifications] = useState({
    email: [
      { id: 1, message: "Novo e-mail 1", read: false },
      { id: 2, message: "Novo e-mail 2", read: false },
    ],
    bell: [
      { id: 1, message: "Nova notificação 1", read: false },
      { id: 2, message: "Nova notificação 2", read: false },
    ],
  });

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isBellPopupOpen, setIsBellPopupOpen] = useState(false);

  // Referências para os popups
  const userMenuRef = useRef(null);
  const emailPopupRef = useRef(null);
  const bellPopupRef = useRef(null);

  // Fechar popups ao clicar fora
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Marcar notificação como lida
  const markAsRead = (type, id) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: prev[type].map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      ),
    }));
  };

  // Contar notificações não lidas
  const unreadEmailCount = notifications.email.filter((n) => !n.read).length;
  const unreadBellCount = notifications.bell.filter((n) => !n.read).length;

  // Abrir/fechar o menu do usuário
  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="header">
      {/* Nome do Menu Selecionado */}
      <div className="selected-menu">
        {selectedMenu}
      </div>

      {/* Barra de Pesquisa */}
      <div className="search-bar">
        <input type="text" placeholder="Pesquisar" />
        <img
          width="20"
          height="20"
          src="https://img.icons8.com/ios-filled/20/888888/search--v1.png"
          alt="search"
          className="search-icon"
        />
      </div>

      {/* Botões de Tema, Notificações e Menu de Usuário */}
      <div className="header-right">
        {/* Botão de Tema */}
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkTheme ? (
            <img
              width="24"
              height="24"
              src={headerIcons.theme.dark}
              alt="sun"
            />
          ) : (
            <img
              width="24"
              height="24"
              src={headerIcons.theme.light}
              alt="full-moon"
            />
          )}
        </button>

        {/* Ícone de E-mail */}
        <div className="notification-icon" onClick={() => setIsEmailPopupOpen(!isEmailPopupOpen)} ref={emailPopupRef}>
          <span className="icon">
            <img width="24" height="24" src={headerIcons.email} alt="filled-message" />
          </span>
          {unreadEmailCount > 0 && (
            <span className="notification-badge">{unreadEmailCount}</span>
          )}
          {isEmailPopupOpen && (
            <div className="notification-popup">
              <ul>
                {notifications.email.map((notification) => (
                  <li
                    key={notification.id}
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                    onClick={() => markAsRead('email', notification.id)}
                  >
                    {!notification.read && <span className="unread-dot"></span>}
                    <span className="notification-text">{notification.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Ícone de Sino */}
        <div className="notification-icon" onClick={() => setIsBellPopupOpen(!isBellPopupOpen)} ref={bellPopupRef}>
          <span className="icon">
            <img width="24" height="24" src={headerIcons.bell} alt="appointment-reminders" />
          </span>
          {unreadBellCount > 0 && (
            <span className="notification-badge">{unreadBellCount}</span>
          )}
          {isBellPopupOpen && (
            <div className="notification-popup">
              <ul>
                {notifications.bell.map((notification) => (
                  <li
                    key={notification.id}
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                    onClick={() => markAsRead('bell', notification.id)}
                  >
                    {!notification.read && <span className="unread-dot"></span>}
                    <span className="notification-text">{notification.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Menu de Usuário */}
        <div className="user-menu" onClick={handleUserMenuClick} ref={userMenuRef}>
          <div className="user-avatar">
            <img src="./images/user-avatar.jpg" alt="User Avatar" />
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
    </header>
  );
};

export default Header;