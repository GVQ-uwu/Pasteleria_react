import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar(){
  const { user, logout, isAdmin, isTest, isClient } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const count = items.reduce((a,b)=>a+b.qty,0);

  // Función mejorada para logout
  const handleLogout = (e) => {
    if (e) e.preventDefault();
    logout();
    navigate('/');
  };

  // Determinar a dónde debe redirigir el logo
  const getLogoLink = () => {
    if (isAdmin && !isTest) {
      return "/admin"; // Admin puro va al panel admin
    }
    return "/"; // TEST y CLIENTES van al home
  };

  // Determinar si estamos en el panel admin
  const isInAdminPanel = location.pathname.startsWith('/admin');

  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to={getLogoLink()}>
          1000 Sabores
          {isInAdminPanel && <span className="badge bg-danger ms-1">ADMIN</span>}
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Para ADMIN PURO: solo mostrar enlace Admin */}
            {isAdmin && !isTest && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Panel Administrativo
                </NavLink>
              </li>
            )}

            {/* Para TEST: mostrar ambos */}
            {isTest && (
              <>
                {/* Enlaces de cliente */}
                <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
                
                {/* Enlace de admin con badge TEST */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">
                    Admin Panel <span className="badge bg-warning text-dark ms-1">TEST</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Para CLIENTE: mostrar solo enlaces de cliente */}
            {isClient && !isTest && (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
              </>
            )}

            {/* Para usuarios NO autenticados */}
            {!user && (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
              </>
            )}
          </ul>
          
          <ul className="navbar-nav ms-auto">
            {/* Mostrar carrito para CLIENTE y TEST, pero NO para ADMIN puro */}
            {(isClient || isTest) && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/carrito">
                  🛒 Carrito ({count})
                </NavLink>
              </li>
            )}
            
            {user ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  👤 {user.nombre}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text">
                      <small>{user.email}</small>
                      {isAdmin && !isTest && <span className="badge bg-danger ms-2">ADMIN</span>}
                      {isTest && <span className="badge bg-warning text-dark ms-2">TEST</span>}
                      {isClient && !isTest && <span className="badge bg-success ms-2">CLIENTE</span>}
                    </span>
                  </li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><Link className="dropdown-item" to="/mis-pedidos">Mis Pedidos</Link></li>
                  {(isAdmin || isTest) && (
                    <li><Link className="dropdown-item" to="/admin">Panel Administrativo</Link></li>
                  )}
                  <li><hr className="dropdown-divider"/></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Ingresar</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/registro">Registro</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
