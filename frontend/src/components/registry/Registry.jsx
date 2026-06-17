import React, { useContext, useState, useMemo } from 'react';
import { LanguageContext } from "../../LanguageContext";
import './Registry.css';

const Registry = () => {
    const context = useContext(LanguageContext);
    const language = context ? context.language.toUpperCase() : 'RU';
    
    // Состояния фильтров
    const [searchTerm, setSearchTerm] = useState("");
    const [regionFilter, setRegionFilter] = useState("Все");
    const [mineralFilter, setMineralFilter] = useState("Все");

    const content = {
        RU: {
            title: "Реестр лицензий на недропользование",
            searchPlaceholder: "Поиск по номеру, держателю, объекту...",
            regionLabel: "Область:",
            all: "Все",
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
                },
                {
                    id: "7218 ТР",
                    field: "Сасык-Ункур",
                    company: 'ОсОО "Айкан-Тоо"',
                    mineral: "Мрамор-й известняк",
                    note: "На стадии геологоразведки",
                    location: "Ошская обл. Араванский р-н",
                    contractInfo: "Договор №01-027 от 09.02.2023 г",
                    licenseDate: "27.10.2022 г",
                    orderNum: "570-р от 20.10.2022 г",
                    debt: "переплата 4245,49",
                    term: "26.10.2022-26.10.2026",
                    agreement: "ЛС №2 до 26.10.2026 г",
                    area: "29.8 га"
                },
                {
                    id: "7344 ТР",
                    field: "Кодур-Таш",
                    company: 'ОсОО «Кербен Экспресс»',
                    mineral: "гранит",
                    note: "На стадии геологоразведки",
                    location: "Нарынская обл. Ат-Башинский р-н",
                    contractInfo: "Договор №01-164/1 от 30.08.2023 г",
                    licenseDate: "17.10.2023 г",
                    orderNum: "293-т от 30.05.2023 г",
                    debt: "282141,81",
                    term: "17.09.2022-17.09.2027",
                    agreement: "ЛС №2 до 17.09.2027 г",
                    area: "812.8 га"
                },
                {
                    id: "7404 ТР",
                    field: "Айрташ",
                    company: 'ОсОО «Кербен Экспресс»',
                    mineral: "гранит",
                    note: "На стадии геологоразведки",
                    location: "Джалал-Абадская область. Тогуз-Тороуский район",
                    contractInfo: "Договор №01-176 от 25.08.2023 г",
                    licenseDate: "17.10.2023 г",
                    orderNum: "445-т от 04.08.2023 г",
                    debt: "42418,47",
                    term: "17.09.2022-17.09.2027",
                    agreement: "ЛС №2 до 17.09.2027 г",
                    area: "122 га"
                },
                {
                    id: "7623 АР",
                    field: "Средний Суусамыр",
                    company: 'Договор расторжен',
                    mineral: "россыпное золото",
                    note: "На стадии геологоразведочных работ, ожидается аннулирование лицензии",
                    location: "Чуйская обл. Панфиловский р-н",
                    contractInfo: "",
                    licenseDate: "27.02.2025 г",
                    orderNum: "113-т от 27.02.2025 г",
                    debt: "переплата 211298,20",
                    term: "27.02.2025-27.02.2029",
                    agreement: "ЛС №2 до 27.02.2029 г",
                    area: "2706,1"
                },
                {
                    id: "7409 АР",
                    field: "Площадь «Чанач»",
                    company: 'ОсОО «Зенит Строй»',
                    mineral: "россыпное золото",
                    note: "запасы поставлены на Государственную комиссиию по запасам (ГКЗ) ожидает трансформации лицензии",
                    location: "Джалал-Абадская область. Чаткал р-н",
                    contractInfo: "Договор №01-191/1 от 11.10.2023 г",
                    licenseDate: "23.10.2023 г",
                    orderNum: "295-т от 30.05.2023 г",
                    debt: "0,00",
                    term: "23.10.2023-23.10.2027",
                    agreement: "ЛС №2 до 23.10.2027 г",
                    area: "279.8 га"
                },
                {
                    id: "7447 МР",
                    field: "Джетим",
                    company: 'Нет партнера',
                    mineral: "железо",
                    note: "На стадии проектировании тех проекта",
                    location: "Нарынская область. Нарынский район",
                    contractInfo: "",
                    licenseDate: "27.12.2023 г",
                    orderNum: "796-т от 21.12.2023 г",
                    debt: "20509689,34",
                    term: "27.12.2023-27.12.2027",
                    agreement: "ЛС №1 до 27.12.2025 г",
                    area: "30 555.4 га"
                },
                {
                    id: "7474 АР ",
                    field: "Участок «Мазарашу»",
                    company: 'ОсОО «Кел-Кел Кут Кей Джи»',
                    mineral: "россыпное золото",
                    note: "На стадии завершении геологоразведочных работ, по прогнозу 2026 поставят запасы на баланс ГКЗ",
                    location: "Ошская обл. Чон-Алай р-н",
                    contractInfo: "Договор №01-047/1 от 11.03.2024 г",
                    licenseDate: "07.03.2024 г",
                    orderNum: "29-р от 31.01.2024 г",
                    debt: "1272675,07",
                    term: "07.03.2024-03.2028",
                    agreement: "ЛС №3 до 07.03.2028 г",
                    area: "2524.6 га"
                },
                {
                    id: "7483 СР",
                    field: "Площадь Арпатала",
                    company: 'ОсОО «Нур-Кен»',
                    mineral: "уголь",
                    note: "на проведение геологоразведки",
                    location: "Ошская обл. Чон-Алай р-н",
                    contractInfo: "Договор №01-076 от 09.04.2024 г",
                    licenseDate: "12.03.2024 г",
                    orderNum: "84-т от 05.03.2024 г",
                    debt: "переплата 67953,98",
                    term: "12.03.2024-12.03.2028",
                    agreement: "ЛС №2 до 12.02.2028 г",
                    area: "134.8 га"
                },
                {
                    id: "",
                    field: "",
                    company: '',
                    mineral: "",
                    note: "",
                    location: "",
                    contractInfo: "",
                    licenseDate: "",
                    orderNum: "",
                    debt: "",
                    term: "",
                    agreement: "",
                    area: ""
                },
                // Сюда вы добавляете остальные объекты из таблицы
            ]
        }
    };

    const data = content[language] || content.RU;

    // Авто-генерация фильтров
    const allRegions = useMemo(() => [...new Set(data.licenses.map(l => l.location.split(',')[0]))], [data.licenses]);
    const allMinerals = useMemo(() => [...new Set(data.licenses.map(l => l.mineral))], [data.licenses]);

    // Логика фильтрации
    const filteredLicenses = useMemo(() => {
        return data.licenses.filter(lic => {
            const matchesSearch = lic.field.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  lic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  lic.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRegion = regionFilter === "Все" || lic.location.includes(regionFilter);
            const matchesMineral = mineralFilter === "Все" || lic.mineral.includes(mineralFilter);
            return matchesSearch && matchesRegion && matchesMineral;
        });
    }, [searchTerm, regionFilter, mineralFilter, data.licenses]);

    return (
        <div className="registry-page">
            <h1 className="page-title">{data.title}</h1>
            
            <div className="registry-controls">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder={data.searchPlaceholder} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => setRegionFilter(e.target.value)}>
                    <option value="Все">{data.regionLabel} {data.all}</option>
                    {allRegions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                </select>
                <select onChange={(e) => setMineralFilter(e.target.value)}>
                    <option value="Все">Ископаемое (Все)</option>
                    {allMinerals.map(min => <option key={min} value={min}>{min}</option>)}
                </select>
            </div>

            <div className="registry-grid">
                {filteredLicenses.map((lic, index) => (
                    <div key={index} className="license-card">
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
