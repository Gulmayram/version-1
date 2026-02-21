import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";
import './MobileBar.css';

const MobileBar = ({ isOpen, onClose }) => {
  const { language } = useContext(LanguageContext);
  const [activeSub, setActiveSub] = useState(null);

  const getT = (key) => {
    const lang = language ? language.toUpperCase() : "RU";
    return translate[key] ? translate[key][lang] : key;
  };

  const getSubT = (key) => {
    const lang = language ? language.toUpperCase() : "RU";
    return translate[key] && translate[key][lang] ? translate[key][lang] : [];
  };

  const subMenus = {
    about: { title: 'aboutCompany', subKey: 'aboutSub', links: ["/about/info", "/about/management", "/about/charter", "/about/structure", "/about/reports", "/about/maps"] },
    activity: { title: 'services', subKey: 'servicesSub', links: ["/services", "/projects", "/production", "/partners", "/deposits", "/anticorruption"] },
    docs: { title: 'docsAndReports', subKey: 'docsSub', links: ["/docs/financial", "/docs/social", "/docs/technical"] },
    base: { title: 'normativeBase', subKey: 'baseSub', links: ["/legal", "/forms", "/instructions"] },
    news: { title: 'announcements', subKey: 'newsSub', links: ["/contests", "/procurement", "/realization", "/vacancies", "/press-center"] },
    contacts: { title: 'contacts', subKey: 'contactsSub', links: ["/phonebook", "/reception", "/bank-details"] }
  };

  return (
    <div className={`mobile-bar-container ${isOpen ? 'active' : ''}`}>
      {/* Затемнение экрана */}
      <div className="mobile-bar-overlay" onClick={onClose}></div>
      
      {/* Выезжающая панель */}
      <div className="mobile-bar-content">
        <div className="mobile-bar-header">
          <img src="/logo.png" alt="Logo" className="mobile-bar-logo" />
          <button className="mobile-bar-close" onClick={onClose}>&times;</button>
        </div>

        <nav className="mobile-bar-nav">
          <Link to="/" className="mobile-bar-link root" onClick={onClose}>
            {getT('main')}
          </Link>

          {Object.entries(subMenus).map(([key, config]) => (
            <div key={key} className="mobile-bar-item">
              <button 
                className={`mobile-bar-link ${activeSub === key ? 'open' : ''}`}
                onClick={() => setActiveSub(activeSub === key ? null : key)}
              >
                {getT(config.title)}
                <span className="mobile-bar-arrow">▼</span>
              </button>
              
              <div className={`mobile-bar-sublist ${activeSub === key ? 'expanded' : ''}`}>
                {getSubT(config.subKey).map((text, index) => (
                  <Link 
                    key={index} 
                    to={config.links[index]} 
                    className="mobile-bar-sublink"
                    onClick={onClose}
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileBar;
