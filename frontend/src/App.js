import React from 'react';
import Navbar from './components/navbar/Navbar';
import Myroutes from './routes/Myroutes';
import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/Sidebar'; // Импортируем ваш новый сайдбар
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* Сайдбар обычно фиксирован слева */}
      <Sidebar />
      
      {/* Создаем обертку для остального контента, чтобы он не залезал под сайдбар */}
      <div className="main-layout">
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
