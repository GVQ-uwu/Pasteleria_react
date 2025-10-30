import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listProductos, listCategorias } from '../../data/db';
import { useCart } from '../../context/CartContext';


export default function Productos(){
  const [q,setQ] = useState('');
  const [cat,setCat] = useState('');
  const [tipo,setTipo] = useState('');
  const prods = listProductos();
  const cats = listCategorias();
  const { add } = useCart();

  const filtered = useMemo(()=>{
    return prods.filter(p=>{
      if(q && !p.nombre.toLowerCase().includes(q.toLowerCase())) return false;
      if(cat && p.categoriaId!==cat) return false;
      if(tipo && p.tipo!==tipo) return false;
      return true;
    });
  },[q,cat,tipo,prods]);

  return (
    <div className="container py-4">
      <h2>Productos</h2>
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-4">
          <input className="form-control" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div className="col-6 col-md-4">
          <select className="form-select" value={cat} onChange={e=>setCat(e.target.value)}>
            <option value="">Todas las categorías</option>
            {cats.map(c=>(<option key={c.id} value={c.id}>{c.nombre}</option>))}
          </select>
        </div>
        <div className="col-6 col-md-4">
          <select className="form-select" value={tipo} onChange={e=>setTipo(e.target.value)}>
            <option value="">Cualquier tipo</option>
            <option value="cuadrada">Torta Cuadrada</option>
            <option value="circular">Torta Circular</option>
            <option value="individual">Individual</option>
            <option value="unit">Unitario</option>
          </select>
        </div>
      </div>
      <div className="row g-3">
        {filtered.map(p=>(
          <div key={p.id} className="col-12 col-sm-6 col-lg-4">
            <div className="card card-product h-100 p-2">
              <img src={p.img} alt={p.nombre} />
              <div className="p-2 pt-3">
                <h5>{p.nombre}</h5>
                <div className="d-flex gap-2 align-items-center mb-2">
                  <strong>${p.precio.toLocaleString()}</strong>
                  {p.stock<=5 ? <span className="badge badge-critico">Stock crítico</span> : <span className="badge badge-ok">Stock OK</span>}
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-accent" onClick={()=>add(p,1)}>Agregar</button>
                  <Link className="btn btn-sm btn-outline-secondary" to={`/producto/${p.id}`}>Ver detalle</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
