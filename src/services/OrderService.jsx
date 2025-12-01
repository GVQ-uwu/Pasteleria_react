import api from './api';

const ORDER_API = '/pedidos'; // Ajusta según tu backend

export const OrderService = {
  // Crear nuevo pedido
  createOrder: (orderData) => api.post(ORDER_API, orderData),
  
  // Obtener todos los pedidos
  getOrders: () => api.get(ORDER_API),
  
  // Obtener pedido por ID
  getOrderById: (id) => api.get(`${ORDER_API}/${id}`),
  
  // Actualizar estado del pedido
  updateOrderStatus: (id, status) => api.put(`${ORDER_API}/${id}/estado`, { status }),
  
  // Obtener pedidos del usuario actual
  getUserOrders: () => api.get(`${ORDER_API}/usuario`),
};