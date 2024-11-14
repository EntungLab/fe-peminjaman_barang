import React from 'react';
import { FaExclamationCircle, FaRedoAlt } from 'react-icons/fa';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg">
      <FaExclamationCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-red-800 mb-2">
        Terjadi Kesalahan
      </h3>
      <p className="text-red-600 text-center mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <FaRedoAlt />
          Coba Lagi
        </button>
      )}
    </div>
  );
}

export default ErrorMessage; 