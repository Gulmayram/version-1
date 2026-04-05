import React, { useContext } from 'react';
import { LanguageContext } from "../../LanguageContext";
import './Reception.css';

const Icons = {
    phone: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.88 12.88 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
    ),
    email: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7b1fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    )
};
const Reception = () => {
    const context = useContext(LanguageContext);
    const language = context ? context.language : 'RU';

    const content = {
        RU: {
            title: "Приёмная",
            subtitle: "График приёма граждан и контактная информация руководства ГП «Кыргызгеология»",
            managerTitle: "Руководство",
            scheduleTitle: "График приёма",
            contacts: [
                { position: "Директор", name: "Абдыкадыров А.А.", phone: "+996 (312) 30-06-50", email: "info@geology.kg" },
                { position: "Заместитель директора", name: "Осмонов Б.Т.", phone: "+996 (312) 30-07-12", email: "deputy@geology.kg" }
            ],
            schedule: [
                { day: "Понедельник", time: "14:00 – 17:00", person: "Директор" },
                { day: "Среда", time: "10:00 – 12:00", person: "Заместитель директора" }
            ],
            note: "Запись на приём осуществляется по указанным номерам телефонов."
        },
        KG: {
            title: "Приёмкана",
            subtitle: "Жарандарды кабыл алуу графиги жана «Кыргызгеология» МИ жетекчилигинин байланыш маалыматы",
            managerTitle: "Жетекчилик",
            scheduleTitle: "Кабыл алуу графиги",
            contacts: [
                { position: "Директор", name: "Абдыкадыров А.А.", phone: "+996 (312) 30-06-50", email: "info@geology.kg" },
                { position: "Директордун орун басары", name: "Осмонов Б.Т.", phone: "+996 (312) 30-07-12", email: "deputy@geology.kg" }
            ],
            schedule: [
                { day: "Дүйшөмбү", time: "14:00 – 17:00", person: "Директор" },
                { day: "Шаршемби", time: "10:00 – 12:00", person: "Директордун орун басары" }
            ],
            note: "Кабыл алууга жазылуу көрсөтүлгөн телефон номерлери аркылуу жүргүзүлөт."
        }
    };

    const data = content[language?.toUpperCase()] || content.RU;

    return (
        <div className="reception-page">
            <h1 className="page-title">{data.title}</h1>
            <div className="title-underline"></div>
            
            <div className="reception-container">
                {/* Карточка руководства */}
                <div className="reception-card">
                    <h2 className="card-header">{data.managerTitle}</h2>
                    <div className="manager-list">
                        {data.contacts.map((item, index) => (
                            <div key={index} className="manager-item">
                                <div className="manager-pos">{item.position}</div>
                                <div className="manager-name">{item.name}</div>
                                <div className="manager-links">
                                    <div className="contact-item">
                                        {Icons.phone} 
                                        <a href={`tel:${item.phone.replace(/\D/g, '')}`}>{item.phone}</a>
                                    </div>
                                    <div className="contact-item">
                                        {Icons.email} 
                                        <a href={`mailto:${item.email}`}>{item.email}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Карточка графика */}
                <div className="reception-card schedule-card">
                    <h2 className="card-header">{data.scheduleTitle}</h2>
                    <div className="schedule-table">
                        {data.schedule.map((item, index) => (
                            <div key={index} className="schedule-row">
                                <div className="schedule-day">{item.day}</div>
                                <div className="schedule-time">{item.time}</div>
                                <div className="schedule-person">{item.person}</div>
                            </div>
                        ))}
                    </div>
                    <p className="schedule-note">*{data.note}</p>
                </div>
            </div>
        </div>
    );
};

export default Reception;
