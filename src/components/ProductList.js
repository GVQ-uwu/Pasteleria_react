import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/ProductService';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getProducts();
      // Asumiendo que la respuesta del backend es un array de productos directamente
      // O si está envuelto en un objeto, por ejemplo: { data: [...] }
      // Ajusta según la estructura de tu respuesta
      setProducts(response.data);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.nombre}</h3>
          <p>{product.descripcion}</p>
          <p>Precio: ${product.precio}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;