import React, { useState } from 'react';
import Header from './components/header/Header'; 
import Sidebar from './components/sidebar/Sidebar'; 
import Navbar from './components/navbar/Navbar'; 
import MobileBar from './components/mobilebar/MobileBar'; // Новый компонент
import Myroutes from './routes/Myroutes';
import Footer from './components/footer/Footer';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="App">
      {/* Передаем функцию открытия в Header (там будет кнопка-бургер) */}
      <Header 
        toggleMenu={toggleMenu} 
        isMenuOpen={isMenuOpen} 
      />

      {/* Мобильное меню (выезжающее) */}
      <MobileBar 
        isOpen={isMenuOpen} 
        onClose={closeMenu} 
      />

      <div className="main-wrapper">
        <Sidebar />

        <div className="main-layout">
          {/* Navbar теперь отвечает только за планшетную версию */}
          <Navbar />
          
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
