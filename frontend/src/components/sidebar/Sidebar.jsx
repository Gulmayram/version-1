import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";

const Icons = {
  main: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 8.33333C2.49994 8.09089 2.55278 7.85135 2.65482 7.63143C2.75687 7.41151 2.90566 7.2165 3.09083 7.06L8.92417 2.06083C9.22499 1.80659 9.60613 1.6671 10 1.6671C10.3939 1.6671 10.775 1.80659 11.0758 2.06083L16.9092 7.06C17.0943 7.2165 17.2431 7.41151 17.3452 7.63143C17.4472 7.85135 17.5001 8.09089 17.5 8.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V8.33333Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  about: (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.33333 10.3333H3.66667C3.22464 10.3333 2.80072 10.5089 2.48816 10.8215C2.17559 11.134 2 11.558 2 12V17C2 17.442 2.17559 17.8659 2.48816 18.1785C2.80072 18.4911 3.22464 18.6667 3.66667 18.6667H5.33333" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.3335 18.6667V3.66667C5.3335 3.22464 5.50909 2.80072 5.82165 2.48816C6.13421 2.17559 6.55814 2 7.00016 2H13.6668C14.1089 2 14.5328 2.17559 14.8453 2.48816C15.1579 2.80072 15.3335 3.22464 15.3335 3.66667V18.6667H5.3335Z" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.3335 7.83333H17.0002C17.4422 7.83333 17.8661 8.00892 18.1787 8.32148C18.4912 8.63404 18.6668 9.05797 18.6668 9.49999V17C18.6668 17.442 18.4912 17.8659 18.1787 18.1785C17.8661 18.4911 17.4422 18.6667 17.0002 18.6667H15.3335" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.61133 5.16667H12.0558" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.61133 8.61111H12.0558" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.61133 12.0556H12.0558" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.61133 15.5H12.0558" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  activity: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3332 16.6667V3.33334C13.3332 2.89131 13.1576 2.46739 12.845 2.15483C12.5325 1.84227 12.1085 1.66667 11.6665 1.66667H8.33317C7.89114 1.66667 7.46722 1.84227 7.15466 2.15483C6.8421 2.46739 6.6665 2.89131 6.6665 3.33334V16.6667" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.6665 5H3.33317C2.4127 5 1.6665 5.74619 1.6665 6.66667V15C1.6665 15.9205 2.4127 16.6667 3.33317 16.6667H16.6665C17.587 16.6667 18.3332 15.9205 18.3332 15V6.66667C18.3332 5.74619 17.587 5 16.6665 5Z" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  reports: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5002 1.66666H5.00016C4.55814 1.66666 4.13421 1.84225 3.82165 2.15481C3.50909 2.46737 3.3335 2.8913 3.3335 3.33332V16.6667C3.3335 17.1087 3.50909 17.5326 3.82165 17.8452C4.13421 18.1577 4.55814 18.3333 5.00016 18.3333H15.0002C15.4422 18.3333 15.8661 18.1577 16.1787 17.8452C16.4912 17.5326 16.6668 17.1087 16.6668 16.6667V5.83332L12.5002 1.66666Z" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6665 1.66666V4.99999C11.6665 5.44202 11.8421 5.86594 12.1547 6.1785C12.4672 6.49106 12.8911 6.66666 13.3332 6.66666H16.6665" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33317 7.5H6.6665" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3332 10.8333H6.6665" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3332 14.1667H6.6665" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  base: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
  ),
  news: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 9.16667L17.5 5V15L2.5 11.6667V9.16667Z" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.66677 14C9.57922 14.3174 9.43002 14.6144 9.22769 14.8741C9.02535 15.1338 8.77385 15.3511 8.48754 15.5136C8.20122 15.6761 7.8857 15.7806 7.559 15.8212C7.23229 15.8617 6.90079 15.8375 6.58343 15.75C6.26607 15.6624 5.96906 15.5132 5.70936 15.3109C5.44966 15.1086 5.23236 14.8571 5.06985 14.5708C4.90735 14.2844 4.80283 13.9689 4.76227 13.6422C4.7217 13.3155 4.74588 12.984 4.83343 12.6667" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  contacts: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2745C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1112 17.2005 18.1856C16.9806 18.26 16.7477 18.2876 16.5165 18.2667C13.9522 17.988 11.489 17.1118 9.32486 15.7083C7.31139 14.4289 5.60431 12.7218 4.32486 10.7083C2.91651 8.53435 2.04007 6.05917 1.76653 3.48334C1.7457 3.2529 1.77309 3.02064 1.84695 2.80136C1.9208 2.58208 2.03951 2.38058 2.1955 2.20969C2.3515 2.0388 2.54137 1.90227 2.75302 1.80878C2.96468 1.71529 3.19348 1.66689 3.42486 1.66668H5.92486C6.32928 1.6627 6.72136 1.80591 7.028 2.06962C7.33464 2.33333 7.53493 2.69955 7.59153 3.10001C7.69705 3.90006 7.89274 4.68562 8.17486 5.44168C8.28698 5.73995 8.31125 6.0641 8.24478 6.37574C8.17832 6.68738 8.02392 6.97344 7.79986 7.20001L6.74153 8.25834C7.92783 10.3446 9.65524 12.072 11.7415 13.2583L12.7999 12.2C13.0264 11.976 13.3125 11.8216 13.6241 11.7551C13.9358 11.6886 14.2599 11.7129 14.5582 11.825C15.3143 12.1071 16.0998 12.3028 16.8999 12.4083C17.3047 12.4655 17.6744 12.6693 17.9386 12.9813C18.2029 13.2932 18.3433 13.6913 18.3332 14.1Z" stroke="white" strokeOpacity="0.9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
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
    about: { 
      icon: Icons.about, 
      title: 'aboutCompany', 
      subKey: 'aboutSub', 
      links: [
        "/historyandmission",   // Общая информация
        "/about/management",    // Руководство
        "/about/statute",       // Устав
        "/organization",        // Структура
        "/about/reports",       // Отчёты
        "/about/maps"           // Карты
      ] 
    },
    activity: { 
      icon: Icons.activity, 
      title: 'services', 
      subKey: 'servicesSub', 
      links: [
        "/services",            // Услуги
        "/projects",            // Проекты
        "/boezgrproductcard",   // Продукция
        "/partners",            // Для партнёров (InvestorPage)
        "/about/maps",          // Месторождения (MapItem)
        "/anticorruption"       // Антикоррупция (InvestorPage)
      ] 
    },
    docs: { icon: Icons.reports, title: 'docsAndReports', subKey: 'docsSub', links: ["/docs/financial", "/docs/social", "/docs/technical"] },
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
