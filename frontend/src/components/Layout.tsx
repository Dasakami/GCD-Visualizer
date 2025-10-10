import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, History, BookOpen, User, LogOut, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { theme, toggleTheme } = useUiStore();
  const { logout } = useAuth();

  const navItems = [
    { path: '/calculate', label: 'Калькулятор', icon: Calculator },
    { path: '/history', label: 'История', icon: History },
    { path: '/theory', label: 'Теория', icon: BookOpen },
    { path: '/profile', label: 'Профиль', icon: User },
  ];

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center"
              >
                <Calculator className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                НОД Визуализатор
              </span>
            </Link>

            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm font-medium">
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-all ml-2"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
};
