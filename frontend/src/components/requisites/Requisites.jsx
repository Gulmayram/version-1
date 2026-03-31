import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    
    // Получаем то, что лежит в сторе (там сейчас объект с пагинацией)
    const { news, loading = false } = useSelector((state) => state.api || {});
    const { language = 'ru' } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    // ЛОГИКА ИСПРАВЛЕНИЯ:
    // Если news - это объект и в нем есть results, берем results.
    // Если news - это уже массив, берем его.
    const newsArray = news?.results || (Array.isArray(news) ? news : []);

    // Теперь ищем в правильном массиве
    const requisitesPost = newsArray.find(item => String(item.category) === "7");

    const getDescriptionField = () => {
        const lang = language?.toLowerCase();
        if (lang === 'kg' || lang === 'ky') return 'description_ky';
        if (lang === 'en') return 'description_en';
        return 'description_ru';
    };

    const getPageTitle = () => {
        const titles = { RU: "Банковские реквизиты", KG: "Банктык реквизиттер", EN: "Bank Details" };
        return titles[language?.toUpperCase()] || titles.RU;
    };

    if (loading && newsArray.length === 0) {
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
                        <div 
                            className="requisites-text" 
                            dangerouslySetInnerHTML={{ 
                                __html: requisitesPost[getDescriptionField()] || requisitesPost.description_ru 
                            }} 
                        />
                    </div>
                ) : (
                    <div className="no-data">
                        {language === 'KG' ? 'Маалымат табылган жок' : 'Информация не найдена'}
                        {/* Временная подсказка для отладки, если всё равно не находит */}
                        {newsArray.length > 0 && <p style={{fontSize: '10px', color: 'gray'}}>Пост с категорией 7 не найден в {newsArray.length} записях</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
