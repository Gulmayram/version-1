import React, { useContext, useEffect } from 'react';
import './Vacancies.css';
import { useDispatch, useSelector } from "react-redux";
import { getVacancies } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../../assets/maximize.svg";

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
        <div className='v-page'>
            <div className="v-header">
                <h1>{translate.vacancies[language]}</h1>
            </div>
            <div className="v-grid">
                {vacancies && vacancies.map((v) => (
                    <div className="v-card" key={v.id} onClick={() => handleNavigate(v.id)}>
                        <div className="v-card-top">
                            <div className="v-badge">JOB</div>
                            <img src={ArrowIcon} alt="" className="v-icon" />
                        </div>
                        <div className="v-card-body">
                            <h2 className="v-title">
                                {v[translate.translatedApi.title[language]] || v.title}
                            </h2>
                            <p className="v-salary">{v.selery || v.salary}</p>
                        </div>
                        <div className="v-card-footer">
                            <div className="v-line"></div>
                            <span>{translate.viewPdf[language]}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
