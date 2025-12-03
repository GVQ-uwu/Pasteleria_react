// src/pages/shop/Categorias.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryService } from '../../services/CategoryService';

export default function Categorias() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await CategoryService.getCategories();

        // Soporta que el service devuelva response o directamente data
        const data = Array.isArray(res?.data) ? res.data : res;
        setCats(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 403) {
          setError('No tienes permisos para ver las categorías (403).');
        } else {
          setError('Error al cargar las categorías.');
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando categorías...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1
        className="mb-4"
        style={{ fontFamily: 'Pacifico, cursive', color: 'var(--choco)' }}
      >
        Categorías
      </h1>

      {cats.length === 0 ? (
        <div className="alert alert-info">No hay categorías disponibles.</div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {cats.map((cat) => (
            <div key={cat.id} className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'var(--text)' }}>
                    {cat.nombre}
                  </h5>
                  <p className="card-text text-muted small">
                    {cat.descripcion || 'Productos de esta categoría.'}
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0">
                  {/* Si más adelante quieres filtrar productos por categoría,
                      aquí puedes poner un Link a /productos con query params */}
                  <Link to="/productos" className="btn btn-accent btn-sm">
                    Ver productos
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

