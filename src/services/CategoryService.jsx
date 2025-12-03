// src/services/CategoryService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const CategoryService = {
  getCategories: async () => {
    const response = await apiClient.get('/categorias');
    return response.data;         // ⬅ listado público
  },

  getCategoryById: async (id) => {
    const response = await apiClient.get(`/categorias/${id}`);
    return response.data;         // ⬅ solo lo usarás si tienes vista de detalle
  },
};
