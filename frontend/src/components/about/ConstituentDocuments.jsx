import React from 'react';
import statutePdf from '../../assets/statute.pdf';
import certPdf from '../../assets/registration_certificate.pdf';
import resPdf from '../../assets/resolution_231.pdf';
import './ConstituentDocuments.css';

const IconDoc = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const ConstituentDocuments = () => {
  const docs = [
    { title: "Устав ГП «Кыргызгеология»", file: statutePdf },
    { title: "Свидетельство о регистрации", file: certPdf },
    { title: "Постановление Кабмина КР № 231", file: resPdf }
  ];

  return (
    <div className="docs-container">
      <div className="docs-header">
        <h1>Учредительные документы</h1>
        <div className="header-line"></div>
      </div>
      
      <div className="docs-grid">
        {docs.map((doc, index) => (
          <a key={index} href={doc.file} target="_blank" rel="noopener noreferrer" className="doc-card">
            <div className="doc-icon-wrapper">
              <IconDoc />
            </div>
            <h3>{doc.title}</h3>
            <span className="doc-link">Смотреть документ</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ConstituentDocuments;
