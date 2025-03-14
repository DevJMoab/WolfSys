import React, { useState } from 'react';
import { menuItems } from './menuItems'; // Importe os itens do menu
import './Sidebar.css';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const [selectedItem, setSelectedItem] = useState(null); // Estado para o item selecionado

  const handleItemClick = (index) => {
    setSelectedItem(index); // Define o item selecionado
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Nome do Aplicativo, Logo e Versão */}
      <div className="app-header">
        <div className="app-logo">
          <img src="./images/logow.png" alt="Logo" />
        </div>
        {!collapsed && (
          <>
            <div className="app-name">WolfSys</div>
            <div className="app-version">v.01</div>
          </>
        )}
      </div>

      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`inverted-border-radius ${selectedItem === index ? 'selected' : ''}`}
              onClick={() => handleItemClick(index)}
            >
              <span><img width="24" height="24" src={item.icon} alt={item.label} /></span>
              {!collapsed && <span className="menuItem">{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>

      {/* Copyright */}
      <div className="copyright">
        <p>{collapsed ? 'JMoab' : 'JMoab Webdesign'}</p>
        <p>{collapsed ? '© 2025' : '© 2025 All Rights Reserved'}</p>
      </div>
    </div>
  );
};

export default Sidebar;