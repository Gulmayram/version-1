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
        // Всегда запрашиваем свежие данные при входе
        dispatch(getNews());
    }, [dispatch]);

    // ФИЛЬТРАЦИЯ: ищем объект, у которого category равна 7
    const requisitesPost = news && news.length > 0 
        ? news.find(item => item.category == 7) 
        : null;

    const getPageTitle = () => {
        const titles = { RU: "Банковские реквизиты", KG: "Банктык реквизиттер", EN: "Bank Details" };
        return titles[language?.toUpperCase()] || titles.RU;
    };

    // Показываем лоадер, если идет загрузка и данных еще нет
    if (loading && (!news || news.length === 0)) {
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
                        {/* Выводим контент через dangerouslySetInnerHTML */}
                        <div 
                            className="requisites-text" 
                            dangerouslySetInnerHTML={{ 
                                __html: requisitesPost[translate.translatedApi.content[language]] || requisitesPost.content 
                            }} 
                        />
                    </div>
                ) : (
                    <div className="no-data">
                        {/* Если данных нет после загрузки */}
                        {!loading && (language === 'KG' ? 'Маалымат табылган жок' : 'Информация не найдена')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
