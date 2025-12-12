import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

type AuthMode = 'login' | 'register';

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submit:', { mode, email, passwordLength: password.length });

    try {
      if (mode === 'login') {
        console.log('Attempting login...');
        await login({ email, password });
        console.log('Login successful!');
      } else {
        console.log('Attempting register...');
        await register({ email, password });
        console.log('Register successful!');
      }
    } catch (err) {
      console.error('Auth error:', err);
      // Error is handled in the hook
    }
  };

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 shadow-2xl"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400">
            {mode === 'login'
              ? 'Sign in to continue your GCD journey'
              : 'Start visualizing algorithms today'}
          </p>
        </div>

        <div className="flex space-x-2 mb-6 bg-slate-800/50 rounded-lg p-1">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              console.log('Switched to login mode');
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              mode === 'login'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              console.log('Switched to register mode');
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              mode === 'register'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Электронная почта
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Пароль
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Обработка...</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </motion.button>
        </form>

        {/* Отладочная информация */}
        {import.meta.env.DEV && (
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-400">
            <div>Mode: {mode}</div>
            <div>Email: {email || '(empty)'}</div>
            <div>Password length: {password.length}</div>
            <div>API URL: {import.meta.env.VITE_API_URL || 'http://localhost:8000'}</div>
          </div>
        )}
      </motion.div>
    </div>
  );
};