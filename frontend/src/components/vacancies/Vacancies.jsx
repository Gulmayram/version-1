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
        <div className='vacancies-page-premium'>
            <div className="vacancies-header-premium">
                <h1>{translate.vacancies[language]}</h1>
                <div className="header-underline"></div>
            </div>
            <div className="vacancies-container-premium">
                {vacancies && vacancies.map((vacancy) => (
                    <div 
                        className="premium-vacancy-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        <div className="card-accent-pillar"></div>
                        <div className="card-main-content">
                            <div className="card-top-row">
                                <span className="vacancy-tag">Active</span>
                                <img src={RedirectIcon} alt="open" className="card-arrow-icon" />
                            </div>
                            <h2 className="vacancy-title-premium">
                                {vacancy[translate.translatedApi.title[language]] || vacancy.title}
                            </h2>
                            <div className="vacancy-salary-badge">
                                {vacancy.selery || vacancy.salary}
                            </div>
                            {vacancy[translate.translatedApi.body[language]] && (
                                <p className="vacancy-description-preview" 
                                   dangerouslySetInnerHTML={{
                                       __html: vacancy[translate.translatedApi.body[language]]
                                               .replace(/<[^>]+>/g, '') 
                                               .substring(0, 130) + '...'
                                   }}/>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
