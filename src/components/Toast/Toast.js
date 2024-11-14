import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const icons = {
  success: <FaCheckCircle className="h-5 w-5 text-green-500" />,
  error: <FaExclamationCircle className="h-5 w-5 text-red-500" />,
  info: <FaInfoCircle className="h-5 w-5 text-blue-500" />
};

function Toast({ message, type = 'info', onClose }) {
  return (
    <div className="fixed bottom-5 right-5 flex items-center bg-white px-4 py-3 rounded-lg shadow-lg border-l-4 border-blue-500 animate-slide-in">
      <div className="mr-3">
        {icons[type]}
      </div>
      <div className="text-sm text-gray-800">{message}</div>
      <button 
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  );
}

export default Toast; 