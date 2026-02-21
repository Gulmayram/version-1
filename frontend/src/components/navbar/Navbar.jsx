import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    { id: 'about', title: 'О предприятии', sub: ['История', 'Руководство', 'Структура'] },
    { id: 'activity', title: 'Деятельность', sub: ['Добыча', 'Разведка', 'Экология'] },
    { id: 'docs', title: 'Документы и отчеты', sub: ['Финансовые', 'Социальные', 'Технические'] },
    { id: 'base', title: 'Нормативная база', sub: ['Законы', 'Постановления'] },
    { id: 'news', title: 'Объявления', sub: ['Тендеры', 'Вакансии'] },
    { id: 'contacts', title: 'Контакты', sub: ['Адрес', 'Обратная связь'] },
  ];

  return (
    <nav className="top-navbar">
      <div className="navbar-container">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="nav-item"
            onMouseEnter={() => setActiveMenu(item.id)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="nav-link">
              {item.title}
              <i className={`fas fa-chevron-down arrow ${activeMenu === item.id ? 'open' : ''}`}></i>
            </button>
            
            {activeMenu === item.id && (
              <ul className="nav-dropdown">
                {item.sub.map((subItem, index) => (
                  <li key={index}><a href="#">{subItem}</a></li>
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
