import React from 'react';
import { FaUser, FaBox, FaCalendar, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';

function LoanDetailModal({ isOpen, onClose, loan, onStatusChange, loading }) {
  if (!isOpen || !loan) return null;

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-green-600',
      pending: 'text-yellow-600',
      late: 'text-red-600',
      returned: 'text-blue-600',
      rejected: 'text-gray-600'
    };
    return colors[status] || 'text-gray-600';
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Detail Peminjaman
          </h3>
          
          <div className="space-y-6">
            {/* Informasi Peminjam */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <FaUser className="h-5 w-5 text-gray-400 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">Informasi Peminjam</h4>
              </div>
              <div className="ml-7 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Nama:</span> {loan.borrower.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {loan.borrower.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Departemen:</span> {loan.borrower.department}
                </p>
              </div>
            </div>

            {/* Informasi Barang */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <FaBox className="h-5 w-5 text-gray-400 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">Informasi Barang</h4>
              </div>
              <div className="ml-7 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Nama Barang:</span> {loan.item.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Kode:</span> {loan.item.code}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Kategori:</span> {loan.item.category}
                </p>
              </div>
            </div>

            {/* Informasi Waktu */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <FaCalendar className="h-5 w-5 text-gray-400 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">Informasi Waktu</h4>
              </div>
              <div className="ml-7 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Tanggal Pinjam:</span> {loan.borrowDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Tanggal Kembali:</span> {loan.dueDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Durasi:</span> {loan.duration} hari
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <FaClock className="h-5 w-5 text-gray-400 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">Status</h4>
              </div>
              <div className="ml-7">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(loan.status)}`}>
                  {loan.status}
                </span>
              </div>
            </div>

            {/* Catatan */}
            {loan.notes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Catatan</h4>
                <p className="text-sm text-gray-600">{loan.notes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Tutup
            </button>
            
            {loan.status === 'pending' && (
              <>
                <button
                  onClick={() => onStatusChange(loan.id, 'approve')}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  {loading ? (
                    <LoadingSpinner size="small" light />
                  ) : (
                    <>
                      <FaCheckCircle className="mr-2" />
                      Setujui
                    </>
                  )}
                </button>
                <button
                  onClick={() => onStatusChange(loan.id, 'reject')}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  {loading ? (
                    <LoadingSpinner size="small" light />
                  ) : (
                    <>
                      <FaTimesCircle className="mr-2" />
                      Tolak
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanDetailModal; 