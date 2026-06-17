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
                    id: "7436 AP", 
                    field: "Алтын-Джилга", 
                    company: 'ОсОО "Аурум Голд Компани"', 
                    status: "Действует", 
                    mineral: "Золото", 
                    location: "Баткенская обл.",
                    contractDate: "15.05.2024",
                    orderNum: "№124-р",
                    licenseTerm: "до 2030 г.",
                    area: "15.2 га"
                },
                { 
                    id: "7218 TP", 
                    field: "Сасык-Ункур", 
                    company: 'ОсОО "Айкан-Тоо"', 
                    status: "Приостановлено", 
                    mineral: "Мраморный известняк", 
                    location: "Ошская обл.",
                    contractDate: "10.08.2023",
                    orderNum: "№88-р",
                    licenseTerm: "до 2028 г.",
                    area: "5.0 га"
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
                            <span className="license-id">{lic.id}</span>
                            <span className={`status-tag ${lic.status === "Действует" ? "active" : "suspended"}`}>
                                {lic.status}
                            </span>
                        </div>
                        <div className="card-middle">
                            <h3 className="field-name">{lic.field}</h3>
                            <p className="company-name">{lic.company}</p>
                        </div>
                        <div className="card-footer-extended">
                            <div className="row"><span>Ископаемое:</span> <b>{lic.mineral}</b></div>
                            <div className="row"><span>Место:</span> <b>{lic.location}</b></div>
                            <div className="row"><span>Дата договора:</span> <b>{lic.contractDate}</b></div>
                            <div className="row"><span>№ расп.:</span> <b>{lic.orderNum}</b></div>
                            <div className="row"><span>Срок:</span> <b>{lic.licenseTerm}</b></div>
                            <div className="row"><span>Площадь:</span> <b>{lic.area}</b></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Registry;
