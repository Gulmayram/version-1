import React, { useContext, useEffect } from 'react';
import './HistoryAndMission.css';
import { useDispatch, useSelector } from "react-redux";
import { getAboutCompany, getGP } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";

const HistoryAndMission = () => {
  const dispatch = useDispatch();
  const { gp, aboutCompany } = useSelector((state) => state.api);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    dispatch(getGP());
    dispatch(getAboutCompany());
  }, []);

  return (
    <section className="history-wrapper">
      <div className="hero-section">
        <h1>{translate.history[language]}</h1>
        <p className="subtitle">Официальный портал ГП «Кыргызгеология»</p>
      </div>

      <div className="enterprise-grid">
        {gp.map((g, index) => (
          <div className="enterprise-card" key={index}>
            <div className="icon-box">0{index + 1}</div>
            <h3>{g[translate.translatedApi.title[language]]}</h3>
          </div>
        ))}
      </div>

      {/* Вместо скучных списков используем сетку контента */}
      <div className="info-pivot">
        <div className="pivot-card goals">
          <h3>Цели</h3>
          <p>Обеспечиваем минерально-сырьевую базу страны через инновационные методы исследования.</p>
        </div>
        <div className="pivot-card tasks">
          <h3>Задачи</h3>
          <p>Внедряем научно-технические решения в процессы недропользования.</p>
        </div>
      </div>
    </section>
  );
};
