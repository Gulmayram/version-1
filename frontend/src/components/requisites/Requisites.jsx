import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCopy, FaFileDownload } from 'react-icons/fa';
import './Requisites.css';

const Requisites = () => {
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);
  const categoryId = "ID_ТВОЕЙ_КАТЕГОРИИ_РЕКВИЗИТЫ"; // Вставь сюда ID из админки

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://твой-апи/posts?categoryId=${categoryId}`);
        if (res.data && res.data.length > 0) {
          setData(res.data[0]); // Берем самый свежий пост
        }
      } catch (err) {
        console.error("Ошибка при загрузке реквизитов:", err);
      }
    };
    fetchData();
  }, [categoryId]);

  const handleCopy = () => {
    const text = document.getElementById('requisites-content').innerText;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="requisites-container">
      <div className="page-header">
        <h1>Банковские реквизиты</h1>
        <div className="header-line"></div>
      </div>

      <div className="requisites-card">
        <div className="card-actions">
          <button className="action-btn copy" onClick={handleCopy}>
            <FaCopy /> {copied ? "Скопировано!" : "Копировать все"}
          </button>
          {/* Если в админке прикрепишь файл (печать/подпись), тут будет кнопка скачивания */}
          <button className="action-btn download">
            <FaFileDownload /> Скачать PDF
          </button>
        </div>

        <div id="requisites-content" className="requisites-body">
          {data ? (
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          ) : (
            <p>Загрузка данных...</p>
          )}
        </div>
      </div>

      <div className="requisites-notice">
        <p>* Пожалуйста, внимательно проверяйте данные перед осуществлением платежа.</p>
      </div>
    </div>
  );
};

export default Requisites;
