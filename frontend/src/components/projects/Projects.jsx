import React, {useContext, useEffect} from 'react';
import './Projects.css';
import Map from "../map/Map";
import {translate} from "../../assets/translate";
import {LanguageContext} from "../../LanguageContext";
import {useDispatch, useSelector} from "react-redux";
import {getMaps, getNewMaps} from "../../store/apiSlice";
import RedirectIcon from "../../assets/maximize.svg"

const Projects = () => {
    const { language } = useContext(LanguageContext);
    const {maps,newMaps,loading} = useSelector((state) => state.api)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getMaps())
        dispatch(getNewMaps())
    },[dispatch])
        return (
    <section className="projects">
      <div className="containerProjects">
        <h2 className="section-title">{translate.projects[language]}</h2>
        <div className='mapProjectsContainer'>
            <div className="mapContent">
                <Map maps={maps || []} loading={loading} type={0}/>
                <h2 className="section-title"
                    style={{marginTop: "40px"}}>{translate.geologicalExploration[language]}</h2>
                <Map maps={newMaps || []} loading={loading} type={1}/>
                <a href='http://open.geology.kg/minresources/f1_ru.aspx' target="_blank"  className='linkToMaps'>
                    <button className='mapRedirect'>
                        <p>Карта всех месторождений</p>
                        <img src={RedirectIcon} alt="" style={{width: '20px', height: "20px",marginLeft:"10px", marginRight: '5px'}}/>
                    </button>
                </a>
            </div>
        </div>
      </div>
    </section>
);
};

export default Projects;


