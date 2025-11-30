import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { OrderService } from '../../services/OrderService';

export default function AdminHome(){
  const [criticos, setCriticos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Cargar productos para obtener stock crítico
      const productsResponse = await ProductService.getProducts();
      const criticalProducts = (productsResponse.data || []).filter(p => p.stock <= 5);
      setCriticos(criticalProducts);

      // Cargar pedidos (si tienes OrderService)
      try {
        const ordersResponse = await OrderService.getOrders();
        const lastOrders = (ordersResponse.data || []).slice(-5).reverse();
        setPedidos(lastOrders);
      } catch (orderError) {
        console.warn('No se pudieron cargar los pedidos:', orderError);
        setPedidos([]);
      }
    } catch (err) {
      setError('Error al cargar datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container py-4">Cargando...</div>;
  if (error) return <div className="container py-4 alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Panel administrativo</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="p-3 bg-white border rounded h-100">
            <h5>Accesos rápidos</h5>
            <div className="d-grid gap-2">
              <Link className="btn btn-outline-secondary" to="/admin/productos">Productos</Link>
              <Link className="btn btn-outline-secondary" to="/admin/categorias">Categorías</Link>
              <Link className="btn btn-outline-secondary" to="/admin/usuarios">Usuarios</Link>
              <Link className="btn btn-outline-secondary" to="/admin/reportes">Reportes</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-3 bg-white border rounded h-100">
            <h5>Stock crítico</h5>
            {criticos.length===0 ? <p>Todo con buen stock.</p> : (
              <ul className="list-group">
                {criticos.map(p=>(
                  <li key={p.id} className="list-group-item d-flex justify-content-between">
                    <span>{p.nombre}</span>
                    <span className="badge bg-danger">{p.stock}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 p-3 bg-white border rounded">
        <h5>Últimos pedidos</h5>
        {pedidos.length===0 ? <p>Sin pedidos aún.</p> : (
          <div className="table-responsive">
            <table className="table table-sm">
              <thead><tr><th>ID</th><th>Fecha</th><th>Email</th><th>Total</th></tr></thead>
              <tbody>
                {pedidos.map(p=>(
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{new Date(p.fecha).toLocaleString()}</td>
                    <td>{p.userEmail}</td>
                    <td>${p.totalFinal?.toLocaleString() || '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}