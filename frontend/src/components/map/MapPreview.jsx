import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";
import { Link } from 'react-router-dom';
import './MapPreview.css';
import mapImg from '../../assets/map-preview.jpg'; // Замени на путь к твоей картинке карты

const MapPreview = () => {
  const { language } = useContext(LanguageContext);
  const getT = (key) => translate[key] ? translate[key][language] : key;

  return (
    <section className="map-preview-section">
      <div className="map-preview-card">
        <div className="map-preview-info">
          <div className="map-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {getT('map_badge')}
          </div>
          
          <h2 className="map-preview-title">{getT('map_title')}</h2>
          <p className="map-preview-desc">{getT('map_desc')}</p>
          
          <Link to="/map" className="map-go-btn">
            {getT('map_button')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        <div className="map-preview-image-container">
          <div className="map-image-wrapper">
             <img src={mapImg} alt="Kyrgyzstan Map" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;
