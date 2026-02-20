import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/main_large1.png';
import './Navbar.css';
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import { FaBars, FaTimes, FaRegEye, FaInstagram, FaFacebookF } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, changeLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar-content">
        {/* Левая часть: Логотип */}
        <div className="navbar-logo" onClick={() => handleNavigate('/')}>
          <img src={logo} alt="Кыргызгеология" />
        </div>

        {/* Центральная часть: Меню (скрывается в бургер на мобилках) */}
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <div className="nav-item">
            <span>{translate.aboutCompany[language]} ▾</span>
          </div>
          <div className="nav-item">
            <span>{translate.services[language]} ▾</span>
          </div>
          <div className="nav-item">
            <span>{translate.normativeBase[language]} ▾</span>
          </div>
          <div className="nav-item">
            <span>{translate.announcements[language]} ▾</span>
          </div>
          <div className="nav-item">
            <span onClick={() => handleNavigate('/contacts')}>{translate.contacts[language]} ▾</span>
          </div>
        </div>

        {/* Правая часть: Языки и Соцсети */}
        <div className="navbar-actions">
          <div className="lang-switcher-nav">
            <span onClick={() => changeLanguage('RU')} className={language === 'RU' ? 'active' : ''}>RU</span>
            <span onClick={() => changeLanguage('KG')} className={language === 'KG' ? 'active' : ''}>KG</span>
            <span onClick={() => changeLanguage('EN')} className={language === 'EN' ? 'active' : ''}>EN</span>
          </div>
          
          <div className="nav-icons">
            <FaRegEye className="nav-icon-item" />
            <FaInstagram className="nav-icon-item instagram" />
            <FaFacebookF className="nav-icon-item facebook" />
          </div>

          {/* Кнопка бургера только для мобилок */}
          <div className="mobile-burger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
