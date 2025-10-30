import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar(){
  const { user, logout, isAdmin } = useAuth();
  const { items } = useCart();
  const count = items.reduce((a,b)=>a+b.qty,0);

  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">1000 Sabores</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Admin <span className="admin-chip">beta</span></NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrito">Carrito ({count})</NavLink>
            </li>
            {user ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.nombre}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><span className="dropdown-item-text">{user.email}{isAdmin && ' · admin'}</span></li>
                  <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><button className="dropdown-item" onClick={logout}>Salir</button></li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Ingresar</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/registro">Registro</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
