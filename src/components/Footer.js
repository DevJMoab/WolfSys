import React from 'react';
import './Footer.css';

const Footer = ({ toggleTheme, isDarkTheme, notifications }) => {
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
      <div className="notification-icon">
        <span className="icon">
          <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/filled-message.png" alt="filled-message" />
        </span>
        {notifications.email > 0 && (
          <span className="notification-badge">{notifications.email}</span>
        )}
      </div>

      {/* Ícone de Sino */}
      <div className="notification-icon">
        <span className="icon">
          <img width="24" height="24" src="https://img.icons8.com/sf-regular-filled/100/appointment-reminders.png" alt="appointment-reminders" />
        </span>
        {notifications.bell > 0 && (
          <span className="notification-badge">{notifications.bell}</span>
        )}
      </div>

      {/* Menu de Usuário */}
      <div className="user-menu">
        <div className="user-avatar">
          <img src="./images/user-avatar.jpg" alt="User Avatar" />
        </div>
        <div className="user-info">
          <div className="user-name">Johan Moab</div>
          <div className="user-role">Admin</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
