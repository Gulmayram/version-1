import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import './Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <header className="header">
      <div className="header-container">
        
        {/* Левый блок: Соцсети + Языки */}
        <div className="header-left-group">
          <div className="social-links">
            <a href="#" className="soc-link"><i className="fab fa-instagram"></i></a>
            <a href="#" className="soc-link"><i className="fab fa-youtube"></i></a>
          </div>
          
          <div className="language-switcher">
            <button 
              className={`lang-btn ${language === 'ru' ? 'active' : ''}`} 
              onClick={() => changeLanguage('ru')}
            >RU</button>
            <button 
              className={`lang-btn ${language === 'kg' ? 'active' : ''}`} 
              onClick={() => changeLanguage('kg')}
            >KG</button>
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
              onClick={() => changeLanguage('en')}
            >EN</button>
          </div>
        </div>

        {/* Поиск */}
        <div className="search-box">
          <div className="search-inner">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        {/* Бургер (SVG) */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="#1a5a96" strokeWidth="2.5" fill="none">
            {isMenuOpen ? (
              <g>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </g>
            ) : (
              <g>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </g>
            )}
          </svg>
        </button>

      </div>
    </header>
  );
};

export default Header;
