import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for quick mock login persist
    const storedUser = localStorage.getItem('uit-tracker-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    let mockUser = null;
    if (email === 'admin@brandsparc.com') {
      mockUser = { id: 1, name: 'Admin', role: 'admin', initials: 'AD', stage: null };
    } else if (email === 'lead@brandsparc.com') {
      mockUser = { id: 2, name: 'Batch Lead', role: 'lead', initials: 'BL', stage: null };
    } else if (email === 'intern@brandsparc.com') {
      mockUser = { id: 3, name: 'Rayan Ahmad', role: 'intern', initials: 'RA', stage: 3, streak: 18, attendance: 96 };
    } else {
      // default mock as intern for ease of testing
      mockUser = { id: 4, name: 'Test Intern', role: 'intern', initials: 'TI', stage: 1, streak: 2, attendance: 60 };
    }
    
    setUser(mockUser);
    localStorage.setItem('uit-tracker-user', JSON.stringify(mockUser));
    
    if (['admin', 'lead'].includes(mockUser.role)) {
      navigate('/');
    } else {
      navigate('/intern-dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('uit-tracker-user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
