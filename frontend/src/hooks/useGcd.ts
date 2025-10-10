import { useState } from 'react';
import apiClient from '../api/client';
import { GcdResult, GcdCalculateRequest, HistoryItem } from '../types';

interface UseGcdReturn {
  calculate: (request: GcdCalculateRequest) => Promise<GcdResult>;
  getHistory: () => Promise<HistoryItem[]>;
  getHistoryItem: (id: string) => Promise<HistoryItem>;
  deleteHistoryItem: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useGcd = (): UseGcdReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async (request: GcdCalculateRequest): Promise<GcdResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<GcdResult>(
        '/gcd/calculate',
        request
      );
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || 'Ошибка в расчетах. Пожалуйста, попробуйте снова.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getHistory = async (): Promise<HistoryItem[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<HistoryItem[]>('/gcd/history');
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || 'Не удалось получить историю.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getHistoryItem = async (id: string): Promise<HistoryItem> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<HistoryItem>(`/gcd/history/${id}`);
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || 'Не удалось извлечь элемент истории.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryItem = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.delete(`/gcd/history/${id}`);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || 'Не удалось удалить элемент истории.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    calculate,
    getHistory,
    getHistoryItem,
    deleteHistoryItem,
    isLoading,
    error,
  };
};
