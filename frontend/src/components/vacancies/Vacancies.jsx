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

    const getPreviewText = (html, length = 120) => {
        if (!html) return "";

        const text = html.replace(/<[^>]*>/g, "").trim();

        return text.length > length
            ? text.slice(0, length) + "..."
            : text;
    };

    if (loading) {
        return (
            <div className="loader-container">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div className="v-grid-layout">
            <div className="v-page-header">
                <h1>{translate.vacancies[language]}</h1>
            </div>

            <div className="v-cards-container">
                {vacancies && vacancies.map((v) => (
                    <div
                        className="v-clean-card"
                        key={v.id}
                        onClick={() => handleNavigate(v.id)}
                    >
                        <div className="v-card-top-row">
                            <span className="v-type-badge">JOB</span>
                            <img
                                src={ArrowIcon}
                                alt=""
                                className="v-expand-icon"
                            />
                        </div>

                        <div className="v-card-main-info">
                            <h2 className="v-card-title">
                                {v[translate.translatedApi.title[language]] || v.title}
                            </h2>

                            <p className="v-card-description">
                                {getPreviewText(
                                    v[translate.translatedApi.body[language]] || v.body
                                )}
                            </p>

                            <div className="v-card-salary-box">
                                <span className="v-salary-amount">
                                    {v.selery || v.salary}
                                </span>
                                <div className="v-salary-line"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vacancies;
