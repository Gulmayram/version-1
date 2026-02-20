import React, { useState, useContext } from 'react';
import { FaBars, FaTimes, FaSearch, FaFacebookF, FaInstagram, FaTwitter, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import logo from '../../assets/main_large1.png';
import { LanguageContext } from "../../LanguageContext";
import './Header.css';

const Header = ({ isMenuOpen, toggleMenu }) => {
  const [search, setSearch] = useState('');
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* Поиск: виден везде, кроме телефонов */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Поиск..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Логотип: появляется только когда исчезает Sidebar (< 1025px) */}
        <div className="mobile-logo-zone">
          <img src={logo} alt="Logo" onClick={() => window.location.href = '/'} />
        </div>

        <div className="header-right">
          <div className="header-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>

          <div className="lang-switcher-header">
            <span onClick={() => changeLanguage('RU')} className={language === 'RU' ? 'active' : ''}>RU</span>
            <span className="sep">|</span>
            <span onClick={() => changeLanguage('KG')} className={language === 'KG' ? 'active' : ''}>KG</span>
            <span className="sep">|</span>
            <span onClick={() => changeLanguage('EN')} className={language === 'EN' ? 'active' : ''}>EN</span>
          </div>

          <div className="auth-buttons">
            <button className="login-btn"><FaSignInAlt /> <span>Вход</span></button>
            <button className="register-btn"><FaUserPlus /> <span>Регистрация</span></button>
          </div>

          {/* БУРГЕР: Появится только на экранах < 768px через CSS */}
          <div className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
