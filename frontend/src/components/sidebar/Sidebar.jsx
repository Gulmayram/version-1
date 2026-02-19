import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";

const Sidebar = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const getT = (key) => {
    const lang = language ? language.toUpperCase() : "RU";
    return translate[key] ? translate[key][lang] : key;
  };

  const toggleSubmenu = (e, menuKey) => {
    e.preventDefault();
    setActiveSubmenu(activeSubmenu === menuKey ? null : menuKey);
  };

  const menuItems = [
    { 
      id: 'about', 
      title: getT('aboutCompany'), 
      icon: 'about', 
      links: [
        { name: 'Общая информация', path: '/about/info' },
        { name: 'Руководство', path: '/about/management' },
        { name: 'Устав', path: '/about/charter' },
        { name: 'Структура', path: '/about/structure' }
      ] 
    },
    { 
      id: 'activity', 
      title: getT('services'), 
      icon: 'activity', 
      links: [
        { name: 'Услуги', path: '/services' },
        { name: 'Проекты', path: '/projects' },
        { name: 'Месторождения', path: '/deposits' }
      ] 
    },
    { 
      id: 'base', 
      title: 'Нормативная база', 
      icon: 'docs', 
      links: [
        { name: 'Законодательство', path: '/legal' },
        { name: 'Формы и бланки', path: '/forms' }
      ] 
    }
  ];

  return (
    <>
      <button className={`burger-menu ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <img src="/logo.png" alt="Logo" className="sidebar-logo-img" />
            <div className="logo-text">
              <span className="brand-name">Кыргызгеология</span>
              <span className="brand-sub">Государственное предприятие</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">{getT('main')}</span>
          </Link>

          {menuItems.map((item) => (
            <div key={item.id} className={`nav-group ${activeSubmenu === item.id ? 'expanded' : ''}`}>
              <button className="nav-item trigger" onClick={(e) => toggleSubmenu(e, item.id)}>
                <span className="nav-icon">
                   {item.icon === 'about' && '🏢'}
                   {item.icon === 'activity' && '🛠️'}
                   {item.icon === 'docs' && '📑'}
                </span>
                <span className="nav-text">{item.title}</span>
                <span className="nav-arrow">{activeSubmenu === item.id ? '−' : '+'}</span>
              </button>
              <div className="submenu">
                {item.links.map((link, idx) => (
                  <Link key={idx} to={link.path} className="submenu-link" onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link to="/news" className="nav-item">
            <span className="nav-icon">📢</span>
            <span className="nav-text">{getT('news')}</span>
          </Link>

          <Link to="/contacts" className="nav-item">
            <span className="nav-icon">📞</span>
            <span className="nav-text">{getT('contacts')}</span>
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="lang-switcher">
            {['RU', 'KG', 'EN'].map(lang => (
              <span 
                key={lang} 
                className={language === lang ? 'active' : ''} 
                onClick={() => changeLanguage(lang)}
              >
                {lang}
              </span>
            ))}
          </div>
          <button className="vision-btn">👁 Версия для слабовидящих</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
