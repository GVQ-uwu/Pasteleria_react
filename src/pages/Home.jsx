import React from "react";
import brownie from "../assets/Brownie Sin Gluten.png";
import cheesecake from "../assets/Cheesecake Sin Azucar.png";
import tiramisu from "../assets/Tiramisu Clasico.png";
import tortaVainilla from "../assets/Torta Circular de Vainilla.png";

export default function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      {/* SLIDER */}
      <section
        className="hero-banner"
        style={{
          width: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#b94b67",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        🧁 Pastelería Sabores · Nuevos Lanzamientos
      </section>

      {/* CATEGORÍAS */}
      <h2 style={{ margin: "40px 0 20px" }}>Categorías</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          justifyItems: "center",
          padding: "0 40px",
        }}
      >
        {[
          { nombre: "Sin Gluten", img: brownie },
          { nombre: "Sin Azúcar", img: cheesecake },
          { nombre: "Clásicos", img: tiramisu },
          { nombre: "Vainilla", img: tortaVainilla },
        ].map((cat) => (
          <div
            key={cat.nombre}
            className="card"
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              width: "230px",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={cat.img}
              alt={cat.nombre}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            />
            <h3 style={{ padding: "10px 0", color: "#b94b67" }}>{cat.nombre}</h3>
          </div>
        ))}
      </div>

      {/* DESTACADOS */}
      <h2 style={{ margin: "50px 0 20px" }}>Productos Destacados</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyItems: "center",
          padding: "0 40px 60px",
        }}
      >
        {[brownie, cheesecake, tiramisu, tortaVainilla].map((img, index) => (
          <div
            key={index}
            className="product-card"
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
              width: "250px",
            }}
          >
            <img
              src={img}
              alt="Producto"
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h4 style={{ color: "#b94b67" }}>Producto de Temporada</h4>
              <p style={{ color: "#777", fontSize: "14px" }}>
                Deliciosa preparación artesanal
              </p>
              <button
                style={{
                  marginTop: "8px",
                  backgroundColor: "#b94b67",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
