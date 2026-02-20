import React from 'react';
import Navbar from './components/navbar/Navbar'; // Твое меню
import Header from './components/header/Header'; // Верхняя полоса (поиск, соцсети)
import Myroutes from './routes/Myroutes';
import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* Виден только на десктопе (через CSS) */}
      <Sidebar />
      
      <div className="main-layout">
        {/* Header всегда сверху */}
        <Header /> 
        
        {/* Navbar виден только на мобилках (через CSS) */}
        <Navbar />
        
        <main className="content-area">
          <Myroutes />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default App;
