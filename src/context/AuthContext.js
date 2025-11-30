import React, { createContext, useContext, useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:8080/api/auth';
const USER_KEY = 'auth.user.v1';
const TOKEN_KEY = 'auth.token.v1';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario y token desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    const savedToken = localStorage.getItem(TOKEN_KEY);
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Guardar en localStorage cuando cambien user o token
  useEffect(() => {
    if (user && token) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [user, token]);

  // Función para hacer peticiones autenticadas
  const authFetch = async (url, options = {}) => {
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Credenciales incorrectas');
      }

      const data = await response.json();
      
      // Actualizar estado con los datos del backend
      setUser(data.user);
      setToken(data.token);

      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error en el registro');
      }

      const data = await response.json();
      
      setUser(data.user);
      setToken(data.token);

      return data.user;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Opcional: llamar a endpoint de logout en el backend si existe
    // await fetch(`${API_BASE_URL}/logout`, { method: 'POST' });
  };

  const isAdmin = user?.rol === 'admin'; // Ajusta según el campo que use tu backend

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      login, 
      register,
      logout, 
      isAdmin,
      loading,
      authFetch // Exportar para usar en otras peticiones autenticadas
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);