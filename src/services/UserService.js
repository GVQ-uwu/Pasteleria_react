import api from './api';

export const UserService = {
  getUsers: () => api.get('/usuarios'),
  getUserById: (id) => api.get(`/usuarios/${id}`),
  createUser: (data) => api.post('/usuarios', data),
  updateUser: (id, data) => api.put(`/usuarios/${id}`, data),
  deleteUser: (id) => api.delete(`/usuarios/${id}`),
};