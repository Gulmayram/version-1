import React, { useContext } from 'react';
import { LanguageContext } from "../../LanguageContext";
import './Reception.css';

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
                                    <span>📞 {item.phone}</span>
                                    <span>📧 {item.email}</span>
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
