import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { useCart } from '../../context/CartContext';

export default function ProductoDetalle(){
  const { id } = useParams();
  const prod = getProducto(id);
  const { add } = useCart();
  if(!prod) return <div className="container py-4"><p>Producto no encontrado.</p></div>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={prod.img} alt={prod.nombre} style={{width:'100%', borderRadius:'12px'}} />
        </div>
        <div className="col-md-6">
          <h2>{prod.nombre}</h2>
          <p>{prod.desc}</p>
          <p><strong>${prod.precio.toLocaleString()}</strong></p>
          <button className="btn btn-accent" onClick={()=>add(prod,1)}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}
