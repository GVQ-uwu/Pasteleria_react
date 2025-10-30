import React from 'react';
import { Link } from 'react-router-dom';
import { listCategorias } from '../../data/db';

export default function Categorias(){
  const cats = listCategorias();
  return (
    <div className="container py-4">
      <h2>Categorías</h2>
      <div className="row g-3">
        {cats.map(c=>(
          <div className="col-12 col-sm-6 col-lg-4" key={c.id}>
            <div className="p-3 rounded border bg-white h-100 d-flex flex-column">
              <h5 className="mb-3">{c.nombre}</h5>
              <Link to={`/productos?cat=${c.id}`} className="mt-auto btn btn-outline-secondary">Ver productos</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
