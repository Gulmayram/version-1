import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../../LanguageContext'; 
import './Requisites.css';

const Requisites = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  const categoryId = "7"; 

  useEffect(() => {
    const fetchRequisites = async () => {
      setLoading(true);
      try {
        // Используем относительный путь, так как проект в Docker/Vercel
        const res = await axios.get(`/api/posts?categoryId=${categoryId}`);
        
        if (res.data && res.data.length > 0) {
          // Берем самый первый (последний добавленный) пост
          setData(res.data[0]); 
          console.log("Данные получены:", res.data[0]); // Для проверки в консоли F12
        } else {
          setData(null);
        }
      } catch (err) {
        console.error("Ошибка при получении реквизитов:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequisites();
  }, [categoryId]);

  // Функция для выбора правильного поля контента в зависимости от языка
  const getContent = () => {
    if (!data) return "";
    
    const lang = language?.toLowerCase() || "ru";
    
    // Проверяем наличие мультиязычных полей из Django
    if (lang === 'kg' || lang === 'ky') return data.content_ky || data.content_ru || data.content;
    if (lang === 'en') return data.content_en || data.content_ru || data.content;
    
    return data.content_ru || data.content;
  };

  const getTitle = () => {
    const lang = language?.toUpperCase() || "RU";
    const titles = {
      RU: "Банковские реквизиты",
      KG: "Банктык реквизиттер",
      EN: "Bank Details"
    };
    return titles[lang] || titles.RU;
  };

  return (
    <div className="requisites-page">
      <h1 className="page-title">{getTitle()}</h1>
      <div className="title-underline"></div>
      
      <div className="requisites-card">
        {loading ? (
          <div className="loading-spinner">Загрузка данных...</div>
        ) : data ? (
          <div 
            className="requisites-text" 
            // Теперь вызываем функцию getContent()
            dangerouslySetInnerHTML={{ __html: getContent() }} 
          />
        ) : (
          <div className="no-data">
            {language === 'KG' || language === 'ky' ? 'Маалымат табылган жок' : 'Информация не найдена'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requisites;
