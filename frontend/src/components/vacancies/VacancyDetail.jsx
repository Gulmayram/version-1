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
        <div className="v-detail-page">
            <div className="v-detail-card-premium">
                
                {/* Шапка с заголовком и зарплатой-бэджем */}
                <div className="v-detail-header-premium">
                    <h1 className="v-detail-title-premium">
                        {vacancyDetail[translate.translatedApi.title[language]]}
                    </h1>
                    <div className="v-detail-salary-badge">
                        {vacancyDetail.selery || vacancyDetail.salary}
                    </div>
                </div>

                <div className="v-detail-info-section">
                    <h2 className="v-detail-heading">Описaние:</h2>
                    <div 
                        className="v-detail-body-premium"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(vacancyDetail[translate.translatedApi.body[language]])
                        }}
                    />
                </div>

                {/* Блок с файлом: Улучшенное отображение */}
                {vacancyDetail.file && (
                    <div className="v-attachment-section">
                        {isMobile ? (
                            // На мобильных — аккуратная кнопка
                            <a 
                                href={vacancyDetail.file} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="v-file-mobile-btn"
                            >
                                <img src={RedirectIcon} alt="" className="v-btn-icon" />
                                {translate.viewPdf[language]}
                            </a>
                        ) : (
                            // На десктопе — стильное окно предпросмотра
                            <div className="v-attachment-preview">
                                <iframe
                                    src={`${vacancyDetail.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                    title={vacancyDetail.id}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    className="v-iframe-pdf"
                                />
                                {/* Прозрачный слой поверх iframe, чтобы клик открывал PDF в новом окне */}
                                <a href={vacancyDetail.file} target="_blank" rel="noopener noreferrer" className="v-pdf-overlay">
                                    <span>{translate.viewPdf[language]}</span>
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VacancyDetail;
