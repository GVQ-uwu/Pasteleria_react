import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

// Configurar axios globalmente
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Interceptor para añadir token automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth.token.v1');
    if (token) {
      // Si el token es mock, no lo envíes (para evitar 403)
      if (token.startsWith('mock-jwt-token-')) {
        // Para endpoints que requieren auth real, fallará
        // Pero al menos no enviaremos tokens inválidos
        console.log('⚠️ Token mock detectado, no se enviará en headers');
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas para manejar errores globalmente
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      console.log('🔴 Token expirado o inválido');
      localStorage.removeItem('auth.user.v1');
      localStorage.removeItem('auth.token.v1');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;