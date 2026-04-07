import React, { useContext, useEffect } from 'react';
import './Vacancies.css';
import { useDispatch, useSelector } from "react-redux";
import { getVacancies } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import { useNavigate } from "react-router-dom";
// Используем maximize.svg как иконку "открыть подробнее"
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
        <div className='vacancies-page-requisites'>
            <div className="vacancies-header-requisites">
                <h1>{translate.vacancies[language]}</h1>
            </div>
            <div className="vacancies-list-requisites">
                {vacancies && vacancies.map((vacancy) => (
                    <div 
                        className="requisites-style-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        {/* Желтая линия-акцент слева */}
                        <div className="card-accent-line-yellow"></div>
                        
                        <div className="card-requisites-body">
                            <h2 className="requisites-card-title">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            <p className="requisites-card-salary">
                                {vacancy.selery || vacancy.salary}
                            </p>
                            
                            {/* Показываем начало описания */}
                            {vacancy[translate.translatedApi.body[language]] && (
                                <p className="requisites-card-snippet" 
                                   dangerouslySetInnerHTML={{
                                       __html: vacancy[translate.translatedApi.body[language]]
                                               .replace(/<[^>]+>/g, '') // Убираем HTML-теги
                                               .substring(0, 150) + '...' // Берем первые 150 символов
                                   }}/>
                            )}
                        </div>

                        {/* Футер карточки с иконкой */}
                        <div className="card-requisites-footer">
                            <span className="action-label">{translate.viewPdf[language]}</span>
                            <img src={RedirectIcon} alt="open" className="requisites-maximize-icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
