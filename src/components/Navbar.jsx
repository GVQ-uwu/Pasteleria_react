import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav-links" aria-label="principal">
      <NavLink to="/" className={linkClass} end>Inicio</NavLink>
      <NavLink to="/productos" className={linkClass}>Productos</NavLink>
      <NavLink to="/nosotros" className={linkClass}>Nosotros</NavLink>
      <NavLink to="/contacto" className={linkClass}>Contacto</NavLink>
      <NavLink to="/carrito" className={linkClass}>Carrito</NavLink>
    </nav>

  );
}
