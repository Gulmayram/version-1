import React, { useContext } from 'react';
import { LanguageContext } from "../../LanguageContext";
import './Requisites.css';

const Requisites = () => {
    const context = useContext(LanguageContext);
    const language = context ? context.language : 'RU';

    const content = {
        RU: {
            title: "Банковские реквизиты",
            subtitle: "Государственное предприятие «Кыргызгеология» при Министерстве природных ресурсов, экологии и технического надзора Кыргызской Республики",
            bankDetails: [
                { label: "ИНН", value: "03006199710064" },
                { label: "Код ОКПО", value: "720040" },
                { label: "Адрес", value: "720040, г. Бишкек, ул. Эркиндик, 2" },
                { label: "Телефон", value: "(312) 300-619" }
            ],
            paymentTitle: "Расчетные счета:",
            accounts: [
                { 
                    currency: "KGS (Сом)", 
                    bank: "ОАО «Айыл Банк», филиал Асанбай", 
                    account: "1350120020075459", 
                    bik: "135029" 
                }
            ]
        },
        KG: {
            title: "Банктык реквизиттер",
            subtitle: "Кыргыз Республикасынын Жаратылыш ресурстары, экология жана техникалык көзөмөл министрлигине караштуу «Кыргызгеология» мамлекеттик ишканасы",
            bankDetails: [
                { label: "ИНН", value: "03006199710064" },
                { label: "ОКПО коду", value: "720040" },
                { label: "Дареги", value: "720040, Бишкек ш., Эркиндик көч., 2" },
                { label: "Телефон", value: "(312) 300-619" }
            ],
            paymentTitle: "Эсептешүү эсептери:",
            accounts: [
                { 
                    currency: "KGS (Сом)", 
                    bank: "«Айыл Банк» ААК, Асанбай филиалы", 
                    account: "1350120020075459", 
                    bik: "135029" 
                }
            ]
        },
        EN: {
            title: "Bank Details",
            subtitle: "State Enterprise \"Kyrgyzgeology\" under the Ministry of Natural Resources, Ecology and Technical Supervision of the Kyrgyz Republic",
            bankDetails: [
                { label: "TIN", value: "03006199710064" },
                { label: "OKPO Code", value: "720040" },
                { label: "Address", value: "2 Erkindik St., Bishkek, 720040" },
                { label: "Phone", value: "(312) 300-619" }
            ],
            paymentTitle: "Current Accounts:",
            accounts: [
                { 
                    currency: "KGS (Som)", 
                    bank: "OJSC \"Ayil Bank\", Asanbay branch", 
                    account: "1350120020075459", 
                    bik: "135029" 
                }
            ]
        }
    };

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
                                <span className="info-label">{item.label}</span>
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
                                <div className="account-bik">БИК: {acc.bik}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Requisites;
