import React, { useState } from 'react';
import { addCategoria, deleteCategoria, listCategorias, updateCategoria } from '../../data/db';

export default function AdminCategorias(){
  const [cats,setCats] = useState(listCategorias());
  const [nombre,setNombre] = useState('');

  const add = (e)=>{
    e.preventDefault();
    if(!nombre.trim()) return;
    addCategoria({ nombre });
    setNombre('');
    setCats(listCategorias());
  };
  const rename = (id)=>{
    const nuevo = window.prompt('Nuevo nombre:');
    if(!nuevo) return;
    updateCategoria(id, { nombre:nuevo });
    setCats(listCategorias());
  };
  const del = (id)=>{
    if(window.confirm('¿Eliminar categoría?')){
      deleteCategoria(id);
      setCats(listCategorias());
    }
  };

  return (
    <div className="container py-4">
      <h2>Categorías</h2>
      <form className="d-flex gap-2 mb-3" onSubmit={add}>
        <input className="form-control" placeholder="Nueva categoría" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <button className="btn btn-accent">Agregar</button>
      </form>
      <ul className="list-group">
        {cats.map(c=>(
          <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{c.nombre}</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={()=>rename(c.id)}>Renombrar</button>
              <button className="btn btn-sm btn-outline-danger" onClick={()=>del(c.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
