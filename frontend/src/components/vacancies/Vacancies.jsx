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
            <div className="vacancies-list-massive">
                {vacancies && vacancies.map((vacancy) => (
                    <div 
                        className="vacancy-massive-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        <div className="massive-preview-section">
                            {vacancy.file ? (
                                isMobile ? (
                                    <div className="mobile-file-notice">
                                        📄 {translate.viewPdf[language]}
                                    </div>
                                ) : (
                                    <embed
                                        src={`${vacancy.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                        type="application/pdf"
                                        width="100%"
                                        height="100%"
                                        className="massive-embed"
                                    />
                                )
                            ) : (
                                <div className="no-file-text">
                                    {translate.vacancies[language]}
                                </div>
                            )}
                            {/* Защитный слой для кликабельности */}
                            <div className="massive-card-overlay"></div>
                        </div>

                        <div className="massive-info-section">
                            <h2 className="massive-title">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            <p className="massive-salary">{vacancy.selery || vacancy.salary}</p>
                            <div className="massive-footer">
                                <button className="massive-action-btn">
                                    {translate.viewPdf[language]}
                                </button>
                                <span className="click-hint">Нажмите, чтобы узнать подробнее →</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
