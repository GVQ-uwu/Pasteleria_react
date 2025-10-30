import React from 'react';
import { listProductos, listPedidos } from '../../data/db';

export default function AdminReportes(){
  const pedidos = listPedidos();
  const productos = listProductos();
  const ventas = pedidos.reduce((acc,p)=> acc + p.totalFinal, 0);

  return (
    <div className="container py-4">
      <h2>Reportes</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="p-3 bg-white border rounded h-100">
            <h5>Totales</h5>
            <ul className="list-unstyled mb-0">
              <li>Pedidos: <strong>{pedidos.length}</strong></li>
              <li>Ventas acumuladas: <strong>${ventas.toLocaleString()}</strong></li>
              <li>Productos activos: <strong>{productos.length}</strong></li>
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          <div className="p-3 bg-white border rounded h-100">
            <h5>Últimos pedidos</h5>
            {pedidos.length===0 ? <p>No hay datos aún.</p> : (
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead><tr><th>Fecha</th><th>Cliente</th><th>Total</th></tr></thead>
                  <tbody>
                    {pedidos.slice().reverse().map(p=>(
                      <tr key={p.id}>
                        <td>{new Date(p.fecha).toLocaleString()}</td>
                        <td>{p.userEmail}</td>
                        <td>${p.totalFinal.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
