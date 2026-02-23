import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext'; // Убедись, что путь верный
import { translate } from "../../assets/translate";
import './AboutSection.css';

const AboutSection = () => {
  const { language } = useContext(LanguageContext);
  const lang = language ? language.toUpperCase() : "RU";

  // Функция для получения перевода
  const getT = (key) => (translate[key] ? translate[key][lang] : key);

  return (
    <section className="about-section">
      <div className="about-grid">
        
        {/* ЛЕВАЯ КАРТОЧКА: О ПРЕДПРИЯТИИ */}
        <div className="about-card main-content">
          <div className="title-row">
            <div className="icon-blue-box">
              {/* Синее СВЖ */}
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6362 17.1866L25.6562 28.5546C25.6788 28.6885 25.66 28.8261 25.6023 28.949C25.5446 29.0719 25.4508 29.1742 25.3334 29.2424C25.216 29.3105 25.0806 29.3412 24.9452 29.3303C24.8099 29.3193 24.6811 29.2674 24.5762 29.1813L19.8028 25.5986C19.5724 25.4265 19.2925 25.3335 19.0048 25.3335C18.7172 25.3335 18.4373 25.4265 18.2068 25.5986L13.4255 29.18C13.3206 29.2659 13.192 29.3178 13.0568 29.3287C12.9217 29.3396 12.7864 29.3091 12.669 29.2411C12.5517 29.1732 12.4579 29.0711 12.4 28.9484C12.3422 28.8258 12.3232 28.6884 12.3455 28.5546L14.3642 17.1866" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 18.6666C23.4183 18.6666 27 15.0849 27 10.6666C27 6.24835 23.4183 2.66663 19 2.66663C14.5817 2.66663 11 6.24835 11 10.6666C11 15.0849 14.5817 18.6666 19 18.6666Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>{getT('aboutCompany')}</h2>
          </div>
          <div className="about-text-content">
            <p>{getT('about_text_p1')}</p>
            <p>{getT('about_text_p2')}</p>
          </div>
          <button className="about-btn">
            {getT('readMore')} <span>→</span>
          </button>
        </div>

        {/* ПРАВАЯ КАРТОЧКА: В ЦИФРАХ */}
        <div className="about-card stats-content">
          <h3>{getT('inNumbers')}</h3>
          <div className="stats-list">
            
            {/* Оранжевый-1 (Опыт) */}
            <div className="stat-item">
              <div className="icon-orange-box">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 7L15.5 15.5L10.5 10.5L4 17" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18 7H24V13" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className="stat-text">
                <h4>50+</h4>
                <p>{getT('yearsExperience')}</p>
              </div>
            </div>

            {/* Оранжевый-2 (Специалисты) */}
            <div className="stat-item">
              <div className="icon-orange-box">
                <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 21V19C18 17.9391 17.5786 16.9217 16.8284 16.1716C16.0783 15.4214 15.0609 15 14 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 21V19C23.9993 18.1137 23.7044 17.2528 23.1614 16.5523C22.6184 15.8519 21.8581 15.3516 21 15.13" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 3.13C18.8604 3.35031 19.623 3.85071 20.1676 4.55232C20.7122 5.25392 21.0078 6.11683 21.0078 7.005C21.0078 7.89318 20.7122 8.75608 20.1676 9.45769C19.623 10.1593 18.8604 10.6597 18 10.88" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-text">
                <h4>500+</h4>
                <p>{getT('specialists')}</p>
              </div>
            </div>

            {/* Оранжевый-3 (Проекты) */}
            <div className="stat-item">
              <div className="icon-orange-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.4768 12.89L18.9918 21.416C19.0087 21.5164 18.9946 21.6196 18.9514 21.7118C18.9081 21.8039 18.8377 21.8807 18.7497 21.9318C18.6616 21.9829 18.56 22.0059 18.4586 21.9977C18.3571 21.9895 18.2605 21.9506 18.1818 21.886L14.6018 19.199C14.4289 19.0699 14.219 19.0001 14.0033 19.0001C13.7875 19.0001 13.5776 19.0699 13.4048 19.199L9.81875 21.885C9.74007 21.9494 9.64361 21.9884 9.54225 21.9966C9.44088 22.0048 9.33942 21.9818 9.25141 21.9309C9.16341 21.8799 9.09303 21.8033 9.04967 21.7113C9.00631 21.6194 8.99204 21.5163 9.00875 21.416L10.5228 12.89" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 14C17.3137 14 20 11.3137 20 8C20 4.68629 17.3137 2 14 2C10.6863 2 8 4.68629 8 8C8 11.3137 10.6863 14 14 14Z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-text">
                <h4>200+</h4>
                <p>{getT('completedProjects')}</p>
              </div>
            </div>

            {/* Оранжевый-4 (Страны) */}
            <div className="stat-item">
              <div className="icon-orange-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2C9.43223 4.69615 8 8.27674 8 12C8 15.7233 9.43223 19.3038 12 22C14.5678 19.3038 16 15.7233 16 12C16 8.27674 14.5678 4.69615 12 2Z" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H22" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-text">
                <h4>15+</h4>
                <p>{getT('partnerCountries')}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
