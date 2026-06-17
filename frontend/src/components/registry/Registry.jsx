import React, { useContext, useState, useMemo } from 'react';
import { LanguageContext } from "../../LanguageContext";
import './Registry.css';

const Registry = () => {
    const context = useContext(LanguageContext);
    const language = context ? context.language.toUpperCase() : 'RU';
    
    // Состояния фильтров
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Все");
    const [regionFilter, setRegionFilter] = useState("Все");

    const content = {
        RU: {
            title: "Реестр лицензий на недропользование",
            searchPlaceholder: "Поиск по номеру, держателю, объекту...",
            statusLabel: "Статус:",
            regionLabel: "Область:",
            all: "Все",
            // Пример расширенной структуры для карточки
            licenses: [
                {
                    id: "7436 АР",
                    field: "Алтын-Джилга",
                    company: 'ОсОО "Аурум Голд Компани"',
                    mineral: "Золото",
                    note: "На стадии геологоразведки",
                    location: "Баткенская обл., Баткенский р-н",
                    contractInfo: "Договор №01-134 от 12.05.2022 г.",
                    licenseDate: "01.12.2023 г.",
                    orderNum: "68-т от 16.02.2022 г.",
                    debt: "1 219 600,34",
                    term: "01.11.2023-01.11.2027",
                    agreement: "ЛС №4 до 01.11.2027 г.",
                    area: "4 916.35 га"
                }
            ]
        }
        // Добавьте KG и EN аналогично
    };

    const data = content[language] || content.RU;

    // Логика фильтрации
    const filteredLicenses = useMemo(() => {
        return data.licenses.filter(lic => {
            const matchesSearch = lic.field.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  lic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  lic.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "Все" || lic.status === statusFilter;
            const matchesRegion = regionFilter === "Все" || lic.location.includes(regionFilter);
            return matchesSearch && matchesStatus && matchesRegion;
        });
    }, [searchTerm, statusFilter, regionFilter, data.licenses]);

    return (
        <div className="registry-page">
            <h1 className="page-title">{data.title}</h1>
            
            {/* Панель фильтров и поиска */}
            <div className="registry-controls">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder={data.searchPlaceholder} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="Все">{data.statusLabel} {data.all}</option>
                    <option value="Действует">Действует</option>
                    <option value="Приостановлено">Приостановлено</option>
                </select>
                <select onChange={(e) => setRegionFilter(e.target.value)}>
                    <option value="Все">{data.regionLabel} {data.all}</option>
                    <option value="Ошская">Ошская</option>
                    <option value="Баткенская">Баткенская</option>
                    <option value="Таласская">Таласская</option>
                </select>
            </div>

            <div className="registry-grid">
                {filteredLicenses.map((lic, index) => (
                    <div className="license-card">
                        <div className="card-top">
                            <span className="license-id">№ {lic.id}</span>
                        </div>
                        <div className="card-middle">
                            <h3 className="field-name">{lic.field}</h3>
                            <p className="company-name"><strong>Договор с:</strong> {lic.company}</p>
                        </div>
                        <div className="card-footer-extended">
                            <div className="row"><span>Ископаемое:</span> <b>{lic.mineral}</b></div>
                            <div className="row"><span>Примечание:</span> <b>{lic.note}</b></div>
                            <div className="row"><span>Место:</span> <b>{lic.location}</b></div>
                            <div className="row"><span>Договор:</span> <b>{lic.contractInfo}</b></div>
                            <div className="row"><span>Дата получения:</span> <b>{lic.licenseDate}</b></div>
                            <div className="row"><span>№ распоряжения:</span> <b>{lic.orderNum}</b></div>
                            <div className="row"><span>Долг (2026 г):</span> <b>{lic.debt}</b></div>
                            <div className="row"><span>Срок лицензии:</span> <b>{lic.term}</b></div>
                            <div className="row"><span>Соглашение:</span> <b>{lic.agreement}</b></div>
                            <div className="row"><span>Площадь:</span> <b>{lic.area}</b></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Registry;
