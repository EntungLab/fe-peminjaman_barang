import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { NotificationProvider } from './context/NotificationContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Admin pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagement from './pages/Admin/UserManagement';
import LoanManagement from './pages/Admin/LoanManagement';
import AdminSettings from './pages/Admin/AdminSettings';

// User pages
import UserDashboard from './pages/User/UserDashboard';
import UserProfile from './pages/User/UserProfile';
import UserLoans from './pages/User/UserLoans';

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="loans" element={<LoanManagement />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* User Routes */}
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="loans" element={<UserLoans />} />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={
        <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;