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
    <div className={`mobile-drawer ${isOpen ? 'is-open' : ''}`}>
      {/* Затемняющий фон (Overlay) */}
      <div className="mobile-drawer-overlay" onClick={onClose}></div>
      
      {/* Сама шторка */}
      <div className="mobile-drawer-content">
        <div className="mobile-drawer-header">
          <div className="drawer-logo-area">
             <img src="/logo.png" alt="Logo" className="drawer-logo" />
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <nav className="drawer-nav-list">
          <Link to="/" className="drawer-nav-link root-item" onClick={onClose}>
            {getT('main')}
          </Link>

          {Object.entries(subMenus).map(([key, config]) => (
            <div key={key} className="drawer-nav-group">
              <button 
                className={`drawer-nav-link ${activeSub === key ? 'active' : ''}`}
                onClick={() => setActiveSub(activeSub === key ? null : key)}
              >
                {getT(config.title)}
                <span className={`drawer-chevron ${activeSub === key ? 'rotate' : ''}`}>▼</span>
              </button>
              
              <div className={`drawer-submenu ${activeSub === key ? 'expanded' : ''}`}>
                {getSubT(config.subKey).map((text, index) => (
                  <Link 
                    key={index} 
                    to={config.links[index]} 
                    className="drawer-sublink"
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
