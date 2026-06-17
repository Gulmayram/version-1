import React, { useContext, useEffect } from 'react';
import './HistoryAndMission.css';
import { useDispatch, useSelector } from "react-redux";
import { getAboutCompany, getGP } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const IconBuilding = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M8 7h2v2H8z"/><path d="M8 11h2v2H8z"/><path d="M8 15h2v2H8z"/>
  </svg>
);

const HistoryAndMission = () => {
  const dispatch = useDispatch();
  const { gp, aboutCompany } = useSelector((state) => state.api);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGP());
    dispatch(getAboutCompany());
  }, []);

  return (
    <section className="history-mission">
      <div className="history-hero">
        <h1>{translate.history[language]}</h1>
        <div className="hero-divider"></div>
      </div>

      <div className="enterprise-container">
        <h2 className="enterprise-title">ГП «Кыргызгеология»</h2>
        <p className="enterprise-desc">
          Образовано Постановлением Правительства КР № 170 от 23 апреля 2021 года. 
          Объединяет в себе экспертизу и научный потенциал шести ведущих предприятий.
        </p>
        
        <div className="enterprise-grid">
          {gp.map((g, index) => (
            <div className="enterprise-card" key={index} onClick={() => navigate(`/gp/${g.id}`)}>
              <div className="card-icon"><IconBuilding /></div>
              <span className="card-number">0{index + 1}</span>
              <p className="card-text">{g[translate.translatedApi.title[language]]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mission-content">
        <h3 className="section-title">{translate.aboutCompany[language]}</h3>
        <div 
          className="body-text"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutCompany[translate.translatedApi.body[language]] || '') }}
        />
      </div>
    </section>
  );
};

export default HistoryAndMission;
