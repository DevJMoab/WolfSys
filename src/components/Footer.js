import React, { useState, useRef, useEffect } from 'react';
import './Footer.css';

const Footer = ({ toggleTheme, isDarkTheme, notifications = { email: 0, bell: 0 } }) => {
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isBellPopupOpen, setIsBellPopupOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Referências para os popups
  const emailPopupRef = useRef(null);
  const bellPopupRef = useRef(null);
  const userMenuRef = useRef(null);

  // Fechar popups ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emailPopupRef.current && !emailPopupRef.current.contains(event.target)) {
        setIsEmailPopupOpen(false);
      }
      if (bellPopupRef.current && !bellPopupRef.current.contains(event.target)) {
        setIsBellPopupOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEmailClick = () => {
    setIsEmailPopupOpen(!isEmailPopupOpen);
    setIsBellPopupOpen(false); // Fecha o popup do sino se estiver aberto
    setIsUserMenuOpen(false); // Fecha o menu do usuário se estiver aberto
  };

  const handleBellClick = () => {
    setIsBellPopupOpen(!isBellPopupOpen);
    setIsEmailPopupOpen(false); // Fecha o popup do e-mail se estiver aberto
    setIsUserMenuOpen(false); // Fecha o menu do usuário se estiver aberto
  };

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsEmailPopupOpen(false); // Fecha o popup do e-mail se estiver aberto
    setIsBellPopupOpen(false); // Fecha o popup do sino se estiver aberto
  };

  return (
    <footer className="footer">
      {/* Botão de Tema */}
      <button onClick={toggleTheme} className="theme-toggle">
        {isDarkTheme ? (
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/wired/24/sun.png"
            alt="sun"
          />
        ) : (
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/wired/24/full-moon.png"
            alt="full-moon"
          />
        )}
      </button>

      {/* Ícone de E-mail */}
      <div className="notification-icon email" onClick={handleEmailClick} ref={emailPopupRef}>
        <span className="icon">
          <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/filled-message.png" alt="filled-message" />
        </span>
        {notifications.email > 0 && (
          <span className="notification-badge">{notifications.email}</span>
        )}
        {isEmailPopupOpen && (
          <div id="email-popup" className="footer-popup">
            <ul>
              <li>Novo e-mail 1</li>
              <li>Novo e-mail 2</li>
            </ul>
          </div>
        )}
      </div>

      {/* Ícone de Sino */}
      <div className="notification-icon bell" onClick={handleBellClick} ref={bellPopupRef}>
        <span className="icon">
          <img width="24" height="24" src="https://img.icons8.com/sf-regular-filled/100/appointment-reminders.png" alt="appointment-reminders" />
        </span>
        {notifications.bell > 0 && (
          <span className="notification-badge">{notifications.bell}</span>
        )}
        {isBellPopupOpen && (
          <div id="bell-popup" className="footer-popup">
            <ul>
              <li>Nova notificação 1</li>
              <li>Nova notificação 2</li>
            </ul>
          </div>
        )}
      </div>

      {/* Menu de Usuário */}
      <div className="user-menu" onClick={handleUserMenuClick} ref={userMenuRef}>
        <div className="user-avatar">
          <img src="./images/user-avatar.jpg" alt="User Avatar" />
        </div>
        {isUserMenuOpen && (
          <div id="user-menu-popup" className="footer-popup">
            <ul>
              <li>Meu Perfil</li>
              <li>Configurações</li>
              <li>Sair</li>
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;