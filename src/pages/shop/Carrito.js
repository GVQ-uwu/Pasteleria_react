import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Carrito() {
    const { items, total, remove, updateQty, clear } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [codigoDescuento, setCodigoDescuento] = useState('');
    const [descuentoAplicado, setDescuentoAplicado] = useState(0);
    const [envio] = useState(3000); // Envío fijo

    const handleCheckout = () => {
        if (!user) {
            navigate('/login', { state: { from: '/carrito' } });
            return;
        }
        navigate('/checkout');
    };

    const aplicarDescuento = () => {
        if (codigoDescuento === 'BIENVENIDA10') {
            setDescuentoAplicado(total * 0.1);
            alert('¡Descuento del 10% aplicado!');
        } else if (codigoDescuento === 'VERANO20') {
            setDescuentoAplicado(total * 0.2);
            alert('¡Descuento del 20% aplicado!');
        } else {
            alert('Código de descuento no válido');
        }
    };

    const calcularTotal = () => {
        return total - descuentoAplicado + envio;
    };

    if (items.length === 0) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">
                    <div className="mb-4">
                        <i className="bi bi-cart-x display-1" style={{ color: 'var(--accent)' }}></i>
                    </div>
                    <h1 className="display-6 mb-3" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--choco)' }}>
                        Tu carrito está vacío
                    </h1>
                    <p className="lead text-muted mb-4">
                        Parece que aún no has agregado productos a tu carrito de compras
                    </p>
                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                        <Link to="/productos" className="btn btn-accent px-4 py-3">
                            <i className="bi bi-bag me-2"></i>
                            Explorar Productos
                        </Link>
                        <Link to="/ofertas" className="btn btn-outline-accent px-4 py-3">
                            <i className="bi bi-percent me-2"></i>
                            Ver Ofertas
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h1 className="display-6 mb-4" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--choco)' }}>
                🛒 Mi Carrito
            </h1>

            <div className="row">
                {/* Lista de productos */}
                <div className="col-lg-8 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                                <i className="bi bi-cart-check me-2"></i>
                                Productos ({items.length})
                            </h5>
                            <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
                                        clear();
                                    }
                                }}
                            >
                                <i className="bi bi-trash me-1"></i>
                                Vaciar carrito
                            </button>
                        </div>
                        <div className="card-body p-0">
                            {items.map(item => (
                                <div key={item.id} className="cart-item p-3 border-bottom">
                                    <div className="row align-items-center">
                                        <div className="col-3 col-md-2">
                                            <img 
                                                src={item.img || '/placeholder-producto.jpg'} 
                                                alt={item.nombre}
                                                className="img-fluid rounded"
                                                style={{ height: '80px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="col-5 col-md-6">
                                            <h6 className="mb-1">{item.nombre}</h6>
                                            <p className="text-muted small mb-2">
                                                {item.descripcion?.substring(0, 60)}...
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <span className="badge bg-light text-dark me-2">
                                                    ${item.precio.toLocaleString()} c/u
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-4">
                                            <div className="d-flex align-items-center justify-content-end gap-3">
                                                <div className="quantity-control">
                                                    <button 
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                                                    >
                                                        <i className="bi bi-dash"></i>
                                                    </button>
                                                    <span className="mx-2">{item.qty}</span>
                                                    <button 
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => updateQty(item.id, item.qty + 1)}
                                                    >
                                                        <i className="bi bi-plus"></i>
                                                    </button>
                                                </div>
                                                <div className="text-end">
                                                    <div className="fw-bold" style={{ color: 'var(--choco)' }}>
                                                        ${(item.precio * item.qty).toLocaleString()}
                                                    </div>
                                                    <button 
                                                        className="btn btn-link text-danger p-0"
                                                        onClick={() => remove(item.id)}
                                                    >
                                                        <small>Eliminar</small>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Resumen del pedido */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-header bg-white">
                            <h5 className="mb-0">
                                <i className="bi bi-receipt me-2"></i>
                                Resumen del pedido
                            </h5>
                        </div>
                        <div className="card-body">
                            {/* Cupón de descuento */}
                            <div className="mb-4">
                                <label className="form-label small">Código de descuento</label>
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: BIENVENIDA10"
                                        value={codigoDescuento}
                                        onChange={(e) => setCodigoDescuento(e.target.value.toUpperCase())}
                                    />
                                    <button 
                                        className="btn btn-accent"
                                        onClick={aplicarDescuento}
                                    >
                                        Aplicar
                                    </button>
                                </div>
                            </div>

                            {/* Detalles del precio */}
                            <div className="mb-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Subtotal</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                                {descuentoAplicado > 0 && (
                                    <div className="d-flex justify-content-between mb-2 text-success">
                                        <span>Descuento</span>
                                        <span>-${descuentoAplicado.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Costo de envío</span>
                                    <span>${envio.toLocaleString()}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total</span>
                                    <span style={{ color: 'var(--choco)' }}>
                                        ${calcularTotal().toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="d-grid gap-2 mt-4">
                                <button 
                                    className="btn btn-accent py-3"
                                    onClick={handleCheckout}
                                >
                                    <i className="bi bi-lock me-2"></i>
                                    Proceder al pago
                                </button>
                                <Link to="/productos" className="btn btn-outline-accent">
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Seguir comprando
                                </Link>
                            </div>

                            {/* Información adicional */}
                            <div className="mt-4 pt-3 border-top">
                                <div className="d-flex align-items-center text-muted small mb-2">
                                    <i className="bi bi-shield-check me-2"></i>
                                    Compra 100% segura
                                </div>
                                <div className="d-flex align-items-center text-muted small mb-2">
                                    <i className="bi bi-truck me-2"></i>
                                    Envío en 24-48 horas
                                </div>
                                <div className="d-flex align-items-center text-muted small">
                                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                                    Devolución en 30 días
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}