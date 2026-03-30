import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { LanguageContext } from "../../LanguageContext";
import { translate } from "../../assets/translate";
import './Requisites.css';

const Requisites = () => {
    // Берем все новости из Redux (они там уже есть благодаря NewsMain)
    const { news, loading } = useSelector((state) => state.api);
    const { language } = useContext(LanguageContext);

    // ID категории Реквизиты
    const REQUISITES_CATEGORY_ID = 7;

    // Фильтруем: берем только посты с категорией 7 и сортируем по дате (самый свежий — первый)
    const requisitesPost = [...news]
        .filter(item => item.category === REQUISITES_CATEGORY_ID)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    // Функция для получения заголовка страницы
    const getPageTitle = () => {
        const titles = {
            RU: "Банковские реквизиты",
            KG: "Банктык реквизиттер",
            EN: "Bank Details"
        };
        return titles[language?.toUpperCase()] || titles.RU;
    };

    if (loading) return <div className="loading-spinner">Загрузка...</div>;

    return (
        <div className="requisites-page">
            <h1 className="page-title">{getPageTitle()}</h1>
            <div className="title-underline"></div>
            
            <div className="requisites-card">
                {requisitesPost ? (
                    <div 
                        className="requisites-text"
                        // Используем системный перевод для полей заголовка и контента
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
