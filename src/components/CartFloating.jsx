// CartFloating.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartFloating() {
  const { getCartCount, getCartTotal, setIsCartVisible } = useCart();
  const count = getCartCount();
  
  if (count === 0) return null;

  return (
    <div className="d-none d-lg-block">
      <div 
        className="position-fixed end-0 top-50 translate-middle-y me-4"
        style={{ zIndex: 1030 }}
      >
        <div className="card border-0 shadow-lg" style={{ width: '300px' }}>
          <div className="card-header bg-accent text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                <i className="bi bi-cart3 me-2"></i>
                Tu Carrito
              </h6>
              <span className="badge bg-white text-dark">{count} items</span>
            </div>
          </div>
          
          <div className="card-body p-3">
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span className="fw-bold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Envío:</span>
                <span className={getCartTotal() > 50 ? 'text-success' : ''}>
                  {getCartTotal() > 50 ? 'Gratis' : '$5.00'}
                </span>
              </div>
            </div>
            
            <div className="d-grid gap-2">
              <button 
                className="btn btn-accent btn-sm"
                onClick={() => setIsCartVisible(true)}
              >
                <i className="bi bi-eye me-1"></i>
                Ver carrito
              </button>
              <Link 
                to="/carrito" 
                className="btn btn-outline-accent btn-sm"
              >
                Ir al checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}