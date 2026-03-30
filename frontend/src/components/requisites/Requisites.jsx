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

    useEffect(() => {
        // Загружаем новости, если массив пуст
        if (!news || news.length === 0) {
            dispatch(getNews());
        }
    }, [dispatch, news]);

    // БЕЗОПАСНАЯ ФИЛЬТРАЦИЯ: проверяем, что news вообще существует
    const requisitesPost = news && news.length > 0 
        ? [...news]
            .filter(item => item.category === 7)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
        : null;

    const getPageTitle = () => {
        const titles = { RU: "Банковские реквизиты", KG: "Банктык реквизиттер", EN: "Bank Details" };
        return titles[language?.toUpperCase()] || titles.RU;
    };

    // Если идет загрузка и данных еще нет — показываем лоадер
    if (loading && (!news || news.length === 0)) {
        return <div className="main-loader">Загрузка данных...</div>;
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
                                __html: requisitesPost[translate.translatedApi.content[language]] || requisitesPost.content 
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
