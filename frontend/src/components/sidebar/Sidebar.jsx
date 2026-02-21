import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";

// Иконки (используй свои SVG или FontAwesome)
const Icons = {
  main: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>,
  about: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  activity: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  base: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  news: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect><line x1="6" y1="8" x2="18" y2="8"></line><line x1="6" y1="12" x2="18" y2="12"></line><line x1="6" y1="16" x2="18" y2="16"></line></svg>,
  contacts: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
};

const Sidebar = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
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

  const subMenus = {
    about: { icon: Icons.about, title: 'aboutCompany', subKey: 'aboutSub', links: ["/about/info", "/about/management", "/about/charter", "/about/structure", "/about/reports", "/about/maps"] },
    activity: { icon: Icons.activity, title: 'services', subKey: 'servicesSub', links: ["/services", "/projects", "/production", "/partners", "/deposits", "/anticorruption"] },
    base: { icon: Icons.base, title: 'normativeBase', subKey: 'baseSub', links: ["/legal", "/forms", "/instructions"] },
    news: { icon: Icons.news, title: 'announcements', subKey: 'newsSub', links: ["/contests", "/procurement", "/realization", "/vacancies", "/press-center"] },
    contacts: { icon: Icons.contacts, title: 'contacts', subKey: 'contactsSub', links: ["/phonebook", "/reception", "/bank-details"] }
  };

  return (
    <aside className="sidebar">
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
            <Link to="/" className="menu-link">
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
                    <Link to={config.links[index]}>{text}</Link>
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
  );
};

export default Sidebar;
