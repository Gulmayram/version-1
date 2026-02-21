import React from 'react';
import { FaSearch, FaFacebookF, FaInstagram, FaTwitter, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  return (
    <header className="main-header">
      <div className="header-inner">
        
        {/* Левая часть: Поиск */}
        <div className="header-left">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Поиск по сайту..." 
              className="search-input"
            />
          </div>
        </div>

        {/* Правая часть: Соцсети и Авторизация */}
        <div className="header-right">
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
          </div>

          <div className="auth-group">
            <button className="btn-login">
              <FaSignInAlt className="auth-icon" />
              <span>Вход</span>
            </button>
            <button className="btn-register">
              <FaUserPlus className="auth-icon" />
              <span>Регистрация</span>
            </button>
          </div>

          {/* Бургер для мобильных устройств (появляется при < 768px) */}
          <div className="mobile-burger" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
