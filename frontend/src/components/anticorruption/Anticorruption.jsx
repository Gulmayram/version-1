import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";
import './Anticorruption.css';

const Anticorruption = () => {
  const { language } = useContext(LanguageContext);
  const lang = language ? language.toUpperCase() : "RU";

  // Берем данные из перевода
  const title = translate['anticorruptionTitle'][lang];
  const docs = translate['anticorruptionDocs'][lang];

  return (
    <div className="anti-page">
      <header className="anti-header">
        <div className="badge">Anti-Corruption</div>
        <h1>{title}</h1>
        <p>Официальные нормативные документы и планы по противодействию коррупции.</p>
      </header>

      <div className="docs-grid">
        {docs.map((doc, index) => (
          <a 
            key={index} 
            href={doc.fileUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="doc-card"
          >
            <div className="doc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6" />
              </svg>
            </div>
            <div className="doc-content">
              <h3>{doc.title}</h3>
              <span className="file-type">PDF Document</span>
            </div>
            <div className="download-btn">Открыть</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Anticorruption;
