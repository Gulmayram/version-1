import React, { useContext, useEffect } from 'react';
import './HistoryAndMission.css';
import { useDispatch, useSelector } from "react-redux";
import { getAboutCompany, getGP } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import RedirectIcon from "../../assets/maximize.svg";

const HistoryAndMission = () => {
  const dispatch = useDispatch();
  const { gp, aboutCompany } = useSelector((state) => state.api);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGP());
    dispatch(getAboutCompany());
  }, []);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <section className="history-mission">
      <header className="page-header">
        <h2>{translate.history[language]}</h2>
        <div className="header-underline"></div>
      </header>

      <div className="stateEnterprise-container">
        <h1 className="stateEnterprise-title">ГП «Кыргызгеология»</h1>
        <p className="stateEnterprise-description">
          {/* Можно вынести в перевод, если нужно */}
          Образовано Постановлением Правительства КР № 170 от 23 апреля 2021 года на базе Северо-Кыргызской геологической экспедиции путем объединения 6 госпредприятий:
        </p>
        
        <div className="stateEnterprise-grid">
          {gp.map((g, index) => (
            <div className="stateEnterprise-item" key={index} onClick={() => navigate(`/gp/${g.id}`)}>
              <span className="item-number">0{index + 1}</span>
              <p className="item-title">{g[translate.translatedApi.title[language]]}</p>
              <div className="item-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mission-content">
        <h3>{translate.aboutCompany[language]}</h3>
        <div 
          className="body-text"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutCompany[translate.translatedApi.body[language]] || '') }}
        />

        {aboutCompany?.file && (
          <div className="pdf-viewer-section">
            <h4>Официальный документ</h4>
            {isMobile ? (
              <a href={aboutCompany.file} target="_blank" rel="noopener noreferrer" className="pdf-mobile-link">
                <img src={RedirectIcon} alt="view" />
                {translate.viewPdf[language]}
              </a>
            ) : (
              <div className="pdf-embed-wrapper">
                <embed type="application/pdf" src={aboutCompany.file} width="100%" height="600px" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HistoryAndMission;
