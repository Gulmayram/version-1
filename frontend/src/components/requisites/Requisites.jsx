import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    const { news = [], loading = false } = useSelector((state) => state.api || {});
    const { language = 'ru' } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    // Ищем пост с категорией 7
    const requisitesPost = Array.isArray(news) 
        ? news.find(item => String(item.category) === "7") 
        : null;

    // Определяем, какое поле с текстом брать (description_...)
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

    if (loading && news.length === 0) {
        return (
            <div className="requisites-page">
                <div className="main-loader">Загрузка...</div>
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
                                // Используем description_... вместо content
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
