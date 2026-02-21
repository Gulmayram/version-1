import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ subMenus }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMouseEnter = (menu) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  return (
    <nav className="top-navbar">
      <div className="navbar-container">
        {Object.entries(subMenus).map(([key, menu]) => (
          <div 
            key={key} 
            className="nav-item"
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="nav-link">
              <span>{menu.title}</span>
              <i className={`fas fa-chevron-down arrow ${activeMenu === key ? 'open' : ''}`}></i>
            </div>

            {activeMenu === key && (
              <div className="dropdown-menu">
                {menu.links.map((link, index) => (
                  <a key={index} href={link} className="dropdown-item">
                    {/* Здесь логика перевода, например menu.subKey[index] */}
                    {menu.subKey ? `Пункт ${index + 1}` : link} 
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
