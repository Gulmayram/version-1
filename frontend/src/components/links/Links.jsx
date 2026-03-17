import React, { useContext } from 'react';
import './Links.css';
import { LanguageContext } from "../../LanguageContext";
import { translate } from "../../assets/translate";

import link1 from '../../assets/link01.png';
import link2 from '../../assets/link02.png';
import link3 from '../../assets/link03.png';
import link4 from '../../assets/link04.png';
import link5 from '../../assets/link05.png';

const Links = () => {
  const { language } = useContext(LanguageContext);

  const getT = (key) => {
    const lang = language || 'RU'; 
    return translate[key] ? translate[key][lang] : key;
  };

  const partnerLinks = [
    { id: 1, img: link1, url: "https://www.geology.kg", name: "Геология КР" },
    { id: 2, img: link2, url: "https://www.president.kg/ru", name: "Президент КР" },
    { id: 3, img: link3, url: "https://mnr.gov.kg/ru/", name: "МПР КР" },
    { id: 4, img: link4, url: "https://www.gov.kg/ru", name: "Кабинет Министров" },
    { id: 5, img: link5, url: "https://portal.tunduk.kg", name: "Түндүк" },
  ];

  return (
    <section className="links-section">
      <div className="links-container">
        <h2 className="links-title">{getT('extra_links_title')}</h2>
        
        <div className="links-grid">
          {partnerLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              className="link-card"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="logo-wrapper">
                <img 
                  src={link.img} 
                  alt={link.name} 
                  className="link-img" 
                />
              </div>
              <span className="link-text">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Links;
