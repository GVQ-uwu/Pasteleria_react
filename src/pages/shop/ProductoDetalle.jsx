import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await ProductService.getProductById(id); // <- ya viene data
        setProducto(data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading) return <div>Cargando...</div>;          // <- antes decía "cargando"
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
}

