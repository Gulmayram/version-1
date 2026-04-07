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

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
                        <div className="vacancy-preview-container">
                            {vacancy.file ? (
                                isMobile ? (
                                    <div className="mobile-file-indicator">
                                        📄 {translate.viewPdf[language]}
                                    </div>
                                ) : (
                                    <embed
                                        src={`${vacancy.file}#toolbar=0&navpanes=0&scrollbar=0`}
                                        type="application/pdf"
                                        width="100%"
                                        height="100%"
                                        className="vacancy-embed"
                                    />
                                )
                            ) : (
                                <span className="no-image-text">{translate.vacancies[language]}</span>
                            )}
                        </div>
            
                        <div className="vacancy-card-content">
                            <h2 className="vacancy-title">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            <p className="vacancy-salary">{vacancy.selery || vacancy.salary}</p>
                            
                            {vacancy.file && (
                                <button 
                                    className="view-more-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(vacancy.file, '_blank');
                                    }}
                                >
                                    {translate.viewPdf[language]}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
