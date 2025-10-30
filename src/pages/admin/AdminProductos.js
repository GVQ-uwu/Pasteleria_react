import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listProductos, deleteProducto } from '../../data/db';

export default function AdminProductos(){
  const [q,setQ] = useState('');
  const prods = listProductos();
  const filtered = useMemo(()=> prods.filter(p=> !q || p.nombre.toLowerCase().includes(q.toLowerCase())), [prods,q]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Productos</h2>
        <Link className="btn btn-accent" to="/admin/productos/nuevo">Nuevo producto</Link>
      </div>
      <input className="form-control mb-2" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="table-responsive bg-white border rounded">
        <table className="table table-hover align-middle mb-0">
          <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString()}</td>
                <td>{p.stock}</td>
                <td className="text-end">
                  <Link to={`/admin/productos/${p.id}`} className="btn btn-sm btn-outline-secondary me-2">Editar</Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>{ if(window.confirm('¿Eliminar producto?')) deleteProducto(p.id); window.location.reload(); }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
