import React, { useEffect, useContext } from 'react';
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
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    const sortedAll = [...news].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Категория 1 — Новости. .slice(0, 5) берет 5 элементов (индексы 0-4)
    const newsItems = sortedAll.filter(item => item.category === 1).slice(0, 5);
    
    // Все остальные категории — Объявления. Берем 4 элемента
    const announcementItems = sortedAll.filter(item => item.category !== 1).slice(0, 4);

    const formatShortDate = (dateString) => {
        if (!dateString) return "";
        return dateString.split('T')[0].split('-').reverse().join('.');
    };

    if (loading) return <div className="main-loader">Загрузка...</div>;
    
    // Если новостей и объявлений совсем нет, секция не отображается
    if (newsItems.length === 0 && announcementItems.length === 0) return null;

    return (
        <div className="main-content-wrapper">
            
            {/* НОВОСТИ */}
            {newsItems.length > 0 && (
                <>
                    <div className="main-section-header">
                        <h2>{translate.news[language]}</h2>
                        <span onClick={() => navigate('/news')} className="all-link-btn">ВСЕ НОВОСТИ ↗</span>
                    </div>
                    <div className="news-overlay-grid">
                        {newsItems.map((item, index) => (
                            <div 
                                key={item.id} 
                                className={`news-card-overlay ${index === 0 ? 'big-card' : 'small-card'}`}
                                onClick={() => navigate(`/newsitem/${item.id}`)}
                            >
                                <img src={item.preview || item.image} alt="" />
                                <div className="card-gradient-info">
                                    <span className="info-date">{formatShortDate(item.created_at)}</span>
                                    <h3>{item[translate.translatedApi.title[language]]}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ОБЪЯВЛЕНИЯ */}
            {announcementItems.length > 0 && (
                <>
                    <div className="main-section-header" style={{ marginTop: '60px' }}>
                        <h2>ОБЪЯВЛЕНИЯ И КОНКУРСЫ</h2>
                        <span onClick={() => navigate('/news')} className="all-link-btn">ВСЕ ОБЪЯВЛЕНИЯ ↗</span>
                    </div>
                    <div className="announcements-clean-grid">
                        {announcementItems.map((item) => (
                            <div 
                                key={item.id} 
                                className="announcement-white-card" 
                                onClick={() => navigate(`/newsitem/${item.id}`)}
                            >
                                <div className="ann-img-box">
                                    <img src={item.preview || item.image} alt="" />
                                </div>
                                <div className="ann-content-box">
                                    <span className="ann-date-label">{formatShortDate(item.created_at)}</span>
                                    <h4>{item[translate.translatedApi.title[language]]}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>
    );
};

export default NewsMain;
