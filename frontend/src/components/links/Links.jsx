import React from 'react';
import './Links.css';
import { useLanguage } from '../../context/LanguageContext';

const Links = () => {
  const { getT } = useLanguage();

  const partnerLinks = [
    { 
      id: 1, 
      img: "/link1.png", 
      url: "https://www.geology.kg" 
    },
    { 
      id: 2, 
      img: "/link2.png", 
      url: "https://www.president.kg/ru" 
    },
    { 
      id: 3, 
      img: "/link3.png", 
      url: "https://mnr.gov.kg/ru/" 
    },
    { 
      id: 4, 
      img: "/link4.png", 
      url: "https://www.gov.kg/ru" 
    },
    { 
      id: 5, 
      img: "/link5.png", 
      url: "https://portal.tunduk.kg" 
    },
  ];

  return (
    <section className="links-section">
      <div className="container">
        {/* Убедись, что в словаре перевода есть ключ 'extra_links_title' */}
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
