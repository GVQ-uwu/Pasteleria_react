import React from "react";
import { useCarrito } from "../page/Carrito";

export default function Checkout() {
  const { carrito, totalDinero } = useCarrito();

  return (
    <div style={{ padding: 40 }}>
      <h1>Resumen de compra</h1>
      {carrito.map((p) => (
        <p key={p.id}>
          {p.nombre} x{p.cantidad} — ${p.precio.toLocaleString()}
        </p>
      ))}
      <h2>Total: ${totalDinero.toLocaleString()}</h2>
      <button
        style={{ background: "#28a745", color: "#fff", padding: "10px 15px", border: "none" }}
        onClick={() => alert("✅ Simulando pago exitoso")}
      >
        Finalizar pago
      </button>
    </div>
  );
}
