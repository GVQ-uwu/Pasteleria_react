import React, { useEffect, useMemo, useState } from "react";

/**
 * Carrito con filtro (basado en tu carritoConFiltro):
 * - Lista de productos (mock)
 * - Filtro por categoría + búsqueda
 * - Agregar, quitar, cambiar cantidad
 * - Total en tiempo real
 * - Persistencia en localStorage
 */

const STORAGE_KEY = "carritoSabores";

// Puedes reemplazar este mock por datos reales (API) o tu lista del profe.
const PRODUCTOS = [
  { id: 1, nombre: "Cheesecake Frutilla", precio: 12990, categoria: "tortas", imagen: "/cheesecake.jpg" },
  { id: 2, nombre: "Brownie Clásico", precio: 3990, categoria: "postres", imagen: "/brownie.jpg" },
  { id: 3, nombre: "Tarta de Limón", precio: 9990, categoria: "tortas", imagen: "/tarta-limon.jpg" },
  { id: 4, nombre: "Cupcake Vainilla", precio: 1990, categoria: "cupcakes", imagen: "/cupcake.jpg" },
  { id: 5, nombre: "Galletas Chocolate", precio: 2990, categoria: "galletas", imagen: "/galletas.jpg" },
];

export default function Carrito() {
  const [carrito, setCarrito] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cat, setCat] = useState("todas");
  const [q, setQ] = useState("");

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  }, [carrito]);

  // Categorías dinámicas
  const categorias = useMemo(() => {
    const set = new Set(PRODUCTOS.map(p => p.categoria));
    return ["todas", ...Array.from(set)];
  }, []);

  // Productos filtrados
  const productosFiltrados = useMemo(() => {
    return PRODUCTOS.filter(p => {
      const okCat = cat === "todas" || p.categoria === cat;
      const okSearch = q.trim() === "" || p.nombre.toLowerCase().includes(q.toLowerCase());
      return okCat && okSearch;
    });
  }, [cat, q]);

  const agregar = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.id === producto.id);
      if (existe) {
        return prev.map(i => i.id === producto.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...producto, qty: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev =>
      prev
        .map(i => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
        .filter(i => i.qty > 0)
    );
  };

  const quitar = (id) => setCarrito(prev => prev.filter(i => i.id !== id));
  const vaciar = () => setCarrito([]);

  const total = useMemo(
    () => carrito.reduce((acc, i) => acc + i.precio * i.qty, 0),
    [carrito]
  );

  return (
    <section className="container" style={{ marginTop: 16 }}>
      <h1>Carrito</h1>

      {/* FILTROS */}
      <div className="filters" style={{ marginBottom: 16 }}>
        <select className="select" value={cat} onChange={e => setCat(e.target.value)} style={{ maxWidth: 220 }}>
          {categorias.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
        </select>

        <input
          className="input"
          placeholder="Buscar producto…"
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ maxWidth: 320 }}
        />
      </div>

      {/* LISTA DE PRODUCTOS */}
      <div className="grid grid-3" style={{ marginBottom: 28 }}>
        {productosFiltrados.map(p => (
          <article key={p.id} className="product-card">
            <div className="product-media">
              {/* Si usas imágenes locales en src/assets/img, impórtalas arriba e inserta aquí */}
              <img src={p.imagen} alt={p.nombre} onError={(e) => { e.currentTarget.src = "https://placehold.co/600x450?text=Pasteleria"; }} />
              <span className="product-badge">{p.categoria}</span>
            </div>
            <div className="product-body">
              <h3 className="product-title">{p.nombre}</h3>
              <p className="product-desc">Delicia artesanal. Ideal para compartir.</p>
              <div className="product-price">${p.precio.toLocaleString("es-CL")}</div>
            </div>
            <div className="product-actions">
              <button className="btn btn-rosa" onClick={() => agregar(p)}>Agregar</button>
              <button className="btn btn-outline" onClick={() => { agregar(p); agregar(p); }}>Agregar x2</button>
            </div>
          </article>
        ))}
      </div>

      {/* CARRITO */}
      <div className="card">
        <div className="card-header">Tu pedido</div>
        <div className="card-body">
          {carrito.length === 0 ? (
            <p className="help">Tu carrito está vacío. Agrega productos para comenzar.</p>
          ) : (
            <div className="cart">
              {carrito.map(item => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="rounded"
                    style={{ width: 96, height: 72, objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/200x150"; }}
                  />
                  <div>
                    <strong>{item.nombre}</strong>
                    <div className="help">Precio: ${item.precio.toLocaleString("es-CL")} · Categoría: {item.categoria}</div>
                  </div>
                  <div className="actions" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="btn btn-outline" onClick={() => cambiarCantidad(item.id, -1)}>-</button>
                    <span style={{ minWidth: 24, textAlign: "center", fontWeight: 900 }}>{item.qty}</span>
                    <button className="btn btn-outline" onClick={() => cambiarCantidad(item.id, +1)}>+</button>
                    <button className="btn btn-rosa" onClick={() => quitar(item.id)}>Quitar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Total: ${total.toLocaleString("es-CL")}</strong>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={vaciar} disabled={carrito.length === 0}>Vaciar</button>
            <button className="btn btn-primary" disabled={carrito.length === 0}>Pagar</button>
          </div>
        </div>
      </div>
    </section>
  );
}

