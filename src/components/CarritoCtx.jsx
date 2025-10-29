import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoCtx = createContext();
export const useCarrito = () => useContext(CarritoCtx);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const totalProductos = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const totalDinero = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <CarritoCtx.Provider value={{ carrito, setCarrito, totalProductos, totalDinero }}>
      {children}
    </CarritoCtx.Provider>
  );
}
