import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../api/client';

vi.mock('../api/client');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('useAuth hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('initializes with correct default state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    };
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.register).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });

  it('stores token in sessionStorage on successful login', async () => {
    const mockResponse = {
      data: {
        access_token: 'test-token',
        token_type: 'bearer',
      },
    };

    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    const wrapper = ({ children }: { children: ReactNode }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    };
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password',
      });
    });

    expect(sessionStorage.getItem('access_token')).toBe('test-token');
  });

  it('clears storage on logout', () => {
    sessionStorage.setItem('access_token', 'test-token');
    sessionStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));

    const wrapper = ({ children }: { children: ReactNode }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    };
    const { result } = renderHook(() => useAuth(), { wrapper });

    result.current.logout();

    expect(sessionStorage.getItem('access_token')).toBe(null);
    expect(sessionStorage.getItem('user')).toBe(null);
  });
});
