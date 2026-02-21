import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        
        {/* Поисковик */}
        <div className="search-box">
          <div className="search-inner">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        {/* Правая часть: Соцсети + Вход/Рег + Бургер */}
        <div className="header-right">
          
          <div className="social-links">
            <a href="#" className="soc-link"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="soc-link"><i className="fab fa-instagram"></i></a>
            <a href="#" className="soc-link"><i className="fab fa-twitter"></i></a>
          </div>

          <div className="auth-section">
            <button className="login-button">
              <i className="fas fa-sign-in-alt"></i>
              <span>Вход</span>
            </button>
            <button className="register-button">
              <i className="fas fa-user-plus"></i>
              <span>Регистрация</span>
            </button>
          </div>

          <button className="menu-toggle" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="#1a5a96" strokeWidth="2" fill="none">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
