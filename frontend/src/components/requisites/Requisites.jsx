import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    // Добавляем защиту на случай, если api или news не определены
    const { news = [], loading = false } = useSelector((state) => state.api || {});
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    // Максимально простая фильтрация без лишних наворотов
    const post = news && news.length > 0 
        ? news.find(item => String(item.category) === "7") 
        : null;

    return (
        <div className="requisites-page">
            <h1 className="page-title">
                {language === 'KG' ? 'Банктык реквизиттер' : 'Банковские реквизиты'}
            </h1>
            <div className="title-underline"></div>
            
            <div className="requisites-card">
                {loading && news.length === 0 ? (
                    <div>Загрузка...</div>
                ) : post ? (
                    <div className="requisites-text">
                        {/* Выводим сначала просто заголовок для теста */}
                        <h3>{post[translate?.translatedApi?.title[language]] || post.title}</h3>
                        <div dangerouslySetInnerHTML={{ 
                            __html: post[translate?.translatedApi?.content[language]] || post.content 
                        }} />
                    </div>
                ) : (
                    <div className="no-data">Информация не найдена (Категория 7)</div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
