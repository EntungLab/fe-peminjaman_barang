import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBox, FaClipboardList, FaUsers, FaExclamationTriangle } from 'react-icons/fa';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import ErrorMessage from '../../components/Error/ErrorMessage';

function AdminDashboard() {
  const { data: stats, loading, error, execute: fetchStats } = useApi(
    () => axios.get('/api/admin/dashboard/stats')
  );

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <FaBox className="text-2xl text-blue-500 mr-2" />
              <span className="text-lg font-semibold">Products</span>
            </div>
            <div className="text-2xl font-bold">{stats.products}</div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <FaClipboardList className="text-2xl text-green-500 mr-2" />
              <span className="text-lg font-semibold">Orders</span>
            </div>
            <div className="text-2xl font-bold">{stats.orders}</div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <FaUsers className="text-2xl text-yellow-500 mr-2" />
              <span className="text-lg font-semibold">Users</span>
            </div>
            <div className="text-2xl font-bold">{stats.users}</div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-2xl text-red-500 mr-2" />
              <span className="text-lg font-semibold">Issues</span>
            </div>
            <div className="text-2xl font-bold">{stats.issues}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard; 