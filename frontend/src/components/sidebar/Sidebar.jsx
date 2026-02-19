import React, { useContext } from 'react';
import './Sidebar.css';
import { LanguageContext } from '../../LanguageContext'; // Убедитесь, что путь правильный
import { translate } from '../../assets/translate'; // Убедитесь, что путь правильный

// Предполагаем, что у вас есть иконки. Если нет, пока будут просто текст или placeholders.
// Если у вас иконки как SVG или компоненты, их нужно импортировать.
// Для примера используем Font Awesome классы или подобные
// Например, если у вас есть CSS, который определяет .icon-home и т.д.

const Sidebar = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (lang) => {
    if (changeLanguage) { // Проверяем, что changeLanguage существует
      changeLanguage(lang);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        {/* Путь к логотипу. Убедитесь, что /logo.png доступен из корня public */}
        <img src="/logo.png" alt="Кыргызгеология" className="logo-img" />
        <div className="logo-text">
          <h2>{translate.companyName[language]}</h2> {/* Пример перевода названия */}
          <p>{translate.companyDescription[language]}</p> {/* Пример перевода описания */}
        </div>
      </div>
      
      <nav className="sidebar-menu">
        <ul>
          {/* Для реальной навигации используйте <Link> из react-router-dom */}
          <li className="active"><i className="icon-home"></i> {translate.homeLink[language]}</li>
          <li><i className="icon-info"></i> {translate.aboutLink[language]}</li>
          <li><i className="icon-work"></i> {translate.activityLink[language]}</li>
          <li><i className="icon-docs"></i> {translate.documentsLink[language]}</li>
          <li><i className="icon-news"></i> {translate.announcementsLink[language]}</li>
          <li><i className="icon-mail"></i> {translate.eReceptionLink[language]}</li>
          <li><i className="icon-phone"></i> {translate.contactsLink[language]}</li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="lang-switcher">
          <span 
            className={language === 'ru' ? 'active-lang' : ''} 
            onClick={() => handleLanguageChange('ru')}
          >
            RU
          </span> 
          <span> | </span>
          <span 
            className={language === 'kg' ? 'active-lang' : ''} 
            onClick={() => handleLanguageChange('kg')}
          >
            KG
          </span> 
          <span> | </span>
          <span 
            className={language === 'en' ? 'active-lang' : ''} 
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </span>
        </div>
        <button className="accessibility-btn">
          <i className="icon-eye"></i> {translate.accessibility[language]}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
