import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from './pages/Home';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import AccesoAdmin from './pages/AccesoAdmin';
import Usuarios from './pages/Usuarios';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main style={{ flex: 1, padding: "1rem" }}>
        <Routes>
          <Route path="/contacto" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/acceso-admin" element={<AccesoAdmin />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;