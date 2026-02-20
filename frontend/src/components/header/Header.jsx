import React from 'react';
import { FaSearch, FaFacebookF, FaInstagram, FaTwitter, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/main_large1.png'; 
import './Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  return (
    <header className="main-header">
      <div className="header-inner">
        
        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="header-left">
          {/* Логотип только для мобилок < 768px, на десктопе он в сайдбаре */}
          <img src={logo} alt="Logo" className="header-mobile-logo" />
          
          <div className="header-search">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className="header-right">
          <div className="header-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>

          <div className="header-auth">
            <button className="auth-login">
              <FaSignInAlt /> <span>Вход</span>
            </button>
            <button className="auth-reg">
              <FaUserPlus /> <span>Регистрация</span>
            </button>
          </div>

          {/* Бургер строго для мобильных < 768px */}
          <div className="header-burger" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
