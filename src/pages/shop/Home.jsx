import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
export default function Home() {
  const [destacados, setDestacados] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProductosDestacados();
  }, []);

  const loadProductosDestacados = async () => {
    try {
      const productos = await ProductService.getProducts();
      
      // Filtrar productos destacados (ejemplo: los primeros 4)
      const destacadosFiltrados = productos.filter(p => p.destacado).slice(0, 4);
      setDestacados(destacadosFiltrados);
      
      // Filtrar ofertas (ejemplo: productos con descuento)
      const ofertasFiltradas = productos.filter(p => p.oferta).slice(0, 6);
      setOfertas(ofertasFiltradas);
      
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container py-4 text-center">Cargando...</div>;
  if (error) return <div className="container py-4 alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      {/* Hero Section */}
      <div className="jumbotron bg-light p-5 rounded mb-4">
        <h1 className="display-4">¡Bienvenido a 1000 Sabores!</h1>
        <p className="lead">La mejor pastelería artesanal con los sabores más exquisitos.</p>
        <Link className="btn btn-accent btn-lg" to="/productos">Ver Catálogo</Link>
      </div>

      {/* Productos Destacados */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>⭐ Productos Destacados</h2>
          <Link to="/productos" className="btn btn-outline-secondary">Ver Todos</Link>
        </div>
        <div className="row g-3">
          {destacados.length > 0 ? (
            destacados.map(producto => (
              <div key={producto.id} className="col-md-3">
                <div className="card h-100">
                  <img src={producto.img} className="card-img-top" alt={producto.nombre} style={{height: '180px', objectFit: 'cover'}} />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion?.substring(0, 80)}...</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong className="text-danger">${producto.precio}</strong>
                      <Link to={`/producto/${producto.id}`} className="btn btn-sm btn-accent">Ver</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center text-muted">No hay productos destacados por el momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>🔥 Ofertas Especiales</h2>
          <Link to="/ofertas" className="btn btn-outline-danger">Ver Ofertas</Link>
        </div>
        <div className="row g-3">
          {ofertas.length > 0 ? (
            ofertas.map(producto => (
              <div key={producto.id} className="col-md-4 col-lg-2">
                <div className="card h-100 border-danger">
                  <div className="card-header bg-danger text-white text-center py-1">
                    <small>OFERTA</small>
                  </div>
                  <img src={producto.img} className="card-img-top" alt={producto.nombre} style={{height: '120px', objectFit: 'cover'}} />
                  <div className="card-body text-center p-2">
                    <h6 className="card-title mb-1">{producto.nombre}</h6>
                    <div className="d-flex justify-content-center gap-2">
                      <del className="text-muted">${producto.precio * 1.2}</del>
                      <strong className="text-danger">${producto.precio}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center text-muted">No hay ofertas disponibles por el momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categorías */}
      <section className="mb-5">
        <h2 className="mb-3">🎂 Nuestras Categorías</h2>
        <div className="row g-3">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Tortas Clásicas</h5>
                <p className="card-text">Las recetas tradicionales que siempre te encantarán.</p>
                <Link to="/categorias" className="btn btn-outline-accent">Explorar</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Postres Individuales</h5>
                <p className="card-text">Disfruta de nuestros postres en porciones individuales.</p>
                <Link to="/categorias" className="btn btn-outline-accent">Explorar</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Temporada</h5>
                <p className="card-text">Sabores especiales para cada época del año.</p>
                <Link to="/categorias" className="btn btn-outline-accent">Explorar</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Sin Gluten</h5>
                <p className="card-text">Deliciosas opciones para dietas especiales.</p>
                <Link to="/categorias" className="btn btn-outline-accent">Explorar</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <div className="text-center p-4 bg-light rounded">
        <h3>¿Listo para ordenar?</h3>
        <p>Regístrate y obtén un 10% de descuento en tu primera compra</p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/registro" className="btn btn-accent">Crear Cuenta</Link>
          <Link to="/productos" className="btn btn-outline-accent">Ver Catálogo</Link>
        </div>
      </div>
    </div>
  );
}
