import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    
    // Безопасно достаем новости из Redux
    const { news = [], loading = false } = useSelector((state) => state.api || {});
    const { language = 'ru' } = useContext(LanguageContext);

    useEffect(() => {
        // Загружаем данные при монтировании компонента
        dispatch(getNews());
    }, [dispatch]);

    // Ищем объект "Банковские реквизиты" по ID категории 7
    const requisitesPost = Array.isArray(news) 
        ? news.find(item => String(item.category) === "7") 
        : null;

    // Функция для определения ключа описания (description_...) на основе языка
    const getDescriptionField = () => {
        const lang = language?.toLowerCase();
        if (lang === 'kg' || lang === 'ky') return 'description_ky';
        if (lang === 'en') return 'description_en';
        return 'description_ru';
    };

    // Локализованный заголовок страницы
    const getPageTitle = () => {
        const titles = { 
            RU: "Банковские реквизиты", 
            KG: "Банктык реквизиттер", 
            EN: "Bank Details" 
        };
        return titles[language?.toUpperCase()] || titles.RU;
    };

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
                        <div 
                            className="requisites-text" 
                            dangerouslySetInnerHTML={{ 
                                // Берем данные из полей description_ru/ky/en, которые видны в API
                                __html: requisitesPost[getDescriptionField()] || requisitesPost.description_ru 
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
