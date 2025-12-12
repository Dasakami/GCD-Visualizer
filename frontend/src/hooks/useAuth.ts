import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuthStore } from '../store/authStore';
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../types';

interface UseAuthReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setAuth, clearAuth } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<AuthResponse>(
        '/auth/login',
        credentials
      );

      const { access_token } = response.data;
      const user: User = { email: credentials.email };

      setAuth(user, access_token);
      navigate('/calculate');
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage =
        err.response?.data?.detail || 'Ошибка входа. Пожалуйста, попробуйте снова.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Теперь API /auth/register возвращает токен напрямую
      const response = await apiClient.post<AuthResponse>(
        '/auth/register',
        credentials
      );

      const { access_token } = response.data;
      const user: User = { email: credentials.email };

      setAuth(user, access_token);
      navigate('/calculate');
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMessage =
        err.response?.data?.detail || 'Регистрация не удалась. Пожалуйста, попробуйте снова.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
};