import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import InternLayout from './layouts/InternLayout';
import Dashboard from './pages/Dashboard';
import AllInterns from './pages/AllInterns';
import InternProfile from './pages/InternProfile';
import TaskReview from './pages/TaskReview';
import Certificates from './pages/Certificates';
import InternDashboard from './pages/InternDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin / Lead Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'lead']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/interns" element={<AllInterns />} />
              <Route path="/interns/:id" element={<InternProfile />} />
              <Route path="/tasks" element={<TaskReview />} />
              <Route path="/certificates" element={<Certificates />} />
            </Route>
          </Route>

          {/* Intern Routes */}
          <Route element={<ProtectedRoute allowedRoles={['intern']} />}>
            <Route element={<InternLayout />}>
              <Route path="/intern-dashboard" element={<InternDashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
