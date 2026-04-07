// frontend/src/components/realization/Realization.jsx
import React from 'react';
import './Realization.css';

const Realization = () => {
    // Здесь будет dispatch на получение данных из API (например, getRealization)
    const items = [
        { id: 1, title: "Спецтехника Б/У", price: "500 000 сом", status: "Торги" },
        { id: 2, title: "Металлолом", price: "15 000 сом", status: "В наличии" }
    ];

    return (
        <div className='r-page'>
            <div className="v-page-header">
                <h1>Реализация</h1>
            </div>
            <div className="v-cards-container">
                {items.map(item => (
                    <div className="v-clean-card" key={item.id}>
                        <div className="v-card-top-row">
                            <span className="v-type-badge">{item.status}</span>
                        </div>
                        <div className="v-card-main-info">
                            <h2 className="v-card-title">{item.title}</h2>
                            <div className="v-card-salary-box">
                                <span className="v-salary-amount">{item.price}</span>
                                <div className="v-salary-line"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Realization;
