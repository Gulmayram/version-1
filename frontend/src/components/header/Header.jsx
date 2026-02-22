import React from 'react';
import './Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-socials">
          <div className="social-links">
            <a href="#" className="soc-link"><i className="fab fa-instagram"></i></a>
            <a href="#" className="soc-link"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div className="search-box">
          <div className="search-inner">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          {/* Иконка меняется на крестик при открытии */}
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="#1a5a96" strokeWidth="2.5" fill="none">
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
