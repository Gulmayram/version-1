import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import HistoryAndMission from "../components/about/HistoryAndMission";
import Main from "../components/main/Main";
import OrganizationalChart from "../components/about/OrganizationalChart";
import AchievementsProjects from "../components/about/AchievementsProjects";
import NewsItem from "../components/news/NewsItem";
import Services from "../components/services/Services";
import Projects from "../components/projects/Projects";
import Contacts from "../components/contacts/Contacts";
import InvestorPage from "../components/about/InvestorPage";
import NewsForm from "../components/news/NewsForm";
import NewsPage from "../components/news/NewsPage";
import MapItem from "../components/map/mapItem";
import NewMapItem from "../components/map/newMapItem";
import EmployeeItem from "../components/about/EmployeeItem";
import AchievementItem from "../components/about/AchievementItem";
import BoezgrtMain from "../components/bzgrt/BoezgrtMain";
import BoezgrtAbout from "../components/bzgrt/BoezgrtAbout";
import BoezgrtProductCard from "../components/bzgrt/BoezgrtProductCard";
import BoezgrtContacts from "../components/bzgrt/BoezgrtContacts";
import BoezgrtProductDetail from "../components/bzgrt/BoezgrtProductDetail";
import GPItem from "../components/about/gpItem";
import Vacancies from "../components/vacancies/Vacancies";
import VacancyDetail from "../components/vacancies/VacancyDetail";

const PUBLIC_ROUTES = [
  { id: 2, link: "/", element: <Main/> },
  { id: 1, link: "/news", element: <NewsPage/> },
  
  // --- РАЗДЕЛ: О ПРЕДПРИЯТИИ ---
  { id: 3, link: "/historyandmission", element: <HistoryAndMission /> }, 
  { id: 25, link: "/about/management", element: <OrganizationalChart /> }, 
  { id: 26, link: "/about/statute", element: <InvestorPage /> }, 
  { id: 4, link: "/organization", element: <HistoryAndMission /> }, 
  { id: 27, link: "/about/reports", element: <InvestorPage /> }, 
  { id: 28, link: "/about/maps", element: <MapItem /> }, 

  // --- РАЗДЕЛ: ДЕЯТЕЛЬНОСТЬ ---
  { id: 8, link: "/services", element: <Services/> },
  { id: 9, link: "/projects", element: <Projects/> },
  { id: 19, link: "/boezgrproductcard", element: <BoezgrtProductCard/> },
  { id: 29, link: "/partners", element: <InvestorPage/> },
  { id: 30, link: "/deposits", element: <MapItem/> },
  { id: 31, link: "/anticorruption", element: <InvestorPage/> },

  // --- РАЗДЕЛ: ДОКУМЕНТЫ И ОТЧЁТЫ ---
  { id: 32, link: "/docs/financial", element: <InvestorPage /> },
  { id: 33, link: "/docs/social", element: <InvestorPage /> },
  { id: 34, link: "/docs/technical", element: <InvestorPage /> },

  // --- РАЗДЕЛ: НОРМАТИВНАЯ БАЗА ---
  { id: 35, link: "/legal", element: <InvestorPage /> },
  { id: 36, link: "/forms", element: <InvestorPage /> },
  { id: 37, link: "/instructions", element: <InvestorPage /> },

  // --- ОСТАЛЬНЫЕ МАРШРУТЫ ---
  { id: 5, link: "/achievementsProjects", element: <AchievementsProjects/> },
  { id: 6, link: "/newsitem/:newsId", element: <NewsItem/> },
  { id: 10, link: "/contacts", element: <Contacts/> },
  { id: 11, link: "/investorpage", element: <InvestorPage/> },
  { id: 12, link: '/newsform', element: <NewsForm/> },
  { id: 13, link: '/mapItem/:mapId', element:<MapItem/>},
  { id: 14, link: '/newMapItem/:mapId', element:<NewMapItem/>},
  { id: 15, link: '/employee/:employeeId', element:<EmployeeItem/>},
  { id: 16, link: '/achievement/:achievementId', element:<AchievementItem/>},
  { id: 17, link: '/boezgrtmain', element: <BoezgrtMain/> },
  { id: 18, link: '/boezgrtabout', element: <BoezgrtAbout/> },
  { id: 20, link: '/boezgrtcontact', element: <BoezgrtContacts/> },
  { id: 21, link: '/boezgrproduct/:productId', element: <BoezgrtProductDetail/>},
  { id: 22, link: '/gp/:gpId', element: <GPItem/>},
  { id: 23, link: '/vacancies', element: <Vacancies/>},
  { id: 24, link: '/vacancies/:vacancyId', element: <VacancyDetail/>}
];

const Reload = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <React.Fragment key={location.pathname}>{children}</React.Fragment>;
};

const Myroutes = () => {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);
  useEffect(() => {
    setKey(location.pathname);
  }, [location]);

  return (
    <Routes key={key}>
      {PUBLIC_ROUTES.map((elem) => (
        <Route path={elem.link} element={<Reload>{elem.element}</Reload>} key={elem.id} />
      ))}
    </Routes>
  );
};

export default Myroutes;
