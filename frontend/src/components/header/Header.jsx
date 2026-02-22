import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import './Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  // Используем те же названия, что и в твоем Sidebar
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <header className="header">
      <div className="header-container">
        
        <div className="header-left-group">
          {/* Соцсети */}
          <div className="social-links">
            <a href="#" className="soc-link"><i className="fab fa-instagram"></i></a>
            <a href="#" className="soc-link"><i className="fab fa-youtube"></i></a>
          </div>
          
          {/* Переключатель языков как в Сайдбаре */}
          <div className="language-switcher">
            {['RU', 'KG', 'EN'].map(lang => (
              <button 
                key={lang}
                type="button"
                className={`lang-btn ${language === lang ? 'active' : ''}`} 
                onClick={() => changeLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Поиск */}
        <div className="search-box">
          <div className="search-inner">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        {/* Кнопка управления шторкой (SVG) */}
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
