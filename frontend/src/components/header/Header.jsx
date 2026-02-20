import React, { useState } from 'react';
import { FaSearch, FaFacebookF, FaInstagram, FaTwitter, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/main_large1.png';
import './Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  return (
    <header className="header-main">
      <div className="header-inner">
        
        <div className="header-left">
          {/* Логотип появляется только на смартфонах (< 768px) */}
          <div className="mobile-only-logo">
            <img src={logo} alt="Кыргызгеология" />
          </div>
          
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        <div className="header-right">
          <div className="social-links">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>

          <div className="auth-group">
            <button className="btn-auth">
              <FaSignInAlt /> <span>Вход</span>
            </button>
            <button className="btn-register">
              <FaUserPlus /> <span>Регистрация</span>
            </button>
          </div>

          {/* Бургер появляется только на смартфонах (< 768px) */}
          <div className="burger-menu" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
