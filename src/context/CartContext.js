import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const KEY = 'carrito.v1';
const CartContext = createContext();

export function CartProvider({children}){
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const raw = localStorage.getItem(KEY);
    if(raw) setItems(JSON.parse(raw));
  },[]);

  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(items));
  },[items]);

  const add = (prod, qty=1)=>{
    setItems(prev=>{
      const i = prev.find(x=>x.id===prod.id);
      if(i) return prev.map(x=> x.id===prod.id ? {...x, qty: x.qty + qty} : x);
      return [...prev, { id:prod.id, nombre:prod.nombre, precio:prod.precio, img:prod.img, qty }];
    });
  };
  const remove = (id)=> setItems(prev=> prev.filter(x=>x.id!==id));
  const clear = ()=> setItems([]);
  const updateQty = (id, qty)=> setItems(prev=> prev.map(x=> x.id===id ? {...x, qty} : x));
  const total = useMemo(()=> items.reduce((acc, it)=> acc + it.precio*it.qty, 0), [items]);

  return (
    <CartContext.Provider value={{items, add, remove, clear, updateQty, total}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = ()=> useContext(CartContext);
