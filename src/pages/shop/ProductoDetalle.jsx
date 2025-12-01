<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService'; // Asegúrate de importar

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        // CORRECCIÓN: Usa ProductService en lugar de getProducto
        const res = await ProductService.getProductById(id);
        setProducto(res.data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (cargando) return <div>Cargando...</div>;
  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="producto-detalle">
      <img 
        src={`http://localhost:3000/uploads/${producto.imagen}`} 
        alt={producto.nombre} 
      />
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Categoría: {producto.categoria}</p>
    </div>
  );
};
=======
import React from 'react';
import { useParams } from 'react-router-dom';
import { getProducto } from '../../data/db';
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
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728
