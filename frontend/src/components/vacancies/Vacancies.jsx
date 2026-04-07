import React, { useContext, useEffect } from 'react';
import './Vacancies.css';
import { useDispatch, useSelector } from "react-redux";
import { getVacancies } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import { useNavigate } from "react-router-dom";
// Используем иконку maximize.svg, которая уже есть у тебя в проекте
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
        <div className='vacancies-page-clean'>
            <div className="vacancies-header-clean">
                <h1>{translate.vacancies[language]}</h1>
            </div>
            <div className="vacancies-grid-clean">
                {vacancies && vacancies.map((vacancy) => (
                    <div 
                        className="requisites-style-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        {/* Тонкая синяя линия сверху, как на скриншоте */}
                        <div className="card-top-decorator"></div>
            
                        <div className="requisites-card-body">
                            {/* Метка "VACANCY" в стиле "KGS (COM)" */}
                            <span className="requisites-badge">VACANCY</span>
                            
                            {/* Название и зарплата в стиле названия банка и номера счета */}
                            <div className="requisites-main-info">
                                <h2 className="requisites-bank-name">
                                    {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                                </h2>
                                <p className="requisites-salary-text">
                                    {vacancy.selery || vacancy.salary}
                                </p>
                            </div>
                        </div>

                        {/* Футер в стиле "Расчетные счета" */}
                        <div className="requisites-card-footer">
                            <span className="requisites-footer-text">{translate.viewPdf[language]}</span>
                            <img src={RedirectIcon} alt="open" className="requisites-action-icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
