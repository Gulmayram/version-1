import React, { useContext, useEffect, useRef } from 'react';
import './NewsCards.css'; // Используем те же стили
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";

const NewsMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { news, loading } = useSelector((state) => state.api);
  const { language } = useContext(LanguageContext);
  const newsCardsRef = useRef([]);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  // Сортируем и берем ровно 5 самых последних новостей
  const latestNews = [...news]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const reversingDate = (date) => date?.split('-').reverse().join('-');

  // Анимация появления как в твоем оригинальном коде
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    newsCardsRef.current.forEach(card => card && observer.observe(card));
    return () => observer.disconnect();
  }, [latestNews]);

  if (loading) return null;

  return (
    <div className='news-section' style={{ background: 'transparent', padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0 }}>{translate.news[language]}</h2>
        <button 
          onClick={() => navigate('/news')} 
          className='load-more-btn' 
          style={{ width: 'auto', padding: '10px 30px', marginTop: 0 }}
        >
          Смотреть все →
        </button>
      </div>

      <div className="news-cards-container">
        {latestNews.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (newsCardsRef.current[index] = el)}
            onClick={() => navigate(`/newsitem/${item.id}`)}
            /* index 0 — большая карточка (size-4), остальные 4 — маленькие (size-1) */
            className={`news-card ${index === 0 ? 'size-4' : 'size-1'}`}
          >
            {item.preview && <img src={item.preview} alt="" className="news-image" />}
            <div className="news-content">
              <h3>{item[translate.translatedApi.title[language]]}</h3>
            </div>
            <span className="news-date">{reversingDate(item.created_at)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsMain;
