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
            licenses: [
                { id: "7044 TE", field: "Наукатское", company: 'ОсОО "Фортресс Компани"', status: "Действует", mineral: "Гипс", location: "Ошская обл." },
                { id: "7051 ME", field: "Северный Акташ", company: 'ОсОО "Джунда"', status: "Приостановлено", mineral: "Сурьма, Флюорит", location: "Баткенская обл." },
                { id: "7436 AP", field: "Алтын-Джилга", company: 'ОсОО "Аурум Голд Компани"', status: "Действует", mineral: "Золото", location: "Баткенская обл." },
                { id: "7218 TP", field: "Сасык-Ункур", company: 'ОсОО "Айкан-Тоо"', status: "Приостановлено", mineral: "Мраморный известняк", location: "Ошская обл." },
                { id: "7658 TE", field: "Центральный Ак-Моло", company: 'ОсОО "Сабила Голд"', status: "Действует", mineral: "Каолин", location: "Джалал-Абадская обл." },
                { id: "7659 AE", field: "Каратор", company: 'ОсОО "Кинцайд Тяньшань"', status: "Действует", mineral: "Золото", location: "Нарынская обл." },
                { id: "7807 CP", field: "Раян-Тоо", company: 'ОсОО "ЧиВи"', status: "Действует", mineral: "Уголь", location: "Ошская обл." },
                { id: "7808 AP", field: "Чалкйкур-Акжилгинская", company: 'ОсОО "Алтын Ресурсы"', status: "Приостановлено", mineral: "Золото, серебро", location: "Ошская обл." },
                { id: "7901 TP", field: "Кумтор", company: 'ЗАО "Кумтор Голд Компани"', status: "Действует", mineral: "Золото", location: "Иссык-Кульская обл." },
                { id: "7902 AP", field: "Джеруй", company: 'ОсОО "Альянс Алтын"', status: "Действует", mineral: "Золото", location: "Таласская обл." }
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
                    <option value="Приостановлена">Приостановлена</option>
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
                    <div key={index} className="license-card">
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
                        <div className="card-footer">
                            <span>{lic.mineral}</span>
                            <span>{lic.location}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Registry;
