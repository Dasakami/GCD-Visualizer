import axios from 'axios';

// Используем env переменную или дефолтный URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('🚀 API Client initialized with URL:', API_URL);

// Создаем простой axios instance без сложных interceptors
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 секунд таймаут
});

// Простой interceptor для добавления токена
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Логируем запросы для отладки
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, {
      hasAuth: !!token,
      data: config.data
    });

    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Простой interceptor для обработки ответов
apiClient.interceptors.response.use(
  (response) => {
    console.log(`📥 Response ${response.status} from ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });

    // Если 401 - чистим токен и редирект на логин
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized - clearing auth and redirecting to login');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');
      
      // Редирект только если не на странице логина
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;