import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";

const Sidebar = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false); // Состояние: открыт или закрыт

  const getT = (key) => {
    const currentLang = language ? language.toUpperCase() : "RU";
    return translate[key] ? translate[key][currentLang] : "";
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Кнопка-бургер, которая видна только на мобилках */}
      <button className="burger-menu" onClick={toggleSidebar}>
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Затемнение фона при открытом сайдбаре на мобилках */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <div className="logo-text">
            <h2>{getT('kyrgyzgeology')}</h2>
            <p>Государственное предприятие</p>
          </div>
        </div>
        
        <nav className="sidebar-menu">
          <ul>
            <li className="active" onClick={toggleSidebar}>🏠 {getT('main')}</li>
            <li onClick={toggleSidebar}>ℹ️ {getT('aboutCompany')}</li>
            <li onClick={toggleSidebar}>🛠️ {getT('services')}</li>
            <li onClick={toggleSidebar}>📂 {getT('projects')}</li>
            <li onClick={toggleSidebar}>📰 {getT('news')}</li>
            <li onClick={toggleSidebar}>📞 {getT('contacts')}</li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="lang-switcher">
            <span onClick={() => changeLanguage('RU')}>RU</span> | 
            <span onClick={() => changeLanguage('KG')}>KG</span> | 
            <span onClick={() => changeLanguage('EN')}>EN</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
