import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell
} from 'react-icons/fa';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/admin/inventory', icon: FaBox, label: 'Inventaris' },
    { path: '/admin/users', icon: FaUsers, label: 'Pengguna' },
    { path: '/admin/loans', icon: FaClipboardList, label: 'Peminjaman' },
    { path: '/admin/settings', icon: FaCog, label: 'Pengaturan' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-primary-700 to-primary-900
        transition-transform duration-300 ease-in-out transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="flex items-center justify-between h-16 px-6 bg-primary-800">
          <Link to="/admin/dashboard" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white hover:text-gray-200"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200
                ${location.pathname === item.path
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-primary-600 hover:text-white'
                }
              `}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <FaBars className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <FaBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  3
                </span>
              </button>

              <div className="flex items-center">
                <img
                  src={user?.avatar || 'https://via.placeholder.com/40'}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button
                  onClick={logout}
                  className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  title="Logout"
                >
                  <FaSignOutAlt className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout; 