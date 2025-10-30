import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Carrito(){
  const { items, total, remove, updateQty, clear } = useCart();

  if(items.length===0){
    return (
      <div className="container py-4">
        <h2>Carrito</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/productos" className="btn btn-accent">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2>Carrito</h2>
      <div className="grid-2">
        <div>
          <ul className="list-group">
            {items.map(it=>(
              <li key={it.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <img src={it.img} alt={it.nombre} style={{width:72, height:72, objectFit:'cover', borderRadius:8}} />
                  <div>
                    <div>{it.nombre}</div>
                    <small className="text-muted">${it.precio.toLocaleString()} c/u</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input type="number" min="1" className="form-control" style={{width:80}} value={it.qty} onChange={e=>updateQty(it.id, parseInt(e.target.value||'1',10))} />
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>remove(it.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="p-3 bg-white border rounded">
            <h5>Resumen</h5>
            <div className="d-flex justify-content-between"><span>Subtotal</span><strong>${total.toLocaleString()}</strong></div>
            <div className="mt-3 d-grid gap-2">
              <Link to="/checkout" className="btn btn-accent">Continuar al pago</Link>
              <button className="btn btn-outline-secondary" onClick={clear}>Vaciar carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
