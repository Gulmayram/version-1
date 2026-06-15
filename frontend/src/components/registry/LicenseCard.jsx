import React from 'react';
import './Registry.css'; // Используем общие стили реестра

const LicenseCard = ({ license }) => {
    // Вспомогательная функция для определения CSS класса статуса
    const getStatusClass = (status) => {
        const statusMap = {
            'Действует': 'active',
            'Приостановлена': 'suspended',
            'Истекла': 'expired',
            'На оформлении': 'pending'
        };
        return statusMap[status] || 'default';
    };

    return (
        <div className="license-card">
            <div className="card-top">
                <span className="license-id">{license.id}</span>
                <span className={`status-tag ${getStatusClass(license.status)}`}>
                    {license.status}
                </span>
            </div>
            <div className="card-middle">
                <h3 className="field-name">{license.field}</h3>
                <p className="company-name">{license.company}</p>
            </div>
            <div className="card-footer">
                <span className="mineral">{license.mineral}</span>
                <span className="location">{license.location}</span>
            </div>
        </div>
    );
};

export default LicenseCard;
