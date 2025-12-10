import React, { useState, useEffect } from 'react';
import { UserService } from '../../services/UserService';
import { ProductService } from '../../services/ProductService';
import { OrderService } from '../../services/OrderService';

export default function AdminReportes() {
  const [stats, setStats] = useState({
    usuarios: { total: 0, nuevos: 0, activos: 0 },
    productos: { total: 0, destacados: 0, ofertas: 0, sinStock: 0 },
    pedidos: { total: 0, pendientes: 0, completados: 0, ingresos: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Cargar estadísticas de usuarios
      const usuarios = await UserService.getAllUsers();
      const usuariosActivos = usuarios.filter(u => u.estado === 'activo').length;
      const usuariosNuevos = usuarios.filter(u => {
        const fechaRegistro = new Date(u.fechaRegistro);
        const hoy = new Date();
        return fechaRegistro.toDateString() === hoy.toDateString();
      }).length;

      // Cargar estadísticas de productos
      const productos = await ProductService.getProducts();
      const productosDestacados = productos.filter(p => p.destacado).length;
      const productosOfertas = productos.filter(p => p.oferta).length;
      const productosSinStock = productos.filter(p => p.stock === 0).length;

      // Cargar estadísticas de pedidos (si existe el servicio)
      let pedidosStats = { total: 0, pendientes: 0, completados: 0, ingresos: 0 };
      try {
        if (OrderService && OrderService.getAllOrders) {
          const pedidos = await OrderService.getAllOrders();
          pedidosStats = {
            total: pedidos.length,
            pendientes: pedidos.filter(p => p.estado === 'pendiente').length,
            completados: pedidos.filter(p => p.estado === 'completado').length,
            ingresos: pedidos
              .filter(p => p.estado === 'completado')
              .reduce((sum, p) => sum + (p.total || 0), 0)
          };
        }
      } catch (err) {
        console.log('OrderService no disponible:', err);
      }

      setStats({
        usuarios: {
          total: usuarios.length,
          nuevos: usuariosNuevos,
          activos: usuariosActivos
        },
        productos: {
          total: productos.length,
          destacados: productosDestacados,
          ofertas: productosOfertas,
          sinStock: productosSinStock
        },
        pedidos: pedidosStats
      });

    } catch (err) {
      setError('Error al cargar estadísticas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container py-4">Cargando estadísticas...</div>;
  if (error) return <div className="container py-4 alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Reportes y Estadísticas</h2>
      
      <div className="row g-4">
        {/* Estadísticas de Usuarios */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">👥 Usuarios</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <h3 className="text-primary">{stats.usuarios.total}</h3>
                  <small>Total</small>
                </div>
                <div className="col-6">
                  <h3 className="text-success">{stats.usuarios.activos}</h3>
                  <small>Activos</small>
                </div>
              </div>
              <hr />
              <div className="text-center">
                <h4 className="text-info">{stats.usuarios.nuevos}</h4>
                <small>Nuevos hoy</small>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas de Productos */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">🍰 Productos</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <h3 className="text-success">{stats.productos.total}</h3>
                  <small>Total</small>
                </div>
                <div className="col-6">
                  <h3 className="text-warning">{stats.productos.destacados}</h3>
                  <small>Destacados</small>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-6">
                  <h4 className="text-info">{stats.productos.ofertas}</h4>
                  <small>En oferta</small>
                </div>
                <div className="col-6">
                  <h4 className="text-danger">{stats.productos.sinStock}</h4>
                  <small>Sin stock</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas de Pedidos */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">📦 Pedidos</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <h3 className="text-info">{stats.pedidos.total}</h3>
                  <small>Total</small>
                </div>
                <div className="col-6">
                  <h3 className="text-warning">{stats.pedidos.pendientes}</h3>
                  <small>Pendientes</small>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-6">
                  <h4 className="text-success">{stats.pedidos.completados}</h4>
                  <small>Completados</small>
                </div>
                <div className="col-6">
                  <h4 className="text-primary">${stats.pedidos.ingresos.toLocaleString()}</h4>
                  <small>Ingresos</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">🚀 Acciones Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <button 
                    className="btn btn-outline-primary w-100"
                    onClick={() => window.location.href = '/admin/productos'}
                  >
                    📝 Gestionar Productos
                  </button>
                </div>
                <div className="col-md-3">
                  <button 
                    className="btn btn-outline-success w-100"
                    onClick={() => window.location.href = '/admin/categorias'}
                  >
                    🏷️ Gestionar Categorías
                  </button>
                </div>
                <div className="col-md-3">
                  <button 
                    className="btn btn-outline-info w-100"
                    onClick={() => window.location.href = '/admin/usuarios'}
                  >
                    👥 Gestionar Usuarios
                  </button>
                </div>
                <div className="col-md-3">
                  <button 
                    className="btn btn-outline-warning w-100"
                    onClick={loadStats}
                  >
                    🔄 Actualizar Datos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas y recomendaciones */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-warning">
              <h5 className="mb-0">⚠️ Alertas</h5>
            </div>
            <div className="card-body">
              {stats.productos.sinStock > 0 && (
                <div className="alert alert-warning">
                  <strong>¡Atención!</strong> Tienes {stats.productos.sinStock} productos sin stock.
                </div>
              )}
              {stats.pedidos.pendientes > 5 && (
                <div className="alert alert-info">
                  <strong>Pedidos pendientes:</strong> Tienes {stats.pedidos.pendientes} pedidos esperando procesamiento.
                </div>
              )}
              {stats.usuarios.nuevos > 0 && (
                <div className="alert alert-success">
                  <strong>¡Genial!</strong> {stats.usuarios.nuevos} nuevos usuarios se registraron hoy.
                </div>
              )}
              {stats.productos.sinStock === 0 && stats.pedidos.pendientes <= 5 && stats.usuarios.nuevos === 0 && (
                <div className="alert alert-success">
                  <strong>¡Todo en orden!</strong> No hay alertas importantes en este momento.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}