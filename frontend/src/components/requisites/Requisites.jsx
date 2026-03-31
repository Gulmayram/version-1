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
        // Принудительно обновляем данные при заходе на страницу
        dispatch(getNews());
    }, [dispatch]);

    // 1. Ищем пост. Используем == вместо === на случай, если ID прилетает строкой
    // И проверяем поле category, как в NewsMain
    const requisitesPost = Array.isArray(news) 
        ? news.find(item => String(item.category) === "7") 
        : null;

    const getPageTitle = () => {
        const titles = { 
            RU: "Банковские реквизиты", 
            KG: "Банктык реквизиттер", 
            EN: "Bank Details" 
        };
        return titles[language?.toUpperCase()] || titles.RU;
    };

    if (loading && (!news || news.length === 0)) {
        return <div className="main-loader">Загрузка...</div>;
    }

    return (
        <div className="requisites-page">
            <h1 className="page-title">{getPageTitle()}</h1>
            <div className="title-underline"></div>
            
            <div className="requisites-card">
                {requisitesPost ? (
                    <div className="requisites-content-wrapper">
                        {/* Используем те же поля перевода, что и в новостях */}
                        <div 
                            className="requisites-text" 
                            dangerouslySetInnerHTML={{ 
                                __html: requisitesPost[translate.translatedApi.content[language]] || requisitesPost.content 
                            }} 
                        />
                    </div>
                ) : (
                    <div className="no-data">
                        {/* Если не нашли категорию 7, выводим это для отладки */}
                        {language === 'KG' ? 'Маалымат табылган жок' : 'Информация не найдена'}
                        <br/>
                        <small style={{color: '#ccc', fontSize: '10px'}}>Проверьте, что в админке у поста стоит категория ID 7</small>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
