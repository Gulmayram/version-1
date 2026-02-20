import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";

const Navbar = ({ isMenuOpen, toggleMenu }) => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if (toggleMenu) toggleMenu(); // Закрываем меню при переходе (для мобилок)
    navigate(path);
  };

  return (
    <div className={`navbar-adaptive-container ${isMenuOpen ? 'mobile-open' : ''}`}>
      <nav className="navbar-links-list">
        <div className="nav-link-item" onClick={() => handleNavigate('/about')}>
          {translate.aboutCompany[language]}
        </div>
        <div className="nav-link-item" onClick={() => handleNavigate('/services')}>
          {translate.services[language]}
        </div>
        <div className="nav-link-item" onClick={() => handleNavigate('/normative')}>
          {translate.normativeBase[language]}
        </div>
        <div className="nav-link-item" onClick={() => handleNavigate('/announcements')}>
          {translate.announcements[language]}
        </div>
        <div className="nav-link-item" onClick={() => handleNavigate('/contacts')}>
          {translate.contacts[language]}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
