import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { CategoryService } from '../../services/CategoryService';
import { useCart } from '../../context/CartContext';

export default function Productos(){
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [tipo, setTipo] = useState('');
  const [prods, setProds] = useState([]); // ← Inicializar como array vacío
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { add } = useCart();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Cargar productos
      const productsResponse = await ProductService.getProducts();
      console.log('Productos cargados:', productsResponse); // Para debug
      
      // Asegurarnos de que sea un array
      setProds(Array.isArray(productsResponse.data) ? productsResponse.data : []);
      
      // Cargar categorías
      const categoriesResponse = await CategoryService.getCategories();
      setCats(Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []);
    } catch (err) {
      setError('Error al cargar productos');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    // Asegurarse de que prods sea un array antes de filtrar
    if (!Array.isArray(prods)) return [];
    return prods.filter(p => {
      if (!p) return false; // Filtrar elementos null/undefined
      if (q && !p.nombre?.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat && p.categoriaId !== cat) return false;
      if (tipo && p.tipo !== tipo) return false;
      return true;
    });
  }, [q, cat, tipo, prods]);

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={loadData}>
          Reintentar
        </button>
      </div>
    );
  }
}