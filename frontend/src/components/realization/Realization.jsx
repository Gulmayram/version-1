import React, { useContext, useEffect } from 'react';
import './Realization.css';
import { useDispatch, useSelector } from "react-redux";
import { getRealization } from "../../store/apiSlice";
import { translate } from "../../assets/translate";
import { LanguageContext } from "../../LanguageContext";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../../assets/maximize.svg";

const Realization = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, realizationItems } = useSelector((state) => state.api);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        dispatch(getRealization());
    }, [dispatch]);

    const handleNavigate = (id) => {
        navigate(`/realization/${id}`);
    };

    if (loading) return <div className="loader-container"><span className="loader"></span></div>;

    return (
        <div className='r-page'>
            <div className="r-header">
                <h1>{translate.realization[language]}</h1>
            </div>
            <div className="r-grid">
                {realizationItems && realizationItems.map((item) => (
                    <div className="r-card" key={item.id} onClick={() => handleNavigate(item.id)}>
                        {/* Зона изображения */}
                        <div className="r-card-image">
                            {item.image ? (
                                <img src={item.image} alt={item.title} />
                            ) : (
                                <div className="r-image-placeholder">
                                    <span>KG</span>
                                </div>
                            )}
                            <div className="r-status-badge">В наличии</div>
                        </div>

                        <div className="r-card-content">
                            <div className="r-card-top">
                                <h2 className="r-title">
                                    {item[translate.translatedApi.title[language]] || item.title}
                                </h2>
                                <img src={ArrowIcon} alt="" className="r-icon" />
                            </div>
                            
                            <div className="r-card-bottom">
                                <div className="r-price-box">
                                    <span className="r-price">{item.price}</span>
                                    <div className="r-accent-line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Realization;
