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
    console.log('useAuth.login called with:', { email: credentials.email });
    setIsLoading(true);
    setError(null);

    try {
      console.log('Making POST request to /auth/login...');
      const response = await apiClient.post<AuthResponse>(
        '/auth/login',
        credentials
      );

      console.log('Login response:', response.data);

      const { access_token } = response.data;
      
      if (!access_token) {
        throw new Error('No access token in response');
      }

      const user: User = { email: credentials.email };

      console.log('Saving auth to store and sessionStorage...');
      setAuth(user, access_token);
      
      console.log('Navigating to /calculate...');
      navigate('/calculate');
      console.log('Login complete!');
    } catch (err: any) {
      console.error('Login error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      const errorMessage =
        err.response?.data?.detail || 
        err.message ||
        'Ошибка входа. Пожалуйста, попробуйте снова.';
      
      console.error('Setting error message:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    console.log('useAuth.register called with:', { email: credentials.email });
    setIsLoading(true);
    setError(null);

    try {
      console.log('Making POST request to /auth/register...');
      const response = await apiClient.post<AuthResponse>(
        '/auth/register',
        credentials
      );

      console.log('Register response:', response.data);

      const { access_token } = response.data;
      
      if (!access_token) {
        throw new Error('No access token in response');
      }

      const user: User = { email: credentials.email };

      console.log('Saving auth to store and sessionStorage...');
      setAuth(user, access_token);
      
      console.log('Navigating to /calculate...');
      navigate('/calculate');
      console.log('Registration complete!');
    } catch (err: any) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      const errorMessage =
        err.response?.data?.detail || 
        err.message ||
        'Регистрация не удалась. Пожалуйста, попробуйте снова.';
      
      console.error('Setting error message:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('useAuth.logout called');
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