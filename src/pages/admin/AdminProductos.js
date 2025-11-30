import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';

export default function AdminProductos() {
  const [q, setQ] = useState('');
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await ProductService.getProducts();
      setProds(response.data);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar producto?')) {
      try {
        await ProductService.deleteProduct(id);
        // Recargar la lista después de eliminar
        loadProducts();
      } catch (err) {
        setError('Error al eliminar producto');
        console.error(err);
      }
    }
  };

  const filtered = useMemo(() => prods.filter(p => !q || p.nombre.toLowerCase().includes(q.toLowerCase())), [prods, q]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Productos</h2>
        <Link className="btn btn-accent" to="/admin/productos/nuevo">Nuevo producto</Link>
      </div>
      <input className="form-control mb-2" placeholder="Buscar..." value={q} onChange={e => setQ(e.target.value)} />
      <div className="table-responsive bg-white border rounded">
        <table className="table table-hover align-middle mb-0">
          <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString()}</td>
                <td>{p.stock}</td>
                <td className="text-end">
                  <Link to={`/admin/productos/${p.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}