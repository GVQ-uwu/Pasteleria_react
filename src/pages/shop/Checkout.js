import React, { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { applyDiscounts } from '../../utils/discounts';
import { addPedido } from '../../data/db';

export default function Checkout(){
  const { user } = useAuth();
  const { items, total, clear } = useCart();
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  if(!user) return <Navigate to="/login" replace />;
  if(items.length===0) return <Navigate to="/carrito" replace />;

  const itemsTotal = total;
  const { total: totalFinal, applied } = useMemo(()=> applyDiscounts({
    email: user?.email,
    fechaNacimiento: user?.fechaNacimiento,
    code,
    itemsTotal
  }), [user, code, itemsTotal]);

  const handlePay = ()=>{
    addPedido({
      userEmail: user.email,
      items,
      totalOriginal: itemsTotal,
      totalFinal,
      descuentos: applied
    });
    clear();
    navigate('/pago-exitoso');
  };

  return (
    <div className="container py-4">
      <h2>Checkout</h2>
      <div className="row g-3">
        <div className="col-md-8">
          <div className="p-3 bg-white border rounded mb-3">
            <h5>Datos de envío</h5>
            <div className="row g-2">
              <div className="col-md-6"><input className="form-control" placeholder="Nombre" defaultValue={user?.nombre||''} /></div>
              <div className="col-md-6"><input className="form-control" placeholder="Email" defaultValue={user?.email||''} /></div>
              <div className="col-12"><input className="form-control" placeholder="Dirección" /></div>
              <div className="col-6"><input className="form-control" placeholder="Ciudad" /></div>
              <div className="col-6"><input className="form-control" placeholder="Fecha de entrega (opcional)" type="date" /></div>
            </div>
          </div>
          <div className="p-3 bg-white border rounded">
            <h5>Descuentos</h5>
            <input className="form-control" placeholder="Código promocional (FELICES50)"
              value={code} onChange={e=>setCode(e.target.value)} />
            <ul className="mt-2">
              {applied.map(a=>(<li key={a.key}>{a.desc}</li>))}
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-white border rounded">
            <h5>Resumen</h5>
            <div className="d-flex justify-content-between"><span>Subtotal</span><strong>${itemsTotal.toLocaleString()}</strong></div>
            <div className="d-flex justify-content-between"><span>Total a pagar</span><strong>${totalFinal.toLocaleString()}</strong></div>
            <div className="mt-3 d-grid">
              <button className="btn btn-accent" onClick={handlePay}>Pagar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
