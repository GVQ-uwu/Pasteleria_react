import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { CategoryService } from '../../services/CategoryService';
import { useCart } from '../../context/CartContext';

export default function Productos() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [tipo, setTipo] = useState('');
  const [prods, setProds] = useState([]); // array vacío
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { add } = useCart();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  try {
    setLoading(true);
    setError('');

    // Cargar productos
    const productsData = await ProductService.getProducts();
    console.log('[Productos] productsData:', productsData);

    const list = Array.isArray(productsData)
      ? productsData
      : (productsData?.content ?? []);

    setProds(Array.isArray(list) ? list : []);

    // Cargar categorías
    const categoriesData = await CategoryService.getCategories();
    console.log('[Productos] categoriesData:', categoriesData);

    const catsList = Array.isArray(categoriesData)
      ? categoriesData
      : (categoriesData?.content ?? []);

    setCats(Array.isArray(catsList) ? catsList : []);
  } catch (err) {
    console.error('[Productos] error cargando datos:', err);
    setError('Error al cargar productos');
  } finally {
    setLoading(false);
  }
};

  const filtered = useMemo(() => {
    if (!Array.isArray(prods)) return [];

    return prods.filter(p => {
      if (!p) return false;
      if (q && !p.nombre?.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat && String(p.categoriaId) !== String(cat)) return false;
      if (tipo && p.tipo !== tipo) return false;
      return true;
    });
  }, [q, cat, tipo, prods]);

  // ----- ESTADOS ESPECIALES -----
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

  // ----- RENDER NORMAL -----
  return (
    <div className="container py-4">
      <h2>Productos</h2>

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-4">
          <input
            className="form-control"
            placeholder="Buscar..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-4">
          <select
            className="form-select"
            value={cat}
            onChange={e => setCat(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {cats.map(c => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-4">
          <select
            className="form-select"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
          >
            <option value="">Cualquier tipo</option>
            <option value="cuadrada">Torta Cuadrada</option>
            <option value="circular">Torta Circular</option>
            <option value="individual">Individual</option>
            <option value="unit">Unitario</option>
            <option value="personalizada">Personalizada</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="alert alert-info">
          {prods.length === 0
            ? 'No hay productos disponibles.'
            : 'No se encontraron productos con los filtros seleccionados.'}
        </div>
      ) : (
        <div className="row g-3">
          {filtered.map(p => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card card-product h-100 p-2">
                <img
                  src={p.imagenUrl || p.imagen || '/placeholder-image.jpg'}
                  alt={p.nombre}
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={e => { e.target.src = '/placeholder-image.jpg'; }}
                />
                <div className="p-2 pt-3">
                  <h5>{p.nombre || 'Producto sin nombre'}</h5>
                  <div className="d-flex gap-2 align-items-center mb-2">
                    <strong>${(p.precio ?? 0).toLocaleString()}</strong>
                    {p.stock <= 5 ? (
                      <span className="badge bg-danger">Stock crítico</span>
                    ) : (
                      <span className="badge bg-success">Stock OK</span>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-accent"
                      onClick={() => add(p, 1)}
                    >
                      Agregar
                    </button>
                    <Link
                      className="btn btn-sm btn-outline-secondary"
                      to={`/producto/${p.id}`}
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
