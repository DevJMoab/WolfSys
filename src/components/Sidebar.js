import React, { useState, useCallback } from 'react';
import { menuItems } from './menuItems';
import './Sidebar.css';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = useCallback((index) => {
    setSelectedItem(index);
  }, []);

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

      {/* Menu */}
      <nav role="navigation" aria-label="Menu principal">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              role="menuitem"
              tabIndex={0}
              className={`inverted-border-radius ${selectedItem === index ? 'selected' : ''}`}
              onClick={() => handleItemClick(index)}
              onKeyPress={(e) => e.key === 'Enter' && handleItemClick(index)}
            >
              <span><img width="24" height="24" src={item.icon} alt={item.label} /></span>
              {!collapsed && <span>{item.label}</span>}
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