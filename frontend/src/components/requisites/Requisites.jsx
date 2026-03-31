import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const dispatch = useDispatch();
    
    // Подстраховка: если api или news не определены, используем пустой массив
    const { news = [], loading = false } = useSelector((state) => state.api || {});
    const { language = 'ru' } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    // ОТЛАДКА: Посмотри в консоль (F12), что именно прилетает в news
    console.log("Все новости из Redux:", news);
    console.log("Текущий язык:", language);

    // Поиск поста. Пробуем найти через == (число или строка)
    const requisitesPost = Array.isArray(news) 
        ? news.find(item => String(item.category) === "7") 
        : null;

    if (loading && (!news || news.length === 0)) {
        return (
            <div className="requisites-page">
                <div className="main-loader">Загрузка данных...</div>
            </div>
        );
    }

    return (
        <div className="requisites-page">
            <h1 className="page-title">
                {language === 'KG' ? 'Банктык реквизиттер' : 'Банковские реквизиты'}
            </h1>
            <div className="title-underline"></div>
            
            <div className="requisites-card">
                {requisitesPost ? (
                    <div className="requisites-content-wrapper">
                        <div 
                            className="requisites-text" 
                            dangerouslySetInnerHTML={{ 
                                // Безопасный доступ к переводам через опциональную цепочку
                                __html: requisitesPost[translate?.translatedApi?.content?.[language]] || requisitesPost.content 
                            }} 
                        />
                    </div>
                ) : (
                    <div className="no-data">
                        {language === 'KG' ? 'Маалымат табылган жок' : 'Информация не найдена'}
                        <p style={{fontSize: '10px', color: '#ccc', marginTop: '15px'}}>
                            Категория 7 не найдена в массиве news
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requisites;
