import React from 'react';
import './Links.css';
import { useLanguage } from '../../context/LanguageContext';

// Импортируй логотипы (добавь их в assets/partners/)
// import logo1 from '../../assets/partners/logo1.png';
// и так далее...

const Links = () => {
  const { getT } = useLanguage();

  const partnerLinks = [
    { id: 1, img: "/path-to-logo1.png", url: "#" },
    { id: 2, img: "/path-to-logo2.png", url: "#" },
    { id: 3, img: "/path-to-logo3.png", url: "#" },
    { id: 4, img: "/path-to-logo4.png", url: "#" },
    { id: 5, img: "/path-to-logo5.png", url: "#" },
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
              <img src={link.img} alt={`Partner ${link.id}`} className="link-logo" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Links;
