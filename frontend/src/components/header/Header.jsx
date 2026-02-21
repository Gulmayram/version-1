import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        
        {/* Поисковик (на мобилках упадет вниз) */}
        <div className="header-search">
          <div className="search-wrapper">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        {/* Элементы управления */}
        <div className="header-actions">
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>

          <div className="auth-block">
            <button className="btn-login">
              <i className="fas fa-sign-in-alt"></i> Вход
            </button>
            <button className="btn-reg">
              <i className="fas fa-user-plus"></i> Регистрация
            </button>
          </div>

          {/* Кнопка вызова навбара (SVG) */}
          <button className="mobile-nav-toggle" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1a5a96" strokeWidth="2">
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
