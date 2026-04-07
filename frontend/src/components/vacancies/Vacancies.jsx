import React, { useContext, useEffect } from 'react';
import './Vacancies.css';
import { useDispatch, useSelector } from "react-redux";
import { getVacancies } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import { useNavigate } from "react-router-dom";
import RedirectIcon from "../../assets/maximize.svg";

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
                        className="vacancy-modern-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        <div className="card-accent-line"></div>
                        <div className="card-body">
                            <div className="card-main-info">
                                <h2 className="vacancy-name">
                                    {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                                </h2>
                                <p className="vacancy-salary-value">
                                    {vacancy.selery || vacancy.salary}
                                </p>
                            </div>
                            
                            {vacancy[translate.translatedApi.body[language]] && (
                                <div 
                                    className="vacancy-short-desc"
                                    dangerouslySetInnerHTML={{
                                        __html: vacancy[translate.translatedApi.body[language]]
                                            .replace(/<[^>]+>/g, '') 
                                            .substring(0, 120) + '...'
                                    }}
                                />
                            )}
                        </div>

                        <div className="card-footer-action">
                            <span className="action-text">{translate.viewPdf[language]}</span>
                            <img src={RedirectIcon} alt="open" className="action-icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
