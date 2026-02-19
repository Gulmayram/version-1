import React, { useContext } from 'react';
import './Sidebar.css';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";

const Sidebar = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  // Функция для безопасного получения перевода
  const getT = (key) => {
    // В вашем объекте ключи RU, KG, EN — приводим к верхнему регистру
    const currentLang = language ? language.toUpperCase() : "RU";
    return translate[key] ? translate[key][currentLang] : "";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <div className="logo-text">
          {/* Используем ключ kyrgyzgeology из вашего объекта */}
          <h2>{getT('kyrgyzgeology')}</h2>
          <p>Государственное предприятие</p>
        </div>
      </div>
      
      <nav className="sidebar-menu">
        <ul>
          <li className="active"><i className="icon-home"></i> {getT('main')}</li>
          <li><i className="icon-info"></i> {getT('aboutCompany')}</li>
          <li><i className="icon-work"></i> {getT('services')}</li>
          <li><i className="icon-docs"></i> {getT('projects')}</li>
          <li><i className="icon-news"></i> {getT('news')}</li>
          <li><i className="icon-phone"></i> {getT('contacts')}</li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="lang-switcher">
          <span 
            className={language?.toUpperCase() === 'RU' ? 'active-lang' : ''} 
            onClick={() => changeLanguage('RU')}
          >RU</span> 
          <span> | </span>
          <span 
            className={language?.toUpperCase() === 'KG' ? 'active-lang' : ''} 
            onClick={() => changeLanguage('KG')}
          >KG</span> 
          <span> | </span>
          <span 
            className={language?.toUpperCase() === 'EN' ? 'active-lang' : ''} 
            onClick={() => changeLanguage('EN')}
          >EN</span>
        </div>
        <button className="accessibility-btn">
          <i className="icon-eye"></i> Версия для слабовидящих
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
