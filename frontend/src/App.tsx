import { useEffect } from 'react';
import { AppRouter } from './routes/AppRouter';
import { useAuthStore } from './store/authStore';
import { useUiStore } from './store/uiStore';

function App() {
  const { initializeAuth } = useAuthStore();
  const { theme } = useUiStore();

  useEffect(() => {
    initializeAuth();
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [initializeAuth, theme]);

  return <AppRouter />;
}

export default App;
