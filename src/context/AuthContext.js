import React, { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'auth.user.v1';
const AuthContext = createContext();

export function AuthProvider({children}){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const raw = localStorage.getItem(KEY);
    if(raw) setUser(JSON.parse(raw));
  },[]);

  useEffect(()=>{
    if(user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  },[user]);

  const login = (payload)=>{ setUser(payload); };
  const logout = ()=> setUser(null);

  const isAdmin = !!(user?.email && user.email.toLowerCase().endsWith('@admin'));

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=> useContext(AuthContext);
