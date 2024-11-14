import React, { useState } from 'react';

function LoanForm() {
  const [formData, setFormData] = useState({
    peminjam: '',
    barang: '',
    tanggalPinjam: '',
    tanggalKembali: '',
    keterangan: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Form Peminjaman</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Peminjam
              </label>
              <input
                type="text"
                value={formData.peminjam}
                onChange={(e) => setFormData({...formData, peminjam: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barang
              </label>
              <select
                value={formData.barang}
                onChange={(e) => setFormData({...formData, barang: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih Barang</option>
                <option value="1">Laptop ASUS</option>
                <option value="2">Proyektor</option>
                <option value="3">Kamera</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Pinjam
              </label>
              <input
                type="date"
                value={formData.tanggalPinjam}
                onChange={(e) => setFormData({...formData, tanggalPinjam: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Kembali
              </label>
              <input
                type="date"
                value={formData.tanggalKembali}
                onChange={(e) => setFormData({...formData, tanggalKembali: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keterangan
              </label>
              <textarea
                value={formData.keterangan}
                onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoanForm; 