// PagoExitoso.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { PedidoService } from '../../services/PedidoService';


export default function PagoExitoso() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pedidoId, setPedidoId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userEmail = localStorage.getItem('userEmail');
    setEmail(userEmail || '');

    // Obtener carrito
    const cartRaw = localStorage.getItem("cart");
    const cart = cartRaw ? JSON.parse(cartRaw) : [];

    // Dirección guardada en el checkout (si la tienes)
    const direccion = localStorage.getItem("direccionEntrega") || "Sin dirección";

    const crearPedido = async () => {
      try {
        if (!token || cart.length === 0) return;

        const pedido = {
          direccionEntrega: direccion,
          envio: 3000,
          descuento: 0,
          items: cart.map(item => ({
            productoId: item.id,
            cantidad: item.cantidad,
            precioUnitario: item.precio
          }))
        };

        const response = await PedidoService.crearPedido(pedido, token);

        setPedidoId(response.id || response.pedidoId); // depende de tu DTO
        localStorage.setItem('ultimoPedido', response.id);

        // Limpiar carrito
        localStorage.removeItem("cart");

      } catch (error) {
        console.error("Error al registrar el pedido:", error);
      }
    };

    crearPedido();
  }, [location]);


  return (
    <div className="container py-5">
      <div className="text-center py-5">
        <div className="mb-4">
          <div className="success-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{ width: '100px', height: '100px' }}>
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" stroke="#4CAF50" strokeWidth="2" />
              <path className="checkmark__check" fill="none" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeMiterlimit="10" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        </div>

        <h1 className="display-5 fw-bold mb-3" style={{ color: 'var(--choco)' }}>
          ¡Pago Exitoso! 🎉
        </h1>

        <p className="lead mb-4">
          Tu pedido ha sido procesado correctamente
        </p>

        {pedidoId && (
          <div className="alert alert-success mb-4 mx-auto" style={{ maxWidth: '500px' }}>
            <div className="d-flex align-items-center">
              <i className="bi bi-receipt fs-4 me-3"></i>
              <div>
                <strong>Número de pedido:</strong> #{pedidoId}<br />
                <small className="text-muted">Guarda este número para consultar el estado de tu pedido</small>
              </div>
            </div>
          </div>
        )}

        <div className="card border-0 shadow-sm mb-5 mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h5 className="card-title mb-3">Próximos pasos:</h5>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker bg-success"></div>
                <div className="timeline-content">
                  <h6>Pago confirmado</h6>
                  <p className="text-muted small mb-0">Tu pago ha sido verificado</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h6>Preparando tu pedido</h6>
                  <p className="text-muted small mb-0">Nuestros chefs están trabajando en tu orden</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h6>Despacho</h6>
                  <p className="text-muted small mb-0">Tu pedido será despachado en las próximas 24 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {email && (
          <div className="alert alert-info mb-4 mx-auto" style={{ maxWidth: '500px' }}>
            <i className="bi bi-envelope me-2"></i>
            Hemos enviado la confirmación a <strong>{email}</strong>
          </div>
        )}

        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
          <Link to="/perfil?tab=pedidos" className="btn btn-accent px-4 py-3">
            <i className="bi bi-box-seam me-2"></i>
            Ver mis pedidos
          </Link>
          <Link to="/" className="btn btn-outline-accent px-4 py-3">
            <i className="bi bi-house me-2"></i>
            Volver al inicio
          </Link>
          <Link to="/productos" className="btn btn-outline-secondary px-4 py-3">
            <i className="bi bi-bag me-2"></i>
            Seguir comprando
          </Link>
        </div>

        <div className="mt-5">
          <p className="text-muted small">
            ¿Tienes preguntas sobre tu pedido?
            <Link to="/contacto" className="text-decoration-none ms-1" style={{ color: 'var(--accent)' }}>
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
