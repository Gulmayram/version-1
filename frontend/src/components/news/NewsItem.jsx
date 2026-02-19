import React, {useContext, useEffect, useState} from 'react';
import './NewsItem.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearNewsPost, getNewsPost, postComment} from "../../store/apiSlice";
import DOMPurify from 'dompurify';
import {LanguageContext} from "../../LanguageContext";
import {translate} from "../../assets/translate";
import RedirectIcon from "../../assets/maximize.svg"
const NewsItem = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({username: '', email: '' ,content: ''});
    const {newsPost} = useSelector((state)=> state.api)
    const {newsId} = useParams();
    const { language } = useContext(LanguageContext);
    const colors = [
        'rgba(255, 99, 132, 0.72)',
        'rgba(54, 162, 235, 0.72)',
        'rgba(255,213,109,0.72)',
        'rgba(75, 192, 192, 0.72)',
        'rgba(153, 102, 255, 0.72)',
        'rgba(255, 159, 64, 0.72)'
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    useEffect(()=>{
        dispatch(getNewsPost(newsId))
        return () => {
            dispatch(clearNewsPost());
        };
    },[dispatch,newsId])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(postComment({ id: newsId, comment: formData }));
        dispatch(getNewsPost(newsId))
        setFormData({username: '', email: '' ,content: ''})
    };
    const reversingDate = (date) =>{
        const reverseDate = date?.split('-').reverse().join('-')
        return reverseDate
    }
    const comments = newsPost?.comments || []
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="news-item">
        <div className="containerNews">
            <h2 className="news-title">{newsPost[translate.translatedApi.title[language]]}</h2>
            <p className='dateNews'>{reversingDate(newsPost.created_at)}</p>
            <img src={newsPost.image} style={{borderRadius: "20px", marginBottom:"20px"}} alt="NewsImage"/>
            <div className="bodyCont"
                 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(newsPost[translate.translatedApi.body[language]])}}/>
            {newsPost.file == null ? (
                <div></div>
            ) : (
                <div className="pdf-upload">
                    {isMobile ? (
                        <button className='pdfMobile'>
                            <a href={newsPost.file} target="_blank" rel="noopener noreferrer">
                                <img className='redirectIcon' style={{width:'20px', height:"20px", marginRight:'5px'}} src={RedirectIcon}/>
                                {translate.viewPdf[language]}
                            </a>
                        </button>
                    ) : (
                        <embed
                            id="pdf-plugin"
                            type="application/pdf"
                            src={newsPost?.file}
                            width="100%"
                            height="500px"
                        />
                    )}
                </div>
            )}
            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                    className="comment-input"
                    placeholder="Оставьте ваш комментарий"
                    name="content"
                    value={formData?.content}
                    onChange={handleChange}
                />
                <input
                    className="name-input"
                    type="text"
                    placeholder="Имя (обязательно)"
                    name="username"
                    value={formData?.username}
                    onChange={handleChange}
                />
                <input
                    className="email-input"
                    type="email"
                    placeholder="Email (обязательно)"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                />
                <button className="submit-button" type="submit">{translate.send[language]}</button>
            </form>
            <div className="comments">
                <h2 style={{marginBottom: "20px"}}>{translate.comments[language]}:</h2>
                {comments.length >= 1 ? (
                    comments?.map((comment, index) => (
                        <div className="comment" key={index}>
                            <div className='userLetterIcon' style={{ backgroundColor: getRandomColor() }}><h1>{comment.username[0].toUpperCase()}</h1></div>
                            <div>
                                <h2>{comment.username}</h2>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <h2 style={{color: "#545454"}}>{translate.noComments[language]}...</h2>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default NewsItem;

