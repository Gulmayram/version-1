import React, { useContext, useEffect } from 'react';
import './Vacancies.css';
import { useDispatch, useSelector } from "react-redux";
import { getVacancies } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import { useNavigate } from "react-router-dom";

const Vacancies = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, vacancies } = useSelector((state) => state.api);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getVacancies());
    }, [dispatch]);

    const handleNavigate = (vacancyId) => {
        navigate(`/vacancies/${vacancyId}`);
    };

    if (loading) {
        return (
            <div className="loader-container">
                <span className="loader"></span>
            </div>
        );
    }

    if (!vacancies || vacancies.length === 0) {
        return (
            <div className="no-data-container">
                <div className="no-data-content">
                    <img src="/empty-vacancies.svg" alt="No vacancies" />
                    <h1>{translate.noVacancies[language]}</h1>
                    <p>Следите за обновлениями, мы скоро добавим новые позиции.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='vacancies-page'>
            <header className="vacancies-header">
                <h1>{translate.vacancies[language]}</h1>
                <p className="subtitle">Присоединяйтесь к команде профессионалов «Кыргызгеологии»</p>
            </header>

            <div className="vacancies-grid">
                {vacancies.map((vacancy) => (
                    <div 
                        className="vacancy-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        {/* Рендерим блок с картинкой, только если vacancy.preview существует */}
                        {vacancy.preview && (
                            <div className="vacancy-preview">
                                <img src={vacancy.preview} alt={vacancy.title} />
                            </div>
                        )}
                
                        <div className="vacancy-content">
                            <div className="card-badge">New</div>
                            <h2 className="vacancy-title">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            
                            <div className="vacancy-details">
                                <div className="detail-item">
                                    <span className="icon">💰</span>
                                    <span className="detail-text">
                                        {vacancy.salary || vacancy.selery || "З/П по результатам собеседования"}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="icon">📍</span>
                                    <span className="detail-text">Бишкек</span>
                                </div>
                            </div>
                
                            <button className="view-more-btn">
                                Подробнее
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
