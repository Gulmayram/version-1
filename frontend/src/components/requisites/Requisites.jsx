import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    
    // Безопасное получение данных из Redux с дефолтными значениями
    const { news = [], loading = false } = useSelector((state) => state.api || {});
    const { language = 'ru' } = useContext(LanguageContext);

    useEffect(() => {
        // Принудительный запрос данных при монтировании
        dispatch(getNews());
    }, [dispatch]);

    // Поиск нужного поста по ID категории 7
    const requisitesPost = Array.isArray(news) 
        ? news.find(item => String(item.category) === "7") 
        : null;

    // Локальные переводы заголовка для надежности
    const getPageTitle = () => {
        const titles = { 
            RU: "Банковские реквизиты", 
            KG: "Банктык реквизиттер", 
            EN: "Bank Details" 
        };
        const langKey = language?.toUpperCase() || 'RU';
        return titles[langKey] || titles.RU;
    };

    // Если идет загрузка и данных в стейте еще нет
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
                                // Использование опциональной цепочки ?. предотвращает крах приложения
                                __html: requisitesPost[translate?.translatedApi?.content?.[language]] || requisitesPost.content 
                            }} 
                        />
                    </div>
                ) : (
                    <div className="no-data">
                        {language === 'KG' ? 'Маалымат табылган жок' : 'Информация не найдена'}
                        {!loading && (
                            <p style={{fontSize: '11px', color: '#888', marginTop: '10px'}}>
                                Проверьте наличие публикации с категорией "Реквизиты" (ID 7) в админ-панели.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
