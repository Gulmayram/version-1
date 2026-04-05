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

    if (loading) {
        return <div className="loader-container"><span className="loader"></span></div>;
    }

    if (!vacancies || vacancies.length === 0) {
        return (
            <div className="no-data-container">
                <h1>{translate.noVacancies[language]}...</h1>
            </div>
        );
    }

    return (
        <div className='vacancies-page'>
            <h1>{translate.vacancies[language]}</h1>
            <div className="vacancies-grid">
                {vacancies.map((vacancy) => (
                    <div 
                        className="vacancy-card" 
                        key={vacancy.id} 
                        onClick={() => handleNavigate(vacancy.id)}
                    >
                        {/* Логика превью: проверяем наличие картинки, как в детальной странице проверяем файл */}
                        {vacancy.preview && (
                            <div className="vacancy-preview-wrapper">
                                <img 
                                    src={vacancy.preview} 
                                    alt="preview" 
                                    className="vacancy-preview-img"
                                />
                            </div>
                        )}

                        <div className="vacancy-info">
                            <h2 className="vacancy-title">
                                {vacancy[translate.translatedApi.title[language]]}
                            </h2>
                            <p className="vacancy-salary">{vacancy.selery}</p>
                            
                            <button className="more-btn">
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
