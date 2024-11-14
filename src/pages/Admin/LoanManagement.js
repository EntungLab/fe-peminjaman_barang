import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter, FaEye, FaCheck, FaTimes, FaFileExport } from 'react-icons/fa';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import LoanDetailModal from './LoanDetailModal';
import { exportToExcel } from '../../utils/excelExport';
import AdvancedFilter from '../../components/Filter/AdvancedFilter';

function LoanManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(null);

  const { data: loans, loading, error, execute: fetchLoans } = useApi(
    () => axios.get('/api/admin/loans', { 
      params: { search, status: filter } 
    })
  );

  const { loading: actionLoading, execute: executeLoanAction } = useApi(
    (id, action) => axios.post(`/api/admin/loans/${id}/${action}`)
  );

  useEffect(() => {
    fetchLoans();
  }, [search, filter]);

  const handleStatusChange = async (loanId, action) => {
    try {
      await executeLoanAction(loanId, action);
      fetchLoans();
    } catch (error) {
      console.error('Error updating loan status:', error);
    }
  };

  const handleExport = () => {
    if (!loans) return;

    const exportData = loans.map(loan => ({
      'Nama Peminjam': loan.borrower.name,
      'Email': loan.borrower.email,
      'Departemen': loan.borrower.department,
      'Barang': loan.item.name,
      'Kode Barang': loan.item.code,
      'Tanggal Pinjam': loan.borrowDate,
      'Tanggal Kembali': loan.dueDate,
      'Status': loan.status,
      'Catatan': loan.notes || '-'
    }));

    exportToExcel(exportData, `loan-report-${new Date().toISOString().split('T')[0]}`);
  };

  const handleAdvancedFilter = (filters) => {
    setAdvancedFilters(filters);
    // Implementasi filter di sini
    fetchLoans({
      ...filters,
      search
    });
  };

  const resetFilters = () => {
    setAdvancedFilters(null);
    setSearch('');
    fetchLoans();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manajemen Peminjaman
        </h2>
        <div className="flex gap-2">
          <AdvancedFilter 
            onFilter={handleAdvancedFilter}
            onReset={resetFilters}
          />
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <FaFileExport />
            Export Excel
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <input
            type="search"
            placeholder="Cari peminjam atau barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Active Filters */}
      {advancedFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(advancedFilters).map(([key, value]) => {
            if (!value || (typeof value === 'object' && !value.start && !value.end)) return null;
            
            return (
              <div key={key} className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <span>{key}: {typeof value === 'object' ? `${value.start} - ${value.end}` : value.toString()}</span>
                <button
                  onClick={() => {
                    const newFilters = { ...advancedFilters };
                    delete newFilters[key];
                    handleAdvancedFilter(newFilters);
                  }}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            );
          })}
          <button
            onClick={resetFilters}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Reset semua filter
          </button>
        </div>
      )}

      {/* Tabel Peminjaman */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peminjam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Pinjam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenggat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loans?.map((loan) => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">
                            {loan.borrower.name[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {loan.borrower.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {loan.borrower.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{loan.item.name}</div>
                    <div className="text-sm text-gray-500">{loan.item.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.borrowDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${loan.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      ${loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${loan.status === 'late' ? 'bg-red-100 text-red-800' : ''}
                      ${loan.status === 'returned' ? 'bg-blue-100 text-blue-800' : ''}
                      ${loan.status === 'rejected' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedLoan(loan);
                          setShowDetailModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye className="h-5 w-5" />
                      </button>
                      {loan.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(loan.id, 'approve')}
                            className="text-green-600 hover:text-green-900"
                            disabled={actionLoading}
                          >
                            <FaCheck className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(loan.id, 'reject')}
                            className="text-red-600 hover:text-red-900"
                            disabled={actionLoading}
                          >
                            <FaTimes className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
                <span className="font-medium">97</span> results
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
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <LoanDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        loan={selectedLoan}
        onStatusChange={handleStatusChange}
        loading={actionLoading}
      />
    </div>
  );
}

export default LoanManagement; 