import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";

// Иконки оставляем те же...
const Icons = { /* Твой объект с SVG иконками */ };

const Sidebar = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const getT = (key) => {
    const lang = language ? language.toUpperCase() : "RU";
    return translate[key] ? translate[key][lang] : key;
  };

  const getSubT = (key) => {
    const lang = language ? language.toUpperCase() : "RU";
    return translate[key] && translate[key][lang] ? translate[key][lang] : [];
  };

  const toggleSubmenu = (menuKey) => {
    setActiveSubmenu(activeSubmenu === menuKey ? null : menuKey);
  };

  const closeMobile = () => setIsOpen(false);

  const subMenus = {
    about: { icon: Icons.about, title: 'aboutCompany', subKey: 'aboutSub', links: ["/about/info", "/about/management", "/about/charter", "/about/structure", "/about/reports", "/about/maps"] },
    activity: { icon: Icons.activity, title: 'services', subKey: 'servicesSub', links: ["/services", "/projects", "/production", "/partners", "/deposits", "/anticorruption"] },
    base: { icon: Icons.base, title: 'normativeBase', subKey: 'baseSub', links: ["/legal", "/forms", "/instructions"] },
    news: { icon: Icons.news, title: 'announcements', subKey: 'newsSub', links: ["/contests", "/procurement", "/realization", "/vacancies", "/press-center"] },
    contacts: { icon: Icons.contacts, title: 'contacts', subKey: 'contactsSub', links: ["/phonebook", "/reception", "/bank-details"] }
  };

  return (
    /* Добавляем контейнер, который мы будем скрывать через App.css */
    <div className="sidebar-container">
      <button className={`burger-menu ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={closeMobile}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <div className="logo-text">
            <h2>{getT('kyrgyzgeology')}</h2>
            <p>{getT('enterprise')}</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          <ul>
            <li className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link to="/" className="menu-link" onClick={closeMobile}>
                <div className="link-content">{Icons.main} <span>{getT('main')}</span></div>
              </Link>
            </li>

            {Object.entries(subMenus).map(([key, config]) => (
              <li key={key} className={`menu-item ${activeSubmenu === key ? 'submenu-open' : ''}`}>
                <div className="menu-link" onClick={() => toggleSubmenu(key)}>
                  <div className="link-content">{config.icon} <span>{getT(config.title)}</span></div>
                  <span className="arrow">▼</span>
                </div>
                <ul className="submenu">
                  {getSubT(config.subKey).map((text, index) => (
                    <li key={index}>
                      <Link to={config.links[index]} onClick={closeMobile}>{text}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
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
          <button className="accessibility-btn">👁 {getT('accessibility')}</button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
