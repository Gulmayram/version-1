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
            <div className="vacancies-container">
                {vacancies && vacancies.map((vacancy) => (
                    <div 
                        className="wide-vacancy-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        <div className="wide-card-preview">
                            {vacancy.file ? (
                                isMobile ? (
                                    <div className="mobile-file-placeholder">
                                        📄 {translate.viewPdf[language]}
                                    </div>
                                ) : (
                                    <embed
                                        src={`${vacancy.file}#toolbar=0&navpanes=0&scrollbar=0`}
                                        type="application/pdf"
                                        width="100%"
                                        height="100%"
                                    />
                                )
                            ) : (
                                <div className="no-file-placeholder">
                                    {translate.vacancies[language]}
                                </div>
                            )}
                            {/* Слой для кликабельности всей области */}
                            <div className="click-overlay"></div>
                        </div>
            
                        <div className="wide-card-info">
                            <h2 className="wide-card-title">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            <p className="wide-card-salary">{vacancy.selery || vacancy.salary}</p>
                            <button className="wide-view-btn">
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
