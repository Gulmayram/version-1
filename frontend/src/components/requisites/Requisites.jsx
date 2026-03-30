import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Requisites.css';

const Requisites = () => {
  const [data, setData] = useState(null);
  // ВАЖНО: Замени на ID категории, которую создала в админке
  const categoryId = "ТВОЙ_ID"; 

  useEffect(() => {
    const fetchRequisites = async () => {
      try {
        // Проверь URL своего API (обычно это /api/category/ID или /api/posts...)
        const res = await axios.get(`http://localhost:5000/api/posts?categoryId=${categoryId}`);
        if (res.data && res.data.length > 0) {
          setData(res.data[0]); 
        }
      } catch (err) {
        console.error("Ошибка при получении реквизитов:", err);
      }
    };
    fetchRequisites();
  }, [categoryId]);

  return (
    <div className="requisites-page">
      <h1 className="page-title">Банковские реквизиты</h1>
      <div className="title-underline"></div>
      
      <div className="requisites-card">
        {data ? (
          <div 
            className="requisites-text" 
            dangerouslySetInnerHTML={{ __html: data.content }} 
          />
        ) : (
          <p>Загрузка данных из админ-панели...</p>
        )}
      </div>
    </div>
  );
};

export default Requisites;
