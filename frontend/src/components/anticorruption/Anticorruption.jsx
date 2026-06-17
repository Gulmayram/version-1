import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import { translate } from "../../assets/translate";
import './Anticorruption.css';

const Anticorruption = () => {
  const { language } = useContext(LanguageContext);
  const lang = language ? language.toUpperCase() : "RU";

  // Заголовок и список документов из файла переводов
  const title = translate['anticorruptionTitle'] ? translate['anticorruptionTitle'][lang] : "Антикоррупция";
  const docs = translate['anticorruptionDocs'] ? translate['anticorruptionDocs'][lang] : [];

  return (
    <div className="anticorruption-page">
      <div className="content-header">
        <h1>{title}</h1>
      </div>
      
      <div className="docs-container">
        {docs.length > 0 ? (
          docs.map((doc, index) => (
            <a 
              key={index} 
              href={doc.fileUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="doc-card"
            >
              <div className="doc-icon">
                <img src="/icons/pdf-icon.svg" alt="PDF" />
              </div>
              <div className="doc-info">
                <h3>{doc.title}</h3>
                <span className="doc-meta">PDF • {doc.size || 'Скачать'}</span>
              </div>
            </a>
          ))
        ) : (
          <p>{translate['noDocuments'][lang] || "Документы временно отсутствуют."}</p>
        )}
      </div>
    </div>
  );
};

export default Anticorruption;
