import React, { useContext, useState } from 'react';
import { LanguageContext } from "../../LanguageContext";
import './PhoneDirectory.css';

const PhoneDirectory = () => {
    const context = useContext(LanguageContext);
    const language = context ? context.language : 'RU';
    const [searchTerm, setSearchTerm] = useState("");

    const content = {
        RU: {
            title: "Телефонный справочник",
            searchPlaceholder: "Поиск по отделу или фамилии...",
            tableHead: { department: "Отдел / Подразделение", name: "ФИО", phone: "Телефон" },
            data: [
                { dept: "Приемная директора", name: "Абдыкадыров А.А.", phone: "30-06-50" },
                { dept: "Заместитель директора", name: "Осмонов Б.Т.", phone: "30-07-12" },
                { dept: "Отдел кадров", name: "Иванова А.И.", phone: "30-06-55" },
                { dept: "Бухгалтерия", name: "Асанова Г.М.", phone: "30-06-60" },
                { dept: "Производственный отдел", name: "Петров С.В.", phone: "30-06-72" },
                { dept: "Юридический отдел", name: "Эркинбеков М.Э.", phone: "30-06-80" },
            ]
        },
        KG: {
            title: "Телефондук маалымдама",
            searchPlaceholder: "Бөлүм же аты-жөнү боюнча издөө...",
            tableHead: { department: "Бөлүм / Түзүм", name: "Аты-жөнү", phone: "Телефон" },
            data: [
                { dept: "Директордун кабыл алуусу", name: "Абдыкадыров А.А.", phone: "30-06-50" },
                { dept: "Директордун орун басары", name: "Осмонов Б.Т.", phone: "30-07-12" },
                { dept: "Кадрлар бөлүмү", name: "Иванова А.И.", phone: "30-06-55" },
                { dept: "Бухгалтерия", name: "Асанова Г.М.", phone: "30-06-60" },
                { dept: "Өндүрүш бөлүмү", name: "Петров С.В.", phone: "30-06-72" },
                { dept: "Юридикалык бөлүм", name: "Эркинбеков М.Э.", phone: "30-06-80" },
            ]
        }
    };

    const currentData = content[language?.toUpperCase()] || content.RU;

    // Фильтрация данных по поиску
    const filteredContacts = currentData.data.filter(item => 
        item.dept.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="directory-page">
            <h1 className="page-title">{currentData.title}</h1>
            <div className="title-underline"></div>

            <div className="directory-container">
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder={currentData.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="directory-table-wrapper">
                    <table className="directory-table">
                        <thead>
                            <tr>
                                <th>{currentData.tableHead.department}</th>
                                <th>{currentData.tableHead.name}</th>
                                <th>{currentData.tableHead.phone}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.length > 0 ? (
                                filteredContacts.map((item, index) => (
                                    <tr key={index}>
                                        <td className="dept-cell">{item.dept}</td>
                                        <td className="name-cell">{item.name}</td>
                                        <td className="phone-cell">
                                            <a href={`tel:+996312${item.phone.replace(/-/g, '')}`}>
                                                (312) {item.phone}
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="no-results">Ничего не найдено</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PhoneDirectory;
