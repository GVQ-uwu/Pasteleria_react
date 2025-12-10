// src/services/CategoryService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para agregar el token JWT a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth.token.v1');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const CategoryService = {
  getCategories: async () => {
    const response = await apiClient.get('/categorias');
    return response.data;         // ⬅ listado público
  },

  getCategoryById: async (id) => {
    const response = await apiClient.get(`/categorias/${id}`);
    return response.data;         // ⬅ solo lo usarás si tienes vista de detalle
  },

  // ✅ NUEVOS MÉTODOS AGREGADOS
  createCategory: async (categoryData) => {
    const response = await apiClient.post('/categorias', categoryData);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await apiClient.put(`/categorias/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await apiClient.delete(`/categorias/${id}`);
    return response.data;
  }
};