import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/AuthService';

const USER_KEY = 'auth.user.v1';
const TOKEN_KEY = 'auth.token.v1';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    const savedToken = localStorage.getItem(TOKEN_KEY);
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [user, token]);

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      const { user: userData, token: authToken } = response.data;
      
      setUser(userData);
      setToken(authToken);
      return userData;
    } catch (error) {
      throw new Error(error.response?.data || 'Error en el login');
    }
  };

  const register = async (userData) => {
    try {
      const response = await AuthService.register(userData);
      const { user: userData, token: authToken } = response.data;
      
      setUser(userData);
      setToken(authToken);
      return userData;
    } catch (error) {
      throw new Error(error.response?.data || 'Error en el registro');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Opcional: llamar al servicio de logout
    // AuthService.logout();
  };

  const isAdmin = user?.rol === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      login, 
      register,
      logout, 
      isAdmin,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);