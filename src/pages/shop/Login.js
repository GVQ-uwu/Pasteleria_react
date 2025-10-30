import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login(){
  const [email,setEmail] = useState('');
  const [nombre,setNombre] = useState('');
  const [fechaNacimiento,setFechaNacimiento] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = (e)=>{
    e.preventDefault();
    login({ email, nombre: nombre || email, fechaNacimiento });
    navigate('/');
  };

  return (
    <div className="container py-4">
      <h2>Iniciar sesión</h2>
      <form className="row g-2" onSubmit={submit}>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required value={email} onChange={e=>setEmail(e.target.value)} />
          <div className="form-text">Acceso admin si tu correo termina en <code>@admin</code>.</div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={nombre} onChange={e=>setNombre(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Fecha de nacimiento</label>
          <input className="form-control" type="date" value={fechaNacimiento} onChange={e=>setFechaNacimiento(e.target.value)} />
        </div>
        <div className="col-12">
          <button className="btn btn-accent">Ingresar</button>
        </div>
      </form>
    </div>
  );
}
