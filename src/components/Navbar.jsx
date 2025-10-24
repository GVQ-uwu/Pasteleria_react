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
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-script">Pastelería Sabores</span>
        </Link>

        <nav className="nav-links" aria-label="principal">
          <NavLink to="/" className={linkClass} end>Inicio</NavLink>
          <NavLink to="/productos" className={linkClass}>Productos</NavLink>
          <NavLink to="/nosotros" className={linkClass}>Nosotros</NavLink>
          <NavLink to="/contacto" className={linkClass}>Contacto</NavLink>
          <NavLink to="/carrito" className={linkClass}>Carrito</NavLink>

          {/* Si no ha iniciado sesión */}
          {!tipo && (
            <NavLink to="/login" className={linkClass}>Login</NavLink>
          )}

          {/* Si es admin, muestra Admin y botón Salir */}
          {tipo === "admin" && (
            <>
              <NavLink to="/acceso-admin" className={linkClass}>Admin</NavLink>
              <button className="btn btn-rosa" onClick={handleLogout}>
                Salir
              </button>
            </>
          )}

          {/* Si es usuario normal, solo botón Salir */}
          {tipo === "usuario" && (
            <button className="btn btn-rosa" onClick={handleLogout}>
              Salir
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
