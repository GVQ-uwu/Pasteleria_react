import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserService } from '../../services/UserService'; // <-- Cambiado a UserService

export default function Perfil() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: ''
    });
    const [loading, setLoading] = useState(true);
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
            
            // Crear objeto con solo los campos editables
            const updateData = {
                nombre: formData.nombre,
                telefono: formData.telefono,
                direccion: formData.direccion,
                fechaNacimiento: formData.fechaNacimiento
            };
            
            // Usar UserService en lugar de UsuarioService
            const response = await UserService.updateProfile(updateData);
            
            console.log('✅ Perfil actualizado:', response);
            
            if (response) {
                // Actualizar estado local
                setUser(response);
                
                // Mostrar mensaje de éxito
                setSuccess('✅ Perfil actualizado correctamente');
                setIsEditing(false);
                
                // Limpiar mensaje después de 3 segundos
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

    // Determinar el rol del usuario
    const userRole = user.rol || 'cliente';
    const isAdmin = userRole === 'admin';
    
    // Determinar el estado del usuario
    const userEstado = user.estado || 'activo';
    const isActive = userEstado === 'activo';

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-3">
                                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                                     style={{ width: '80px', height: '80px' }}>
                                    <span className="text-white fw-bold" style={{ fontSize: '2rem' }}>
                                        {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                            </div>
                            <h5>{user.nombre || 'Usuario'}</h5>
                            <p className="text-muted">{user.email}</p>
                            
                            <div className="mt-3">
                                <span className={`badge ${isAdmin ? 'bg-danger' : 'bg-primary'}`}>
                                    {isAdmin ? 'Administrador' : 'Cliente'}
                                </span>
                                <span className={`badge ${isActive ? 'bg-success' : 'bg-secondary'} ms-2`}>
                                    {isActive ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                            
                            <div className="d-grid gap-2 mt-4">
                                <Link to="/carrito" className="btn btn-outline-primary">
                                    🛒 Mi Carrito
                                </Link>
                                {isAdmin && (
                                    <Link to="/admin" className="btn btn-outline-warning">
                                        ⚙️ Panel Admin
                                    </Link>
                                )}
                                <button 
                                    className="btn btn-outline-danger"
                                    onClick={handleLogout}
                                >
                                    🚪 Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="col-md-9">
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError('')}></button>
                        </div>
                    )}
                    
                    {success && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            {success}
                            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                        </div>
                    )}
                    
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">👤 Mi Perfil</h5>
                            <button 
                                className={`btn btn-sm ${isEditing ? 'btn-outline-danger' : 'btn-outline-primary'}`}
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? '❌ Cancelar' : '✏️ Editar'}
                            </button>
                        </div>
                        <div className="card-body">
                            {!isEditing ? (
                                // Vista de perfil (solo lectura)
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Nombre completo</label>
                                            <p className="form-control-plaintext">{user.nombre || 'No especificado'}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Email</label>
                                            <p className="form-control-plaintext">{user.email}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Fecha de nacimiento</label>
                                            <p className="form-control-plaintext">
                                                {user.fechaNacimiento || 'No especificada'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Teléfono</label>
                                            <p className="form-control-plaintext">{user.telefono || 'No especificado'}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Dirección</label>
                                            <p className="form-control-plaintext">{user.direccion || 'No especificada'}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Fecha de registro</label>
                                                <p className="form-control-plaintext">
                                                    {user.fechaRegistro ? new Date(user.fechaRegistro).toLocaleDateString() : 'No disponible'}
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Último acceso</label>
                                                <p className="form-control-plaintext">
                                                    {user.ultimoAcceso ? new Date(user.ultimoAcceso).toLocaleDateString() : 'No disponible'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Formulario de edición
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
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={formData.email}
                                                    readOnly
                                                    disabled
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-accent">
                                            💾 Guardar Cambios
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                    
                    {/* Sección para cambiar contraseña */}
                    <div className="card mt-4">
                        <div className="card-header">
                            <h5 className="mb-0">🔒 Cambiar Contraseña</h5>
                        </div>
                        <div className="card-body">
                            <Link to="/cambiar-password" className="btn btn-outline-primary">
                                Ir a cambiar contraseña
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}