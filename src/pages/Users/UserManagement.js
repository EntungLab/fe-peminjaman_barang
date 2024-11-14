import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaKey } from 'react-icons/fa';
import UserModal from './UserModal';
import ResetPasswordModal from './ResetPasswordModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { userService } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import ErrorMessage from '../../components/Error/ErrorMessage';

function UserManagement() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserForAction, setSelectedUserForAction] = useState(null);
  const { showToast } = useToast();

  // API hooks
  const {
    data: users,
    loading: loadingUsers,
    error: usersError,
    execute: fetchUsers
  } = useApi(userService.getUsers, {
    errorMessage: 'Gagal memuat data pengguna'
  });

  const {
    loading: actionLoading,
    execute: executeAction
  } = useApi(null, {
    showSuccessToast: true,
    showErrorToast: true
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleResetPassword = (user) => {
    setSelectedUserForAction(user);
    setShowResetModal(true);
  };

  const handleDeleteUser = async (id) => {
    await executeAction(async () => {
      await userService.deleteUser(id);
      await fetchUsers();
      return 'Pengguna berhasil dihapus';
    });
  };

  const confirmDelete = async () => {
    try {
      // API call untuk delete user
      console.log('Deleting user:', selectedUserForAction.id);
      setShowDeleteModal(false);
      // Refresh user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreateUser = async (userData) => {
    await executeAction(async () => {
      await userService.createUser(userData);
      await fetchUsers();
      return 'Pengguna berhasil ditambahkan';
    });
  };

  const handleUpdateUser = async (id, userData) => {
    await executeAction(async () => {
      await userService.updateUser(id, userData);
      await fetchUsers();
      return 'Data pengguna berhasil diperbarui';
    });
  };

  const handleResetPasswordSubmit = async (id, passwordData) => {
    try {
      await userService.resetPassword(id, passwordData);
      showToast('Password berhasil direset', 'success');
    } catch (err) {
      showToast('Gagal mereset password', 'error');
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await userService.deleteUser(id);
      showToast('Pengguna berhasil dihapus', 'success');
      fetchUsers();
    } catch (err) {
      showToast('Gagal menghapus pengguna', 'error');
    }
  };

  // Loading states
  if (loadingUsers) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (usersError) {
    return (
      <div className="p-6">
        <ErrorMessage 
          message={usersError}
          onRetry={fetchUsers}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manajemen Pengguna</h2>
        <button
          onClick={() => setSelectedUser(null)}
          disabled={actionLoading}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            ${actionLoading 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'}
          `}
        >
          {actionLoading ? (
            <>
              <LoadingSpinner size="small" light />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <FaUserPlus />
              <span>Tambah Pengguna</span>
            </>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <input
            type="search"
            placeholder="Cari pengguna..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pengguna
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Terakhir Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample User Row */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">JD</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">John Doe</div>
                    <div className="text-sm text-gray-500">john@example.com</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Admin
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Aktif
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2024-02-20 14:30
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEditUser({
                      id: 1,
                      name: 'John Doe',
                      email: 'john@example.com',
                      role: 'admin'
                    })}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaEdit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleResetPassword({
                      id: 1,
                      name: 'John Doe',
                      email: 'john@example.com',
                      role: 'admin'
                    })}
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    <FaKey className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser({
                      id: 1,
                      name: 'John Doe',
                      email: 'john@example.com',
                      role: 'admin'
                    })}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">20</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      <UserModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        userData={selectedUser}
        isLoading={actionLoading}
      />
      
      <ResetPasswordModal 
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        userId={selectedUserForAction?.id}
        userName={selectedUserForAction?.name}
      />
      
      <DeleteConfirmModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        userName={selectedUserForAction?.name}
        isLoading={actionLoading}
      />

      {/* Loading overlay saat ada aksi */}
      {actionLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-gray-600">Memproses...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement; 