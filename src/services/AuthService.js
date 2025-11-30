import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/auth';

export const AuthService = {
  login: (email, password) => 
    axios.post(`${API_BASE}/login`, { email, password }),

  register: (userData) => 
    axios.post(`${API_BASE}/register`, userData),

  logout: () => 
    axios.post(`${API_BASE}/logout`),
};