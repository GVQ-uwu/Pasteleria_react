// PagoFallido.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PagoFallido() {
  return (
    <div className="container py-5">
      <div className="text-center py-5">
        <div className="mb-4">
          <div className="error-animation">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{ width: '100px', height: '100px' }}>
              <circle cx="26" cy="26" r="25" fill="none" stroke="#e74c3c" strokeWidth="2"/>
              <path fill="none" stroke="#e74c3c" strokeWidth="4" strokeLinecap="round" strokeMiterlimit="10" d="M16 16l20 20M36 16L16 36"/>
            </svg>
          </div>
        </div>
        
        <h1 className="display-5 fw-bold mb-3" style={{ color: '#e74c3c' }}>
          Pago Fallido ❌
        </h1>
        
        <p className="lead mb-4">
          Hubo un problema al procesar tu pago
        </p>
        
        <div className="card border-0 shadow-sm mb-5 mx-auto" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <h5 className="card-title mb-3">Posibles causas:</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item border-0">
                <i className="bi bi-x-circle-fill text-danger me-2"></i>
                Fondos insuficientes en tu tarjeta
              </li>
              <li className="list-group-item border-0">
                <i className="bi bi-x-circle-fill text-danger me-2"></i>
                Tarjeta expirada o bloqueada
              </li>
              <li className="list-group-item border-0">
                <i className="bi bi-x-circle-fill text-danger me-2"></i>
                Datos de pago incorrectos
              </li>
              <li className="list-group-item border-0">
                <i className="bi bi-x-circle-fill text-danger me-2"></i>
                Problema temporal con el procesador de pagos
              </li>
            </ul>
          </div>
        </div>
        
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
          <Link to="/checkout" className="btn btn-accent px-4 py-3">
            <i className="bi bi-credit-card me-2"></i>
            Reintentar pago
          </Link>
          <Link to="/carrito" className="btn btn-outline-accent px-4 py-3">
            <i className="bi bi-cart me-2"></i>
            Volver al carrito
          </Link>
          <Link to="/" className="btn btn-outline-secondary px-4 py-3">
            <i className="bi bi-house me-2"></i>
            Volver al inicio
          </Link>
        </div>
        
        <div className="mt-5">
          <div className="alert alert-warning mx-auto" style={{ maxWidth: '600px' }}>
            <div className="d-flex">
              <i className="bi bi-exclamation-triangle fs-4 me-3"></i>
              <div>
                <strong>¿Necesitas ayuda?</strong><br/>
                Si el problema persiste, por favor 
                <Link to="/contacto" className="text-decoration-none ms-1" style={{ color: 'var(--accent)' }}>
                  contáctanos
                </Link>
                {' '}o intenta con otro método de pago.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}