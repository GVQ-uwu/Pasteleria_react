import { addProducto, deleteProducto, listProductos } from '../src/data/db';

describe('db crud', ()=>{
  it('agrega y elimina productos', ()=>{
    const before = listProductos().length;
    addProducto({ nombre:'Test', precio:1000, stock:1, categoriaId:'cat-cuad', tipo:'circular', tamano:'pequena' });
    const mid = listProductos().length;
    expect(mid).toBe(before+1);
    const nuevo = listProductos().slice(-1)[0];
    deleteProducto(nuevo.id);
    const after = listProductos().length;
    expect(after).toBe(before);
  });
});
