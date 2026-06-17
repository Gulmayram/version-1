import React from 'react';
import statutePdf from '../../assets/statute.pdf';
import certPdf from '../../assets/registration_certificate.pdf';
import resPdf from '../../assets/resolution_231.pdf';
import './ConstituentDocuments.css'; // Обязательно создайте этот файл

const ConstituentDocuments = () => {
  const docs = [
    { title: "Устав ГП «Кыргызгеология»", file: statutePdf, icon: "📜" },
    { title: "Свидетельство о регистрации", file: certPdf, icon: "📋" },
    { title: "Постановление Кабмина КР № 231", file: resPdf, icon: "⚖️" }
  ];

  return (
    <div className="docs-container">
      <div className="docs-header">
        <h1>Учредительные документы</h1>
        <p>Официальные нормативно-правовые акты, регламентирующие деятельность предприятия.</p>
      </div>
      
      <div className="docs-grid">
        {docs.map((doc, index) => (
          <a key={index} href={doc.file} target="_blank" rel="noopener noreferrer" className="doc-card">
            <div className="doc-icon">{doc.icon}</div>
            <h3>{doc.title}</h3>
            <span className="doc-btn">Открыть PDF</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ConstituentDocuments;
