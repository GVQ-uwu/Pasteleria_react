import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Ajusta la URL base según tu backend

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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const ProductService = {
  // Obtener todos los productos
  getProducts: async () => {
    const response = await apiClient.get('/productos');
    return response.data;
  },

  // Obtener un producto por ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/productos/${id}`);
    return response.data;
  },

  // Crear un producto (solo admin)
  createProduct: async (productData) => {
    const response = await apiClient.post('/productos', productData);
    return response.data;
  },

  // Actualizar un producto (solo admin)
  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/productos/${id}`, productData);
    return response.data;
  },

  // Eliminar un producto (solo admin)
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/productos/${id}`);
    return response.data;
  },
};