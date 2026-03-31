import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    
    // Получаем то, что лежит в Redux (сейчас это объект с results)
    const { news, loading = false } = useSelector((state) => state.api || {});
    const { language = 'ru' } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    // ЛОГИКА РАСПАКОВКИ:
    // 1. Если news — это уже массив, используем его.
    // 2. Если news — это объект (пагинация), берем news.results.
    // 3. Иначе — пустой массив.
    const newsArray = Array.isArray(news) 
        ? news 
        : (news?.results || []);

    // Теперь ищем пост в правильном массиве
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
                        {/* Техническая подсказка для тебя (потом можно убрать) */}
                        {!loading && newsArray.length === 0 && (
                            <p style={{fontSize: '10px', color: 'red'}}>Массив новостей пуст. Проверь API.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
