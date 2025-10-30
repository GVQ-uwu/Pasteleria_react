import React from 'react';
import { Link } from 'react-router-dom';
export default function Home(){
  return (
    <div className="container py-4">
      <div className="p-4 rounded-3" style={{background:'white', border:'1px solid #eadac2'}}>
        <h1 className="display-6">Celebremos 50 años de dulzura</h1>
        <p className="lead">Repostería chilena con historia, recetas de siempre y toques creativos.</p>
        <Link to="/productos" className="btn btn-accent">Ver catálogo</Link>
      </div>
    </div>
  );
}
