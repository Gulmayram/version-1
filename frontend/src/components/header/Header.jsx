import React from 'react';
import { FaSearch, FaFacebookF, FaInstagram, FaTwitter, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  return (
    <header className="main-header">
      <div className="header-inner">
        
        {/* Поиск слева */}
        <div className="header-left">
          <div className="search-wrap">
            <FaSearch className="search-icon-svg" />
            <input 
              type="text" 
              placeholder="Поиск по сайту..." 
              className="search-field"
            />
          </div>
        </div>

        {/* Инструменты справа */}
        <div className="header-right">
          <div className="social-group">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>

          <div className="v-divider"></div>

          <div className="auth-actions">
            <button className="auth-link login">
              <FaSignInAlt /> <span>Вход</span>
            </button>
            <button className="auth-link register">
              <FaUserPlus /> <span>Регистрация</span>
            </button>
          </div>

          {/* Бургер для мобилок */}
          <div className="header-burger" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
