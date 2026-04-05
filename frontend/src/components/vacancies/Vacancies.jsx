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
                <h1>{translate.noVacancies[language]}...</h1>
            </div>
        );
    }

    return (
        <div className='vacancies-page'>
            <div className="vacancies-header">
                <h1>{translate.vacancies[language]}</h1>
            </div>

            <div className="vacancies-grid">
                {vacancies.map((vacancy) => (
                    <div 
                        className="vacancy-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        {/* Логика превью на основе поля file, как в VacancyDetail */}
                        {vacancy.file && (
                            <div className="vacancy-preview-container">
                                <embed
                                    className="vacancy-preview-embed"
                                    src={vacancy.file}
                                    type="application/pdf"
                                />
                                {/* Слой поверх embed, чтобы клик по нему не блокировался и вел на страницу вакансии */}
                                <div className="embed-overlay"></div>
                            </div>
                        )}

                        <div className="vacancy-card-content">
                            <h2 className="vacancy-title">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            <p className="vacancy-salary">{vacancy.salary || vacancy.selery}</p>
                            
                            <button className="view-more-btn">
                                {translate.viewPdf[language] || "Подробнее"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
