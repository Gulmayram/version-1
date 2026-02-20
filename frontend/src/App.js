import React, { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* 1. Хедер — он всегда фиксирован сверху */}
      <Header 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen} 
      />

      <div className="main-wrapper">
        {/* 2. Сайдбар — на десктопе он забирает свои 280px */}
        <Sidebar />

        {/* 3. Основная рабочая область (Layout) */}
        <main className="main-layout">
          
          {/* Navbar появляется только на планшетах/телефонах под хедером */}
          <Navbar isOpen={isMenuOpen} />
          
          {/* 4. СЮДА ВЕРНЕТСЯ ТВОЙ КОНТЕНТ */}
          <section className="page-content">
             {/* <MyRoutes /> твой роутинг или просто текст */}
             <h1 className="section-title">Контент страницы</h1>
             <p>Теперь он не должен пропадать.</p>
          </section>
          
        </main>
      </div>
    </div>
  );
}

export default App;
