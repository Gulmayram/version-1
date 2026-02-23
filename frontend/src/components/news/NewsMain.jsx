import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getNews } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './NewsMain.css';

const NewsMain = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { news, loading } = useSelector((state) => state.api);
    const { language } = React.useContext(LanguageContext);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    // Сортировка по дате (свежие сверху)
    const sortedAll = [...news].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // РАЗДЕЛЕНИЕ ПО ТИПУ (на основе ID из вашей админки)
    // Категория 1 — Новости
    const newsItems = sortedAll.filter(item => item.category === 1).slice(0, 5);
    
    // Категории 2, 3, 4 — Объявления и Конкурсы
    const announcementItems = sortedAll.filter(item => [2, 3, 4].includes(item.category)).slice(0, 4);

    const formatShortDate = (dateString) => {
        if (!dateString) return "";
        return dateString.split('T')[0].split('-').reverse().join('.');
    };

    if (loading) return <div className="main-loader">Загрузка...</div>;

    return (
        <div className="main-content-wrapper">
            
            {/* СЕКЦИЯ: НОВОСТИ (Текст поверх фото) */}
            <div className="main-section-header">
                <h2>{translate.news[language]}</h2>
                <span onClick={() => navigate('/news')} className="all-link">ВСЕ НОВОСТИ ↗</span>
            </div>

            

            <div className="news-overlay-grid">
                {newsItems.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`news-item-overlay ${index === 0 ? 'big-card' : 'small-card'}`}
                        onClick={() => navigate(`/newsitem/${item.id}`)}
                    >
                        <img src={item.preview || item.image} alt="" />
                        <div className="overlay-content">
                            <span className="overlay-date">{formatShortDate(item.created_at)}</span>
                            <h3>{item[translate.translatedApi.title[language]]}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* СЕКЦИЯ: ОБЪЯВЛЕНИЯ (Текст под фото) */}
            <div className="main-section-header" style={{ marginTop: '60px' }}>
                <h2>ОБЪЯВЛЕНИЯ И КОНКУРСЫ</h2>
                <span onClick={() => navigate('/news')} className="all-link">ВСЕ ОБЪЯВЛЕНИЯ ↗</span>
            </div>

            

            <div className="announcements-clean-row">
                {announcementItems.map((item) => (
                    <div 
                        key={item.id} 
                        className="announcement-clean-card" 
                        onClick={() => navigate(`/newsitem/${item.id}`)}
                    >
                        <div className="ann-card-img">
                            <img src={item.preview || item.image} alt="" />
                        </div>
                        <div className="ann-card-body">
                            <span className="ann-date-text">{formatShortDate(item.created_at)}</span>
                            <h4>{item[translate.translatedApi.title[language]]}</h4>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default NewsMain;
