import React, { useState, useRef, useEffect } from 'react';
import './Footer.css';

const Footer = ({ toggleTheme, isDarkTheme, notifications = { email: 0, bell: 0 } }) => {
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [isBellPopupOpen, setIsBellPopupOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState([
    { id: 1, message: 'Novo e-mail 1', read: false },
    { id: 2, message: 'Novo e-mail 2', read: false },
  ]);
  const [bellNotifications, setBellNotifications] = useState([
    { id: 1, message: 'Nova notificação 1', read: false },
    { id: 2, message: 'Nova notificação 2', read: false },
  ]);

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

  const handleEmailNotificationClick = (id) => {
    setEmailNotifications(emailNotifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleBellNotificationClick = (id) => {
    setBellNotifications(bellNotifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const unreadEmailNotificationsCount = emailNotifications.filter(notification => !notification.read).length;
  const unreadBellNotificationsCount = bellNotifications.filter(notification => !notification.read).length;

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
        {unreadEmailNotificationsCount > 0 && (
          <span className="notification-badge">{unreadEmailNotificationsCount}</span>
        )}
        {isEmailPopupOpen && (
          <div id="email-popup" className="footer-popup">
            <ul>
              {emailNotifications.map(notification => (
                <li
                  key={notification.id}
                  className={`notification-item ${notification.read ? '' : 'unread'}`}
                  onClick={() => handleEmailNotificationClick(notification.id)}
                >
                  {!notification.read && <div className="unread-circle"></div>}
                  <span>{notification.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Ícone de Sino */}
      <div className="notification-icon bell" onClick={handleBellClick} ref={bellPopupRef}>
        <span className="icon">
          <img width="24" height="24" src="https://img.icons8.com/sf-regular-filled/100/appointment-reminders.png" alt="appointment-reminders" />
        </span>
        {unreadBellNotificationsCount > 0 && (
          <span className="notification-badge">{unreadBellNotificationsCount}</span>
        )}
        {isBellPopupOpen && (
          <div id="bell-popup" className="footer-popup">
            <ul>
              {bellNotifications.map(notification => (
                <li
                  key={notification.id}
                  className={`notification-item ${notification.read ? '' : 'unread'}`}
                  onClick={() => handleBellNotificationClick(notification.id)}
                >
                  {!notification.read && <div className="unread-circle"></div>}
                  <span>{notification.message}</span>
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