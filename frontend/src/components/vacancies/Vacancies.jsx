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
        <div className='vacancies-page-compact'>
            <div className="vacancies-header-compact">
                <h1>{translate.vacancies[language]}</h1>
            </div>
            <div className="vacancies-container-compact">
                {vacancies && vacancies.map((vacancy) => (
                    <div 
                        className="compact-vacancy-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        <div className="compact-accent-line"></div>
                        <div className="compact-card-content">
                            <div className="compact-card-info">
                                <h2 className="compact-vacancy-title">
                                    {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                                </h2>
                                <span className="compact-salary">
                                    {vacancy.selery || vacancy.salary}
                                </span>
                            </div>
                            <img src={RedirectIcon} alt="go" className="compact-go-icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
