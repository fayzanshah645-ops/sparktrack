import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const InternLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app">
      {isSidebarOpen && (
        <div className="mobile-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <Sidebar isInternView={true} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="main">
        <Topbar isInternView={true} onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InternLayout;
