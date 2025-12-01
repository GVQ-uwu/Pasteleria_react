// services/UserService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Crear una instancia de axios para reutilizar configuración
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth.token.v1');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Si tu backend necesita el email en el header
    const user = JSON.parse(localStorage.getItem('auth.user.v1'));
    if (user && user.email) {
      config.headers['X-User-Email'] = user.email;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const UserService = {
  // Obtener perfil del usuario actual
  getProfile: async () => {
    try {
      const response = await apiClient.get('/usuarios/perfil');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      throw error;
    }
  },

  // Actualizar perfil
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/usuarios/perfil', profileData);
      return response.data;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  },

  // Cambiar contraseña
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.put('/usuarios/cambiar-password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      throw error;
    }
  },

  // Obtener todos los usuarios (solo admin)
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/usuarios');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  },

  // Actualizar usuario por ID (solo admin)
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`/usuarios/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  },

  // Eliminar usuario (solo admin)
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw error;
    }
  }
};