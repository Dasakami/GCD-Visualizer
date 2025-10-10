import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn(),
    register: vi.fn(),
    isLoading: false,
    error: null,
  }),
}));

describe('AuthForm', () => {
  const renderAuthForm = () => {
    return render(
      <BrowserRouter>
        <AuthForm />
      </BrowserRouter>
    );
  };

  it('renders login form by default', () => {
    renderAuthForm();
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('switches to register mode when register tab is clicked', () => {
    renderAuthForm();
    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerButton);
    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderAuthForm();
    const submitButton = screen.getByText('Sign In');
    fireEvent.click(submitButton);

    const emailInput = screen.getByPlaceholderText('you@example.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('••••••••') as HTMLInputElement;

    expect(emailInput.validity.valid).toBe(false);
    expect(passwordInput.validity.valid).toBe(false);
  });

  it('accepts valid email and password input', () => {
    renderAuthForm();
    const emailInput = screen.getByPlaceholderText('you@example.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('••••••••') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});
