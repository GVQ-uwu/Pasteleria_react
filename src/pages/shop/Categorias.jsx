// ProductosPorCategoria.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CategoryService } from '../../services/CategoryService';
import { ProductService } from '../../services/ProductService';

export default function ProductosPorCategoria() {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, prodsRes] = await Promise.all([
          CategoryService.getCategoryById(id),
          ProductService.getProductsByCategory(id)
        ]);
        
        setCategoria(catRes.data);
        setProductos(prodsRes.data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!categoria) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          Categoría no encontrada
        </div>
        <Link to="/categorias" className="btn btn-accent">
          Volver a categorías
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none" style={{ color: 'var(--accent)' }}>
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/categorias" className="text-decoration-none" style={{ color: 'var(--accent)' }}>
              Categorías
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {categoria.nombre}
          </li>
        </ol>
      </nav>

      {/* Header de categoría */}
      <div className="row align-items-center mb-5">
        <div className="col-md-8">
          <h1 className="display-6 mb-2" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--choco)' }}>
            {categoria.nombre}
          </h1>
          <p className="lead text-muted">{categoria.descripcion}</p>
        </div>
        <div className="col-md-4 text-md-end">
          <div className="card border-0" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="card-body text-center">
              <h6 className="mb-0">
                <i className="bi bi-cake2 me-2" style={{ color: 'var(--accent)' }}></i>
                {productos.length} productos
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Productos */}
      {productos.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productos.map(producto => (
            <div key={producto.id} className="col">
              <div className="card h-100 border-0 shadow-sm producto-card">
                <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                  <img
                    src={producto.imagenUrl || '/placeholder-producto.jpg'}
                    alt={producto.nombre}
                    className="card-img-top w-100 h-100"
                    style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                    onError={(e) => {
                      e.target.src = '/placeholder-producto.jpg';
                    }}
                  />
                  {producto.oferta && (
                    <div className="position-absolute top-0 start-0 m-2">
                      <span className="badge bg-danger">OFERTA</span>
                    </div>
                  )}
                  {producto.destacado && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-warning text-dark">⭐ DESTACADO</span>
                    </div>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2" style={{ color: 'var(--text)' }}>
                    {producto.nombre}
                  </h5>
                  <p className="card-text flex-grow-1 small text-muted mb-3">
                    {producto.descripcion?.substring(0, 80)}...
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <span className="fw-bold fs-5" style={{ color: 'var(--choco)' }}>
                          ${producto.precio}
                        </span>
                        {producto.precioOriginal && (
                          <del className="text-muted ms-2">${producto.precioOriginal}</del>
                        )}
                      </div>
                      {producto.stock <= 10 && producto.stock > 0 && (
                        <span className="badge bg-warning text-dark">
                          {producto.stock} restantes
                        </span>
                      )}
                    </div>
                    <div className="d-grid gap-2">
                      <Link 
                        to={`/producto/${producto.id}`} 
                        className="btn btn-accent btn-sm"
                      >
                        <i className="bi bi-eye me-1"></i> Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="mb-3">
            <i className="bi bi-cake display-1 text-muted"></i>
          </div>
          <h4 className="mb-3">No hay productos en esta categoría</h4>
          <p className="text-muted mb-4">
            Pronto agregaremos productos en esta categoría
          </p>
          <Link to="/categorias" className="btn btn-accent">
            Ver otras categorías
          </Link>
        </div>
      )}

      {/* Volver a categorías */}
      <div className="text-center mt-5">
        <Link to="/categorias" className="btn btn-outline-accent">
          <i className="bi bi-arrow-left me-2"></i>
          Ver todas las categorías
        </Link>
      </div>
    </div>
  );
}
