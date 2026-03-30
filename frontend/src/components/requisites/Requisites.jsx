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
        // Принудительно вызываем загрузку при заходе на страницу
        dispatch(getNews());
    }, [dispatch]);

    // Добавляем логи в консоль, чтобы ты видела, что происходит (потом удалим)
    useEffect(() => {
        console.log("Текущий язык:", language);
        console.log("Все новости из Redux:", news);
    }, [news, language]);

    // Безопасная фильтрация: сначала проверяем, что news — это массив
    const requisitesPost = Array.isArray(news) && news.length > 0 
        ? [...news]
            .filter(item => Number(item.category) === 7) // Приводим к числу на всякий случай
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
        : null;

    const getPageTitle = () => {
        const titles = { 
            RU: "Банковские реквизиты", 
            KG: "Банктык реквизиттер", 
            EN: "Bank Details" 
        };
        return titles[language?.toUpperCase()] || titles.RU;
    };

    // Если всё ещё грузится — показываем явный индикатор
    if (loading && (!news || news.length === 0)) {
        return (
            <div className="requisites-page">
                <div className="main-loader">ЗАГРУЗКА ДАННЫХ...</div>
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
                        {/* Выводим заголовок из API для проверки */}
                        <h3 style={{marginBottom: '20px'}}>
                            {requisitesPost[translate.translatedApi.title[language]] || requisitesPost.title}
                        </h3>
                        
                        <div 
                            className="requisites-text" 
                            dangerouslySetInnerHTML={{ 
                                __html: requisitesPost[translate.translatedApi.content[language]] || requisitesPost.content 
                            }} 
                        />
                    </div>
                ) : (
                    <div className="no-data-info">
                        <p>{language === 'KG' ? 'Маалымат табылган жок' : 'Информация не найдена'}</p>
                        <small style={{color: '#ccc'}}>Категория 7 не найдена в массиве news</small>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
