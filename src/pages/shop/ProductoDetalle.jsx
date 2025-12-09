import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductService } from "../../services/ProductService";
import ProductImage from "../../components/ProductImage";
import { useCart } from "../../context/CartContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const { add } = useCart(); // ← Necesario para el carrito

  useEffect(() => {
    const load = async () => {
      try {
        const data = await ProductService.getProductById(id);
        setProducto(data);
      } catch (e) {
        console.error("Error cargando producto:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading)
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p>Cargando producto...</p>
      </div>
    );

  if (!producto) return <div className="container py-5">Producto no encontrado</div>;

  return (
    <div className="container py-5">
      {/* VOLVER */}
      <Link to="/productos" className="btn btn-outline-secondary mb-4">
        ← Volver a productos
      </Link>

      <div className="row align-items-start g-5">
        {/* IMAGEN */}
        <div className="col-lg-5 text-center">
          <ProductImage
            producto={producto}
            className="img-fluid rounded shadow"
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "auto",
              objectFit: "cover"
            }}
          />
        </div>

        {/* INFO DEL PRODUCTO */}
        <div className="col-lg-7">
          <h1 className="display-5 fw-bold mb-2" style={{ color: "#6b3000" }}>
            {producto.nombre}
          </h1>

          <p className="text-muted fs-5">{producto.descripcion}</p>

          <h3 className="fw-bold text-danger mt-3">
            ${producto.precio?.toLocaleString()}
          </h3>

          <p className="mt-3">
            <strong>Categoría:</strong>{" "}
            {producto.categoria?.nombre ?? "No asignada"}
          </p>

          <p>
            <strong>Tipo:</strong> {producto.tipo}
          </p>

          <p>
            <strong>Tamaño:</strong> {producto.tamano}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            <span className="text-success">
              {producto.stock} disponibles
            </span>
          </p>

          {/* ETIQUETA DESTACADO */}
          {producto.destacado && (
            <span className="badge bg-warning text-dark p-2 mb-3 d-inline-flex align-items-center">
              ⭐ Destacado
            </span>
          )}

          {/* BOTÓN AGREGAR AL CARRITO */}
          <div className="mt-4">
            <button
              className="btn btn-lg text-dark"
              style={{
                backgroundColor: "#ffb6c1",
                padding: "12px 28px",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "600"
              }}
              onClick={() => add(producto, 1)}
            >
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
