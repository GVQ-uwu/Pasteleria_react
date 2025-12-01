import React, { useMemo, useState, useEffect } from 'react';
import { UserService } from '../../services/UserService';

export default function AdminUsuarios(){
  const [q, setQ] = useState('');
  const [form, setForm] = useState({nombre:'', email:'', fechaNacimiento:''});
  const [editId, setEditId] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      const response = await UserService.getUsers();
      setUsuarios(response.data || []);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if(editId){
        await UserService.updateUser(editId, form);
        setEditId(null);
      }else{
        await UserService.createUser(form);
      }
      setForm({nombre:'', email:'', fechaNacimiento:''});
      await loadUsuarios(); // Recargar la lista
    } catch (err) {
      setError('Error al guardar usuario');
      console.error(err);
    }
  };

  const edit = (u) => {
    setEditId(u.id);
    setForm({ nombre:u.nombre||'', email:u.email||'', fechaNacimiento:u.fechaNacimiento||'' });
  };

  const del = async (id) => {
    if(window.confirm('¿Eliminar usuario?')){
      try {
        await UserService.deleteUser(id);
        await loadUsuarios(); // Recargar la lista
      } catch (err) {
        setError('Error al eliminar usuario');
        console.error(err);
      }
    }
  };

  const filtered = useMemo(()=> 
    usuarios.filter(u=> !q || u.email.toLowerCase().includes(q.toLowerCase()) || (u.nombre||'').toLowerCase().includes(q.toLowerCase())), 
    [usuarios,q]
  );

  if (loading) return <div className="container py-4">Cargando...</div>;
  if (error) return <div className="container py-4 alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Usuarios</h2>
      <input className="form-control mb-2" placeholder="Buscar por nombre o email" value={q} onChange={e=>setQ(e.target.value)} />
      <div className="row g-3">
        <div className="col-md-6">
          <div className="p-3 bg-white border rounded">
            <h5>{editId ? 'Editar' : 'Nuevo'} usuario</h5>
            <form className="row g-2" onSubmit={submit}>
              <div className="col-12">
                <label className="form-label">Nombre</label>
                <input className="form-control" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} required/>
              </div>
              <div className="col-12">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
              </div>
              <div className="col-12">
                <label className="form-label">Fecha de nacimiento</label>
                <input type="date" className="form-control" value={form.fechaNacimiento} onChange={e=>setForm({...form, fechaNacimiento:e.target.value})}/>
              </div>
              <div className="col-12">
                <button className="btn btn-accent">{editId ? 'Guardar' : 'Crear'}</button>
                {editId && <button type="button" className="btn btn-outline-secondary ms-2" onClick={()=>{setEditId(null); setForm({nombre:'', email:'', fechaNacimiento:''})}}>Cancelar</button>}
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="table-responsive bg-white border rounded">
            <table className="table table-sm align-middle mb-0">
              <thead><tr><th>Nombre</th><th>Email</th><th>Nacimiento</th><th></th></tr></thead>
              <tbody>
                {filtered.map(u=>(
                  <tr key={u.id}>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>{u.fechaNacimiento||'-'}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>edit(u)}>Editar</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={()=>del(u.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
