import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const tipo = localStorage.getItem("tipoUsuario"); // admin o usuario

  const handleLogout = () => {
    localStorage.removeItem("tipoUsuario");
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

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
