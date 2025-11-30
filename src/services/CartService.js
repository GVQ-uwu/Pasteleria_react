import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export const CartService = {
  getCart: () => 
    axios.get(`${API_BASE}/carrito`),

  addToCart: (productId, quantity) => 
    axios.post(`${API_BASE}/carrito/agregar`, { productId, quantity }),

  removeFromCart: (productId) => 
    axios.delete(`${API_BASE}/carrito/eliminar/${productId}`),

  updateCartItem: (productId, quantity) => 
    axios.put(`${API_BASE}/carrito/actualizar`, { productId, quantity }),

  clearCart: () => 
    axios.delete(`${API_BASE}/carrito/limpiar`),
};