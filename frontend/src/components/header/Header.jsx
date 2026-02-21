import React from 'react';
import { FaSearch, FaFacebookF, FaInstagram, FaTwitter, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  return (
    <header className="main-header">
      <div className="header-inner">
        
        {/* Лево: Поиск */}
        <div className="header-left">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Поиск по сайту..." 
              className="search-input"
            />
          </div>
        </div>

        {/* Право: Соцсети + Разделитель + Кнопки */}
        <div className="header-right">
          <div className="social-links">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>

          <div className="vertical-line"></div>

          <div className="auth-buttons">
            <button className="auth-btn login">
              <FaSignInAlt className="icon" />
              <span>Вход</span>
            </button>
            <button className="auth-btn register">
              <FaUserPlus className="icon" />
              <span>Регистрация</span>
            </button>
          </div>

          {/* Бургер для мобилок */}
          <div className="burger-menu" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
