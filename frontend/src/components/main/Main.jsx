import React, {useState, useEffect, useContext, useRef} from 'react';
import './Main.css';
import mainPhoto from "../../assets/mainPhoto.jpg"
import NewsCards from '../news/NewsCards';
import {translate} from "../../assets/translate";
import {LanguageContext} from "../../LanguageContext";
import {useDispatch, useSelector} from "react-redux";
import {getHome} from "../../store/apiSlice";


const Main = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const timeOut = 5000
    const dispatch = useDispatch()
    const {homes} = useSelector((state)=> state.api)
    const intervalRef = useRef(null);
    console.log("Текущие данные homes:", homes);
    useEffect(()=>{
        dispatch(getHome())
    },[])
    const clearAndSetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % (homes?.length || 1));
        }, timeOut);
    };

useEffect(() => {
    if (Array.isArray(homes) && homes.length > 0) {
        clearAndSetInterval();
    }
    return () => clearInterval(intervalRef.current);
}, [homes?.length, timeOut]); // Используем ?. для безопасного доступа

   const goToSlide = (index) => {
     setCurrentSlide(index);
     clearAndSetInterval();
   };
    const { language } = useContext(LanguageContext);
  return (
    <div className="main-page">


      


      <div className="slider">
          {homes?.length > 0 ? (
              <div className="slide">
                  <div className="titleSlide">
                      <h2>{homes?.[currentSlide]?.[translate.translatedApi.title[language]]}</h2>
                  </div>
                  <img
                      src={homes[currentSlide]?.image}
                      alt={`Slide ${currentSlide}`}
                      style={{ width: '100%', height: '100vmin' }}
                  />
              </div>
          ):(
              <img src={mainPhoto} alt="main" style={{ width: '100%', height: '100vmin' }}/>
          )}
<div className="dots">
  {Array.isArray(homes) && homes.map((home, index) => (
    <div
      key={index}
      className={`dot ${index === currentSlide ? 'active' : ''}`}
      onClick={() => goToSlide(index)}
    >
        <img style={{borderRadius:"5px"}} src={home?.icon} alt="icon" />
        <h4>{home?.mini_title}</h4>
    </div>
  ))}
</div>
      </div>


        <div className="newsBlock">
            <h2 className="section-title">{translate.news[language]}</h2>
            <NewsCards/>
        </div>
    </div>
  );
};

export default Main;





