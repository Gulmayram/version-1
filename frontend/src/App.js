import React, { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* 1. Header — есть всегда */}
      <Header 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen} 
      />

      <div className="main-content-wrapper">
        {/* 2. Sidebar — только > 1024px (логика в CSS) */}
        <Sidebar />

        <main className="page-data">
          {/* 3. Navbar — только <= 1024px */}
          <Navbar isOpen={isMenuOpen} />
          
          {/* Твои роуты и контент */}
          <MyRoutes />
        </main>
      </div>
    </div>
  );
}
