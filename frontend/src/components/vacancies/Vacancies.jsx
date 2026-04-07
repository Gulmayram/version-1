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
        <div className='vacancies-page-elite'>
            <div className="vacancies-header-elite">
                <h1>{translate.vacancies[language]}</h1>
            </div>
            <div className="vacancies-list-elite">
                {vacancies && vacancies.map((vacancy) => (
                    <div 
                        className="elite-vacancy-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        {/* Анимированный стеклянный блик слева */}
                        <div className="card-glass-decorator"></div>
                        
                        <div className="card-elite-main">
                            <h2 className="elite-card-title">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            <p className="elite-card-salary">
                                {vacancy.selery || vacancy.salary}
                            </p>
                            
                            {/* Показываем начало описания (если оно есть), чтобы заполнить пространство */}
                            {vacancy[translate.translatedApi.body[language]] && (
                                <p className="elite-card-snippet" 
                                   dangerouslySetInnerHTML={{
                                       __html: vacancy[translate.translatedApi.body[language]]
                                               .replace(/<[^>]+>/g, '') // Убираем HTML-теги
                                               .substring(0, 160) + '...' // Берем первые 160 символов
                                   }}/>
                            )}
                        </div>

                        {/* Интерактивный футер с иконкой */}
                        <div className="card-elite-action">
                            <span className="learn-more-label">{translate.viewPdf[language]}</span>
                            <img src={RedirectIcon} alt="open" className="elite-arrow-icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
