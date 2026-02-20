import React, { useState } from 'react';
import Header from './components/Header/Header'; // Проверь этот путь!
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Header всегда прибит к верху (z-index: 10000) */}
      <Header 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen} 
      />

      <div className="main-content-wrapper">
        {/* Sidebar: виден только > 1024px */}
        <div className="sidebar-container">
          <Sidebar />
        </div>

        <main className="main-layout">
          {/* Navbar: 
              769px-1024px — горизонтальная полоса под хедером
              < 768px — полноэкранное меню по центру (isOpen) 
          */}
          <Navbar isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
          
          <div className="page-data">
            <div className="content-area">
              {/* <MyRoutes /> */}
              <h1 className="section-title">Контент страницы</h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
