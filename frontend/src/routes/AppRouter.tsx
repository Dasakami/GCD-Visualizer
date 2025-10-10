import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Calculate } from '../pages/Calculate';
import { History } from '../pages/History';
import { Theory } from '../pages/Theory';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuthStore } from '../store/authStore';

export const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/calculate" replace /> : <Login />}
        />
        <Route
          path="/calculate"
          element={
            <ProtectedRoute>
              <Calculate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/theory"
          element={
            <ProtectedRoute>
              <Theory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
