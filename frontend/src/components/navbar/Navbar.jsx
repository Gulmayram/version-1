import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ subMenus }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Используем ключи из вашего объекта subMenus (about, activity, docs, base, news, contacts)
  const menuKeys = Object.keys(subMenus);

  return (
    <nav className="tablet-navbar">
      <div className="nav-container">
        {menuKeys.map((key) => {
          const item = subMenus[key];
          return (
            <div 
              key={key} 
              className="nav-item"
              onMouseEnter={() => setOpenDropdown(key)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="nav-button">
                {/* Используем тот же заголовок, что в сайдбаре */}
                {item.title === 'docsAndReports' ? 'Документы и отчеты' : item.title}
                <i className={`fas fa-chevron-down arrow ${openDropdown === key ? 'rotate' : ''}`}></i>
              </button>

              {openDropdown === key && (
                <ul className="dropdown-menu">
                  {item.links.map((link, index) => (
                    <li key={index}>
                      <a href={link}>
                        {/* Здесь можно добавить логику перевода для подпунктов */}
                        Подпункт {index + 1} 
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
