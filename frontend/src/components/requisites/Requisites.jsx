import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../../LanguageContext'; // Проверь путь к контексту
import './Requisites.css';

const Requisites = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  // Твой ID из админки теперь точно 7
  const categoryId = "7"; 

  useEffect(() => {
    const fetchRequisites = async () => {
      setLoading(true);
      try {
        // Запрос к API. Добавляем фильтр по категории
        const res = await axios.get("/api/posts?categoryId=7");
        
        if (res.data && res.data.length > 0) {
          // Берем самый свежий пост из этой категории
          setData(res.data[0]); 
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

  // Функция для получения заголовка в зависимости от языка
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
            // Это выведет текст с сохранением форматирования из админки (жирный, списки и т.д.)
            dangerouslySetInnerHTML={{ __html: data.content }} 
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
