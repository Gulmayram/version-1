import React from 'react';
import { FaSearch, FaFacebookF, FaInstagram, FaTwitter, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* Блок поиска */}
        <div className="header-search">
          <div className="search-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Поиск по сайту..." />
          </div>
        </div>

        {/* Блок соцсетей и входа */}
        <div className="header-actions">
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
          
          <div className="auth-buttons">
            <button className="login-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              Вход
            </button>
            <button className="reg-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
