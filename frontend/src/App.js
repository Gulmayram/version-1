import React, { useState } from 'react';
import Header from './components/Header/Header'; // Верхняя белая панель
import Sidebar from './components/Sidebar/Sidebar'; // Синий боковой блок
import Navbar from './components/navbar/Navbar'; // Твоя навигация
import Myroutes from './routes/Myroutes';
import Footer from './components/footer/Footer';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="App">
      {/* 1. Header всегда сверху */}
      <Header 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen} 
      />

      <div className="main-wrapper">
        {/* 2. Sidebar слева (виден > 1024px) */}
        <Sidebar />

        {/* 3. Основной контент */}
        <div className="main-layout">
          {/* Navbar (адаптивный под мобилки и планшеты) */}
          <Navbar isOpen={isMenuOpen} />
          
          <main className="content-area">
            <Myroutes />
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
