import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";

const Navbar = () => {
  const { language } = useContext(LanguageContext);
  const [activeMenu, setActiveMenu] = useState(null);

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
    <nav className="tablet-navbar">
      <div className="navbar-container">
        {/* Логотип-ссылка слева */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="navbar-logo-img" />
          <div className="navbar-logo-text">
            <h3>{getT('kyrgyzgeology')}</h3>
          </div>
        </Link>

        {/* Меню справа от логотипа */}
        <div className="navbar-inner">
          {Object.entries(subMenus).map(([key, config]) => (
            <div 
              key={key} 
              className="nav-group"
              onMouseEnter={() => setActiveMenu(key)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="nav-item-btn">
                <span>{getT(config.title)}</span>
                <span className="nav-arrow">▼</span>
              </button>

              {activeMenu === key && (
                <ul className="nav-dropdown">
                  {getSubT(config.subKey).map((text, index) => (
                    <li key={index}>
                      <Link to={config.links[index]} onClick={() => setActiveMenu(null)}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
