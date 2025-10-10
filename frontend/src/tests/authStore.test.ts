import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../store/authStore';

describe('authStore', () => {
  beforeEach(() => {
    sessionStorage.clear();
    useAuthStore.getState().clearAuth();
  });

  it('initializes with null user and not authenticated', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBe(null);
    expect(state.accessToken).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });

  it('sets auth state correctly', () => {
    const user = { email: 'test@example.com' };
    const token = 'test-token';

    useAuthStore.getState().setAuth(user, token);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
    expect(state.accessToken).toBe(token);
    expect(state.isAuthenticated).toBe(true);
    expect(sessionStorage.getItem('access_token')).toBe(token);
  });

  it('clears auth state correctly', () => {
    const user = { email: 'test@example.com' };
    const token = 'test-token';

    useAuthStore.getState().setAuth(user, token);
    useAuthStore.getState().clearAuth();

    const state = useAuthStore.getState();
    expect(state.user).toBe(null);
    expect(state.accessToken).toBe(null);
    expect(state.isAuthenticated).toBe(false);
    expect(sessionStorage.getItem('access_token')).toBe(null);
  });

  it('initializes auth from sessionStorage', () => {
    const user = { email: 'test@example.com' };
    const token = 'test-token';

    sessionStorage.setItem('access_token', token);
    sessionStorage.setItem('user', JSON.stringify(user));

    useAuthStore.getState().initializeAuth();

    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
    expect(state.accessToken).toBe(token);
    expect(state.isAuthenticated).toBe(true);
  });
});
