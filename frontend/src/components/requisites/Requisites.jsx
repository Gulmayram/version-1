import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    const { news, loading } = useSelector((state) => state.api);
    const { language } = useContext(LanguageContext);

    // Вызываем загрузку новостей при открытии страницы, 
    // чтобы данные в Redux точно были свежими
    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    // 1. Сортируем все посты по дате (как в NewsMain)
    const sortedAll = [...news].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // 2. Ищем пост именно с категорией 7 (Реквизиты)
    const requisitesPost = sortedAll.find(item => item.category === 7);

    // Функция для перевода заголовка страницы (можно вынести в translate.js позже)
    const getPageTitle = () => {
        const titles = {
            RU: "Банковские реквизиты",
            KG: "Банктык реквизиттер",
            EN: "Bank Details"
        };
        return titles[language?.toUpperCase()] || titles.RU;
    };

    if (loading) return <div className="loading-spinner">Загрузка данных...</div>;

    return (
        <div className="requisites-page">
            <h1 className="page-title">{getPageTitle()}</h1>
            <div className="title-underline"></div>
            
            <div className="requisites-card">
                {requisitesPost ? (
                    <div 
                        className="requisites-text"
                        // Используем логику перевода контента из твоего NewsMain
                        dangerouslySetInnerHTML={{ 
                            __html: requisitesPost[translate.translatedApi.content[language]] || requisitesPost.content 
                        }} 
                    />
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
