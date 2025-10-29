import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

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
    <CarritoContext.Provider value={{ carrito, setCarrito, totalProductos, totalDinero }}>
      {children}
    </CarritoContext.Provider>
  );
}
