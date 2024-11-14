import { useState, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

export function useApi(apiFunc, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const {
    successMessage,
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
  } = options;

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunc(...args);
      setData(result);
      if (showSuccessToast && successMessage) {
        showToast(successMessage, 'success');
      }
      return result;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || errorMessage || 'Terjadi kesalahan';
      setError(errorMsg);
      if (showErrorToast) {
        showToast(errorMsg, 'error');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunc, successMessage, errorMessage, showSuccessToast, showErrorToast, showToast]);

  return {
    data,
    loading,
    error,
    execute,
    setData,
    setError,
  };
} 