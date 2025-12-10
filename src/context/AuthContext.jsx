import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/AuthService';

const USER_KEY = 'auth.user.v1';
const TOKEN_KEY = 'auth.token.v1';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Persitencia en localStorage
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

  // Al hacer login, guarda el token
  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      const { user, token } = response.data;

      setUser(user);
      setToken(token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);

      return user;
    } catch (error) {
      console.error('🔴 [AuthContext] Error en login:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Log seguro - sin mostrar contraseñas
      console.log('🔵 [AuthContext] Enviando registro:', {
        name: userData.name,
        email: userData.email,
        password: '***', // Ocultar contraseña
        confirmPassword: '***' // Ocultar confirmación
      });

      const response = await AuthService.register(userData);
      console.log('🟢 [AuthContext] Registro exitoso');

      if (user.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }

      const { user: newUser, token: authToken } = response.data;

      setUser(newUser);
      setToken(authToken);
      return newUser;
    } catch (error) {
      console.error('🔴 [AuthContext] Error en registro:', error.response?.status, error.response?.data);

      if (error.response) {
        const message = error.response.data?.message ||
          error.response.data?.error ||
          error.response.data ||
          `Error ${error.response.status}`;
        throw new Error(message);
      } else if (error.request) {
        throw new Error('No se pudo conectar al servidor');
      } else {
        throw new Error(error.message || 'Error desconocido');
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isAdmin = user?.rol === 'ADMIN' || user?.rol === 'TEST';
  const isTest = user?.rol === 'TEST';
  const isClient = user?.rol === 'CLIENTE';
  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      isAdmin,
      isTest,  // ← Nuevo
      isClient, // ← Nuevo
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
