import axiosInstance from './axiosConfig';

export const AuthService = {
  login: (email, password) => 
    axiosInstance.post('/auth/login', { email, password }),

  register: (userData) => 
    axiosInstance.post('/auth/register', userData),

  logout: () => 
    axiosInstance.post('/auth/logout'),
};