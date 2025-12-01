// Ofertas.jsx - MEJORADO
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOfertas();
  }, []);

  const loadOfertas = async () => {
    try {
      const response = await ProductService.getProducts();
      const productosOferta = response.data.filter(p => p.oferta || p.descuento > 0);
      setOfertas(productosOferta);
    } catch (error) {
      console.error('Error cargando ofertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const calcularDescuento = (precio, precioOriginal) => {
    if (!precioOriginal) return 0;
    return Math.round(((precioOriginal - precio) / precioOriginal) * 100);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Hero Section Ofertas */}
      <div className="text-center mb-5">
        <div className="position-relative">
          <h1 className="display-5 fw-bold mb-3" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--choco)' }}>
            🎉 ¡Ofertas Especiales! 🎉
          </h1>
          <p className="lead text-muted mb-4">
            Aprovecha nuestros descuentos exclusivos en productos seleccionados
          </p>
          <div className="position-absolute top-0 end-0">
            <span className="badge bg-danger fs-6">LIMITADO</span>
          </div>
        </div>
      </div>

      {/* Productos en Oferta */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 mb-0" style={{ color: 'var(--text)' }}>
            <i className="bi bi-fire me-2" style={{ color: 'var(--accent)' }}></i>
            Productos con Descuento
          </h2>
          <span className="badge bg-accent px-3 py-2">
            {ofertas.length} ofertas activas
          </span>
        </div>

        {ofertas.length > 0 ? (
          <div className="row g-4">
            {ofertas.map(producto => {
              const descuento = calcularDescuento(producto.precio, producto.precioOriginal);
              
              return (
                <div key={producto.id} className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card h-100 border-0 shadow offer-card">
                    {/* Badge de descuento */}
                    <div className="position-absolute top-0 start-0 m-2">
                      <div className="bg-danger text-white rounded-circle p-2 text-center" 
                           style={{ width: '60px', height: '60px' }}>
                        <span className="fw-bold d-block">-{descuento}%</span>
                        <small>OFF</small>
                      </div>
                    </div>
                    
                    {/* Imagen del producto */}
                    <div className="offer-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                      <img
                        src={producto.imagenUrl || '/placeholder-producto.jpg'}
                        alt={producto.nombre}
                        className="card-img-top w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-2">{producto.nombre}</h5>
                      <p className="card-text small text-muted mb-3 flex-grow-1">
                        {producto.descripcion?.substring(0, 80)}...
                      </p>
                      
                      {/* Precios */}
                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <span className="fw-bold fs-4 me-2" style={{ color: 'var(--choco)' }}>
                            ${producto.precio}
                          </span>
                          {producto.precioOriginal && (
                            <del className="text-muted fs-6">${producto.precioOriginal}</del>
                          )}
                        </div>
                        <div className="mt-1">
                          <small className="text-success">
                            <i className="bi bi-arrow-down me-1"></i>
                            Ahorras ${producto.precioOriginal - producto.precio}
                          </small>
                        </div>
                      </div>
                      
                      {/* Stock y acciones */}
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div>
                            {producto.stock > 0 ? (
                              <span className="badge bg-success">
                                <i className="bi bi-check-circle me-1"></i>
                                Disponible
                              </span>
                            ) : (
                              <span className="badge bg-secondary">Agotado</span>
                            )}
                          </div>
                          {producto.stock <= 10 && producto.stock > 0 && (
                            <small className="text-warning">
                              Solo {producto.stock} unidades
                            </small>
                          )}
                        </div>
                        
                        <div className="d-grid">
                          <Link 
                            to={`/producto/${producto.id}`} 
                            className="btn btn-danger btn-sm"
                          >
                            <i className="bi bi-cart-plus me-1"></i>
                            Agregar al carrito
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-emoji-frown display-1 text-muted"></i>
            </div>
            <h4 className="mb-3">No hay ofertas disponibles</h4>
            <p className="text-muted mb-4">
              ¡Vuelve pronto para descubrir nuestras próximas ofertas!
            </p>
            <Link to="/productos" className="btn btn-accent">
              Ver todos los productos
            </Link>
          </div>
        )}
      </section>

      {/* Promociones Fijas */}
      <section className="mb-5">
        <h3 className="mb-4" style={{ color: 'var(--text)' }}>
          <i className="bi bi-percent me-2" style={{ color: 'var(--accent)' }}></i>
          Promociones Activas
        </h3>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 h-100" style={{ backgroundColor: '#fff7f9' }}>
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <span className="badge bg-danger fs-5 px-3 py-2">20% OFF</span>
                </div>
                <h5 className="card-title mb-3">Cumpleaños Especial</h5>
                <p className="card-text mb-4">
                  Descuento del 20% en tortas de cumpleaños para pedidos con 3 días de anticipación.
                </p>
                <div className="text-muted small">
                  <i className="bi bi-calendar-check me-1"></i>
                  Válido hasta: 31/12/2024
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 h-100" style={{ backgroundColor: '#f0f8ff' }}>
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <span className="badge bg-success fs-5 px-3 py-2">3x2</span>
                </div>
                <h5 className="card-title mb-3">Galletas Artesanales</h5>
                <p className="card-text mb-4">
                  Compra 2 cajas de galletas y lleva la tercera completamente gratis.
                </p>
                <div className="text-muted small">
                  <i className="bi bi-infinity me-1"></i>
                  Oferta permanente
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 h-100" style={{ backgroundColor: '#f0fff0' }}>
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <span className="badge bg-primary fs-5 px-3 py-2">ENVÍO GRATIS</span>
                </div>
                <h5 className="card-title mb-3">Primera Compra</h5>
                <p className="card-text mb-4">
                  Envío gratis en tu primera compra al registrarte en nuestra tienda online.
                </p>
                <div className="text-muted small">
                  <i className="bi bi-person-plus me-1"></i>
                  Solo para nuevos usuarios
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="card border-0 shadow-sm bg-light p-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h5 className="mb-2">¡No te pierdas ninguna oferta!</h5>
            <p className="mb-0 text-muted">
              Suscríbete a nuestro newsletter y recibe las mejores ofertas directamente en tu email.
            </p>
          </div>
          <div className="col-md-4 text-md-end">
            <button className="btn btn-accent">
              <i className="bi bi-envelope me-2"></i>
              Suscribirme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}