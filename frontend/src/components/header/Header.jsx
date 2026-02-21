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
        
        {/* Поиск */}
        <div className="search-box">
          <div className="search-inner">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        {/* Правая часть */}
        <div className="header-right">
          <div className="socials">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>

          <div className="auth">
            <button className="login">
              <i className="fas fa-sign-in-alt"></i>
              <span>Вход</span>
            </button>
            <button className="register">
              <i className="fas fa-user-plus"></i>
              <span>Регистрация</span>
            </button>
          </div>

          {/* Бургер для мобильных */}
          <button className="burger" onClick={toggleSidebar}>
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
