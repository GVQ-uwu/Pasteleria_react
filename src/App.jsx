import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/shop/Home';
import Productos from './pages/shop/Productos';
import ProductoDetalle from './pages/shop/ProductoDetalle';
import Categorias from './pages/shop/Categorias';
import Carrito from './pages/shop/Carrito';
import Checkout from './pages/shop/Checkout';
import PagoExitoso from './pages/shop/PagoExitoso';
import PagoFallido from './pages/shop/PagoFallido';
import Login from './pages/shop/Login';
import Registro from './pages/shop/Registro';
import Ofertas from './pages/shop/Ofertas';
import Blog from './pages/shop/Blog';
import Nosotros from './pages/shop/Nosotros';
import Contacto from './pages/shop/Contacto';
import Perfil from './pages/shop/Perfil';
import ChangePass from './pages/shop/ChangePass'; 
import AdminHome from './pages/admin/AdminHome';
import AdminProductos from './pages/admin/AdminProductos';
import AdminProductoForm from './pages/admin/AdminProductoForm';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminReportes from './pages/admin/AdminReportes';

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/productos" element={<Productos/>} />
          <Route path="/producto/:id" element={<ProductoDetalle/>} />
          <Route path="/categorias" element={<Categorias/>} />
          <Route path="/carrito" element={<Carrito/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/pago-exitoso" element={<PagoExitoso/>} />
          <Route path="/pago-fallido" element={<PagoFallido/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/ofertas" element={<Ofertas/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/nosotros" element={<Nosotros/>} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/perfil" element={<Perfil/>} />
          <Route path="/cambiar-password" element={<ChangePass/>} /> 

          <Route path="/admin" element={<ProtectedRoute admin><AdminHome/></ProtectedRoute>} />
          <Route path="/admin/productos" element={<ProtectedRoute admin><AdminProductos/></ProtectedRoute>} />
          <Route path="/admin/productos/nuevo" element={<ProtectedRoute admin><AdminProductoForm/></ProtectedRoute>} />
          <Route path="/admin/productos/:id" element={<ProtectedRoute admin><AdminProductoForm/></ProtectedRoute>} />
          <Route path="/admin/categorias" element={<ProtectedRoute admin><AdminCategorias/></ProtectedRoute>} />
          <Route path="/admin/usuarios" element={<ProtectedRoute admin><AdminUsuarios/></ProtectedRoute>} />
          <Route path="/admin/reportes" element={<ProtectedRoute admin><AdminReportes/></ProtectedRoute>} />
        </Routes>
        <Footer/>
      </CartProvider>
    </AuthProvider>
  );
}