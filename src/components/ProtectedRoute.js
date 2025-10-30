import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, admin=false }){
  const { user, isAdmin } = useAuth();
  if(!user) return <Navigate to='/login' replace />;
  if(admin && !isAdmin) return <Navigate to='/' replace />;
  return children;
}
