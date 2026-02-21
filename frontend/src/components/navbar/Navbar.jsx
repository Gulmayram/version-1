const Navbar = ({ subMenus }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  // Если subMenus не пришел, возвращаем пустую полоску, чтобы сайт не падал
  if (!subMenus) return <nav className="tablet-navbar"></nav>;

  const menuKeys = ['about', 'activity', 'docs', 'base', 'news', 'contacts'];

  return (
    <nav className="tablet-navbar">
      <div className="navbar-inner">
        {menuKeys.map((key) => {
          const item = subMenus[key];
          if (!item) return null; // Пропускаем, если ключа нет

          return (
            <div 
              key={key} 
              className="nav-group"
              onMouseEnter={() => setActiveMenu(key)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="nav-item-btn">
                {item.title}
                <i className="fas fa-chevron-down nav-arrow"></i>
              </button>
              {activeMenu === key && (
                <ul className="nav-dropdown">
                  {item.links.map((link, idx) => (
                    <li key={idx}><a href={link}>Подпункт {idx + 1}</a></li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
