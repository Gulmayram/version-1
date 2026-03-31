import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    
    // Безопасно достаем данные из Redux, задавая значения по умолчанию
    const { news = [], loading = false } = useSelector((state) => state.api || {});
    const { language = 'ru' } = useContext(LanguageContext);

    useEffect(() => {
        // Загружаем данные, если их еще нет в сторе
        dispatch(getNews());
    }, [dispatch]);

    // Ищем пост с категорией 7 (Реквизиты)
    // Используем нестрогое равенство (==), чтобы поймать и "7", и 7
    const requisitesPost = Array.isArray(news) 
        ? news.find(item => item.category == 7) 
        : null;

    // Функция для безопасного получения перевода заголовка страницы
    const getPageTitle = () => {
        const titles = { 
            RU: "Банковские реквизиты", 
            KG: "Банктык реквизиттер", 
            EN: "Bank Details" 
        };
        return titles[language?.toUpperCase()] || titles.RU;
    };

    // Если идет загрузка и данных нет — показываем лоадер внутри структуры страницы
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
                                // Добавляем защитную цепочку ?. везде, где может быть undefined
                                __html: requisitesPost[translate?.translatedApi?.content?.[language]] || requisitesPost.content 
                            }} 
                        />
                    </div>
                ) : (
                    <div className="no-data">
                        {language === 'KG' ? 'Маалымат табылган жок' : 'Информация не найдена'}
                        {!loading && (
                            <p style={{fontSize: '12px', color: '#999', marginTop: '10px'}}>
                                (Категория "Реквизиты" с ID 7 не найдена в базе)
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
