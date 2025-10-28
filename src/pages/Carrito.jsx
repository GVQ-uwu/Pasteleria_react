import React, { useMemo, useState } from "react";

// ejemplo de catálogo (cámbialo por tus datos/imágenes reales en src/assets)
const CATALOGO = [
  { id: 1, nombre: "Torta Cuadrada de Chocolate", precio: 45000, categoria: "Tortas", img: "/assets/Torta Cuadrada de Chocolate.png" },
  { id: 2, nombre: "Cheesecake Sin Azúcar", precio: 34990, categoria: "Sin Azúcar", img: "/assets/Cheesecake Sin Azucar.png" },
  { id: 3, nombre: "Brownie Sin Gluten", precio: 29990, categoria: "Sin Gluten", img: "/assets/Brownie Sin Gluten.png" },
];

export default function Carrito() {
  const [filtro, setFiltro] = useState("Todas");
  const [carrito, setCarrito] = useState([]); // [{id, nombre, precio, img, cantidad}]

  const categorias = useMemo(
    () => ["Todas", ...new Set(CATALOGO.map(p => p.categoria))],
    []
  );

  const productosFiltrados = useMemo(
    () => (filtro === "Todas" ? CATALOGO : CATALOGO.filter(p => p.categoria === filtro)),
    [filtro]
  );

  const agregar = (prod) => {
    setCarrito((prev) => {
      const existe = prev.find(p => p.id === prod.id);
      if (existe) {
        return prev.map(p => p.id === prod.id ? { ...p, cantidad: p.cantidad + 1 } : p);
      }
      return [...prev, { ...prod, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, cant) => {
    setCarrito(prev =>
      prev.map(p => p.id === id ? { ...p, cantidad: Math.max(1, Number(cant) || 1) } : p)
    );
  };

  const eliminar = (id) => setCarrito(prev => prev.filter(p => p.id !== id));
  const limpiar = () => setCarrito([]);
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="contenedor-principal" style={{ padding: 20 }}>
      <section>
        <h2 className="titulo-principal" style={{ marginBottom: 16 }}>Nuestros Productos</h2>

        <div className="contenedor-tienda" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Carrito */}
          <div className="carrito" style={{ background: "#fff", borderRadius: 10, padding: 16, boxShadow: "0 3px 10px rgba(0,0,0,.08)" }}>
            <h2 className="titulo-carrito">🛒 Carrito</h2>

            <label htmlFor="filtroCategoria" style={{ display: "block", marginTop: 8 }}>Filtrar por categoría:</label>
            <select
              id="filtroCategoria"
              className="filtro-categoria"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{ margin: "6px 0 14px", padding: "6px 10px" }}
            >
              {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {carrito.length === 0 ? (
              <p className="carrito-items">Aún no hay productos.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((p) => (
                    <tr key={p.id} style={{ textAlign: "center", borderTop: "1px solid #eee" }}>
                      <td><img src={p.img} alt={p.nombre} width={50} height={50} /></td>
                      <td>{p.nombre}</td>
                      <td>${p.precio.toLocaleString()}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={p.cantidad}
                          onChange={(e) => cambiarCantidad(p.id, e.target.value)}
                          style={{ width: 60 }}
                        />
                      </td>
                      <td>${(p.precio * p.cantidad).toLocaleString()}</td>
                      <td>
                        <button onClick={() => eliminar(p.id)} style={{ background: "#dc3545", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 6 }}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <p id="total" className="total" style={{ fontWeight: "bold", textAlign: "right", marginTop: 12 }}>
              Total: ${total.toLocaleString()}
            </p>
            <button id="btnLimpiar" className="btn-limpiar" onClick={limpiar} style={{ background: "#6c757d", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6 }}>
              🗑️ Limpiar Carrito
            </button>
          </div>

          {/* Lista de productos */}
          <div id="listaProductos" className="productos" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {/* Render dinámico */}
            {productosFiltrados.map((prod) => (
              <div key={prod.id} className="producto-item" style={{ border: "1px solid #eee", borderRadius: 10, padding: 12, textAlign: "center" }}>
                <img src={prod.img} alt={prod.nombre} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }} />
                <h3 style={{ fontSize: 16 }}>{prod.nombre}</h3>
                <p>Precio: ${prod.precio.toLocaleString()}</p>
                <button className="btn-agregar" onClick={() => agregar(prod)} style={{ background: "#b94b67", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6 }}>
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
