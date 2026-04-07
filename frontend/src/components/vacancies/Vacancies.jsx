import React, { useContext, useEffect } from 'react';
import './Vacancies.css';
import { useDispatch, useSelector } from "react-redux";
import { getVacancies } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import { useNavigate } from "react-router-dom";
// Используем maximize.svg как иконку "открыть"
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
                        className="stylish-vacancy-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        {/* Верхний декоративный элемент с иконкой */}
                        <div className="card-top-decorator">
                            <span className="card-badge">VACANCY</span>
                        </div>
            
                        <div className="stylish-card-content">
                            <h2 className="stylish-card-title">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            <p className="stylish-card-salary">{vacancy.selery || vacancy.salary}</p>
                            
                            {/* Показываем начало описания (если оно есть) */}
                            {vacancy[translate.translatedApi.body[language]] && (
                                <p className="stylish-card-snippet" 
                                   dangerouslySetInnerHTML={{
                                       __html: vacancy[translate.translatedApi.body[language]]
                                               .replace(/<[^>]+>/g, '') // Убираем HTML-теги
                                               .substring(0, 100) + '...' // Берем первые 100 символов
                                   }}/>
                            )}
                        </div>

                        <div className="stylish-card-footer">
                            <span className="learn-more">{translate.viewPdf[language]}</span>
                            <img src={RedirectIcon} alt="open" className="maximize-icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
