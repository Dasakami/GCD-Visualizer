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
    console.log('authStore.setAuth called:', { user, tokenLength: token.length });
    
    try {
      sessionStorage.setItem('access_token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      
      console.log('Saved to sessionStorage:', {
        access_token: sessionStorage.getItem('access_token')?.substring(0, 20) + '...',
        user: sessionStorage.getItem('user')
      });
      
      set({ user, accessToken: token, isAuthenticated: true });
      console.log('Auth state updated in store');
    } catch (err) {
      console.error('Error saving to sessionStorage:', err);
    }
  },

  clearAuth: () => {
    console.log('authStore.clearAuth called');
    
    try {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');
      console.log('Cleared sessionStorage');
      
      set({ user: null, accessToken: null, isAuthenticated: false });
      console.log('Auth state cleared in store');
    } catch (err) {
      console.error('Error clearing sessionStorage:', err);
    }
  },

  initializeAuth: () => {
    console.log('authStore.initializeAuth called');
    
    try {
      const token = sessionStorage.getItem('access_token');
      const userStr = sessionStorage.getItem('user');

      console.log('Found in sessionStorage:', {
        hasToken: !!token,
        hasUser: !!userStr,
        tokenPreview: token?.substring(0, 20) + '...',
        userStr
      });

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          console.log('Parsed user:', user);
          
          set({ user, accessToken: token, isAuthenticated: true });
          console.log('Auth initialized from sessionStorage');
        } catch (parseErr) {
          console.error('Error parsing user from sessionStorage:', parseErr);
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('user');
        }
      } else {
        console.log('No auth data in sessionStorage');
      }
    } catch (err) {
      console.error('Error initializing auth:', err);
    }
  },
}));