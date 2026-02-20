import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/main_large1.png';
import './Navbar.css';
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    /* Обертка для управления видимостью из App.css */
    <div className="navbar-container">
      <header className="mobile-navbar">
        <div className="logo">
          <img onClick={() => handleNavigate('/')} src={logo} alt="Logo" />
        </div>

        {/* Бургер-меню для мобилки */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <a onClick={() => handleNavigate('/news')}>{translate.news[language]}</a>
          <a onClick={() => handleNavigate('/services')}>{translate.services[language]}</a>
          <a onClick={() => handleNavigate('/investorpage')}>{translate.investors[language]}</a>
          
          <div className="mobile-dropdown">
            <div className="dropdown-title" onClick={() => setIsAboutHovered(!isAboutHovered)}>
              {translate.aboutCompany[language]} {isAboutHovered ? '▲' : '▼'}
            </div>
            {isAboutHovered && (
              <div className="dropdown-content">
                <a onClick={() => handleNavigate('/historyandmission')}>{translate.history[language]}</a>
                <a onClick={() => handleNavigate('/organization')}>Руководство</a>
                <a onClick={() => handleNavigate('/achievementsProjects')}>{translate.achievements[language]}</a>
              </div>
            )}
          </div>

          <a onClick={() => handleNavigate('/contacts')}>{translate.contacts[language]}</a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
