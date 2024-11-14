import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
  // Atur lebar kolom
  const wscols = [
    {wch: 20}, // Nama Peminjam
    {wch: 25}, // Email
    {wch: 20}, // Barang
    {wch: 15}, // Kode Barang
    {wch: 15}, // Tanggal Pinjam
    {wch: 15}, // Tanggal Kembali
    {wch: 12}, // Status
  ];
  worksheet['!cols'] = wscols;

  // Export file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}; 