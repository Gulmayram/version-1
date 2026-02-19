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

  const toggleSubmenu = (menuKey) => {
    setActiveSubmenu(activeSubmenu === menuKey ? null : menuKey);
  };

  return (
    <>
      <button className={`burger-menu ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <div className="logo-text">
            <h2>Кыргызгеология</h2>
            <p>Государственное предприятие</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          <ul>
            <li className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link to="/" className="menu-link">
                <div className="link-content">
                  <span>🏠</span> <span>{getT('main')}</span>
                </div>
              </Link>
            </li>

            {/* О ПРЕДПРИЯТИИ */}
            <li className={`menu-item ${activeSubmenu === 'about' ? 'submenu-open' : ''}`}>
              <div className="menu-link" onClick={() => toggleSubmenu('about')}>
                <div className="link-content">
                  <span>🏢</span> <span>{getT('aboutCompany')}</span>
                </div>
                <span className="arrow">▼</span>
              </div>
              <ul className="submenu">
                <li><Link to="/about/info">Общая информация</Link></li>
                <li><Link to="/about/management">Руководство</Link></li>
                <li><Link to="/about/charter">Устав</Link></li>
                <li><Link to="/about/structure">Структура</Link></li>
              </ul>
            </li>

            {/* ДЕЯТЕЛЬНОСТЬ */}
            <li className={`menu-item ${activeSubmenu === 'activity' ? 'submenu-open' : ''}`}>
              <div className="menu-link" onClick={() => toggleSubmenu('activity')}>
                <div className="link-content">
                  <span>🛠️</span> <span>{getT('services')}</span>
                </div>
                <span className="arrow">▼</span>
              </div>
              <ul className="submenu">
                <li><Link to="/services">Услуги</Link></li>
                <li><Link to="/projects">Проекты</Link></li>
                <li><Link to="/deposits">Месторождения</Link></li>
              </ul>
            </li>

            <li className="menu-item">
              <Link to="/news" className="menu-link">
                <div className="link-content">
                  <span>📢</span> <span>{getT('news')}</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="lang-switcher">
            {['RU', 'KG', 'EN'].map(lang => (
              <span 
                key={lang} 
                className={language === lang ? 'active-lang' : ''} 
                onClick={() => changeLanguage(lang)}
              >
                {lang}
              </span>
            ))}
          </div>
          <button className="accessibility-btn">👁 Версия для слабовидящих</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
