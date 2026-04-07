import React, { useContext, useEffect } from 'react';
import './VacancyDetail.css';
import { useDispatch, useSelector } from "react-redux";
import { clearVacancyDetail, getVacancyDetail } from "../../store/apiSlice";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import RedirectIcon from "../../assets/maximize.svg";

const VacancyDetail = () => {
    const dispatch = useDispatch();
    const { vacancyDetail, loading } = useSelector((state) => state.api);
    const { language } = useContext(LanguageContext);
    const { vacancyId } = useParams();

    useEffect(() => {
        dispatch(getVacancyDetail(vacancyId));
        return () => {
            dispatch(clearVacancyDetail());
        };
    }, [dispatch, vacancyId]);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (loading || !vacancyDetail) return <div className="loader-container"><span className="loader"></span></div>;

    return (
        <div className="v-detail-wrapper">
            <div className="v-detail-card">
                {/* Шапка с заголовком и ценой */}
                <div className="v-detail-header">
                    <h1 className="v-detail-title">
                        {vacancyDetail[translate.translatedApi.title[language]]}
                    </h1>
                    <div className="v-detail-salary-tag">
                        {vacancyDetail.selery || vacancyDetail.salary}
                    </div>
                </div>

                <div className="v-detail-content">
                    <h2 className="v-detail-sub">Описaние:</h2>
                    <div 
                        className="v-detail-body"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(vacancyDetail[translate.translatedApi.body[language]])
                        }}
                    />
                </div>

                {/* Блок с файлом — без лишних подписей */}
                {vacancyDetail.file && (
                    <div className="v-detail-attachment">
                        {isMobile ? (
                            <a 
                                href={vacancyDetail.file} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="v-mobile-btn"
                            >
                                <img src={RedirectIcon} alt="" className="v-btn-icon" />
                                {translate.viewPdf[language]}
                            </a>
                        ) : (
                            <div className="v-pdf-frame">
                                <embed
                                    src={vacancyDetail.file}
                                    type="application/pdf"
                                    width="100%"
                                    height="600px"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VacancyDetail;
