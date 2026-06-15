import React, { useContext } from 'react';
import { LanguageContext } from "../../LanguageContext";
import './Registry.css';

const Registry = () => {
    const context = useContext(LanguageContext);
    const language = context ? context.language : 'RU';

    const content = {
        RU: {
            title: "Реестр лицензий на недропользование",
            searchPlaceholder: "Поиск по номеру, держателю, объекту...",
            licenses: [
                { id: "7436 АР", field: "Алтын-Джилга", company: 'ОсОО "Аурум Голд Компани"', status: "Действует", mineral: "Золото", location: "Баткенская обл." },
                { id: "7218 ТР", field: "Сасык-Ункур", company: 'ОсОО "Айкан-Тоо"', status: "Приостановлена", mineral: "Мрамор-й известняк", location: "Ошская обл." }
            ]
        },
        KG: {
            title: "Жер казынасын пайдалануу лицензияларынын реестри",
            searchPlaceholder: "Номери, ээси, объекти боюнча издөө...",
            licenses: [
                { id: "7436 АР", field: "Алтын-Джилга", company: 'ОсОО "Аурум Голд Компани"', status: "Иштеп жатат", mineral: "Алтын", location: "Баткен обл." },
                { id: "7218 ТР", field: "Сасык-Ункур", company: 'ОсОО "Айкан-Тоо"', status: "Токтотулган", mineral: "Мрамор акиташы", location: "Ош обл." }
            ]
        },
        EN: {
            title: "Register of subsoil use licenses",
            searchPlaceholder: "Search by number, holder, object...",
            licenses: [
                { id: "7436 АР", field: "Altyn-Jilga", company: 'Aurum Gold Company LLC', status: "Active", mineral: "Gold", location: "Batken region" },
                { id: "7218 ТР", field: "Sasyk-Unkur", company: 'Aykan-Too LLC', status: "Suspended", mineral: "Marble limestone", location: "Osh region" }
            ]
        }
    };

    const data = content[language?.toUpperCase()] || content.RU;

    return (
        <div className="registry-page">
            <h1 className="page-title">{data.title}</h1>
            
            <div className="search-bar">
                <input type="text" placeholder={data.searchPlaceholder} />
            </div>

            <div className="registry-grid">
                {data.licenses.map((lic, index) => (
                    <div key={index} className="license-card">
                        <div className="card-top">
                            <span className="license-id">{lic.id}</span>
                            <span className={`status-tag ${lic.status.toLowerCase()}`}>{lic.status}</span>
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
