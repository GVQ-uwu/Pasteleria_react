import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{display:'flex', gap:'1rem', padding:'1rem', borderBottom:'1px solid #eee'}}>
      <Link to="/">Inicio</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/nosotros">Nosotros</Link>
      <Link to="/carrito">Carrito</Link>
      <Link to="/login">Login</Link>
      <Link to="/acceso-admin">Admin</Link>
      <Link to="/usuarios">Usuarios</Link>
    </nav>
  );
}
