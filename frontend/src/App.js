
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Registration from './pages/Registration';
import RegistrationSuccess from './pages/RegistrationSuccess';
import Login from './pages/Login';
import Checkpoint from './pages/Checkpoint';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Finish from './pages/Finish';

// Higher-order component for Admin Route protection
const AdminRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem('adminAuth') === 'true';
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Registration />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/finish" element={<Finish />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Athlete Routes (Protected by AuthContext inside component) */}
          <Route path="/checkpoint/:id" element={<Checkpoint />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
