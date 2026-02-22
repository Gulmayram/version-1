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

  const subMenus = {
    about: { title: 'aboutCompany', subKey: 'aboutSub', links: ["/about/info", "/about/management", "/about/charter", "/about/structure", "/about/reports", "/about/maps"] },
    activity: { title: 'services', subKey: 'servicesSub', links: ["/services", "/projects", "/production", "/partners", "/deposits", "/anticorruption"] },
    docs: { title: 'docsAndReports', subKey: 'docsSub', links: ["/docs/financial", "/docs/social", "/docs/technical"] },
    base: { title: 'normativeBase', subKey: 'baseSub', links: ["/legal", "/forms", "/instructions"] },
    news: { title: 'announcements', subKey: 'newsSub', links: ["/contests", "/procurement", "/realization", "/vacancies", "/press-center"] },
    contacts: { title: 'contacts', subKey: 'contactsSub', links: ["/phonebook", "/reception", "/bank-details"] }
  };

  return (
    <div className={`mobile-menu-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <nav className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
        <Link to="/" className="mobile-menu-link main-link" onClick={onClose}>
          {getT('main')}
        </Link>

        {Object.entries(subMenus).map(([key, config]) => (
          <div key={key} className="mobile-menu-item">
            <button 
              className={`mobile-menu-link ${activeSub === key ? 'active' : ''}`}
              onClick={() => setActiveSub(activeSub === key ? null : key)}
            >
              {getT(config.title)}
              <span className={`chevron ${activeSub === key ? 'rotate' : ''}`}>▼</span>
            </button>
            
            <div className={`mobile-submenu ${activeSub === key ? 'open' : ''}`}>
              {translate[config.subKey][language?.toUpperCase() || "RU"].map((text, index) => (
                <Link key={index} to={config.links[index]} className="mobile-sublink" onClick={onClose}>
                  {text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MobileBar;
