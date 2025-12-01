// pages/shop/ChangePass.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserService } from '../../services/UserService';

export default function ChangePass() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        // Validaciones
        if (formData.newPassword !== formData.confirmPassword) {
            return setError('Las contraseñas nuevas no coinciden');
        }
        
        if (formData.newPassword.length < 6) {
            return setError('La nueva contraseña debe tener al menos 6 caracteres');
        }

        setLoading(true);

        try {
            const response = await UserService.changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            });
            
            setSuccess('✅ Contraseña actualizada correctamente');
            
            // Limpiar formulario
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/perfil');
            }, 2000);
            
        } catch (error) {
            setError(error.response?.data || error.message || 'Error al cambiar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">🔒 Cambiar Contraseña</h5>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            {success && (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña actual</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                        minLength="6"
                                    />
                                    <div className="form-text">Mínimo 6 caracteres</div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Confirmar nueva contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                
                                <div className="d-flex justify-content-between">
                                    <Link 
                                        to="/perfil" 
                                        className="btn btn-secondary"
                                        disabled={loading}
                                    >
                                        ← Volver al Perfil
                                    </Link>
                                    <button 
                                        type="submit" 
                                        className="btn btn-accent"
                                        disabled={loading}
                                    >
                                        {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}