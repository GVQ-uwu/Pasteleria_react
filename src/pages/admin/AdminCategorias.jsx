import React, { useState, useEffect } from 'react';
import { CategoryService } from '../../services/CategoryService';

export default function AdminCategorias() {
  const [cats, setCats] = useState([]);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const data = await CategoryService.getCategories();
      setCats(data);
    } catch (err) {
      setError('Error al cargar categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    try {
      await CategoryService.createCategory({ nombre });
      setNombre('');
      await loadCategorias(); // Recargar la lista
    } catch (err) {
      setError('Error al agregar categoría');
      console.error(err);
    }
  };

  const rename = async (id) => {
    const nuevo = window.prompt('Nuevo nombre:');
    if (!nuevo) return;
    try {
      await CategoryService.updateCategory(id, { nombre: nuevo });
      await loadCategorias(); // Recargar la lista
    } catch (err) {
      setError('Error al renombrar categoría');
      console.error(err);
    }
  };

  const del = async (id) => {
    if (window.confirm('¿Eliminar categoría?')) {
      try {
        await CategoryService.deleteCategory(id);
        await loadCategorias(); // Recargar la lista
      } catch (err) {
        setError('Error al eliminar categoría');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="container py-4">Cargando...</div>;
  if (error) return <div className="container py-4 alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Categorías</h2>
      <form className="d-flex gap-2 mb-3" onSubmit={add}>
        <input className="form-control" placeholder="Nueva categoría" value={nombre} onChange={e => setNombre(e.target.value)} />
        <button className="btn btn-accent">Agregar</button>
      </form>
      <ul className="list-group">
        {cats.map(c => (
          <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{c.nombre}</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => rename(c.id)}>Renombrar</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => del(c.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
