import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../../LanguageContext';
import './Requisites.css';

const Requisites = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  // Мы видели на скрине, что ID категории Реквизиты = 7
  const categoryId = 7; 

useEffect(() => {
    const fetchRequisites = async () => {
      setLoading(true);
      try {
        // Запрашиваем все посты, как это делает главная страница
        const res = await axios.get("https://kyrgyzgeology.kg/api/posts");
        
        console.log("Все посты с сервера:", res.data);

        if (res.data && res.data.length > 0) {
          // Ищем среди всех постов тот, у которого ID категории равен 7
          // Проверяем и число, и строку на всякий случай
          const found = res.data.find(post => 
            String(post.category) === "7" || 
            (post.category && String(post.category.id) === "7")
          );

          if (found) {
            setData(found);
          } else {
            console.warn("Пост с категорией 7 не найден среди полученных данных");
            setData(null);
          }
        }
      } catch (err) {
        console.error("Ошибка при получении реквизитов:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequisites();
  }, []);

  const getContent = () => {
    if (!data) return "";
    const lang = language?.toLowerCase() || "ru";
    
    // Пытаемся достать контент из разных возможных полей (content, content_ru, text и т.д.)
    return data[`content_${lang === 'kg' ? 'ky' : lang}`] || data.content || data.text || "";
  };

  const getTitle = () => {
    const titles = { RU: "Банковские реквизиты", KG: "Банктык реквизиттер", EN: "Bank Details" };
    return titles[language?.toUpperCase()] || titles.RU;
  };

  return (
    <div className="requisites-page">
      <h1 className="page-title">{getTitle()}</h1>
      <div className="title-underline"></div>
      
      <div className="requisites-card">
        {loading ? (
          <div className="loading-spinner">Идет получение данных с сервера...</div>
        ) : data ? (
          <div 
            className="requisites-text" 
            dangerouslySetInnerHTML={{ __html: getContent() }} 
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
