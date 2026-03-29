import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BarChart, 
  CheckSquare, 
  CalendarClock, 
  Award, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ isInternView, isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close sidebar handler when clicking link on mobile
  const handleLinkClick = () => {
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <div className={`sidebar ${!isInternView ? 'sidebar-admin' : ''} ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        <div className="logo-text">SparcTrack</div>
        <div className="logo-sub">BrandSparc · Batch 01</div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Overview</div>
        
        {isInternView ? (
          <NavLink to="/intern-dashboard" onClick={handleLinkClick} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard className="nav-icon" /> Dashboard
          </NavLink>
        ) : (
          <>
            <NavLink to="/" onClick={handleLinkClick} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <LayoutDashboard className="nav-icon" /> Dashboard
            </NavLink>
            <NavLink to="/interns" onClick={handleLinkClick} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <Users className="nav-icon" /> All Interns
              <span className="nav-badge">3</span>
            </NavLink>
            <NavLink to="/analytics" onClick={handleLinkClick} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <BarChart className="nav-icon" /> Analytics
            </NavLink>
          </>
        )}
      </div>

      {!isInternView && (
        <div className="nav-section">
          <div className="nav-label">Program</div>
          <NavLink to="/tasks" onClick={handleLinkClick} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <CheckSquare className="nav-icon" /> Task Review
          </NavLink>
          <NavLink to="/attendance" onClick={handleLinkClick} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <CalendarClock className="nav-icon" /> Attendance
          </NavLink>
          <NavLink to="/certificates" onClick={handleLinkClick} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Award className="nav-icon" /> Certificates
          </NavLink>
        </div>
      )}

      <div className="sidebar-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="admin-pill">
          <div className="admin-avatar">{user?.initials || 'U'}</div>
          <div>
            <div className="admin-name">{user?.name || 'User'}</div>
            <div className="admin-role">{user?.role === 'admin' ? 'BrandSparc' : user?.role === 'lead' ? 'Batch Lead' : 'Intern'}</div>
          </div>
        </div>
        <button onClick={logout} className="logout-btn" title="Logout">
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
