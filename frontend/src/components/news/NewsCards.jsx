import React, {useContext, useEffect, useRef, useState} from 'react';
import './NewsCards.css';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getNews} from "../../store/apiSlice";
import {translate} from "../../assets/translate";
import {LanguageContext} from "../../LanguageContext";
import CustomSelect from "./selectComponent";

const determineCardSize = (index) => {
  switch (index % 6) {
    case 0:
      return 'size-1';
    case 1:
      return 'size-1';
    case 2:
      return 'size-2';
    case 3:
      return 'size-3';
    case 4:
      return 'size-4';
    case 5:
      return 'size-5';
    default:
      return 'size-1';
  }
};

const NewsCards = () => {
  const dispatch = useDispatch();
  const {news,categories,loading} = useSelector((state)=> state.api)
  const [sortedNews,setSortedNews] = useState([])
  const newsCardsRef = useRef([]);
  const [listOfCategories,setListOfCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredNews, setFilteredNews] = useState([])
  useEffect(()=>{
    dispatch(getNews())
    dispatch(getCategories())
  },[])
  useEffect(() => {
    setListOfCategories(categories)
  }, [categories]);
  useEffect(() => {
    if (news && news.length > 0) {
      // Сортировка новостей по дате
      const sorted = [...news].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setSortedNews(sorted);
    }
  }, [news]);
  const navigate = useNavigate();
  const [visibleNews, setVisibleNews] = useState(7); // Определяем начальное количество видимых новостей
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    if (selectedCategory) {
      setFilteredNews(sortedNews.filter((newsItem) => newsItem.category === Number(selectedCategory)));
    } else {
      setFilteredNews(sortedNews);
    }
  }, [sortedNews, selectedCategory]);
  const handleNavigate = (path) => {
    navigate(path);
  };
  const reversingDate = (date) =>{
    const reverseDate = date?.split('-').reverse().join('-')
    return reverseDate
  }

  const handleLoadMore = () => {
    setVisibleNews(prevVisibleNews => prevVisibleNews + 7); // Увеличиваем количество видимых новостей на 7 при нажатии на кнопку "Загрузить еще"
  };
  const handleSelectCategory = (category)=>{
    setSelectedCategory(category)
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Порог видимости элемента
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    newsCardsRef.current.forEach((card, index) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [filteredNews, visibleNews]); // Зависимости useEffect

  if (loading) {
    return <div style={{display:"flex", alignItems:"center",justifyContent:"center", padding:'100px'}}><span className="loader"></span></div>;
  }
  if (!news || news.length === 0) {
    return <div style={{display: "flex", alignItems: "center", justifyContent: "center", padding: '100px'}} className="noData">
      <h1>{translate.noNews[language]}...</h1>
    </div>
  }
  return (
      <div className='news-section'>
      {loading === false ? (
          <div>
            <div className='select-category'>
              <CustomSelect
                  options={categories}
                  defaultTitle={'Все'}
                  onSelect={handleSelectCategory}
              />
            </div>
            <div className="news-cards-container">
              {filteredNews.slice(0, visibleNews)?.map((news, index) => (
                  <div
                      onClick={() => handleNavigate(`/newsitem/${news.id}`)}
                      key={index}
                      ref={(el) => (newsCardsRef.current[index] = el)}
                      className={`news-card ${determineCardSize(index)}`}
                  >

                    {news.preview && (
                        <img src={news.preview} alt={news.title} className="news-image"/>
                    )}
                    <div className="news-content">
                      <h3>{news[translate.translatedApi.title[language]]}</h3>
                    </div>
                    <span className="news-date">{reversingDate(news.created_at)}</span>
                  </div>
              ))}
              
            </div>
            {filteredNews.length > visibleNews && (
                  <button className='load-more-btn' onClick={handleLoadMore}>{translate.loadMore[language]}</button>
            )}
          </div>
      ) : (<div>
      </div>)}
      </div>
  )
      ;
};

export default NewsCards;

