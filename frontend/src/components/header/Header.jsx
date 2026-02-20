import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [search, setSearch] = useState('');

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Блок поиска */}
        <div className="search-bar">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="search-icon">
            <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="text" 
            placeholder="Поиск по сайту..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Правая часть: Соцсети и Вход */}
        <div className="header-right">
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>

          <div className="auth-buttons">
            <button className="login-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Вход
            </button>
            <button className="register-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM20 8v6M23 11h-6" strokeLinecap="round" strokeLinejoin="round"/>
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
