import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPreview.css';

// Фикс иконок для Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapPreview = () => {
  const { language } = useContext(LanguageContext);
  const getT = (key) => translate[key] ? translate[key][language] : key;

  // Координаты центра Кыргызстана
  const centerPosition = [41.2044, 74.7661];

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

        <div className="map-preview-visual">
          <div className="leaflet-wrapper">
            <MapContainer 
              center={centerPosition} 
              zoom={6} 
              scrollWheelZoom={false} 
              zoomControl={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              <Marker position={[42.8746, 74.5698]} /> {/* Метка Бишкека для вида */}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;
