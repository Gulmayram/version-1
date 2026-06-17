import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { getAboutCompany, getGP } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './HistoryAndMission.css';

const HistoryAndMission = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gp, aboutCompany } = useSelector((state) => state.api);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    dispatch(getGP());
    dispatch(getAboutCompany());
  }, []);

  return (
    <div className="hq-page-container">
      {/* Главный заголовок с графическим акцентом */}
      <section className="hq-hero">
        <h1 className="hq-hero-title">{translate.history[language]}</h1>
        <div className="hq-hero-line"></div>
      </section>

      {/* Блок о предприятии - акцентная плашка */}
      <section className="hq-intro-card">
        <h2 className="hq-intro-title">ГП «Кыргызгеология»</h2>
        <p className="hq-intro-text">
          Ведущая геологическая организация страны. Мы объединяем научный потенциал и современные технологии для развития минерально-сырьевой базы Кыргызстана.
        </p>
      </section>

      {/* Сетка целей и задач - превращаем список в визуальные блоки */}
      <section className="hq-strategy-grid">
        <div className="hq-strategy-card primary">
          <h3>Стратегические цели</h3>
          <ul>
            <li>Обеспечение государства услугами в сфере геологии.</li>
            <li>Реализация масштабных государственных программ.</li>
            <li>Инновационное изучение недр и расширение сырьевой базы.</li>
          </ul>
        </div>
        
        <div className="hq-strategy-card secondary">
          <h3>Ключевые задачи</h3>
          <ul>
            <li>Внедрение высокотехнологичных методов исследований.</li>
            <li>Комплексное геологоразведочное картирование.</li>
            <li>Повышение эффективности недропользования.</li>
          </ul>
        </div>
      </section>

      {/* Список подразделений (как карточки) */}
      <section className="hq-units">
        <h3>Наши подразделения</h3>
        <div className="hq-units-grid">
          {gp.map((g, index) => (
            <div className="hq-unit-item" key={index} onClick={() => navigate(`/gp/${g.id}`)}>
              <span className="hq-unit-number">0{index + 1}</span>
              <p>{g[translate.translatedApi.title[language]]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HistoryAndMission;
