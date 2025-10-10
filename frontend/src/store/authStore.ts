import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (user: User, token: string) => {
    sessionStorage.setItem('access_token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    set({ user, accessToken: token, isAuthenticated: true });
  },

  clearAuth: () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  initializeAuth: () => {
    const token = sessionStorage.getItem('access_token');
    const userStr = sessionStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, accessToken: token, isAuthenticated: true });
      } catch {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user');
      }
    }
  },
}));
