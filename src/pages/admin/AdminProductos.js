<<<<<<< HEAD
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
=======
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listProductos, deleteProducto } from '../../data/db';

export default function AdminProductos(){
  const [q,setQ] = useState('');
  const prods = listProductos();
  const filtered = useMemo(()=> prods.filter(p=> !q || p.nombre.toLowerCase().includes(q.toLowerCase())), [prods,q]);
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Productos</h2>
        <Link className="btn btn-accent" to="/admin/productos/nuevo">Nuevo producto</Link>
      </div>
<<<<<<< HEAD
      <input className="form-control mb-2" placeholder="Buscar..." value={q} onChange={e => setQ(e.target.value)} />
=======
      <input className="form-control mb-2" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728
      <div className="table-responsive bg-white border rounded">
        <table className="table table-hover align-middle mb-0">
          <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
          <tbody>
<<<<<<< HEAD
            {filtered.map(p => (
=======
            {filtered.map(p=>(
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString()}</td>
                <td>{p.stock}</td>
                <td className="text-end">
                  <Link to={`/admin/productos/${p.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
<<<<<<< HEAD
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
=======
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>{ if(window.confirm('¿Eliminar producto?')) deleteProducto(p.id); window.location.reload(); }}>Eliminar</button>
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728
