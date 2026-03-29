import { Bell, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Topbar = ({ isInternView, onMenuClick }) => {
  const location = useLocation();
  
  // A small helper to map paths to titles
  const getPageTitle = (path) => {
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/interns')) return 'Intern Profiles';
    if (path === '/tasks') return 'Task Review';
    if (path === '/certificates') return 'Certificates';
    if (path === '/intern-dashboard') return 'My Dashboard';
    return 'Dashboard';
  };

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div className="topbar-title">{getPageTitle(location.pathname)}</div>
      </div>
      <div className="topbar-right">
        {!isInternView && <div className="date-pill">Week 3 · April 2025</div>}
        <div className="notif-btn">
          <Bell size={16} color="#5A5E6B" />
          <div className="notif-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
