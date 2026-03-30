import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { LanguageContext } from "../../LanguageContext";
import { translate } from "../../assets/translate"; // Используем твой объект перевода
import './Requisites.css';

const Requisites = () => {
    // Берем данные из Redux, которые уже загружены на главной
    const { news } = useSelector((state) => state.api);
    const { language } = useContext(LanguageContext);

    // Ищем пост, у которого категория 7 (Реквизиты)
    // .find вернет самый первый подходящий объект
    const data = news.find(item => item.category === 7);

    const getTitle = () => {
        const titles = {
            RU: "Банковские реквизиты",
            KG: "Банктык реквизиттер",
            EN: "Bank Details"
        };
        return titles[language?.toUpperCase()] || titles.RU;
    };

    return (
        <div className="requisites-page">
            <h1 className="page-title">{getTitle()}</h1>
            <div className="title-underline"></div>
            
            <div className="requisites-card">
                {data ? (
                    <div 
                        className="requisites-text" 
                        // Используем твою логику перевода полей из translate.translatedApi
                        dangerouslySetInnerHTML={{ 
                            __html: data[translate.translatedApi.content[language]] || data.content 
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
