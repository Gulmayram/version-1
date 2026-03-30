import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext'; 
import './Requisites.css';

const Requisites = () => {
  const { language } = useContext(LanguageContext);

  // Текст для разных языков
  const content = {
    RU: {
      title: "Банковские реквизиты",
      organization: "Государственное предприятие «Кыргызгеология» при МПРЭТН",
      details: [
        "ИНН: 00204199110156",
        "ОКПО: 22754545",
        "Расчетный счет (KGS): 1240020000000000",
        "Банк: ОАО «Айыл Банк»",
        "БИК: 124001",
        "Назначение: За оказание геологических услуг"
      ]
    },
    KG: {
      title: "Банктык реквизиттер",
      organization: "КПРЖТМ караштуу «Кыргызгеология» мамлекеттик ишканасы",
      details: [
        "ИНН: 00204199110156",
        "ОКПО: 22754545",
        "Эсептешүү эсеби (KGS): 1240020000000000",
        "Банк: «Айыл Банк» ААК",
        "БИК: 124001",
        "Максаты: Геологиялык кызмат көрсөтүүлөр үчүн"
      ]
    },
    EN: {
      title: "Bank Details",
      organization: "State Enterprise 'Kyrgyzgeology' under the MNRETS",
      details: [
        "TIN: 00204199110156",
        "OKPO: 22754545",
        "Account (KGS): 1240020000000000",
        "Bank: 'Aiyl Bank' OJSC",
        "BIC: 124001",
        "Purpose: For geological services"
      ]
    }
  };

  const current = content[language?.toUpperCase()] || content.RU;

  return (
    <div className="requisites-page">
      <h1 className="page-title">{current.title}</h1>
      <div className="title-underline"></div>
      
      <div className="requisites-card">
        <div className="requisites-text">
          <h3>{current.organization}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {current.details.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Requisites;
