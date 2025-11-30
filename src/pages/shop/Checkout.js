import React, { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { applyDiscounts } from '../../utils/discounts';
import { OrderService } from '../../services/OrderService';

export default function Checkout(){
  const { user } = useAuth();
  const { items, getTotalPrice, clearCart } = useCart();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Calcular total desde el carrito
  const itemsTotal = getTotalPrice ? getTotalPrice() : items.reduce((sum, item) => sum + (item.precio * (item.cantidad || item.qty || 1)), 0);
  
  if(!user) return <Navigate to="/login" replace />;
  if(items.length === 0) return <Navigate to="/carrito" replace />;

  const { total: totalFinal, applied } = useMemo(() => applyDiscounts({
    email: user?.email,
    fechaNacimiento: user?.fechaNacimiento,
    code,
    itemsTotal
  }), [user, code, itemsTotal]);

  const handlePay = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Crear el pedido en el backend
      await OrderService.createOrder({
        userEmail: user.email,
        items: items.map(item => ({
          productId: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad || item.qty || 1,
          img: item.img
        })),
        totalOriginal: itemsTotal,
        totalFinal,
        descuentos: applied,
        direccionEnvio: "Dirección por definir", // Puedes agregar un form para esto
        estado: 'pendiente'
      });
      
      // Limpiar carrito después del pago exitoso
      clearCart();
      navigate('/pago-exitoso');
    } catch (err) {
      setError('Error al procesar el pago. Por favor, intenta nuevamente.');
      console.error('Error creating order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2>Checkout</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-8">
          <div className="p-3 bg-white border rounded mb-3">
            <h5>Datos de envío</h5>
            <div className="row g-2">
              <div className="col-md-6">
                <input className="form-control" placeholder="Nombre" defaultValue={user?.nombre||''} />
              </div>
              <div className="col-md-6">
                <input className="form-control" placeholder="Email" defaultValue={user?.email||''} />
              </div>
              <div className="col-12">
                <input className="form-control" placeholder="Dirección" />
              </div>
              <div className="col-6">
                <input className="form-control" placeholder="Ciudad" />
              </div>
              <div className="col-6">
                <input className="form-control" placeholder="Fecha de entrega (opcional)" type="date" />
              </div>
            </div>
          </div>
          <div className="p-3 bg-white border rounded">
            <h5>Descuentos</h5>
            <input 
              className="form-control" 
              placeholder="Código promocional (FELICES50)"
              value={code} 
              onChange={e => setCode(e.target.value)} 
            />
            <ul className="mt-2">
              {applied.map(a => (
                <li key={a.key}>{a.desc}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-white border rounded">
            <h5>Resumen</h5>
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>${itemsTotal.toLocaleString()}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>Total a pagar</span>
              <strong>${totalFinal.toLocaleString()}</strong>
            </div>
            <div className="mt-3 d-grid">
              <button 
                className="btn btn-accent" 
                onClick={handlePay}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Pagar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}