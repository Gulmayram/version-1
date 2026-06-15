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
                { id: "7044 TE", field: "Наукатское", company: 'ОсОО "Фортресс Компани"', status: "Действует", mineral: "Гипс", location: "Ошская обл." },
                { id: "7051 ME", field: "Северный Акташ", company: 'ОсОО "Джунда"', status: "Приостановлена", mineral: "Сурьма, Флюорит", location: "Баткенская обл." },
                { id: "7436 AP", field: "Алтын-Джилга", company: 'ОсОО "Аурум Голд Компани"', status: "Действует", mineral: "Золото", location: "Баткенская обл." },
                { id: "7218 TP", field: "Сасык-Ункур", company: 'ОсОО "Айкан-Тоо"', status: "Приостановлена", mineral: "Мраморный известняк", location: "Ошская обл." },
                { id: "7658 TE", field: "Центральный Ак-Моло", company: 'ОсОО "Сабила Голд"', status: "Действует", mineral: "Каолин", location: "Джалал-Абадская обл." },
                { id: "7659 AE", field: "Каратор", company: 'ОсОО "Кинцайд Тяньшань"', status: "Действует", mineral: "Золото", location: "Нарынская обл." },
                { id: "7807 CP", field: "Раян-Тоо", company: 'ОсОО "ЧиВи"', status: "Действует", mineral: "Уголь", location: "Ошская обл." },
                { id: "7808 AP", field: "Чалкйкур-Акжилгинская", company: 'ОсОО "Алтын Ресурсы"', status: "Приостановлена", mineral: "Золото, серебро", location: "Ошская обл." },
                { id: "7901 TP", field: "Кумтор", company: 'ЗАО "Кумтор Голд Компани"', status: "Действует", mineral: "Золото", location: "Иссык-Кульская обл." },
                { id: "7902 AP", field: "Джеруй", company: 'ОсОО "Альянс Алтын"', status: "Действует", mineral: "Золото", location: "Таласская обл." }
            ]
        },
        KG: {
            title: "Жер казынасын пайдалануу лицензияларынын реестри",
            searchPlaceholder: "Номери, ээси, объекти боюнча издөө...",
            licenses: [
                { id: "7044 TE", field: "Наукатское", company: 'ОсОО "Фортресс Компани"', status: "Действует", mineral: "Гипс", location: "Ош обл." },
                { id: "7051 ME", field: "Северный Акташ", company: 'ОсОО "Джунда"', status: "Приостановлена", mineral: "Сурьма, Флюорит", location: "Баткен обл." },
                { id: "7436 AP", field: "Алтын-Джилга", company: 'ОсОО "Аурум Голд Компани"', status: "Действует", mineral: "Алтын", location: "Баткен обл." },
                { id: "7218 TP", field: "Сасык-Ункур", company: 'ОсОО "Айкан-Тоо"', status: "Приостановлена", mineral: "Мрамор", location: "Ош обл." },
                { id: "7658 TE", field: "Центральный Ак-Моло", company: 'ОсОО "Сабила Голд"', status: "Действует", mineral: "Каолин", location: "Жалал-Абад обл." },
                { id: "7659 AE", field: "Каратор", company: 'ОсОО "Кинцайд Тяньшань"', status: "Действует", mineral: "Алтын", location: "Нарын обл." },
                { id: "7807 CP", field: "Раян-Тоо", company: 'ОсОО "ЧиВи"', status: "Действует", mineral: "Көмүр", location: "Ош обл." },
                { id: "7808 AP", field: "Чалкйкур-Акжилгинская", company: 'ОсОО "Алтын Ресурсы"', status: "Приостановлена", mineral: "Алтын, күмүш", location: "Ош обл." },
                { id: "7901 TP", field: "Кумтор", company: 'ЗАО "Кумтор Голд Компани"', status: "Действует", mineral: "Алтын", location: "Ысык-Көл обл." },
                { id: "7902 AP", field: "Джеруй", company: 'ОсОО "Альянс Алтын"', status: "Действует", mineral: "Алтын", location: "Талас обл." }
            ]
        },
        EN: {
            title: "Register of subsoil use licenses",
            searchPlaceholder: "Search by number, holder, object...",
            licenses: [
                { id: "7044 TE", field: "Naukat", company: 'Fortress Company LLC', status: "Active", mineral: "Gypsum", location: "Osh region" },
                { id: "7051 ME", field: "Severny Aktash", company: 'Junda LLC', status: "Suspended", mineral: "Antimony, Fluorite", location: "Batken region" },
                { id: "7436 AP", field: "Altyn-Jilga", company: 'Aurum Gold Company LLC', status: "Active", mineral: "Gold", location: "Batken region" },
                { id: "7218 TP", field: "Sasyk-Unkur", company: 'Aykan-Too LLC', status: "Suspended", mineral: "Marble limestone", location: "Osh region" },
                { id: "7658 TE", field: "Central Ak-Molo", company: 'Sabila Gold LLC', status: "Active", mineral: "Kaolin", location: "Jalal-Abad region" },
                { id: "7659 AE", field: "Karator", company: 'Kincaid Tienshan LLC', status: "Active", mineral: "Gold", location: "Naryn region" },
                { id: "7807 CP", field: "Rayan-Too", company: 'ChiVi LLC', status: "Active", mineral: "Coal", location: "Osh region" },
                { id: "7808 AP", field: "Chalkykur-Akzhilginskaya", company: 'Altyn Resursy LLC', status: "Suspended", mineral: "Gold, silver", location: "Osh region" },
                { id: "7901 TP", field: "Kumtor", company: 'Kumtor Gold Company CJSC', status: "Active", mineral: "Gold", location: "Issyk-Kul region" },
                { id: "7902 AP", field: "Jeruy", company: 'Alliance Altyn LLC', status: "Active", mineral: "Gold", location: "Talas region" }
            ]
        }
    };

    const data = content[language] || content.RU;

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
                            <span className={`status-tag ${lic.status === "Действует" || lic.status === "Active" ? "active" : "suspended"}`}>
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
