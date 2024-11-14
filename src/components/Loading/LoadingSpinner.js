import React from 'react';

function LoadingSpinner({ size = 'medium', light = false }) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`
        ${sizeClasses[size]}
        animate-spin rounded-full
        border-2 border-gray-200
        ${light ? 'border-t-white' : 'border-t-blue-500'}
      `}></div>
    </div>
  );
}

export default LoadingSpinner; 