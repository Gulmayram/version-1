import React, { useContext } from 'react';
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    // Берём текущий язык. Если контекста нет, по умолчанию ставим 'RU'
    const context = useContext(LanguageContext);
    const language = context ? context.language : 'RU';

    // СТАТИЧНЫЕ ДАННЫЕ НА ТРЕХ ЯЗЫКАХ
    const content = {
        RU: {
            title: "Банковские реквизиты",
            subtitle: "Государственное предприятие «Кыргызгеология» при Министерстве природных ресурсов, экологии и технического надзора Кыргызской Республики",
            bankDetails: [
                { label: "ИНН", value: "00201199710081" },
                { label: "Код ОКПО", value: "21613271" },
                { label: "Регистрационный номер", value: "8881-3301-ГП" },
                { label: "Юридический адрес", value: "720001, Кыргызская Республика, г. Бишкек, проспект Эркиндик, 2" },
                { label: "Фактический адрес", value: "720001, Кыргызская Республика, г. Бишкек, проспект Эркиндик, 2" }
            ],
            paymentTitle: "Расчетные счета:",
            accounts: [
                { currency: "KGS (Сом)", bank: "ОАО «РСК Банк», г. Бишкек", account: "12000119971008101" },
                { currency: "USD (Доллар)", bank: "ОАО «РСК Банк», г. Бишкек", account: "12000119971008102" },
                { currency: "RUB (Рубль)", bank: "ОАО «РСК Банк», г. Бишкек", account: "12000119971008103" }
            ]
        },
        KG: {
            title: "Банктык реквизиттер",
            subtitle: "Кыргыз Республикасынын Жаратылыш ресурстары, экология жана техникалык көзөмөл министрлигине караштуу «Кыргызгеология» мамлекеттик ишканасы",
            bankDetails: [
                { label: "ИНН", value: "00201199710081" },
                { label: "ОКПО коду", value: "21613271" },
                { label: "Каттоо номери", value: "8881-3301-ГП" },
                { label: "Юридикалык дареги", value: "720001, Кыргыз Республикасы, Бишкек ш., Эркиндик проспектиси, 2" },
                { label: "Иш жүзүндөгү дареги", value: "720001, Кыргыз Республикасы, Бишкек ш., Эркиндик проспектиси, 2" }
            ],
            paymentTitle: "Эсептешүү эсептери:",
            accounts: [
                { currency: "KGS (Сом)", bank: "«РСК Банк» ААК, Бишкек ш.", account: "12000119971008101" },
                { currency: "USD (Доллар)", bank: "«РСК Банк» ААК, Бишкек ш.", account: "12000119971008102" },
                { currency: "RUB (Рубль)", bank: "«РСК Банк» ААК, Бишкек ш.", account: "12000119971008103" }
            ]
        },
        EN: {
            title: "Bank Details",
            subtitle: "State Enterprise \"Kyrgyzgeology\" under the Ministry of Natural Resources, Ecology and Technical Supervision of the Kyrgyz Republic",
            bankDetails: [
                { label: "TIN", value: "00201199710081" },
                { label: "OKPO Code", value: "21613271" },
                { label: "Registration Number", value: "8881-3301-ГП" },
                { label: "Legal Address", value: "2 Erkindik Avenue, Bishkek, 720001, Kyrgyz Republic" },
                { label: "Actual Address", value: "2 Erkindik Avenue, Bishkek, 720001, Kyrgyz Republic" }
            ],
            paymentTitle: "Current Accounts:",
            accounts: [
                { currency: "KGS (Som)", bank: "OJSC \"RSK Bank\", Bishkek", account: "12000119971008101" },
                { currency: "USD (Dollar)", bank: "OJSC \"RSK Bank\", Bishkek", account: "12000119971008102" },
                { currency: "RUB (Ruble)", bank: "OJSC \"RSK Bank\", Bishkek", account: "12000119971008103" }
            ]
        }
    };

    // Выбираем данные для текущего языка (или фоллбэк на русский)
    const data = content[language?.toUpperCase()] || content.RU;

    return (
        <div className="requisites-page">
            <h1 className="page-title">{data.title}</h1>
            <div className="title-underline"></div>
            
            <div className="requisites-container">
                <div className="requisites-card main-info">
                    <p className="enterprise-subtitle">{data.subtitle}</p>
                    <div className="info-list">
                        {data.bankDetails.map((item, index) => (
                            <div key={index} className="info-item">
                                <span className="info-label">{item.label}:</span>
                                <span className="info-value">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="requisites-card accounts-info">
                    <h2 className="accounts-title">{data.paymentTitle}</h2>
                    <div className="accounts-grid">
                        {data.accounts.map((acc, index) => (
                            <div key={index} className="account-item">
                                <div className="account-currency">{acc.currency}</div>
                                <div className="account-bank">{acc.bank}</div>
                                <div className="account-number">{acc.account}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Requisites;
