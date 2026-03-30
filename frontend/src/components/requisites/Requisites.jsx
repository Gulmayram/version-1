import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    
    // Получаем данные из Redux-хранилища
    const { news, loading } = useSelector((state) => state.api);
    const { language } = useContext(LanguageContext);

    // Вызываем загрузку данных при монтировании, если они еще не загружены
    useEffect(() => {
        if (news.length === 0) {
            dispatch(getNews());
        }
    }, [dispatch, news.length]);

    // 1. Сортируем все посты по дате создания (самые новые в начале)
    const sortedAll = [...news].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // 2. Фильтруем массив, оставляя только посты с категорией ID 7 (Реквизиты)
    // Используем .slice(0, 1) или просто берем [0], так как нам нужен только один актуальный пост
    const requisitesPost = sortedAll.filter(item => item.category === 7)[0];

    // Функция для локализации заголовка страницы
    const getPageTitle = () => {
        const titles = {
            RU: "Банковские реквизиты",
            KG: "Банктык реквизиттер",
            EN: "Bank Details"
        };
        const langKey = language?.toUpperCase() || "RU";
        return titles[langKey] || titles.RU;
    };

    // Состояние загрузки
    if (loading && news.length === 0) {
        return (
            <div className="requisites-page">
                <div className="main-loader">Загрузка данных...</div>
            </div>
        );
    }

    return (
        <div className="requisites-page">
            <h1 className="page-title">{getPageTitle()}</h1>
            <div className="title-underline"></div>
            
            <div className="requisites-card">
                {requisitesPost ? (
                    <div className="requisites-content-wrapper">
                        {/* Отображаем заголовок поста, если нужно */}
                        <h2 className="requisites-subtitle">
                            {requisitesPost[translate.translatedApi.title[language]]}
                        </h2>
                        
                        {/* Выводим основной контент с поддержкой HTML-тегов из админки */}
                        <div 
                            className="requisites-text" 
                            dangerouslySetInnerHTML={{ 
                                __html: requisitesPost[translate.translatedApi.content[language]] 
                            }} 
                        />
                    </div>
                ) : (
                    <div className="no-data">
                        {language === 'KG' ? 'Маалымат табылган жок' : 'Информация не найдена'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
