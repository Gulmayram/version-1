import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ subMenus }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  // Список ключей в том же порядке, что и в сайдбаре
  const menuKeys = ['about', 'activity', 'docs', 'base', 'news', 'contacts'];

  return (
    <nav className="tablet-navbar">
      <div className="navbar-inner">
        {menuKeys.map((key) => (
          <div 
            key={key} 
            className="nav-group"
            onMouseEnter={() => setActiveMenu(key)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="nav-item-btn">
              {subMenus[key].title}
              <i className="fas fa-chevron-down nav-arrow"></i>
            </button>

            {activeMenu === key && (
              <ul className="nav-dropdown">
                {subMenus[key].links.map((link, idx) => (
                  <li key={idx}><a href="#">Подпункт {idx + 1}</a></li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
