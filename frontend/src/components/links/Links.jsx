import React from 'react';
import './Links.css';
import { useLanguage } from '../../context/LanguageContext';

// Импортируем логотипы из assets
import link1 from '../../assets/link1.png';
import link2 from '../../assets/link2.png';
import link3 from '../../assets/link3.png';
import link4 from '../../assets/link4.png';
import link5 from '../../assets/link5.png';

const Links = () => {
  const { getT } = useLanguage();

  const partnerLinks = [
    { id: 1, img: link1, url: "https://www.geology.kg" },
    { id: 2, img: link2, url: "https://www.president.kg/ru" },
    { id: 3, img: link3, url: "https://mnr.gov.kg/ru/" },
    { id: 4, img: link4, url: "https://www.gov.kg/ru" },
    { id: 5, img: link5, url: "https://portal.tunduk.kg" },
  ];

  return (
    <section className="links-section">
      <div className="container">
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
              <img 
                src={link.img} 
                alt={`Partner ${link.id}`} 
                className="link-logo" 
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Links;
