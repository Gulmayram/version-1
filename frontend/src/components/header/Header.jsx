import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        
        {/* Блок поиска (на мобилках упадет вниз) */}
        <div className="header-search">
          <div className="search-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        {/* Блок управления (иконки, вход, бургер) */}
        <div className="header-controls">
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>

          <div className="auth-group">
            <button className="login-btn">Вход</button>
            <span className="divider">|</span>
            <button className="reg-btn">Регистрация</button>
          </div>

          {/* Кнопка вызова навбара (видна только на мобилках) */}
          <button className="mobile-menu-btn" onClick={toggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
