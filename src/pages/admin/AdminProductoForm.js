<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { CategoryService } from '../../services/CategoryService';
=======
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProducto, getProducto, listCategorias, updateProducto } from '../../data/db';
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728

export default function AdminProductoForm(){
  const { id } = useParams();
  const editing = !!id;
<<<<<<< HEAD
  const navigate = useNavigate();

  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({
    nombre:'', precio:0, stock:0, categoriaId: '', tipo:'circular', tamano:'mediana', img:'', desc:'', oferta:false, destacado:false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
    if (editing) {
      loadProduct();
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const response = await CategoryService.getCategories();
      setCats(response.data || []);
      if (response.data.length > 0 && !editing) {
        setForm(prev => ({ ...prev, categoriaId: response.data[0].id }));
      }
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const loadProduct = async () => {
    try {
      const response = await ProductService.getProductById(id);
      setForm(response.data);
    } catch (err) {
      setError('Producto no encontrado');
      console.error(err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(editing){
        await ProductService.updateProduct(id, form);
      }else{
        await ProductService.createProduct(form);
      }
      navigate('/admin/productos');
    } catch (err) {
      setError('Error al guardar producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if(error && editing) return <div className="container py-4"><p className="alert alert-danger">{error}</p></div>;

  return (
    <div className="container py-4">
      <h2>{editing ? 'Editar' : 'Nuevo'} producto</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
=======
  const nav = useNavigate();

  const cats = listCategorias();
  const existing = editing ? getProducto(id) : null;

  const [form, setForm] = useState(existing || {
    nombre:'', precio:0, stock:0, categoriaId: cats[0]?.id, tipo:'circular', tamano:'mediana', img:'', desc:'', oferta:false, destacado:false
  });

  if(editing && !existing) return <div className="container py-4"><p>Producto no encontrado.</p></div>;

  const submit = (e)=>{
    e.preventDefault();
    if(editing){
      updateProducto(id, form);
    }else{
      addProducto(form);
    }
    nav('/admin/productos');
  };

  return (
    <div className="container py-4">
      <h2>{editing ? 'Editar' : 'Nuevo'} producto</h2>
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728
      <form className="row g-2" onSubmit={submit}>
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Precio</label>
          <input type="number" className="form-control" value={form.precio} onChange={e=>setForm({...form, precio:parseInt(e.target.value||'0',10)})} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Stock</label>
          <input type="number" className="form-control" value={form.stock} onChange={e=>setForm({...form, stock:parseInt(e.target.value||'0',10)})} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Categoría</label>
          <select className="form-select" value={form.categoriaId} onChange={e=>setForm({...form, categoriaId:e.target.value})}>
            {cats.map(c=>(<option key={c.id} value={c.id}>{c.nombre}</option>))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Tipo</label>
          <select className="form-select" value={form.tipo} onChange={e=>setForm({...form, tipo:e.target.value})}>
            <option value="cuadrada">Cuadrada</option>
            <option value="circular">Circular</option>
            <option value="individual">Individual</option>
            <option value="unit">Unitario</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Tamaño</label>
          <select className="form-select" value={form.tamano} onChange={e=>setForm({...form, tamano:e.target.value})}>
            <option value="pequena">Pequeña</option>
            <option value="mediana">Mediana</option>
            <option value="grande">Grande</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label">Imagen (URL)</label>
          <input className="form-control" value={form.img} onChange={e=>setForm({...form, img:e.target.value})} />
        </div>
        <div className="col-12">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" rows="3" value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})}></textarea>
        </div>
        <div className="col-12">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" checked={!!form.oferta} onChange={e=>setForm({...form, oferta:e.target.checked})} id="oferta" />
            <label className="form-check-label" htmlFor="oferta">Oferta</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" checked={!!form.destacado} onChange={e=>setForm({...form, destacado:e.target.checked})} id="destacado" />
            <label className="form-check-label" htmlFor="destacado">Destacado</label>
          </div>
        </div>
        <div className="col-12 mt-2">
<<<<<<< HEAD
          <button className="btn btn-accent" disabled={loading}>
            {loading ? 'Guardando...' : (editing ? 'Guardar cambios' : 'Crear producto')}
          </button>
=======
          <button className="btn btn-accent">{editing ? 'Guardar cambios' : 'Crear producto'}</button>
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728
        </div>
      </form>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> eef3e7c3fdec327327be8f3590a0c85c2ca4c728
