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

    if (loading) return <div className="loader-container"><span className="loader"></span></div>;

    return (
        <div className='vacancies-page'>
            <div className="vacancies-header">
                <h1>{translate.vacancies[language]}</h1>
            </div>
            <div className="vacancies-grid">
                {vacancies && vacancies.map((vacancy) => (
                    <div 
                        className="vacancy-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        {/* Если файл есть, пытаемся показать его как картинку */}
                        {vacancy.file ? (
                            <div className="vacancy-preview-container">
                                <img 
                                    src={vacancy.file} 
                                    alt="preview" 
                                    className="vacancy-preview-img"
                                    onError={(e) => {
                                        // Если это PDF или битая ссылка, заменяем на иконку
                                        e.target.src = "/path-to-your-default-icon.svg"; 
                                        e.target.className = "vacancy-preview-icon";
                                    }}
                                />
                            </div>
                        ) : (
                            // Если файла вообще нет, показываем пустой стилизованный блок или заглушку
                            <div className="vacancy-preview-container empty">
                                <img src={RedirectIcon} alt="no-file" className="vacancy-preview-icon" />
                            </div>
                        )}
            
                        <div className="vacancy-card-content">
                            <h2 className="vacancy-title">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            <p className="vacancy-salary">{vacancy.selery}</p>
                            <button className="view-more-btn">
                                {translate.viewPdf[language]}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Vacancies;
