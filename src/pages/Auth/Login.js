import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaLock, FaSignInAlt, FaUserShield } from 'react-icons/fa';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import api from '../../api/axios';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    isAdmin: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ubah port menjadi 8000
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        username,
        password,
      });
      
      // Tambahkan error handling yang lebih baik
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Tambahkan handling error untuk user (misalnya dengan toast/alert)
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-2xl p-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Selamat Datang
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Silakan login untuk melanjutkan
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Toggle Admin/User */}
          <div className="flex justify-center space-x-4 p-2 bg-gray-50 rounded-lg">
            <button
              type="button"
              onClick={() => setCredentials(prev => ({ ...prev, isAdmin: false }))}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                !credentials.isAdmin 
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <FaUser className="mr-2" />
              User
            </button>
            <button
              type="button"
              onClick={() => setCredentials(prev => ({ ...prev, isAdmin: true }))}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                credentials.isAdmin 
                  ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <FaUserShield className="mr-2" />
              Admin
            </button>
          </div>

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="appearance-none relative block w-full px-3 py-3 pl-10 
                    border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="appearance-none relative block w-full px-3 py-3 pl-10
                    border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Ingat saya
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Lupa password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent 
                text-sm font-medium rounded-lg text-white 
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : credentials.isAdmin 
                    ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                transition-all duration-200 ease-in-out transform hover:scale-105`}
            >
              {loading ? (
                <LoadingSpinner size="small" light />
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <FaSignInAlt className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                  </span>
                  Login
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Belum punya akun? Daftar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 