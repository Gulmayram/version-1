import React, { useContext, useState, useMemo } from 'react';
import { LanguageContext } from "../../LanguageContext";
import './Registry.css';

const Registry = () => {
    const context = useContext(LanguageContext);
    const language = context ? context.language.toUpperCase() : 'RU';
    const [searchTerm, setSearchTerm] = useState("");

    const content = {
        RU: {
            title: "Реестр лицензий на недропользование",
            searchPlaceholder: "Поиск по номеру, держателю, объекту...",
            licenses: [
                { id: "7436 АР", field: "Алтын-Джилга", company: 'ОсОО "Аурум Голд Компани"', status: "Действует", mineral: "Золото", location: "Баткенская обл." },
                { id: "7218 ТР", field: "Сасык-Ункур", company: 'ОсОО "Айкан-Тоо"', status: "Приостановлена", mineral: "Мраморный известняк", location: "Ошская обл." },
                { id: "7044 TE", field: "Наукатское", company: 'ОсОО "Фортресс Компани"', status: "Действует", mineral: "Гипс", location: "Ошская обл." },
                { id: "7658 TE", field: "Центральный Ак-Моло", company: 'ОсОО "Сабила Голд"', status: "Действует", mineral: "Каолин", location: "Джалал-Абадская обл." },
                { id: "7659 АЕ", field: "Каратор", company: 'ОсОО "Кинцайд Тяньшань"', status: "Действует", mineral: "Золото", location: "Нарынская обл." },
                { id: "7807 СР", field: "Раян-Тоо", company: 'ОсОО "ЧиВи"', status: "Действует", mineral: "Уголь", location: "Ошская обл." },
                { id: "7808 АР", field: "Чалкйкур-Акжилгинская", company: 'ОсОО "Алтын Ресурсы"', status: "Приостановлена", mineral: "Золото, серебро", location: "Ошская обл." },
                { id: "7051 МЕ", field: "Северный Акташ", company: 'ОсОО "Джунда"', status: "Действует", mineral: "Сурьма, Флюорит", location: "Баткенская обл." },
                { id: "7901 ТР", field: "Кумтор", company: 'ЗАО "Кумтор Голд Компани"', status: "Действует", mineral: "Золото", location: "Иссык-Кульская обл." },
                { id: "7902 АР", field: "Джеруй", company: 'ОсОО "Альянс Алтын"', status: "Действует", mineral: "Золото", location: "Таласская обл." }
            ]
        },
        // ... (добавьте KG и EN аналогично по структуре)
    };

    const data = content[language] || content.RU;

    // Фильтрация данных
    const filteredLicenses = useMemo(() => {
        return data.licenses.filter(lic => 
            lic.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lic.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, data.licenses]);

    return (
        <div className="registry-page">
            <h1 className="page-title">{data.title}</h1>
            
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder={data.searchPlaceholder} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                            <span className="mineral">{lic.mineral}</span>
                            <span className="location">{lic.location}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Registry;
