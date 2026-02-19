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

        <nav className="sidebar-menu">
  <ul>
    {/* ГЛАВНАЯ */}
    <li className="menu-item active">
      <div className="menu-link">
        <div className="link-content">
          <Icon name="main" /> <span>{getT('main')}</span>
        </div>
      </div>
    </li>

    {/* О ПРЕДПРИЯТИИ */}
    <li className={`menu-item ${activeSubmenu === 'about' ? 'submenu-open' : ''}`}>
      <div className="menu-link" onClick={() => toggleSubmenu('about')}>
        <div className="link-content">
          <Icon name="about" /> <span>{getT('aboutCompany')}</span>
        </div>
        <span className="arrow">▼</span>
      </div>
      <div className="submenu-wrapper">
        <ul className="submenu">
          <li>Общая информация</li>
          <li>Руководство</li>
          <li>Устав</li>
          <li>Структура</li>
          <li>Отчёты</li>
          <li>Карты</li>
        </ul>
      </div>
    </li>

    {/* ДЕЯТЕЛЬНОСТЬ (аналогично) */}
    <li className={`menu-item ${activeSubmenu === 'work' ? 'submenu-open' : ''}`}>
      <div className="menu-link" onClick={() => toggleSubmenu('work')}>
        <div className="link-content">
          <Icon name="activity" /> <span>{getT('services')}</span>
        </div>
        <span className="arrow">▼</span>
      </div>
      <div className="submenu-wrapper">
        <ul className="submenu">
          <li>Услуги</li>
          <li>Проекты</li>
          <li>Месторождения</li>
          <li>Антикоррупционные меры</li>
        </ul>
      </div>
    </li>
  </ul>
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
