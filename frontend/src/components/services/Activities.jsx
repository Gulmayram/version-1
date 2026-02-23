import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";
import './Activities.css';

const Activities = () => {
  const { language } = useContext(LanguageContext);
  
  // Функция для получения перевода. 
  // Если ключа нет, вернет сам ключ, чтобы не ломать верстку.
  const getT = (key) => {
    return translate[key] ? translate[key][language] : key;
  };

  const activitiesData = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/>
        </svg>
      ),
      title: getT('act_services'),
      desc: getT('act_services_desc'),
      bgColor: "#eff6ff"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: getT('projects'),
      desc: getT('act_projects_desc'),
      bgColor: "#ecfdf5"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>
      ),
      title: getT('act_production') || "Продукция",
      desc: getT('act_production_desc'),
      bgColor: "#fff7ed"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: getT('act_investors'),
      desc: getT('act_investors_desc'),
      bgColor: "#f5f3ff"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      ),
      title: getT('act_registry'),
      desc: getT('act_registry_desc'),
      bgColor: "#ecfeff"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
        </svg>
      ),
      title: getT('act_anticorruption'),
      desc: getT('act_anticorruption_desc'),
      bgColor: "#fef2f2"
    }
  ];

  return (
    <section className="activities-container">
      <div className="activities-header">
        <h2 className="activities-main-title">{getT('services')}</h2>
        <div className="title-line"></div>
        <p className="activities-subtitle">{getT('activitiesSubtitle')}</p>
      </div>

      <div className="activities-grid">
        {activitiesData.map((item, index) => (
          <div key={index} className="activity-item-card">
            <div className="icon-circle" style={{ backgroundColor: item.bgColor }}>
              {item.icon}
            </div>
            <h3 className="activity-item-title">{item.title}</h3>
            <p className="activity-item-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
