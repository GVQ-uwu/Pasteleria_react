import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserService } from '../../services/UserService';
import axios from 'axios';

export default function Perfil() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('perfil'); // 'perfil', 'pedidos', 'configuracion'
    const [pedidos, setPedidos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: ''
    });
    const [loading, setLoading] = useState(true);
    const [loadingPedidos, setLoadingPedidos] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const navigate = useNavigate();
    const { user: authUser, token, logout } = useAuth();

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                setLoading(true);
                
                // Verificar si hay usuario autenticado
                if (!authUser) {
                    navigate('/login');
                    return;
                }
                
                console.log('🔵 Cargando perfil para usuario:', authUser.email);
                
                // Primero usar datos del contexto de autenticación
                setUser(authUser);
                setFormData({
                    nombre: authUser.nombre || '',
                    email: authUser.email || '',
                    telefono: authUser.telefono || '',
                    direccion: authUser.direccion || '',
                    fechaNacimiento: authUser.fechaNacimiento || ''
                });
                
                // Luego intentar obtener datos actualizados del backend
                try {
                    const response = await UserService.getProfile();
                    if (response) {
                        console.log('✅ Datos actualizados del backend:', response);
                        setUser(response);
                        setFormData({
                            nombre: response.nombre || '',
                            email: response.email || '',
                            telefono: response.telefono || '',
                            direccion: response.direccion || '',
                            fechaNacimiento: response.fechaNacimiento || ''
                        });
                    }
                } catch (apiError) {
                    console.warn('⚠️ No se pudo obtener perfil del backend:', apiError);
                    // Continuamos con datos del contexto
                }
                
            } catch (error) {
                console.error('❌ Error al cargar perfil:', error);
                setError('Error al cargar el perfil');
            } finally {
                setLoading(false);
            }
        };

        loadUserProfile();
    }, [authUser, navigate]);

    // Cargar pedidos cuando se active la pestaña
    useEffect(() => {
        if (activeTab === 'pedidos' && user) {
            fetchPedidos();
        }
    }, [activeTab, user]);

    const fetchPedidos = async () => {
        try {
            setLoadingPedidos(true);
            // Aquí deberías llamar a tu servicio de pedidos
            // Ejemplo: const response = await PedidoService.getPedidosByUsuario(user.id);
            // Simulamos datos por ahora
            const mockPedidos = [
                {
                    id: 'ORD-001',
                    fecha: '2024-03-15',
                    estado: 'entregado',
                    items: [
                        { id: 1, nombre: 'Torta Chocolate', cantidad: 1, precio: 25000, imagenUrl: '/uploads/torta-chocolate.jpg' },
                        { id: 2, nombre: 'Cupcakes Vainilla', cantidad: 6, precio: 12000, imagenUrl: '/uploads/cupcakes.jpg' }
                    ],
                    subtotal: 37000,
                    envio: 3000,
                    descuento: 0,
                    total: 40000,
                    direccion: 'Av. Principal 123, Santiago'
                },
                {
                    id: 'ORD-002',
                    fecha: '2024-03-10',
                    estado: 'enviado',
                    items: [
                        { id: 3, nombre: 'Cheesecake Frutos Rojos', cantidad: 1, precio: 18000, imagenUrl: '/uploads/cheesecake.jpg' }
                    ],
                    subtotal: 18000,
                    envio: 0,
                    descuento: 1800,
                    total: 16200,
                    direccion: 'Calle Secundaria 456, Santiago'
                }
            ];
            setPedidos(mockPedidos);
        } catch (error) {
            console.error('Error al cargar pedidos:', error);
            setError('Error al cargar los pedidos');
        } finally {
            setLoadingPedidos(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            console.log('🔵 Actualizando perfil...', formData);
            
            const updateData = {
                nombre: formData.nombre,
                telefono: formData.telefono,
                direccion: formData.direccion,
                fechaNacimiento: formData.fechaNacimiento
            };
            
            const response = await UserService.updateProfile(updateData);
            
            console.log('✅ Perfil actualizado:', response);
            
            if (response) {
                setUser(response);
                setSuccess('✅ Perfil actualizado correctamente');
                setIsEditing(false);
                
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError('Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('❌ Error al actualizar perfil:', error);
            setError(error.message || 'Error al actualizar el perfil');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'pendiente': return 'warning';
            case 'confirmado': return 'info';
            case 'preparando': return 'primary';
            case 'enviado': return 'success';
            case 'entregado': return 'success';
            case 'cancelado': return 'danger';
            default: return 'secondary';
        }
    };

    const getEstadoTexto = (estado) => {
        switch (estado) {
            case 'pendiente': return 'Pendiente';
            case 'confirmado': return 'Confirmado';
            case 'preparando': return 'En preparación';
            case 'enviado': return 'En camino';
            case 'entregado': return 'Entregado';
            case 'cancelado': return 'Cancelado';
            default: return estado;
        }
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-3">Cargando perfil...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    No se pudo cargar el perfil. Por favor, <Link to="/login">inicia sesión</Link> nuevamente.
                </div>
            </div>
        );
    }

    const userRole = user.rol || 'cliente';
    const isAdmin = userRole === 'admin';
    const userEstado = user.estado || 'activo';
    const isActive = userEstado === 'activo';

    return (
        <div className="container mt-4">
            {/* Header del perfil */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, var(--bg) 0%, #ffeef2 100%)' }}>
                        <div className="card-body p-4">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <div className="avatar-circle" style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'linear-gradient(135deg, var(--accent) 0%, #ff9ebb 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}>
                                        {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </div>
                                <div className="col">
                                    <h1 className="h3 mb-1" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--choco)' }}>
                                        {user.nombre || 'Usuario'}
                                    </h1>
                                    <p className="text-muted mb-2">{user.email}</p>
                                    <div className="d-flex gap-2">
                                        <span className={`badge ${isAdmin ? 'bg-danger' : 'bg-primary'}`}>
                                            {isAdmin ? '👑 Administrador' : '👤 Cliente'}
                                        </span>
                                        <span className={`badge ${isActive ? 'bg-success' : 'bg-secondary'}`}>
                                            {isActive ? '✅ Activo' : '⏸️ Inactivo'}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <button 
                                        className="btn btn-outline-danger"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mensajes de éxito/error */}
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
            )}
            
            {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="bi bi-check-circle me-2"></i>
                    {success}
                    <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                </div>
            )}

            <div className="row">
                {/* Sidebar de navegación */}
                <div className="col-lg-3 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <nav className="nav flex-column">
                                <button 
                                    className={`nav-link py-3 border-bottom ${activeTab === 'perfil' ? 'active bg-light' : ''}`}
                                    onClick={() => setActiveTab('perfil')}
                                    style={{
                                        textAlign: 'left',
                                        border: 'none',
                                        background: 'none',
                                        color: activeTab === 'perfil' ? 'var(--choco)' : 'var(--text)',
                                        fontWeight: activeTab === 'perfil' ? '600' : '400'
                                    }}
                                >
                                    <i className="bi bi-person me-2"></i>
                                    Mi Perfil
                                </button>
                                <button 
                                    className={`nav-link py-3 border-bottom ${activeTab === 'pedidos' ? 'active bg-light' : ''}`}
                                    onClick={() => setActiveTab('pedidos')}
                                    style={{
                                        textAlign: 'left',
                                        border: 'none',
                                        background: 'none',
                                        color: activeTab === 'pedidos' ? 'var(--choco)' : 'var(--text)',
                                        fontWeight: activeTab === 'pedidos' ? '600' : '400'
                                    }}
                                >
                                    <i className="bi bi-box-seam me-2"></i>
                                    Mis Pedidos
                                </button>
                                <button 
                                    className={`nav-link py-3 border-bottom ${activeTab === 'configuracion' ? 'active bg-light' : ''}`}
                                    onClick={() => setActiveTab('configuracion')}
                                    style={{
                                        textAlign: 'left',
                                        border: 'none',
                                        background: 'none',
                                        color: activeTab === 'configuracion' ? 'var(--choco)' : 'var(--text)',
                                        fontWeight: activeTab === 'configuracion' ? '600' : '400'
                                    }}
                                >
                                    <i className="bi bi-gear me-2"></i>
                                    Configuración
                                </button>
                            </nav>
                            
                            <div className="p-3">
                                <div className="d-grid gap-2">
                                    <Link to="/carrito" className="btn btn-accent">
                                        <i className="bi bi-cart3 me-2"></i>
                                        Ver Carrito
                                    </Link>
                                    {isAdmin && (
                                        <Link to="/admin" className="btn btn-outline-warning">
                                            <i className="bi bi-shield-lock me-2"></i>
                                            Panel Administrador
                                        </Link>
                                    )}
                                    <Link to="/productos" className="btn btn-outline-secondary">
                                        <i className="bi bi-bag me-2"></i>
                                        Seguir Comprando
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="col-lg-9">
                    {/* Pestaña: Mi Perfil */}
                    {activeTab === 'perfil' && (
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-person-circle me-2"></i>
                                    Información Personal
                                </h5>
                                <button 
                                    className={`btn btn-sm ${isEditing ? 'btn-outline-danger' : 'btn-outline-primary'}`}
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? (
                                        <>
                                            <i className="bi bi-x-lg me-1"></i>
                                            Cancelar
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-pencil me-1"></i>
                                            Editar
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="card-body">
                                {!isEditing ? (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="info-item mb-4">
                                                <label className="form-label fw-bold text-muted">Nombre completo</label>
                                                <p className="form-control-plaintext fs-5">{user.nombre || 'No especificado'}</p>
                                            </div>
                                            <div className="info-item mb-4">
                                                <label className="form-label fw-bold text-muted">Email</label>
                                                <p className="form-control-plaintext fs-5">{user.email}</p>
                                            </div>
                                            <div className="info-item mb-4">
                                                <label className="form-label fw-bold text-muted">Fecha de nacimiento</label>
                                                <p className="form-control-plaintext fs-5">
                                                    {user.fechaNacimiento ? new Date(user.fechaNacimiento).toLocaleDateString('es-CL') : 'No especificada'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="info-item mb-4">
                                                <label className="form-label fw-bold text-muted">Teléfono</label>
                                                <p className="form-control-plaintext fs-5">{user.telefono || 'No especificado'}</p>
                                            </div>
                                            <div className="info-item mb-4">
                                                <label className="form-label fw-bold text-muted">Dirección</label>
                                                <p className="form-control-plaintext fs-5">{user.direccion || 'No especificada'}</p>
                                            </div>
                                            <div className="info-item">
                                                <label className="form-label fw-bold text-muted">Miembro desde</label>
                                                <p className="form-control-plaintext fs-5">
                                                    {user.fechaRegistro ? new Date(user.fechaRegistro).toLocaleDateString('es-CL') : 'No disponible'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleProfileUpdate}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Nombre completo *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="nombre"
                                                        value={formData.nombre}
                                                        onChange={handleInputChange}
                                                        required
                                                        style={{ borderColor: 'var(--accent)' }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={formData.email}
                                                        readOnly
                                                        disabled
                                                        style={{ backgroundColor: '#f8f9fa' }}
                                                    />
                                                    <small className="text-muted">El email no se puede modificar</small>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Fecha de nacimiento</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="fechaNacimiento"
                                                        value={formData.fechaNacimiento}
                                                        onChange={handleInputChange}
                                                        style={{ borderColor: 'var(--accent)' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Teléfono</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        name="telefono"
                                                        value={formData.telefono}
                                                        onChange={handleInputChange}
                                                        placeholder="+56 9 1234 5678"
                                                        style={{ borderColor: 'var(--accent)' }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Dirección</label>
                                                    <textarea
                                                        className="form-control"
                                                        name="direccion"
                                                        value={formData.direccion}
                                                        onChange={handleInputChange}
                                                        rows="3"
                                                        placeholder="Tu dirección completa"
                                                        style={{ borderColor: 'var(--accent)' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end gap-2 mt-3">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary"
                                                onClick={() => setIsEditing(false)}
                                            >
                                                Cancelar
                                            </button>
                                            <button type="submit" className="btn btn-accent">
                                                <i className="bi bi-check-circle me-2"></i>
                                                Guardar Cambios
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Pestaña: Mis Pedidos */}
                    {activeTab === 'pedidos' && (
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white">
                                <h5 className="mb-0">
                                    <i className="bi bi-receipt me-2"></i>
                                    Historial de Pedidos
                                </h5>
                            </div>
                            <div className="card-body">
                                {loadingPedidos ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Cargando...</span>
                                        </div>
                                        <p className="mt-3">Cargando tus pedidos...</p>
                                    </div>
                                ) : pedidos.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>N° Pedido</th>
                                                    <th>Fecha</th>
                                                    <th>Productos</th>
                                                    <th>Total</th>
                                                    <th>Estado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pedidos.map(pedido => (
                                                    <tr key={pedido.id}>
                                                        <td>
                                                            <strong>#{pedido.id}</strong>
                                                        </td>
                                                        <td>
                                                            {new Date(pedido.fecha).toLocaleDateString('es-CL')}
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                {pedido.items.slice(0, 2).map((item, index) => (
                                                                    <div key={index} className="me-2">
                                                                        <img 
                                                                            src={item.imagenUrl || '/placeholder-producto.jpg'}
                                                                            alt={item.nombre}
                                                                            className="rounded"
                                                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                                        />
                                                                    </div>
                                                                ))}
                                                                {pedido.items.length > 2 && (
                                                                    <span className="badge bg-secondary">
                                                                        +{pedido.items.length - 2}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <strong style={{ color: 'var(--choco)' }}>
                                                                ${pedido.total.toLocaleString('es-CL')}
                                                            </strong>
                                                        </td>
                                                        <td>
                                                            <span className={`badge bg-${getEstadoColor(pedido.estado)}`}>
                                                                {getEstadoTexto(pedido.estado)}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-sm btn-outline-accent">
                                                                <i className="bi bi-eye me-1"></i>
                                                                Ver
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-5">
                                        <div className="mb-4">
                                            <i className="bi bi-bag-x display-1 text-muted"></i>
                                        </div>
                                        <h4 className="mb-3">No tienes pedidos aún</h4>
                                        <p className="text-muted mb-4">
                                            ¡Comienza a comprar nuestros deliciosos productos!
                                        </p>
                                        <Link to="/productos" className="btn btn-accent">
                                            <i className="bi bi-bag me-2"></i>
                                            Ver productos
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Pestaña: Configuración */}
                    {activeTab === 'configuracion' && (
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white">
                                <h5 className="mb-0">
                                    <i className="bi bi-shield-lock me-2"></i>
                                    Seguridad y Privacidad
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card border-0 mb-3" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="card-body">
                                                <h6 className="card-title">
                                                    <i className="bi bi-key me-2"></i>
                                                    Cambiar Contraseña
                                                </h6>
                                                <p className="card-text small text-muted mb-3">
                                                    Actualiza tu contraseña regularmente para mantener tu cuenta segura.
                                                </p>
                                                <Link to="/cambiar-password" className="btn btn-outline-primary btn-sm">
                                                    Cambiar contraseña
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card border-0 mb-3" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="card-body">
                                                <h6 className="card-title">
                                                    <i className="bi bi-bell me-2"></i>
                                                    Notificaciones
                                                </h6>
                                                <p className="card-text small text-muted mb-3">
                                                    Configura cómo recibir notificaciones sobre tus pedidos.
                                                </p>
                                                <button className="btn btn-outline-secondary btn-sm">
                                                    Configurar notificaciones
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card border-0 mt-3" style={{ backgroundColor: '#fff7f9' }}>
                                    <div className="card-body">
                                        <h6 className="card-title">
                                            <i className="bi bi-trash me-2"></i>
                                            Eliminar Cuenta
                                        </h6>
                                        <p className="card-text small text-muted mb-3">
                                            Esta acción no se puede deshacer. Se eliminarán todos tus datos.
                                        </p>
                                        <button className="btn btn-outline-danger btn-sm">
                                            Solicitar eliminación de cuenta
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}