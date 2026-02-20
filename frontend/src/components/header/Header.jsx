import React from 'react';
import { FaSearch, FaFacebookF, FaInstagram, FaTwitter, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/main_large1.png'; 
import './Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  return (
    <header className="main-header">
      <div className="header-inner">
        
        <div className="header-left">
          {/* Логотип виден только на мобилках < 768px */}
          <img src={logo} alt="Logo" className="mobile-logo-img" />
          
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Поиск по сайту..." className="search-input" />
          </div>
        </div>

        <div className="header-right">
          <div className="social-block">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>

          <div className="auth-block">
            <button className="auth-btn">
              <FaSignInAlt /> <span>Вход</span>
            </button>
            <button className="reg-btn">
              <FaUserPlus /> <span>Регистрация</span>
            </button>
          </div>

          {/* Бургер строго < 768px */}
          <div className="menu-burger" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
