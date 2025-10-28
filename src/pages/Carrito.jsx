import React, { useState, useMemo } from "react";
import { useCarrito } from "../page/Carrito";
import "./Carrito.css";

const CATALOGO = [
  { id: 1, codigo: "TC001", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Chocolate", precio: 45000, img: "Img/Torta Cuadrada de Chocolate.png" },
  { id: 2, codigo: "TC002", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Frutas", precio: 50000, img: "Img/Torta Cuadrada de Frutas.png" },
  { id: 3, codigo: "TT001", categoria: "Tortas Circulares", nombre: "Torta Circular de Vainilla", precio: 40000, img: "Img/Torta Circular de Vainilla.png" },
  { id: 4, codigo: "TT002", categoria: "Tortas Circulares", nombre: "Torta Circular de Manjar", precio: 42000, img: "Img/Torta Circular de Manjar.png" },
  { id: 5, codigo: "PI001", categoria: "Postres Individuales", nombre: "Mousse de Chocolate", precio: 5000, img: "Img/Mousse de Chocolate.png" },
  { id: 6, codigo: "PI002", categoria: "Postres Individuales", nombre: "Tiramisú Clásico", precio: 5500, img: "Img/Tiramisu Clasico.png" },
  { id: 7, codigo: "PSA001", categoria: "Productos Sin Azúcar", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, img: "Img/Torta Sin Azucar de Naranja.png" },
  { id: 8, codigo: "PSA002", categoria: "Productos Sin Azúcar", nombre: "Cheesecake Sin Azúcar", precio: 47000, img: "Img/Cheesecake Sin Azucar.png" },
  { id: 9, codigo: "PT001", categoria: "Pastelería Tradicional", nombre: "Empanada de Manzana", precio: 3000, img: "Img/Empanada de Manzana.png" },
  { id: 10, codigo: "PT002", categoria: "Pastelería Tradicional", nombre: "Tarta de Santiago", precio: 6000, img: "Img/Tarta de Santiago.png" },
  { id: 11, codigo: "PG001", categoria: "Productos Sin Gluten", nombre: "Brownie Sin Gluten", precio: 4000, img: "Img/Brownie Sin Gluten.png" },
  { id: 12, codigo: "PG002", categoria: "Productos Sin Gluten", nombre: "Pan Sin Gluten", precio: 3500, img: "Img/Pan Sin Gluten.png" },
  { id: 13, codigo: "PV001", categoria: "Productos Veganos", nombre: "Torta Vegana de Chocolate", precio: 50000, img: "Img/Torta Vegana de Chocolate.png" },
  { id: 14, codigo: "PV002", categoria: "Productos Veganos", nombre: "Galletas Veganas de Avena", precio: 4500, img: "Img/Galletas Veganas de Avena.png" },
  { id: 15, codigo: "TE001", categoria: "Tortas Especiales", nombre: "Torta Especial de Cumpleaños", precio: 55000, img: "Img/Torta Especial de Cumpleanos.png" },
  { id: 16, codigo: "TE002", categoria: "Tortas Especiales", nombre: "Torta Especial de Boda", precio: 60000, img: "Img/Torta Especial de Boda.png" }
];

export default function Carrito() {
  const { carrito, setCarrito, totalDinero } = useCarrito();
  const [filtro, setFiltro] = useState("Todas");

  const categorias = useMemo(() => ["Todas", ...new Set(CATALOGO.map(p => p.categoria))], []);
  const productosFiltrados = useMemo(
    () => (filtro === "Todas" ? CATALOGO : CATALOGO.filter(p => p.categoria === filtro)),
    [filtro]
  );

  const agregar = (prod) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === prod.id);
      if (existe) {
        return prev.map((p) =>
          p.id === prod.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...prod, cantidad: 1 }];
    });
  };

  const eliminar = (id) => setCarrito((prev) => prev.filter((p) => p.id !== id));
  const cambiarCantidad = (id, cant) => {
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad: Math.max(1, Number(cant) || 1) } : p))
    );
  };

  const limpiar = () => setCarrito([]);

  return (
    <div className="carrito-container">
      {/* Lista de productos */}
      <div className="productos-lista">
        <h2>Lista de productos</h2>
        <label htmlFor="filtroCategoria">Filtrar por categoría:</label>
        <select id="filtroCategoria" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="productos-grid">
          {productosFiltrados.map((p) => (
            <div key={p.id} className="producto-card">
              <img src={p.img} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p>${p.precio.toLocaleString()}</p>
              <button onClick={() => agregar(p)}>Añadir</button>
            </div>
          ))}
        </div>
      </div>

      {/* Carrito */}
      <div className="carrito-compras">
        <h2>Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío 🛒</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.img} alt={p.nombre} width="50" />
                  </td>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString()}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={p.cantidad}
                      onChange={(e) => cambiarCantidad(p.id, e.target.value)}
                    />
                  </td>
                  <td>${(p.precio * p.cantidad).toLocaleString()}</td>
                  <td>
                    <button className="btn-eliminar" onClick={() => eliminar(p.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {carrito.length > 0 && (
          <div className="carrito-total">
            <p>Total: ${totalDinero.toLocaleString()}</p>
            <div>
              <button className="btn-limpiar" onClick={limpiar}>
                Limpiar
              </button>
              <button
                className="btn-comprar"
                onClick={() => (window.location.href = "/checkout")}
              >
                Comprar ahora
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
