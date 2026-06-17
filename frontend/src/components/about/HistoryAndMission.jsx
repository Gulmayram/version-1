import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { getAboutCompany, getGP } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './HistoryAndMission.css';

// SVG Иконки встроены для надежности
const IconTarget = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#fff'}}>
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const IconTask = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#fff'}}>
    <polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);

export const HistoryAndMission = () => {
  const dispatch = useDispatch();
  const { gp, aboutCompany } = useSelector((state) => state.api);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGP());
    dispatch(getAboutCompany());
  }, []);

  return (
    <section className="history-wrapper">
      <div className="hero-section">
        <h1>{translate.history[language]}</h1>
        <div className="accent-line"></div>
      </div>

      <div className="enterprise-grid">
        {gp.map((g, index) => (
          <div className="enterprise-card" key={index} onClick={() => navigate(`/gp/${g.id}`)}>
            <div className="icon-box">0{index + 1}</div>
            <h3>{g[translate.translatedApi.title[language]]}</h3>
          </div>
        ))}
      </div>

      <div className="info-pivot">
        <div className="pivot-card goals">
          <IconTarget />
          <h3>Цели</h3>
          <p>Развитие минерально-сырьевой базы через инновации и высокие стандарты недропользования.</p>
        </div>
        <div className="pivot-card tasks">
          <IconTask />
          <h3>Задачи</h3>
          <p>Комплексное геологическое изучение и внедрение передовых научно-технических решений.</p>
        </div>
      </div>
      
      {aboutCompany && (
        <div className="content-body" 
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutCompany[translate.translatedApi.body[language]] || '') }} 
        />
      )}
    </section>
  );
};
