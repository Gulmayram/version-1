// 1. Сначала React и хуки
import React, { useState, useEffect, useContext, useRef } from 'react';

// 2. Затем библиотеки (Redux)
import { useDispatch, useSelector } from "react-redux";

// 3. Компоненты и роутинг
import NewsCards from '../news/NewsCards';
import AboutSection from '../about/AboutSection'; // Импорт нового компонента

// 4. Сторы, контексты и API
import { getHome } from "../../store/apiSlice";
import { LanguageContext } from "../../LanguageContext";

// 5. Ресурсы, картинки, стили и переводы
import { translate } from "../../assets/translate";
import mainPhoto from "../../assets/mainPhoto.jpg";
import './Main.css';

const Main = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const timeOut = 5000;
    const dispatch = useDispatch();
    
    const { homes, loading } = useSelector((state) => state.api);
    const intervalRef = useRef(null);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getHome());
    }, [dispatch]);

    const clearAndSetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) => 
                (prevSlide + 1) % (Array.isArray(homes) && homes.length > 0 ? homes.length : 1)
            );
        }, timeOut);
    };

    useEffect(() => {
        if (Array.isArray(homes) && homes.length > 0) {
            clearAndSetInterval();
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [homes, timeOut]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        clearAndSetInterval();
    };

    if (!homes) return null;

    return (
        <div className="main-page">
            {/* 1. ГЛАВНЫЙ СЛАЙДЕР */}
            <div className="slider">
                {Array.isArray(homes) && homes.length > 0 ? (
                    <div className="slide">
                        <div className="titleSlide">
                            <h2>
                                {homes[currentSlide]?.[translate.translatedApi.title[language]] || ""}
                            </h2>
                        </div>
                        <img
                            src={homes[currentSlide]?.image}
                            alt={`Slide ${currentSlide}`}
                            style={{ width: '100%', height: '100vmin', objectFit: 'cover' }}
                        />
                    </div>
                ) : (
                    <img 
                        src={mainPhoto} 
                        alt="main" 
                        style={{ width: '100%', height: '100vmin', objectFit: 'cover' }}
                    />
                )}

                <div className="dots">
                    {Array.isArray(homes) && homes.map((home, index) => (
                        <div
                            key={home.id || index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        >
                            <img 
                                style={{ borderRadius: "5px" }} 
                                src={home?.icon} 
                                alt="icon" 
                            />
                            <h4>{home?.mini_title}</h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. БЛОК О ПРЕДПРИЯТИИ (ИНТЕГРАЦИЯ) */}
            <AboutSection />

            {/* 3. БЛОК НОВОСТЕЙ */}
            <div className="newsBlock">
                <h2 className="section-title">{translate.news[language]}</h2>
                <NewsCards />
            </div>
        </div>
    );
};

export default Main;
