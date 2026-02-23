import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getNews } from "../../store/apiSlice";
import { LanguageContext } from "../../LanguageContext";
import { translate } from "../../assets/translate";
import './NewsMain.css';

const NewsMain = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { news, loading } = useSelector((state) => state.api);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    const latestNews = [...news]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    if (loading || latestNews.length === 0) return null;

    return (
        <section className="news-main-container">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center'}}>
                <h2 style={{color: '#0D3E61', fontSize: '28px'}}>{translate.news[language]}</h2>
                <span onClick={() => navigate('/news')} style={{cursor: 'pointer', color: '#007bff'}}>
                    Все новости →
                </span>
            </div>

            <div className="news-main-grid">
                {latestNews.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`nm-card ${index === 0 ? 'nm-main' : 'nm-side'}`}
                        onClick={() => navigate(`/newsitem/${item.id}`)}
                    >
                        <img src={item.preview || item.image} alt="" />
                        <div className="nm-overlay">
                            <span className="nm-date">{item.created_at?.split('T')[0]}</span>
                            <h3>{item[translate.translatedApi.title[language]]}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewsMain;
